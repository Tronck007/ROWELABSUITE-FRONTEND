import{a1 as o,cd as y,ce as V,a9 as i,M as f,a0 as k,a4 as C,bu as P,ao as z,c2 as S,aL as b,aM as h,bv as A,aN as F,bw as I,bx as R,az as T,c3 as x,a2 as B,b as u,aF as D,by as M}from"./index-7294bbd4.js";import{V as N}from"./VImg-58e9b6f4.js";function O(a){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",e=arguments.length>2?arguments[2]:void 0;return o()({name:e??y(V(a.replace(/__/g,"-"))),props:{tag:{type:String,default:l},...i()},setup(s,r){let{slots:t}=r;return()=>{var n;return f(s.tag,{class:[a,s.class],style:s.style},(n=t.default)==null?void 0:n.call(t))}}})}const _=k({start:Boolean,end:Boolean,icon:C,image:String,...i(),...P(),...z(),...S(),...b(),...h(),...A({variant:"flat"})},"VAvatar"),$=o()({name:"VAvatar",props:_(),setup(a,l){let{slots:e}=l;const{themeClasses:s}=F(a),{colorClasses:r,colorStyles:t,variantClasses:n}=I(a),{densityClasses:m}=R(a),{roundedClasses:v}=T(a),{sizeClasses:d,sizeStyles:g}=x(a);return B(()=>u(a.tag,{class:["v-avatar",{"v-avatar--start":a.start,"v-avatar--end":a.end},s.value,r.value,m.value,v.value,d.value,n.value,a.class],style:[t.value,g.value,a.style]},{default:()=>{var c;return[a.image?u(N,{key:"image",src:a.image,alt:"",cover:!0},null):a.icon?u(D,{key:"icon",icon:a.icon},null):(c=e.default)==null?void 0:c.call(e),M(!1,"v-avatar")]}})),{}}});export{$ as V,O as c};