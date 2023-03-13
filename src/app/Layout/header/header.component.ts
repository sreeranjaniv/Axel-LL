import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery'
import { ApiService } from '../../Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from '../../Partials/global-variables/global-variables.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public href: string = "";
  public user_name:any ="";
  public Header:any ="";
  public currentDate =new Date();
  public UserDetails :any="";
  public Fullname  :any="";
  // public FullNameDisplay  :any="";
  // public FullnameDisplay  :any="";
  public SideMenuData : any="";
  Username :any="";
  public RoleID :any = "";
  GetRoleNames: any = [];
  getroleNames: any = [];
  roleSName: any;
  // public UserTitle : any="";
  MainmoduleArray:[];
  ParentModules : any =[];
  SModuleArray : any = [];
  public SelectedMenu : any = "";
  public DeniedText : any="" ;

  constructor( private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService,private router: Router, private _Activatedroute: ActivatedRoute,  public globalVarComponent:GlobalVariablesComponent) {
    // alert("Header/...Cons");
   }
  ngOnInit() {
    // alert("Header/...OnInit");
    this.href = this.router.url;
    // alert(this.router.url);
    if(this.href == '/NightlyReportSales'){
      this.Header = 'NIGHTLY SUMMARY';      
    }
    else if(this.href == '/ServiceContractForm'){
      this.Header = 'Service Contract Cancellation Requests';   
    }
    else if(this.href == '/RBReport'){
      this.Header = 'FINANCIAL OVERVIEW';   
    }
    else if(this.href == '/IncidentReport'){
      this.Header = 'INCIDENT REPORT FORM';   
    }
    else if(this.href == '/VehiclePurchase'){
      this.Header = 'VEHICLE PURCHASE';   
    }
    
    
    if(  this.globalVarComponent.isSideMenu_Disabled == "N")
    this.globalVarComponent.SideMenu = true;
    else if(  this.globalVarComponent.isSideMenu_Disabled == "Y")
    {    this.globalVarComponent.isSideMenu_Disabled = "N";}
    this.authService.getFullSideMenu().subscribe(fullsidemenu => {
    console.log("full_sidemenu", fullsidemenu);    
    });
 // localStorage.setItem('RoleID', '1');
 //localStorage.setItem('User_ID', '1');
  //localStorage.setItem('LocalUserName', 'prasad.chavali');
  //  alert("Header"); 
    if(localStorage.getItem('RoleID') === null ){
      location.replace('http://axel.swickard.com/landing.aspx');
    } 
    
    var pagename = window.location.hash.replace('#/','');
    if(pagename !='401Error' &&  pagename !='404Error' && this.globalVarComponent.ReportId == 0 )
    {
      // this.globalVarComponent.SideMenu = true;
      let UserID = localStorage.getItem('User_ID');
    setTimeout(() => {
       this.authService.getSideMenu().subscribe(sidemenu => {
        this.authService.getFullSideMenu().subscribe(full_sidemenu => {
          // if((sidemenu.some(x => x.SMOD_FILENAME ==pagename) == false) &&  this._Activatedroute.snapshot.paramMap.get('Id') == UserID) {
          //   this.globalVarComponent.SideMenu = false;
          //   if(this._Activatedroute.snapshot.paramMap.get('ReportId') != null)
          //   this.globalVarComponent.ReportId = this._Activatedroute.snapshot.paramMap.get('ReportId');
          //   // // alert("hi");
          //   //  this.router.navigate(['NightlyReport/'+UserID+'/'+this.globalVarComponent.ReportId]);
          // }
          // else if((full_sidemenu.some(x => x.SMOD_FILENAME ==pagename) == false) ) {
          //   this.router.navigate(['404Error']);
          //   this.globalVarComponent.SideMenu = true;
          // }
          
          // else if((sidemenu.some(x => x.SMOD_FILENAME == pagename)== false) && (full_sidemenu.some(x => x.SMOD_FILENAME == pagename) == true)){
          //   this.router.navigate(['401Error']);
          //   this.globalVarComponent.SideMenu = true;
          // }
          if((full_sidemenu.some(x => x.SMOD_FILENAME ==pagename) == false) ) {
              this.router.navigate(['404Error']);
            }                    
            else if((sidemenu.some(x => x.SMOD_FILENAME == pagename)== false) && (full_sidemenu.some(x => x.SMOD_FILENAME == pagename) == true) && localStorage.getItem("IsIncidentReportDataPage") != 'Y' ){
              this.router.navigate(['401Error']);
            }
            if(localStorage.getItem("IsIncidentReportDataPage") == 'Y')
            {
            localStorage.setItem("IsIncidentReportDataPage", "N") ;
            }
        });

    });
    }, 2000);
    
    this.globalVarComponent.g_SelectedMenuItem=pagename;
  }

    if(localStorage.getItem('LocalUserName') != "" || localStorage.getItem('LocalUserName') != null){
      setTimeout(() => {
        this.username();
        console.log("g_ReportUserId", this.globalVarComponent.g_ReportUserId );
        if(this.globalVarComponent.g_ReportUserId != 0 && this.globalVarComponent.g_ReportUserId !=null && this.globalVarComponent.g_ReportUserId != undefined){          
          var g_Reporturl = localStorage.getItem("ReportUrl");
          console.log("after g_Reporturl: ", g_Reporturl);
          localStorage.setItem("ReportUrl", '');
          this.router.navigate([g_Reporturl]);
        }
        // if(localStorage.getItem("ReportUrl") != "" && localStorage.getItem("ReportUrl") != null ){
          
        //   var g_Reporturl = localStorage.getItem("ReportUrl");
        //   localStorage.setItem("ReportUrl", '');
        //   this.router.navigate([g_Reporturl]);
        // }
      }, 2000);
    }
   
  }


  username(){
    if(this.globalVarComponent.g_FullNameDisplay == ""){
      // this.FullNameDisplay = localStorage.getItem('LocalUserName');
      // this.UserTitle = localStorage.getItem('User_Title');
      this.globalVarComponent.g_FullNameDisplay  = localStorage.getItem('LocalUserName');
      this.globalVarComponent.g_UserTitle  = localStorage.getItem('User_Title');
    }
    
   }
  

 
}
