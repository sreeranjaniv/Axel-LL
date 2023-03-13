import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public Dealer_DD: any =[]; 
  public list_items:any=[];
  DEALER_Change: any=0
  public Header:any=[];
  elementClicked: any= '';
  public SalesType="M";
  Isinactive:boolean=false;
  IsDivinactive:boolean=false;
  IsLink_Underline:boolean=false;
  public selectedName:any;
  public selecttr:any;
  tab : any = 'tab_M';
  tab_M : any;
  tab_Q : any;
  tab_Y : any;
  NoMoreRecords: boolean = false;
  constructor(private authService: ApiService,  private router: Router, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.NoMoreRecords = false;
    this.DealerDropDown();
    this.GridBind();
  }
  DealerDropDown(){
    const obj = { 
      "AU_ID" : localStorage.getItem('User_ID')
     };
    this.authService.AXELPostmethod('AXELData/GetCorporatesbyUser',obj).subscribe(x =>{
      if(x !== ''){
        this.Dealer_DD=x.response.recordset;
        console.log("Errors", this.Dealer_DD);
      }
      });
  }
  DealerChange(newValue){
    this.DEALER_Change = newValue.target.value;
    this.GridBind();
  }
  onClick(check){
    //    console.log(check);
        if(check==1){
          this.tab = 'tab_M';
          this.SalesType = 'M';
        }else if(check==2){
          this.tab = 'tab_Q';
          this.SalesType = 'Q';
        }else{
          this.tab = 'tab_Y';
          this.SalesType = 'Y';
        }    
        this.GridBind();
    }
  GridBind() {
    const obj=
    {
      "AU_ID" : localStorage.getItem('User_ID'),
      "AS_ID": this.DEALER_Change,
      "SALES_PERIOD_TYPE":this.SalesType
    };
        this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetSalesOverview',obj).subscribe(x =>{
          this.NoMoreRecords = true;
        this.list_items = x.response.recordset;
        // this.list_items.splice(this.list_items.length-1, 1);
        
        this.Header = x.response.recordset[0];
        this.list_items.shift();
        
         console.log("Body", this.list_items);
         console.log("Header", this.Header);
         this.spinnerService.hide();
  });
  
}
 highlightRow(item) {
  this.selecttr='';
  this.selectedName = item.STORE_TITLE;
  this.Isinactive = true;
  this.IsDivinactive = true;
}

Close() {
  this.Isinactive = false;
  this.IsDivinactive = false;
}
SideTabClick(event) {
  if(event == 1.1){
    this.router.navigate(['SalesOverview']);
  }
  else if(event == 2.1){
    this.router.navigate(['InventoryOverview']);
  }
  else if(event == 2.4){
    this.router.navigate(['Inventory']);
  }
  else if(event == 4.1){
    this.router.navigate(['SalesServiceOverview']);
  }
  else if(event == 5.1){
    this.router.navigate(['ServiceAppointments']);
  }
  else if(event == 5.2){
    this.router.navigate(['AppointmentsObjectives']);
  }
  else if(event == 5.3){
    this.router.navigate(['SAGReport']);
  }
  else if(event == 6.1){
    this.router.navigate(['Admin/AccountsCOA']);
  }
}

}
