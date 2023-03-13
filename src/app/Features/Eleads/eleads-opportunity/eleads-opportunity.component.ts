import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';
import { Location} from '@angular/common';

@Component({
  selector: 'app-eleads-opportunity',
  templateUrl: './eleads-opportunity.component.html',
  styleUrls: ['./eleads-opportunity.component.scss']
})
export class EleadsOpportunityComponent implements OnInit {

  GridData:any;
  TabChange = '1';
  StoreList:any[] = [];
  Selectedtable:any = "SOUGHT";
  SelectStore:any = "";
  ELeadsData1:boolean = false;
  showTableData:boolean = false;
  SubTabledata:any=[];
  keys:any=[];
  ShowModal :boolean = false;
  SelectedID :any;
  SelectedItem_ID:any;
  startDate :any;
  

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
      this.getGridData(0);
    })
  }
 
  
  storeChange(evt){
    this.SelectStore = evt
    console.log(evt,"Storechange")
    this.GridData=[];
    this.getGridData(0);
     }

     i =0;
     viewmore = false;
    getGridData(i){
      this.spinnerService.show();
      const obj={
        "StoreId":this.SelectStore,
        "Date":this.startDate,
        "StartCnt":i
      }
      console.log(obj);
      this.spinnerService.show();
      this.authService.AXELPostmethod('eLeadsData/GetCompanyOpportunityData',obj).subscribe((x:any)=>{
        console.log(x.response);
        if(x.response.length > 0){
          this.viewmore = true;
          if( i == 0 ){
            this.GridData = x.response;
          }
          else {
            for(i =0; i<x.response.length;i++){
              this.GridData.push(x.response[i]);
            }
          }
        }
       else if(x.response.length == 0)
        {  this.viewmore = false;}
        
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

    
  ViewMore() {
    this.viewmore = true;
    this.i = this.i + 100;
    this.getGridData(this.i);

  }


    SelectStoreName:any;
    OpenModal(item){
      console.log(item);
      this.SelectedID = item.OPPTS_ID;
      this.SelectedItem_ID = item.OPPTS_ITEM_ID;
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
     if(val == '1'){
      this.Selectedtable = 'SOUGHT';
      this.GetSubTabledata();
     }
      else if(val == '2') {
        this.Selectedtable = 'SALES';
        this.GetSubTabledata();
      }
       
      else if(val == '3') {
        this.Selectedtable = 'TRADEINS';
        this.GetSubTabledata();
      }
       
       else if(val == '4')  {
        this.Selectedtable = 'LINKS';
        this.GetSubTabledata();
       }
    }

    GetSubTabledata(){
      const obj={
        "ID":this.SelectedID,
        "FLAG":this.Selectedtable
      }
      console.log(obj,'tabsdata');
      this.authService.AXELPostmethod('eLeadsData/GetOpportunitiesSubTablesData',obj).subscribe((x:any)=>{
        console.log(x.response,'TableData');
        if(x.status == 200 && x.response.length > 0){
          this.keys = Object.keys(x.response[0]);
          this.SubTabledata = x.response;
          console.log(this.keys,'keys');
        }
       else if( x.status == 200 && x.response.length == 0){
         this.SubTabledata = [];
       }
      
      })
    }


}
