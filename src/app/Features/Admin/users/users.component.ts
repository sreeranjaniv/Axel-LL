import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  UsersGrid:boolean = true;
  EditUser:boolean = true;
  UserStatus: boolean = true
  UserData : any=[];
  Roles : any[];
  UserId: any = '0';
  Stores : any[];
  storeids : any = [];
  selectedItemsList = [];
  checkedIDs = [];
  CheckedEditStore : any = [];
  DropDownSelectValue: any = "";
  SelectedStoreIds: any = "";
  UserArraydata = {
    ADUserName : '',
    UserName : '',
    UserTittle:'',
    RoleId:'',
    Malid:'',
    Status:'Y',
    Action:'A',
    PdfStatus:''
  }

  allStores : any;
  PdfStatus : any;
  lbl_Action : any = "";
  UsersForm : FormGroup;
  searchterm : any;
  constructor(private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router, private Userdata: FormBuilder) {
    this.UsersForm = this.Userdata.group({
      Ad_UserName: ['', [Validators.required, Validators.maxLength(50)]],
      UserName: ['', [Validators.required, Validators.maxLength(50)]],
      Malid: ['', [Validators.required, Validators.maxLength(50)]],
      Id: [''],
      Status: [''],
      StoreIds:[''],
      MailStatus:[''],
      avatar: [null]
    });

   }

  ngOnInit() {
    this.GetUserData();
    // this.GetRoles();
    this.EditUser = false;
    this.UsersGrid = true;
    this.GetRolesDD();
    this.StoresData();
  }

  AddUser(){
    this.lbl_Action = "Add";
    this.EditUser = true;
    this.UsersGrid = false;
    this.UserStatus =false;
    this.UserId = 0;
    this.UserArraydata.RoleId = '0'
    this.UserArraydata.ADUserName  = '';
    this.UserArraydata.Malid = '';
    this.UserArraydata.UserName = '';
    this.UserArraydata.Status = 'Y';
    this.UserArraydata.PdfStatus = 'N';
    this.allStores = 'Y';
    this.SelectedStoreIds = '0';
    this.ResetAllStoreIds();  
  }

  GetUserData(){
    const obj = {
      "Id":0,
      "UserName":""
      }
        this.spinnerService.show();
        this.authService.AXELPostmethod('Login/GetADUsers', obj).subscribe(x =>{
          if (x.status == 200){
            this.EditUser = false;
            this.UserData = x.response.recordset;
            // console.log("Users_Data", x.response.recordset);
          }
          this.spinnerService.hide();
        });
      }

      editUser(User_id){
        this.lbl_Action = "Edit";
        this.UserStatus =true;
        this.EditUser = true;
        this.UsersGrid = false;
        this.UserId = User_id;
        this.allStores = '';
        const obj = {
          "Id":User_id,
          "UserName":""
          }
            this.spinnerService.show();
            this.authService.AXELPostmethod('Login/GetADUsers', obj).subscribe(x =>{
              if (x.status == 200){
                let tempray = (x.response.recordset);
                console.log("USer", tempray);
                
                let UserData = tempray.filter(tempray => tempray.id === User_id )
                this.UserId = UserData[0].id;
                this.UserArraydata.ADUserName = UserData[0].User_Name ;
                this.SelectedStoreIds = UserData[0].STORE_IDs
                this.UserArraydata.UserName = UserData[0].User_Displayname;
                this.UserArraydata.UserTittle = UserData[0].User_Title;
                this.UserArraydata.Malid = UserData[0].AU_EMAIL_ID;
                this.UserArraydata.RoleId = UserData[0].User_RoleId;
                this.UserArraydata.Status = UserData[0].User_Active;
                this.UserArraydata.PdfStatus = UserData[0].AU_IS_ACE;
                this.UserArraydata.Action = 'U';
                this.PdfStatus = UserData[0].AU_IS_ACE;
               
                this.storeids =[];
                
                if(this.SelectedStoreIds != '0' && this.SelectedStoreIds != null)
                  this.storeids =  this.SelectedStoreIds.split(",");
                else if(this.SelectedStoreIds == '0'  ){
                  this.allStores = 'Y';
                 console.log('sele',this.SelectedStoreIds)
                 for(let i = 0;i<this.Stores.length;i++){                  
                     this.storeids.push(this.Stores[i].AS_ID.toString());
                 } 
                }

                if( this.storeids.length == this.Stores.length)
                {
                  this.allStores = 'Y';
                }
            }
              this.spinnerService.hide();
            });
          }
      
      BackToUserGrid(){
        this.EditUser = false;
        this.UsersGrid = true;
      }
      selected(event: Event){
          this.DropDownSelectValue = event.target['options']
             [event.target['options'].selectedIndex].text;
            //  alert(this.DropDownSelectValue);
        
      }
      UpdateUser(){
        //  if(this.allStores !='Y'){
         if( this.allStores != 'Y') 
         {
          this.SelectedStoreIds = "";
          this.storeids.forEach(element => {
                this.SelectedStoreIds += ','+ element;
              });
              this.SelectedStoreIds =  this.SelectedStoreIds.replace(',', '');
         }
        const obj = {
          "Id":this.UserId,
          "UserName":this.UserArraydata.ADUserName ,
          "UserDPName": this.UserArraydata.UserName,
          "UserTitle":this.DropDownSelectValue ,
          "RoleID":this.UserArraydata.RoleId ,
          "Email_Id": this.UserArraydata.Malid,
          "Status":this.UserArraydata.Status,
          "AU_AS_CORA_ACCT_IDs":this.allStores =='Y'? 0: this.SelectedStoreIds,
          "IS_ACE_Exists":this.PdfStatus
          }
          console.log('obj12',obj);
          if(this.UserArraydata.UserName == ""){
            alert("Please Enter User Name");
          }
          else if(this.SelectedStoreIds == ""){
            alert("Please Select Atleast One Store");
          }
          else{
          console.log('objY',obj)
          // this.authService.AXELPostmethod('Login/UpdateADUsers', obj).subscribe(x =>{
          this.authService.AXELPostmethod('Login/UpdateADUsers', obj).subscribe(x =>{
            if (x.status == 200) {
              if (this.UserArraydata.Action === 'U' && this.UserId > 0 && this.UserId != "") {
                alert('Updated Successfully');
              } else if (this.UserArraydata.Action === 'A')
                alert('Added Successfully');
                this.GetUserData();
                this.EditUser = false;
                this.UsersGrid = true;
                if(localStorage.getItem('User_ID') == this.UserId)
              {
                localStorage.setItem('LocalUserName', this.UserArraydata.UserName);
                localStorage.setItem('RoleID', this.UserArraydata.RoleId);
                localStorage.setItem('User_Title', this.DropDownSelectValue );
              }
                
            }
            else if(x.status == 401)
            {
               alert(x.error);               
            }
          });
        }
      }
     
      GetRolesDD(){
        const obj={
        };
        this.authService.AXELPostmethod('Login/GetRolesDD', obj).subscribe( x => {
          this.Roles =  x.response.recordset;
          // console.log("Roles", this.Roles);
      });
    }

    StoresData(){
      const obj = { };
      this.authService.AXELPostmethod('Group/GetStoreCheckboxes',obj).subscribe(x =>{
        if(x !== ''){
          this.Stores=x.response.recordset;
          console.log("Errors", this.Stores);
        }
        });
    }
    HandleStoreIds(event, value){
      
      if(!event.target.checked)
      {
        if(this.allStores == 'Y')
        {          
          this.allStores = '';            
        }

    
        if(this.storeids.includes(value.toString()))
        {

          this.storeids= this.storeids.filter(item => item !== value.toString());
          console.log("this.storeids 1:",this.storeids);          
          
        }
      }
      else if(event.target.checked)
      {
        this.storeids.push(value.toString());
      }
    
    }

  
    IsStoreChecked(AS_Id){
      this.CheckedEditStore = [];
      //To check all stores checkbox when selecting all checkboxes one by one and atlast when checked length is same as stores array length
      if(this.storeids.length == this.Stores.length)
      {
         this.allStores='Y';
        
      }
      // else if(this.storeids.length == 0)
      // {
      //   this.allStores='';
      // }
        if(this.storeids != null && this.storeids.length != 0){
        this.CheckedEditStore = this.storeids.filter((value, index) => {
          if(String(AS_Id) == value){
            return 1;
          }  
           });
           if(this.CheckedEditStore.length > 0)
           return 1;
           else 
           return 0;
          }
        else
        return 0;
}


 CheckAllStores(event)
 {
 
  if(event.target.checked){
  this.allStores = 'Y';
  this.SelectedStoreIds = "0";
  this.ResetAllStoreIds();
  }
  else{
    this.allStores = '';
    this.SelectedStoreIds = "";
    this.storeids=[];
  }
 }

  CheckPdfStatus(event){
    let target = event.target
    if(target.checked)
    this.PdfStatus = 'Y';
    else
    this.PdfStatus='N';

  }
  
  ResetAllStoreIds()
{
  this.storeids = [];
  this.Stores.forEach(element => {
  let AS_ID = element.AS_ID;      
    this.storeids.push(AS_ID.toString()) ;
});
}

}
