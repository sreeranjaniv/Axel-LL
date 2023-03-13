import { ApiService } from '../../../Core/_providers/Api-service/api.service';


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  module: any;

  cmsModules: any;
  uid: any = [];
  roleId = '0';
  TypeId='0';
  modeType = "";
  cmsModulesMap: any = [];
  cmsTittleMap:any=[];
  ShowButtons=false;
  showdata=true;
 // isLoading = false;
 pid: any = [];
  constructor(private auth: ApiService,private router: Router,
  ) { }

  ngOnInit(): void {
  this.getRoles()
  }


  // public onOptionsSelectedType(event){
  //   console.log(event);
  //  // this.TypeId=event.target.value;
  //  this.getRoles();
  // }


  public onOptionsSelected(event) {

  
  
    this.roleId = event.target.value;
      const modulesCms = {
        "ROLEID": this.roleId,
        "EXPRESSION": ""
      }
      this.auth.AXELPostmethod('Login/GetCMSModules',modulesCms).subscribe((resCmsModule:any)=>{
        this.ShowButtons=true;
        this.showdata=false;
        this.cmsModules=[];
       // this.cmsModulesMap = [];      
          this.cmsModules = resCmsModule.response.recordset;
          // console.log(this.cmsModules)
          this.uid=[];this.pid=[];
          this.cmsModules.forEach(el => {
            if(el.STATUS =="Y" && el.MOD_ID!="0"){
              this.pid.push(el.MOD_ID.toString());
            }
            if (el.STATUS == "Y" && el.MOD_ID=="0") {
              this.uid.push(el.SMOD_ID.toString());
            }          
          })
      })
  }

   
  
  checkChild(id, main, evt) {
    let arry1: any = [];
    let target = evt.target;
    if (target.checked) {

      for (let i = 0; i < this.cmsModules.length; i++) {
        if (id.SMOD_MOD_ID == this.cmsModules[i].MOD_ID) {
           //console.log(this.cmsModules[i]);
          id.STATUS = "Y";
          this.cmsModules[i].STATUS = "Y";

          break;

        }
      }
    } else {

      for (let i = 0; i < this.cmsModules.length; i++) {
        if (main.MOD_ID == this.cmsModules[i].SMOD_MOD_ID) {
         // console.log(this.cmsModules[i]);
          arry1.push(this.cmsModules[i]);
          id.STATUS = "N";
        }
      }
      const allEqual = arr => arr.every(val => val.STATUS === "N");
      const result = allEqual(arry1) // output: false
      result == true ? main.STATUS = "N" : main.STATUS = "Y"
       if(main.STATUS=="N"){
        this.pid.forEach((e, index) => {
          if(e == main.MOD_ID){
            this.pid.splice(index, 1)
          }
        })
       }
    }
    if (target.checked) {
      this.uid=[];
      this.cmsModules.forEach(el => {
        if (el.STATUS == "Y") {
          this.uid.push(el.SMOD_ID.toString());
        }
      })
      this.pid.push(main.MOD_ID.toString());
    } else {
      this.cmsModules.forEach(el => {
        if (el.STATUS == "N") {

          this.uid.forEach((e, index) => {
            if (e == el.SMOD_ID) {
              this.uid.splice(index, 1);
            }
          })
        }
      })
      // this.uid.forEach((e, index) => {
      //   if (e == id.smod_id) {
      //     this.uid.splice(index, 1)
      //   }
      // })


    }

  }
  
  checkParent(id, evt) {
    let target = evt.target;
    if (target.checked) {

      for (let i = 0; i < this.cmsModules.length; i++) {
        if (id.MOD_ID == this.cmsModules[i].SMOD_MOD_ID) {
          this.cmsModules[i].STATUS = "Y";
        }
      }
      this.uid=[];
      this.cmsModules.forEach(el => {
        if (el.STATUS == "Y") {
          this.uid.push(el.SMOD_ID.toString());
        }
      })
      this.pid.push(id.MOD_ID.toString());
    } else {
      for (let i = 0; i < this.cmsModules.length; i++) {
        if (id.MOD_ID == this.cmsModules[i].SMOD_MOD_ID) {
          // console.log(this.cmsModules[i]);
          this.cmsModules[i].STATUS = "N";
        }
      }
      this.cmsModules.forEach((el) => {
        if (el.STATUS == "N") {
          this.uid.forEach((e, index) => {
            if (e == el.SMOD_ID) {
              this.uid.splice(index, 1);
            }
          })

        }
      })
      this.uid.forEach((e, index) => {
        if (e == id.SMOD_ID) {
          this.uid.splice(index, 1)
        }
      })

      this.pid.forEach((e, index) => {
        if(e == id.MOD_ID){
          this.pid.splice(index, 1)
        }
      })
    }
  }

  Roles: any = [];
  getRoles() {

   
     const obj={
       "ID":0,
       "NAME":"",
       "STATUS":"",
       "StartCnt":0
     }
    this.auth.AXELPostmethod('Login/GetRolesData',obj).subscribe((roleEditData: any) => {
      if (roleEditData.status == 200) {
        this.Roles = roleEditData.response.recordset; 
        console.log(this.Roles)    
      }
    }, err => {

    })
  }


saveModulePermissons() {
  // console.log(this.uid)
  // console.log(this.pid)
if(this.uid.length>0 || this.pid.length>0 ){
//console.log(this.roleId,this.uid.join(","),this.TypeId);
const obj={
//  "Action":'U',
  "ROLE_ID":this.roleId,
  "SMOD_ID":this.uid.join(","),
  "TYPE":'',
  "MOD_ID":this.pid.join(",")
}
// console.log(obj)
this.auth.AXELPostmethod('Login/UpdatePermissionsBasedOnRoles',obj).subscribe((data: any) => {
  if (data.status == 200) {
        
alert('Updated Successfully')    
this.showdata=true;
this.ShowButtons=false;
this.roleId='0'
this.uid=[];
this.pid=[];
          }
        }, err => {
        alert("Modules don't not added!!");
        })

}else{
  alert("Please select modules");
}

};

cancelBack() {
  this.ShowButtons=false;
  this.router.navigate(['/ServiceAppointments']);
}


}
  



