(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{FC8X:function(l,n,e){"use strict";e.d(n,"a",(function(){return t}));class t{constructor(l,n,e,t,u){this.spinnerService=l,this.authService=n,this.router=e,this._Activatedroute=t,this.globalVarComponent=u,this.href="",this.user_name="",this.Header="",this.currentDate=new Date,this.UserDetails="",this.Fullname="",this.SideMenuData="",this.Username="",this.RoleID="",this.GetRoleNames=[],this.getroleNames=[],this.ParentModules=[],this.SModuleArray=[],this.SelectedMenu="",this.DeniedText=""}ngOnInit(){this.href=this.router.url,"/NightlyReportSales"==this.href?this.Header="NIGHTLY SUMMARY":"/ServiceContractForm"==this.href?this.Header="Service Contract Cancellation Requests":"/RBReport"==this.href?this.Header="FINANCIAL OVERVIEW":"/IncidentReport"==this.href?this.Header="INCIDENT REPORT FORM":"/VehiclePurchase"==this.href&&(this.Header="VEHICLE PURCHASE"),"N"==this.globalVarComponent.isSideMenu_Disabled?this.globalVarComponent.SideMenu=!0:"Y"==this.globalVarComponent.isSideMenu_Disabled&&(this.globalVarComponent.isSideMenu_Disabled="N"),this.authService.getFullSideMenu().subscribe(l=>{console.log("full_sidemenu",l)}),null===localStorage.getItem("RoleID")&&location.replace("http://axel.swickard.com/landing.aspx");var l=window.location.hash.replace("#/","");"401Error"!=l&&"404Error"!=l&&0==this.globalVarComponent.ReportId&&(localStorage.getItem("User_ID"),setTimeout(()=>{this.authService.getSideMenu().subscribe(n=>{this.authService.getFullSideMenu().subscribe(e=>{0==e.some(n=>n.SMOD_FILENAME==l)?this.router.navigate(["404Error"]):0==n.some(n=>n.SMOD_FILENAME==l)&&1==e.some(n=>n.SMOD_FILENAME==l)&&"Y"!=localStorage.getItem("IsIncidentReportDataPage")&&this.router.navigate(["401Error"]),"Y"==localStorage.getItem("IsIncidentReportDataPage")&&localStorage.setItem("IsIncidentReportDataPage","N")})})},2e3),this.globalVarComponent.g_SelectedMenuItem=l),""==localStorage.getItem("LocalUserName")&&null==localStorage.getItem("LocalUserName")||setTimeout(()=>{if(this.username(),console.log("g_ReportUserId",this.globalVarComponent.g_ReportUserId),0!=this.globalVarComponent.g_ReportUserId&&null!=this.globalVarComponent.g_ReportUserId&&null!=this.globalVarComponent.g_ReportUserId){var l=localStorage.getItem("ReportUrl");console.log("after g_Reporturl: ",l),localStorage.setItem("ReportUrl",""),this.router.navigate([l])}},2e3)}username(){""==this.globalVarComponent.g_FullNameDisplay&&(this.globalVarComponent.g_FullNameDisplay=localStorage.getItem("LocalUserName"),this.globalVarComponent.g_UserTitle=localStorage.getItem("User_Title"))}}},HG1r:function(l,n,e){"use strict";e.r(n),e.d(n,"DashboardModuleNgFactory",(function(){return D}));var t=e("8Y7J");class u{}var i=e("pMnS"),o=e("s7LF"),a=e("SVse"),r=e("bykz"),s=e("FC8X"),d=e("sgpt"),c=e("7xZw"),g=e("iInd"),p=e("LyNC"),h=e("Y/BS");class f{constructor(l,n,e){this.authService=l,this.router=n,this.spinnerService=e,this.Dealer_DD=[],this.list_items=[],this.DEALER_Change=0,this.Header=[],this.elementClicked="",this.SalesType="M",this.Isinactive=!1,this.IsDivinactive=!1,this.IsLink_Underline=!1,this.tab="tab_M",this.NoMoreRecords=!1}ngOnInit(){this.NoMoreRecords=!1,this.DealerDropDown(),this.GridBind()}DealerDropDown(){const l={AU_ID:localStorage.getItem("User_ID")};this.authService.AXELPostmethod("AXELData/GetCorporatesbyUser",l).subscribe(l=>{""!==l&&(this.Dealer_DD=l.response.recordset,console.log("Errors",this.Dealer_DD))})}DealerChange(l){this.DEALER_Change=l.target.value,this.GridBind()}onClick(l){1==l?(this.tab="tab_M",this.SalesType="M"):2==l?(this.tab="tab_Q",this.SalesType="Q"):(this.tab="tab_Y",this.SalesType="Y"),this.GridBind()}GridBind(){const l={AU_ID:localStorage.getItem("User_ID"),AS_ID:this.DEALER_Change,SALES_PERIOD_TYPE:this.SalesType};this.spinnerService.show(),this.authService.AXELPostmethod("AXELData/GetSalesOverview",l).subscribe(l=>{this.NoMoreRecords=!0,this.list_items=l.response.recordset,this.Header=l.response.recordset[0],this.list_items.shift(),console.log("Body",this.list_items),console.log("Header",this.Header),this.spinnerService.hide()})}highlightRow(l){this.selecttr="",this.selectedName=l.STORE_TITLE,this.Isinactive=!0,this.IsDivinactive=!0}Close(){this.Isinactive=!1,this.IsDivinactive=!1}SideTabClick(l){1.1==l?this.router.navigate(["SalesOverview"]):2.1==l?this.router.navigate(["InventoryOverview"]):2.4==l?this.router.navigate(["Inventory"]):4.1==l?this.router.navigate(["SalesServiceOverview"]):5.1==l?this.router.navigate(["ServiceAppointments"]):5.2==l?this.router.navigate(["AppointmentsObjectives"]):5.3==l?this.router.navigate(["SAGReport"]):6.1==l&&this.router.navigate(["Admin/AccountsCOA"])}}var m=t["\u0275crt"]({encapsulation:0,styles:[[".value[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:inline-block;margin:0;font-family:HelveticaNeue-Light}.value[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:inline;list-style:none;cursor:pointer;padding:0 .5rem}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]{position:relative;z-index:99}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child{background:transparent!important}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background:#fff!important}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{padding-left:20px}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tr.active[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-family:HelveticaNeue-Bold;font-size:.8rem}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#e8ebef}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:first-child:hover{background-color:initial!important}#style-14[_ngcontent-%COMP%]::-webkit-scrollbar{width:10px;background-color:#f5f5f5}.stor_headng[_ngcontent-%COMP%]   .column2[_ngcontent-%COMP%]{float:left;width:40%}.stor_headng[_ngcontent-%COMP%]   .column3[_ngcontent-%COMP%]{float:left;width:39%}#style-14[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#fff;background-image:-webkit-linear-gradient(90deg,#000,#000 25%,transparent 100%,#000 0,transparent)}table[_ngcontent-%COMP%]   tr.highlight[_ngcontent-%COMP%]{color:#000;font-size:medium;font-weight:700}.tabactive[_ngcontent-%COMP%]{border-bottom:2px solid #fff;font-weight:700}.M[_ngcontent-%COMP%], .Q[_ngcontent-%COMP%], .Y[_ngcontent-%COMP%]{text-decoration:underline}"]],data:{}});function b(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),t["\u0275did"](1,147456,null,0,o.NgSelectOption,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](2,147456,null,0,o["\u0275angular_packages_forms_forms_x"],[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](3,null,["",""]))],(function(l,n){l(n,1,0,n.context.$implicit.AS_ID),l(n,2,0,n.context.$implicit.AS_ID)}),(function(l,n){l(n,3,0,n.context.$implicit.DEALER_NAME)}))}function v(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,54,"thead",[],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,53,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,0,"th",[["class","store_name"],["style","width: 22%; border-top: none;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,5,"th",[["style","width: 9.5%; border-bottom: 5px solid #65bbfa;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,1,"span",[["class","store_ttl"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["NEW"])),(l()(),t["\u0275eld"](6,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,1,"span",[["class","store_val"]],null,null,null,null,null)),(l()(),t["\u0275ted"](8,null,["",""])),(l()(),t["\u0275eld"](9,0,null,null,0,"th",[["style","width: .3%; background:transparent !important;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,5,"th",[["style","width: 9.5%; border-bottom: 5px solid #65bbfa;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,1,"span",[["class","store_ttl"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Pre-Owned"])),(l()(),t["\u0275eld"](13,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](14,0,null,null,1,"span",[["class","store_val"]],null,null,null,null,null)),(l()(),t["\u0275ted"](15,null,["",""])),(l()(),t["\u0275eld"](16,0,null,null,0,"th",[["style","width: .5%; background:transparent !important;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](17,0,null,null,5,"th",[["style","width: 9.5%; border-bottom: 5px solid #65bbfa;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](18,0,null,null,1,"span",[["class","store_ttl"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["CPO"])),(l()(),t["\u0275eld"](20,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](21,0,null,null,1,"span",[["class","store_val"]],null,null,null,null,null)),(l()(),t["\u0275ted"](22,null,["",""])),(l()(),t["\u0275eld"](23,0,null,null,0,"th",[["style","width: .3%; background:transparent !important;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](24,0,null,null,5,"th",[["style","width: 9.5%; border-bottom: 5px solid #65bbfa;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](25,0,null,null,1,"span",[["class","store_ttl"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["TOTAL"])),(l()(),t["\u0275eld"](27,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](28,0,null,null,1,"span",[["class","store_val"]],null,null,null,null,null)),(l()(),t["\u0275ted"](29,null,["",""])),(l()(),t["\u0275eld"](30,0,null,null,0,"th",[["style","width: .3%; background:transparent !important;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](31,0,null,null,7,"th",[["style","width: 12.5%; border-bottom: 5px solid #5bdd97;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](32,0,null,null,3,"span",[["class","store_ttl"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["FRONTEND"])),(l()(),t["\u0275eld"](34,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" GROSS"])),(l()(),t["\u0275eld"](36,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](37,0,null,null,1,"span",[["class","store_val"]],null,null,null,null,null)),(l()(),t["\u0275ted"](38,null,["",""])),(l()(),t["\u0275eld"](39,0,null,null,0,"th",[["style","width: .5%; background:transparent !important;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](40,0,null,null,7,"th",[["style","width: 12.5%; border-bottom: 5px solid #5bdd97;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](41,0,null,null,3,"span",[["class","store_ttl"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["BACKEND"])),(l()(),t["\u0275eld"](43,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" GROSS"])),(l()(),t["\u0275eld"](45,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](46,0,null,null,1,"span",[["class","store_val"]],null,null,null,null,null)),(l()(),t["\u0275ted"](47,null,["",""])),(l()(),t["\u0275eld"](48,0,null,null,0,"th",[["style","width: .5%; background:transparent !important;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](49,0,null,null,5,"th",[["style","width: 12%; border-bottom: 5px solid #5bdd97;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](50,0,null,null,1,"span",[["class","store_ttl"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["TOTAL"])),(l()(),t["\u0275eld"](52,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](53,0,null,null,1,"span",[["class","store_val"]],null,null,null,null,null)),(l()(),t["\u0275ted"](54,null,["",""]))],null,(function(l,n){var e=n.component;l(n,8,0,e.Header.NEW),l(n,15,0,e.Header.USED),l(n,22,0,e.Header.CPO),l(n,29,0,e.Header.TOTAL_UNITS),l(n,38,0,e.Header.FEG),l(n,47,0,e.Header.BEG),l(n,54,0,e.Header.TOTAL_GROSS)}))}function _(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,24,"tr",[],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.highlightRow(l.context.$implicit)&&t),t}),null,null)),t["\u0275did"](1,278528,null,0,a.m,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{ngClass:[0,"ngClass"]},null),t["\u0275pod"](2,{incative:0,highlight:1,highlighttr:2}),(l()(),t["\u0275eld"](3,0,null,null,1,"td",[["class","store_name"]],null,null,null,null,null)),(l()(),t["\u0275ted"](4,null,["",""])),(l()(),t["\u0275eld"](5,0,null,null,1,"td",[["style","float: right;"]],null,null,null,null,null)),(l()(),t["\u0275ted"](6,null,["",""])),(l()(),t["\u0275eld"](7,0,null,null,0,"td",[["style","background: transparent !important;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,1,"td",[["style","float: right;"]],null,null,null,null,null)),(l()(),t["\u0275ted"](9,null,["",""])),(l()(),t["\u0275eld"](10,0,null,null,0,"td",[["style","background: transparent !important;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,1,"td",[["style","float: right;"]],null,null,null,null,null)),(l()(),t["\u0275ted"](12,null,["",""])),(l()(),t["\u0275eld"](13,0,null,null,0,"td",[["style","background: transparent !important;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](14,0,null,null,1,"td",[["style","float: right;"]],null,null,null,null,null)),(l()(),t["\u0275ted"](15,null,["",""])),(l()(),t["\u0275eld"](16,0,null,null,0,"td",[["style","background: transparent !important;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](17,0,null,null,1,"td",[["style","float: right;"]],null,null,null,null,null)),(l()(),t["\u0275ted"](18,null,["",""])),(l()(),t["\u0275eld"](19,0,null,null,0,"td",[["style","background: transparent !important;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](20,0,null,null,1,"td",[["style","float: right;"]],null,null,null,null,null)),(l()(),t["\u0275ted"](21,null,["",""])),(l()(),t["\u0275eld"](22,0,null,null,0,"td",[["style","background: transparent !important;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](23,0,null,null,1,"td",[["style","float: right;"]],null,null,null,null,null)),(l()(),t["\u0275ted"](24,null,["",""]))],(function(l,n){var e=n.component,t=l(n,2,0,e.Isinactive,n.context.$implicit.STORE_TITLE==e.selectedName,n.context.$implicit.type==e.selecttr);l(n,1,0,t)}),(function(l,n){l(n,4,0,n.context.$implicit.STORE_TITLE),l(n,6,0,n.context.$implicit.NEW),l(n,9,0,n.context.$implicit.USED),l(n,12,0,n.context.$implicit.CPO),l(n,15,0,n.context.$implicit.TOTAL_UNITS),l(n,18,0,n.context.$implicit.FEG),l(n,21,0,n.context.$implicit.BEG),l(n,24,0,n.context.$implicit.TOTAL_GROSS)}))}function C(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,null,null,null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](2,278528,null,0,a.n,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275and"](0,null,null,0))],(function(l,n){l(n,2,0,n.component.list_items)}),null)}function y(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,3,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,2,"td",[["colspan","15"],["style","text-align: center;color: #040404;font-size: 14px;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,1,"label",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["No Data Found !!"]))],null,null)}function x(l){return t["\u0275vid"](0,[(l()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](1,16384,null,0,a.o,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](0,null,null,0))],(function(l,n){l(n,1,0,n.component.NoMoreRecords)}),null)}function M(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-header",[],null,null,null,r.b,r.a)),t["\u0275did"](1,114688,null,0,s.a,[d.Ng4LoadingSpinnerService,c.a,g.k,g.a,p.a],null,null),(l()(),t["\u0275eld"](2,0,null,null,62,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,61,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,1,"ng4-loading-spinner",[],null,null,null,h.b,h.a)),t["\u0275did"](5,180224,null,0,d.Ng4LoadingSpinnerComponent,[d.Ng4LoadingSpinnerService],null,null),(l()(),t["\u0275eld"](6,0,null,null,58,"main",[["class","col-md-9 ms-auto col-lg-10"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,23,"div",[["class","row flex-wrap flex-md-nowrap align-items-center border-bottom"]],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,22,"div",[["class","top_bg d-flex align-items-center"]],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,7,"div",[["class","me-auto pt-3"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,6,"select",[["class","_dropdwn"],["id","Dealer_DDL"]],null,[[null,"change"]],(function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.DealerChange(e)&&t),t}),null,null)),(l()(),t["\u0275eld"](11,0,null,null,3,"option",[["value","0"]],null,null,null,null,null)),t["\u0275did"](12,147456,null,0,o.NgSelectOption,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](13,147456,null,0,o["\u0275angular_packages_forms_forms_x"],[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["All Stores"])),(l()(),t["\u0275and"](16777216,null,null,1,null,b)),t["\u0275did"](16,278528,null,0,a.n,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](17,0,null,null,13,"div",[["class","ms-auto value"]],null,null,null,null,null)),(l()(),t["\u0275eld"](18,0,null,null,12,"ul",[],null,null,null,null,null)),(l()(),t["\u0275eld"](19,0,null,null,3,"li",[],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.onClick(1)&&t),t}),null,null)),t["\u0275did"](20,278528,null,0,a.m,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{ngClass:[0,"ngClass"]},null),t["\u0275pod"](21,{tabactive:0}),(l()(),t["\u0275ted"](-1,null,["MTD"])),(l()(),t["\u0275eld"](23,0,null,null,3,"li",[],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.onClick(2)&&t),t}),null,null)),t["\u0275did"](24,278528,null,0,a.m,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{ngClass:[0,"ngClass"]},null),t["\u0275pod"](25,{tabactive:0}),(l()(),t["\u0275ted"](-1,null,["QTD"])),(l()(),t["\u0275eld"](27,0,null,null,3,"li",[],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.onClick(3)&&t),t}),null,null)),t["\u0275did"](28,278528,null,0,a.m,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{ngClass:[0,"ngClass"]},null),t["\u0275pod"](29,{tabactive:0}),(l()(),t["\u0275ted"](-1,null,["YTD"])),(l()(),t["\u0275eld"](31,0,null,null,10,"div",[["class","stor_headng"]],null,null,null,null,null)),(l()(),t["\u0275eld"](32,0,null,null,9,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](33,0,null,null,0,"div",[["class","column1"]],null,null,null,null,null)),(l()(),t["\u0275eld"](34,0,null,null,3,"div",[["class","column2"]],null,null,null,null,null)),(l()(),t["\u0275eld"](35,0,null,null,2,"h2",[["class","ttl-sales"]],null,null,null,null,null)),(l()(),t["\u0275eld"](36,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Sales"])),(l()(),t["\u0275eld"](38,0,null,null,3,"div",[["class","column3"]],null,null,null,null,null)),(l()(),t["\u0275eld"](39,0,null,null,2,"h2",[["class","ttl-sales"]],null,null,null,null,null)),(l()(),t["\u0275eld"](40,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Revenue"])),(l()(),t["\u0275eld"](42,0,null,null,22,"div",[["class","table-responsive hover_"]],null,null,null,null,null)),(l()(),t["\u0275eld"](43,0,null,null,21,"table",[["class","table table-striped  "],["style","width: 100%; text-align: center;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](44,0,null,null,14,"colgroup",[],null,null,null,null,null)),(l()(),t["\u0275eld"](45,0,null,null,0,"col",[],null,null,null,null,null)),(l()(),t["\u0275eld"](46,0,null,null,0,"col",[["style","background:#f1f1f1"]],null,null,null,null,null)),(l()(),t["\u0275eld"](47,0,null,null,0,"col",[],null,null,null,null,null)),(l()(),t["\u0275eld"](48,0,null,null,0,"col",[["style","background:#f1f1f1"]],null,null,null,null,null)),(l()(),t["\u0275eld"](49,0,null,null,0,"col",[],null,null,null,null,null)),(l()(),t["\u0275eld"](50,0,null,null,0,"col",[["style","background:#f1f1f1"]],null,null,null,null,null)),(l()(),t["\u0275eld"](51,0,null,null,0,"col",[],null,null,null,null,null)),(l()(),t["\u0275eld"](52,0,null,null,0,"col",[["style","background:#f1f1f1"]],null,null,null,null,null)),(l()(),t["\u0275eld"](53,0,null,null,0,"col",[],null,null,null,null,null)),(l()(),t["\u0275eld"](54,0,null,null,0,"col",[["style","background:#f1f1f1"]],null,null,null,null,null)),(l()(),t["\u0275eld"](55,0,null,null,0,"col",[],null,null,null,null,null)),(l()(),t["\u0275eld"](56,0,null,null,0,"col",[["style","background:#f1f1f1"]],null,null,null,null,null)),(l()(),t["\u0275eld"](57,0,null,null,0,"col",[],null,null,null,null,null)),(l()(),t["\u0275eld"](58,0,null,null,0,"col",[["style","background:#f1f1f1"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,v)),t["\u0275did"](60,16384,null,0,a.o,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](61,0,null,null,3,"tbody",[["style","cursor: pointer;"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,C)),t["\u0275did"](63,16384,null,0,a.o,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(l()(),t["\u0275and"](0,[["norecdata",2]],null,0,null,x))],(function(l,n){var e=n.component;l(n,1,0),l(n,12,0,"0"),l(n,13,0,"0"),l(n,16,0,e.Dealer_DD);var u=l(n,21,0,"tab_M"===e.tab);l(n,20,0,u);var i=l(n,25,0,"tab_Q"===e.tab);l(n,24,0,i);var o=l(n,29,0,"tab_Y"===e.tab);l(n,28,0,o),l(n,60,0,e.Header),l(n,63,0,e.list_items.length>0,t["\u0275nov"](n,64))}),null)}function O(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-dashboard",[],null,null,null,M,m)),t["\u0275did"](1,114688,null,0,f,[c.a,g.k,d.Ng4LoadingSpinnerService],null,null)],(function(l,n){l(n,1,0)}),null)}var S=t["\u0275ccf"]("app-dashboard",f,O,{},{},[]);class I{}var D=t["\u0275cmf"](u,[],(function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,S]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,a.q,a.p,[t.LOCALE_ID]),t["\u0275mpd"](1073742336,a.c,a.c,[]),t["\u0275mpd"](1073742336,g.l,g.l,[[2,g.q],[2,g.k]]),t["\u0275mpd"](1073742336,I,I,[]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](1024,g.i,(function(){return[[{path:"",component:f}]]}),[])])}))},"Y/BS":function(l,n,e){"use strict";e.d(n,"a",(function(){return u})),e.d(n,"b",(function(){return i}));var t=e("8Y7J"),u=(e("sgpt"),t["\u0275crt"]({encapsulation:2,styles:['.spinner { position: fixed; padding: 0px; top: 0; left: 0; height: 100%; width: 100%; z-index: 9998; background: #000; opacity: 0.6; transition: opacity 0.3s linear; } .center { margin: auto; width: 100%; } .loading-text { position: fixed; top: 0; width: 100%; height: 100%; left: 0; padding: 0; margin: 0; color: #FFF; font-family: sans-serif; background: transparent; text-align: center; padding-top: 33%; } .spinner img { position: fixed; padding: 0px;  z-index: 10; background: #000; opacity: 0.6; transition: opacity 0.3s linear; } .hidden { visibility: hidden; opacity: 0; transition: visibility 0s 0.3s, opacity 0.3s linear; } .visible { visibility: visible; } .lds-roller { display: inline-block; position: relative; width: 64px; height: 64px; left: 48%; top: 47%; } .lds-roller div { animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite; transform-origin: 32px 32px; } .lds-roller div:after { content: " "; display: block; position: absolute; width: 6px; height: 6px; border-radius: 50%; background: #fff; margin: -3px 0 0 -3px; } .lds-roller div:nth-child(1) { animation-delay: -0.036s; } .lds-roller div:nth-child(1):after { top: 50px; left: 50px; } .lds-roller div:nth-child(2) { animation-delay: -0.072s; } .lds-roller div:nth-child(2):after { top: 54px; left: 45px; } .lds-roller div:nth-child(3) { animation-delay: -0.108s; } .lds-roller div:nth-child(3):after { top: 57px; left: 39px; } .lds-roller div:nth-child(4) { animation-delay: -0.144s; } .lds-roller div:nth-child(4):after { top: 58px; left: 32px; } .lds-roller div:nth-child(5) { animation-delay: -0.18s; } .lds-roller div:nth-child(5):after { top: 57px; left: 25px; } .lds-roller div:nth-child(6) { animation-delay: -0.216s; } .lds-roller div:nth-child(6):after { top: 54px; left: 19px; } .lds-roller div:nth-child(7) { animation-delay: -0.252s; } .lds-roller div:nth-child(7):after { top: 50px; left: 14px; } .lds-roller div:nth-child(8) { animation-delay: -0.288s; } .lds-roller div:nth-child(8):after { top: 45px; left: 10px; } @keyframes lds-roller { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } #loading-spinner-text { font-size: 26px; } .loading-spinner-text { font-size: 26px; }'],data:{}}));function i(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,[["spinnerContainer",1]],null,0,"div",[],[[8,"className",0],[8,"innerHTML",1]],null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"div",[["class","loading-spinner-text"],["id","loading-spinner-text"]],[[4,"zIndex",null],[8,"className",0]],null,null,null,null)),(l()(),t["\u0275ted"](2,null,[" "," "]))],null,(function(l,n){var e=n.component;l(n,0,0,e.showSpinner?"visible spinner center":"hidden spinner center",e.template),l(n,1,0,e.zIndex,e.showSpinner?"visible loading-text":"hidden loading-text"),l(n,2,0,e.loadingText)}))}},bykz:function(l,n,e){"use strict";e.d(n,"a",(function(){return i})),e.d(n,"b",(function(){return o}));var t=e("8Y7J"),u=e("G0yt"),i=(e("FC8X"),e("sgpt"),e("7xZw"),e("iInd"),e("LyNC"),t["\u0275crt"]({encapsulation:0,styles:[[".bg-white[_ngcontent-%COMP%]{background:#fff!important}.h_days[_ngcontent-%COMP%]{font-size:1.5rem;font-family:Gotham Book Regular}.h_days[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%]{color:#fff;background:#000;margin:0 0 0 10px;padding:5px 8px;border-radius:3px;font-family:HelveticaNeue-Bold}.prof[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;margin-right:10px;display:flex;align-items:center;font-family:HelveticaNeue-Medium}.prof[_ngcontent-%COMP%]   .prof_pic[_ngcontent-%COMP%]{width:50px;height:50px;border-radius:50px;border:1px solid #ccc;margin-right:5px}.prof[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .grt[_ngcontent-%COMP%]{font-size:.7rem}.prof[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:.7rem;text-transform:capitalize!important}.prof[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#ccc}.navbar-brand[_ngcontent-%COMP%]{padding-top:.75rem;padding-bottom:.75rem;font-size:1rem}.navbar[_ngcontent-%COMP%]   .navbar-toggler[_ngcontent-%COMP%]{top:.8rem;right:1rem}.navbar[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{padding:.75rem 1rem;border-width:0;border-radius:0}.navbar[_ngcontent-%COMP%]   .navbar-toggler-icon[_ngcontent-%COMP%]{background-image:url(menu.ad1baf9e51195a861691.png)}.navbar-toggler[_ngcontent-%COMP%]{border:1px solid #333!important}"]],data:{}}));function o(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,17,"header",[["class","navbar sticky-top bg-white flex-md-nowrap p-0"]],null,null,null,null,null)),t["\u0275did"](1,16384,null,0,u.H,[],null,null),(l()(),t["\u0275eld"](2,0,null,null,1,"a",[["class","navbar-brand col-md-3 col-lg-2 me-0 px-3"],["href","#"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,0,"img",[["src","assets/images/Swickard-Logo.png"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,1,"button",[["aria-controls","sidebarMenu"],["aria-expanded","false"],["aria-label","Toggle navigation"],["class","navbar-toggler position-absolute d-md-none collapsed"],["data-bs-target","#sidebarMenu"],["data-bs-toggle","collapse"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,0,"span",[["class","navbar-toggler-icon"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,2,"div",[["class","mx-auto"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,1,"div",[["class","h_days d-flex justify-content-center align-items-center"],["style","text-transform: uppercase;"]],null,null,null,null,null)),(l()(),t["\u0275ted"](8,null,["",""])),(l()(),t["\u0275eld"](9,0,null,null,8,"div",[["class"," d-flex align-items-center mx-auto mx-lg-0 pe-lg-5 py-2 py-lg-0"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,7,"div",[["class","prof"]],null,null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,6,"div",[["class","text"]],null,null,null,null,null)),(l()(),t["\u0275eld"](12,0,null,null,1,"div",[["class","grt"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Welcome,"])),(l()(),t["\u0275eld"](14,0,null,null,3,"div",[["class","name"]],null,null,null,null,null)),(l()(),t["\u0275ted"](15,null,["",", "])),(l()(),t["\u0275eld"](16,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](17,null,["",""]))],null,(function(l,n){var e=n.component;l(n,8,0,e.Header),l(n,15,0,e.globalVarComponent.g_FullNameDisplay),l(n,17,0,e.globalVarComponent.g_UserTitle)}))}}}]);