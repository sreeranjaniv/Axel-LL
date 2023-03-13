import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';
import { Location} from '@angular/common';

@Component({
  selector: 'app-eleads-customers',
  templateUrl: './eleads-customers.component.html',
  styleUrls: ['./eleads-customers.component.scss']
})
export class ELeadsCustomersComponent implements OnInit {

  GridData:any;
  TabChange = '1';
  StoreList:any[] = [];
  Selectedtable:any = "PHONES";
  SelectStore:any = "";
  // ELeadsData1:boolean = false;
  showTableData:boolean = false;
  SubTabledata:any=[];
  keys:any=[];
  ShowModal :boolean = false;
  SelectedID :any;
  SelectedItem_ID:any;
  i=0;
  viewmore:boolean = false;
  SelectedCstID:any ="";
  ELeadsData1: boolean = false;
  startDate :any  ;

  constructor(public globalVarComponent: GlobalVariablesComponent,private authService: ApiService,
    private spinnerService: Ng4LoadingSpinnerService,private location: Location) { }

  ngOnInit() {
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";
    this.getStoresData();
    this.authService.getSDate().subscribe(sdt=>{
      console.log(sdt,'sdt123');
      if(sdt !="" )
      this.startDate = sdt;
      else
      // this.startDate =  new Date( new Date().setDate(new Date().getDate()-1));
       this.startDate = new Date( new Date().setDate(new Date().getDate()-1)).toISOString().split('T')[0];
    })
  }
  getToday(){
    var InputDate = new Date( new Date().setDate(new Date().getDate()));
    return InputDate.toISOString().split('T')[0];
  }

  updatedate(event){
    this.startDate = event;
    this.getGridData(0);
  }
  getStoresData(){
    const obj= {
      "DS_ID":2
    }
    this.authService.AXELPostmethod('eLeadsData/GetDmsStoresData',obj).subscribe((x:any)=>{
      console.log(x.response,"StoresData")
      this.StoreList = x.response;
      this.authService.getstoreID().subscribe(dms_id=>{
        console.log(dms_id,'dsm_id')
        if(dms_id >0)
        this.SelectStore = dms_id;
        else
        this.SelectStore = x.response[0].DMS_ID;
      })
      this.getGridData(this.i);
    })
  }
 
  
  storeChange(evt){
    this.SelectStore = evt
    console.log(evt,"Storechange")
    this.GridData=[];
    this.getGridData(0);
     }

     count ="";
    getGridData(i){
      this.spinnerService.show();
      const obj={
        "DmsId":this.SelectStore,
        "StartCnt":i,
        "CID":0,
        "CUSTID":this.SelectedCstID,
        "Date":this.startDate
      }
      console.log(obj);
      this.spinnerService.show();
      this.authService.AXELPostmethod('eLeadsData/GeteLeadsAllCustomersData',obj).subscribe((x:any)=>{
        console.log(x.response);
        if(x.message == "success"){
          this.viewmore = true;
          this.count = x.response.totCnt;
          console.log(this.count,'count');
          if(i == 0 ){
            this.GridData = x.response.data;
          }
          else {
            for(i= 0;i <x.response.data.length;i++){
              this.GridData.push(x.response.data[i])
            }
          }
        }
        else
        this.viewmore = false;
          if(this.GridData.length == 0)
          this.ELeadsData1 = true;
          else
          this.ELeadsData1 = false;
          this.spinnerService.hide();
      })
      
    }

    PreviousUrl(){
      this.location.back();
      this.authService.setstoreID("","");
    }     

    ViewMore(){
      this.viewmore = true;
        this.i = this.i + 100;
        this.getGridData(this.i);
        console.log('this.viewmore',this.i)
    }
    
    SelectStoreName:any;
    OpenModal(item){
      console.log(item);
      this.TabChange = '1'
      this.Selectedtable = "PHONES";
      this.SelectedID = item.C_ID;
      this.SelectedItem_ID = item.C_CUST_ID;
      this.ShowModal = true;
      this.showTableData = false;
      this.GetSubTabledata();
      this.StoreList.forEach(ele =>{
        if(this.SelectStore == ele.DMS_ID){
          this.SelectStoreName = ele.AS_DEALERNAME
        }
      })
    }

    
    TabClick(val){
     this.TabChange = val;
     if(this.TabChange == '1'){
      this.Selectedtable = 'PHONES';
      this.GetSubTabledata();
     }
      else if(this.TabChange == '2') {
        this.Selectedtable = 'EMAILS';
        this.GetSubTabledata();
      }
       
      else if(this.TabChange == '3') {
        this.Selectedtable = 'PRIVACYSETTINGS';
        this.GetSubTabledata();
      }
       
       else if(this.TabChange == '4')  {
        this.Selectedtable = 'LINKS';
        this.GetSubTabledata();
       }
       else if(this.TabChange == '5'){
         this.Selectedtable = 'LASTACTIVITIES';
         this.GetLastActivity();
       }
    }

    GetSubTabledata(){ 
      // const obj={
      //   "CID":this.SelectedID,
      //   "DmsId":this.SelectStore,
      //   "StartCnt":0,
      //   "CUSTID":this.SelectedCstID
      // }
      // console.log(obj,'tabsdata');
      this.spinnerService.show();
      // this.authService.AXELPostmethod('eLeadsData/GeteLeadsAllCustomersData',obj).subscribe((x:any)=>{
        // console.log(x.response,'TableData');
         if(this.Selectedtable != ""){
           this.GridData.forEach(element => {
             if(element.C_ID == this.SelectedID){
             if(element.hasOwnProperty(this.Selectedtable)){
              console.log(this.Selectedtable)
              let selectedobj = element[this.Selectedtable];
               console.log(selectedobj,'selectedobj');
              this.keys = Object.keys(selectedobj[0]);
              console.log(this.keys,'keys');
              this.SubTabledata = selectedobj;           
              console.log(this.SubTabledata,'Subtabledata');
              }
              else{
               console.log("no data");
               this.keys = "";
               this.SubTabledata = "";
              }
            }
            });
            this.spinnerService.hide();
           }
           
      // })
      
    }
    searchById(item){
      this.i=0;
      this.SelectedCstID = item
      this.getGridData(this.i);
    }

    LastActivity =[
      "AHBOI_HISTORY_ID",
      "AHBOI_ACTIVITYTYPE",
      "AHBOI_CATEGORY",
      "AHBOI_NAME",
      "AHBOI_COMPLETEDDATE",
      "AHBOI_DUEDATE",
      "AHBOI_CLOSEDDATE",
      "AHBOI_OUTCOME",
      "AHBOI_CREATEDBY",
      "AHBOI_ASSIGNEDTO",
      "AHBOI_COMPLETEDBY",
      "AHBOI_OPPORTUNITYID",
      "AHBOI_UPTYPE",
      "AHBOI_SOURCE",
      "AHBOI_SUBSOURCE",
      "AHBOI_CREATEDBYUSERID",
      "AHBOI_ASSIGNEDTOUSERID",
      "AHBOI_COMPLETEDBYUSERID"
      ]
    GetLastActivity(){
      const obj ={
        "C_CUST_ID":this.SelectedItem_ID,
        "DMSID":this.SelectStore
      }
      console.log(obj,'lastact Obj');
      this.authService.AXELPostmethod('eLeadsData/GetCustomersOpportunitiesLastActvity',obj).subscribe((x:any)=>{
        console.log(x.response,'last respo');
        let Activereposnse = x.response[0];
        // this.keys = Object.keys(Activereposnse);
        this.keys = this.LastActivity;
        this.SubTabledata = x.response;
        console.log(this.keys,'keys for last activity');
        console.log(this.SubTabledata,'activity data');
      })

    }

}
