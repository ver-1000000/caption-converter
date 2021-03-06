import { WebVTTParser, Cue } from 'webvtt-parser';
import { version } from 'package.json';

/** アサート関数。 */
function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val == null) { throw new Error(`Expected 'val' to be defined, but received ${val}`); }
}
const domParser     = new DOMParser();
const webvttParser  = new WebVTTParser();
const xmlSerializer = new XMLSerializer();
const DEFAULT_SIZE  = { width: 1280, height: 720 };
const DEFAULT_MLT   = domParser.parseFromString(`<?xml version="1.0" standalone="no"?>
<mlt LC_NUMERIC="C" version="6.24.0" title="Shotcut created by Caption Converter" producer="main_bin">
  <profile description="automatic" width="${DEFAULT_SIZE.width}" height="${DEFAULT_SIZE.height}" progressive="1" sample_aspect_num="1" sample_aspect_den="1" display_aspect_num="16" display_aspect_den="9" frame_rate_num="30" frame_rate_den="1" colorspace="709"/>
  <playlist id="main_bin">
    <property name="xml_retain">1</property>
  </playlist>
  <producer id="black" in="00:00:00.000" out="00:09:59.960">
    <property name="length">1</property>
    <property name="eof">pause</property>
    <property name="resource">0</property>
    <property name="aspect_ratio">1</property>
    <property name="mlt_service">color</property>
    <property name="mlt_image_format">rgb24a</property>
    <property name="set.test_audio">0</property>
  </producer>
  <playlist id="background">
    <entry producer="black" in="00:00:00.000" out="00:00:00.000"/>
  </playlist>
  <tractor id="tractor0" title="Shotcut created by Caption Converter" global_feed="1" in="00:00:00.000" out="00:00:00.000">
    <property name="shotcut">1</property>
    <track producer="background"/>
    <transition id="transition1">
      <property name="a_track">0</property>
      <property name="b_track">1</property>
      <property name="mlt_service">frei0r.cairoblend</property>
      <property name="disable">1</property>
    </transition>
  </tractor>
`, 'text/xml');
const store = {
  trackSize: 3,
  width: DEFAULT_SIZE.width,
  height: DEFAULT_SIZE.height,
  fields: [{ field: '#a#', color: '#ed514e' }, { field: '#h#', color: '#5bad92' }, { field: '', color: '#eec34f' }],
  options: { trackSize: 3, transition: false },
  files: { webvtt: undefined as File | undefined, mlt: undefined as File | undefined },
  cues: Array<Cue>(),
  xml: DEFAULT_MLT
};

/** 絶対にDOM見つけてくるマン。 */
const querySelector = <T extends Element>(token: string, root: ParentNode = document) => {
  const dom = root.querySelector<T>(token);
  assertIsDefined(dom);
  return dom;
};

/** htmlを渡すとそのままHTMLElementとして返却する関数。 */
const createXMLElementFromInnerHTML = (innerHTML: string): HTMLElement => {
  const el = Object.assign(document.createElement('xml'), { innerHTML }).firstElementChild;
  assertIsDefined(el);
  return el as HTMLElement;
}

/** 入力されたmltに、最低限必要なDOMを準備して返却する。 */
const prepareDirectives = (untochedXml: Document): Document => {
  const xml = untochedXml.cloneNode(true) as Document;
  if (xml.querySelector('tractor') == null) {
    const tractor = createXMLElementFromInnerHTML(`
      <tractor id="tractor0" title="Shotcut created by Caption Converter" global_feed="1" in="00:00:00.000" out="00:00:00.000">
        <property name="shotcut">1</property>
      </tractor>
    `);
    xml.firstChild?.insertBefore(tractor, null);
  }
  return xml;
};

/** 渡された`playlist`に、キュート紐づくblankやentryを追加する。 */
const updatePlaylistByCue = (playlist: HTMLElement, cue: Cue, i: number): void => {
  const timeToNumber = (time: string) => time.split(':').reduce<number[]>((a, b) => a.map(x => x * 60).concat(Number(b)), []).reduce((a, b) => a + b);
  const numberToTime = (num: number) => {
    num = Math.max(0, num);
    return [...[Math.floor(num / 3600), Math.floor(num / 60 % 60)].map(n => String(n).padStart(2, '0')), (num % 60).toFixed(3)].join(':');
  };
  const spent = [...playlist.querySelectorAll('blank,entry')].reduce((a, b) => {
    return a + timeToNumber(b.getAttribute('length') || '') + timeToNumber(b.getAttribute('out') || '');
  }, 0);
  const blank       = document.createElement('blank');
  const entry       = document.createElement('entry');
  const blankLength = cue.startTime - spent;
  const adjustTime  = Math.min(blankLength, 0); // 再生箇所がかぶってしまったとき、outの時間を減らして調整する
  blank.setAttribute('length', numberToTime(blankLength));
  entry.setAttribute('out', numberToTime(cue.endTime - cue.startTime + adjustTime));
  entry.setAttribute('producer', `${cue.id}-producer${i + 1}`);
  entry.dataset.cue = cue.text.substr(0, 5);
  entry.dataset.spent = numberToTime(spent) + '-' + blankLength;
  playlist.appendChild(blank);
  playlist.appendChild(entry);
}

/** mltファイルの要素(DOM)を作成して返すためのクラス。 */
class CreateMLTElement {
  constructor(private storeService: typeof store) {}

  playlist(i: number): HTMLElement {
    return createXMLElementFromInnerHTML(`
    <playlist id="playlistcaptionconverter${i}">
      <property name="shotcut:video">${i}</property>
      <property name="shotcut:name">CAP${i}</property>
    </playlist>
    `);
  };

  track(playlist: HTMLElement): HTMLElement {
    return createXMLElementFromInnerHTML(`<track producer="${playlist.id}"/>`);
  };

  transition(i: number, mlt: Element): HTMLElement {
    const bTrackLength = [...mlt.querySelectorAll('[name="b_track"]')].reduce((a, b) => Math.max(Number(b.textContent), a), 0) + 1;
    return createXMLElementFromInnerHTML(`
    <transition id="transitioncaptionconverter${i}">
      <property name="a_track">1</property>
      <property name="b_track">${bTrackLength}</property>
      <property name="mlt_service">frei0r.cairoblend</property>
      <property name="disable">0</property>
    </transition>
    `);
  };

  /**
   * producerを作成する。 次の要素を含む
   * - `filter(simpleTextFilter)`: 字幕のフィルター。 #outline:n#のフィールド内容でoutlineの幅や存在を出し分けできる。
   * - `filter(transitionFilter)`: producerの位置や回転などを制御するフィルター。 storeService.options.transitionで出し分けができる
   */
  producer(cue: Cue, i: number): HTMLElement {
    const outlineColor     = this.storeService.fields.find(x => cue.text.includes(x.field))?.color;
    const outlineWidth     = Number(((content = cue.text.match(/#outline:\d+#/)?.[0]) => (content || '#outline:12#').replace(/#outline:(\d+)#/, '$1'))());
    const transitionFilter = () => this.storeService.options.transition ?
      `<filter id="${cue.id}-transitionfilter${i}">
        <property name="mlt_service">affine</property>
        <property name="shotcut:filter">affineSizePosition</property>
        <property name="transition.rect">0 0 ${this.storeService.width} ${this.storeService.height} 1</property>
      </filter>` : '';
    const simpleTextFilter = (num: number, color: string, outline: number, pad: number) =>
      `<filter id="${cue.id}-simpletextfilter${num}">
        <property name="argument">${cue.text}</property>
        <property name="geometry">0 240 ${this.storeService.width} ${this.storeService.height - 240} 1</property>
        <property name="family">Rounded-X Mgen+ 1c</property>
        <property name="size">96</property>
        <property name="weight">750</property>
        <property name="fgcolour">#ffffff</property>
        <property name="bgcolour">#00000000</property>
        <property name="olcolour">${color}</property>
        <property name="outline">${outline}</property>
        <property name="pad">${pad}</property>
        <property name="halign">center</property>
        <property name="valign">${['bottom', 'middle', 'top'][i % 3]}</property>
        <property name="mlt_service">dynamictext</property>
        <property name="shotcut:filter">dynamicText</property>
        <property name="shotcut:usePointSize">1</property>
        <property name="shotcut:pointSize">72</property>
      </filter>`;
    return createXMLElementFromInnerHTML(`
    <producer id="${cue.id}-producer${i + 1}">
      <property name="resource">#00000000</property>
      <property name="mlt_service">color</property>
      <property name="shotcut:caption">${cue.text}</property>
      ${outlineColor && outlineWidth ? simpleTextFilter(1, outlineColor, outlineWidth, 0) : ''}
      ${simpleTextFilter(outlineColor && outlineWidth ? 2 : 1, '#00000000', 0, outlineWidth / 2)}
      ${transitionFilter()}
    </producer>
    `);
  };
}

/** filesFormが入力されたとき、`store.cues`と`store.mlt`を登録する。 */
const filesFormOnInput = async (e: Event) => {
  const btn  = querySelector<HTMLAnchorElement>('#actionBtn');
  const form = (e.target as HTMLInputElement).form;
  assertIsDefined(form);
  store.files.webvtt = (form?.elements.namedItem('webvtt') as HTMLInputElement).files?.[0];
  store.files.mlt    = (form?.elements.namedItem('mlt') as HTMLInputElement).files?.[0];
  store.cues         = await Promise.resolve(store.files.webvtt?.text()).then(text => webvttParser.parse(text || '').cues);
  store.xml          = await Promise.resolve(store.files.mlt?.text()).then(text => text ? domParser.parseFromString(text, 'text/xml') : DEFAULT_MLT);
  store.files.webvtt ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', '');
}


/** colorsFormが入力されたとき、`store.mlt`を登録する。 */
const colorsFormOnInput = (e: Event) => {
  const form = (e.target as HTMLInputElement).form;
  assertIsDefined(form);
  ([...form.elements] as HTMLInputElement[]).forEach(e => store.fields[Number(e.dataset.index)][e.name as 'field' | 'color'] = e.value);
}

/** optionsFormが入力されたとき、`store.options`を登録する。 */
const optionsFormOnInput = (e: Event) => {
  const form = (e.target as HTMLInputElement).form;
  assertIsDefined(form);
  store.options.trackSize  = (form.elements.namedItem('trackSize') as HTMLInputElement).valueAsNumber;
  store.options.transition = (form.elements.namedItem('transition') as HTMLInputElement).checked;
}

/** `合体`ボタン押下。 */
const actionAnchorOnClick = (e: MouseEvent) => {
  const xml             = prepareDirectives(store.xml);
  const mlt             = querySelector<HTMLUnknownElement>('mlt', xml);
  const tractor         = querySelector<HTMLUnknownElement>('tractor', mlt);
  const firstTransition = tractor.querySelector<HTMLUnknownElement>('transition');
  const create          = new CreateMLTElement(store);
  // playlistをmltに追加
  const playlists = Array.from(Array(store.trackSize)).map((_, i) => {
    const playlist = create.playlist(i + 1);
    mlt.insertBefore(playlist, tractor);
    return playlist;
  });
  // producerをmltに追加し、playlistにproducerの数だけentry/blankを追加
  store.cues.forEach((cue, i) => {
    const producer = create.producer(cue, i);
    const playlist = playlists[i % store.trackSize];
    updatePlaylistByCue(playlist, cue, i);
    mlt.insertBefore(producer, playlist);
  });
  // trackをtractorに追加
  playlists.forEach(playlist => {
    const track = create.track(playlist);
    tractor.insertBefore(track, firstTransition);
  });
  // transitionをtractorに追加
  playlists.forEach((_, i) => {
    const transition = create.transition(i, mlt);
    tractor.insertBefore(transition, null);
  });
  mlt.querySelectorAll('[xmlns="http://www.w3.org/1999/xhtml"]').forEach(x => x.removeAttributeNS(null, 'xmlns'));
  const xmlText = xmlSerializer.serializeToString(xml).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"', '');
  Object.assign((e.target as HTMLAnchorElement), {
    href: URL.createObjectURL(new Blob([xmlText], { type: 'text/plain' })),
    download: (store.files.mlt?.name || 'project.mlt').replace(/\.\w+$/, '').replace(/$/, '-captioned.mlt')
  });
}

/** 起動。 */
addEventListener('load', () => {
  querySelector<HTMLFormElement>('#filesForm').oninput   = filesFormOnInput;
  querySelector<HTMLFormElement>('#colorsForm').oninput  = colorsFormOnInput;
  querySelector<HTMLFormElement>('#optionsForm').oninput = optionsFormOnInput;
  querySelector<HTMLAnchorElement>('#actionBtn').onclick = actionAnchorOnClick;
  querySelector<HTMLElement>('#version').textContent     = version;
});
