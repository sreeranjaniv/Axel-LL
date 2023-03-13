import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVariablesComponent } from '../../../Partials/global-variables/global-variables.component';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';
import { Location,DatePipe } from '@angular/common';
import { ExcelService } from '../../../Core/_providers/Excel-service/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-service-sales-closed',
  templateUrl: './service-sales-closed.component.html',
  styleUrls: ['./service-sales-closed.component.scss']
})
export class ServiceSalesClosedComponent implements OnInit {
  TabChange = '0';
  DEALER_Change=0;
  ReportGridData: any = [];
  RO_TYPE: any;
  customer = 1;
  Internal = 1;
  Summary = 1;
  Store:boolean = true;
  Advisory:boolean = false;
  StartDate:any;
  EndDate:any;
  GetStores: any;
  ReportGridData_Excel:any=[];
  constructor(
    private spinnerService: NgxSpinnerService,
    private location: Location,
    private _Activatedroute: ActivatedRoute,
    public globalVarComponent: GlobalVariablesComponent,
    private authService: ApiService,
    private router: Router,
    private datepipe:DatePipe,
    private excelService:ExcelService
  ) { }

  ngOnInit() {
  this.getToday();
  this.StoresData();
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";  
    this.TabChange = '1';   
    this.TabClick(this.TabChange);
  }
  getToday(){
    var d = new Date();
           var currMonth = d.getMonth()-1;
           var currYear = d.getFullYear();
           this.StartDate=   this.datepipe.transform(new Date(currYear, currMonth, 1),'MM-dd-yyyy');
           this.EndDate=  this.datepipe.transform(new Date(currYear, currMonth+1, 0),'MM-dd-yyyy');
  }
  StoresData(){
    if(this.TabChange == '6' ){}
    const obj = { "AU_ID":localStorage.getItem('User_ID') };
    this.authService.AXELPostmethod('AXELData/GetCorporatesbyUser',obj).subscribe(x =>{
      if(x !== ''){
        this.GetStores=x.response.recordset;
      }
      });
  }

  DealerChange(newValue){
    this.DEALER_Change = newValue.target.value;
    if (this.TabChange == "1") {
      this.Advisory=false;
      this.Store=true;
      this.SalesReport('S');
    }
    else if (this.TabChange == "2") {
      this.Advisory=true;
      this.Store=false;
      this.SalesReport('A');
    }
  }
  Rochange(e) {
    let val = e.target.value;
    let checked = e.target.checked;
    if (val === 'C') {
      if (checked) {
        this.customer = 1;
      }
      else {
        this.customer = 0;
      }
    }
    if (val === 'I') {
      if (checked) {
        this.Internal = 1;
      }
      else {
        this.Internal = 0;
      }

    }
    if (val === 'W') {
      if (checked) {
        this.Summary = 1;
      }
      else {
        this.Summary = 0;
      }
    }
    if (this.TabChange == "1") {
      this.Advisory=false;
      this.Store=true;
      this.SalesReport('S');
    }
    else if (this.TabChange == "2") {
      this.Advisory=true;
      this.Store=false;
      this.SalesReport('A');
    }
  }
  PreviousUrl() {
    this.location.back();
  }

  TabClick(event) {
    this.TabChange = event;
    if (event == "1") {
      this.Advisory=false;
      this.Store=true;
      this.DEALER_Change=0;
      this.SalesReport('S');
    }
    else if (event == "2") {
      this.Advisory=true;
      this.Store=false;
      this.SalesReport('A');
    }
  }

  setStartdate(e){
    this.StartDate= this.datepipe.transform(e, 'MM-dd-yyyy');
    if (this.TabChange == "1") {
      this.SalesReport('S');
    }
    else if (this.TabChange == "2") {
      this.SalesReport('A');
    }
  }

  setEnddate(e){
    this.EndDate= this.datepipe.transform(e, 'MM-dd-yyyy');
    if (this.TabChange == "1") {
      this.SalesReport('S');
    }
    else if (this.TabChange == "2") {
      this.SalesReport('A');
    }
  }

  SalesReport(Block_val) {
    const obj = {
      "StoreId":this.DEALER_Change,
      "CP": this.customer,
      "IP": this.Internal,
      "WP": this.Summary,
      "Startdate": this.StartDate,
      "enddate": this.EndDate,
      "type": Block_val
    }
    console.log(obj);
    this.spinnerService.show();
    this.authService.AXELPostmethod('AXELData/GetServiceSalesClosed', obj).subscribe(x => {
      if (x.status == 200) {
        this.ReportGridData = x.response.recordset;
        this.ReportGridData_Excel =  x.response.recordset.map(({SNo,...rest}) => ({...rest}));
        var sorted = {};
        for (var i = 0, max = this.ReportGridData.length; i < max; i++) {
          if (sorted[this.ReportGridData[i].LABLE1] == undefined) {
            sorted[this.ReportGridData[i].LABLE1] = [];
          }
          sorted[this.ReportGridData[i].LABLE1].push(this.ReportGridData[i]);
        }
      }
    }, (error) => {
    }, () => {
      this.spinnerService.hide();
    });
  }


  exportAsXLSX() {
    if(this.TabChange == '1' ){this.excelService.exportAsExcelFile(this.ReportGridData_Excel, 'Sales_Store_summary_Report');}
    else if(this.TabChange == '2'){this.excelService.exportAsExcelFile(this.ReportGridData_Excel, 'Sales_Advisor_summary_Report');}
  
   
 }
}
