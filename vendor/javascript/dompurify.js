var e={};
/*! @license DOMPurify 3.0.8 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.8/LICENSE */(function(t,n){e=n()})(0,(function(){const{entries:e,setPrototypeOf:t,isFrozen:n,getPrototypeOf:o,getOwnPropertyDescriptor:a}=Object;let{freeze:r,seal:i,create:l}=Object;let{apply:c,construct:s}=typeof Reflect!=="undefined"&&Reflect;r||(r=function freeze(e){return e});i||(i=function seal(e){return e});c||(c=function apply(e,t,n){return e.apply(t,n)});s||(s=function construct(e,t){return new e(...t)});const u=unapply(Array.prototype.forEach);const f=unapply(Array.prototype.pop);const d=unapply(Array.prototype.push);const m=unapply(String.prototype.toLowerCase);const p=unapply(String.prototype.toString);const h=unapply(String.prototype.match);const g=unapply(String.prototype.replace);const T=unapply(String.prototype.indexOf);const y=unapply(String.prototype.trim);const E=unapply(RegExp.prototype.test);const S=unconstruct(TypeError);
/**
   * Creates a new function that calls the given function with a specified thisArg and arguments.
   *
   * @param {Function} func - The function to be wrapped and called.
   * @returns {Function} A new function that calls the given function with a specified thisArg and arguments.
   */function unapply(e){return function(t){for(var n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return c(e,t,o)}}
/**
   * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
   *
   * @param {Function} func - The constructor function to be wrapped and called.
   * @returns {Function} A new function that constructs an instance of the given constructor function with the provided arguments.
   */function unconstruct(e){return function(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];return s(e,n)}}
/**
   * Add properties to a lookup table
   *
   * @param {Object} set - The set to which elements will be added.
   * @param {Array} array - The array containing elements to be added to the set.
   * @param {Function} transformCaseFunc - An optional function to transform the case of each element before adding to the set.
   * @returns {Object} The modified set with added elements.
   */function addToSet(e,o){let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:m;t&&t(e,null);let r=o.length;while(r--){let t=o[r];if(typeof t==="string"){const e=a(t);if(e!==t){n(o)||(o[r]=e);t=e}}e[t]=true}return e}
/**
   * Clean up an array to harden against CSPP
   *
   * @param {Array} array - The array to be cleaned.
   * @returns {Array} The cleaned version of the array
   */function cleanArray(e){for(let t=0;t<e.length;t++)a(e,t)===void 0&&(e[t]=null);return e}
/**
   * Shallow clone an object
   *
   * @param {Object} object - The object to be cloned.
   * @returns {Object} A new object that copies the original.
   */function clone(t){const n=l(null);for(const[o,r]of e(t))a(t,o)!==void 0&&(Array.isArray(r)?n[o]=cleanArray(r):r&&typeof r==="object"&&r.constructor===Object?n[o]=clone(r):n[o]=r);return n}
/**
   * This method automatically checks if the prop is function or getter and behaves accordingly.
   *
   * @param {Object} object - The object to look up the getter function in its prototype chain.
   * @param {String} prop - The property name for which to find the getter function.
   * @returns {Function} The getter function found in the prototype chain or a fallback function.
   */function lookupGetter(e,t){while(e!==null){const n=a(e,t);if(n){if(n.get)return unapply(n.get);if(typeof n.value==="function")return unapply(n.value)}e=o(e)}function fallbackValue(e){console.warn("fallback value for",e);return null}return fallbackValue}const _=r(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]);const A=r(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]);const b=r(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]);const N=r(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]);const w=r(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]);const R=r(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]);const D=r(["#text"]);const k=r(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]);const v=r(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]);const L=r(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]);const x=r(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]);const C=i(/\{\{[\w\W]*|[\w\W]*\}\}/gm);const O=i(/<%[\w\W]*|[\w\W]*%>/gm);const M=i(/\${[\w\W]*}/gm);const I=i(/^data-[\-\w.\u00B7-\uFFFF]/);const P=i(/^aria-[\-\w]+$/);const U=i(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);const F=i(/^(?:\w+script|data):/i);const H=i(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);const z=i(/^html$/i);var B=Object.freeze({__proto__:null,MUSTACHE_EXPR:C,ERB_EXPR:O,TMPLIT_EXPR:M,DATA_ATTR:I,ARIA_ATTR:P,IS_ALLOWED_URI:U,IS_SCRIPT_OR_DATA:F,ATTR_WHITESPACE:H,DOCTYPE_NAME:z});const G=function getGlobal(){return typeof window==="undefined"?null:window};
/**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {HTMLScriptElement} purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
   * @return {TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported or creating the policy failed).
   */const W=function _createTrustedTypesPolicy(e,t){if(typeof e!=="object"||typeof e.createPolicy!=="function")return null;let n=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(n=t.getAttribute(o));const a="dompurify"+(n?"#"+n:"");try{return e.createPolicy(a,{createHTML(e){return e},createScriptURL(e){return e}})}catch(e){console.warn("TrustedTypes policy "+a+" could not be created.");return null}};function createDOMPurify(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:G();const DOMPurify=e=>createDOMPurify(e);DOMPurify.version="3.0.8";DOMPurify.removed=[];if(!t||!t.document||t.document.nodeType!==9){DOMPurify.isSupported=false;return DOMPurify}let{document:n}=t;const o=n;const a=o.currentScript;const{DocumentFragment:i,HTMLTemplateElement:c,Node:s,Element:C,NodeFilter:O,NamedNodeMap:M=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:I,DOMParser:P,trustedTypes:F}=t;const H=C.prototype;const Y=lookupGetter(H,"cloneNode");const j=lookupGetter(H,"nextSibling");const q=lookupGetter(H,"childNodes");const V=lookupGetter(H,"parentNode");if(typeof c==="function"){const e=n.createElement("template");e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let X;let K="";const{implementation:$,createNodeIterator:Z,createDocumentFragment:J,getElementsByTagName:Q}=n;const{importNode:ee}=o;let te={};DOMPurify.isSupported=typeof e==="function"&&typeof V==="function"&&$&&$.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ne,ERB_EXPR:oe,TMPLIT_EXPR:ae,DATA_ATTR:re,ARIA_ATTR:ie,IS_SCRIPT_OR_DATA:le,ATTR_WHITESPACE:ce}=B;let{IS_ALLOWED_URI:se}=B;let ue=null;const fe=addToSet({},[..._,...A,...b,...w,...D]);let de=null;const me=addToSet({},[...k,...v,...L,...x]);let pe=Object.seal(l(null,{tagNameCheck:{writable:true,configurable:false,enumerable:true,value:null},attributeNameCheck:{writable:true,configurable:false,enumerable:true,value:null},allowCustomizedBuiltInElements:{writable:true,configurable:false,enumerable:true,value:false}}));let he=null;let ge=null;let Te=true;let ye=true;let Ee=false;let Se=true;let _e=false;let Ae=false;let be=false;let Ne=false;let we=false;let Re=false;let De=false;let ke=true;let ve=false;const Le="user-content-";let xe=true;let Ce=false;let Oe={};let Me=null;const Ie=addToSet({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Pe=null;const Ue=addToSet({},["audio","video","img","source","image","track"]);let Fe=null;const He=addToSet({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]);const ze="http://www.w3.org/1998/Math/MathML";const Be="http://www.w3.org/2000/svg";const Ge="http://www.w3.org/1999/xhtml";let We=Ge;let Ye=false;let je=null;const qe=addToSet({},[ze,Be,Ge],p);let Ve=null;const Xe=["application/xhtml+xml","text/html"];const Ke="text/html";let $e=null;let Ze=null;const Je=n.createElement("form");const Qe=function isRegexOrFunction(e){return e instanceof RegExp||e instanceof Function};
/**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */const et=function _parseConfig(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!Ze||Ze!==e){e&&typeof e==="object"||(e={});e=clone(e);Ve=Xe.indexOf(e.PARSER_MEDIA_TYPE)===-1?Ke:e.PARSER_MEDIA_TYPE;$e=Ve==="application/xhtml+xml"?p:m;ue="ALLOWED_TAGS"in e?addToSet({},e.ALLOWED_TAGS,$e):fe;de="ALLOWED_ATTR"in e?addToSet({},e.ALLOWED_ATTR,$e):me;je="ALLOWED_NAMESPACES"in e?addToSet({},e.ALLOWED_NAMESPACES,p):qe;Fe="ADD_URI_SAFE_ATTR"in e?addToSet(clone(He),e.ADD_URI_SAFE_ATTR,$e):He;Pe="ADD_DATA_URI_TAGS"in e?addToSet(clone(Ue),e.ADD_DATA_URI_TAGS,$e):Ue;Me="FORBID_CONTENTS"in e?addToSet({},e.FORBID_CONTENTS,$e):Ie;he="FORBID_TAGS"in e?addToSet({},e.FORBID_TAGS,$e):{};ge="FORBID_ATTR"in e?addToSet({},e.FORBID_ATTR,$e):{};Oe="USE_PROFILES"in e&&e.USE_PROFILES;Te=e.ALLOW_ARIA_ATTR!==false;ye=e.ALLOW_DATA_ATTR!==false;Ee=e.ALLOW_UNKNOWN_PROTOCOLS||false;Se=e.ALLOW_SELF_CLOSE_IN_ATTR!==false;_e=e.SAFE_FOR_TEMPLATES||false;Ae=e.WHOLE_DOCUMENT||false;we=e.RETURN_DOM||false;Re=e.RETURN_DOM_FRAGMENT||false;De=e.RETURN_TRUSTED_TYPE||false;Ne=e.FORCE_BODY||false;ke=e.SANITIZE_DOM!==false;ve=e.SANITIZE_NAMED_PROPS||false;xe=e.KEEP_CONTENT!==false;Ce=e.IN_PLACE||false;se=e.ALLOWED_URI_REGEXP||U;We=e.NAMESPACE||Ge;pe=e.CUSTOM_ELEMENT_HANDLING||{};e.CUSTOM_ELEMENT_HANDLING&&Qe(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck);e.CUSTOM_ELEMENT_HANDLING&&Qe(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck);e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements==="boolean"&&(pe.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements);_e&&(ye=false);Re&&(we=true);if(Oe){ue=addToSet({},D);de=[];if(Oe.html===true){addToSet(ue,_);addToSet(de,k)}if(Oe.svg===true){addToSet(ue,A);addToSet(de,v);addToSet(de,x)}if(Oe.svgFilters===true){addToSet(ue,b);addToSet(de,v);addToSet(de,x)}if(Oe.mathMl===true){addToSet(ue,w);addToSet(de,L);addToSet(de,x)}}if(e.ADD_TAGS){ue===fe&&(ue=clone(ue));addToSet(ue,e.ADD_TAGS,$e)}if(e.ADD_ATTR){de===me&&(de=clone(de));addToSet(de,e.ADD_ATTR,$e)}e.ADD_URI_SAFE_ATTR&&addToSet(Fe,e.ADD_URI_SAFE_ATTR,$e);if(e.FORBID_CONTENTS){Me===Ie&&(Me=clone(Me));addToSet(Me,e.FORBID_CONTENTS,$e)}xe&&(ue["#text"]=true);Ae&&addToSet(ue,["html","head","body"]);if(ue.table){addToSet(ue,["tbody"]);delete he.tbody}if(e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=="function")throw S('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=="function")throw S('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');X=e.TRUSTED_TYPES_POLICY;K=X.createHTML("")}else{X===void 0&&(X=W(F,a));X!==null&&typeof K==="string"&&(K=X.createHTML(""))}r&&r(e);Ze=e}};const tt=addToSet({},["mi","mo","mn","ms","mtext"]);const nt=addToSet({},["foreignobject","desc","title","annotation-xml"]);const ot=addToSet({},["title","style","font","a","script"]);const at=addToSet({},[...A,...b,...N]);const rt=addToSet({},[...w,...R]);
/**
     * @param  {Element} element a DOM element whose namespace is being checked
     * @returns {boolean} Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */const it=function _checkValidNamespace(e){let t=V(e);t&&t.tagName||(t={namespaceURI:We,tagName:"template"});const n=m(e.tagName);const o=m(t.tagName);return!!je[e.namespaceURI]&&(e.namespaceURI===Be?t.namespaceURI===Ge?n==="svg":t.namespaceURI===ze?n==="svg"&&(o==="annotation-xml"||tt[o]):Boolean(at[n]):e.namespaceURI===ze?t.namespaceURI===Ge?n==="math":t.namespaceURI===Be?n==="math"&&nt[o]:Boolean(rt[n]):e.namespaceURI===Ge?!(t.namespaceURI===Be&&!nt[o])&&(!(t.namespaceURI===ze&&!tt[o])&&(!rt[n]&&(ot[n]||!at[n]))):!(Ve!=="application/xhtml+xml"||!je[e.namespaceURI]))};
/**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */const lt=function _forceRemove(e){d(DOMPurify.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){e.remove()}};
/**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */const ct=function _removeAttribute(e,t){try{d(DOMPurify.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){d(DOMPurify.removed,{attribute:null,from:t})}t.removeAttribute(e);if(e==="is"&&!de[e])if(we||Re)try{lt(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}};
/**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */const st=function _initDocument(e){let t=null;let o=null;if(Ne)e="<remove></remove>"+e;else{const t=h(e,/^[\r\n\t ]+/);o=t&&t[0]}Ve==="application/xhtml+xml"&&We===Ge&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const a=X?X.createHTML(e):e;if(We===Ge)try{t=(new P).parseFromString(a,Ve)}catch(e){}if(!t||!t.documentElement){t=$.createDocument(We,"template",null);try{t.documentElement.innerHTML=Ye?K:a}catch(e){}}const r=t.body||t.documentElement;e&&o&&r.insertBefore(n.createTextNode(o),r.childNodes[0]||null);return We===Ge?Q.call(t,Ae?"html":"body")[0]:Ae?t.documentElement:r};
/**
     * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
     *
     * @param  {Node} root The root element or node to start traversing on.
     * @return {NodeIterator} The created NodeIterator
     */const ut=function _createNodeIterator(e){return Z.call(e.ownerDocument||e,e,O.SHOW_ELEMENT|O.SHOW_COMMENT|O.SHOW_TEXT,null)};
/**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */const ft=function _isClobbered(e){return e instanceof I&&(typeof e.nodeName!=="string"||typeof e.textContent!=="string"||typeof e.removeChild!=="function"||!(e.attributes instanceof M)||typeof e.removeAttribute!=="function"||typeof e.setAttribute!=="function"||typeof e.namespaceURI!=="string"||typeof e.insertBefore!=="function"||typeof e.hasChildNodes!=="function")};
/**
     * Checks whether the given object is a DOM node.
     *
     * @param  {Node} object object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */const dt=function _isNode(e){return typeof s==="function"&&e instanceof s};
/**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */const mt=function _executeHook(e,t,n){te[e]&&u(te[e],(e=>{e.call(DOMPurify,t,n,Ze)}))};
/**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */const pt=function _sanitizeElements(e){let t=null;mt("beforeSanitizeElements",e,null);if(ft(e)){lt(e);return true}const n=$e(e.nodeName);mt("uponSanitizeElement",e,{tagName:n,allowedTags:ue});if(e.hasChildNodes()&&!dt(e.firstElementChild)&&E(/<[/\w]/g,e.innerHTML)&&E(/<[/\w]/g,e.textContent)){lt(e);return true}if(!ue[n]||he[n]){if(!he[n]&&gt(n)){if(pe.tagNameCheck instanceof RegExp&&E(pe.tagNameCheck,n))return false;if(pe.tagNameCheck instanceof Function&&pe.tagNameCheck(n))return false}if(xe&&!Me[n]){const t=V(e)||e.parentNode;const n=q(e)||e.childNodes;if(n&&t){const o=n.length;for(let a=o-1;a>=0;--a)t.insertBefore(Y(n[a],true),j(e))}}lt(e);return true}if(e instanceof C&&!it(e)){lt(e);return true}if((n==="noscript"||n==="noembed"||n==="noframes")&&E(/<\/no(script|embed|frames)/i,e.innerHTML)){lt(e);return true}if(_e&&e.nodeType===3){t=e.textContent;u([ne,oe,ae],(e=>{t=g(t,e," ")}));if(e.textContent!==t){d(DOMPurify.removed,{element:e.cloneNode()});e.textContent=t}}mt("afterSanitizeElements",e,null);return false};
/**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */const ht=function _isValidAttribute(e,t,o){if(ke&&(t==="id"||t==="name")&&(o in n||o in Je))return false;if(ye&&!ge[t]&&E(re,t));else if(Te&&E(ie,t));else if(!de[t]||ge[t]){if(!(gt(e)&&(pe.tagNameCheck instanceof RegExp&&E(pe.tagNameCheck,e)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(e))&&(pe.attributeNameCheck instanceof RegExp&&E(pe.attributeNameCheck,t)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(t))||t==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&E(pe.tagNameCheck,o)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(o))))return false}else if(Fe[t]);else if(E(se,g(o,ce,"")));else if(t!=="src"&&t!=="xlink:href"&&t!=="href"||e==="script"||T(o,"data:")!==0||!Pe[e]){if(Ee&&!E(le,g(o,ce,"")));else if(o)return false}else;return true};
/**
     * _isBasicCustomElement
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     *
     * @param {string} tagName name of the tag of the node to sanitize
     * @returns {boolean} Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
     */const gt=function _isBasicCustomElement(e){return e.indexOf("-")>0};
/**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */const Tt=function _sanitizeAttributes(e){mt("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const n={attrName:"",attrValue:"",keepAttr:true,allowedAttributes:de};let o=t.length;while(o--){const a=t[o];const{name:r,namespaceURI:i,value:l}=a;const c=$e(r);let s=r==="value"?l:y(l);n.attrName=c;n.attrValue=s;n.keepAttr=true;n.forceKeepAttr=void 0;mt("uponSanitizeAttribute",e,n);s=n.attrValue;if(n.forceKeepAttr)continue;ct(r,e);if(!n.keepAttr)continue;if(!Se&&E(/\/>/i,s)){ct(r,e);continue}_e&&u([ne,oe,ae],(e=>{s=g(s,e," ")}));const d=$e(e.nodeName);if(ht(d,c,s)){if(ve&&(c==="id"||c==="name")){ct(r,e);s=Le+s}if(X&&typeof F==="object"&&typeof F.getAttributeType==="function")if(i);else switch(F.getAttributeType(d,c)){case"TrustedHTML":s=X.createHTML(s);break;case"TrustedScriptURL":s=X.createScriptURL(s);break}try{i?e.setAttributeNS(i,r,s):e.setAttribute(r,s);f(DOMPurify.removed)}catch(e){}}}mt("afterSanitizeAttributes",e,null)};
/**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */const yt=function _sanitizeShadowDOM(e){let t=null;const n=ut(e);mt("beforeSanitizeShadowDOM",e,null);while(t=n.nextNode()){mt("uponSanitizeShadowNode",t,null);if(!pt(t)){t.content instanceof i&&_sanitizeShadowDOM(t.content);Tt(t)}}mt("afterSanitizeShadowDOM",e,null)};
/**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} cfg object
     */DOMPurify.sanitize=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};let n=null;let a=null;let r=null;let l=null;Ye=!e;Ye&&(e="\x3c!--\x3e");if(typeof e!=="string"&&!dt(e)){if(typeof e.toString!=="function")throw S("toString is not a function");e=e.toString();if(typeof e!=="string")throw S("dirty is not a string, aborting")}if(!DOMPurify.isSupported)return e;be||et(t);DOMPurify.removed=[];typeof e==="string"&&(Ce=false);if(Ce){if(e.nodeName){const t=$e(e.nodeName);if(!ue[t]||he[t])throw S("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof s){n=st("\x3c!----\x3e");a=n.ownerDocument.importNode(e,true);a.nodeType===1&&a.nodeName==="BODY"||a.nodeName==="HTML"?n=a:n.appendChild(a)}else{if(!we&&!_e&&!Ae&&e.indexOf("<")===-1)return X&&De?X.createHTML(e):e;n=st(e);if(!n)return we?null:De?K:""}n&&Ne&&lt(n.firstChild);const c=ut(Ce?e:n);while(r=c.nextNode())if(!pt(r)){r.content instanceof i&&yt(r.content);Tt(r)}if(Ce)return e;if(we){if(Re){l=J.call(n.ownerDocument);while(n.firstChild)l.appendChild(n.firstChild)}else l=n;(de.shadowroot||de.shadowrootmode)&&(l=ee.call(o,l,true));return l}let f=Ae?n.outerHTML:n.innerHTML;Ae&&ue["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&E(z,n.ownerDocument.doctype.name)&&(f="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+f);_e&&u([ne,oe,ae],(e=>{f=g(f,e," ")}));return X&&De?X.createHTML(f):f};
/**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */DOMPurify.setConfig=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};et(e);be=true};DOMPurify.clearConfig=function(){Ze=null;be=false};
/**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {String} tag Tag name of containing element.
     * @param  {String} attr Attribute name.
     * @param  {String} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */DOMPurify.isValidAttribute=function(e,t,n){Ze||et({});const o=$e(e);const a=$e(t);return ht(o,a,n)};
/**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */DOMPurify.addHook=function(e,t){if(typeof t==="function"){te[e]=te[e]||[];d(te[e],t)}};
/**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     * @return {Function} removed(popped) hook
     */DOMPurify.removeHook=function(e){if(te[e])return f(te[e])};
/**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */DOMPurify.removeHooks=function(e){te[e]&&(te[e]=[])};DOMPurify.removeAllHooks=function(){te={}};return DOMPurify}var Y=createDOMPurify();return Y}));var t=e;export{t as default};

