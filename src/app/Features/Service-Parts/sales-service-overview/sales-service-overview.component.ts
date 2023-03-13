import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sales-service-overview',
  templateUrl: './sales-service-overview.component.html',
  styleUrls: ['./sales-service-overview.component.scss']
})
export class SalesServiceOverviewComponent implements OnInit {
  public SalesService_items:any=[];
  public Dealer_DD: any =[]; 
  public Header:any=[];
  elementClicked: any= '';
  public SalesType="M";
  DEALER_Change: any=0
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
  constructor(private authService: ApiService,  private router: Router, private spinnerService: NgxSpinnerService,
    public globalVarComponent:GlobalVariablesComponent) { }

  ngOnInit() {
    this.NoMoreRecords = false;
    this.DealerDropDown();
    this.GridBind();
  }
  DealerDropDown(){
    const obj = {"AU_ID":localStorage.getItem('User_ID') };
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
      "AS_ID":this.DEALER_Change,
      "SERVICE_PERIOD_TYPE": this.SalesType
    };
        this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetServiceSalesOverview',obj).subscribe(x =>{
          if (x.status == 200){
            this.NoMoreRecords = true;
            this.SalesService_items = x.response.recordset;
            this.Header = x.response.recordset[0];
            this.SalesService_items.shift();
            this.spinnerService.hide();
          }
        //   else
        // this.NoMoreRecords = true;
       
        //  console.log("Body", this.SalesService_items);
        //  console.log("Header", this.Header);
         
  });
}

//  highlightRow(item) {
//   this.selecttr='';
//   this.selectedName = item.STORE_TITLE;
//   this.Isinactive = true;
//   this.IsDivinactive = true;
// }
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
