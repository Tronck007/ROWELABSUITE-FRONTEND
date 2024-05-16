import{cb as A,i as B,j as F,r as n,o as R,c as L,d,b as t,m as e,M as b,e as s,H as f,t as c,v as _,bl as M,bf as N,an as j,a_ as U}from"./index-7294bbd4.js";import{a as H,_ as $}from"./AppTextField-a1a28005.js";import{u as z}from"./authStore-92e866b9.js";import{V as h}from"./VNodeRenderer-65d298c1.js";import{a as E,b as I,V as P}from"./VCard-b5c127a0.js";import{V as v}from"./VCardText-f3dad09d.js";import{V as D}from"./VForm-623334ad.js";import{V as O}from"./VRow-4111d537.js";import{V as x}from"./VCol-7f95da18.js";import"./VSelectionControl-77cf70c7.js";import"./VInput-ee82279d.js";import"./VImg-58e9b6f4.js";import"./VTextField-b6d8b014.js";import"./forwardRefs-6ea3df5c.js";import"./_commonjsHelpers-de833af9.js";import"./api-dde3c648.js";import"./VAvatar-0272051e.js";const G=o=>o==null,J=o=>Array.isArray(o)&&o.length===0,C=o=>G(o)||J(o)||o===!1?"This field is required":!!String(o).trim().length||"This field is required",K=`<svg width="238" height="238" viewBox="0 0 181 181" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1.30469" y="1.44312" width="178" height="178" rx="19" stroke="currentColor" stroke-opacity="0.16" stroke-width="2" stroke-dasharray="8 8"/>
<rect x="22.8047" y="22.9431" width="135" height="135" rx="10" fill="currentColor" fill-opacity="0.08"/>
</svg>
`,Q=`<svg width="239" height="234" viewBox="0 0 239 234" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="88.5605" y="0.700195" width="149" height="149" rx="19.5" stroke="currentColor" stroke-opacity="0.16"/>
<rect x="0.621094" y="33.761" width="200" height="200" rx="10" fill="currentColor" fill-opacity="0.08"/>
</svg>
`,W=()=>A();const X={class:"auth-wrapper d-flex align-center justify-center pa-4"},Y={class:"position-relative my-sm-16"},Z={class:"d-flex"},ee={class:"text-h4 mb-1"},te={class:"text-capitalize"},re={class:"d-flex align-center justify-space-between flex-wrap mt-2 mb-4"},be={__name:"login",setup(o){const k=W(),S=z(),y=B(),g=F(),u=n(!1),m=n(!1),V=n(),p=n({userCode:void 0,password:void 0,loginFailed:void 0}),i=n({userCode:"",password:""}),T=async()=>{try{const{userAbilityRules:r}=await S.login({userCode:i.value.userCode,password:i.value.password});k.update(r),await U(()=>{g.replace(y.query.to?String(y.query.to):"/")}),g.replace("/")}catch(r){console.error("Login error:",r),p.value.loginFailed="Login failed. Please check your credentials."}},q=async()=>{var r;(r=V.value)==null||r.validate().then(async({valid:a})=>{a&&(p.value.loginFailed=void 0,await T())})};return(r,a)=>{const w=$;return R(),L("div",X,[d("div",Y,[t(e(h),{nodes:("h"in r?r.h:e(b))("div",{innerHTML:e(Q)}),class:"text-primary auth-v1-top-shape d-none d-sm-block"},null,8,["nodes"]),t(e(h),{nodes:("h"in r?r.h:e(b))("div",{innerHTML:e(K)}),class:"text-primary auth-v1-bottom-shape d-none d-sm-block"},null,8,["nodes"]),t(P,{class:"auth-card pa-4","max-width":"448"},{default:s(()=>[t(E,{class:"justify-center"},{prepend:s(()=>[d("div",Z,[t(e(h),{nodes:e(f).app.logo},null,8,["nodes"])])]),default:s(()=>[t(I,{class:"font-weight-bold text-capitalize text-h3 py-1"},{default:s(()=>[c(_(e(f).app.title),1)]),_:1})]),_:1}),t(v,{class:"pt-1"},{default:s(()=>[d("h4",ee,[c(" Bienvenido a "),d("span",te,_(e(f).app.title),1),c("! 👋🏻 ")])]),_:1}),t(v,null,{default:s(()=>[t(D,{ref_key:"refVForm",ref:V,onSubmit:M(q,["prevent"])},{default:s(()=>[t(O,null,{default:s(()=>[t(x,{cols:"12"},{default:s(()=>[t(w,{modelValue:e(i).userCode,"onUpdate:modelValue":a[0]||(a[0]=l=>e(i).userCode=l),label:"Código de usuario",placeholder:"00000",type:"number",autofocus:"",rules:["requiredValidator"in r?r.requiredValidator:e(C)],"error-messages":e(p).user_code},null,8,["modelValue","rules","error-messages"])]),_:1}),t(x,{cols:"12"},{default:s(()=>[t(w,{modelValue:e(i).password,"onUpdate:modelValue":a[1]||(a[1]=l=>e(i).password=l),label:"Contraseña",placeholder:"············",rules:["requiredValidator"in r?r.requiredValidator:e(C)],type:e(u)?"text":"password","error-messages":e(p).password,"append-inner-icon":e(u)?"tabler-eye-off":"tabler-eye","onClick:appendInner":a[2]||(a[2]=l=>u.value=!e(u))},null,8,["modelValue","rules","type","error-messages","append-inner-icon"]),d("div",re,[t(H,{modelValue:e(m),"onUpdate:modelValue":a[3]||(a[3]=l=>N(m)?m.value=l:null),label:"Recuerdame"},null,8,["modelValue"])]),t(j,{block:"",type:"submit"},{default:s(()=>[c(" Login ")]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1})])])}}};export{be as default};