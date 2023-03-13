import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';
import { Location} from '@angular/common';

@Component({
  selector: 'app-eleads-historyby-opportunity',
  templateUrl: './eleads-historyby-opportunity.component.html',
  styleUrls: ['./eleads-historyby-opportunity.component.scss']
})
export class ELeadsHistorybyOpportunityComponent implements OnInit {

  GridData:any=[];
  StoreList:any[] = [];
  SelectStore:any = "";
  ShowModal:boolean = false;
  viewmore:boolean = false;
  i = 0;
  SelectedOppID:any = "";
  SelectedHistoryID:any = "";
  SubData:any;
  keys:any;
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
      this.SelectStore = x.response[0].DMS_ID;
      this.getGridData(0);
    })
  }
 
  
  storeChange(evt){
    this.SelectStore = evt
    console.log(evt,"Storechange")
    this.GridData=[];
    this.getGridData(0);
  }

  getGridData(i){
      this.spinnerService.show();
      const obj={
        "DMSID":this.SelectStore,
        "Date":this.startDate,
        "OPPORTUNITYID":this.SelectedOppID,
        "StartCnt":i
      }
      console.log(obj);
      this.spinnerService.show();
      this.authService.AXELPostmethod('eLeadsData/GetHistorybyOpportunityId',obj).subscribe((x:any)=>{
        console.log(x.response);
        if (i == 0) {
          this.GridData = x.response;
          console.log(this.GridData.length);
        }
        else
          for (i = 0; i < x.response.length; i++) {
            this.GridData.push(x.response[i]);
          }
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
    this.SubData =[];
    this.keys=[];
    console.log(item);
    this.SelectedHistoryID = item.AHBOI_HISTORY_ID;
    if(item.AHBOI_OUTCOMES_COUNT_BYHISTORYID!='0'){
    this.ShowModal = true;
    this.GetSubTabledata();
    this.StoreList.forEach(ele =>{
      if(this.SelectStore == ele.DMS_ID){
        this.SelectStoreName = ele.AS_DEALERNAME
      }
    })
  }
  else
  this.ShowModal = false;
}

  GetSubTabledata(){
    this.spinnerService.show();
    const obj= {
      "DMSID":this.SelectStore,
     "HISTORYID":this.SelectedHistoryID
    }
    console.log('subdata', obj);
    this.authService.AXELPostmethod('eLeadsData/GetOutcomesbyHistoryId',obj).subscribe((x:any)=>{
      console.log(x.response);
      if(x.status == 200 && x.response.length > 0){
        this.keys = Object.keys(x.response[0]);
        this.SubData = x.response;
        console.log(this.keys,'keys');
      }
     else if( x.status == 200 && x.response.length == 0){
       this.SubData = [];
     }
     this.spinnerService.hide();
    })
    }

    searchById(item){
      this.SelectedOppID = item
      this.getGridData(0);
    }

}
