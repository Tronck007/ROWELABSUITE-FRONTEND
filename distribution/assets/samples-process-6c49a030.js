import{d as D,a as C,_ as S,c as g}from"./TableViews-57cd31e9.js";import{r,i as A,bA as h,a6 as t,bB as x,G as I,o as R,c as P,d as s,b as a,e as V,an as k,m as o,x as c,F as y,aF as B,t as O}from"./index-7294bbd4.js";import"./_commonjsHelpers-de833af9.js";import"./api-dde3c648.js";import"./VTable-65129b7d.js";import"./VCardText-f3dad09d.js";import"./VAvatar-0272051e.js";import"./VImg-58e9b6f4.js";import"./VRow-4111d537.js";import"./VCol-7f95da18.js";import"./VCard-b5c127a0.js";import"./VDialog-fa37f33b.js";import"./VOverlay-674fe774.js";import"./forwardRefs-6ea3df5c.js";import"./AppTextField-a1a28005.js";import"./VSelectionControl-77cf70c7.js";import"./VInput-ee82279d.js";import"./VTextField-b6d8b014.js";import"./VList-76b48cdc.js";import"./VDivider-34c6095b.js";import"./VMenu-81ec18fe.js";import"./VChip-591b382a.js";const G={class:"d-flex justify-end"},L={class:"section-container"},F={class:"section-container"},N={class:"section-container"},re={__name:"samples-process",async setup(T){let d,m;const e=D(),b=C(),i=r(!1),n=r(!1);r([]);const w=A(),v=()=>{n.value=!1},E=()=>{b.openDialogWithActionId([1]),n.value=!0},p=h({headers:{main:t(()=>e.headers),sub:t(()=>e.subHeaders)},filterSubtables:"tests_in_process",expandedRows:!1,buttonConfigs:{main:{showFinishButton:!0,showEdit:!0,showDelete:!0,showCheck:!1,showGoto:!1},sub:{showEdit:!1,showDelete:!0,showCheck:!1,showGoto:!1}},goToPage:"test-in-proncess",isLoading:t(()=>e.isLoading),data:[]}),u=h({headers:{main:t(()=>e.headersEnd),sub:t(()=>e.subHeadersEnd)},filterSubtables:"tests_in_process",expandedRows:!1,buttonConfigs:{main:{showEdit:!0,showDelete:!1,showCheck:!1,showGoto:!1},sub:{showEdit:!1,showDelete:!1,showCheck:!1,showGoto:!1}},goToPage:"test-in-proncess",isLoading:t(()=>e.isLoading),data:[]}),l=w.params.id;return console.log("id",l),[d,m]=x(()=>e.getTestProcessById(l)),await d,m(),I(async()=>{console.log("id",l);const f=await e.transformedDataActive,_=await e.transformedDataInactive;p.data=f,u.data=_}),(f,_)=>(R(),P(y,null,[s("div",G,[a(k,{onClick:E},{default:V(()=>[a(B,{start:"",icon:"tabler-transfer-out",size:"large"}),O(" REGRESAR ")]),_:1})]),a(S,{"is-dialog-visible":o(n),"onUpdate:isDialogVisible":v},null,8,["is-dialog-visible"]),s("div",L,[s("div",{class:c([{"loading-title-animate":o(i)},"section-title"])}," EQUIPOS EN PROCESO ",2)]),a(g,{"table-config":o(p)},null,8,["table-config"]),s("div",F,[s("div",{class:c([{"loading-title-animate":o(i)},"section-title"])}," EQUIPOS FINALIZADOS ",2)]),a(g,{"table-config":o(u)},null,8,["table-config"]),s("div",N,[s("div",{class:c([{"loading-title-animate":o(i)},"section-title"])}," EQUIPOS RESERVADOS ",2)])],64))}};export{re as default};