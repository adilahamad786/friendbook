"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[628],{8628:function(e,t,n){n.r(t),n.d(t,{default:function(){return _}});var r="FriendItem_container__Qlcvs",o=n(219),s=n(885),u="RemoveButton_btn__GFpFN",c="RemoveButton_removed__I-zV7",i=n(1302),a=n(1224),d=n(2791),l=n(9434),m=n(4851),f=n(771),v=n(184),h=function(e){var t=(0,d.useContext)(a.Z),n=t.token,r=t.setLogedOut,o=(0,d.useState)(!1),h=(0,s.Z)(o,2),_=h[0],p=h[1],k=(0,i.Z)(),x=k.isLoading,b=k.error,j=k.sendRequest,I=(0,l.I0)();return(0,d.useEffect)((function(){b&&(alert(b.message),"unauthorized"===b.errorType&&r())}),[b,r]),(0,v.jsx)("button",{onClick:function(){j({url:"/api/user/remove/".concat(e.userId),method:"PUT",headers:{Authorization:n}},(function(e){p(e.removed),I(m.P.update())}))},disabled:_||x,className:"".concat(u," ").concat(_?c:""),children:x?(0,v.jsx)(f.Z,{color:"inherit",size:"1rem"}):_?"Removed":"Remove"})},_=function(e){return(0,v.jsxs)("div",{className:r,children:[(0,v.jsx)(o.Z,{user:e.user}),(0,v.jsx)(h,{userId:e.user._id})]})}}}]);
//# sourceMappingURL=628.f263bfdf.chunk.js.map