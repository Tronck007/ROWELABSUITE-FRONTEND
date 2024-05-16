import{a0 as O,a9 as Y,cv as re,a1 as p,a6 as u,a2 as U,b as l,J as G,K as le,a4 as J,c0 as K,bX as ue,ao as de,aM as ce,aN as fe,b1 as ve,az as me,ar as ye,a5 as ge,r as S,aA as be,$ as xe,au as Ce,w as Ve,ad as he,b2 as _e,c5 as ke,F as E,q as N,cj as Ie,bt as Pe,a7 as Fe,a8 as Se,aw as Be,bH as we,a_ as Z,cw as Te}from"./index-7294bbd4.js";import{m as Re,M as $e,I as Ae}from"./VImg-58e9b6f4.js";import{a as Le,b as Me,u as te,f as De,m as Ee,V as ee}from"./VInput-ee82279d.js";import{n as Ne,a as Oe,s as pe,f as Ue}from"./forwardRefs-6ea3df5c.js";const je=O({active:Boolean,max:[Number,String],value:{type:[Number,String],default:0},...Y(),...Re({transition:{component:re}})},"VCounter"),qe=p()({name:"VCounter",functional:!0,props:je(),setup(e,g){let{slots:a}=g;const h=u(()=>e.max?`${e.value} / ${e.max}`:String(e.value));return U(()=>l($e,{transition:e.transition},{default:()=>[G(l("div",{class:["v-counter",e.class],style:e.style},[a.default?a.default({counter:h.value,max:e.max,value:e.value}):h.value]),[[le,e.active]])]})),{}}});const ze=O({floating:Boolean,...Y()},"VFieldLabel"),D=p()({name:"VFieldLabel",props:ze(),setup(e,g){let{slots:a}=g;return U(()=>l(Le,{class:["v-field-label",{"v-field-label--floating":e.floating},e.class],style:e.style,"aria-hidden":e.floating||void 0},a)),{}}}),We=["underlined","outlined","filled","solo","solo-inverted","solo-filled","plain"],ne=O({appendInnerIcon:J,bgColor:String,clearable:Boolean,clearIcon:{type:J,default:"$clear"},active:Boolean,centerAffix:{type:Boolean,default:void 0},color:String,baseColor:String,dirty:Boolean,disabled:{type:Boolean,default:null},error:Boolean,flat:Boolean,label:String,persistentClear:Boolean,prependInnerIcon:J,reverse:Boolean,singleLine:Boolean,variant:{type:String,default:"filled",validator:e=>We.includes(e)},"onClick:clear":K(),"onClick:appendInner":K(),"onClick:prependInner":K(),...Y(),...ue(),...de(),...ce()},"VField"),ae=p()({name:"VField",inheritAttrs:!1,props:{id:String,...Me(),...ne()},emits:{"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,g){let{attrs:a,emit:h,slots:t}=g;const{themeClasses:b}=fe(e),{loaderClasses:C}=ve(e),{focusClasses:j,isFocused:w,focus:T,blur:R}=te(e),{InputIcon:B}=De(e),{roundedClasses:q}=me(e),{rtlClasses:$}=ye(),V=u(()=>e.dirty||e.active),f=u(()=>!e.singleLine&&!!(e.label||t.label)),z=ge(),o=u(()=>e.id||`input-${z}`),W=u(()=>`${o.value}-messages`),A=S(),_=S(),L=S(),n=u(()=>["plain","underlined"].includes(e.variant)),{backgroundColorClasses:d,backgroundColorStyles:c}=be(xe(e,"bgColor")),{textColorClasses:v,textColorStyles:X}=Ce(u(()=>e.error||e.disabled?void 0:V.value&&w.value?e.color:e.baseColor));Ve(V,s=>{if(f.value){const i=A.value.$el,m=_.value.$el;requestAnimationFrame(()=>{const y=Ne(i),r=m.getBoundingClientRect(),I=r.x-y.x,P=r.y-y.y-(y.height/2-r.height/2),x=r.width/.75,F=Math.abs(x-y.width)>1?{maxWidth:he(x)}:void 0,M=getComputedStyle(i),Q=getComputedStyle(m),ie=parseFloat(M.transitionDuration)*1e3||150,oe=parseFloat(Q.getPropertyValue("--v-field-label-scale")),se=Q.getPropertyValue("color");i.style.visibility="visible",m.style.visibility="hidden",Oe(i,{transform:`translate(${I}px, ${P}px) scale(${oe})`,color:se,...F},{duration:ie,easing:pe,direction:s?"normal":"reverse"}).finished.then(()=>{i.style.removeProperty("visibility"),m.style.removeProperty("visibility")})})}},{flush:"post"});const k=u(()=>({isActive:V,isFocused:w,controlRef:L,blur:R,focus:T}));function H(s){s.target!==document.activeElement&&s.preventDefault()}return U(()=>{var I,P,x;const s=e.variant==="outlined",i=t["prepend-inner"]||e.prependInnerIcon,m=!!(e.clearable||t.clear),y=!!(t["append-inner"]||e.appendInnerIcon||m),r=t.label?t.label({...k.value,label:e.label,props:{for:o.value}}):e.label;return l("div",N({class:["v-field",{"v-field--active":V.value,"v-field--appended":y,"v-field--center-affix":e.centerAffix??!n.value,"v-field--disabled":e.disabled,"v-field--dirty":e.dirty,"v-field--error":e.error,"v-field--flat":e.flat,"v-field--has-background":!!e.bgColor,"v-field--persistent-clear":e.persistentClear,"v-field--prepended":i,"v-field--reverse":e.reverse,"v-field--single-line":e.singleLine,"v-field--no-label":!r,[`v-field--variant-${e.variant}`]:!0},b.value,d.value,j.value,C.value,q.value,$.value,e.class],style:[c.value,e.style],onClick:H},a),[l("div",{class:"v-field__overlay"},null),l(_e,{name:"v-field",active:!!e.loading,color:e.error?"error":typeof e.loading=="string"?e.loading:e.color},{default:t.loader}),i&&l("div",{key:"prepend",class:"v-field__prepend-inner"},[e.prependInnerIcon&&l(B,{key:"prepend-icon",name:"prependInner"},null),(I=t["prepend-inner"])==null?void 0:I.call(t,k.value)]),l("div",{class:"v-field__field","data-no-activator":""},[["filled","solo","solo-inverted","solo-filled"].includes(e.variant)&&f.value&&l(D,{key:"floating-label",ref:_,class:[v.value],floating:!0,for:o.value,style:X.value},{default:()=>[r]}),l(D,{ref:A,for:o.value},{default:()=>[r]}),(P=t.default)==null?void 0:P.call(t,{...k.value,props:{id:o.value,class:"v-field__input","aria-describedby":W.value},focus:T,blur:R})]),m&&l(ke,{key:"clear"},{default:()=>[G(l("div",{class:"v-field__clearable",onMousedown:F=>{F.preventDefault(),F.stopPropagation()}},[t.clear?t.clear():l(B,{name:"clear"},null)]),[[le,e.dirty]])]}),y&&l("div",{key:"append",class:"v-field__append-inner"},[(x=t["append-inner"])==null?void 0:x.call(t,k.value),e.appendInnerIcon&&l(B,{key:"append-icon",name:"appendInner"},null)]),l("div",{class:["v-field__outline",v.value],style:X.value},[s&&l(E,null,[l("div",{class:"v-field__outline__start"},null),f.value&&l("div",{class:"v-field__outline__notch"},[l(D,{ref:_,floating:!0,for:o.value},{default:()=>[r]})]),l("div",{class:"v-field__outline__end"},null)]),n.value&&f.value&&l(D,{ref:_,floating:!0,for:o.value},{default:()=>[r]})])])}),{controlRef:L}}});function Xe(e){const g=Object.keys(ae.props).filter(a=>!Ie(a)&&a!=="class"&&a!=="style");return Pe(e,g)}const He=["color","file","time","date","datetime-local","week","month"],Je=O({autofocus:Boolean,counter:[Boolean,Number,String],counterValue:[Number,Function],prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,suffix:String,role:String,type:{type:String,default:"text"},modelModifiers:Object,...Ee(),...ne()},"VTextField"),Ze=p()({name:"VTextField",directives:{Intersect:Ae},inheritAttrs:!1,props:Je(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,g){let{attrs:a,emit:h,slots:t}=g;const b=Fe(e,"modelValue"),{isFocused:C,focus:j,blur:w}=te(e),T=u(()=>typeof e.counterValue=="function"?e.counterValue(b.value):typeof e.counterValue=="number"?e.counterValue:(b.value??"").toString().length),R=u(()=>{if(a.maxlength)return a.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter}),B=u(()=>["plain","underlined"].includes(e.variant));function q(n,d){var c,v;!e.autofocus||!n||(v=(c=d[0].target)==null?void 0:c.focus)==null||v.call(c)}const $=S(),V=S(),f=S(),z=u(()=>He.includes(e.type)||e.persistentPlaceholder||C.value||e.active);function o(){var n;f.value!==document.activeElement&&((n=f.value)==null||n.focus()),C.value||j()}function W(n){h("mousedown:control",n),n.target!==f.value&&(o(),n.preventDefault())}function A(n){o(),h("click:control",n)}function _(n){n.stopPropagation(),o(),Z(()=>{b.value=null,Te(e["onClick:clear"],n)})}function L(n){var c;const d=n.target;if(b.value=d.value,(c=e.modelModifiers)!=null&&c.trim&&["text","search","password","tel","url"].includes(e.type)){const v=[d.selectionStart,d.selectionEnd];Z(()=>{d.selectionStart=v[0],d.selectionEnd=v[1]})}}return U(()=>{const n=!!(t.counter||e.counter!==!1&&e.counter!=null),d=!!(n||t.details),[c,v]=Se(a),[{modelValue:X,...k}]=ee.filterProps(e),[H]=Xe(e);return l(ee,N({ref:$,modelValue:b.value,"onUpdate:modelValue":s=>b.value=s,class:["v-text-field",{"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-text-field--plain-underlined":["plain","underlined"].includes(e.variant)},e.class],style:e.style},c,k,{centerAffix:!B.value,focused:C.value}),{...t,default:s=>{let{id:i,isDisabled:m,isDirty:y,isReadonly:r,isValid:I}=s;return l(ae,N({ref:V,onMousedown:W,onClick:A,"onClick:clear":_,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:e.role},H,{id:i.value,active:z.value||y.value,dirty:y.value||e.dirty,disabled:m.value,focused:C.value,error:I.value===!1}),{...t,default:P=>{let{props:{class:x,...F}}=P;const M=G(l("input",N({ref:f,value:b.value,onInput:L,autofocus:e.autofocus,readonly:r.value,disabled:m.value,name:e.name,placeholder:e.placeholder,size:1,type:e.type,onFocus:o,onBlur:w},F,v),null),[[Be("intersect"),{handler:q},null,{once:!0}]]);return l(E,null,[e.prefix&&l("span",{class:"v-text-field__prefix"},[l("span",{class:"v-text-field__prefix__text"},[e.prefix])]),t.default?l("div",{class:x,"data-no-activator":""},[t.default(),M]):we(M,{class:x}),e.suffix&&l("span",{class:"v-text-field__suffix"},[l("span",{class:"v-text-field__suffix__text"},[e.suffix])])])}})},details:d?s=>{var i;return l(E,null,[(i=t.details)==null?void 0:i.call(t,s),n&&l(E,null,[l("span",null,null),l(qe,{active:e.persistentCounter||C.value,value:T.value,max:R.value},t.counter)])])}:void 0})}),Ue({},$,V,f)}});export{Ze as V,ne as a,ae as b,Xe as f,Je as m};