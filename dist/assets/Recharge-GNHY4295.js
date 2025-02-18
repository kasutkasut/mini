import{r as S,g as I,b as U,u as K,z as _,_ as L,d as v,j as o,e as Y,A as y,D as $,B as f}from"./index-CLvkM5_n.js";import{N as F}from"./NavBar-BAGCOls5.js";import{u as H}from"./useTranslation-DA7-tBTN.js";import{e as Z,f as q,C as J,T as d}from"./Container-CqMN9KuF.js";import{C as N}from"./Card-CYG5yMO6.js";import{u as Q,B as X}from"./Button-DGmbhBTc.js";import{C as ee}from"./Chip--yBZ1UkB.js";import"./ArrowBack-PD1JCqK2.js";const A=S.createContext();function re(e){return I("MuiGrid",e)}const ie=[0,1,2,3,4,5,6,7,8,9,10],ne=["column-reverse","column","row-reverse","row"],se=["nowrap","wrap-reverse","wrap"],h=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],P=U("MuiGrid",["root","container","item","zeroMinWidth",...ie.map(e=>`spacing-xs-${e}`),...ne.map(e=>`direction-xs-${e}`),...se.map(e=>`wrap-xs-${e}`),...h.map(e=>`grid-xs-${e}`),...h.map(e=>`grid-sm-${e}`),...h.map(e=>`grid-md-${e}`),...h.map(e=>`grid-lg-${e}`),...h.map(e=>`grid-xl-${e}`)]),oe=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function b(e){const i=parseFloat(e);return`${i}${String(e).replace(String(i),"")||"px"}`}function ae({theme:e,ownerState:i}){let s;return e.breakpoints.keys.reduce((r,n)=>{let a={};if(i[n]&&(s=i[n]),!s)return r;if(s===!0)a={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if(s==="auto")a={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{const c=y({values:i.columns,breakpoints:e.breakpoints.values}),u=typeof c=="object"?c[n]:c;if(u==null)return r;const p=`${Math.round(s/u*1e8)/1e6}%`;let l={};if(i.container&&i.item&&i.columnSpacing!==0){const t=e.spacing(i.columnSpacing);if(t!=="0px"){const x=`calc(${p} + ${b(t)})`;l={flexBasis:x,maxWidth:x}}}a=v({flexBasis:p,flexGrow:0,maxWidth:p},l)}return e.breakpoints.values[n]===0?Object.assign(r,a):r[e.breakpoints.up(n)]=a,r},{})}function te({theme:e,ownerState:i}){const s=y({values:i.direction,breakpoints:e.breakpoints.values});return $({theme:e},s,r=>{const n={flexDirection:r};return r.indexOf("column")===0&&(n[`& > .${P.item}`]={maxWidth:"none"}),n})}function M({breakpoints:e,values:i}){let s="";Object.keys(i).forEach(n=>{s===""&&i[n]!==0&&(s=n)});const r=Object.keys(e).sort((n,a)=>e[n]-e[a]);return r.slice(0,r.indexOf(s))}function ce({theme:e,ownerState:i}){const{container:s,rowSpacing:r}=i;let n={};if(s&&r!==0){const a=y({values:r,breakpoints:e.breakpoints.values});let c;typeof a=="object"&&(c=M({breakpoints:e.breakpoints.values,values:a})),n=$({theme:e},a,(u,p)=>{var l;const t=e.spacing(u);return t!=="0px"?{marginTop:`-${b(t)}`,[`& > .${P.item}`]:{paddingTop:b(t)}}:(l=c)!=null&&l.includes(p)?{}:{marginTop:0,[`& > .${P.item}`]:{paddingTop:0}}})}return n}function le({theme:e,ownerState:i}){const{container:s,columnSpacing:r}=i;let n={};if(s&&r!==0){const a=y({values:r,breakpoints:e.breakpoints.values});let c;typeof a=="object"&&(c=M({breakpoints:e.breakpoints.values,values:a})),n=$({theme:e},a,(u,p)=>{var l;const t=e.spacing(u);return t!=="0px"?{width:`calc(100% + ${b(t)})`,marginLeft:`-${b(t)}`,[`& > .${P.item}`]:{paddingLeft:b(t)}}:(l=c)!=null&&l.includes(p)?{}:{width:"100%",marginLeft:0,[`& > .${P.item}`]:{paddingLeft:0}}})}return n}function ue(e,i,s={}){if(!e||e<=0)return[];if(typeof e=="string"&&!Number.isNaN(Number(e))||typeof e=="number")return[s[`spacing-xs-${String(e)}`]];const r=[];return i.forEach(n=>{const a=e[n];Number(a)>0&&r.push(s[`spacing-${n}-${String(a)}`])}),r}const pe=Z("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,i)=>{const{ownerState:s}=e,{container:r,direction:n,item:a,spacing:c,wrap:u,zeroMinWidth:p,breakpoints:l}=s;let t=[];r&&(t=ue(c,l,i));const x=[];return l.forEach(m=>{const g=s[m];g&&x.push(i[`grid-${m}-${String(g)}`])}),[i.root,r&&i.container,a&&i.item,p&&i.zeroMinWidth,...t,n!=="row"&&i[`direction-xs-${String(n)}`],u!=="wrap"&&i[`wrap-xs-${String(u)}`],...x]}})(({ownerState:e})=>v({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},e.wrap!=="wrap"&&{flexWrap:e.wrap}),te,ce,le,ae);function de(e,i){if(!e||e<=0)return[];if(typeof e=="string"&&!Number.isNaN(Number(e))||typeof e=="number")return[`spacing-xs-${String(e)}`];const s=[];return i.forEach(r=>{const n=e[r];if(Number(n)>0){const a=`spacing-${r}-${String(n)}`;s.push(a)}}),s}const xe=e=>{const{classes:i,container:s,direction:r,item:n,spacing:a,wrap:c,zeroMinWidth:u,breakpoints:p}=e;let l=[];s&&(l=de(a,p));const t=[];p.forEach(m=>{const g=e[m];g&&t.push(`grid-${m}-${String(g)}`)});const x={root:["root",s&&"container",n&&"item",u&&"zeroMinWidth",...l,r!=="row"&&`direction-xs-${String(r)}`,c!=="wrap"&&`wrap-xs-${String(c)}`,...t]};return q(x,re,i)},T=S.forwardRef(function(i,s){const r=K({props:i,name:"MuiGrid"}),{breakpoints:n}=Q(),a=_(r),{className:c,columns:u,columnSpacing:p,component:l="div",container:t=!1,direction:x="row",item:m=!1,rowSpacing:g,spacing:C=0,wrap:G="wrap",zeroMinWidth:D=!1}=a,w=L(a,oe),z=g||C,R=p||C,O=S.useContext(A),k=t?u||12:O,B={},W=v({},w);n.keys.forEach(j=>{w[j]!=null&&(B[j]=w[j],delete W[j])});const E=v({},a,{columns:k,container:t,direction:x,item:m,rowSpacing:z,columnSpacing:R,wrap:G,zeroMinWidth:D,spacing:C},B,{breakpoints:n.keys}),V=xe(E);return o.jsx(A.Provider,{value:k,children:o.jsx(pe,v({ownerState:E,className:Y(V.root,c),as:l,ref:s},W))})}),fe=[{id:"basic",price:9.9,coins:28e3,label:"Basic Package",isPopular:!1,bonus:"Original price 28000🪙, no extra bonus"},{id:"starter",price:15.9,coins:45e3,label:"Starter Package",isPopular:!1,bonus:"Original price 45000🪙, no extra bonus"},{id:"value",price:28.9,coins:9e4,label:"Value Package",isPopular:!0,bonus:"Original price 90000🪙, no extra bonus"},{id:"premium",price:45.9,coins:15e4,label:"Premium Package",isPopular:!1,bonus:"Charge 150000🪙"},{id:"deluxe",price:68.9,coins:23e4,label:"Deluxe Package",isPopular:!1,bonus:"Charge 230000🪙"},{id:"supreme",price:95.9,coins:32e4,label:"Supreme Package",isPopular:!1,bonus:"Charge 320000🪙"},{id:"ultimate",price:188.9,coins:68e4,label:"Ultimate Package",isPopular:!1,bonus:"Charge 680000🪙"}],me=[{id:"alipay",label:"ALIPAY (DIRECT TOP-UP)",color:"#1677FF"},{id:"wechat",label:"WECHAT PAY (DIRECT TOP-UP)",color:"#07C160"},{id:"paypal",label:"PAYPAL PAYMENT",color:"#003087"},{id:"usdt",label:"USDT PAYMENT",color:"#26A17B"}],Ce=()=>{const{t:e}=H(),[i,s]=S.useState(null);return o.jsxs(f,{sx:{minHeight:"100vh",bgcolor:"#1A1B1E",color:"white",pb:4},children:[o.jsx(F,{title:e("nav.recharge")}),o.jsxs(J,{maxWidth:"sm",sx:{pt:2},children:[o.jsx(N,{sx:{p:2,mb:3,bgcolor:"rgba(255, 255, 255, 0.05)",borderRadius:2},children:o.jsx(f,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:o.jsxs(f,{children:[o.jsx(d,{variant:"caption",sx:{color:"rgba(255, 255, 255, 0.7)"},children:"Current Balance"}),o.jsx(f,{sx:{display:"flex",alignItems:"center"},children:o.jsx(d,{variant:"h6",children:"100 ��"})})]})})}),o.jsx(T,{container:!0,spacing:2,children:fe.map(r=>o.jsx(T,{item:!0,xs:12,children:o.jsxs(N,{onClick:()=>s(r.id),sx:{p:2,cursor:"pointer",bgcolor:i===r.id?"rgba(124, 58, 237, 0.2)":"rgba(255, 255, 255, 0.05)",borderRadius:2,border:i===r.id?"2px solid #7C3AED":"2px solid transparent",transition:"all 0.2s",position:"relative","&:hover":{bgcolor:"rgba(124, 58, 237, 0.15)"}},children:[r.isPopular&&o.jsx(ee,{label:"Most Popular",size:"small",sx:{position:"absolute",top:8,right:8,bgcolor:"#7C3AED",color:"white"}}),o.jsxs(f,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[o.jsxs(f,{children:[o.jsxs(d,{variant:"h6",children:["USD ",r.price]}),o.jsx(d,{variant:"body2",sx:{color:"rgba(255, 255, 255, 0.7)"},children:r.bonus})]}),o.jsxs(d,{variant:"h6",sx:{color:"#7C3AED"},children:[r.coins,"🪙"]})]})]})},r.id))}),i&&o.jsxs(f,{sx:{mt:3},children:[o.jsx(d,{variant:"subtitle1",sx:{mb:2},children:"Payment Method"}),o.jsx(f,{sx:{display:"flex",flexDirection:"column",gap:2},children:me.map(r=>o.jsx(X,{variant:"contained",fullWidth:!0,sx:{bgcolor:r.color,color:"white",py:2,textTransform:"uppercase",fontWeight:"bold","&:hover":{bgcolor:r.color,opacity:.9}},children:r.label},r.id))})]}),o.jsxs(f,{sx:{mt:3},children:[o.jsx(d,{variant:"caption",sx:{color:"rgba(255, 255, 255, 0.7)"},children:"Notes:"}),o.jsx(d,{variant:"caption",component:"div",sx:{color:"rgba(255, 255, 255, 0.7)"},children:"1. Do not fill in any notes during payment, it will affect the account;"}),o.jsx(d,{variant:"caption",component:"div",sx:{color:"rgba(255, 255, 255, 0.7)"},children:"2. For PayPal payments, please ensure your PayPal account is verified;"}),o.jsx(d,{variant:"caption",component:"div",sx:{color:"rgba(255, 255, 255, 0.7)"},children:"3. All purchases are final and non-refundable;"})]})]})]})};export{Ce as default};
//# sourceMappingURL=Recharge-GNHY4295.js.map
