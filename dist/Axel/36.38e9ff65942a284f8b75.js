(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{FC8X:function(n,l,e){"use strict";e.d(l,"a",(function(){return t}));class t{constructor(n,l,e,t,o){this.spinnerService=n,this.authService=l,this.router=e,this._Activatedroute=t,this.globalVarComponent=o,this.href="",this.user_name="",this.Header="",this.currentDate=new Date,this.UserDetails="",this.Fullname="",this.SideMenuData="",this.Username="",this.RoleID="",this.GetRoleNames=[],this.getroleNames=[],this.ParentModules=[],this.SModuleArray=[],this.SelectedMenu="",this.DeniedText=""}ngOnInit(){this.href=this.router.url,"/NightlyReportSales"==this.href?this.Header="NIGHTLY SUMMARY":"/ServiceContractForm"==this.href?this.Header="Service Contract Cancellation Requests":"/RBReport"==this.href?this.Header="FINANCIAL OVERVIEW":"/IncidentReport"==this.href?this.Header="INCIDENT REPORT FORM":"/VehiclePurchase"==this.href&&(this.Header="VEHICLE PURCHASE"),"N"==this.globalVarComponent.isSideMenu_Disabled?this.globalVarComponent.SideMenu=!0:"Y"==this.globalVarComponent.isSideMenu_Disabled&&(this.globalVarComponent.isSideMenu_Disabled="N"),this.authService.getFullSideMenu().subscribe(n=>{console.log("full_sidemenu",n)}),null===localStorage.getItem("RoleID")&&location.replace("http://axel.swickard.com/landing.aspx");var n=window.location.hash.replace("#/","");"401Error"!=n&&"404Error"!=n&&0==this.globalVarComponent.ReportId&&(localStorage.getItem("User_ID"),setTimeout(()=>{this.authService.getSideMenu().subscribe(l=>{this.authService.getFullSideMenu().subscribe(e=>{0==e.some(l=>l.SMOD_FILENAME==n)?this.router.navigate(["404Error"]):0==l.some(l=>l.SMOD_FILENAME==n)&&1==e.some(l=>l.SMOD_FILENAME==n)&&"Y"!=localStorage.getItem("IsIncidentReportDataPage")&&this.router.navigate(["401Error"]),"Y"==localStorage.getItem("IsIncidentReportDataPage")&&localStorage.setItem("IsIncidentReportDataPage","N")})})},2e3),this.globalVarComponent.g_SelectedMenuItem=n),""==localStorage.getItem("LocalUserName")&&null==localStorage.getItem("LocalUserName")||setTimeout(()=>{if(this.username(),console.log("g_ReportUserId",this.globalVarComponent.g_ReportUserId),0!=this.globalVarComponent.g_ReportUserId&&null!=this.globalVarComponent.g_ReportUserId&&null!=this.globalVarComponent.g_ReportUserId){var n=localStorage.getItem("ReportUrl");console.log("after g_Reporturl: ",n),localStorage.setItem("ReportUrl",""),this.router.navigate([n])}},2e3)}username(){""==this.globalVarComponent.g_FullNameDisplay&&(this.globalVarComponent.g_FullNameDisplay=localStorage.getItem("LocalUserName"),this.globalVarComponent.g_UserTitle=localStorage.getItem("User_Title"))}}},JqlP:function(n,l,e){"use strict";e.r(l),e.d(l,"PageNotFound404ModuleNgFactory",(function(){return b}));var t=e("8Y7J");class o{}var a=e("pMnS"),r=e("bykz"),u=e("FC8X"),i=e("sgpt"),s=e("7xZw"),g=e("iInd"),c=e("LyNC");class d{constructor(){}ngOnInit(){}}var p=t["\u0275crt"]({encapsulation:0,styles:[["body[_ngcontent-%COMP%]{background-color:#2f3242}svg[_ngcontent-%COMP%]{margin-top:-250px;margin-left:-400px}.message-box[_ngcontent-%COMP%], svg[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%}.message-box[_ngcontent-%COMP%]{height:200px;width:380px;margin-top:-100px;margin-left:50px;color:#fff;font-family:Roboto;font-weight:300}.message-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:20px;line-height:30px;margin-bottom:15px;color:#000}.buttons-con[_ngcontent-%COMP%]   .action-link-wrap[_ngcontent-%COMP%]{margin-top:40px}.buttons-con[_ngcontent-%COMP%]   .action-link-wrap[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{background:#68c950;padding:8px 25px;border-radius:4px;color:#fff;font-weight:700;font-size:14px;transition:all .3s linear;cursor:pointer;text-decoration:none;margin-right:10px}.buttons-con[_ngcontent-%COMP%]   .action-link-wrap[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background:#5a5c6c;color:#fff}#Polygon-1[_ngcontent-%COMP%], #Polygon-2[_ngcontent-%COMP%], #Polygon-3[_ngcontent-%COMP%], #Polygon-4[_ngcontent-%COMP%], #Polygon-5[_ngcontent-%COMP%]{animation:float 1s ease-in-out infinite alternate}#Polygon-2[_ngcontent-%COMP%]{animation-delay:.2s}#Polygon-3[_ngcontent-%COMP%]{animation-delay:.4s}#Polygon-4[_ngcontent-%COMP%]{animation-delay:.6s}#Polygon-5[_ngcontent-%COMP%]{animation-delay:.8s}@keyframes float{to{transform:translateY(20px)}}@media (max-width:450px){svg[_ngcontent-%COMP%]{position:absolute;margin-top:-250px}.message-box[_ngcontent-%COMP%], svg[_ngcontent-%COMP%]{top:50%;left:50%;margin-left:-190px}.message-box[_ngcontent-%COMP%]{margin-top:-100px;text-align:center}}"]],data:{}});function m(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-header",[],null,null,null,r.b,r.a)),t["\u0275did"](1,114688,null,0,u.a,[i.Ng4LoadingSpinnerService,s.a,g.k,g.a,c.a],null,null),(n()(),t["\u0275eld"](2,0,null,null,6,":svg:svg",[[":xmlns:sketch","http://www.bohemiancoding.com/sketch/ns"],[":xmlns:xlink","http://www.w3.org/1999/xlink"],["height","500px"],["version","1.1"],["viewBox","0 0 837 1045"],["width","380px"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,5,":svg:g",[[":sketch:type","MSPage"],["fill","none"],["fill-rule","evenodd"],["id","Page-1"],["stroke","none"],["stroke-width","1"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,0,":svg:path",[[":sketch:type","MSShapeGroup"],["d","M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"],["id","Polygon-1"],["stroke","#007FB2"],["stroke-width","6"]],null,null,null,null,null)),(n()(),t["\u0275eld"](5,0,null,null,0,":svg:path",[[":sketch:type","MSShapeGroup"],["d","M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"],["id","Polygon-2"],["stroke","#EF4A5B"],["stroke-width","6"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,null,null,0,":svg:path",[[":sketch:type","MSShapeGroup"],["d","M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"],["id","Polygon-3"],["stroke","#795D9C"],["stroke-width","6"]],null,null,null,null,null)),(n()(),t["\u0275eld"](7,0,null,null,0,":svg:path",[[":sketch:type","MSShapeGroup"],["d","M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"],["id","Polygon-4"],["stroke","#F2773F"],["stroke-width","6"]],null,null,null,null,null)),(n()(),t["\u0275eld"](8,0,null,null,0,":svg:path",[[":sketch:type","MSShapeGroup"],["d","M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"],["id","Polygon-5"],["stroke","#36B455"],["stroke-width","6"]],null,null,null,null,null)),(n()(),t["\u0275eld"](9,0,null,null,4,"div",[["class","message-box"]],null,null,null,null,null)),(n()(),t["\u0275eld"](10,0,null,null,1,"h1",[["style"," font-family: HelveticaNeue-Regular"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["404"])),(n()(),t["\u0275eld"](12,0,null,null,1,"p",[["style","font-size: 16px;line-height: 0px;color:blue;width: 200%;font-family: HelveticaNeue-Regular;"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Page not found"]))],(function(n,l){n(l,1,0)}),null)}function h(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-page-not-found404",[],null,null,null,m,p)),t["\u0275did"](1,114688,null,0,d,[],null,null)],(function(n,l){n(l,1,0)}),null)}var f=t["\u0275ccf"]("app-page-not-found404",d,h,{},{},[]),M=e("SVse");class C{}var b=t["\u0275cmf"](o,[],(function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[a.a,f]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,M.q,M.p,[t.LOCALE_ID]),t["\u0275mpd"](1073742336,M.c,M.c,[]),t["\u0275mpd"](1073742336,g.l,g.l,[[2,g.q],[2,g.k]]),t["\u0275mpd"](1073742336,C,C,[]),t["\u0275mpd"](1073742336,o,o,[]),t["\u0275mpd"](1024,g.i,(function(){return[[{path:"",component:d}]]}),[])])}))},bykz:function(n,l,e){"use strict";e.d(l,"a",(function(){return a})),e.d(l,"b",(function(){return r}));var t=e("8Y7J"),o=e("G0yt"),a=(e("FC8X"),e("sgpt"),e("7xZw"),e("iInd"),e("LyNC"),t["\u0275crt"]({encapsulation:0,styles:[[".bg-white[_ngcontent-%COMP%]{background:#fff!important}.h_days[_ngcontent-%COMP%]{font-size:1.5rem;font-family:Gotham Book Regular}.h_days[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%]{color:#fff;background:#000;margin:0 0 0 10px;padding:5px 8px;border-radius:3px;font-family:HelveticaNeue-Bold}.prof[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;margin-right:10px;display:flex;align-items:center;font-family:HelveticaNeue-Medium}.prof[_ngcontent-%COMP%]   .prof_pic[_ngcontent-%COMP%]{width:50px;height:50px;border-radius:50px;border:1px solid #ccc;margin-right:5px}.prof[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .grt[_ngcontent-%COMP%]{font-size:.7rem}.prof[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:.7rem;text-transform:capitalize!important}.prof[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#ccc}.navbar-brand[_ngcontent-%COMP%]{padding-top:.75rem;padding-bottom:.75rem;font-size:1rem}.navbar[_ngcontent-%COMP%]   .navbar-toggler[_ngcontent-%COMP%]{top:.8rem;right:1rem}.navbar[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{padding:.75rem 1rem;border-width:0;border-radius:0}.navbar[_ngcontent-%COMP%]   .navbar-toggler-icon[_ngcontent-%COMP%]{background-image:url(menu.ad1baf9e51195a861691.png)}.navbar-toggler[_ngcontent-%COMP%]{border:1px solid #333!important}"]],data:{}}));function r(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,17,"header",[["class","navbar sticky-top bg-white flex-md-nowrap p-0"]],null,null,null,null,null)),t["\u0275did"](1,16384,null,0,o.H,[],null,null),(n()(),t["\u0275eld"](2,0,null,null,1,"a",[["class","navbar-brand col-md-3 col-lg-2 me-0 px-3"],["href","#"]],null,null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,0,"img",[["src","assets/images/Swickard-Logo.png"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,1,"button",[["aria-controls","sidebarMenu"],["aria-expanded","false"],["aria-label","Toggle navigation"],["class","navbar-toggler position-absolute d-md-none collapsed"],["data-bs-target","#sidebarMenu"],["data-bs-toggle","collapse"],["type","button"]],null,null,null,null,null)),(n()(),t["\u0275eld"](5,0,null,null,0,"span",[["class","navbar-toggler-icon"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,null,null,2,"div",[["class","mx-auto"]],null,null,null,null,null)),(n()(),t["\u0275eld"](7,0,null,null,1,"div",[["class","h_days d-flex justify-content-center align-items-center"],["style","text-transform: uppercase;"]],null,null,null,null,null)),(n()(),t["\u0275ted"](8,null,["",""])),(n()(),t["\u0275eld"](9,0,null,null,8,"div",[["class"," d-flex align-items-center mx-auto mx-lg-0 pe-lg-5 py-2 py-lg-0"]],null,null,null,null,null)),(n()(),t["\u0275eld"](10,0,null,null,7,"div",[["class","prof"]],null,null,null,null,null)),(n()(),t["\u0275eld"](11,0,null,null,6,"div",[["class","text"]],null,null,null,null,null)),(n()(),t["\u0275eld"](12,0,null,null,1,"div",[["class","grt"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Welcome,"])),(n()(),t["\u0275eld"](14,0,null,null,3,"div",[["class","name"]],null,null,null,null,null)),(n()(),t["\u0275ted"](15,null,["",", "])),(n()(),t["\u0275eld"](16,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](17,null,["",""]))],null,(function(n,l){var e=l.component;n(l,8,0,e.Header),n(l,15,0,e.globalVarComponent.g_FullNameDisplay),n(l,17,0,e.globalVarComponent.g_UserTitle)}))}}}]);