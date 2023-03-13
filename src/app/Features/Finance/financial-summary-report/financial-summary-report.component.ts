import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GlobalVariablesComponent } from '../../../Partials/global-variables/global-variables.component';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';
import { DatePipe, Location } from '@angular/common';
import { SideMenuComponent } from '../../../Layout/side-menu/side-menu.component';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoader } from 'ngx-http-loader';
import { forkJoin } from 'rxjs';
import { delay } from "rxjs/operators";
import { ExcelService } from '../../../Core/_providers/Excel-service/excel.service';
import { parse } from 'querystring';
import * as moment from 'moment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-financial-summary-report',
  templateUrl: './financial-summary-report.component.html',
  styleUrls: ['./financial-summary-report.component.scss']
})
export class FinancialSummaryReportComponent implements OnInit {

  loader = NgxLoader;
  SubTab_Active = "";
  DEALER_Change : number = 0;
  ChangeDate: any;
  LastsixMonths: any = [];
  @Output() CurrentMonth: any;
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  public href: string = "";
  public GetStores: any = [];
  public ActualDecodeparam: string;
  ReportUserId = null;
  ReportId = null;
  ReportDate = null;
  TabChange = '0';
  ReportGridData: any = [];
  New_Units: any = [];
  Used_Units: any = [];
  Unit_Retail_Sales: any = [];
  Pure_Gross: any = [];
  Front_Gross: any = [];
  Back_Gross: any = [];
  Wholesales: any = [];
  Chargebacks: any = [];
  Variable_Gross: any = [];
  Service_Gross: any = [];
  Parts_Gross: any = [];
  Body_Gross: any = [];
  Total_Fixed: any = [];
  Total_Store_Gross: any = [];
  Variable_Expenses: any = [];
  Personnel_Expenses: any = [];
  Semi_Fixed_Expenses: any = [];
  Fixed_Expenses: any = [];
  Other_Expenses: any = [];
  Total_Expenses: any = [];
  Operating_Profit: any = [];
  Adjustments_Income: any = [];
  Manufacturer_Margin: any = [];
  Incentives: any = [];
  Pack: any = [];
  Doc_Fees: any = [];
  SuperGross_ManufacturerMargin: any = [];
  SuperGross_Incentives: any = [];
  SuperGross_Pack: any = [];
  SuperGross_Doc_Fees: any = [];
  SuperGross_TotalStore: any = [];
  Other_Adjustments: any = [];
  Net_Additions_Deductions: any = [];
  Net_Profit: any = [];
  SUMMERY: boolean = true;
  EBITDA: boolean = false;
  EXPENSE: boolean = false;
  VKPI: boolean = false;
  //CurrentMonth: any;
  CurrentYear: any;
  PriorMonth: any;
  PriorYearMonth: any;
  PriorYear: any;
  adjustedEBITDA: any = [];
  ad_NewGross: any = [];
  ad_UsedGross: any = [];
  ad_ServiceGross: any = [];
  ad_PartsGross: any = [];
  ad_BodyGross: any = [];
  ad_Wholesales: any = [];
  ad_Chargebacks: any = [];
  ad_TotalStoreGross: any = [];
  ad_SuperGross_ManufacturerMargin: any = [];
  ad_SuperGross_Incentives: any = [];
  ad_SuperGross_Pack: any = [];
  ad_SuperGross_DocFees: any = [];
  ad_SuperGross_TotalStore: any = [];
  ad_VariableExpenses: any = [];
  ad_PersonnelExpenses: any = [];
  ad_SemiFixedExpenses: any = [];
  ad_FixedExpenses: any = [];
  ad_TotalExpenses: any = [];
  ad_OperatingProfit: any = [];
  ad_ManufacturerMargin: any = [];
  ad_Incentives: any = [];
  ad_PackDocFees: any = [];
  ad_OtherAdjustments: any = [];
  ad_NetAdditionsDeductions: any = [];
  ad_NetProfit: any = [];
  ad_FIOverRemittance: any = [];
  ad_ManagementFees: any = [];
  ad_ReconditioningPremium: any = [];
  ad_Depreciation: any = [];
  ad_OwnerCompensation: any = [];
  ad_CapitalLoanInterest: any = [];
  ad_AcqRelatedOther: any = [];
  ad_SMCAddbacks: any = [];
  ad_AdjustedEBITDA: any = [];
  ExpenseTrend: any = [];


  //ChangeDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0];
  et_NewGross: any = [];
  et_UsedGross: any = [];
  et_ServiceGross:any = [];
  et_PartsGross: any = [];
  et_BodyGross:any = [];
  et_TotalStoreGross: any =[];
  et_SuperGross_ManufacturerMargin: any = [];
  et_SuperGross_Incentives: any =[];
  et_SuperGross_Pack: any = [];
  et_SuperGross_DocFees: any = [];
  et_TotalStoreSuperGross: any = [];

  et_RCIncentives: any = [];
  et_compensation: any = [];
  et_DelExpense: any = [];
  et_CompManagers: any = [];
  et_PolExpense: any = [];
  
  et_VariableExpensePercentOfSuperGross: any = [];

  et_compAdvisors: any = [];
  et_CompClerical: any = [];
  et_CompOthers: any = [];
  et_vacation: any = [];
  et_taxes: any = [];
  et_Insurance: any = [];
  et_uniforms: any = [];
  et_pension: any = [];

  et_PersonnelExpensePercentOfSuperGross: any = [];

  et_MfrAdvertisingCredit: any = [];
  et_Compliance: any = [];
  et_MarketingExp: any = [];
  et_Advertising: any = [];
  et_PlanInterest: any = [];
  et_PlanAssistance: any = [];
  et_PolicyExp: any = [];
  et_Training: any = [];
  et_TrainingCredit: any = [];
  et_Demonstrator: any = [];
  et_VehicleExp: any = [];
  et_Stationary: any = [];
  et_ToolsSupplies: any = [];
  et_BadDebts: any = [];
  et_DataProcessing: any = [];
  et_TravelEntertainment: any = [];
  et_Memberships: any = [];
  et_Postage: any = [];
  et_Freight: any = [];
  et_Contributions: any = [];
  et_LegalAccounting: any = [];
  et_Telephone: any = [];
  et_OutsideServices: any = [];
  et_ServiceFee: any = [];
  et_Miscellaneous: any = [];

  et_SemiFixedExpensePercentOfSuperGross: any = [];

  et_Rent: any = [];
  et_BrandStandards: any = [];
  et_Leaseholds: any = [];
  et_Repairs: any = [];
  et_TaxesRealEstate: any = [];
  et_InsuranceImp: any = [];
  et_Mortgages: any = [];
  et_Utilities: any = [];
  et_TaxesOther: any = [];
  et_InsuranceOther: any = [];
  et_RepairsMaintenanceEquip: any = [];
  et_DepEquipment: any = [];
  et_RentalEquipment: any = [];

  et_FixedExpensePercentOfSuperGross: any = [];
  et_TotalExpensePercentOfSuperGross: any = [];
  et_OperatingProfit: any =[];
  et_ManufacturerMargin: any = [];
  et_Incentives:any = [];
  et_Pack: any = [];
  et_DocFees: any = [];
  et_OtherAdjustments: any = [];
  et_NetAddsDeducts: any =[];
  et_NetProfit: any =[];

  // LastsixMonths: any = [];
  et_TotalVaraibleExpense: any = [];
  et_TotalPersonalExpense: any = [];
  et_TotalSemiFixedExpense: any = [];
  et_TotalFixedExpense: any = [];
  et_TotalExpenses: any = [];

  //variable KPI
  variableTBData: any = [];
  departmentPCData: any = [];
  departmentCVData: any = [];

  //variableTBData
  vtb_BackGross: any = [];
  vtb_BackGrossPVR: any = [];
  vtb_Chargebacks: any = [];
  vtb_Wholesales: any = [];
  vtb_VariableGross: any = [];
  vtb_ManufacturerMargin: any = [];
  vtb_Pack: any = [];
  vtb_DocFees: any = [];
  vtb_TotalStoreSuperGross: any = [];
  vtb_VariableGrossPVR: any = [];
  vtb_SuperGrossPVR: any = [];
  vtb_DeliveryExpense: any = [];
  vtb_DeliveryExpensePVR: any = [];
  vtb_FICompensation: any = [];
  vtb_FICompensationPVR: any = [];
  vtb_FrontGross: any = [];
  vtb_FrontGrossPVR: any = [];
  vtb_Incentives: any = [];
  vtb_IncentivesPVR: any = [];
  vtb_PolicyExpenseNU: any = [];
  vtb_PolicyExpenseNUPVR: any = [];
  vtb_RecapGrossNU: any = [];
  vtb_RecapGrossPVR: any = [];
  vtb_RepresentativeCompIncent: any = [];
  vtb_RepresentativeCompIncentPVR: any = [];
  vtb_RetailUnits: any = [];
  vtb_TotalVariableExpenses: any = [];
  vtb_TotalVariableExpensesPVR: any = [];

  // departmentPCData
  dpc_BackGross: any = [];
  dpc_BackGrossPVR: any = [];
  dpc_Chargebacks: any = [];
  dpc_FrontGross: any = [];
  dpc_FrontGrossPVR: any = [];
  dpc_Incentives: any = [];
  dpc_IncentivesPVR: any = [];
  dpc_NewUnits: any = [];
  dpc_RecapGrossNew: any = [];
  dpc_RecapGrossPVR: any = [];
  dpc_RecapGrossUsed: any = [];
  dpc_UsedUnits: any = [];
  dpc_WholesaleGross: any = [];
  dpc_WholesaleGrossPVR: any = [];
  dpc_WholesaleUnits: any = [];
 dpc_VariableGrossNew: any = []; 
 dpc_VariableGrossPVR: any = []; 
 dpc_VariableGrossUsed: any = []; 
 dpc_Wholesales: any = []; 
  //departmentCVData
  dcv_BackGross: any = [];
  dcv_BackGrossPVR: any = [];
  dcv_Chargebacks: any = [];
  dcv_FrontGross: any = [];
  dcv_FrontGrossPVR: any = [];
  dcv_Incentives: any = [];
  dcv_IncentivesPVR: any = [];
  dcv_NewUnits: any = [];
  dcv_RecapGrossNew: any = [];
  dcv_RecapGrossPVR: any = [];
  dcv_RecapGrossUsed: any = [];
  dcv_UsedUnits: any = [];
  Dateflag: any = 0;

  // EXCEL
  ReportGridData_Excel: any = [];
  adjustedEBITDA_Excel: any = [];
  ExpenseTrend_Excel: any = [];
  variableTBData_Excel: any = [];
  department_Excel: any = [];
  variable_excel: any = [];
  departmentPCData_Excel: any = [];
  departmentCVData_Excel: any = [];


  //LINECHART
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartOptions: any = {
    responsive: true,
  };
  lineChartColors: Color[] = [];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  Variable_Expenses_Percent: any;
  Personnel_Expenses_Percent: any;
  Semi_Fixed_Expenses_Percent: any;
  Fixed_Expenses_Percent: any;
  Other_Expenses_Percent: any;


  //  Variable Trends vs. Stores && Variable Trends vs. Budget
  VKPIBudget: boolean;
  VKPIStores: boolean;
  EXPENSEBudget: boolean;
  EXPENSEStores: boolean;
  ExpenseTrendByStore: any[] = [];
  ExpenseTrendByStore_Excel: any[] = [];
  VKPITrendByStore: any[] = [];
  ExpenseTrendByStoreKeys: any[] = [];
  // MonthYEar = this.ChangeDate.toLocaleString('en-us',{month:'long',Year:'numeric'});

  ///Refresh

  GLTbleLstRfr:any;
  OurTbleLstRfr:any;
 

  //with or w/o pack
  isWithPack = 'N';
  constructor(private ngbActiveModal: NgbActiveModal, private ngbModal: NgbModal, private location: Location,
    private _Activatedroute: ActivatedRoute,
    public globalVarComponent: GlobalVariablesComponent, private authService: ApiService,
    private router: Router, private excelService: ExcelService) {
  }

  ngOnInit() {
   // this.authService.setFinanceBudgetVariable_StoreID(0);
    if (this.globalVarComponent.ReportId > 0) {
      this.TabChange = this.globalVarComponent.ReportId;
      // this.ChangeDate = new Date(new Date().setDate(new Date(this.ReportDate).getDate())).toISOString().split('T')[0];
    }
    else { this.TabChange = '1'; }
    this.getCurrent();
    this.LastRefresh();

    //  this.getToday();
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";
    this.StoresData();
 
  }

  numberWithCommas = (x) => {
    if (x)
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    else
      return 0;
  }

  getLastSixMonths(date_Val) {
    var today = new Date(date_Val);
    var d;
    var month;
    var year;
    this.LastsixMonths = [];
    for (var i = 6; i > 0; i -= 1) {
      d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      month = this.monthNames[d.getMonth()];
      year = d.getFullYear();
      this.LastsixMonths.push(month + ' ' + year);
    }
  }
  getCurrent() {
 
    this.PriorMonth = "";
    this.CurrentMonth = "";
    this.CurrentYear = "";
    let currentDate: any;
    if (this.Dateflag == 0) {
      this.ChangeDate = moment(new Date()).add(-1, 'M');
      currentDate = this.ChangeDate.toISOString().split('T')[0];
    }
    else {


      if (new Date(this.ChangeDate).toString().includes('GMT+')) // For IST
      {
        // this.ChangeDate = moment(new Date(this.ChangeDate));
        currentDate = this.ChangeDate;

      }
      else if (new Date(this.ChangeDate).toString().includes('GMT-')) // FOR US STANDARD TIMES
      {
        currentDate = this.ChangeDate;
        this.ChangeDate = moment(new Date(this.ChangeDate)).add(1, 'M');
      }


    }

    var CDMonth = currentDate.split('-')[1];
    let Month = Number(CDMonth) - 1;
    let Year = currentDate.split('-')[0];
    this.CurrentMonth = this.monthNames[Month];
    this.CurrentYear = Year;
    this.CurrentMonth = this.CurrentMonth + ' ' + this.CurrentYear;
    if (Month == 0) {
      this.PriorMonth = this.monthNames[11] + ' ' + (Number(Year) - 1);
    }
    else {
      this.PriorMonth = this.monthNames[Month - 1] + ' ' + (this.CurrentYear).toString();
    }

    this.PriorYearMonth = this.monthNames[Month];
    this.PriorYear = (Number(Year) - 1);

  }


  PreviousUrl() {
    this.authService.setFinanceBudgetVariable_StoreID(0);
    this.location.back();
  }

  StoresData() {
    const obj = { "AU_ID": localStorage.getItem('User_ID') };
    this.authService.AXELPostmethod('AXELData/GetCorporatesbyUser', obj).subscribe(x => {
      if (x !== '') {
        this.GetStores = x.response.recordset;       
        this.authService.getFinanceBudgetVariable_StoreID().subscribe(as_id => {if(as_id>0){this.DEALER_Change = as_id}}); 
        console.log("GetStores", this.GetStores);
        this.StoreSummary();
      }
    });
  }

  DealerChange(newValue) {
    this.DEALER_Change = newValue.target.value;
 
    if (this.SUMMERY) {
      this.StoreSummary();
    }
    if (this.EBITDA) {
      this.getAdjustedEBITDA();
    }
    if (this.EXPENSE) {
      this.getExpenseTrend();
    }
    if (this.VKPI) {
      this.getVariableKPIData();
    }
  }


  updatedate(event) {
    this.showLineChart = false;
    this.Dateflag = 1;
    this.ChangeDate = event;
    this.getLastSixMonths(event);

    if (this.SUMMERY) {
      this.StoreSummary();
    }
    if (this.EBITDA) {
      this.getAdjustedEBITDA();
    }
    if (this.EXPENSE) {

      this.getExpenseTrend();
    }
    if (this.VKPI) {
      this.getVariableKPIData();
    }
    this.getCurrent();
  }

  TabClick(event) {
    this.showLineChart = false;
    this.TabChange = event;
    this.LastRefresh();
    if (event == "1") {
      this.SUMMERY = true;
      this.EBITDA = false;
      this.EXPENSE = false;
      this.VKPI = false;
      this.StoreSummary();
    }
    else if (event == "2") {
      this.SUMMERY = false;
      this.EBITDA = true;
      this.EXPENSE = false;
      this.VKPI = false;
      this.getAdjustedEBITDA();
    }
    else if (event == "3") {      
      this.SubTab_Active = 'B';
      this.SUMMERY = false;
      this.EBITDA = false;
      this.EXPENSE = true;
      this.VKPI = false;
      this.EXPENSEBudget = true;
      this.EXPENSEStores = false;
      this.getLastSixMonths(this.ChangeDate);
      this.getExpenseTrend();
    }
    else if (event == "4") {
      this.SubTab_Active = 'B';
      this.SUMMERY = false;
      this.EBITDA = false;
      this.EXPENSE = false;
      this.VKPI = true;
      this.VKPIBudget = true;
      this.VKPIStores = false;
      this.getVariableKPIData();
    }


  }


  StoreSummary() {
    // this.getCurrent()
    this.ReportGridData = [];
   
    const obj = {
      "as_Id": this.DEALER_Change,
      "SalesDate": this.ChangeDate
      //  "SalesDate": "Sun Dec 26 2021 05:30:00 GMT+0530 (India Standard Time)"
    }
    console.log('obj', obj);
  
    this.authService.AXELPostmethod('AXELData/GetNightlyFinancialSummaryReport', obj).subscribe(x => {
      if (x.status == 200) {
        this.ReportGridData = x.response.recordset
        this.ReportGridData_Excel = x.response.recordset.map(({ SNo, ...rest }) => ({ ...rest }));
        //   this.getCurrent();
        console.log("this.ReportGridData", this.ReportGridData);
        var sorted = {};
        for (var i = 0, max = this.ReportGridData.length; i < max; i++) {
          if (sorted[this.ReportGridData[i].LABLE1] == undefined) {
            sorted[this.ReportGridData[i].LABLE1] = [];
          }
          sorted[this.ReportGridData[i].LABLE1].push(this.ReportGridData[i]);
        }
        this.New_Units = sorted["New_Units"];
        this.Used_Units = sorted["Pre-Owned_Units"];
        this.Unit_Retail_Sales = sorted["Unit_Retail_Sales"];
        this.Front_Gross = sorted["Front_Gross"];
        this.Back_Gross = sorted["Back_Gross"];
        this.Pure_Gross = sorted["Pure_Gross"];
        this.Wholesales = sorted["Wholesales"];
        this.Chargebacks = sorted["Chargebacks"];
        this.Variable_Gross = sorted["Variable Gross"];
        this.Service_Gross = sorted["Service Gross"];
        this.Parts_Gross = sorted["Parts Gross"];
        this.Body_Gross = sorted["Body Gross"];
        this.Total_Fixed = sorted["Total Fixed"];
        this.Total_Store_Gross = sorted["Total Store Gross"];
        
        sorted["Manufacturer Margin"].forEach(MMele => {
          if(MMele.SNo == 17 )
          {
            this.SuperGross_ManufacturerMargin=[];
            this.SuperGross_ManufacturerMargin.push(MMele);}
          else if(MMele.SNo == 36 )
          {
            this.Manufacturer_Margin=[];
            this.Manufacturer_Margin.push(MMele);}
        });

        sorted["Incentives"].forEach(MMele => {
          if(MMele.SNo == 18 )
          {
            this.SuperGross_Incentives=[];
            this.SuperGross_Incentives.push(MMele);}
          else if(MMele.SNo == 37 )
          {
            this.Incentives=[];
            this.Incentives.push(MMele);}
        });   
        
        sorted["Pack"].forEach(MMele => {
          if(MMele.SNo == 19 )
          {
            this.SuperGross_Pack=[];
            this.SuperGross_Pack.push(MMele);
          }
          else if(MMele.SNo == 38 )
          {
            this.Pack=[];
            this.Pack.push(MMele);}
        }); 

        sorted["Doc Fees"].forEach(MMele => {
          if(MMele.SNo == 20 )
          { 
            this.SuperGross_Doc_Fees=[];
            this.SuperGross_Doc_Fees.push(MMele);}
          else if(MMele.SNo == 39 )
          {
            this.Doc_Fees=[];
            this.Doc_Fees.push(MMele);}
        }); 
        this.SuperGross_TotalStore = sorted["Total Store Super Gross"];
       
        this.Variable_Expenses = sorted["Variable Expenses"];
        this.Variable_Expenses_Percent = sorted["Variable Expenses%"];
        this.Personnel_Expenses = sorted["Personnel Expenses"];
        this.Personnel_Expenses_Percent = sorted["Personnel Expenses%"];
        this.Semi_Fixed_Expenses = sorted["Semi-Fixed Expenses"];
        this.Semi_Fixed_Expenses_Percent = sorted["Semi-Fixed Expenses%"];
        this.Fixed_Expenses = sorted["Fixed Expenses"];
        this.Fixed_Expenses_Percent = sorted["Fixed Expenses%"];
        this.Other_Expenses = sorted["Other Expenses"];
        this.Other_Expenses_Percent = sorted["Other Expenses%"];
        this.Total_Expenses = sorted["Total Expenses"];
        this.Operating_Profit = sorted["Operating Profit"];
        this.Adjustments_Income = sorted["Adjustments to Income"];
        // this.Manufacturer_Margin = sorted["Manufacturer Margin"];
        // this.Incentives = sorted["Incentives"];
        // this.Pack = sorted["Pack"];
        // this.Doc_Fees = sorted["Doc Fees"];
        this.Other_Adjustments = sorted["Other Adjustments"];
        this.Net_Additions_Deductions = sorted["Net Adds/Deducts"]; //sorted["Net Additions & Deductions"];
        this.Net_Profit = sorted["Net Profit"];
      }
     
    });
  }

  getAdjustedEBITDA() {
    //this.getCurrent();
    this.adjustedEBITDA = [];
    const obj = {
      "as_Id": this.DEALER_Change,
      "SalesDate": this.ChangeDate
    }
  
    this.authService.AXELPostmethod('AXELData/GetNightlyFinancialEBITDAReport', obj).subscribe(x => {
      console.log(x, 'editab');
      if (x.status == 200) {
        this.adjustedEBITDA = x.response.recordset ? x.response.recordset : [];
        this.adjustedEBITDA_Excel = x.response.recordset.map(({ SNo, ...rest }) => ({ ...rest }));
        //this.getCurrent();
        if (this.adjustedEBITDA.length > 0) {
          var sorted = {};
          for (var i = 0; i < this.adjustedEBITDA.length; i++) {
            if (sorted[this.adjustedEBITDA[i].LABLE1.replace(/[^A-Z0-9]/ig, "")] == undefined) {
              sorted[this.adjustedEBITDA[i].LABLE1.replace(/[^A-Z0-9]/ig, "")] = [];
            }
            sorted[this.adjustedEBITDA[i].LABLE1.replace(/[^A-Z0-9]/ig, "")].push(this.adjustedEBITDA[i]);
          }
          this.ad_NewGross = sorted["NewGross"];
          this.ad_UsedGross = sorted["UsedGross"];
          this.ad_ServiceGross = sorted["ServiceGross"];
          this.ad_PartsGross = sorted["PartsGross"];
          this.ad_BodyGross = sorted["BodyGross"];
         // this.ad_Wholesales = sorted["Wholesales"];  // removed as per RB's requirement which was mailed by Ben
         // this.ad_Chargebacks = sorted["Chargebacks"]; // removed as per RB's requirement which was mailed by Ben        
          this.ad_TotalStoreGross = sorted["TotalStoreGross"];
          sorted["ManufacturerMargin"].forEach(MMele => {
            if(MMele.SNo == 9 )
            {
              this.ad_SuperGross_ManufacturerMargin=[];
            this.ad_SuperGross_ManufacturerMargin.push(MMele);
            }
            else if(MMele.SNo == 20 )
            {
              this.ad_ManufacturerMargin=[];
            this.ad_ManufacturerMargin.push(MMele);
            }
          });

          sorted["Incentives"].forEach(MMele => {
            if(MMele.SNo == 10 )
            {
              this.ad_SuperGross_Incentives=[];
              this.ad_SuperGross_Incentives.push(MMele);}
            else if(MMele.SNo == 21 )
           {
            this.ad_Incentives=[]; 
            this.ad_Incentives.push(MMele);}
          });       
    
          this.ad_SuperGross_Pack = sorted["Pack"];
          this.ad_SuperGross_DocFees = sorted["DocFees"];
          this.ad_SuperGross_TotalStore = sorted["TotalStoreSuperGross"];
          this.ad_VariableExpenses = sorted["VariableExpenses"];
          this.ad_PersonnelExpenses = sorted["PersonnelExpenses"];
          this.ad_SemiFixedExpenses = sorted["SemiFixedExpenses"];
          this.ad_FixedExpenses = sorted["FixedExpenses"];
          this.ad_TotalExpenses = sorted["TotalExpenses"];
          this.ad_OperatingProfit = sorted["OperatingProfit"];
        //  this.ad_ManufacturerMargin = sorted["ManufacturerMargin"];
        //  this.ad_Incentives = sorted["Incentives"];
          this.ad_PackDocFees = sorted["PackDocFees"];
          this.ad_OtherAdjustments = sorted["OtherAdjustments"];
          this.ad_NetAdditionsDeductions = sorted["NetAddsDeducts"]; //sorted["NetAdditionsDeductions"];
          this.ad_NetProfit = sorted["NetProfit"];
          this.ad_FIOverRemittance = sorted["FIOverRemittance"];
          this.ad_ManagementFees = sorted["ManagementFees"];
          this.ad_ReconditioningPremium = sorted["ReconditioningPremium"];
          this.ad_Depreciation = sorted["Depreciation"];
          this.ad_OwnerCompensation = sorted["OwnerCompensation"];
          this.ad_CapitalLoanInterest = sorted["CapitalLoanInterest"];
          this.ad_AcqRelatedOther = sorted["AcqRelatedOther"];
          this.ad_SMCAddbacks = sorted["SMCAddbacks"];
          this.ad_AdjustedEBITDA = sorted["AdjustedEBITDA"];
        } else {
          this.ad_NewGross = [];
          this.ad_UsedGross = [];
          this.ad_ServiceGross = [];
          this.ad_PartsGross = [];
          this.ad_BodyGross = [];
          this.ad_TotalStoreGross = [];
          this.ad_VariableExpenses = [];
          this.ad_PersonnelExpenses = [];
          this.ad_SemiFixedExpenses = [];
          this.ad_FixedExpenses = [];
          this.ad_TotalExpenses = [];
          this.ad_OperatingProfit = [];
          this.ad_ManufacturerMargin = [];
          this.ad_Incentives = [];
          this.ad_PackDocFees = [];
          this.ad_OtherAdjustments = [];
          this.ad_NetAdditionsDeductions = [];
          this.ad_NetProfit = [];
          this.ad_FIOverRemittance = [];
          this.ad_ManagementFees = [];
          this.ad_ReconditioningPremium = [];
          this.ad_Depreciation = [];
          this.ad_OwnerCompensation = [];
          this.ad_CapitalLoanInterest = [];
          this.ad_AcqRelatedOther = [];
          this.ad_SMCAddbacks = [];
          this.ad_AdjustedEBITDA = [];
        }

      }
     
    });
  }

  getExpenseTrend() {
    const ReportDate = new DatePipe('en-US').transform(this.ChangeDate, 'dd-MMM-yyyy');
    const obj = {
      "as_Id": this.DEALER_Change,
      "SalesDate": ReportDate
    }
   
    this.authService.AXELPostmethod('AXELData/GetNightlyFinancialETReport', obj).subscribe(x => {
      debugger;
      if (x.status == 200) {
        this.ExpenseTrend = x.response.recordset;
        this.ExpenseTrend_Excel = x.response.recordset.map(({ SNo, ...rest }) => ({ ...rest }));
        console.log(this.ExpenseTrend);
        var sorted = {};
        for (var i = 0; i < this.ExpenseTrend.length; i++) {
          if (sorted[this.ExpenseTrend[i].LABLE1.replace(/[^A-Z0-9%]/ig, "")] == undefined) {
            sorted[this.ExpenseTrend[i].LABLE1.replace(/[^A-Z0-9%]/ig, "")] = [];
          }
          sorted[this.ExpenseTrend[i].LABLE1.replace(/[^A-Z0-9%]/ig, "")].push(this.ExpenseTrend[i]);
        }
        this.et_NewGross = sorted["NewGross"];
        this.et_UsedGross = sorted["UsedGross"];
        this.et_ServiceGross = sorted["ServiceGross"];
        this.et_PartsGross = sorted["PartsGross"];
        this.et_BodyGross = sorted["BodyGross"];
        this.et_TotalStoreGross = sorted["TotalStoreGross"];

        
        sorted["ManufacturerMargin"].forEach(MMele => {
          if(MMele.SNo == 7 )
          {
            this.et_SuperGross_ManufacturerMargin=[];
          this.et_SuperGross_ManufacturerMargin.push(MMele);
          }
          else if(MMele.SNo == 79 )
          {
            this.et_ManufacturerMargin=[];
          this.et_ManufacturerMargin.push(MMele);
          }
        });
        sorted["Incentives"].forEach(MMele => {
          if(MMele.SNo == 8 )
          {
            this.et_SuperGross_Incentives=[];
          this.et_SuperGross_Incentives.push(MMele);
          }
          else if(MMele.SNo == 80 )
          {
            this.et_Incentives=[];
          this.et_Incentives.push(MMele);
          }
        });       
        sorted["Pack"].forEach(MMele => {
          if(MMele.SNo == 9 )
          {
            this.et_SuperGross_Pack= [];
          this.et_SuperGross_Pack.push(MMele);
          }
          else if(MMele.SNo == 81 )
          {this.et_Pack = [];
            this.et_Pack.push(MMele);
          }
        });     
        sorted["DocFees"].forEach(MMele => {
          if(MMele.SNo == 10 )
         { 
          this.et_SuperGross_DocFees=[];
           this.et_SuperGross_DocFees.push(MMele);}
          else if(MMele.SNo == 82 )
         { 
          this.et_DocFees=[];
           this.et_DocFees.push(MMele);}
        });     
        this.et_TotalStoreSuperGross = sorted["TotalStoreSuperGross"];

        this.et_VariableExpensePercentOfSuperGross = sorted["VariableExpense%ofSuperGross"];
        this.et_PersonnelExpensePercentOfSuperGross = sorted["PersonnelExpense%ofSuperGross"];
        this.et_SemiFixedExpensePercentOfSuperGross = sorted["SemiFixedExpense%ofSuperGross"];
        this.et_FixedExpensePercentOfSuperGross = sorted["FixedExpense%ofSuperGross"];
        this.et_TotalExpensePercentOfSuperGross = sorted["TotalExpense%ofSuperGross"];
        this.et_OperatingProfit = sorted["OperatingProfit"];
        this.et_OtherAdjustments = sorted["OtherAdjustments"];
        this.et_NetAddsDeducts = sorted["NetAddsDeducts"];
        this.et_NetProfit = sorted["NetProfit"];    



        this.et_RCIncentives = sorted["RepresentativeCompIncentives"];
        this.et_compensation = sorted["FinanceLeaseCompensation"];
        this.et_DelExpense = sorted["DeliveryExpense"];
        this.et_PolExpense = sorted["PolicyExpenseNewPreOwned"];
        this.et_TotalVaraibleExpense = sorted["TOTALVARIABLEEXPENSE"];
        this.et_CompManagers = sorted["CompensationManagers"];
        this.et_compAdvisors = sorted["CompensationAdvisors"];
        this.et_CompClerical = sorted["CompensationClerical"];
        this.et_CompOthers = sorted["CompensationOther"];
        this.et_vacation = sorted["LeaveVacationSickHoliday"];
        this.et_taxes = sorted["TaxesPayroll"];
        this.et_uniforms = sorted["UniformsLaundry"];
        this.et_Insurance = sorted["InsuranceEmployees"];
        this.et_pension = sorted["PensionandProfitSharing"];
        this.et_TotalPersonalExpense = sorted["TOTALPERSONNELEXPENSE"];
        this.et_MfrAdvertisingCredit = sorted["MfrAdvertisingCredit"]
        this.et_Compliance = sorted["Tier3BrandComplianceBonus"];
        this.et_MarketingExp = sorted["Tier3MarketingExpenses"];
        this.et_Advertising = sorted["OtherAdvertisingPromotion"];
        this.et_PlanInterest = sorted["FloorPlanInterest"];
        this.et_PlanAssistance = sorted["FloorPlanAssistance"];
        this.et_PolicyExp = sorted["PolicyExpServPartsBody"];
        this.et_Training = sorted["Training"];
        this.et_TrainingCredit = sorted["TrainingCredit"];
        this.et_Demonstrator = sorted["CompanyVehicleDemonstrator"];
        this.et_VehicleExp = sorted["LoanerVehicleExpense"];
        this.et_Stationary = sorted["OfficeSuppliesStationery"];
        this.et_ToolsSupplies = sorted["SmallToolsOtherSupplies"];
        this.et_BadDebts = sorted["BadDebts"];
        this.et_DataProcessing = sorted["DataProcessing"];
        this.et_TravelEntertainment = sorted["TravelEntertainment"];
        this.et_Memberships = sorted["MembershipsDuesPublications"];
        this.et_Postage = sorted["Postage"];
        this.et_Freight = sorted["Freight"];
        this.et_Contributions = sorted["Contributions"];
        this.et_LegalAccounting = sorted["LegalAccounting"];
        this.et_Telephone = sorted["Telephone"];
        this.et_OutsideServices = sorted["OutsideServices"];
        this.et_ServiceFee = sorted["BankCreditCoServiceFees"];
        this.et_Miscellaneous = sorted["Miscellaneous"];
        this.et_TotalSemiFixedExpense = sorted["TOTALSEMIFIXEDEXPENSE"]
        this.et_Rent = sorted["Rent"];
        this.et_BrandStandards = sorted["BrandStandardsBonusMB"];
        this.et_Leaseholds = sorted["AmortizationLeaseholdsImprvmnts"];
        this.et_Repairs = sorted["RepairsMaintRealEstate"];
        this.ad_Depreciation = sorted["DepreciationBldgsImprvmnts"];
        this.et_TaxesRealEstate = sorted["TaxesRealEstate"];
        this.et_InsuranceImp = sorted["InsuranceBldgsImprvmnts"];
        this.et_Mortgages = sorted["InterestMortgages"];
        this.et_Utilities = sorted["Utilities"];
        this.et_InsuranceOther = sorted["InsuranceOther"];
        this.et_TaxesOther = sorted["TaxesOther"];
        this.et_RepairsMaintenanceEquip = sorted["RepairsMaintenanceEquip"];
        this.et_DepEquipment = sorted["DepreciationEquipment"];
        this.et_RentalEquipment = sorted["RentalEquipment"];
        this.et_TotalFixedExpense = sorted["TOTALFIXEDEXPENSE"];
        this.et_TotalExpenses = sorted["TOTALEXPENSES"];
      }
    }, () => {

    });
  }

  getVariableKPIData() {

    this.variableTBData = []; this.departmentPCData = []; this.departmentCVData = [];
    let first = this.fetchData('NU', this.DEALER_Change, this.ChangeDate);
    let second = this.fetchData('PC', this.DEALER_Change, this.ChangeDate);
    let third = this.fetchData('CV', this.DEALER_Change, this.ChangeDate);
    setTimeout(() => {

      forkJoin(first, second, third).subscribe(item => {
        this.variableTBData_Excel = item[0].map(({ SNo, ...rest }) => ({ ...rest }));
        this.departmentPCData_Excel = item[1].map(({ SNo, ...rest }) => ({ ...rest }));
        this.departmentCVData_Excel = item[2].map(({ SNo, ...rest }) => ({ ...rest }));
        this.variable_excel = [...this.variableTBData_Excel]
        this.department_Excel = [...this.departmentPCData_Excel, ...this.departmentCVData_Excel];

        console.log('item', this.variable_excel);

        this.variableTBData = item[0] ? item[0] : [];
        this.departmentPCData = item[1] ? item[1] : [];
        this.departmentCVData = item[2] ? item[2] : [];
        if (this.variableTBData.length > 0) {
          let sortedVTB = {};
          for (var i = 0; i < this.variableTBData.length; i++) {
            if (sortedVTB[this.variableTBData[i].VariableOperations.replace(/[^A-Z0-9]/ig, "")] == undefined) {
              sortedVTB[this.variableTBData[i].VariableOperations.replace(/[^A-Z0-9]/ig, "")] = [];
            }
            sortedVTB[this.variableTBData[i].VariableOperations.replace(/[^A-Z0-9]/ig, "")].push(this.variableTBData[i]);
          }
          this.vtb_RetailUnits = sortedVTB["RetailUnits"];
          this.vtb_FrontGross = sortedVTB["FrontGross"];
          this.vtb_BackGross = sortedVTB["BackGross"];
          this.vtb_RecapGrossNU = sortedVTB["RecapGrossNU"];
          this.vtb_Chargebacks = sortedVTB["Chargebacks"];
          this.vtb_Wholesales = sortedVTB["Wholesales"];
          this.vtb_VariableGross = sortedVTB["VariableGross"];
          this.vtb_ManufacturerMargin = sortedVTB["ManufacturerMargin"];
          this.vtb_Incentives = sortedVTB["Incentives"];
          this.vtb_Pack = sortedVTB["Pack"];
          this.vtb_DocFees = sortedVTB["DocFees"];
          this.vtb_TotalStoreSuperGross = sortedVTB["TotalStoreSuperGross"];
          this.vtb_FrontGrossPVR = sortedVTB["FrontGrossPVR"];
          this.vtb_BackGrossPVR = sortedVTB["BackGrossPVR"];
          this.vtb_RecapGrossPVR = sortedVTB["RecapGrossPVR"];
          this.vtb_VariableGrossPVR = sortedVTB["VariableGrossPVR"];
          this.vtb_SuperGrossPVR = sortedVTB["SuperGrossPVR"];
          
          this.vtb_RepresentativeCompIncentPVR = sortedVTB["RepresentativeCompIncentPVR"];
          this.vtb_FICompensationPVR = sortedVTB["FICompensationPVR"];
          this.vtb_DeliveryExpensePVR = sortedVTB["DeliveryExpensePVR"];
          this.vtb_PolicyExpenseNUPVR = sortedVTB["PolicyExpenseNUPVR"];
          this.vtb_TotalVariableExpensesPVR = sortedVTB["TotalVariableExpensesPVR"];

          this.vtb_RepresentativeCompIncent = sortedVTB["RepresentativeCompIncent"];
          this.vtb_FICompensation = sortedVTB["FICompensation"];          
          this.vtb_DeliveryExpense = sortedVTB["DeliveryExpense"];
          this.vtb_PolicyExpenseNU = sortedVTB["PolicyExpenseNU"];
          this.vtb_TotalVariableExpenses = sortedVTB["TotalVariableExpenses"];
          
          
          
        
         
         
          
         
          
       
          
         
     
         
          
          
        } else {
          this.vtb_BackGross = [];
          this.vtb_BackGrossPVR = [];
          this.vtb_Chargebacks = [];
          this.vtb_DeliveryExpense = [];
          this.vtb_DeliveryExpensePVR = [];
          this.vtb_FICompensation = [];
          this.vtb_FICompensationPVR = [];
          this.vtb_FrontGross = [];
          this.vtb_FrontGrossPVR = [];
          this.vtb_Incentives = [];
          this.vtb_IncentivesPVR = [];
          this.vtb_PolicyExpenseNU = [];
          this.vtb_PolicyExpenseNUPVR = [];
          this.vtb_RecapGrossNU = [];
          this.vtb_RecapGrossPVR = [];
          this.vtb_RepresentativeCompIncent = [];
          this.vtb_RepresentativeCompIncentPVR = [];
          this.vtb_RetailUnits = [];
          this.vtb_TotalVariableExpenses = [];
          this.vtb_TotalVariableExpensesPVR = [];
        }
        if (this.departmentPCData.length > 0) {
          var sortedPC = {};
          for (var i = 0; i < this.departmentPCData.length; i++) {
            if (sortedPC[this.departmentPCData[i].NewPerformance.replace(/[^A-Z0-9]/ig, "")] == undefined) {
              sortedPC[this.departmentPCData[i].NewPerformance.replace(/[^A-Z0-9]/ig, "")] = [];
            }
            sortedPC[this.departmentPCData[i].NewPerformance.replace(/[^A-Z0-9]/ig, "")].push(this.departmentPCData[i]);
          }
          this.dpc_BackGross = sortedPC["BackGross"];
          this.dpc_BackGrossPVR = sortedPC["BackGrossPVR"];
          this.dpc_Chargebacks = sortedPC["Chargebacks"];
          this.dpc_FrontGross = sortedPC["FrontGross"];
          this.dpc_FrontGrossPVR = sortedPC["FrontGrossPVR"];
          // this.dpc_Incentives = sortedPC["Incentives"];
          // this.dpc_IncentivesPVR = sortedPC["IncentivesPVR"];
          this.dpc_NewUnits = sortedPC["NewUnits"];
          this.dpc_RecapGrossNew = sortedPC["RecapGrossNew"];
          this.dpc_RecapGrossPVR = sortedPC["RecapGrossPVR"];
          this.dpc_RecapGrossUsed = sortedPC["RecapGrossUsed"];
          this.dpc_UsedUnits = sortedPC["UsedUnits"];
          this.dpc_VariableGrossNew = sortedPC["VariableGrossNew"];
          this.dpc_VariableGrossPVR = sortedPC["VariableGrossPVR"];
          this.dpc_VariableGrossUsed = sortedPC["VariableGrossUsed"];
          this.dpc_Wholesales = sortedPC["Wholesales"];
          this.dpc_WholesaleGross = sortedPC["WholesaleGross"];
          this.dpc_WholesaleGrossPVR = sortedPC["WholesaleGrossPVR"];
          this.dpc_WholesaleUnits = sortedPC["WholesaleUnits"];
        } else {
          this.dpc_BackGross = [];
          this.dpc_BackGrossPVR = [];
          this.dpc_Chargebacks = [];
          this.dpc_FrontGross = [];
          this.dpc_FrontGrossPVR = [];
          // this.dpc_Incentives = [];
          // this.dpc_IncentivesPVR = [];
          this.dpc_NewUnits = [];
          this.dpc_RecapGrossNew = [];
          this.dpc_RecapGrossPVR = [];
          this.dpc_RecapGrossUsed = [];
          this.dpc_UsedUnits = [];
          this.dpc_VariableGrossNew = [];
          this.dpc_VariableGrossPVR = [];
          this.dpc_VariableGrossUsed = [];
          this.dpc_Wholesales = [];
          this.dpc_WholesaleGross = [];
          this.dpc_WholesaleGrossPVR = [];
          this.dpc_WholesaleUnits = [];
        }
        if (this.departmentCVData.length > 0) {
          var sortedCV = {};
          for (var i = 0; i < this.departmentCVData.length; i++) {
            if (sortedCV[this.departmentCVData[i].NewPerformance.replace(/[^A-Z0-9]/ig, "")] == undefined) {
              sortedCV[this.departmentCVData[i].NewPerformance.replace(/[^A-Z0-9]/ig, "")] = [];
            }
            sortedCV[this.departmentCVData[i].NewPerformance.replace(/[^A-Z0-9]/ig, "")].push(this.departmentCVData[i]);
          }
          this.dcv_BackGross = sortedCV["BackGross"];
          this.dcv_BackGrossPVR = sortedCV["BackGrossPVR"];
          this.dcv_Chargebacks = sortedCV["Chargebacks"];
          this.dcv_FrontGross = sortedCV["FrontGross"];
          this.dcv_FrontGrossPVR = sortedCV["FrontGrossPVR"];
          this.dcv_Incentives = sortedCV["Incentives"];
          this.dcv_IncentivesPVR = sortedCV["IncentivesPVR"];
          this.dcv_NewUnits = sortedCV["NewUnits"];
          this.dcv_RecapGrossNew = sortedCV["RecapGrossNew"];
          this.dcv_RecapGrossPVR = sortedCV["RecapGrossPVR"];
          this.dcv_RecapGrossUsed = sortedCV["RecapGrossUsed"];
          this.dcv_UsedUnits = sortedCV["UsedUnits"];
        } else {
          this.dcv_BackGross = [];
          this.dcv_BackGrossPVR = [];
          this.dcv_Chargebacks = [];
          this.dcv_FrontGross = [];
          this.dcv_FrontGrossPVR = [];
          this.dcv_Incentives = [];
          this.dcv_IncentivesPVR = [];
          this.dcv_NewUnits = [];
          this.dcv_RecapGrossNew = [];
          this.dcv_RecapGrossPVR = [];
          this.dcv_RecapGrossUsed = [];
          this.dcv_UsedUnits = [];
        }
      })
    }, 500)
  
  }

  async fetchData(blockType, id, date) {
    let response: any
    const obj = {
      "BLOCK": blockType,
      "pack": this.isWithPack,
      "as_Id": id,
      "SalesDate": date
    };
    response = await this.authService.AXELPostmethod('AXELData/GetNightlyFinancialVKPIReport', obj).pipe(delay(300)).toPromise();

    return response.response.recordset ? response.response.recordset : [];
  }
  with_without_Pack(event)
  {
      this.isWithPack = event.target.value;   
      this.getVariableKPIData();
   
   // $("input [type=radio] [name=WorWOPack]").value(); 
  }
  // ChartLabel : string ="" ;
  // async openETLineChart(Label_SNo) {
  //   const SalesDate = new DatePipe('en-US').transform(this.ChangeDate, 'dd-MMM-yyyy');
  //   let response: any
  //   const obj = {
  //     "SNo": Label_SNo,
  //     "as_Id": this.DEALER_Change,
  //     "SalesDate": SalesDate
  //   };
  //   response = await this.authService.AXELPostmethod('AXELData/GetNightlyFinancialETGraph', obj).pipe(delay(300)).toPromise();

  //   if (response.response.recordset && response.status == 200) {
  //     let recordSet = response.response.recordset;
  //     let x = recordSet[0];
  //     if (x !== '') {
  //       this.lineChartData = [
  //         {
  //           data: [x.LAST_MONTH1, x.LAST_MONTH2, x.LAST_MONTH3, x.LAST_MONTH4, x.LAST_MONTH5, x.LAST_MONTH6, x.SM_MTD]
  //           , label: x.LABLE1
  //         },
  //       ];


  //       for (var i = 0; i < this.LastsixMonths.length; i++) {

  //         this.lineChartLabels.push(this.LastsixMonths[i]);
  //       }
  //       this.lineChartLabels.push(this.CurrentMonth);

  //       this.lineChartOptions = {
  //         responsive: true,
  //       };
  //       this.lineChartColors;
  //       this.lineChartLegend = true;
  //       this.lineChartPlugins = [];
  //       this.lineChartType = 'line';
  //       this.ChartLabel = x.LABLE1;
  //     }
  //   }


  //  // Do something to get api call for data 

  // }
  LabelSNo: number;
  ExpenseLabels: any[] = [];
  @Output() showLineChart: boolean = false;
  setLabelSNo(Label_SNo, tmplt) {
    this.LabelSNo = Label_SNo;
    this.showLineChart = true;
    this.ExpenseLabels = [];
    for(let i = 0; i < this.ExpenseTrend.length; i++)
    {
      let obj = { 'SNo': this.ExpenseTrend[i].SNo, 'Name' : this.ExpenseTrend[i].LABLE1 }
      this.ExpenseLabels.push(obj);
    }
    this.ngbActiveModal = this.ngbModal.open(tmplt, { size: 'sm', backdrop: 'static' });
  }
  setShowChart(event) {
    this.showLineChart = event;
  }
  XpenseTrendByStoreKeys : any[]=[]; 
  AllDatakeys: any[] =[];
 
  getExpenseTrendByStore() {
    this.ExpenseTrendByStoreKeys= [];   
    this.AllDatakeys = [];
    const ReportDate = new DatePipe('en-US').transform(this.ChangeDate, 'dd-MMM-yyyy');
    const obj = {
      "as_Id": this.DEALER_Change,
      "SalesDate": ReportDate
    }
   
    this.authService.AXELPostmethod('AXELData/GetNightlyFinancialETbyDealer', obj).subscribe(x => {
      debugger;
      if (x.status == 200) {
        this.ExpenseTrendByStore_Excel = x.response.recordset.map(({ SNo, ...rest }) => ({ ...rest }));
        this.XpenseTrendByStoreKeys = Object.keys(x.response.recordset[0]);
        let ETByStoreKeys_sorted = this.XpenseTrendByStoreKeys.filter(x => { return (x != "SNo" && x != "LABLE1" && x != "NgClass") }).sort((a,b) => a.localeCompare(b));
        let AllStore_Label = ETByStoreKeys_sorted.find(x => {if(x.toUpperCase() == "All Stores".toUpperCase()) return x;});

        ETByStoreKeys_sorted = ETByStoreKeys_sorted.splice(1);
        /* To add space between each array value to get dynamic <th>*/
        this.AllDatakeys= ["LABLE1", "NgClass"];
         for(var i =0; i<ETByStoreKeys_sorted.length; i++)
         {
          this.ExpenseTrendByStoreKeys.push(ETByStoreKeys_sorted[i]);
          this.ExpenseTrendByStoreKeys.push("");         
          this.AllDatakeys.push(ETByStoreKeys_sorted[i]);
          this.AllDatakeys.push("");
         }
        this.ExpenseTrendByStoreKeys.push(AllStore_Label);
        this.AllDatakeys.push(AllStore_Label);
        // let XpenseTrendByStoreData =  x.response.recordset;
        // let ETByStoreData_sorted = XpenseTrendByStoreData;
        // let AllStoreLabel_Data = "";
        this.ExpenseTrendByStore =  x.response.recordset;
      }
    }, () => {    
    });
  }


  variableTBByStoreKeys : any[] = [];
  variableTBByStoreData : any[] = [];

  departmentPCByStoreKeys : any[] = [];
  departmentPCByStoreData : any[] = [];

  departmentCVByStoreKeys : any[] = [];
  departmentCVByStoreData : any[] = [];
  AllDatakeys_NU : any[]= [];
  AllDatakeys_PC : any[]= [];
  AllDatakeys_CV : any[]= [];
  getVariableKPIData_ByStore() {
    this.AllDatakeys_NU = [];this.AllDatakeys_PC = [];this.AllDatakeys_CV = [];   
    this.variableTBByStoreKeys = []; this.departmentPCByStoreKeys = []; this.departmentCVByStoreKeys = [];
    this.variableTBByStoreData = []; this.departmentPCByStoreData = []; this.departmentCVByStoreData = [];

    let first = this.KPI_fetchDataByStore('NU', this.DEALER_Change, this.ChangeDate);
    let second = this.KPI_fetchDataByStore('PC', this.DEALER_Change, this.ChangeDate);
    let third = this.KPI_fetchDataByStore('CV', this.DEALER_Change, this.ChangeDate);
    setTimeout(() => {

      forkJoin(first, second, third).subscribe(item => {
        this.variableTBData_Excel = item[0].map(({ SNo, ...rest }) => ({ ...rest }));
        this.departmentPCData_Excel = item[1].map(({ SNo, ...rest }) => ({ ...rest }));
        this.departmentCVData_Excel = item[2].map(({ SNo, ...rest }) => ({ ...rest }));
        this.variable_excel = [...this.variableTBData_Excel]
        this.department_Excel = [...this.departmentPCData_Excel, ...this.departmentCVData_Excel];

        console.log('item', this.variable_excel);

        this.variableTBByStoreData = item[0] ? item[0] : [];
        this.departmentPCByStoreData = item[1] ? item[1] : [];
        this.departmentCVByStoreData = item[2] ? item[2] : [];
        
       

        /* For Variable Trends*/ 
        if (this.variableTBByStoreData.length > 0) {   
          
          for(var i = 0; i<this.variableTBByStoreData.length; i++ )
          {
            if(this.variableTBByStoreData[i]["VariableOperations"].toUpperCase() == "Incentives PVR".toUpperCase())
            {
              this.variableTBByStoreData.splice(i+1,0, {VariableOperations:'VARIABLE EXPENSES - PVR'});i++;
            }
            else if(this.variableTBByStoreData[i]["VariableOperations"].toUpperCase() == "Total Variable Expenses PVR".toUpperCase())
            {
              this.variableTBByStoreData.splice(i+1,0, {VariableOperations:'VARIABLE EXPENSES - TOTAL'});i++;
            }            
            
          }
           
          let variableTBDataByStoreKeys = Object.keys(this.variableTBByStoreData[0]);
          let variableTBDataStoreKeys_sorted = variableTBDataByStoreKeys.filter(x => { return (x != "SNo" && x != "VariableOperations" && x != "NgClass") }).sort((a,b) => a.localeCompare(b));
          let AllStore_Label_NU = variableTBDataStoreKeys_sorted.find(x => {if(x.toUpperCase() == "All Stores".toUpperCase()) return x;});
  
          variableTBDataStoreKeys_sorted = variableTBDataStoreKeys_sorted.splice(1);
          /* To add space/"" between each array value to get dynamic <th>*/
          this.AllDatakeys_NU= ["VariableOperations", "NgClass"];
           for(var i =0; i<variableTBDataStoreKeys_sorted.length; i++)
           {
            this.variableTBByStoreKeys.push(variableTBDataStoreKeys_sorted[i]);
            this.variableTBByStoreKeys.push("");         
            this.AllDatakeys_NU.push(variableTBDataStoreKeys_sorted[i]);
            this.AllDatakeys_NU.push("");
           }
          this.variableTBByStoreKeys.push(AllStore_Label_NU);
          this.AllDatakeys_NU.push(AllStore_Label_NU);         
         
        }

     /* For Department Passenger Cars*/ 
        if (this.departmentPCByStoreData.length > 0) {      
          
          for(var i = 0; i<this.departmentPCByStoreData.length; i++ )
          {
            if(this.departmentPCByStoreData[i]["NewPerformance"].toUpperCase() == "Used Units".toUpperCase())
            {
              this.departmentPCByStoreData.splice(i-1,0, {NewPerformance:'USED PERFORMANCE'});
              break;
            }                      
            
          }


          let departmentPCDataByStoreKeys = Object.keys(this.departmentPCByStoreData[0]);
          let departmentPCByStoreKeys_sorted = departmentPCDataByStoreKeys.filter(x => { return (x != "SNo" && x != "NewPerformance" && x != "NgClass") }).sort((a,b) => a.localeCompare(b));
          let AllStore_Label_PC = departmentPCByStoreKeys_sorted.find(x => {if(x.toUpperCase() == "All Stores".toUpperCase()) return x;});
  
          departmentPCByStoreKeys_sorted = departmentPCByStoreKeys_sorted.splice(1);
          /* To add space/"" between each array value to get dynamic <th>*/
          this.AllDatakeys_PC= ["NewPerformance", "NgClass"];
           for(var i =0; i<departmentPCByStoreKeys_sorted.length; i++)
           {
            this.departmentPCByStoreKeys.push(departmentPCByStoreKeys_sorted[i]);
            this.departmentPCByStoreKeys.push("");         
            this.AllDatakeys_PC.push(departmentPCByStoreKeys_sorted[i]);
            this.AllDatakeys_PC.push("");
           }
          this.departmentPCByStoreKeys.push(AllStore_Label_PC);
          this.AllDatakeys_PC.push(AllStore_Label_PC);
         
         
        }

         /* For Department Commercial Vans*/ 
        if (this.departmentCVByStoreData.length > 0) {        
          
          for(var i = 0; i<this.departmentCVByStoreData.length; i++ )
          {
            if(this.departmentCVByStoreData[i]["NewPerformance"].toUpperCase() == "Incentives PVR".toUpperCase())
            {
              this.departmentCVByStoreData.splice(i+1,0, {NewPerformance:'USED PERFORMANCE'});
              break;
            }                      
            
          }

          let departmentCVDataByStoreKeys = Object.keys(this.departmentCVByStoreData[0]);
          let departmentCVDataByStoreKeys_sorted = departmentCVDataByStoreKeys.filter(x => { return (x != "SNo" && x != "NewPerformance" && x != "NgClass") }).sort((a,b) => a.localeCompare(b));
          let AllStore_Label_CV = departmentCVDataByStoreKeys_sorted.find(x => {if(x.toUpperCase() == "All Stores".toUpperCase()) return x;});
  
          departmentCVDataByStoreKeys_sorted = departmentCVDataByStoreKeys_sorted.splice(1);
          /* To add space/"" between each array value to get dynamic <th>*/
          this.AllDatakeys_CV= ["NewPerformance", "NgClass"];
           for(var i =0; i<departmentCVDataByStoreKeys_sorted.length; i++)
           {
            this.departmentCVByStoreKeys.push(departmentCVDataByStoreKeys_sorted[i]);
            this.departmentCVByStoreKeys.push("");         
            this.AllDatakeys_CV.push(departmentCVDataByStoreKeys_sorted[i]);
            this.AllDatakeys_CV.push("");
           }
          this.departmentCVByStoreKeys.push(AllStore_Label_CV);
          this.AllDatakeys_CV.push(AllStore_Label_CV);
         
         
        }

      })
    }, 500)
  
  }

  async KPI_fetchDataByStore(blockType, id, date) {
    let response: any
    const obj = {
      "BLOCK": blockType,
      "as_Id": id,
      "SalesDate": date
    };
    response = await this.authService.AXELPostmethod('AXELData/GetNightlyFinancialVKPIbyDealer', obj).pipe(delay(300)).toPromise();

    return response.response.recordset ? response.response.recordset : [];
  }


  VTBvsVTS(subcategory, tab) {
    this.SubTab_Active = subcategory;
    if (tab == '3') {

      if (subcategory == 'B') {
        this.getExpenseTrend();
        this.EXPENSEBudget = true;
        this.EXPENSEStores = false;
      }

      if (subcategory == 'S') {
        this.getExpenseTrendByStore();
        this.EXPENSEBudget = false;
        this.EXPENSEStores = true;
      }

    }

    if (tab == '4') {

      if (subcategory == 'B') {
        this.VKPIBudget = true;
        this.VKPIStores = false;
        this.getVariableKPIData();
      }

      if (subcategory == 'S') {
        this.VKPIBudget = false;
        this.VKPIStores = true;
        this.getVariableKPIData_ByStore();
      }

    }
  }

   refreshClick(){
   this.myLastRefreshPromise().then(() => {this.LastRefresh();}); 
}

myLastRefreshPromise = function refreshData(){
  let APImethod = '';
  if(this.TabChange == '1' || this.TabChange == '2')
  {
    APImethod = 'AXELData/GetFinancesummaryDataload';
  } 
  else if(this.TabChange == '3')
  {
    APImethod = 'AXELData/GetFinanceETRefresh';
  }
  else if(this.TabChange == '4')
  {
    APImethod = 'AXELData/GetFinanceVKPIRefresh';
  }
    const obj={     
    }
  let response =  this.authService.AXELPostmethod(APImethod,obj).toPromise();  
  return response;
  }

 LastRefresh(){
  let APImethod = '';
  if(this.TabChange == '1' || this.TabChange == '2')
  {
    APImethod = 'AXELData/GetFSRefreshDates';
  } 
  else if(this.TabChange == '3')
  {
    APImethod = 'AXELData/GetFinanceETRefreshDates';
  }
  else if(this.TabChange == '4')
  {
    APImethod = 'AXELData/GetFinanceVKPIRefreshDates';
  }
 const obj = {}
   this.authService.AXELPostmethod(APImethod,obj).subscribe((x:any) =>{
     if(x.status == 200){ 
       let element =  x
       this.GLTbleLstRfr = x.response.recordset[0].Last_Refreshed_Date_in_GLTable;
       this.OurTbleLstRfr = x.response.recordset[0].Last_Refreshed_Date_in_OurTable
     //  console.log(this.GLTbleLstRfr,"GL data");     
       
     }
   });
 }

 RedirectToBudgetScreen()
 {
  this.authService.setFinanceBudgetVariable_StoreID(this.DEALER_Change);
   this.router.navigate(['FinancialBudgetVariables']);
 }
  // exportAsXLSX() {
  //   if (this.TabChange == '1') { this.excelService.exportAsExcelFile(this.ReportGridData_Excel, 'Store_Summary_Report'); }
  //   else if (this.TabChange == '2') { this.excelService.exportAsExcelFile(this.adjustedEBITDA_Excel, 'Adjusted_EBITDA_Report'); }
  //   else if (this.TabChange == '3') { this.excelService.exportAsExcelFile(this.ExpenseTrend_Excel, 'Expense_Trend_Report'); }
  //   else if (this.TabChange == '4') {
  //     this.excelService.exportAsExcelFile(this.variable_excel, 'Variable_KPI_Report');
  //     this.excelService.exportAsExcelFile(this.department_Excel, 'Variable_KPI_Dept_Report');
  //   }
  // }

  exportAsXLSX() {

    if (this.TabChange == '1') {
      let element = document.getElementById('Summary-table');
      this.excelService.ExportTableToExcel(element, 'Store_Summary_Report');
    }
    else if (this.TabChange == '2') {
      let element = document.getElementById('adjustedEBITDA-table');
      this.excelService.ExportTableToExcel(element, 'Adjusted_EBITDA_Report');
    }
    else if (this.TabChange == '3') {
      let element = document.getElementById('ExpenseTrend-table');
      this.excelService.ExportTableToExcel(element, 'Expense_Trend_Report');
    }
    else if (this.TabChange == '4') {
      let element = document.getElementById('VariableKPI_1');
      let element1 = document.getElementById('VariableKPI_2');
      let element2 = document.getElementById('VariableKPI_3');
      this.excelService.ExportMultipleTablesToExcel(element, element1, element2, 'Variable_KPI_Report');
      //  this.excelService.ExportTableToExcel(this.department_Excel, 'Variable_KPI_Dept_Report');
    }
  }
}
