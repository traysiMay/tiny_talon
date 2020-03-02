(this.webpackJsonphunt=this.webpackJsonphunt||[]).push([[0],{153:function(e){e.exports=JSON.parse('[{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}]')},157:function(e,t,n){e.exports=n(321)},162:function(e,t,n){},195:function(e,t){},220:function(e,t){},222:function(e,t){},255:function(e,t){},256:function(e,t){},321:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(31),c=n.n(o),i=(n(162),n(28)),l=n(16),u=n(12),s=n(5),f=n.n(s),p=n(22),m=n(146),d=n.n(m),h=n(47),y=n.n(h),g=n(6),b=function(e,t,n){return{method:e,headers:t?{"Content-Type":"application/json",Authorization:"Bearer ".concat(t)}:{"Content-Type":"application/json"},body:JSON.stringify(Object(g.a)({},n))}},v=function(e){return 200!==e.status?e.json().then((function(e){throw new Error(e.error)})):e.json()},k=function(e,t){var n=e.message;t({type:x,error:n})},E=function(e,t,n){var r=localStorage.getItem("token"),a=b("POST",r,t);fetch("".concat("https://eng.med--lab.org/hunt","/").concat(e),a).then(v).then((function(e){"verified"===e.message&&r&&n({type:O,token:r}),n({type:T,response:e.message})})).catch((function(e){return k(e,n)}))},w=function(e,t){var n=b("POST",null,{hash:t});fetch("".concat("https://eng.med--lab.org/hunt","/").concat("new_token"),n).then(v).then((function(t){var n=t.token;localStorage.setItem("token",n),e({type:O,token:n})})).catch((function(t){return k(t,e)}))},O="SET_TOKEN",x="ERROR",T="RESPONSE",j=function(){return function(){var e=Object(p.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:"LOADING"}),window.requestIdleCallback?requestIdleCallback((function(){y.a.get(function(){var e=Object(p.a)(f.a.mark((function e(n){var r,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=n.map((function(e){return e.value})),a=y.a.x64hash128(r.join(""),31),E("auth_device",{device:a},t),t({type:"DEVICE_INIT",hash:a}),t(C(1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())})):setTimeout((function(){y.a.get(function(){var e=Object(p.a)(f.a.mark((function e(n){var r,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=n.map((function(e){return e.value})),a=y.a.x64hash128(r.join(""),31),E("auth_device",{device:a},t),t({type:"DEVICE_INIT",hash:a}),t(C(1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),500);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},C=function(e){return function(t){setTimeout((function(){return t({type:"READY"})}),e)}},S=function(e){return function(){var t=Object(p.a)(f.a.mark((function t(n,r){var a,o;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=r(),o=a.device.hash,E("register_device",{email:e,hash:o},n),n({type:"LOADING"}),n(C(2e3));case 4:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},A=function(){return function(){var e=Object(p.a)(f.a.mark((function e(t,n){var r,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=n(),a=r.device.hash,w(t,a),t({type:"LOADING"}),t(C(2e3));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()};function F(e){return d()("".concat("wss://eng.med--lab.org","?token=").concat(localStorage.getItem("token"),"&device=").concat(e),{path:"/socket.io",transport:["websocket"]})}var I=function(e){return function(t){t({type:"SOCKET_MESSAGE",message:e})}},M=function(e,t,n){"markers"===t&&e({type:"MAP_INIT",markers:n})},N=function(e){return function(){var t=Object(p.a)(f.a.mark((function t(n,r){return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r().socket.socket.on(e,(function(t){M(n,e,t),n(I(t))})),n({type:"LISTEN_TO",topic:e});case 2:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},_=function(e,t){return function(){var n=Object(p.a)(f.a.mark((function n(r,a){var o,c,i;return f.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o=a(),c=o.device.hash,n.next=3,F(c);case 3:(i=n.sent).on("error",(function(e){return r({type:x,error:e})})),r({type:"CONNECTED",socket:i}),i&&i.emit(e,t);case 7:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}()},D=Object(u.b)((function(e){return e.socket}),(function(e){return{getMarkers:function(){return e({type:"GET_MARKERS"})}}}))((function(e){var t=e.getMarkers,n=e.status,o=Object(r.useState)("lala"),c=Object(l.a)(o,2),i=c[0],u=c[1];return Object(r.useEffect)((function(){window.addEventListener("focus",(function(){return u("focus")})),window.addEventListener("blur",(function(){return u("nofucs")}))}),[]),Object(r.useEffect)((function(){"focus"===i&&t()}),[i,t]),a.a.createElement("div",{style:{display:"none"}},n,"-",i)})),R=n(9),K=n(40),z=n(10),L=n(147),B=n.n(L);function G(){var e=Object(R.a)(["\n  margin: 0rem auto 0rem;\n  height: 100%;\n  max-width: 360px;\n  color: black;\n  display: block;\n"]);return G=function(){return e},e}var P=z.a.svg(G()),q=function(e){var t=e.bg,n=e.fill,r=void 0===n?"#FFFFFF":n,o=e.opacity,c=void 0===o?1:o,i=e.reff,l=e.stroke,u=void 0===l?"#FFFFFF":l;return a.a.createElement(P,{ref:i,x:"0px",y:"0px",viewBox:"0 0 864 864"},a.a.createElement("path",{fill:t,d:"M704.172,432.004c0-150.322-121.847-272.176-272.167-272.176c-150.313,0-272.177,121.854-272.177,272.176\r\nc0,150.321,121.863,272.169,272.177,272.169C582.325,704.172,704.172,582.325,704.172,432.004z"}),a.a.createElement("path",{stroke:u,fill:r,opacity:c,strokeWidth:"10",strokeMiterlimit:"10",d:"M623.373,394.194v-34.077l-120.796-34.103l-22.437,66.463\r\nl-129.417,60.525l-135.987-70.14l-6.756,15.581l133.588,116.586l57.817-7.664l19.241,32.798l-40.041,34.124\r\nc9.488,10.356,60.784,36.836,60.784,36.836l25.191-2.766l-34.262-35.532l25.89-17.396l12.872-58.715l62.837-24.296l-3.854,33.212\r\nl14.588,3.42l24.923-51.034l-46.001-18.883l15.536-49.255L623.373,394.194z"}))};function U(){var e=Object(R.a)(["\n  height: 100vh;\n  width: 100%;\n"]);return U=function(){return e},e}function W(){var e=Object(R.a)(["\n  width: 8rem;\n  height: 8rem;\n  border-radius: 50%;\n  border: 2px solid #000000;\n  font-size: 1.6rem;\n  cursor: pointer;\n  background: white;\n  box-shadow: -5px 3px black;\n  line-height: 122px;\n"]);return W=function(){return e},e}function V(){var e=Object(R.a)(["\n  text-align: center;\n  font-size: 22px;\n  font-family: Arial;\n  border: 2px black solid;\n  height: 56px;\n  box-shadow: 9px 10px black;\n  width: 79%;\n  max-width: 430px;\n"]);return V=function(){return e},e}function H(){var e=Object(R.a)(["\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: 80%;\n  max-width: 900px;\n  margin: auto;\n  div {\n    margin: 4% auto;\n    border-bottom: 4px dotted black;\n    padding: 3%;\n    width: 80%;\n  }\n\n  input,\n  button {\n    margin: 7% auto 7%;\n    align-self: center;\n    padding: 0;\n  }\n\n  @media only screen and (min-width: 700px) {\n    justify-content: flex-start;\n  }\n"]);return H=function(){return e},e}function J(){var e=Object(R.a)(["\n  margin: 10% auto;\n  background: white;\n  border: 1px solid black;\n  color: black;\n  padding: 8%;\n  font-family: Arial;\n  font-weight: bold;\n  font-size: 2.4rem;\n  box-shadow: 13px 16px #ff0909;\n  height: 3rem;\n"]);return J=function(){return e},e}var Y=z.a.div(J()),Q=z.a.div(H()),Z=z.a.input(V()),X=z.a.button(W()),$=z.a.div(U());function ee(){var e=Object(R.a)(["\n  color: white;\n  font-size: 1.6rem;\n  text-align: center;\n  font-family: Arial, Helvetica, sans-serif;\n  font-weight: bold;\n  width: 70%;\n  margin: auto;\n  text-shadow: 4px 4px black;\n  box-shadow: 7px 11px black;\n  background-color: white;\n  border: 1px solid black;\n  padding: 1rem;\n"]);return ee=function(){return e},e}function te(){var e=Object(R.a)(["\n  height: 100%;\n  margin: 1rem;\n  background: white;\n  padding: 1rem;\n  display: grid;\n  grid-template-rows: 30% 40% 30%;\n  max-width: 700px;\n  @media only screen and (min-width: 700px) {\n    margin: 1rem auto;\n  }\n"]);return te=function(){return e},e}var ne=z.a.div(te()),re=z.a.div(ee()),ae=function(e){var t=e.message,n=e.scanTainer,o=Object(r.useState)("scanning..."),c=Object(l.a)(o,2),i=c[0],u=c[1],s=Object(r.useRef)();return Object(r.useEffect)((function(){var e=n.current,r=s.current;r.getElementsByTagName("path")[0].style.stroke="red",r.getElementsByTagName("path")[0].style.strokeWidth="21px";var a,o=Date.now(),c=B.a.scale(["black","red"]),i=0;return function n(){if(t&&++i>200)return cancelAnimationFrame(a),e.style.color="black",e.style.background="white",e.style.boxShadow="13px 16px black",function(){var e=r.getElementsByTagName("path")[0].style;e.stroke="you already found this one!"===t?"yellow":"cool find!"===t?"#9dff9d":"red"}(),void u(t);var l=Date.now()-o,s=.5*(2+Math.sin(.001*l)),f=.5*(1+Math.cos(.001*l));e.style.color=c(s),e.style.background=c(f),e.style.boxShadow="13px 16px ".concat(c(s));var p=180+360*Math.sin(.001*l)*.5;r.style.transform="rotate(".concat(p,"deg)"),document.body.style.background=c(.8*f),a=requestAnimationFrame(n)}(),function(){return cancelAnimationFrame(a)}}),[t,n]),a.a.createElement(ne,null,a.a.createElement(Y,{ref:n},"scanning..."===i?"Scanning":"Scanned"),a.a.createElement("div",null,a.a.createElement(K.b,{to:"/"},a.a.createElement(q,{reff:s}))),a.a.createElement(re,null,i.toUpperCase()))},oe=Object(u.b)((function(e){return e.socket}),(function(e){return{sendCode:function(t){return e((n="code",r=t,function(){var e=Object(p.a)(f.a.mark((function e(t,a){var o,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o=a(),(c=o.socket).socket?c.socket.emit(n,r):t(_(n,r));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()));var n,r},listenToCodeResponse:function(){return e(N("code_response"))},listenToWin:function(){return e(N("win"))},listenToMarkers:function(){return e(N("markers"))}}}))((function(e){var t=e.connected,n=e.listenToCodeResponse,o=e.listenToMarkers,c=e.listenToWin,i=e.match,l=e.message,u=e.sendCode,s=Object(r.useRef)(),f=new RegExp("(?=.*m)(?=.*e)(?=.*p)(?=.*o)(?=.*3)").exec(i.params.code);return Object(r.useEffect)((function(){if(!f){var e=i.params.code;u(e)}}),[f,i,u]),Object(r.useEffect)((function(){t&&(n(),c(),o())}),[t,c,n,o]),a.a.createElement("div",{style:{height:"90%"}},f?a.a.createElement(Y,{ref:s},"This is not a valid request for reasons I cannot explain :)"):a.a.createElement(ae,{scanTainer:s,message:l}))})),ce=n(152),ie=n.n(ce),le={position:"absolute",width:70,height:70,left:-35,top:-35,borderRadius:70,textAlign:"center",color:"#3f51b5",fontSize:16,fontWeight:"bold",cursor:"pointer"},ue=Object(g.a)({},le),se=function(e){var t=e.found,n=Object(r.useState)("rgb(200,0,0)"),o=Object(l.a)(n,2),c=o[0],i=o[1];return Object(r.useEffect)((function(){var e,n=Date.now();return function r(){var a=Date.now()-n,o=200+40*Math.sin(.01*a),c="rgb(".concat(Math.floor(o),",0,0)");i(c),t?cancelAnimationFrame(e):e=requestAnimationFrame(r)}(),function(){return cancelAnimationFrame(e)}}),[t]),a.a.createElement("div",{style:ue},a.a.createElement(q,{bg:t?"#7ffdcb":c,fill:"".concat(t?"#FF0000":"#FFFFFF")}))},fe=n(153),pe=function(e){var t=Object.assign({},e);return a.a.createElement("svg",Object.assign({x:"0px",y:"0px",viewBox:"0 0 400 400"},t),a.a.createElement("g",null,a.a.createElement("path",{d:"M210.51,51c81.3,0,147.57,66.36,147.35,147.56c-0.22,81.32-66.23,147.26-147.34,147.2\r c-81.38-0.07-147.64-66.42-147.35-147.55C63.47,116.8,129.33,51,210.51,51z M210.47,66.64C137.9,66.68,78.75,125.88,78.81,198.42\r c0.06,72.61,59.22,131.74,131.75,131.69c72.59-0.05,131.71-59.23,131.67-131.78C342.18,125.73,283.03,66.6,210.47,66.64z"}),a.a.createElement("path",{d:"M208.63,299.23c-29.03-0.67-54.45-12.82-74-36.98c-3.39-4.18-3.2-8.59,0.34-11.6c3.61-3.07,8.17-2.44,11.7,1.9\r c12.38,15.19,27.92,25.44,47.25,28.96c31.58,5.75,58.31-3.18,79.44-27.76c1.25-1.45,2.47-3.08,4.06-4.05\r c3.09-1.89,7.18-0.92,9.53,1.85c2.49,2.94,2.85,6.86-0.07,9.94c-6.23,6.56-12.34,13.41-19.44,18.92\r C251.26,292.95,231.11,299.19,208.63,299.23z"}),a.a.createElement("path",{d:"M125.31,175.16c-0.04-12.78,10.18-23.19,22.88-23.3c12.89-0.11,23.44,10.19,23.62,23.04\r c0.17,12.75-10.35,23.42-23.18,23.48C135.7,198.44,125.35,188.13,125.31,175.16z"}),a.a.createElement("path",{d:"M295.73,175.25c-0.04,12.91-10.49,23.23-23.42,23.13c-12.66-0.1-23.05-10.55-23.08-23.22\r c-0.03-12.8,10.5-23.31,23.35-23.31C285.48,151.86,295.77,162.26,295.73,175.25z"})))},me=function(e){var t=e.history,n=e.mapKey,o=e.markers,c=e.places;return Object(r.useEffect)((function(){var e,t=Date.now();!function n(){var r=Date.now()-t;try{document.getElementById("smiler").style.opacity=Math.sin(r),e=requestAnimationFrame(n)}catch(a){cancelAnimationFrame(e)}}()}),[o]),0===o.length?a.a.createElement("div",null,a.a.createElement(pe,{id:"smiler",style:{fill:"red"}})):a.a.createElement($,null,a.a.createElement(ie.a,{defaultCenter:c.ppark,defaultZoom:17,bootstrapURLKeys:{key:n},options:{styles:fe},onClick:function(e){return console.log(e)},onChildClick:function(e){t.push("/pop/".concat(e))}},o.map((function(e){return a.a.createElement(se,{key:e.hash,id:e.hash,found:e.found,lat:e.lat,lng:e.lng})}))))};function de(){var e=Object(R.a)(["\n  background: black;\n  color: white;\n  width: 100px;\n  height: 47px;\n  border: 5px solid white;\n  font-family: monospace;\n  font-weight: bolder;\n  opacity: 67%;\n"]);return de=function(){return e},e}function he(){var e=Object(R.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 10;\n"]);return he=function(){return e},e}var ye=z.a.div(he()),ge=z.a.button(de()),be=function(e){var t=e.logout;return a.a.createElement(ye,{onClick:t},a.a.createElement(ge,null,"Logout"))},ve=Object(u.b)((function(e){var t=e.map,n=t.mapKey,r=t.markers,a=t.places;return{connected:e.socket.connected,mapKey:n,markers:r,places:a}}),(function(e){return{connectToSocket:function(){return e(function(){var e=Object(p.a)(f.a.mark((function e(t,n){var r,a,o;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n(),a=r.device.hash,e.next=3,F(a);case 3:(o=e.sent).on("error",(function(e){return t({type:x,error:e})})),o.on("found",(function(e){return t({type:"FOUND",name:e})})),o.on("markers",(function(e){0===e.length&&t({type:x,error:"BAD_TOKEN"}),t({type:"MAP_INIT",markers:e})})),t({type:"CONNECTED",socket:o});case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())},getMarkers:function(){return e(function(){var e=Object(p.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:"GET_MARKERS"});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},logout:function(){return e(function(){var e=Object(p.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:localStorage.setItem("token",""),t({type:"LOGOUT"});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},dispatch:e}}))((function(e){var t=e.connected,n=e.connectToSocket,o=e.getMarkers,c=e.history,i=e.logout,l=e.mapKey,u=e.markers,s=e.places;return Object(r.useEffect)((function(){t||n()}),[n]),Object(r.useEffect)((function(){t&&o()}),[t,o]),a.a.createElement("div",null,a.a.createElement(D,null),a.a.createElement(be,{logout:i}),a.a.createElement(me,{history:c,mapKey:l,markers:u,places:s}))})),ke={position:"fixed",left:0,top:0,bottom:0,right:0,backgroundColor:"rgba(0,0,0,.4)",color:"#FFF",fontSize:"40px"},Ee=function(e){var t=e.children,n=e.onClick;return Object(o.createPortal)(a.a.createElement("div",{style:ke,onClick:n},t),document.getElementById("modal_root"))};function we(){var e=Object(R.a)(["\n  margin: auto;\n  background: ",";\n  width: 60%;\n  display: block;\n  padding: 1rem;\n  max-height: ",";\n  overflow: hidden;\n  transition: max-height 1s, background 1s;\n"]);return we=function(){return e},e}var Oe=z.a.div(we(),(function(e){return e.background}),(function(e){return"".concat(e.maxHeight,"px")})),xe=function(e){var t=e.history,n=e.match,o=Object(r.useState)(0),c=Object(l.a)(o,2),i=c[0],u=c[1],s=Object(r.useState)("red"),f=Object(l.a)(s,2),p=f[0],m=f[1];return Object(r.useEffect)((function(){u(1e3)}),[]),a.a.createElement(Ee,{onClick:function(){m("white"),u(0),setTimeout((function(){return t.goBack()}),1e3)}},a.a.createElement(Oe,{background:p,maxHeight:i},n.params.marker))},Te=Object(u.b)((function(e){return{}}),(function(e){return{}}))((function(e){var t=e.history,n=e.match;return a.a.createElement("div",null,a.a.createElement(i.a,{path:"".concat(n.url,"pop/:marker"),render:function(e){var n=e.match;return a.a.createElement(xe,{history:t,match:n})}}),a.a.createElement(ve,{history:t}))}));function je(){var e=Object(R.a)(["\n  color: red;\n  font-size: 54px;\n  text-align: center;\n  font-family: Arial;\n  text-shadow: 4px 3px black;\n"]);return je=function(){return e},e}var Ce=z.a.div(je()),Se=function(e){var t=e.fill,n=void 0===t?"white":t,o=e.message,c=Object(r.useState)(1),i=Object(l.a)(c,2),u=i[0],s=i[1];return Object(r.useEffect)((function(){var e,t=Date.now();return function n(){e=requestAnimationFrame(n);var r=Date.now()-t;s(.5*(1.5+Math.sin(.003*r)))}(),function(){return cancelAnimationFrame(e)}}),[]),a.a.createElement("div",null,a.a.createElement(q,{opacity:u,fill:n}),a.a.createElement(Ce,null,o))};var Ae=Object(u.b)((function(e){return e.device}),(function(e){return{getToken:function(){return e(A())},registerDevice:function(t){return e(S(t))}}}))((function(e){var t=e.getToken,n=e.hash,o=e.registerDevice,c=e.status,i=e.token,u=Object(r.useState)(""),s=Object(l.a)(u,2),f=s[0],p=s[1],m=Object(r.useRef)(),d=function(){""!==m.current&&(!function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}(m.current)?p("This email is invalid..."):o(m.current))};if(Object(r.useEffect)((function(){window.addEventListener("keydown",(function(e){13===e.keyCode&&d()}))}),[]),!n)return a.a.createElement(Se,null);if("device_not_registered"===c){return a.a.createElement(Q,null,a.a.createElement(pe,{style:{width:"35%",margin:"0 auto"}}),a.a.createElement("div",null,"hmm I don't recognize this device..."),a.a.createElement("div",null,"please sync it to your email"),a.a.createElement("div",{style:{color:"#f36060",display:f?"block":"none",borderBottom:"none",margin:"7% auto -8%",textAlign:"center"}},f),a.a.createElement(Z,{onChange:function(e){return m.current=e.target.value},name:"email",placeholder:"email..."}),a.a.createElement(X,{onClick:d},"Register"))}return i?void 0:a.a.createElement(Q,null,a.a.createElement(pe,{style:{width:"35%",margin:"0 auto",fill:"#3ef3ff"}}),a.a.createElement("div",{style:{border:"2px solid black"}},a.a.createElement("div",null,"oh boy! welcome back :)"),a.a.createElement("div",null,"you are looking quite nice today"),a.a.createElement("div",null,"press connect below to sync")),a.a.createElement(X,{onClick:t},"Connect"))}));var Fe=Object(u.b)((function(e){var t=e.device,n=t.error,r=t.hash,a=t.status,o=t.token,c=e.ui;return{error:n,hash:r,loading:c.loading,status:a,token:o,welcome:c.welcome}}),(function(e){return{getToken:function(){return e(A())},registerDevice:function(){return e(S())}}}))((function(e){var t=e.hash,n=e.status,r=e.token,o=e.loading;return e.welcome?a.a.createElement(Se,{fill:"yellow",message:"welcome!"}):o?a.a.createElement(Se,{message:"loading ..."}):"device_not_registered"===n&&!t||!r?a.a.createElement(Ae,{hash:t,token:r,status:n}):a.a.createElement(a.a.Fragment,null,a.a.createElement(i.c,null,a.a.createElement(i.a,{path:"/status",component:D}),a.a.createElement(i.a,{path:"/code/:code",component:oe}),a.a.createElement(i.a,{path:"/",component:Te}),a.a.createElement(i.a,{path:"/",render:function(){return a.a.createElement("div",null,"nope")}})))})),Ie=n(32),Me=n(154),Ne={hash:0,token:0,error:"",response:"",status:""},_e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"DEVICE_INIT":var n=t.hash;return Object(g.a)({},e,{hash:n});case O:var r=t.token;return Object(g.a)({},e,{token:r});case"LOGOUT":return Object(g.a)({},e,{token:0});case x:var a=t.error;return Object(g.a)({},e,{error:a,status:a});case T:var o=t.response;return Object(g.a)({},e,{response:o,status:o});default:return e}},De={places:{ppark:{lat:40.66257,lng:-73.968564}},mapKey:"",markers:[]},Re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:De,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"MAP_INIT":var n=t.markers;return Object(g.a)({},e,{markers:n});case"MAP_KEY":var r=t.mapKey;return Object(g.a)({},e,{mapKey:r});default:return e}},Ke=n(155),ze={socket:null,connected:!1,status:"disconnected",listeners:[]},Le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ze,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CONNECTING":return Object(g.a)({},e,{status:"connecting..."});case"CONNECTED":var n=t.socket;return Object(g.a)({},e,{status:"connected",connected:!0,socket:n});case"GET_MARKERS":return e.socket.emit("get_markers"),e;case"LISTEN_TO":var r=t.topic;return Object(g.a)({},e,{listeners:[].concat(Object(Ke.a)(e.listeners),[r])});case"SOCKET_MESSAGE":var a=t.message;return Object(g.a)({},e,{message:a});default:return e}},Be={welcome:!1,loading:!1},Ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Be,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"WELCOME":return Object(g.a)({},e,{welcome:!0});case"LOADING":return Object(g.a)({},e,{loading:!0});case"READY":return Object(g.a)({},e,{loading:!1,welcome:!1});default:return e}},Pe=Object(Ie.c)({device:_e,map:Re,socket:Le,ui:Ge}),qe=Object(Ie.d)(Pe,Object(Ie.a)(Me.a,(function(e){var t=e.getState,n=e.dispatch;return function(e){return function(r){if(console.log(r),console.log(t()),r.type===x)switch(r.error){case"BAD_TOKEN":localStorage.removeItem("token");break;case"DEVICE_NOT_FOUND":n(j())}e(r)}}}))),Ue=n(84),We=localStorage.getItem("token");We?qe.dispatch({type:O,token:We}):(qe.dispatch({type:"WELCOME"}),qe.dispatch(j()));var Ve=Ue.AES.decrypt("U2FsdGVkX19z1wEquUJx8VDGTOQMRWcm1cRr0CmBxs1xAVPQP/TK1vjms9HfXfgFxbw5pLmMQbPHfprAkWxDsg==","ilovefroggy").toString(Ue.enc.Utf8);qe.dispatch({type:"MAP_KEY",mapKey:Ve}),c.a.render(a.a.createElement(u.a,{store:qe},a.a.createElement(K.a,{basename:"/"},a.a.createElement(Fe,null))),document.getElementById("root"))}},[[157,1,2]]]);
//# sourceMappingURL=main.fb556d5d.chunk.js.map