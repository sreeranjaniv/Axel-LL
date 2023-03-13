import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
 
})
export class RolesComponent implements OnInit {
  public RolesData: any=[];
  RoleId: any = '0';
  RoleArraydata = {
    RoleName : '',
    RoleStatus:'Y',
    Action:'A'
  }
  constructor(private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router) {
    
   }

  ngOnInit() {
    this.GetRoles();
  }
  add(){
    this.RoleId = 0
    this.RoleArraydata.RoleName = '';
    this.RoleArraydata.RoleStatus = 'Y';
  }
  GetRoles(){
    
    const obj = {"ID":0, 
              "NAME":"",
              "STATUS":"",
              "StartCnt":0
              }
        this.spinnerService.show();
        this.authService.AXELPostmethod('Login/GetRolesData', obj).subscribe(x =>{
          if (x.status == 200){
            this.RolesData = x.response.recordset;
            // console.log("Roles_Data", x.response.recordset);
          }
          this.spinnerService.hide();
        });
      }

  editBrand(E_Role_id){

    const obj = {"ID":E_Role_id, 
              "NAME":"",
              "STATUS":"",
              "StartCnt":0
              }
        this.spinnerService.show();
        this.authService.AXELPostmethod('Login/GetRolesData', obj).subscribe(x =>{
          if (x.status == 200){
            let tempray = (x.response.recordset);
            let RoleData = tempray.filter(tempray => tempray.R_ID === E_Role_id )
            this.RoleId = RoleData[0].R_ID;
            this.RoleArraydata.RoleName = RoleData[0].R_NAME;
            this.RoleArraydata.RoleStatus = RoleData[0].R_STATUS;
            this.RoleArraydata.Action = 'U'
            
          }
          this.spinnerService.hide();
        });
      }

SaveRole(){
 
  const obj = {
    "Action":this.RoleArraydata.Action, 
    "R_ID":this.RoleId,
    "R_NAME":this.RoleArraydata.RoleName, 
    "R_TYPE":"A", 
    "R_STATUS":this.RoleArraydata.RoleStatus,
    "R_UID":"1"
    }
    if(this.RoleArraydata.RoleName == ""){
      alert(" Please Enter Role Name");
    }
    else 
    this.authService.AXELPostmethod('Login/RolesAction', obj).subscribe(x =>{
      if (x.status == 200) {
        if (this.RoleArraydata.Action === 'U' && this.RoleId > 0 && this.RoleId != "") {
          alert('Updated Successfully');
          this.GetRoles();
        }else if (this.RoleArraydata.Action === 'A')
        alert('Added Successfully');
        this.GetRoles();
        this.RoleArraydata.RoleName = '';
      }
    });
}


}
