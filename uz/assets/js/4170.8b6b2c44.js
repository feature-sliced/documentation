/*! For license information please see 4170.8b6b2c44.js.LICENSE.txt */
(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([[4170],{4170:(e,n,r)=>{"use strict";r.d(n,{A:()=>Ae});var t=r(941);function a(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}function o(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var t,a,o,i,c=[],f=!0,l=!1;try{if(o=(r=r.call(e)).next,0===n){if(Object(r)!==r)return;f=!1}else for(;!(f=(t=o.call(r)).done)&&(c.push(t.value),c.length!==n);f=!0);}catch(e){l=!0,a=e}finally{try{if(!f&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw a}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return a(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function c(e){var n=function(e,n){if("object"!=i(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var t=r.call(e,n||"default");if("object"!=i(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(e,"string");return"symbol"==i(n)?n:String(n)}function f(e,n,r){return(n=c(n))in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function l(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=r(758),s=r(7500),d=r.n(s);function g(e,n){(function(e){return"string"==typeof e&&-1!==e.indexOf(".")&&1===parseFloat(e)})(e)&&(e="100%");var r=function(e){return"string"==typeof e&&-1!==e.indexOf("%")}(e);return e=360===n?e:Math.min(n,Math.max(0,parseFloat(e))),r&&(e=parseInt(String(e*n),10)/100),Math.abs(e-n)<1e-6?1:e=360===n?(e<0?e%n+n:e%n)/parseFloat(String(n)):e%n/parseFloat(String(n))}function b(e){return e<=1?"".concat(100*Number(e),"%"):e}function p(e){return 1===e.length?"0"+e:String(e)}function h(e,n,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?e+6*r*(n-e):r<.5?n:r<2/3?e+(n-e)*(2/3-r)*6:e}function m(e){return y(e)/255}function y(e){return parseInt(e,16)}var v={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function w(e){var n,r,t,a={r:0,g:0,b:0},o=1,i=null,c=null,f=null,l=!1,u=!1;return"string"==typeof e&&(e=function(e){if(e=e.trim().toLowerCase(),0===e.length)return!1;var n=!1;if(v[e])e=v[e],n=!0;else if("transparent"===e)return{r:0,g:0,b:0,a:0,format:"name"};var r=A.rgb.exec(e);if(r)return{r:r[1],g:r[2],b:r[3]};if(r=A.rgba.exec(e),r)return{r:r[1],g:r[2],b:r[3],a:r[4]};if(r=A.hsl.exec(e),r)return{h:r[1],s:r[2],l:r[3]};if(r=A.hsla.exec(e),r)return{h:r[1],s:r[2],l:r[3],a:r[4]};if(r=A.hsv.exec(e),r)return{h:r[1],s:r[2],v:r[3]};if(r=A.hsva.exec(e),r)return{h:r[1],s:r[2],v:r[3],a:r[4]};if(r=A.hex8.exec(e),r)return{r:y(r[1]),g:y(r[2]),b:y(r[3]),a:m(r[4]),format:n?"name":"hex8"};if(r=A.hex6.exec(e),r)return{r:y(r[1]),g:y(r[2]),b:y(r[3]),format:n?"name":"hex"};if(r=A.hex4.exec(e),r)return{r:y(r[1]+r[1]),g:y(r[2]+r[2]),b:y(r[3]+r[3]),a:m(r[4]+r[4]),format:n?"name":"hex8"};if(r=A.hex3.exec(e),r)return{r:y(r[1]+r[1]),g:y(r[2]+r[2]),b:y(r[3]+r[3]),format:n?"name":"hex"};return!1}(e)),"object"==typeof e&&(O(e.r)&&O(e.g)&&O(e.b)?(n=e.r,r=e.g,t=e.b,a={r:255*g(n,255),g:255*g(r,255),b:255*g(t,255)},l=!0,u="%"===String(e.r).substr(-1)?"prgb":"rgb"):O(e.h)&&O(e.s)&&O(e.v)?(i=b(e.s),c=b(e.v),a=function(e,n,r){e=6*g(e,360),n=g(n,100),r=g(r,100);var t=Math.floor(e),a=e-t,o=r*(1-n),i=r*(1-a*n),c=r*(1-(1-a)*n),f=t%6;return{r:255*[r,i,o,o,c,r][f],g:255*[c,r,r,i,o,o][f],b:255*[o,o,c,r,r,i][f]}}(e.h,i,c),l=!0,u="hsv"):O(e.h)&&O(e.s)&&O(e.l)&&(i=b(e.s),f=b(e.l),a=function(e,n,r){var t,a,o;if(e=g(e,360),n=g(n,100),r=g(r,100),0===n)a=r,o=r,t=r;else{var i=r<.5?r*(1+n):r+n-r*n,c=2*r-i;t=h(c,i,e+1/3),a=h(c,i,e),o=h(c,i,e-1/3)}return{r:255*t,g:255*a,b:255*o}}(e.h,i,f),l=!0,u="hsl"),Object.prototype.hasOwnProperty.call(e,"a")&&(o=e.a)),o=function(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}(o),{ok:l,format:e.format||u,r:Math.min(255,Math.max(a.r,0)),g:Math.min(255,Math.max(a.g,0)),b:Math.min(255,Math.max(a.b,0)),a:o}}var k="(?:".concat("[-\\+]?\\d*\\.\\d+%?",")|(?:").concat("[-\\+]?\\d+%?",")"),x="[\\s|\\(]+(".concat(k,")[,|\\s]+(").concat(k,")[,|\\s]+(").concat(k,")\\s*\\)?"),C="[\\s|\\(]+(".concat(k,")[,|\\s]+(").concat(k,")[,|\\s]+(").concat(k,")[,|\\s]+(").concat(k,")\\s*\\)?"),A={CSS_UNIT:new RegExp(k),rgb:new RegExp("rgb"+x),rgba:new RegExp("rgba"+C),hsl:new RegExp("hsl"+x),hsla:new RegExp("hsla"+C),hsv:new RegExp("hsv"+x),hsva:new RegExp("hsva"+C),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function O(e){return Boolean(A.CSS_UNIT.exec(String(e)))}var S=2,j=.16,F=.05,E=.05,M=.15,T=5,N=4,P=[{index:7,opacity:.15},{index:6,opacity:.25},{index:5,opacity:.3},{index:5,opacity:.45},{index:5,opacity:.65},{index:5,opacity:.85},{index:4,opacity:.9},{index:3,opacity:.95},{index:2,opacity:.97},{index:1,opacity:.98}];function I(e){var n=function(e,n,r){e=g(e,255),n=g(n,255),r=g(r,255);var t=Math.max(e,n,r),a=Math.min(e,n,r),o=0,i=t,c=t-a,f=0===t?0:c/t;if(t===a)o=0;else{switch(t){case e:o=(n-r)/c+(n<r?6:0);break;case n:o=(r-e)/c+2;break;case r:o=(e-n)/c+4}o/=6}return{h:o,s:f,v:i}}(e.r,e.g,e.b);return{h:360*n.h,s:n.s,v:n.v}}function R(e){var n=e.r,r=e.g,t=e.b;return"#".concat(function(e,n,r,t){var a=[p(Math.round(e).toString(16)),p(Math.round(n).toString(16)),p(Math.round(r).toString(16))];return t&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0):a.join("")}(n,r,t,!1))}function q(e,n,r){var t;return(t=Math.round(e.h)>=60&&Math.round(e.h)<=240?r?Math.round(e.h)-S*n:Math.round(e.h)+S*n:r?Math.round(e.h)+S*n:Math.round(e.h)-S*n)<0?t+=360:t>=360&&(t-=360),t}function D(e,n,r){return 0===e.h&&0===e.s?e.s:((t=r?e.s-j*n:n===N?e.s+j:e.s+F*n)>1&&(t=1),r&&n===T&&t>.1&&(t=.1),t<.06&&(t=.06),Number(t.toFixed(2)));var t}function _(e,n,r){var t;return(t=r?e.v+E*n:e.v-M*n)>1&&(t=1),Number(t.toFixed(2))}function B(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=[],t=w(e),a=T;a>0;a-=1){var o=I(t),i=R(w({h:q(o,a,!0),s:D(o,a,!0),v:_(o,a,!0)}));r.push(i)}r.push(R(t));for(var c=1;c<=N;c+=1){var f=I(t),l=R(w({h:q(f,c),s:D(f,c),v:_(f,c)}));r.push(l)}return"dark"===n.theme?P.map((function(e){var t,a,o,i=e.index,c=e.opacity;return R((t=w(n.backgroundColor||"#141414"),a=w(r[i]),o=100*c/100,{r:(a.r-t.r)*o+t.r,g:(a.g-t.g)*o+t.g,b:(a.b-t.b)*o+t.b}))})):r}var L={red:"#F5222D",volcano:"#FA541C",orange:"#FA8C16",gold:"#FAAD14",yellow:"#FADB14",lime:"#A0D911",green:"#52C41A",cyan:"#13C2C2",blue:"#1677FF",geekblue:"#2F54EB",purple:"#722ED1",magenta:"#EB2F96",grey:"#666666"},W={},$={};Object.keys(L).forEach((function(e){W[e]=B(L[e]),W[e].primary=W[e][5],$[e]=B(L[e],{theme:"dark",backgroundColor:"#141414"}),$[e].primary=$[e][5]}));W.red,W.volcano,W.gold,W.orange,W.yellow,W.lime,W.green,W.cyan;var U=W.blue;W.geekblue,W.purple,W.magenta,W.grey,W.grey;const z=(0,u.createContext)({});function H(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function Q(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?H(Object(r),!0).forEach((function(n){f(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):H(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}var Y="data-rc-order",G="data-rc-priority",J="rc-util-key",K=new Map;function V(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).mark;return e?e.startsWith("data-")?e:"data-".concat(e):J}function X(e){return e.attachTo?e.attachTo:document.querySelector("head")||document.body}function Z(e){return Array.from((K.get(e)||e).children).filter((function(e){return"STYLE"===e.tagName}))}function ee(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("undefined"==typeof window||!window.document||!window.document.createElement)return null;var r=n.csp,t=n.prepend,a=n.priority,o=void 0===a?0:a,i=function(e){return"queue"===e?"prependQueue":e?"prepend":"append"}(t),c="prependQueue"===i,f=document.createElement("style");f.setAttribute(Y,i),c&&o&&f.setAttribute(G,"".concat(o)),null!=r&&r.nonce&&(f.nonce=null==r?void 0:r.nonce),f.innerHTML=e;var l=X(n),u=l.firstChild;if(t){if(c){var s=Z(l).filter((function(e){if(!["prepend","prependQueue"].includes(e.getAttribute(Y)))return!1;var n=Number(e.getAttribute(G)||0);return o>=n}));if(s.length)return l.insertBefore(f,s[s.length-1].nextSibling),f}l.insertBefore(f,u)}else l.appendChild(f);return f}function ne(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Z(X(n)).find((function(r){return r.getAttribute(V(n))===e}))}function re(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};!function(e,n){var r=K.get(e);if(!r||!function(e,n){if(!e)return!1;if(e.contains)return e.contains(n);for(var r=n;r;){if(r===e)return!0;r=r.parentNode}return!1}(document,r)){var t=ee("",n),a=t.parentNode;K.set(e,a),e.removeChild(t)}}(X(r),r);var t=ne(n,r);if(t){var a,o,i;if(null!==(a=r.csp)&&void 0!==a&&a.nonce&&t.nonce!==(null===(o=r.csp)||void 0===o?void 0:o.nonce))t.nonce=null===(i=r.csp)||void 0===i?void 0:i.nonce;return t.innerHTML!==e&&(t.innerHTML=e),t}var c=ee(e,r);return c.setAttribute(V(r),n),c}function te(e){var n;return null==e||null===(n=e.getRootNode)||void 0===n?void 0:n.call(e)}function ae(e){return function(e){return te(e)instanceof ShadowRoot}(e)?te(e):null}var oe={},ie=[];function ce(e,n){}function fe(e,n){}function le(e,n,r){n||oe[r]||(e(!1,r),oe[r]=!0)}function ue(e,n){le(ce,e,n)}ue.preMessage=function(e){ie.push(e)},ue.resetWarned=function(){oe={}},ue.noteOnce=function(e,n){le(fe,e,n)};const se=ue;function de(e){return"object"===i(e)&&"string"==typeof e.name&&"string"==typeof e.theme&&("object"===i(e.icon)||"function"==typeof e.icon)}function ge(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.keys(e).reduce((function(n,r){var t,a=e[r];if("class"===r)n.className=a,delete n.class;else delete n[r],n[(t=r,t.replace(/-(.)/g,(function(e,n){return n.toUpperCase()})))]=a;return n}),{})}function be(e,n,r){return r?u.createElement(e.tag,Q(Q({key:n},ge(e.attrs)),r),(e.children||[]).map((function(r,t){return be(r,"".concat(n,"-").concat(e.tag,"-").concat(t))}))):u.createElement(e.tag,Q({key:n},ge(e.attrs)),(e.children||[]).map((function(r,t){return be(r,"".concat(n,"-").concat(e.tag,"-").concat(t))})))}function pe(e){return B(e)[0]}function he(e){return e?Array.isArray(e)?e:[e]:[]}var me=["icon","className","onClick","style","primaryColor","secondaryColor"],ye={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};var ve=function(e){var n,r,t,a,o,i,c,f=e.icon,s=e.className,d=e.onClick,g=e.style,b=e.primaryColor,p=e.secondaryColor,h=l(e,me),m=u.useRef(),y=ye;if(b&&(y={primaryColor:b,secondaryColor:p||pe(b)}),n=m,r=(0,u.useContext)(z),t=r.csp,a=r.prefixCls,o="\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n",a&&(o=o.replace(/anticon/g,a)),(0,u.useEffect)((function(){var e=ae(n.current);re(o,"@ant-design-icons",{prepend:!0,csp:t,attachTo:e})}),[]),i=de(f),c="icon should be icon definiton, but got ".concat(f),se(i,"[@ant-design/icons] ".concat(c)),!de(f))return null;var v=f;return v&&"function"==typeof v.icon&&(v=Q(Q({},v),{},{icon:v.icon(y.primaryColor,y.secondaryColor)})),be(v.icon,"svg-".concat(v.name),Q(Q({className:s,onClick:d,style:g,"data-icon":v.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},h),{},{ref:m}))};ve.displayName="IconReact",ve.getTwoToneColors=function(){return Q({},ye)},ve.setTwoToneColors=function(e){var n=e.primaryColor,r=e.secondaryColor;ye.primaryColor=n,ye.secondaryColor=r||pe(n),ye.calculated=!!r};const we=ve;function ke(e){var n=o(he(e),2),r=n[0],t=n[1];return we.setTwoToneColors({primaryColor:r,secondaryColor:t})}var xe=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];ke(U.primary);var Ce=u.forwardRef((function(e,n){var r,a=e.className,i=e.icon,c=e.spin,s=e.rotate,g=e.tabIndex,b=e.onClick,p=e.twoToneColor,h=l(e,xe),m=u.useContext(z),y=m.prefixCls,v=void 0===y?"anticon":y,w=m.rootClassName,k=d()(w,v,(f(r={},"".concat(v,"-").concat(i.name),!!i.name),f(r,"".concat(v,"-spin"),!!c||"loading"===i.name),r),a),x=g;void 0===x&&b&&(x=-1);var C=s?{msTransform:"rotate(".concat(s,"deg)"),transform:"rotate(".concat(s,"deg)")}:void 0,A=o(he(p),2),O=A[0],S=A[1];return u.createElement("span",(0,t.A)({role:"img","aria-label":i.name},h,{ref:n,tabIndex:x,onClick:b,className:k}),u.createElement(we,{icon:i,primaryColor:O,secondaryColor:S,style:C}))}));Ce.displayName="AntdIcon",Ce.getTwoToneColor=function(){var e=we.getTwoToneColors();return e.calculated?[e.primaryColor,e.secondaryColor]:e.primaryColor},Ce.setTwoToneColor=ke;const Ae=Ce},7500:(e,n)=>{var r;!function(){"use strict";var t={}.hasOwnProperty;function a(){for(var e="",n=0;n<arguments.length;n++){var r=arguments[n];r&&(e=i(e,o(r)))}return e}function o(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return a.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var n="";for(var r in e)t.call(e,r)&&e[r]&&(n=i(n,r));return n}function i(e,n){return n?e?e+" "+n:e+n:e}e.exports?(a.default=a,e.exports=a):void 0===(r=function(){return a}.apply(n,[]))||(e.exports=r)}()},941:(e,n,r)=>{"use strict";function t(){return t=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},t.apply(this,arguments)}r.d(n,{A:()=>t})}}]);