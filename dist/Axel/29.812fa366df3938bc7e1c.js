(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{FC8X:function(l,n,t){"use strict";t.d(n,"a",(function(){return e}));class e{constructor(l,n,t,e,o){this.spinnerService=l,this.authService=n,this.router=t,this._Activatedroute=e,this.globalVarComponent=o,this.href="",this.user_name="",this.Header="",this.currentDate=new Date,this.UserDetails="",this.Fullname="",this.SideMenuData="",this.Username="",this.RoleID="",this.GetRoleNames=[],this.getroleNames=[],this.ParentModules=[],this.SModuleArray=[],this.SelectedMenu="",this.DeniedText=""}ngOnInit(){this.href=this.router.url,"/NightlyReportSales"==this.href?this.Header="NIGHTLY SUMMARY":"/ServiceContractForm"==this.href?this.Header="Service Contract Cancellation Requests":"/RBReport"==this.href?this.Header="FINANCIAL OVERVIEW":"/IncidentReport"==this.href?this.Header="INCIDENT REPORT FORM":"/VehiclePurchase"==this.href&&(this.Header="VEHICLE PURCHASE"),"N"==this.globalVarComponent.isSideMenu_Disabled?this.globalVarComponent.SideMenu=!0:"Y"==this.globalVarComponent.isSideMenu_Disabled&&(this.globalVarComponent.isSideMenu_Disabled="N"),this.authService.getFullSideMenu().subscribe(l=>{console.log("full_sidemenu",l)}),null===localStorage.getItem("RoleID")&&location.replace("http://axel.swickard.com/landing.aspx");var l=window.location.hash.replace("#/","");"401Error"!=l&&"404Error"!=l&&0==this.globalVarComponent.ReportId&&(localStorage.getItem("User_ID"),setTimeout(()=>{this.authService.getSideMenu().subscribe(n=>{this.authService.getFullSideMenu().subscribe(t=>{0==t.some(n=>n.SMOD_FILENAME==l)?this.router.navigate(["404Error"]):0==n.some(n=>n.SMOD_FILENAME==l)&&1==t.some(n=>n.SMOD_FILENAME==l)&&"Y"!=localStorage.getItem("IsIncidentReportDataPage")&&this.router.navigate(["401Error"]),"Y"==localStorage.getItem("IsIncidentReportDataPage")&&localStorage.setItem("IsIncidentReportDataPage","N")})})},2e3),this.globalVarComponent.g_SelectedMenuItem=l),""==localStorage.getItem("LocalUserName")&&null==localStorage.getItem("LocalUserName")||setTimeout(()=>{if(this.username(),console.log("g_ReportUserId",this.globalVarComponent.g_ReportUserId),0!=this.globalVarComponent.g_ReportUserId&&null!=this.globalVarComponent.g_ReportUserId&&null!=this.globalVarComponent.g_ReportUserId){var l=localStorage.getItem("ReportUrl");console.log("after g_Reporturl: ",l),localStorage.setItem("ReportUrl",""),this.router.navigate([l])}},2e3)}username(){""==this.globalVarComponent.g_FullNameDisplay&&(this.globalVarComponent.g_FullNameDisplay=localStorage.getItem("LocalUserName"),this.globalVarComponent.g_UserTitle=localStorage.getItem("User_Title"))}}},Rbmb:function(l,n,t){"use strict";t.r(n),t.d(n,"StoreBrandsModuleNgFactory",(function(){return I}));var e=t("8Y7J");class o{}var r=t("pMnS"),u=t("SVse"),i=t("s7LF"),a=t("bykz"),d=t("FC8X"),s=t("sgpt"),c=t("7xZw"),g=t("iInd"),p=t("LyNC"),h=t("Y/BS");class f{constructor(l,n,t,e){this.spinnerService=l,this.authService=n,this.router=t,this.GroupData=e,this.StoresBrandsGrid=!0,this.EditStoreBrands=!0,this.Dealer_DD=[],this.GetBrands=[],this.brandids=[],this.SelectedBrandIds="",this.selectedItemsList=[],this.CheckedEditBrands=[],this.StoresBrandGridData=[],this.StoreId="0",this.StoresBrandArraydata={Storeid:"",Status:"Y",Action:"A"},this.FormStoresBrands=this.GroupData.group({Storeid:[""],brandids:[""],Status:[""],avatar:[null]})}ngOnInit(){this.StoresBrandsGrid=!0,this.EditStoreBrands=!1,this.GetStoresBrandData()}StoresData(){const l={AU_ID:localStorage.getItem("User_ID")};this.authService.AXELPostmethod("AXELData/GetCorporatesbyUser",l).subscribe(l=>{""!==l&&(this.Dealer_DD=l.response.recordset,console.log("StoresData",this.Dealer_DD))})}GetBrandsData(){this.authService.AXELPostmethod("Brands/GetBrands",{}).subscribe(l=>{""!==l&&(this.GetBrands=l.response.recordset)})}GetStoresBrandData(){this.spinnerService.show(),this.authService.AXELPostmethod("Brands/GetStoresData",{ID:0,CORAID:0,GROUPID:0,StartCnt:0,totCnt:0}).subscribe(l=>{200==l.status&&(this.EditStoreBrands=!1,this.StoresBrandGridData=l.response.recordset),this.spinnerService.hide()})}AddStoreBrand(){this.StoresBrandArraydata.Storeid="",this.StoresData(),this.CheckedEditBrands=[],this.brandids=[],this.GetBrandsData(),this.StoresBrandsGrid=!1,this.EditStoreBrands=!0}HandleStoreIds(l){var n=0;l=String(l),this.brandids.includes(l)||(this.brandids.push(l),""==this.SelectedBrandIds?this.SelectedBrandIds=l:this.SelectedBrandIds+=","+l,n++),0==n&&(this.SelectedBrandIds="",this.selectedItemsList=this.brandids.filter((n,t)=>{if(n!=l)return""==this.SelectedBrandIds?this.SelectedBrandIds=n:this.SelectedBrandIds+=","+n,n}),this.brandids=this.selectedItemsList)}IsStoreChecked(l){return this.CheckedEditBrands=[],this.CheckedEditBrands=this.brandids.filter((n,t)=>{if(String(l)==n)return n}),this.CheckedEditBrands.length>0?1:0}BackToBrandsGrid(){this.EditStoreBrands=!1,this.StoresBrandsGrid=!0}editGroup(l){this.brandids=[],this.StoresData(),this.GetBrandsData(),this.StoresBrandsGrid=!1,this.EditStoreBrands=!0;const n={ID:l,StartCnt:0};this.spinnerService.show(),this.authService.AXELPostmethod("Brands/GetStoresData",n).subscribe(n=>{if(200==n.status){let t=n.response.recordset.filter(n=>n.AS_ID===l);this.StoreId=t[0].AS_ID,this.SelectedBrandIds=t[0].AS_BRANDIDS,this.StoresBrandArraydata.Storeid=t[0].AS_ID,null!=this.SelectedBrandIds&&""!=this.SelectedBrandIds&&(this.brandids=this.SelectedBrandIds.split(","),parseInt(this.brandids))}this.spinnerService.hide()})}SaveStoresBrands(){const l={AS_ID:this.StoresBrandArraydata.Storeid,BRANDIDS:this.SelectedBrandIds};""==this.StoresBrandArraydata.Storeid&&alert("Please Select Group Name"),""==this.SelectedBrandIds?alert("Please Select Store Name"):this.authService.AXELPostmethod("Brands/StoreBrandAssignmentAction",l).subscribe(l=>{200==l.status&&alert("Updated Successfully"),this.StoresBrandsGrid=!0,this.EditStoreBrands=!1,this.GetStoresBrandData()})}}var m=e["\u0275crt"]({encapsulation:0,styles:[[".top_bg[_ngcontent-%COMP%]{width:100%;background-image:linear-gradient(90deg,#4a42d4,#267fd3);color:#fff;padding:10px 20px 35px}.value[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:inline-block;margin:0;font-family:HelveticaNeue-Light}.value[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:inline;list-style:none;cursor:pointer;padding:0 .5rem}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]{position:relative;z-index:99}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child{background:transparent!important}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{padding-left:20px}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tr.active[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-family:HelveticaNeue-Bold;font-size:.8rem}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#e8ebef}.hover_[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:first-child:hover{background-color:initial!important}#style-14[_ngcontent-%COMP%]::-webkit-scrollbar{width:10px;background-color:#f5f5f5}#style-14[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#fff;background-image:-webkit-linear-gradient(90deg,#000,#000 25%,transparent 100%,#000 0,transparent)}table[_ngcontent-%COMP%]   tr.highlight[_ngcontent-%COMP%]{color:#000;font-size:medium;font-weight:700}.tabactive[_ngcontent-%COMP%]{border-bottom:2px solid #fff;font-weight:700}.M[_ngcontent-%COMP%], .Q[_ngcontent-%COMP%], .Y[_ngcontent-%COMP%]{text-decoration:underline}.column[_ngcontent-%COMP%]{float:left;width:64.5%}.column1[_ngcontent-%COMP%]{float:left;width:34%}tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{text-decoration:none;color:#000;font-weight:700}.divbox[_ngcontent-%COMP%]{background-color:#267fd3;box-sizing:border-box;padding:1px 9px;width:auto;border-radius:2px;margin:4px;color:#fff;height:38px}.switch[_ngcontent-%COMP%]{width:175px;background:rgba(0,0,0,.25)}.switch[_ngcontent-%COMP%], .threeswitch[_ngcontent-%COMP%]{position:relative;height:26px;margin:7px 0;border-radius:3px}.threeswitch[_ngcontent-%COMP%]{width:174px;background:#fff;color:#000}.switch-label[_ngcontent-%COMP%]{border:1px solid #727772;border-top:unset;border-bottom:unset;position:relative;z-index:3;float:left;width:58px;line-height:26px;font-size:11px;text-align:center;cursor:pointer}.switch-label[_ngcontent-%COMP%]:active{font-weight:700}.switch-label-off[_ngcontent-%COMP%]{padding-left:2px}.switch-label-on[_ngcontent-%COMP%]{padding-right:2px}.switch-input[_ngcontent-%COMP%]{display:none}.switch-input[_ngcontent-%COMP%]:checked + .switch-label-on[_ngcontent-%COMP%] ~ .switch-selection[_ngcontent-%COMP%]{left:60px}.switch-input[_ngcontent-%COMP%]:checked + .switch-label-off[_ngcontent-%COMP%]{background-color:#65bd63}.switch-input[_ngcontent-%COMP%]:checked + .switch-label-mod[_ngcontent-%COMP%], .switch-input[_ngcontent-%COMP%]:checked + .switch-label-off[_ngcontent-%COMP%]{color:#fff;text-shadow:0 1px hsla(0,0%,100%,.25);transition:.15s ease-out;transition-property:color,text-shadow}.switch-input[_ngcontent-%COMP%]:checked + .switch-label-mod[_ngcontent-%COMP%]{background-color:#dc3545}.switch-input[_ngcontent-%COMP%]:checked + .switch-label-on[_ngcontent-%COMP%]{color:#fff;background-color:#a81414;transition:.15s ease-out;transition-property:color,text-shadow}.switch-selection[_ngcontent-%COMP%] + .switch-label-off[_ngcontent-%COMP%] ~ .switch-input[_ngcontent-%COMP%]{background-color:#65bd63;background-image:linear-gradient(top,#9dd993,#65bd63);transition:left .15s ease-out}.switch-selection[_ngcontent-%COMP%] + .switch-label-off[_ngcontent-%COMP%] ~ .switch-input[_ngcontent-%COMP%], .switch-selection[_ngcontent-%COMP%] + .switch-label-on[_ngcontent-%COMP%] ~ .switch-input[_ngcontent-%COMP%]{position:absolute;z-index:1;top:2px;left:2px;display:block;width:100px;height:22px;border-radius:3px}.switch-selection[_ngcontent-%COMP%] + .switch-label-on[_ngcontent-%COMP%] ~ .switch-input[_ngcontent-%COMP%]{background-color:#dc3545;background-image:linear-gradient(top,#dc3545,#dc3545);transition:right .15s ease-out}.contentpanel[_ngcontent-%COMP%]{width:100%;height:auto;border:1px solid #267fd3;border-radius:5px;padding:25px 30px;margin-bottom:30px}.Mod_Headings[_ngcontent-%COMP%]{font-size:17px;padding:5px}.savebutton[_ngcontent-%COMP%]{background:#267fd3;border:1px solid #267fd3;border-radius:3px}.cancelbutton[_ngcontent-%COMP%], .savebutton[_ngcontent-%COMP%]{padding:5px;outline:0;font-weight:400;font-size:14px;color:#fff;text-transform:uppercase;width:100%}.cancelbutton[_ngcontent-%COMP%]{background:grey;border:1px solid grey;border-radius:3px}.logoPointer[_ngcontent-%COMP%]{margin:5px 5px 0;cursor:pointer;background-color:#267fd3}.closebtn[_ngcontent-%COMP%]{background:#267fd3;border:1px solid #267fd3;border-radius:3px;padding:2px;outline:0;font-weight:20;font-size:12px;color:#fff;text-transform:uppercase;float:left}.Active[_ngcontent-%COMP%]{color:green;text-align:center}.InActive[_ngcontent-%COMP%]{color:red;text-align:center;text-transform:uppercase}"]],data:{}});function b(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,8,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,2,"td",[["class","store_name"],["style","padding-left: 20px;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](2,null,["",""])),e["\u0275ppd"](3,1),(l()(),e["\u0275eld"](4,0,null,null,1,"td",[["class","store_name"],["style","width:50%;padding-left: 20px;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](5,null,["",""])),(l()(),e["\u0275eld"](6,0,null,null,2,"td",[["style","background: transparent !important;"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,1,"button",[["class","btn-primary"],["style","width: 60%;background-color:#267fd3;color: white;"],["type","submit"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.editGroup(l.context.$implicit.AS_ID)&&e),e}),null,null)),(l()(),e["\u0275ted"](-1,null,["Update"]))],null,(function(l,n){var t=e["\u0275unv"](n,2,0,l(n,3,0,e["\u0275nov"](n.parent.parent.parent,0),n.context.$implicit.AS_DEALERNAME));l(n,2,0,t),l(n,5,0,n.context.$implicit.BRANDS)}))}function C(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,2,null,null,null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,b)),e["\u0275did"](2,278528,null,0,u.n,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275and"](0,null,null,0))],(function(l,n){l(n,2,0,n.component.StoresBrandGridData)}),null)}function v(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,3,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,2,"td",[["colspan","5"],["style","text-align: center;color: #040404;font-size: 14px;"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,1,"label",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["No Data Found !!"]))],null,null)}function _(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,19,"main",[["class","col-md-9 ms-auto col-lg-10"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,4,"div",[["class","row flex-wrap flex-md-nowrap align-items-center border-bottom"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,3,"div",[["class","top_bg d-flex align-items-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,2,"div",[["class","form-group col-xs-3 "]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,1,"label",[["class","form-control input-group-lg reg_name"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Brand Assignment"])),(l()(),e["\u0275eld"](6,0,null,null,13,"div",[["class","table-responsive hover_"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,12,"table",[["class","table table-striped"],["style","width: 100%; text-align: center;"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,7,"thead",[],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,6,"tr",[["style","text-transform: uppercase;"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,1,"th",[["class","store_name"],["scope","col"],["style","padding-left: 20px;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Store Names"])),(l()(),e["\u0275eld"](12,0,null,null,1,"th",[["class","store_name"],["scope","col"],["style","padding-left: 20px;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Brands"])),(l()(),e["\u0275eld"](14,0,null,null,1,"th",[["scope","col"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Action"])),(l()(),e["\u0275eld"](16,0,null,null,3,"tbody",[["style","cursor: pointer;"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,C)),e["\u0275did"](18,16384,null,0,u.o,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](0,[["norecdata",2]],null,0,null,v))],(function(l,n){l(n,18,0,n.component.StoresBrandGridData)}),null)}function S(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),e["\u0275did"](1,147456,null,0,i.NgSelectOption,[e.ElementRef,e.Renderer2,[2,i.SelectControlValueAccessor]],{value:[0,"value"]},null),e["\u0275did"](2,147456,null,0,i["\u0275angular_packages_forms_forms_x"],[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](3,null,["",""]))],(function(l,n){l(n,1,0,n.context.$implicit.AS_ID),l(n,2,0,n.context.$implicit.AS_ID)}),(function(l,n){l(n,3,0,n.context.$implicit.DEALER_NAME)}))}function x(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,8,"div",[["class","form-check form-switch col "],["style","font-size: 17px;padding-left: 5em;"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,5,"input",[["class","form-check-input"],["formControlName","brandids"],["id","brandids"],["type","checkbox"]],[[8,"checked",0],[8,"value",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"change"],[null,"blur"]],(function(l,n,t){var o=!0,r=l.component;return"change"===n&&(o=!1!==e["\u0275nov"](l,2).onChange(t.target.checked)&&o),"blur"===n&&(o=!1!==e["\u0275nov"](l,2).onTouched()&&o),"change"===n&&(o=!1!==r.HandleStoreIds(l.context.$implicit.brand_chrome_id)&&o),o}),null,null)),e["\u0275did"](2,16384,null,0,i.CheckboxControlValueAccessor,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,i.NG_VALUE_ACCESSOR,(function(l){return[l]}),[i.CheckboxControlValueAccessor]),e["\u0275did"](4,671744,null,0,i.FormControlName,[[3,i.ControlContainer],[8,null],[8,null],[6,i.NG_VALUE_ACCESSOR],[2,i["\u0275angular_packages_forms_forms_p"]]],{name:[0,"name"]},null),e["\u0275prd"](2048,null,i.NgControl,null,[i.FormControlName]),e["\u0275did"](6,16384,null,0,i.NgControlStatus,[[4,i.NgControl]],null,null),(l()(),e["\u0275eld"](7,0,null,null,1,"label",[["class","form-check-label"],["for","brandids"],["style","width: 200px;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](8,null,["",""]))],(function(l,n){l(n,4,0,"brandids")}),(function(l,n){l(n,1,0,1==n.component.IsStoreChecked(n.context.$implicit.brand_chrome_id),n.context.$implicit.brand_chrome_id,e["\u0275nov"](n,6).ngClassUntouched,e["\u0275nov"](n,6).ngClassTouched,e["\u0275nov"](n,6).ngClassPristine,e["\u0275nov"](n,6).ngClassDirty,e["\u0275nov"](n,6).ngClassValid,e["\u0275nov"](n,6).ngClassInvalid,e["\u0275nov"](n,6).ngClassPending),l(n,8,0,n.context.$implicit.brand_name)}))}function M(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,51,"main",[["class","col-md-9 ms-auto col-lg-10"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,4,"div",[["class","row flex-wrap flex-md-nowrap align-items-center border-bottom"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,3,"div",[["class","top_bg d-flex align-items-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,2,"div",[["class","form-group col-xs-3 "]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,1,"label",[["class","form-control input-group-lg reg_name"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Edit Brands"])),(l()(),e["\u0275eld"](6,0,null,null,3,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,0,"div",[["class","column1"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,0,"div",[["class","column"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,41,"div",[["class","contentpanel"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,40,"div",[["class","container"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,39,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](13,0,null,null,38,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](14,0,null,null,37,"div",[["class","panel panel-default"]],null,null,null,null,null)),(l()(),e["\u0275eld"](15,0,null,null,36,"div",[["class","panel-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](16,0,null,null,35,"form",[["novalidate",""],["role","form"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(l,n,t){var o=!0;return"submit"===n&&(o=!1!==e["\u0275nov"](l,18).onSubmit(t)&&o),"reset"===n&&(o=!1!==e["\u0275nov"](l,18).onReset()&&o),o}),null,null)),e["\u0275did"](17,16384,null,0,i["\u0275angular_packages_forms_forms_y"],[],null,null),e["\u0275did"](18,540672,null,0,i.FormGroupDirective,[[8,null],[8,null]],{form:[0,"form"]},null),e["\u0275prd"](2048,null,i.ControlContainer,null,[i.FormGroupDirective]),e["\u0275did"](20,16384,null,0,i.NgControlStatusGroup,[[4,i.ControlContainer]],null,null),(l()(),e["\u0275eld"](21,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](22,0,null,null,21,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](23,0,null,null,14,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](24,0,null,null,1,"label",[["class","Mod_Headings"],["for","Storeid"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Stores:"])),(l()(),e["\u0275eld"](26,0,null,null,11,"select",[["class","form-control w-75 inptcs"],["formControlName","Storeid"],["style","width: 40% !important;"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],(function(l,n,t){var o=!0,r=l.component;return"change"===n&&(o=!1!==e["\u0275nov"](l,27).onChange(t.target.value)&&o),"blur"===n&&(o=!1!==e["\u0275nov"](l,27).onTouched()&&o),"ngModelChange"===n&&(o=!1!==(r.StoresBrandArraydata.Storeid=t)&&o),o}),null,null)),e["\u0275did"](27,16384,null,0,i.SelectControlValueAccessor,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,i.NG_VALUE_ACCESSOR,(function(l){return[l]}),[i.SelectControlValueAccessor]),e["\u0275did"](29,671744,null,0,i.FormControlName,[[3,i.ControlContainer],[8,null],[8,null],[6,i.NG_VALUE_ACCESSOR],[2,i["\u0275angular_packages_forms_forms_p"]]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,i.NgControl,null,[i.FormControlName]),e["\u0275did"](31,16384,null,0,i.NgControlStatus,[[4,i.NgControl]],null,null),(l()(),e["\u0275eld"](32,0,null,null,3,"option",[["selected",""],["value",""]],[[8,"disabled",0]],null,null,null,null)),e["\u0275did"](33,147456,null,0,i.NgSelectOption,[e.ElementRef,e.Renderer2,[2,i.SelectControlValueAccessor]],{value:[0,"value"]},null),e["\u0275did"](34,147456,null,0,i["\u0275angular_packages_forms_forms_x"],[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](-1,null,["Select Store"])),(l()(),e["\u0275and"](16777216,null,null,1,null,S)),e["\u0275did"](37,278528,null,0,u.n,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275eld"](38,0,null,null,5,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](39,0,null,null,1,"label",[["class","Mod_Headings"],["for","brandids"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Brands:"])),(l()(),e["\u0275eld"](41,0,null,null,2,"div",[["class","row"],["id","stores"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,x)),e["\u0275did"](43,278528,null,0,u.n,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275eld"](44,0,null,null,7,"div",[["class","col-lg-12 pt-lg-5 pl-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](45,0,null,null,6,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](46,0,null,null,2,"div",[["class","col-lg-2"]],null,null,null,null,null)),(l()(),e["\u0275eld"](47,0,null,null,1,"button",[["class","savebutton"],["id","savebutton"],["type","button"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.SaveStoresBrands()&&e),e}),null,null)),(l()(),e["\u0275ted"](-1,null,["Save"])),(l()(),e["\u0275eld"](49,0,null,null,2,"div",[["class","col-lg-2"]],null,null,null,null,null)),(l()(),e["\u0275eld"](50,0,null,null,1,"button",[["class","cancelbutton"],["type","button"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.BackToBrandsGrid()&&e),e}),null,null)),(l()(),e["\u0275ted"](-1,null,["Cancel"]))],(function(l,n){var t=n.component;l(n,18,0,t.FormStoresBrands),l(n,29,0,"Storeid",t.StoresBrandArraydata.Storeid),l(n,33,0,""),l(n,34,0,""),l(n,37,0,t.Dealer_DD),l(n,43,0,t.GetBrands)}),(function(l,n){l(n,16,0,e["\u0275nov"](n,20).ngClassUntouched,e["\u0275nov"](n,20).ngClassTouched,e["\u0275nov"](n,20).ngClassPristine,e["\u0275nov"](n,20).ngClassDirty,e["\u0275nov"](n,20).ngClassValid,e["\u0275nov"](n,20).ngClassInvalid,e["\u0275nov"](n,20).ngClassPending),l(n,26,0,e["\u0275nov"](n,31).ngClassUntouched,e["\u0275nov"](n,31).ngClassTouched,e["\u0275nov"](n,31).ngClassPristine,e["\u0275nov"](n,31).ngClassDirty,e["\u0275nov"](n,31).ngClassValid,e["\u0275nov"](n,31).ngClassInvalid,e["\u0275nov"](n,31).ngClassPending),l(n,32,0,!0)}))}function O(l){return e["\u0275vid"](0,[e["\u0275pid"](0,u.A,[]),(l()(),e["\u0275eld"](1,0,null,null,1,"app-header",[],null,null,null,a.b,a.a)),e["\u0275did"](2,114688,null,0,d.a,[s.Ng4LoadingSpinnerService,c.a,g.k,g.a,p.a],null,null),(l()(),e["\u0275eld"](3,0,null,null,7,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,6,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,1,"ng4-loading-spinner",[],null,null,null,h.b,h.a)),e["\u0275did"](6,180224,null,0,s.Ng4LoadingSpinnerComponent,[s.Ng4LoadingSpinnerService],null,null),(l()(),e["\u0275and"](16777216,null,null,1,null,_)),e["\u0275did"](8,16384,null,0,u.o,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,M)),e["\u0275did"](10,16384,null,0,u.o,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var t=n.component;l(n,2,0),l(n,8,0,t.StoresBrandsGrid),l(n,10,0,t.EditStoreBrands)}),null)}function P(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-store-brands",[],null,null,null,O,m)),e["\u0275did"](1,114688,null,0,f,[s.Ng4LoadingSpinnerService,c.a,g.k,i.FormBuilder],null,null)],(function(l,n){l(n,1,0)}),null)}var w=e["\u0275ccf"]("app-store-brands",f,P,{},{},[]);class y{}var I=e["\u0275cmf"](o,[],(function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[r.a,w]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,u.q,u.p,[e.LOCALE_ID]),e["\u0275mpd"](1073742336,u.c,u.c,[]),e["\u0275mpd"](1073742336,g.l,g.l,[[2,g.q],[2,g.k]]),e["\u0275mpd"](1073742336,y,y,[]),e["\u0275mpd"](1073742336,o,o,[]),e["\u0275mpd"](1024,g.i,(function(){return[[{path:"",component:f}]]}),[])])}))},"Y/BS":function(l,n,t){"use strict";t.d(n,"a",(function(){return o})),t.d(n,"b",(function(){return r}));var e=t("8Y7J"),o=(t("sgpt"),e["\u0275crt"]({encapsulation:2,styles:['.spinner { position: fixed; padding: 0px; top: 0; left: 0; height: 100%; width: 100%; z-index: 9998; background: #000; opacity: 0.6; transition: opacity 0.3s linear; } .center { margin: auto; width: 100%; } .loading-text { position: fixed; top: 0; width: 100%; height: 100%; left: 0; padding: 0; margin: 0; color: #FFF; font-family: sans-serif; background: transparent; text-align: center; padding-top: 33%; } .spinner img { position: fixed; padding: 0px;  z-index: 10; background: #000; opacity: 0.6; transition: opacity 0.3s linear; } .hidden { visibility: hidden; opacity: 0; transition: visibility 0s 0.3s, opacity 0.3s linear; } .visible { visibility: visible; } .lds-roller { display: inline-block; position: relative; width: 64px; height: 64px; left: 48%; top: 47%; } .lds-roller div { animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite; transform-origin: 32px 32px; } .lds-roller div:after { content: " "; display: block; position: absolute; width: 6px; height: 6px; border-radius: 50%; background: #fff; margin: -3px 0 0 -3px; } .lds-roller div:nth-child(1) { animation-delay: -0.036s; } .lds-roller div:nth-child(1):after { top: 50px; left: 50px; } .lds-roller div:nth-child(2) { animation-delay: -0.072s; } .lds-roller div:nth-child(2):after { top: 54px; left: 45px; } .lds-roller div:nth-child(3) { animation-delay: -0.108s; } .lds-roller div:nth-child(3):after { top: 57px; left: 39px; } .lds-roller div:nth-child(4) { animation-delay: -0.144s; } .lds-roller div:nth-child(4):after { top: 58px; left: 32px; } .lds-roller div:nth-child(5) { animation-delay: -0.18s; } .lds-roller div:nth-child(5):after { top: 57px; left: 25px; } .lds-roller div:nth-child(6) { animation-delay: -0.216s; } .lds-roller div:nth-child(6):after { top: 54px; left: 19px; } .lds-roller div:nth-child(7) { animation-delay: -0.252s; } .lds-roller div:nth-child(7):after { top: 50px; left: 14px; } .lds-roller div:nth-child(8) { animation-delay: -0.288s; } .lds-roller div:nth-child(8):after { top: 45px; left: 10px; } @keyframes lds-roller { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } #loading-spinner-text { font-size: 26px; } .loading-spinner-text { font-size: 26px; }'],data:{}}));function r(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,[["spinnerContainer",1]],null,0,"div",[],[[8,"className",0],[8,"innerHTML",1]],null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"div",[["class","loading-spinner-text"],["id","loading-spinner-text"]],[[4,"zIndex",null],[8,"className",0]],null,null,null,null)),(l()(),e["\u0275ted"](2,null,[" "," "]))],null,(function(l,n){var t=n.component;l(n,0,0,t.showSpinner?"visible spinner center":"hidden spinner center",t.template),l(n,1,0,t.zIndex,t.showSpinner?"visible loading-text":"hidden loading-text"),l(n,2,0,t.loadingText)}))}},bykz:function(l,n,t){"use strict";t.d(n,"a",(function(){return r})),t.d(n,"b",(function(){return u}));var e=t("8Y7J"),o=t("G0yt"),r=(t("FC8X"),t("sgpt"),t("7xZw"),t("iInd"),t("LyNC"),e["\u0275crt"]({encapsulation:0,styles:[[".bg-white[_ngcontent-%COMP%]{background:#fff!important}.h_days[_ngcontent-%COMP%]{font-size:1.5rem;font-family:Gotham Book Regular}.h_days[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%]{color:#fff;background:#000;margin:0 0 0 10px;padding:5px 8px;border-radius:3px;font-family:HelveticaNeue-Bold}.prof[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;margin-right:10px;display:flex;align-items:center;font-family:HelveticaNeue-Medium}.prof[_ngcontent-%COMP%]   .prof_pic[_ngcontent-%COMP%]{width:50px;height:50px;border-radius:50px;border:1px solid #ccc;margin-right:5px}.prof[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .grt[_ngcontent-%COMP%]{font-size:.7rem}.prof[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:.7rem;text-transform:capitalize!important}.prof[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#ccc}.navbar-brand[_ngcontent-%COMP%]{padding-top:.75rem;padding-bottom:.75rem;font-size:1rem}.navbar[_ngcontent-%COMP%]   .navbar-toggler[_ngcontent-%COMP%]{top:.8rem;right:1rem}.navbar[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{padding:.75rem 1rem;border-width:0;border-radius:0}.navbar[_ngcontent-%COMP%]   .navbar-toggler-icon[_ngcontent-%COMP%]{background-image:url(menu.ad1baf9e51195a861691.png)}.navbar-toggler[_ngcontent-%COMP%]{border:1px solid #333!important}"]],data:{}}));function u(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,17,"header",[["class","navbar sticky-top bg-white flex-md-nowrap p-0"]],null,null,null,null,null)),e["\u0275did"](1,16384,null,0,o.H,[],null,null),(l()(),e["\u0275eld"](2,0,null,null,1,"a",[["class","navbar-brand col-md-3 col-lg-2 me-0 px-3"],["href","#"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,0,"img",[["src","assets/images/Swickard-Logo.png"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,1,"button",[["aria-controls","sidebarMenu"],["aria-expanded","false"],["aria-label","Toggle navigation"],["class","navbar-toggler position-absolute d-md-none collapsed"],["data-bs-target","#sidebarMenu"],["data-bs-toggle","collapse"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,0,"span",[["class","navbar-toggler-icon"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,2,"div",[["class","mx-auto"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,1,"div",[["class","h_days d-flex justify-content-center align-items-center"],["style","text-transform: uppercase;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](8,null,["",""])),(l()(),e["\u0275eld"](9,0,null,null,8,"div",[["class"," d-flex align-items-center mx-auto mx-lg-0 pe-lg-5 py-2 py-lg-0"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,7,"div",[["class","prof"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,6,"div",[["class","text"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,1,"div",[["class","grt"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Welcome,"])),(l()(),e["\u0275eld"](14,0,null,null,3,"div",[["class","name"]],null,null,null,null,null)),(l()(),e["\u0275ted"](15,null,["",", "])),(l()(),e["\u0275eld"](16,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),e["\u0275ted"](17,null,["",""]))],null,(function(l,n){var t=n.component;l(n,8,0,t.Header),l(n,15,0,t.globalVarComponent.g_FullNameDisplay),l(n,17,0,t.globalVarComponent.g_UserTitle)}))}}}]);