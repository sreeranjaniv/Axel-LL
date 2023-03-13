import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';

@Component({
  selector: 'app-denied-access',
  templateUrl: './denied-access.component.html',
  styleUrls: ['./denied-access.component.scss']
})
export class DeniedAccessComponent implements OnInit {
  public Fullname  :any="";
  public daysInMonth:any ="";
  public currentDate =new Date();
  public FullNameDisplay : any="";
  public RoleID : any="";
  public UserTitle : any="";
  public DeniedText : any="" ;
  public PageName : any="" ;
  FullSidemenuList : any =[];
  constructor(private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router, private Userdata: FormBuilder, private _Activatedroute: ActivatedRoute, public globalVarComponent:GlobalVariablesComponent) { }

  ngOnInit() {
    //alert("DeniedAccess");
   localStorage.clear();
    this.GetADUser(atob(this._Activatedroute.snapshot.paramMap.get('Name')));
    this.CurrentDate();
  }
  CurrentDate(){
    var dt = new Date();
    var month = dt.getMonth();
    var year = dt.getFullYear();
    const date = this.currentDate;
    const dd = new Date(date).getDate();
    this.daysInMonth = new Date(year, month, 0).getDate() - dd;
    }
    validURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+:=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
    }
    GetADUser(FullnameDisplay){
        const obj = {
          "AD_User_Name":FullnameDisplay
          }
            this.spinnerService.show();
            
            setTimeout(() => {
              this.authService.AXELPostmethod('Login/GetADUsersAction', obj).subscribe(x =>{
                if (x.status == 200 && x.response.recordset.length != 0){
                  localStorage.setItem('LocalUserName', x.response.recordset[0].User_Displayname);
                  localStorage.setItem('RoleID', x.response.recordset[0].User_RoleId);
                  localStorage.setItem('User_Title', x.response.recordset[0].User_Title);
                  localStorage.setItem('User_ID', x.response.recordset[0].User_ID);
                  // alert(localStorage.getItem("ReportUrl"));
                  console.log("ReportUrl", localStorage.getItem("ReportUrl"));
                  
                  if(localStorage.getItem("ReportUrl") != "" && localStorage.getItem("ReportUrl") != null )   
                    {
                      this.globalVarComponent.g_ReportUserId= x.response.recordset[0].User_ID;}
                
                  this.FullNameDisplay = localStorage.getItem('LocalUserName');
                  this.RoleID = localStorage.getItem('RoleID');
                  // alert("localStorage" + this.RoleID );
                  this.authService.setRoleID(this.RoleID);
                  // alert("authService" + this.RoleID );
                  this.UserTitle = localStorage.getItem('User_Title');
                  // console.log("UserData", this.FullNameDisplay, this.RoleID , this.UserTitle);
                 
                  if(this.RoleID != 0 ){
                    setTimeout(() => {
                      if(this.validURL(localStorage.getItem('PageName'))){
                        // localStorage.setItem("SelectedMenu", localStorage.getItem('PageName'));
                        this.globalVarComponent.g_SelectedMenuItem=localStorage.getItem('PageName');
                        window.open(localStorage.getItem('PageName'), '_blank');
                       } 
                       else 
                      this.router.navigate([localStorage.getItem('PageName')]);
                    }, 2000);
                  }
                  else
                  {
                     
                      this.DeniedText = "Don't have Permissions to Access the Pages Please Contact the Admin";
                  }
                  this.spinnerService.hide();
                
                }
                else
                  {
                      
                      this.DeniedText = "Don't have Permissions to Access the Pages Please Contact the Admin";
                  }
                  this.spinnerService.hide();
              });
            }, 2000);
            
          }

}
