import{_ as S,d as n,j as w,g as j,b as I,r as C,u as D,e as N}from"./index-CLvkM5_n.js";import{b as _,c as M,e as R,f as O}from"./Container-CqMN9KuF.js";import{r as T,m as z,a as E}from"./userStore-DtecM2vn.js";const L=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],U=["component","slots","slotProps"],q=["component"];function B(e,o){const{className:t,elementType:r,ownerState:l,externalForwardedProps:a,getSlotOwnerState:i,internalForwardedProps:s}=o,b=S(o,L),{component:F,slots:m={[e]:void 0},slotProps:h={[e]:void 0}}=a;S(a,U);const p=m[e]||r,c=T(h[e],l),v=z(n({className:t},b,{externalForwardedProps:void 0,externalSlotProps:c})),{props:{component:k},internalRef:d}=v,P=S(v.props,q),x=_(d,c==null?void 0:c.ref,o.ref),g=i?i(P):{},u=n({},l,g),f=k,y=E(p,n({},e==="root",!m[e]&&s,P,f&&{as:f},{ref:x}),u);return Object.keys(g).forEach(A=>{delete y[A]}),[p,y]}const H=M(w.jsx("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function W(e){return j("MuiAvatar",e)}I("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);const $=["alt","children","className","component","slots","slotProps","imgProps","sizes","src","srcSet","variant"],G=e=>{const{classes:o,variant:t,colorDefault:r}=e;return O({root:["root",t,r&&"colorDefault"],img:["img"],fallback:["fallback"]},W,o)},J=R("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,o[t.variant],t.colorDefault&&o.colorDefault]}})(({theme:e})=>({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none",variants:[{props:{variant:"rounded"},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:{variant:"square"},style:{borderRadius:0}},{props:{colorDefault:!0},style:n({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:n({backgroundColor:e.palette.grey[400]},e.applyStyles("dark",{backgroundColor:e.palette.grey[600]})))}]})),K=R("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,o)=>o.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),Q=R(H,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,o)=>o.fallback})({width:"75%",height:"75%"});function V({crossOrigin:e,referrerPolicy:o,src:t,srcSet:r}){const[l,a]=C.useState(!1);return C.useEffect(()=>{if(!t&&!r)return;a(!1);let i=!0;const s=new Image;return s.onload=()=>{i&&a("loaded")},s.onerror=()=>{i&&a("error")},s.crossOrigin=e,s.referrerPolicy=o,s.src=t,r&&(s.srcset=r),()=>{i=!1}},[e,o,t,r]),l}const ee=C.forwardRef(function(o,t){const r=D({props:o,name:"MuiAvatar"}),{alt:l,children:a,className:i,component:s="div",slots:b={},slotProps:F={},imgProps:m,sizes:h,src:p,srcSet:c,variant:v="circular"}=r,k=S(r,$);let d=null;const P=V(n({},m,{src:p,srcSet:c})),x=p||c,g=x&&P!=="error",u=n({},r,{colorDefault:!g,component:s,variant:v}),f=G(u),[y,A]=B("img",{className:f.img,elementType:K,externalForwardedProps:{slots:b,slotProps:{img:n({},m,F.img)}},additionalProps:{alt:l,src:p,srcSet:c,sizes:h},ownerState:u});return g?d=w.jsx(y,n({},A)):a||a===0?d=a:x&&l?d=l[0]:d=w.jsx(Q,{ownerState:u,className:f.fallback}),w.jsx(J,n({as:s,ownerState:u,className:N(f.root,i),ref:t},k,{children:d}))});export{ee as A};
//# sourceMappingURL=Avatar-Bhh-X8wS.js.map
