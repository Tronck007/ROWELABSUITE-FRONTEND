import{cj as Pe,ck as Ce,a1 as Ae,b as M,q as _,T as re,a0 as q,r as $,bK as W,aZ as ue,bR as R,w as F,cl as He,cm as me,cn as te,co as ne,cp as ye,a6 as P,a_ as ee,cq as ge,ad as B,ac as he,bG as fe,cr as Te,U as Fe,cs as Ie,bQ as de,bT as Ve,ab as z,aW as $e,G as qe,bA as Le,O as We,c8 as je,bD as ze,a9 as Ye,aI as Ge,aM as Xe,a7 as Ke,aN as Ue,ar as Ze,aA as Je,$ as Qe,aP as et,aX as tt,a2 as nt,ct as ot,J as at,K as it,aw as rt,F as st,cu as lt}from"./index-7294bbd4.js";import{a as K,d as ct,s as se,b as ut,n as Me,B as oe,g as we}from"./forwardRefs-6ea3df5c.js";import{m as ft,M as dt}from"./VImg-58e9b6f4.js";const U=new WeakMap;function vt(e,n){Object.keys(n).forEach(t=>{if(Pe(t)){const a=Ce(t),o=U.get(e);if(n[t]==null)o==null||o.forEach(i=>{const[s,r]=i;s===a&&(e.removeEventListener(a,r),o.delete(i))});else if(!o||![...o].some(i=>i[0]===a&&i[1]===n[t])){e.addEventListener(a,n[t]);const i=o||new Set;i.add([a,n[t]]),U.has(e)||U.set(e,i)}}else n[t]==null?e.removeAttribute(t):e.setAttribute(t,n[t])})}function mt(e,n){Object.keys(n).forEach(t=>{if(Pe(t)){const a=Ce(t),o=U.get(e);o==null||o.forEach(i=>{const[s,r]=i;s===a&&(e.removeEventListener(a,r),o.delete(i))})}else e.removeAttribute(t)})}function Be(e){if(typeof e.getRootNode!="function"){for(;e.parentNode;)e=e.parentNode;return e!==document?null:document}const n=e.getRootNode();return n!==document&&n.getRootNode({composed:!0})!==document?null:n}function yt(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;for(;e;){if(n?gt(e):ve(e))return e;e=e.parentElement}return document.scrollingElement}function J(e,n){const t=[];if(n&&e&&!n.contains(e))return t;for(;e&&(ve(e)&&t.push(e),e!==n);)e=e.parentElement;return t}function ve(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return n.overflowY==="scroll"||n.overflowY==="auto"&&e.scrollHeight>e.clientHeight}function gt(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return["scroll","auto"].includes(n.overflowY)}function ht(e){for(;e;){if(window.getComputedStyle(e).position==="fixed")return!0;e=e.offsetParent}return!1}const wt=q({target:Object},"v-dialog-transition"),Zt=Ae()({name:"VDialogTransition",props:wt(),setup(e,n){let{slots:t}=n;const a={onBeforeEnter(o){o.style.pointerEvents="none",o.style.visibility="hidden"},async onEnter(o,i){var v;await new Promise(h=>requestAnimationFrame(h)),await new Promise(h=>requestAnimationFrame(h)),o.style.visibility="";const{x:s,y:r,sx:c,sy:f,speed:u}=Ee(e.target,o),m=K(o,[{transform:`translate(${s}px, ${r}px) scale(${c}, ${f})`,opacity:0},{}],{duration:225*u,easing:ct});(v=be(o))==null||v.forEach(h=>{K(h,[{opacity:0},{opacity:0,offset:.33},{}],{duration:225*2*u,easing:se})}),m.finished.then(()=>i())},onAfterEnter(o){o.style.removeProperty("pointer-events")},onBeforeLeave(o){o.style.pointerEvents="none"},async onLeave(o,i){var v;await new Promise(h=>requestAnimationFrame(h));const{x:s,y:r,sx:c,sy:f,speed:u}=Ee(e.target,o);K(o,[{},{transform:`translate(${s}px, ${r}px) scale(${c}, ${f})`,opacity:0}],{duration:125*u,easing:ut}).finished.then(()=>i()),(v=be(o))==null||v.forEach(h=>{K(h,[{},{opacity:0,offset:.2},{opacity:0}],{duration:125*2*u,easing:se})})},onAfterLeave(o){o.style.removeProperty("pointer-events")}};return()=>e.target?M(re,_({name:"dialog-transition"},a,{css:!1}),t):M(re,{name:"dialog-transition"},t)}});function be(e){var t;const n=(t=e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list"))==null?void 0:t.children;return n&&[...n]}function Ee(e,n){const t=e.getBoundingClientRect(),a=Me(n),[o,i]=getComputedStyle(n).transformOrigin.split(" ").map(S=>parseFloat(S)),[s,r]=getComputedStyle(n).getPropertyValue("--v-overlay-anchor-origin").split(" ");let c=t.left+t.width/2;s==="left"||r==="left"?c-=t.width/2:(s==="right"||r==="right")&&(c+=t.width/2);let f=t.top+t.height/2;s==="top"||r==="top"?f-=t.height/2:(s==="bottom"||r==="bottom")&&(f+=t.height/2);const u=t.width/a.width,m=t.height/a.height,v=Math.max(1,u,m),h=u/v||0,y=m/v||0,d=a.width*a.height/(window.innerWidth*window.innerHeight),k=d>.12?Math.min(1.5,(d-.12)*10+1):1;return{x:c-(o+a.left),y:f-(i+a.top),sx:h,sy:y,speed:k}}function ae(e,n){return{x:e.x+n.x,y:e.y+n.y}}function bt(e,n){return{x:e.x-n.x,y:e.y-n.y}}function xe(e,n){if(e.side==="top"||e.side==="bottom"){const{side:t,align:a}=e,o=a==="left"?0:a==="center"?n.width/2:a==="right"?n.width:a,i=t==="top"?0:t==="bottom"?n.height:t;return ae({x:o,y:i},n)}else if(e.side==="left"||e.side==="right"){const{side:t,align:a}=e,o=t==="left"?0:t==="right"?n.width:t,i=a==="top"?0:a==="center"?n.height/2:a==="bottom"?n.height:a;return ae({x:o,y:i},n)}return ae({x:n.width/2,y:n.height/2},n)}const Re={static:St,connected:Ot},Et=q({locationStrategy:{type:[String,Function],default:"static",validator:e=>typeof e=="function"||e in Re},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies");function xt(e,n){const t=$({}),a=$();W&&(ue(()=>!!(n.isActive.value&&e.locationStrategy),i=>{var s,r;F(()=>e.locationStrategy,i),R(()=>{a.value=void 0}),typeof e.locationStrategy=="function"?a.value=(s=e.locationStrategy(n,e,t))==null?void 0:s.updateLocation:a.value=(r=Re[e.locationStrategy](n,e,t))==null?void 0:r.updateLocation}),window.addEventListener("resize",o,{passive:!0}),R(()=>{window.removeEventListener("resize",o),a.value=void 0}));function o(i){var s;(s=a.value)==null||s.call(a,i)}return{contentStyles:t,updateLocation:a}}function St(){}function pt(e,n){n?e.style.removeProperty("left"):e.style.removeProperty("right");const t=Me(e);return n?t.x+=parseFloat(e.style.right||0):t.x-=parseFloat(e.style.left||0),t.y-=parseFloat(e.style.top||0),t}function Ot(e,n,t){ht(e.activatorEl.value)&&Object.assign(t.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0});const{preferredAnchor:o,preferredOrigin:i}=He(()=>{const y=me(n.location,e.isRtl.value),d=n.origin==="overlap"?y:n.origin==="auto"?te(y):me(n.origin,e.isRtl.value);return y.side===d.side&&y.align===ne(d).align?{preferredAnchor:ye(y),preferredOrigin:ye(d)}:{preferredAnchor:y,preferredOrigin:d}}),[s,r,c,f]=["minWidth","minHeight","maxWidth","maxHeight"].map(y=>P(()=>{const d=parseFloat(n[y]);return isNaN(d)?1/0:d})),u=P(()=>{if(Array.isArray(n.offset))return n.offset;if(typeof n.offset=="string"){const y=n.offset.split(" ").map(parseFloat);return y.length<2&&y.push(0),y}return typeof n.offset=="number"?[n.offset,0]:[0,0]});let m=!1;const v=new ResizeObserver(()=>{m&&h()});F([e.activatorEl,e.contentEl],(y,d)=>{let[k,S]=y,[E,l]=d;E&&v.unobserve(E),k&&v.observe(k),l&&v.unobserve(l),S&&v.observe(S)},{immediate:!0}),R(()=>{v.disconnect()});function h(){if(m=!1,requestAnimationFrame(()=>{requestAnimationFrame(()=>m=!0)}),!e.activatorEl.value||!e.contentEl.value)return;const y=e.activatorEl.value.getBoundingClientRect(),d=pt(e.contentEl.value,e.isRtl.value),k=J(e.contentEl.value),S=12;k.length||(k.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(d.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),d.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)));const E=k.reduce((p,x)=>{const g=x.getBoundingClientRect(),b=new oe({x:x===document.documentElement?0:g.x,y:x===document.documentElement?0:g.y,width:x.clientWidth,height:x.clientHeight});return p?new oe({x:Math.max(p.left,b.left),y:Math.max(p.top,b.top),width:Math.min(p.right,b.right)-Math.max(p.left,b.left),height:Math.min(p.bottom,b.bottom)-Math.max(p.top,b.top)}):b},void 0);E.x+=S,E.y+=S,E.width-=S*2,E.height-=S*2;let l={anchor:o.value,origin:i.value};function A(p){const x=new oe(d),g=xe(p.anchor,y),b=xe(p.origin,x);let{x:T,y:L}=bt(g,b);switch(p.anchor.side){case"top":L-=u.value[0];break;case"bottom":L+=u.value[0];break;case"left":T-=u.value[0];break;case"right":T+=u.value[0];break}switch(p.anchor.align){case"top":L-=u.value[1];break;case"bottom":L+=u.value[1];break;case"left":T-=u.value[1];break;case"right":T+=u.value[1];break}return x.x+=T,x.y+=L,x.width=Math.min(x.width,c.value),x.height=Math.min(x.height,f.value),{overflows:we(x,E),x:T,y:L}}let N=0,H=0;const I={x:0,y:0},Y={x:!1,y:!1};let G=-1;for(;!(G++>10);){const{x:p,y:x,overflows:g}=A(l);N+=p,H+=x,d.x+=p,d.y+=x;{const b=ge(l.anchor),T=g.x.before||g.x.after,L=g.y.before||g.y.after;let j=!1;if(["x","y"].forEach(O=>{if(O==="x"&&T&&!Y.x||O==="y"&&L&&!Y.y){const w={anchor:{...l.anchor},origin:{...l.origin}},C=O==="x"?b==="y"?ne:te:b==="y"?te:ne;w.anchor=C(w.anchor),w.origin=C(w.origin);const{overflows:V}=A(w);(V[O].before<=g[O].before&&V[O].after<=g[O].after||V[O].before+V[O].after<(g[O].before+g[O].after)/2)&&(l=w,j=Y[O]=!0)}}),j)continue}g.x.before&&(N+=g.x.before,d.x+=g.x.before),g.x.after&&(N-=g.x.after,d.x-=g.x.after),g.y.before&&(H+=g.y.before,d.y+=g.y.before),g.y.after&&(H-=g.y.after,d.y-=g.y.after);{const b=we(d,E);I.x=E.width-b.x.before-b.x.after,I.y=E.height-b.y.before-b.y.after,N+=b.x.before,d.x+=b.x.before,H+=b.y.before,d.y+=b.y.before}break}const D=ge(l.anchor);return Object.assign(t.value,{"--v-overlay-anchor-origin":`${l.anchor.side} ${l.anchor.align}`,transformOrigin:`${l.origin.side} ${l.origin.align}`,top:B(ie(H)),left:e.isRtl.value?void 0:B(ie(N)),right:e.isRtl.value?B(ie(-N)):void 0,minWidth:B(D==="y"?Math.min(s.value,y.width):s.value),maxWidth:B(Se(he(I.x,s.value===1/0?0:s.value,c.value))),maxHeight:B(Se(he(I.y,r.value===1/0?0:r.value,f.value)))}),{available:I,contentBox:d}}return F(()=>[o.value,i.value,n.offset,n.minWidth,n.minHeight,n.maxWidth,n.maxHeight],()=>h()),ee(()=>{const y=h();if(!y)return;const{available:d,contentBox:k}=y;k.height>d.y&&requestAnimationFrame(()=>{h(),requestAnimationFrame(()=>{h()})})}),{updateLocation:h}}function ie(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function Se(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let le=!0;const Q=[];function kt(e){!le||Q.length?(Q.push(e),ce()):(le=!1,e(),ce())}let pe=-1;function ce(){cancelAnimationFrame(pe),pe=requestAnimationFrame(()=>{const e=Q.shift();e&&e(),Q.length?ce():le=!0})}const Z={none:null,close:At,block:Tt,reposition:Ft},Pt=q({scrollStrategy:{type:[String,Function],default:"block",validator:e=>typeof e=="function"||e in Z}},"VOverlay-scroll-strategies");function Ct(e,n){if(!W)return;let t;fe(async()=>{t==null||t.stop(),n.isActive.value&&e.scrollStrategy&&(t=Te(),await ee(),t.active&&t.run(()=>{var a;typeof e.scrollStrategy=="function"?e.scrollStrategy(n,e,t):(a=Z[e.scrollStrategy])==null||a.call(Z,n,e,t)}))}),R(()=>{t==null||t.stop()})}function At(e){function n(t){e.isActive.value=!1}De(e.activatorEl.value??e.contentEl.value,n)}function Tt(e,n){var s;const t=(s=e.root.value)==null?void 0:s.offsetParent,a=[...new Set([...J(e.activatorEl.value,n.contained?t:void 0),...J(e.contentEl.value,n.contained?t:void 0)])].filter(r=>!r.classList.contains("v-overlay-scroll-blocked")),o=window.innerWidth-document.documentElement.offsetWidth,i=(r=>ve(r)&&r)(t||document.documentElement);i&&e.root.value.classList.add("v-overlay--scroll-blocked"),a.forEach((r,c)=>{r.style.setProperty("--v-body-scroll-x",B(-r.scrollLeft)),r.style.setProperty("--v-body-scroll-y",B(-r.scrollTop)),r!==document.documentElement&&r.style.setProperty("--v-scrollbar-offset",B(o)),r.classList.add("v-overlay-scroll-blocked")}),R(()=>{a.forEach((r,c)=>{const f=parseFloat(r.style.getPropertyValue("--v-body-scroll-x")),u=parseFloat(r.style.getPropertyValue("--v-body-scroll-y"));r.style.removeProperty("--v-body-scroll-x"),r.style.removeProperty("--v-body-scroll-y"),r.style.removeProperty("--v-scrollbar-offset"),r.classList.remove("v-overlay-scroll-blocked"),r.scrollLeft=-f,r.scrollTop=-u}),i&&e.root.value.classList.remove("v-overlay--scroll-blocked")})}function Ft(e,n,t){let a=!1,o=-1,i=-1;function s(r){kt(()=>{var u,m;const c=performance.now();(m=(u=e.updateLocation).value)==null||m.call(u,r),a=(performance.now()-c)/(1e3/60)>2})}i=(typeof requestIdleCallback>"u"?r=>r():requestIdleCallback)(()=>{t.run(()=>{De(e.activatorEl.value??e.contentEl.value,r=>{a?(cancelAnimationFrame(o),o=requestAnimationFrame(()=>{o=requestAnimationFrame(()=>{s(r)})})):s(r)})})}),R(()=>{typeof cancelIdleCallback<"u"&&cancelIdleCallback(i),cancelAnimationFrame(o)})}function De(e,n){const t=[document,...J(e)];t.forEach(a=>{a.addEventListener("scroll",n,{passive:!0})}),R(()=>{t.forEach(a=>{a.removeEventListener("scroll",n)})})}const Lt=Symbol.for("vuetify:v-menu"),Mt=q({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function Bt(e,n){const t={},a=o=>()=>{if(!W)return Promise.resolve(!0);const i=o==="openDelay";return t.closeDelay&&window.clearTimeout(t.closeDelay),delete t.closeDelay,t.openDelay&&window.clearTimeout(t.openDelay),delete t.openDelay,new Promise(s=>{const r=parseInt(e[o]??0,10);t[o]=window.setTimeout(()=>{n==null||n(i),s(i)},r)})};return{runCloseDelay:a("closeDelay"),runOpenDelay:a("openDelay")}}const Rt=q({activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...Mt()},"VOverlay-activator");function Dt(e,n){let{isActive:t,isTop:a}=n;const o=$();let i=!1,s=!1,r=!0;const c=P(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),f=P(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!c.value),{runOpenDelay:u,runCloseDelay:m}=Bt(e,l=>{l===(e.openOnHover&&i||c.value&&s)&&!(e.openOnHover&&t.value&&!a.value)&&(t.value!==l&&(r=!0),t.value=l)}),v={onClick:l=>{l.stopPropagation(),o.value=l.currentTarget||l.target,t.value=!t.value},onMouseenter:l=>{var A;(A=l.sourceCapabilities)!=null&&A.firesTouchEvents||(i=!0,o.value=l.currentTarget||l.target,u())},onMouseleave:l=>{i=!1,m()},onFocus:l=>{Ve(l.target,":focus-visible")!==!1&&(s=!0,l.stopPropagation(),o.value=l.currentTarget||l.target,u())},onBlur:l=>{s=!1,l.stopPropagation(),m()}},h=P(()=>{const l={};return f.value&&(l.onClick=v.onClick),e.openOnHover&&(l.onMouseenter=v.onMouseenter,l.onMouseleave=v.onMouseleave),c.value&&(l.onFocus=v.onFocus,l.onBlur=v.onBlur),l}),y=P(()=>{const l={};if(e.openOnHover&&(l.onMouseenter=()=>{i=!0,u()},l.onMouseleave=()=>{i=!1,m()}),c.value&&(l.onFocusin=()=>{s=!0,u()},l.onFocusout=()=>{s=!1,m()}),e.closeOnContentClick){const A=Fe(Lt,null);l.onClick=()=>{t.value=!1,A==null||A.closeParents()}}return l}),d=P(()=>{const l={};return e.openOnHover&&(l.onMouseenter=()=>{r&&(i=!0,r=!1,u())},l.onMouseleave=()=>{i=!1,m()}),l});F(a,l=>{l&&(e.openOnHover&&!i&&(!c.value||!s)||c.value&&!s&&(!e.openOnHover||!i))&&(t.value=!1)});const k=$();fe(()=>{k.value&&ee(()=>{o.value=Ie(k.value)})});const S=de("useActivator");let E;return F(()=>!!e.activator,l=>{l&&W?(E=Te(),E.run(()=>{Nt(e,S,{activatorEl:o,activatorEvents:h})})):E&&E.stop()},{flush:"post",immediate:!0}),R(()=>{E==null||E.stop()}),{activatorEl:o,activatorRef:k,activatorEvents:h,contentEvents:y,scrimEvents:d}}function Nt(e,n,t){let{activatorEl:a,activatorEvents:o}=t;F(()=>e.activator,(c,f)=>{if(f&&c!==f){const u=r(f);u&&s(u)}c&&ee(()=>i())},{immediate:!0}),F(()=>e.activatorProps,()=>{i()}),R(()=>{s()});function i(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:r(),f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;c&&vt(c,_(o.value,f))}function s(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:r(),f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;c&&mt(c,_(o.value,f))}function r(){var u,m;let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator,f;if(c)if(c==="parent"){let v=(m=(u=n==null?void 0:n.proxy)==null?void 0:u.$el)==null?void 0:m.parentNode;for(;v!=null&&v.hasAttribute("data-no-activator");)v=v.parentNode;f=v}else typeof c=="string"?f=document.querySelector(c):"$el"in c?f=c.$el:f=c;return a.value=(f==null?void 0:f.nodeType)===Node.ELEMENT_NODE?f:null,a.value}}function _t(){if(!W)return z(!1);const{ssr:e}=$e();if(e){const n=z(!1);return qe(()=>{n.value=!0}),n}else return z(!0)}const Ht=q({eager:Boolean},"lazy");function It(e,n){const t=z(!1),a=P(()=>t.value||e.eager||n.value);F(n,()=>t.value=!0);function o(){e.eager||(t.value=!1)}return{isBooted:t,hasContent:a,onAfterLeave:o}}function Vt(){const n=de("useScopeId").vnode.scopeId;return{scopeId:n?{[n]:""}:void 0}}const Oe=Symbol.for("vuetify:stack"),X=Le([]);function $t(e,n,t){const a=de("useStack"),o=!t,i=Fe(Oe,void 0),s=Le({activeChildren:new Set});We(Oe,s);const r=z(+n.value);ue(e,()=>{var m;const u=(m=X.at(-1))==null?void 0:m[1];r.value=u?u+10:+n.value,o&&X.push([a.uid,r.value]),i==null||i.activeChildren.add(a.uid),R(()=>{if(o){const v=ze(X).findIndex(h=>h[0]===a.uid);X.splice(v,1)}i==null||i.activeChildren.delete(a.uid)})});const c=z(!0);o&&fe(()=>{var m;const u=((m=X.at(-1))==null?void 0:m[0])===a.uid;setTimeout(()=>c.value=u)});const f=P(()=>!s.activeChildren.size);return{globalTop:je(c),localTop:f,stackStyles:P(()=>({zIndex:r.value}))}}function qt(e){return{teleportTarget:P(()=>{const t=e.value;if(t===!0||!W)return;const a=t===!1?document.body:typeof t=="string"?document.querySelector(t):t;if(a==null)return;let o=a.querySelector(":scope > .v-overlay-container");return o||(o=document.createElement("div"),o.className="v-overlay-container",a.appendChild(o)),o})}}function Wt(){return!0}function Ne(e,n,t){if(!e||_e(e,t)===!1)return!1;const a=Be(n);if(typeof ShadowRoot<"u"&&a instanceof ShadowRoot&&a.host===e.target)return!1;const o=(typeof t.value=="object"&&t.value.include||(()=>[]))();return o.push(n),!o.some(i=>i==null?void 0:i.contains(e.target))}function _e(e,n){return(typeof n.value=="object"&&n.value.closeConditional||Wt)(e)}function jt(e,n,t){const a=typeof t.value=="function"?t.value:t.value.handler;n._clickOutside.lastMousedownWasOutside&&Ne(e,n,t)&&setTimeout(()=>{_e(e,t)&&a&&a(e)},0)}function ke(e,n){const t=Be(e);n(document),typeof ShadowRoot<"u"&&t instanceof ShadowRoot&&n(t)}const zt={mounted(e,n){const t=o=>jt(o,e,n),a=o=>{e._clickOutside.lastMousedownWasOutside=Ne(o,e,n)};ke(e,o=>{o.addEventListener("click",t,!0),o.addEventListener("mousedown",a,!0)}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[n.instance.$.uid]={onClick:t,onMousedown:a}},unmounted(e,n){e._clickOutside&&(ke(e,t=>{var i;if(!t||!((i=e._clickOutside)!=null&&i[n.instance.$.uid]))return;const{onClick:a,onMousedown:o}=e._clickOutside[n.instance.$.uid];t.removeEventListener("click",a,!0),t.removeEventListener("mousedown",o,!0)}),delete e._clickOutside[n.instance.$.uid])}};function Yt(e){const{modelValue:n,color:t,...a}=e;return M(re,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&M("div",_({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},a),null)]})}const Gt=q({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...Rt(),...Ye(),...Ge(),...Ht(),...Et(),...Pt(),...Xe(),...ft()},"VOverlay"),Jt=Ae()({name:"VOverlay",directives:{ClickOutside:zt},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...Gt()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,n){let{slots:t,attrs:a,emit:o}=n;const i=Ke(e,"modelValue"),s=P({get:()=>i.value,set:w=>{w&&e.disabled||(i.value=w)}}),{teleportTarget:r}=qt(P(()=>e.attach||e.contained)),{themeClasses:c}=Ue(e),{rtlClasses:f,isRtl:u}=Ze(),{hasContent:m,onAfterLeave:v}=It(e,s),h=Je(P(()=>typeof e.scrim=="string"?e.scrim:null)),{globalTop:y,localTop:d,stackStyles:k}=$t(s,Qe(e,"zIndex"),e._disableGlobalStack),{activatorEl:S,activatorRef:E,activatorEvents:l,contentEvents:A,scrimEvents:N}=Dt(e,{isActive:s,isTop:d}),{dimensionStyles:H}=et(e),I=_t(),{scopeId:Y}=Vt();F(()=>e.disabled,w=>{w&&(s.value=!1)});const G=$(),D=$(),{contentStyles:p,updateLocation:x}=xt(e,{isRtl:u,contentEl:D,activatorEl:S,isActive:s});Ct(e,{root:G,contentEl:D,activatorEl:S,isActive:s,updateLocation:x});function g(w){o("click:outside",w),e.persistent?O():s.value=!1}function b(){return s.value&&y.value}W&&F(s,w=>{w?window.addEventListener("keydown",T):window.removeEventListener("keydown",T)},{immediate:!0});function T(w){var C,V;w.key==="Escape"&&y.value&&(e.persistent?O():(s.value=!1,(C=D.value)!=null&&C.contains(document.activeElement)&&((V=S.value)==null||V.focus())))}const L=tt();ue(()=>e.closeOnBack,()=>{lt(L,w=>{y.value&&s.value?(w(!1),e.persistent?O():s.value=!1):w()})});const j=$();F(()=>s.value&&(e.absolute||e.contained)&&r.value==null,w=>{if(w){const C=yt(G.value);C&&C!==document.scrollingElement&&(j.value=C.scrollTop)}});function O(){e.noClickAnimation||D.value&&K(D.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:se})}return nt(()=>{var w;return M(st,null,[(w=t.activator)==null?void 0:w.call(t,{isActive:s.value,props:_({ref:E},l.value,e.activatorProps)}),I.value&&m.value&&M(ot,{disabled:!r.value,to:r.value},{default:()=>[M("div",_({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":s.value,"v-overlay--contained":e.contained},c.value,f.value,e.class],style:[k.value,{top:B(j.value)},e.style],ref:G},Y,a),[M(Yt,_({color:h,modelValue:s.value&&!!e.scrim},N.value),null),M(dt,{appear:!0,persisted:!0,transition:e.transition,target:S.value,onAfterLeave:()=>{v(),o("afterLeave")}},{default:()=>{var C;return[at(M("div",_({ref:D,class:["v-overlay__content",e.contentClass],style:[H.value,p.value]},A.value,e.contentProps),[(C=t.default)==null?void 0:C.call(t,{isActive:s})]),[[it,s.value],[rt("click-outside"),{handler:g,closeConditional:b,include:()=>[S.value]}]])]}})])]})])}),{activatorEl:S,animateClick:O,contentEl:D,globalTop:y,localTop:d,updateLocation:x}}});export{Jt as V,Zt as a,Lt as b,yt as g,Gt as m,Vt as u};