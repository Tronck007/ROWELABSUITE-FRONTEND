import{u as h}from"./authStore-92e866b9.js";import{bq as L,r as b,j as k,G as T,br as I,o as x,f as S,e as t,b as e,m,t as o,aF as n}from"./index-7294bbd4.js";import{V as f}from"./VAvatar-0272051e.js";import{V as p}from"./VImg-58e9b6f4.js";import{V as z}from"./VMenu-81ec18fe.js";import{V as D,a as s,b as r,c as E}from"./VList-76b48cdc.js";import{a as N,V as _}from"./VBadge-868fc373.js";import{V as v}from"./VDivider-34c6095b.js";const A=L("theme",()=>{const l=b(!1);function i(){l.value=!l.value,console.log("isNavDrawerOpen --",l.value)}return{isNavDrawerOpen:l,toggleNavDrawer:i}}),g="/assets/avatar-1-129659bb.png",P={__name:"UserProfile",setup(l){const i=A(),w=h(),V=k();let c=b(null);const u=()=>{clearTimeout(c.value),c.value=setTimeout(()=>{d()},30*60*1e3)},a=()=>{u()};T(()=>{u(),window.addEventListener("mousemove",a),window.addEventListener("keypress",a),window.addEventListener("scroll",a)}),I(()=>{clearTimeout(c.value),window.removeEventListener("mousemove",a),window.removeEventListener("keypress",a),window.removeEventListener("scroll",a)});const y=()=>{i.toggleNavDrawer()},d=async()=>{await w.logout(),V.replace("/login")};return(C,O)=>(x(),S(_,{dot:"",location:"bottom right","offset-x":"3","offset-y":"3",bordered:"",color:"success"},{default:t(()=>[e(f,{class:"cursor-pointer",color:"primary",variant:"tonal"},{default:t(()=>[e(p,{src:m(g)},null,8,["src"]),e(z,{activator:"parent",width:"230",location:"bottom end",offset:"14px"},{default:t(()=>[e(D,null,{default:t(()=>[e(s,null,{prepend:t(()=>[e(N,{start:""},{default:t(()=>[e(_,{dot:"",location:"bottom right","offset-x":"3","offset-y":"3",color:"success"},{default:t(()=>[e(f,{color:"primary",variant:"tonal"},{default:t(()=>[e(p,{src:m(g)},null,8,["src"])]),_:1})]),_:1})]),_:1})]),default:t(()=>[e(r,{class:"font-weight-semibold"},{default:t(()=>[o(" John Doe ")]),_:1}),e(E,null,{default:t(()=>[o("Admin")]),_:1})]),_:1}),e(v,{class:"my-2"}),e(s,{link:""},{prepend:t(()=>[e(n,{class:"me-2",icon:"tabler-user",size:"22"})]),default:t(()=>[e(r,null,{default:t(()=>[o("Profile")]),_:1})]),_:1}),e(s,{link:"",onClick:y},{prepend:t(()=>[e(n,{class:"me-2",icon:"tabler-settings",size:"22"})]),default:t(()=>[e(r,null,{default:t(()=>[o("Settings")]),_:1})]),_:1}),e(s,{link:""},{prepend:t(()=>[e(n,{class:"me-2",icon:"tabler-currency-dollar",size:"22"})]),default:t(()=>[e(r,null,{default:t(()=>[o("Pricing")]),_:1})]),_:1}),e(s,{link:""},{prepend:t(()=>[e(n,{class:"me-2",icon:"tabler-help",size:"22"})]),default:t(()=>[e(r,null,{default:t(()=>[o("FAQ")]),_:1})]),_:1}),e(v,{class:"my-2"}),e(s,{onClick:d},{prepend:t(()=>[e(n,{class:"me-2",icon:"tabler-logout",size:"22"})]),default:t(()=>[e(r,null,{default:t(()=>[o("Logout")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}},Q=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"}));export{Q as U,P as _,A as u};
