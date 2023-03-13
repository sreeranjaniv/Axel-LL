import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariablesComponent } from './Partials/global-variables/global-variables.component';
import { ApiService } from './Core/_providers/Api-service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // SideMenu : boolean;
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
  event.preventDefault();
}
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event) {
  event.preventDefault();
}
  constructor(private authService: ApiService, private router: Router, public globalVarComponent:GlobalVariablesComponent) {
    // Remove query params
 
    }
  title = 'Axel';
  
  FullSidemenuList : any = [];
  ngOnInit() {
    
    let RoleID = localStorage.getItem('RoleID');
    this.authService.setRoleID(RoleID);
    // if(localStorage.getItem('RoleID') == null)
    // {localStorage.setItem('RoleID', '0');
    // RoleID = '0';}
    // console.log("App RoleID ",RoleID);
    this.GetFullSideMenuList();
    
    // setTimeout(() => {
      if( RoleID != '0'  ) {
        this.globalVarComponent.SideMenu = true;
       
    } else 
        this.globalVarComponent.SideMenu = false;
        
    // }, 1000);
    
  }
  GetFullSideMenuList(){
    const obj = {}
          this.authService.AXELPostmethod('Login/GetAllSubModules', obj).subscribe(x =>{
            if (x.status == 200){
            this.FullSidemenuList = x.response.recordset;
            console.log("FullSidemenuList", this.FullSidemenuList);
            this.authService.setFullSideMenu(this.FullSidemenuList);
          }
          });
  }
}
