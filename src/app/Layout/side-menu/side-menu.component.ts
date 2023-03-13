import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVariablesComponent } from '../../Partials/global-variables/global-variables.component';
import { ApiService } from '../../Core/_providers/Api-service/api.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent implements OnInit{
  public RoleID :any = "";
  public Default_Rolebased_pagename : any = "";
  ParentModules : any =[];
  ParentModulesImg : any =[];
  SModuleArray : any = [];
   
 
  public SideMenuData : any="";
  constructor( private authService: ApiService,private router: Router, private _Activatedroute: ActivatedRoute,  public globalVarComponent:GlobalVariablesComponent) {

  
 
   }
  
  ngOnInit() {
    this.authService.getRoleID().subscribe(Codes => this.SideMenu(Codes));
    if(localStorage.getItem("SelectedMenu") != null && localStorage.getItem("SelectedMenu") != "" && localStorage.getItem("SelectedMenu") != undefined)
    this.globalVarComponent.g_SelectedMenuItem = localStorage.getItem("SelectedMenu");
      
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
  SideMenu(Codes){
    if( Codes == '0') {
      Codes = localStorage.getItem('RoleID');
    } 
    // if(Codes) 
    // // console.log(this.RoleID,'hjj');
    
    // localStorage.setItem('RoleID', '1');
    // this.RoleID = localStorage.getItem('RoleID');
    const obj = {
      "ROLE_ID":Codes
      
  }
  this.authService.AXELPostmethod('Login/GetRoleBasedPrivileges', obj).subscribe(x =>{
    if (x.status == 200) {
      this.SideMenuData = x.response.recordset;
      this.globalVarComponent.g_SideMenuItemCount = this.SideMenuData.length;    
      this.authService.setSideMenu(this.SideMenuData);
      this.ParentModules = this.SideMenuData.map(item => item.M_NAME)
      .filter((value, index, self) => self.indexOf(value) === index);
      this.ParentModulesImg = this.SideMenuData.map(item => item.M_NAME+'|'+item.M_IMAGE)
      .filter((value, index, self) => self.indexOf(value) === index);
      console.log('SideMenuImages', this.ParentModulesImg);
     // this.Default_Rolebased_pagename = ;
     localStorage.setItem('PageName', this.SideMenuData[0].SMOD_FILENAME);
        this.authService.setPagename(this.SideMenuData[0].SMOD_FILENAME);
        console.log("page",  localStorage.getItem('PageName'));
      
    }
  });

  }
 
  SubModuleArry(ParentMod)  {
    this.SModuleArray = this.SideMenuData.filter(item => item.M_NAME == ParentMod);
    // alert(this.SModuleArray.length);
    return this.SModuleArray.length;
  }
   SideTabClick(event) {
    // localStorage.setItem("SelectedMenu", event);
     this.globalVarComponent.g_SelectedMenuItem = event; 
     if(this.validURL(event)){
      window.open(event, '_blank');
     }
    else
    this.router.navigate([event]);
  }
  navigate(){
    this.router.navigate(['cancellationsubmission']);
  }

}
