(()=>{var R=Object.create,z=Object.defineProperty,X=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty,Y=Object.getOwnPropertyNames,Z=Object.getOwnPropertyDescriptor;var G=l=>z(l,"__esModule",{value:!0});var J=(l,i)=>()=>(i||(i={exports:{}},l(i.exports,i)),i.exports);var K=(l,i,u)=>{if(i&&typeof i=="object"||typeof i=="function")for(let b of Y(i))!V.call(l,b)&&b!=="default"&&z(l,b,{get:()=>i[b],enumerable:!(u=Z(i,b))||u.enumerable});return l},Q=l=>K(G(z(l!=null?R(X(l)):{},"default",l&&l.__esModule&&"default"in l?{get:()=>l.default,enumerable:!0}:{value:l,enumerable:!0})),l);var W=J(H=>{(function(){var l={direction:"horizontal",snapToLines:!0,linePosition:"auto",lineAlign:"start",textPosition:"auto",positionAlign:"auto",size:100,alignment:"center"},i=function(s){s||(s={"&amp":"&","&lt":"<","&gt":">","&lrm":"\u200E","&rlm":"\u200F","&nbsp":"\xA0"}),this.entities=s,this.parse=function(v,g){v=v.replace(/\0/g,"\uFFFD");var T=/\r\n|\r|\n/,r=Date.now(),e=0,n=v.split(T),f=!1,o=[],c=[];function a(y,I){c.push({message:y,line:e+1,col:I})}var d=n[e],t=d.length,h="WEBVTT",w=0,E=h.length;for(d[0]==="\uFEFF"&&(w=1,E+=1),(t<E||d.indexOf(h)!==0+w||t>E&&d[E]!==" "&&d[E]!=="	")&&a('No valid signature. (File needs to start with "WEBVTT".)'),e++;n[e]!=""&&n[e]!=null;){if(a("No blank line after the signature."),n[e].indexOf("-->")!=-1){f=!0;break}e++}for(;n[e]!=null;){for(var m;!f&&n[e]=="";)e++;if(!f&&n[e]==null)break;m=Object.assign({},l,{id:"",startTime:0,endTime:0,pauseOnExit:!1,direction:"horizontal",snapToLines:!0,linePosition:"auto",lineAlign:"start",textPosition:"auto",positionAlign:"auto",size:100,alignment:"center",text:"",tree:null});var x=!0;if(n[e].indexOf("-->")==-1){if(m.id=n[e],/^NOTE($|[ \t])/.test(m.id)){for(e++;n[e]!=""&&n[e]!=null;)n[e].indexOf("-->")!=-1&&a("Cannot have timestamp in a comment."),e++;continue}if(e++,n[e]==""||n[e]==null){a("Cue identifier cannot be standalone.");continue}if(n[e].indexOf("-->")==-1){x=!1,a("Cue identifier needs to be followed by timestamp.");continue}}f=!1;var p=new u(n[e],a),L=0;if(o.length>0&&(L=o[o.length-1].startTime),x&&!p.parse(m,L)){for(m=null,e++;n[e]!=""&&n[e]!=null;){if(n[e].indexOf("-->")!=-1){f=!0;break}e++}continue}for(e++;n[e]!=""&&n[e]!=null;){if(n[e].indexOf("-->")!=-1){a("Blank line missing before cue."),f=!0;break}m.text!=""&&(m.text+=`
`),m.text+=n[e],e++}var C=new b(m.text,a,g,this.entities);m.tree=C.parse(m.startTime,m.endTime),o.push(m)}return o.sort(function(y,I){return y.startTime<I.startTime?-1:y.startTime>I.startTime?1:y.endTime>I.endTime?-1:y.endTime<I.endTime?1:0}),{cues:o,errors:c,time:Date.now()-r}}},u=function(s,v){var g=/[\u0020\t\f]/,T=/[^\u0020\t\f]/,s=s,r=0,e=function(d){v(d,r+1)},n=!0;function f(d){for(;s[r]!=null&&d.test(s[r]);)r++}function o(d){for(var t="";s[r]!=null&&d.test(s[r]);)t+=s[r],r++;return t}function c(){var d="minutes",t,h,w,E;if(s[r]==null){e("No timestamp found.");return}if(!/\d/.test(s[r])){e("Timestamp must start with a character in the range 0-9.");return}if(t=o(/\d/),(t.length>2||parseInt(t,10)>59)&&(d="hours"),s[r]!=":"){e("No time unit separator found.");return}if(r++,h=o(/\d/),h.length!=2){e("Must be exactly two digits.");return}if(d=="hours"||s[r]==":"){if(s[r]!=":"){e("No seconds found or minutes is greater than 59.");return}if(r++,w=o(/\d/),w.length!=2){e("Must be exactly two digits.");return}}else{if(t.length!=2){e("Must be exactly two digits.");return}w=h,h=t,t="0"}if(s[r]!="."){e('No decimal separator (".") found.');return}if(r++,E=o(/\d/),E.length!=3){e("Milliseconds must be given in three digits.");return}if(parseInt(h,10)>59){e("You cannot have more than 59 minutes.");return}if(parseInt(w,10)>59){e("You cannot have more than 59 seconds.");return}return parseInt(t,10)*60*60+parseInt(h,10)*60+parseInt(w,10)+parseInt(E,10)/1e3}function a(d,t){for(var h=d.split(g),w=[],E=0;E<h.length;E++)if(h[E]!=""){var m=h[E].indexOf(":"),x=h[E].slice(0,m),p=h[E].slice(m+1);if(w.indexOf(x)!=-1&&e("Duplicate setting."),w.push(x),p==""){e("No value for setting defined.");return}if(x=="vertical"){if(p!="rl"&&p!="lr"){e("Writing direction can only be set to 'rl' or 'rl'.");continue}t.direction=p}else if(x=="line"){if(/,/.test(p)){var L=p.split(",");p=L[0];var C=L[1]}if(!/^[-\d](\d*)(\.\d+)?%?$/.test(p)){e("Line position takes a number or percentage.");continue}if(p.indexOf("-",1)!=-1){e("Line position can only have '-' at the start.");continue}if(p.indexOf("%")!=-1&&p.indexOf("%")!=p.length-1){e("Line position can only have '%' at the end.");continue}if(p[0]=="-"&&p[p.length-1]=="%"){e("Line position cannot be a negative percentage.");continue}var y=p,I=!1;if(p[p.length-1]=="%"&&(I=!0,y=p.slice(0,p.length-1),parseInt(p,10)>100)){e("Line position cannot be >100%.");continue}if(y===""||isNaN(y)||!isFinite(y)){e("Line position needs to be a number");continue}if(C!==void 0){if(!["start","center","end"].includes(C)){e("Line alignment needs to be one of start, center or end");continue}t.lineAlign=C}t.snapToLines=!I,t.linePosition=parseFloat(y),parseFloat(y).toString()!==y&&(t.nonSerializable=!0)}else if(x=="position"){if(/,/.test(p)){var L=p.split(",");p=L[0];var O=L[1]}if(p[p.length-1]!="%"){e("Text position must be a percentage.");continue}if(parseInt(p,10)>100||parseInt(p,10)<0){e("Text position needs to be between 0 and 100%.");continue}if(y=p.slice(0,p.length-1),y===""||isNaN(y)||!isFinite(y)){e("Line position needs to be a number");continue}if(O!==void 0){if(!["line-left","center","line-right"].includes(O)){e("Position alignment needs to be one of line-left, center or line-right");continue}t.positionAlign=O}t.textPosition=parseFloat(y)}else if(x=="size"){if(p[p.length-1]!="%"){e("Size must be a percentage.");continue}if(parseInt(p,10)>100){e("Size cannot be >100%.");continue}var _=p.slice(0,p.length-1);if(_===void 0||_===""||isNaN(_)){e("Size needs to be a number"),_=100;continue}else if(_=parseFloat(_),_<0||_>100){e("Size needs to be between 0 and 100%.");continue}t.size=_}else if(x=="align"){var k=["start","center","end","left","right"];if(k.indexOf(p)==-1){e("Alignment can only be set to one of "+k.join(", ")+".");continue}t.alignment=p}else e("Invalid setting.")}}this.parse=function(d,t){if(f(g),d.startTime=c(),d.startTime!=null){if(d.startTime<t&&e("Start timestamp is not greater than or equal to start timestamp of previous cue."),T.test(s[r])&&e("Timestamp not separated from '-->' by whitespace."),f(g),s[r]!="-"){e("No valid timestamp separator found.");return}if(r++,s[r]!="-"){e("No valid timestamp separator found.");return}if(r++,s[r]!=">"){e("No valid timestamp separator found.");return}if(r++,T.test(s[r])&&e("'-->' not separated from timestamp by whitespace."),f(g),d.endTime=c(),d.endTime!=null)return d.endTime<=d.startTime&&e("End timestamp is not greater than start timestamp."),T.test(s[r])&&(n=!1),f(g),a(s.substring(r),d),!0}},this.parseTimestamp=function(){var d=c();if(s[r]!=null){e("Timestamp must not have trailing characters.");return}return d}},b=function(s,v,g,T){this.entities=T;var r=this,s=s,e=0,n=function(o){g!="metadata"&&v(o,e+1)};this.parse=function(o,c){function a(C){let y={...C};return C.children&&(y.children=C.children.map(a)),y.parent&&delete y.parent,y}var d={children:[]},t=d,h=[];function w(C){t.children.push({type:"object",name:C[1],classes:C[2],children:[],parent:t}),t=t.children[t.children.length-1]}function E(C){for(var y=t;y;){if(y.name==C)return!0;y=y.parent}}for(;s[e]!=null;){var m=f();if(m[0]=="text")t.children.push({type:"text",value:m[1],parent:t});else if(m[0]=="start tag"){g=="chapters"&&n("Start tags not allowed in chapter title text.");var x=m[1];x!="v"&&x!="lang"&&m[3]!=""&&n("Only <v> and <lang> can have an annotation."),x=="c"||x=="i"||x=="b"||x=="u"||x=="ruby"||x=="rt"&&t.name=="ruby"?w(m):x=="v"?(E("v")&&n("<v> cannot be nested inside itself."),w(m),t.value=m[3],m[3]||n("<v> requires an annotation.")):x=="lang"?(w(m),t.value=m[3]):n("Incorrect start tag.")}else if(m[0]=="end tag")g=="chapters"&&n("End tags not allowed in chapter title text."),m[1]==t.name?t=t.parent:m[1]=="ruby"&&t.name=="rt"?t=t.parent.parent:n("Incorrect end tag.");else if(m[0]=="timestamp"){g=="chapters"&&n("Timestamp not allowed in chapter title text.");var p=new u(m[1],n),L=p.parseTimestamp();L!=null&&((L<=o||L>=c)&&n("Timestamp must be between start timestamp and end timestamp."),h.length>0&&h[h.length-1]>=L&&n("Timestamp must be greater than any previous timestamp."),t.children.push({type:"timestamp",value:L,parent:t}),h.push(L))}}for(;t.parent;)t.name!="v"&&n("Required end tag missing."),t=t.parent;return a(d)};function f(){for(var o="data",c="",a="",d=[];s[e-1]!=null||e==0;){var t=s[e];if(o=="data")if(t=="&")a=t,o="escape";else if(t=="<"&&c=="")o="tag";else{if(t=="<"||t==null)return["text",c];c+=t}else if(o=="escape")if(t=="<"||t==null){n("Incorrect escape.");let h;return(h=a.match(/^&#([0-9]+)$/))?c+=String.fromCharCode(h[1]):r.entities[a]?c+=r.entities[a]:c+=a,["text",c]}else if(t=="&")n("Incorrect escape."),c+=a,a=t;else if(/[a-z#0-9]/i.test(t))a+=t;else if(t==";"){let h;(h=a.match(/^&#(x?[0-9]+)$/))?c+=String.fromCharCode("0"+h[1]):r.entities[a+t]?c+=r.entities[a+t]:(h=Object.keys(T).find(w=>a.startsWith(w)))?c+=r.entities[h]+a.slice(h.length)+t:(n("Incorrect escape."),c+=a+";"),o="data"}else n("Incorrect escape."),c+=a+t,o="data";else if(o=="tag")if(t=="	"||t==`
`||t=="\f"||t==" ")o="start tag annotation";else if(t==".")o="start tag class";else if(t=="/")o="end tag";else if(/\d/.test(t))c=t,o="timestamp tag";else{if(t==">"||t==null)return t==">"&&e++,["start tag","",[],""];c=t,o="start tag"}else if(o=="start tag")if(t=="	"||t=="\f"||t==" ")o="start tag annotation";else if(t==`
`)a=t,o="start tag annotation";else if(t==".")o="start tag class";else{if(t==">"||t==null)return t==">"&&e++,["start tag",c,[],""];c+=t}else if(o=="start tag class")if(t=="	"||t=="\f"||t==" ")a&&d.push(a),a="",o="start tag annotation";else if(t==`
`)a&&d.push(a),a=t,o="start tag annotation";else if(t==".")a&&d.push(a),a="";else{if(t==">"||t==null)return t==">"&&e++,a&&d.push(a),["start tag",c,d,""];a+=t}else if(o=="start tag annotation"){if(t==">"||t==null)return t==">"&&e++,a=a.split(/[\u0020\t\f\r\n]+/).filter(function(h){if(h)return!0}).join(" "),["start tag",c,d,a];a+=t}else if(o=="end tag"){if(t==">"||t==null)return t==">"&&e++,["end tag",c];c+=t}else if(o=="timestamp tag"){if(t==">"||t==null)return t==">"&&e++,["timestamp",c];c+=t}else n("Never happens.");e++}}},M=function(){function s(r){let e=(""+(r-Math.floor(r)).toFixed(3)*1e3).padEnd(3,"0"),n=0,f=0,o=0;return r>=3600&&(n=Math.floor(r/3600)),f=Math.floor((r-3600*n)/60),o=Math.floor(r-3600*n-60*f),(n?n+":":"")+(""+f).padStart(2,"0")+":"+(""+o).padStart(2,"0")+"."+e}function v(r){var e="";let n=Object.keys(l).filter(f=>r[f]!==l[f]);return n.includes("direction")&&(e+=" vertical:"+r.direction),n.includes("alignment")&&(e+=" align:"+r.alignment),n.includes("size")&&(e+=" size:"+r.size+"%"),(n.includes("lineAlign")||n.includes("linePosition"))&&(e+=" line:"+r.linePosition+(r.snapToLines?"":"%")+(r.lineAlign&&r.lineAlign!=l.lineAlign?","+r.lineAlign:"")),(n.includes("textPosition")||n.includes("positionAlign"))&&(e+=" position:"+r.textPosition+"%"+(r.positionAlign&&r.positionAlign!==l.positionAlign?","+r.positionAlign:"")),e}function g(r){for(var e="",n=0;n<r.length;n++){var f=r[n];if(f.type=="text")e+=f.value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");else if(f.type=="object"){if(e+="<"+f.name,f.classes)for(var o=0;o<f.classes.length;o++)e+="."+f.classes[o];f.value&&(e+=" "+f.value),e+=">",f.children&&(e+=g(f.children)),e+="</"+f.name+">"}else f.type=="timestamp"?e+="<"+s(f.value)+">":e+="<"+f.value+">"}return e}function T(r){return(r.id?r.id+`
`:"")+s(r.startTime)+" --> "+s(r.endTime)+v(r)+`
`+g(r.tree.children)+`

`}this.serialize=function(r){for(var e=`WEBVTT

`,n=0;n<r.length;n++)e+=T(r[n]);return e}};function A(s){s.WebVTTParser=i,s.WebVTTCueTimingsAndSettingsParser=u,s.WebVTTCueTextParser=b,s.WebVTTSerializer=M}typeof window!="undefined"&&A(window),typeof H!="undefined"&&A(H)})()});var D=Q(W());var B="0.3.2";function N(l){if(l==null)throw new Error(`Expected 'val' to be defined, but received ${l}`)}var j=new DOMParser,ee=new D.WebVTTParser,te=new XMLSerializer,P={width:1280,height:720},q=j.parseFromString(`<?xml version="1.0" standalone="no"?>
<mlt LC_NUMERIC="C" version="6.24.0" title="Shotcut created by Caption Converter" producer="main_bin">
  <profile description="automatic" width="${P.width}" height="${P.height}" progressive="1" sample_aspect_num="1" sample_aspect_den="1" display_aspect_num="16" display_aspect_den="9" frame_rate_num="30" frame_rate_den="1" colorspace="709"/>
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
`,"text/xml"),S={trackSize:3,width:P.width,height:P.height,fields:[{field:"#a#",color:"#ed514e"},{field:"#h#",color:"#5bad92"},{field:"",color:"#eec34f"}],options:{trackSize:3,transition:!1},files:{webvtt:void 0,mlt:void 0},cues:Array(),xml:q},$=(l,i=document)=>{let u=i.querySelector(l);return N(u),u},F=l=>{let i=Object.assign(document.createElement("xml"),{innerHTML:l}).firstElementChild;return N(i),i},re=l=>{let i=l.cloneNode(!0);if(i.querySelector("tractor")==null){let u=F(`
      <tractor id="tractor0" title="Shotcut created by Caption Converter" global_feed="1" in="00:00:00.000" out="00:00:00.000">
        <property name="shotcut">1</property>
      </tractor>
    `);i.firstChild?.insertBefore(u,null)}return i},ne=(l,i,u)=>{let b=r=>r.split(":").reduce((e,n)=>e.map(f=>f*60).concat(Number(n)),[]).reduce((e,n)=>e+n),M=r=>(r=Math.max(0,r),[...[Math.floor(r/3600),Math.floor(r/60%60)].map(e=>String(e).padStart(2,"0")),(r%60).toFixed(3)].join(":")),A=[...l.querySelectorAll("blank,entry")].reduce((r,e)=>r+b(e.getAttribute("length")||"")+b(e.getAttribute("out")||""),0),s=document.createElement("blank"),v=document.createElement("entry"),g=i.startTime-A,T=Math.min(g,0);s.setAttribute("length",M(g)),v.setAttribute("out",M(i.endTime-i.startTime+T)),v.setAttribute("producer",`${i.id}-producer${u+1}`),v.dataset.cue=i.text.substr(0,5),v.dataset.spent=M(A)+"-"+g,l.appendChild(s),l.appendChild(v)},U=class{constructor(i){this.storeService=i}playlist(i){return F(`
    <playlist id="playlistcaptionconverter${i}">
      <property name="shotcut:video">${i}</property>
      <property name="shotcut:name">CAP${i}</property>
    </playlist>
    `)}track(i){return F(`<track producer="${i.id}"/>`)}transition(i,u){let b=[...u.querySelectorAll('[name="b_track"]')].reduce((M,A)=>Math.max(Number(A.textContent),M),0)+1;return F(`
    <transition id="transitioncaptionconverter${i}">
      <property name="a_track">1</property>
      <property name="b_track">${b}</property>
      <property name="mlt_service">frei0r.cairoblend</property>
      <property name="disable">0</property>
    </transition>
    `)}producer(i,u){let b=this.storeService.fields.find(v=>i.text.includes(v.field))?.color,M=Number(((v=i.text.match(/#outline:\d+#/)?.[0])=>(v||"#outline:12#").replace(/#outline:(\d+)#/,"$1"))()),A=()=>this.storeService.options.transition?`<filter id="${i.id}-transitionfilter${u}">
        <property name="mlt_service">affine</property>
        <property name="shotcut:filter">affineSizePosition</property>
        <property name="transition.rect">0 0 ${this.storeService.width} ${this.storeService.height} 1</property>
      </filter>`:"",s=(v,g,T,r)=>`<filter id="${i.id}-simpletextfilter${v}">
        <property name="argument">${i.text}</property>
        <property name="geometry">0 240 ${this.storeService.width} ${this.storeService.height-240} 1</property>
        <property name="family">Rounded-X Mgen+ 1c</property>
        <property name="size">96</property>
        <property name="weight">750</property>
        <property name="fgcolour">#ffffff</property>
        <property name="bgcolour">#00000000</property>
        <property name="olcolour">${g}</property>
        <property name="outline">${T}</property>
        <property name="pad">${r}</property>
        <property name="halign">center</property>
        <property name="valign">${["bottom","middle","top"][u%3]}</property>
        <property name="mlt_service">dynamictext</property>
        <property name="shotcut:filter">dynamicText</property>
        <property name="shotcut:usePointSize">1</property>
        <property name="shotcut:pointSize">72</property>
      </filter>`;return F(`
    <producer id="${i.id}-producer${u+1}">
      <property name="resource">#00000000</property>
      <property name="mlt_service">color</property>
      <property name="shotcut:caption">${i.text}</property>
      ${b&&M?s(1,b,M,0):""}
      ${s(b&&M?2:1,"#00000000",0,M/2)}
      ${A()}
    </producer>
    `)}},ie=async l=>{let i=$("#actionBtn"),u=l.target.form;N(u),S.files.webvtt=(u?.elements.namedItem("webvtt")).files?.[0],S.files.mlt=(u?.elements.namedItem("mlt")).files?.[0],S.cues=await Promise.resolve(S.files.webvtt?.text()).then(b=>ee.parse(b||"").cues),S.xml=await Promise.resolve(S.files.mlt?.text()).then(b=>b?j.parseFromString(b,"text/xml"):q),S.files.webvtt?i.removeAttribute("disabled"):i.setAttribute("disabled","")},se=l=>{let i=l.target.form;N(i),[...i.elements].forEach(u=>S.fields[Number(u.dataset.index)][u.name]=u.value)},ae=l=>{let i=l.target.form;N(i),S.options.trackSize=i.elements.namedItem("trackSize").valueAsNumber,S.options.transition=i.elements.namedItem("transition").checked},oe=l=>{let i=re(S.xml),u=$("mlt",i),b=$("tractor",u),M=b.querySelector("transition"),A=new U(S),s=Array.from(Array(S.trackSize)).map((g,T)=>{let r=A.playlist(T+1);return u.insertBefore(r,b),r});S.cues.forEach((g,T)=>{let r=A.producer(g,T),e=s[T%S.trackSize];ne(e,g,T),u.insertBefore(r,e)}),s.forEach(g=>{let T=A.track(g);b.insertBefore(T,M)}),s.forEach((g,T)=>{let r=A.transition(T,u);b.insertBefore(r,null)}),u.querySelectorAll('[xmlns="http://www.w3.org/1999/xhtml"]').forEach(g=>g.removeAttributeNS(null,"xmlns"));let v=te.serializeToString(i).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");Object.assign(l.target,{href:URL.createObjectURL(new Blob([v],{type:"text/plain"})),download:(S.files.mlt?.name||"project.mlt").replace(/\.\w+$/,"").replace(/$/,"-captioned.mlt")})};addEventListener("load",()=>{$("#filesForm").oninput=ie,$("#colorsForm").oninput=se,$("#optionsForm").oninput=ae,$("#actionBtn").onclick=oe,$("#version").textContent=B});})();