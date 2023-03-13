import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';
import { Location} from '@angular/common';

@Component({
  selector: 'app-powered-by-axel-ivr',
  templateUrl: './powered-by-axel-ivr.component.html',
  styleUrls: ['./powered-by-axel-ivr.component.scss']
})
export class PoweredByAxelIVRComponent implements OnInit {

  searchKeyWord:any;
  IVRData:any;
  bootstrap: any;
  status:any="";
  SelectStatus:any="";
  config:any;
  notes:any;
  SelectCodes:any="";
  Storecodes:any;
  rId:any;
  
  

  constructor(public globalVarComponent: GlobalVariablesComponent,private authService: ApiService,
    private spinnerService: Ng4LoadingSpinnerService, private location: Location,private ngbActiveModal: NgbActiveModal,
     private ngbModal: NgbModal) {
    }

  ngOnInit() {
    this.rId = localStorage.getItem("RoleID");
    this.signin();
    this.GetUserData();
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";
    }
  
  
  signin(){
    this.spinnerService.show();
    this.authService.SigninIVR('auth/signin').subscribe((x:any)=>{
      localStorage.setItem('token',x.response)
      this.GetGridData(0);
      this.GetStoresData();
    })
  }

  SubTabledata:any;
  GetStoresData(){
 this.authService.StoresCode('stores').subscribe((x:any)=>{
  //  console.log(x.response);
   this.Storecodes = x.response;
 })
  }

  keys:any;
  GetGridData(i){
    this.spinnerService.show();
    const obj={
      "StartCnt":i
    }
    this.spinnerService.show();
    this.authService.GetIVR('ivr/get',obj).subscribe((x:any)=>{
      this.config ={
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: x.response.count
      }    
      this.IVRData = x.response;
      this.spinnerService.hide();
    })
  }

  log:any;
 

  handlePageChange(event){
    console.log(event)
    this.config.currentPage = event;
  }

  PreviousUrl(){
    this.location.back();
  }

   item:any;
   popUpType:any='';
   edit(item, mymodal){
    this.popUpType = 'E';
     console.log(item,'item')
    this.item = item;
    this.ngbModal.open(mymodal, { size: 'sm', backdrop: 'static' });
    this.status=item.IVR_STATUS;
    this.notes = item.NOTES;
   }
 
   displayNotes(item, mymodal)
   {
     if( item.NOTES != "" && item.NOTES != null)
     {
    this.popUpType = 'D';  
    this.ngbModal.open(mymodal, { size: 'sm', backdrop: 'static' });
    this.status=item.IVR_STATUS;
    this.notes = item.NOTES;
     }
   }

   SelectedID :any;
   displayStatus(item, mymodal1){
    this.SelectedID=item.ID;
    this.log= JSON.parse(item.ivr_log);

      if( item.IVR_STATUS != "" && item.IVR_STATUS != null)
      {
     this.ngbModal.open(mymodal1, { size: 'lg', backdrop: 'static' });
     this.status=item.IVR_STATUS;
     console.log('heello', this.log);
     this.keys = Object.keys(this.log[0]);
     console.log(this.keys,'keys');
     this.SubTabledata = this.log;   
      }
    
   }

   UserData:any;
   GetUserData(){
    const obj = {
      "Id":0,
      "UserName":""
      }
        this.spinnerService.show();
        this.authService.AXELPostmethod('Login/GetADUsers', obj).subscribe(x =>{
          if (x.status == 200){
            this.UserData = x.response.recordset;
          }
          this.spinnerService.hide();
        });
      }
      user_name:any;
   saveStatus(){

     let user_id = localStorage.getItem('User_ID')
   this.UserData.filter(ele=>{
     if(ele.id == user_id){
      this.user_name = ele.User_Name
     }
   })
   const obj={
    "id": this.item.ID,
    "cust_first_name": this.item.CUST_FIRST_NAME,
    "cust_last_name": this.item.CUST_LAST_NAME,
    "cust_email": this.item.CUST_EMAIL,
    "cust_phone": this.item.CUST_PHONE,
    "serice_reasoning_URL": this.item.SERICE_REASONING_URL,
    "appt_day_requested": this.item.APPT_DAY_REQUESTED,
    "vin": this.item.VIN,
    "time_of_day": this.item.TIME_OF_DAY,
    "vehicle_make": this.item.VEHICLE_MAKE,
    "vehicle_model": this.item.VEHICLE_MODEL,
    "vehicle_year": this.item.VEHICLE_YEAR,
    "ivr_status": this.status,
    "notes":this.notes,
    "storecode":this.item.Store_Code,
    "userid":user_id,
    "username":this.user_name

  }
  if(this.status.toUpperCase() == 'Scheduled'.toUpperCase()){
    obj.notes = ""
  }
  // console.log('statusupdate',obj)
  this.authService.StatusUpdate('ivr/',obj).subscribe((x:any)=>{
    // console.log(x);
    if(x.status == 200){
      alert(x.response);
      this.ngbModal.dismissAll();
    this.GetGridData(0);
    }
  })
}

closeNotes()
{
  this.notes="";
  this.status="";
  this.ngbModal.dismissAll();
}


ClickURL(event){
  // console.log("event click")
     window.open(event, '_blank');
}

selectStatus(event){
 // this.status = event;
}
selectCode($event){

}
showSelectedStatus(IVRData):any
{
 
  if(this.SelectStatus.length>0)
  {
   let IVRFilteredData =[];
   let SelectStatus = this.SelectStatus.toUpperCase();  
    IVRFilteredData = IVRData.filter(x => x.IVR_STATUS== SelectStatus);
    return IVRFilteredData;
  }
   // return IVRrec.IVR_STATUS ===this.SelectStatus;
 return IVRData;
}
statuschange(evt){
  this.status = evt.toUpperCase();
//   if(evt == 'Scheduled')
//  this.status = 'Scheduled';
//  else if(evt == 'Called')
//  this.status = 'Called';
//  else
//  this.status = 'Rescheduled'
//  console.log(this.status)
}

checkedIDs :any=[];
getDeleteId(){
   this.checkedIDs = [];
    this.IVRData.forEach((value) => {
      if (value.isChecked) {
         this.checkedIDs.push(value.ID);
        // console.log(this.checkedIDs,'getid');
      }
    });
}

Delete(){
   this.authService.IVRDelete('ivr/deleteIvrById', this.checkedIDs).subscribe((x:any)=>{
    // console.log(x.response);
    if(x.status == 200){
       alert('Records Deleted Successfully');
      this.GetGridData(0)
    }
   })
   }

}
