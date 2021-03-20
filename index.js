(()=>{var D=Object.create,O=Object.defineProperty,q=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty,U=Object.getOwnPropertyNames,R=Object.getOwnPropertyDescriptor;var X=i=>O(i,"__esModule",{value:!0});var Y=(i,a)=>()=>(a||(a={exports:{}},i(a.exports,a)),a.exports);var G=(i,a,m)=>{if(a&&typeof a=="object"||typeof a=="function")for(let h of U(a))!j.call(i,h)&&h!=="default"&&O(i,h,{get:()=>a[h],enumerable:!(m=R(a,h))||m.enumerable});return i},J=i=>G(X(O(i!=null?D(q(i)):{},"default",i&&i.__esModule&&"default"in i?{get:()=>i.default,enumerable:!0}:{value:i,enumerable:!0})),i);var $=Y(k=>{(function(){var i={direction:"horizontal",snapToLines:!0,linePosition:"auto",lineAlign:"start",textPosition:"auto",positionAlign:"auto",size:100,alignment:"center"},a=function(o){o||(o={"&amp":"&","&lt":"<","&gt":">","&lrm":"\u200E","&rlm":"\u200F","&nbsp":"\xA0"}),this.entities=o,this.parse=function(v,T){v=v.replace(/\0/g,"\uFFFD");var b=/\r\n|\r|\n/,r=Date.now(),e=0,n=v.split(b),u=!1,p=[],d=[];function s(g,C){d.push({message:g,line:e+1,col:C})}var f=n[e],t=f.length,y="WEBVTT",w=0,E=y.length;for(f[0]==="\uFEFF"&&(w=1,E+=1),(t<E||f.indexOf(y)!==0+w||t>E&&f[E]!==" "&&f[E]!=="	")&&s('No valid signature. (File needs to start with "WEBVTT".)'),e++;n[e]!=""&&n[e]!=null;){if(s("No blank line after the signature."),n[e].indexOf("-->")!=-1){u=!0;break}e++}for(;n[e]!=null;){for(var c;!u&&n[e]=="";)e++;if(!u&&n[e]==null)break;c=Object.assign({},i,{id:"",startTime:0,endTime:0,pauseOnExit:!1,direction:"horizontal",snapToLines:!0,linePosition:"auto",lineAlign:"start",textPosition:"auto",positionAlign:"auto",size:100,alignment:"center",text:"",tree:null});var x=!0;if(n[e].indexOf("-->")==-1){if(c.id=n[e],/^NOTE($|[ \t])/.test(c.id)){for(e++;n[e]!=""&&n[e]!=null;)n[e].indexOf("-->")!=-1&&s("Cannot have timestamp in a comment."),e++;continue}if(e++,n[e]==""||n[e]==null){s("Cue identifier cannot be standalone.");continue}if(n[e].indexOf("-->")==-1){x=!1,s("Cue identifier needs to be followed by timestamp.");continue}}u=!1;var l=new m(n[e],s),S=0;if(p.length>0&&(S=p[p.length-1].startTime),x&&!l.parse(c,S)){for(c=null,e++;n[e]!=""&&n[e]!=null;){if(n[e].indexOf("-->")!=-1){u=!0;break}e++}continue}for(e++;n[e]!=""&&n[e]!=null;){if(n[e].indexOf("-->")!=-1){s("Blank line missing before cue."),u=!0;break}c.text!=""&&(c.text+=`
`),c.text+=n[e],e++}var L=new h(c.text,s,T,this.entities);c.tree=L.parse(c.startTime,c.endTime),p.push(c)}return p.sort(function(g,C){return g.startTime<C.startTime?-1:g.startTime>C.startTime?1:g.endTime>C.endTime?-1:g.endTime<C.endTime?1:0}),{cues:p,errors:d,time:Date.now()-r}}},m=function(o,v){var T=/[\u0020\t\f]/,b=/[^\u0020\t\f]/,o=o,r=0,e=function(f){v(f,r+1)},n=!0;function u(f){for(;o[r]!=null&&f.test(o[r]);)r++}function p(f){for(var t="";o[r]!=null&&f.test(o[r]);)t+=o[r],r++;return t}function d(){var f="minutes",t,y,w,E;if(o[r]==null){e("No timestamp found.");return}if(!/\d/.test(o[r])){e("Timestamp must start with a character in the range 0-9.");return}if(t=p(/\d/),(t.length>2||parseInt(t,10)>59)&&(f="hours"),o[r]!=":"){e("No time unit separator found.");return}if(r++,y=p(/\d/),y.length!=2){e("Must be exactly two digits.");return}if(f=="hours"||o[r]==":"){if(o[r]!=":"){e("No seconds found or minutes is greater than 59.");return}if(r++,w=p(/\d/),w.length!=2){e("Must be exactly two digits.");return}}else{if(t.length!=2){e("Must be exactly two digits.");return}w=y,y=t,t="0"}if(o[r]!="."){e('No decimal separator (".") found.');return}if(r++,E=p(/\d/),E.length!=3){e("Milliseconds must be given in three digits.");return}if(parseInt(y,10)>59){e("You cannot have more than 59 minutes.");return}if(parseInt(w,10)>59){e("You cannot have more than 59 seconds.");return}return parseInt(t,10)*60*60+parseInt(y,10)*60+parseInt(w,10)+parseInt(E,10)/1e3}function s(f,t){for(var y=f.split(T),w=[],E=0;E<y.length;E++)if(y[E]!=""){var c=y[E].indexOf(":"),x=y[E].slice(0,c),l=y[E].slice(c+1);if(w.indexOf(x)!=-1&&e("Duplicate setting."),w.push(x),l==""){e("No value for setting defined.");return}if(x=="vertical"){if(l!="rl"&&l!="lr"){e("Writing direction can only be set to 'rl' or 'rl'.");continue}t.direction=l}else if(x=="line"){if(/,/.test(l)){var S=l.split(",");l=S[0];var L=S[1]}if(!/^[-\d](\d*)(\.\d+)?%?$/.test(l)){e("Line position takes a number or percentage.");continue}if(l.indexOf("-",1)!=-1){e("Line position can only have '-' at the start.");continue}if(l.indexOf("%")!=-1&&l.indexOf("%")!=l.length-1){e("Line position can only have '%' at the end.");continue}if(l[0]=="-"&&l[l.length-1]=="%"){e("Line position cannot be a negative percentage.");continue}var g=l,C=!1;if(l[l.length-1]=="%"&&(C=!0,g=l.slice(0,l.length-1),parseInt(l,10)>100)){e("Line position cannot be >100%.");continue}if(g===""||isNaN(g)||!isFinite(g)){e("Line position needs to be a number");continue}if(L!==void 0){if(!["start","center","end"].includes(L)){e("Line alignment needs to be one of start, center or end");continue}t.lineAlign=L}t.snapToLines=!C,t.linePosition=parseFloat(g),parseFloat(g).toString()!==g&&(t.nonSerializable=!0)}else if(x=="position"){if(/,/.test(l)){var S=l.split(",");l=S[0];var P=S[1]}if(l[l.length-1]!="%"){e("Text position must be a percentage.");continue}if(parseInt(l,10)>100||parseInt(l,10)<0){e("Text position needs to be between 0 and 100%.");continue}if(g=l.slice(0,l.length-1),g===""||isNaN(g)||!isFinite(g)){e("Line position needs to be a number");continue}if(P!==void 0){if(!["line-left","center","line-right"].includes(P)){e("Position alignment needs to be one of line-left, center or line-right");continue}t.positionAlign=P}t.textPosition=parseFloat(g)}else if(x=="size"){if(l[l.length-1]!="%"){e("Size must be a percentage.");continue}if(parseInt(l,10)>100){e("Size cannot be >100%.");continue}var _=l.slice(0,l.length-1);if(_===void 0||_===""||isNaN(_)){e("Size needs to be a number"),_=100;continue}else if(_=parseFloat(_),_<0||_>100){e("Size needs to be between 0 and 100%.");continue}t.size=_}else if(x=="align"){var F=["start","center","end","left","right"];if(F.indexOf(l)==-1){e("Alignment can only be set to one of "+F.join(", ")+".");continue}t.alignment=l}else e("Invalid setting.")}}this.parse=function(f,t){if(u(T),f.startTime=d(),f.startTime!=null){if(f.startTime<t&&e("Start timestamp is not greater than or equal to start timestamp of previous cue."),b.test(o[r])&&e("Timestamp not separated from '-->' by whitespace."),u(T),o[r]!="-"){e("No valid timestamp separator found.");return}if(r++,o[r]!="-"){e("No valid timestamp separator found.");return}if(r++,o[r]!=">"){e("No valid timestamp separator found.");return}if(r++,b.test(o[r])&&e("'-->' not separated from timestamp by whitespace."),u(T),f.endTime=d(),f.endTime!=null)return f.endTime<=f.startTime&&e("End timestamp is not greater than start timestamp."),b.test(o[r])&&(n=!1),u(T),s(o.substring(r),f),!0}},this.parseTimestamp=function(){var f=d();if(o[r]!=null){e("Timestamp must not have trailing characters.");return}return f}},h=function(o,v,T,b){this.entities=b;var r=this,o=o,e=0,n=function(p){T!="metadata"&&v(p,e+1)};this.parse=function(p,d){function s(L){let g={...L};return L.children&&(g.children=L.children.map(s)),g.parent&&delete g.parent,g}var f={children:[]},t=f,y=[];function w(L){t.children.push({type:"object",name:L[1],classes:L[2],children:[],parent:t}),t=t.children[t.children.length-1]}function E(L){for(var g=t;g;){if(g.name==L)return!0;g=g.parent}}for(;o[e]!=null;){var c=u();if(c[0]=="text")t.children.push({type:"text",value:c[1],parent:t});else if(c[0]=="start tag"){T=="chapters"&&n("Start tags not allowed in chapter title text.");var x=c[1];x!="v"&&x!="lang"&&c[3]!=""&&n("Only <v> and <lang> can have an annotation."),x=="c"||x=="i"||x=="b"||x=="u"||x=="ruby"||x=="rt"&&t.name=="ruby"?w(c):x=="v"?(E("v")&&n("<v> cannot be nested inside itself."),w(c),t.value=c[3],c[3]||n("<v> requires an annotation.")):x=="lang"?(w(c),t.value=c[3]):n("Incorrect start tag.")}else if(c[0]=="end tag")T=="chapters"&&n("End tags not allowed in chapter title text."),c[1]==t.name?t=t.parent:c[1]=="ruby"&&t.name=="rt"?t=t.parent.parent:n("Incorrect end tag.");else if(c[0]=="timestamp"){T=="chapters"&&n("Timestamp not allowed in chapter title text.");var l=new m(c[1],n),S=l.parseTimestamp();S!=null&&((S<=p||S>=d)&&n("Timestamp must be between start timestamp and end timestamp."),y.length>0&&y[y.length-1]>=S&&n("Timestamp must be greater than any previous timestamp."),t.children.push({type:"timestamp",value:S,parent:t}),y.push(S))}}for(;t.parent;)t.name!="v"&&n("Required end tag missing."),t=t.parent;return s(f)};function u(){for(var p="data",d="",s="",f=[];o[e-1]!=null||e==0;){var t=o[e];if(p=="data")if(t=="&")s=t,p="escape";else if(t=="<"&&d=="")p="tag";else{if(t=="<"||t==null)return["text",d];d+=t}else if(p=="escape")if(t=="<"||t==null){n("Incorrect escape.");let y;return(y=s.match(/^&#([0-9]+)$/))?d+=String.fromCharCode(y[1]):r.entities[s]?d+=r.entities[s]:d+=s,["text",d]}else if(t=="&")n("Incorrect escape."),d+=s,s=t;else if(/[a-z#0-9]/i.test(t))s+=t;else if(t==";"){let y;(y=s.match(/^&#(x?[0-9]+)$/))?d+=String.fromCharCode("0"+y[1]):r.entities[s+t]?d+=r.entities[s+t]:(y=Object.keys(b).find(w=>s.startsWith(w)))?d+=r.entities[y]+s.slice(y.length)+t:(n("Incorrect escape."),d+=s+";"),p="data"}else n("Incorrect escape."),d+=s+t,p="data";else if(p=="tag")if(t=="	"||t==`
`||t=="\f"||t==" ")p="start tag annotation";else if(t==".")p="start tag class";else if(t=="/")p="end tag";else if(/\d/.test(t))d=t,p="timestamp tag";else{if(t==">"||t==null)return t==">"&&e++,["start tag","",[],""];d=t,p="start tag"}else if(p=="start tag")if(t=="	"||t=="\f"||t==" ")p="start tag annotation";else if(t==`
`)s=t,p="start tag annotation";else if(t==".")p="start tag class";else{if(t==">"||t==null)return t==">"&&e++,["start tag",d,[],""];d+=t}else if(p=="start tag class")if(t=="	"||t=="\f"||t==" ")s&&f.push(s),s="",p="start tag annotation";else if(t==`
`)s&&f.push(s),s=t,p="start tag annotation";else if(t==".")s&&f.push(s),s="";else{if(t==">"||t==null)return t==">"&&e++,s&&f.push(s),["start tag",d,f,""];s+=t}else if(p=="start tag annotation"){if(t==">"||t==null)return t==">"&&e++,s=s.split(/[\u0020\t\f\r\n]+/).filter(function(y){if(y)return!0}).join(" "),["start tag",d,f,s];s+=t}else if(p=="end tag"){if(t==">"||t==null)return t==">"&&e++,["end tag",d];d+=t}else if(p=="timestamp tag"){if(t==">"||t==null)return t==">"&&e++,["timestamp",d];d+=t}else n("Never happens.");e++}}},M=function(){function o(r){let e=(""+(r-Math.floor(r)).toFixed(3)*1e3).padEnd(3,"0"),n=0,u=0,p=0;return r>=3600&&(n=Math.floor(r/3600)),u=Math.floor((r-3600*n)/60),p=Math.floor(r-3600*n-60*u),(n?n+":":"")+(""+u).padStart(2,"0")+":"+(""+p).padStart(2,"0")+"."+e}function v(r){var e="";let n=Object.keys(i).filter(u=>r[u]!==i[u]);return n.includes("direction")&&(e+=" vertical:"+r.direction),n.includes("alignment")&&(e+=" align:"+r.alignment),n.includes("size")&&(e+=" size:"+r.size+"%"),(n.includes("lineAlign")||n.includes("linePosition"))&&(e+=" line:"+r.linePosition+(r.snapToLines?"":"%")+(r.lineAlign&&r.lineAlign!=i.lineAlign?","+r.lineAlign:"")),(n.includes("textPosition")||n.includes("positionAlign"))&&(e+=" position:"+r.textPosition+"%"+(r.positionAlign&&r.positionAlign!==i.positionAlign?","+r.positionAlign:"")),e}function T(r){for(var e="",n=0;n<r.length;n++){var u=r[n];if(u.type=="text")e+=u.value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");else if(u.type=="object"){if(e+="<"+u.name,u.classes)for(var p=0;p<u.classes.length;p++)e+="."+u.classes[p];u.value&&(e+=" "+u.value),e+=">",u.children&&(e+=T(u.children)),e+="</"+u.name+">"}else u.type=="timestamp"?e+="<"+o(u.value)+">":e+="<"+u.value+">"}return e}function b(r){return(r.id?r.id+`
`:"")+o(r.startTime)+" --> "+o(r.endTime)+v(r)+`
`+T(r.tree.children)+`

`}this.serialize=function(r){for(var e=`WEBVTT

`,n=0;n<r.length;n++)e+=b(r[n]);return e}};function I(o){o.WebVTTParser=a,o.WebVTTCueTimingsAndSettingsParser=m,o.WebVTTCueTextParser=h,o.WebVTTSerializer=M}typeof window!="undefined"&&I(window),typeof k!="undefined"&&I(k)})()});var W=J($());function H(i){if(i==null)throw new Error(`Expected 'val' to be defined, but received ${i}`)}var B=new DOMParser,K=new W.WebVTTParser,Q=new XMLSerializer,V=B.parseFromString(`<mlt LC_NUMERIC="C" version="6.24.0" title="Shotcut created by Caption Converter" producer="main_bin">
  <profile description="automatic" width="1280" height="720" progressive="1" sample_aspect_num="1" sample_aspect_den="1" display_aspect_num="16" display_aspect_den="9" frame_rate_num="30" frame_rate_den="1" colorspace="709"/>
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
`,"text/xml"),A={trackSize:3,cues:new Array,xml:V,fields:[{field:"#a#",color:"#ed514e"},{field:"#h#",color:"#5bad92"},{field:"",color:"#eec34f"}]},N=(i,a=document)=>{let m=a.querySelector(i);return H(m),m},Z=async i=>{A.trackSize=i.target.valueAsNumber},ee=async i=>{let a=i.target.files?.[0],m=String(await a?.text()),h=K.parse(m).cues;A.cues=h},te=async i=>{let a=i.target.files?.[0],m=String(await a?.text()),h=B.parseFromString(m,"text/xml");A.xml=h},re=i=>{let a=i.target.form;H(a),[...a.elements].forEach(m=>A.fields[Number(m.dataset.index)][m.name]=m.value)},le=async i=>{let a=ne(A.xml),m=N("mlt",a),h=N("tractor",m),M=h.querySelector("transition"),I=Array.from(Array(A.trackSize)).map((v,T)=>{let b=ae(T+1);return m.insertBefore(b,h),b});A.cues.forEach((v,T)=>{let b=pe(v,T),r=I[T%A.trackSize];ie(r,v),m.insertBefore(b,r)}),I.forEach(v=>{let T=oe(v);h.insertBefore(T,M)}),I.forEach((v,T)=>{let b=se(T,m);h.insertBefore(b,null)}),m.querySelectorAll('[xmlns="http://www.w3.org/1999/xhtml"]').forEach(v=>v.removeAttributeNS(null,"xmlns"));let o=Q.serializeToString(a).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");i.target.href=URL.createObjectURL(new Blob([o],{type:"text/plain"}))},ne=i=>{let a=i.cloneNode(!0);if(a.querySelector("tractor")==null){let m=z(`
      <tractor id="tractor0" title="Shotcut created by Caption Converter" global_feed="1" in="00:00:00.000" out="00:00:00.000">
        <property name="shotcut">1</property>
      </tractor>
    `);a.firstChild?.insertBefore(m,null)}return a},ie=(i,a)=>{let m=b=>b.split(":").reduce((r,e)=>r.map(n=>n*60).concat(Number(e)),[]).reduce((r,e)=>r+e),h=b=>(b=Math.max(0,b),[...[Math.floor(b/3600),Math.floor(b/60%60)].map(r=>String(r).padStart(2,"0")),(b%60).toFixed(3)].join(":")),M=[...i.querySelectorAll("blank,entry")].reduce((b,r)=>b+m(r.getAttribute("length")||"")+m(r.getAttribute("out")||""),0),I=document.createElement("blank"),o=document.createElement("entry"),v=a.startTime-M,T=Math.min(v,0);I.setAttribute("length",h(v)),o.setAttribute("out",h(a.endTime-a.startTime+T)),o.setAttribute("producer",a.id),o.dataset.cue=a.text.substr(0,5),o.dataset.spent=h(M)+"-"+v,i.appendChild(I),i.appendChild(o)},z=i=>{let a=Object.assign(document.createElement("xml"),{innerHTML:i}).firstElementChild;return H(a),a},ae=i=>z(`
  <playlist id="playlistcaptionconverter${i}">
    <property name="shotcut:video">${i}</property>
    <property name="shotcut:name">CAP${i}</property>
  </playlist>
  `),oe=i=>z(`<track producer="${i.id}"/>`),se=(i,a)=>{let m=[...a.querySelectorAll('[name="b_track"]')].reduce((h,M)=>Math.max(Number(M.textContent),h),0)+1;return z(`
  <transition id="transitioncaptionconverter${i}">
    <property name="a_track">1</property>
    <property name="b_track">${m}</property>
    <property name="mlt_service">frei0r.cairoblend</property>
    <property name="disable">0</property>
  </transition>
  `)},pe=({id:i,text:a},m)=>{let h=A.fields.find(M=>a.includes(M.field))?.color||"#00000000";return z(`
  <producer id="${i}">
    <property name="resource">#00000000</property>
    <property name="mlt_service">color</property>
    <property name="shotcut:caption">${a}</property>
    <filter id="${i}-filter1">
      <property name="argument">${a}</property>
      <property name="geometry">0 240 1280 480 1</property>
      <property name="family">Rounded-X Mgen+ 1c</property>
      <property name="size">96</property>
      <property name="weight">750</property>
      <property name="fgcolour">#ffffff</property>
      <property name="bgcolour">#00000000</property>
      <property name="olcolour">${h}</property>
      <property name="outline">12</property>
      <property name="halign">center</property>
      <property name="valign">${["bottom","middle","top"][m%3]}</property>
      <property name="mlt_service">dynamictext</property>
      <property name="shotcut:filter">dynamicText</property>
      <property name="shotcut:usePointSize">1</property>
      <property name="shotcut:pointSize">72</property>
    </filter>
    <filter id="${i}-filter2">
      <property name="argument">${a}</property>
      <property name="geometry">0 240 1280 480 1</property>
      <property name="family">Rounded-X Mgen+ 1c</property>
      <property name="size">96</property>
      <property name="weight">750</property>
      <property name="fgcolour">#ffffff</property>
      <property name="bgcolour">#00000000</property>
      <property name="olcolour">#ffffff</property>
      <property name="pad">6</property>
      <property name="halign">center</property>
      <property name="valign">${["bottom","middle","top"][m%3]}</property>
      <property name="mlt_service">dynamictext</property>
      <property name="shotcut:filter">dynamicText</property>
      <property name="shotcut:usePointSize">1</property>
      <property name="shotcut:pointSize">72</property>
    </filter>
  </producer>
  `)};addEventListener("load",()=>{let i=N("#trackSizeInput"),a=N("#webvttInput"),m=N("#mltInput"),h=N("#colorForm"),M=N("#actionBtn");i.oninput=Z,a.oninput=ee,m.oninput=te,h.oninput=re,M.onclick=le});})();
