import{a as I,_ as D}from"./AppTextField-a1a28005.js";import{b5 as L,o as m,c as _,F as C,h as B,b as e,e as t,aF as F,m as a,an as w,r as h,f as P,d as o,H as g,t as c,v as T,bl as j}from"./index-7294bbd4.js";import{u as b}from"./useGenerateImageVariant-97d824b1.js";import{m as N,a as M}from"./misc-mask-light-eb104613.js";import{V as $}from"./VNodeRenderer-65d298c1.js";import{V}from"./VImg-58e9b6f4.js";import{V as r}from"./VCol-7f95da18.js";import{V as z}from"./VCard-b5c127a0.js";import{V as x}from"./VCardText-f3dad09d.js";import{V as R}from"./VForm-623334ad.js";import{V as v}from"./VRow-4111d537.js";import{V as k}from"./VDivider-34c6095b.js";import"./VSelectionControl-77cf70c7.js";import"./VInput-ee82279d.js";import"./VTextField-b6d8b014.js";import"./forwardRefs-6ea3df5c.js";import"./VAvatar-0272051e.js";const S={class:"d-flex justify-center flex-wrap gap-3"},U={__name:"AuthProvider",setup(y){const{global:s}=L(),n=[{icon:"fa-facebook",color:"#4267b2",colorInDark:"#4267b2"},{icon:"fa-google",color:"#dd4b39",colorInDark:"#db4437"},{icon:"fa-twitter",color:"#1da1f2",colorInDark:"#1da1f2"}];return(u,p)=>(m(),_("div",S,[(m(),_(C,null,B(n,d=>e(w,{key:d.icon,icon:"",variant:"tonal",size:"38",color:a(s).name.value==="dark"?d.colorInDark:d.color,class:"rounded"},{default:t(()=>[e(F,{size:"18",icon:d.icon},null,8,["icon"])]),_:2},1032,["color"])),64))]))}},A="/assets/auth-v2-login-illustration-bordered-dark-a595a9b7.png",E="/assets/auth-v2-login-illustration-bordered-light-47ee3625.png",G="/assets/auth-v2-login-illustration-dark-0878e8b9.png",H="/assets/auth-v2-login-illustration-light-d1fd488d.png";const W={class:"position-relative bg-background rounded-lg w-100 ma-8 me-0"},q={class:"d-flex align-center justify-center w-100 h-100"},J={class:"text-h4 mb-1"},K={class:"text-capitalize"},O=o("p",{class:"mb-0"}," Please sign-in to your account and start the adventure ",-1),Q={class:"d-flex align-center flex-wrap justify-space-between mt-2 mb-4"},X=o("a",{class:"text-primary ms-2 mb-1",href:"#"}," Forgot Password? ",-1),Y=o("span",null,"New on our platform?",-1),Z=o("a",{class:"text-primary ms-2",href:"#"}," Create an account ",-1),ee=o("span",{class:"mx-4"},"or",-1),be={__name:"login2",setup(y){const s=h({email:"",password:"",remember:!1}),n=h(!1),u=b(H,G,E,A,!0),p=b(M,N);return(d,l)=>{const f=D;return m(),P(v,{"no-gutters":"",class:"auth-wrapper bg-surface"},{default:t(()=>[e(r,{md:"8",class:"d-none d-md-flex"},{default:t(()=>[o("div",W,[o("div",q,[e(V,{"max-width":"505",src:a(u),class:"auth-illustration mt-16 mb-2"},null,8,["src"])]),e(V,{class:"auth-footer-mask",src:a(p)},null,8,["src"])])]),_:1}),e(r,{cols:"12",md:"4",class:"auth-card-v2 d-flex align-center justify-center"},{default:t(()=>[e(z,{flat:"","max-width":500,class:"mt-12 mt-sm-0 pa-4"},{default:t(()=>[e(x,null,{default:t(()=>[e(a($),{nodes:a(g).app.logo,class:"mb-6"},null,8,["nodes"]),o("h4",J,[c(" Welcome to "),o("span",K,T(a(g).app.title),1),c("! 👋🏻 ")]),O]),_:1}),e(x,null,{default:t(()=>[e(R,{onSubmit:j(()=>{},["prevent"])},{default:t(()=>[e(v,null,{default:t(()=>[e(r,{cols:"12"},{default:t(()=>[e(f,{modelValue:a(s).email,"onUpdate:modelValue":l[0]||(l[0]=i=>a(s).email=i),autofocus:"",label:"Email",type:"email",placeholder:"johndoe@email.com"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12"},{default:t(()=>[e(f,{modelValue:a(s).password,"onUpdate:modelValue":l[1]||(l[1]=i=>a(s).password=i),label:"Password",placeholder:"············",type:a(n)?"text":"password","append-inner-icon":a(n)?"tabler-eye-off":"tabler-eye","onClick:appendInner":l[2]||(l[2]=i=>n.value=!a(n))},null,8,["modelValue","type","append-inner-icon"]),o("div",Q,[e(I,{modelValue:a(s).remember,"onUpdate:modelValue":l[3]||(l[3]=i=>a(s).remember=i),label:"Remember me"},null,8,["modelValue"]),X]),e(w,{block:"",type:"submit"},{default:t(()=>[c(" Login ")]),_:1})]),_:1}),e(r,{cols:"12",class:"text-center text-base"},{default:t(()=>[Y,Z]),_:1}),e(r,{cols:"12",class:"d-flex align-center"},{default:t(()=>[e(k),ee,e(k)]),_:1}),e(r,{cols:"12",class:"text-center"},{default:t(()=>[e(U)]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1})]),_:1})}}};export{be as default};
