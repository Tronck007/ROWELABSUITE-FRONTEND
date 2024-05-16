import{a0 as m,a9 as g,aL as b,a1 as f,a2 as v,b as o,a4 as h,aJ as x,ao as A,aM as I,aA as T,$ as d,az as R,bs as _,au as $,b5 as w,aQ as M,bt as F,J,K as X,q as u,aF as Y}from"./index-7294bbd4.js";import{m as q,M as z}from"./VImg-58e9b6f4.js";const D=m({start:Boolean,end:Boolean,...g(),...b()},"VListItemAction"),E=f()({name:"VListItemAction",props:D(),setup(e,t){let{slots:n}=t;return v(()=>o(e.tag,{class:["v-list-item-action",{"v-list-item-action--start":e.start,"v-list-item-action--end":e.end},e.class],style:e.style},n)),{}}});const K=m({bordered:Boolean,color:String,content:[Number,String],dot:Boolean,floating:Boolean,icon:h,inline:Boolean,label:{type:String,default:"$vuetify.badge"},max:[Number,String],modelValue:{type:Boolean,default:!0},offsetX:[Number,String],offsetY:[Number,String],textColor:String,...g(),...x({location:"top end"}),...A(),...b(),...I(),...q({transition:"scale-rotate-transition"})},"VBadge"),G=f()({name:"VBadge",inheritAttrs:!1,props:K(),setup(e,t){const{backgroundColorClasses:n,backgroundColorStyles:V}=T(d(e,"color")),{roundedClasses:C}=R(e),{t:y}=_(),{textColorClasses:B,textColorStyles:k}=$(d(e,"textColor")),{themeClasses:S}=w(),{locationStyles:P}=M(e,!0,a=>(e.floating?e.dot?2:4:e.dot?8:12)+(["top","bottom"].includes(a)?+(e.offsetY??0):["left","right"].includes(a)?+(e.offsetX??0):0));return v(()=>{const a=Number(e.content),s=!e.max||isNaN(a)?e.content:a<=+e.max?a:`${e.max}+`,[L,N]=F(t.attrs,["aria-atomic","aria-label","aria-live","role","title"]);return o(e.tag,u({class:["v-badge",{"v-badge--bordered":e.bordered,"v-badge--dot":e.dot,"v-badge--floating":e.floating,"v-badge--inline":e.inline},e.class]},N,{style:e.style}),{default:()=>{var l,i;return[o("div",{class:"v-badge__wrapper"},[(i=(l=t.slots).default)==null?void 0:i.call(l),o(z,{transition:e.transition},{default:()=>{var r,c;return[J(o("span",u({class:["v-badge__badge",S.value,n.value,C.value,B.value],style:[V.value,k.value,e.inline?{}:P.value],"aria-atomic":"true","aria-label":y(e.label,a),"aria-live":"polite",role:"status"},L),[e.dot?void 0:t.slots.badge?(c=(r=t.slots).badge)==null?void 0:c.call(r):e.icon?o(Y,{icon:e.icon},null):s]),[[X,e.modelValue]])]}})])]}})}),{}}});export{G as V,E as a};