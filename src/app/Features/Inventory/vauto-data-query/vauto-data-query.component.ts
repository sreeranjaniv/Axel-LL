import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';

@Component({
  selector: 'app-vauto-data-query',
  templateUrl: './vauto-data-query.component.html',
  styleUrls: ['./vauto-data-query.component.scss']
})

export class VAutoDataQueryComponent implements OnInit  {
  public StockType:any = [];
  public Year:any = [];
  public Brand: any =[];
  public Model: any =[];
  public Style: any =[];
  public Color: any =[];
  public Dealer_DD: any =[]; 
  public GridData: any=[];
  public Change:any="";
  public DMSSource:any=0;
  public STORETYPE_Change:any="NEW";
  public YEAR_Change:any=2021;
  public BRAND_Change:any=0;
  public MODEL_Change:any=0;
  public TRIM_Change:any=0;
  public COLOR_Change:any="";
  public PRICE_Change: any=0;
  public MILAGE_Change: any=0;
 public DEALER_Change: any=0; 
  private prev_toggle_row =0;
  private IsPrePrev_Prev ='N';
  Isinactive:boolean=false;
  IsDivinactive:boolean=false;
  IsLink_Underline:boolean=false;
 public selectedName:any;
 public selecttr:any;
  InventoryForm: FormGroup;
 public Overview_Store_Id: any=0;
 public DataQuery_Store_Id: any=0;
  constructor(private authService: ApiService, private formBuilder: FormBuilder,private router: Router, private spinnerService: NgxSpinnerService, public globalVarComponent : GlobalVariablesComponent) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.Overview_Store_Id = this.router.getCurrentNavigation().extras.state.Store_Id;
      // alert(this.Overview_Store_Id);
      
    }
   }

  ngOnInit() {
      this.InventoryForm = this.formBuilder.group({
        InventoryControl: [0],
        YearControl:[0],
        STOCKTYPEControl:['']
      });
    
    
    this.DealerDropDown();
   // this.GridBind();
  }

  RowClick(Rowno, item){
    // $("#demo1 tr td[id=3]").toggle();$("#demo1 tr td[id=5]").toggle();
    if(this.prev_toggle_row != 0  && this.IsPrePrev_Prev == 'N')
    $("#demo1>tr>td[id='td-"+this.prev_toggle_row+"']").toggle();
   if(this.prev_toggle_row != Rowno)
   { 
     $('#td-'+Rowno).toggle();
     this.IsPrePrev_Prev ='N';
     this.highlightRow(item);
  }
    else
     {
      this.IsPrePrev_Prev ='Y';
    
    if( this.selectedName !=0)
    { 
      this.selectedName =0;
      this.Isinactive = false;
    }
     else if( this.selectedName ==0)
     {
       this.highlightRow(item);
       $('#td-'+Rowno).toggle();
       this.IsPrePrev_Prev ='N';
    }
   
    }

    this.prev_toggle_row = Rowno;
}
highlightRow(item) {
  this.selecttr='';  
  this.selectedName = item.ROWNUM;
  this.Isinactive = true;  
}
DealerChange(newValue){
  this.spinnerService.show();
  this.DEALER_Change = newValue.target.value;
  this.ResetDefaultFilters();
  // this.GridBind();
  
}
ResetDefaultFilters(){
  this.spinnerService.show();
  this.ResetFiltersVariables();
  this.SetDefaultFilters("ST");
}
ResetFiltersVariables(){
  if( this.IsPrePrev_Prev != 'Y'){ $("#demo1>tr>td[id='td-"+this.prev_toggle_row+"']").toggle();}
 
  this.prev_toggle_row = 0 ;
  this.IsPrePrev_Prev = 'N';
  this.selecttr='';  
  this.selectedName = 0;
  this.Isinactive = true;  
  this.InventoryForm = this.formBuilder.group({
    InventoryControl: [this.InventoryForm.value.InventoryControl],
    YearControl:[0],
    STOCKTYPEControl:["NEW"]
    });
  // this.STORETYPE_Change="NEW";
   this.YEAR_Change=0;
  this.BRAND_Change = 0;
  this.MODEL_Change = 0;
  this.TRIM_Change = 0;
  this.COLOR_Change = "";
  this.PRICE_Change = 0;
  this.MILAGE_Change = 0;
}
DealerDropDown(){

  const obj = {"AU_ID":localStorage.getItem('User_ID') };
  
  this.authService.AXELPostmethod('AXELData/GetAxelMaxDigiDealers',obj).subscribe(x =>{
    if(x !== ''){
      if(this.Overview_Store_Id!= 0 ){
        this.InventoryForm = this.formBuilder.group({
          InventoryControl: [this.Overview_Store_Id],
          YearControl:[0],
          STOCKTYPEControl:['NEW']
        });
        
      }
      else{
        this.DataQuery_Store_Id = x.response.recordset[0].DMS_ID;
      this.InventoryForm = this.formBuilder.group({
        InventoryControl: [this.DataQuery_Store_Id],
        YearControl:[0],
        STOCKTYPEControl:['NEW']
        
      });
      }
      this.Dealer_DD=x.response.recordset;
      // console.log("Errors", this.Dealer_DD);
    }
   this.ResetDefaultFilters();
  //  this.GridBind();
    });
    
}
SetDefaultFilters(Change){
  
  if(Change == 'ST')
  this.STORETYPE_Change ="";
  else
  this.STORETYPE_Change = this.InventoryForm.value.STOCKTYPEControl;
  if(Change == "Y"){
    this.YEAR_Change = 0;
  }
  else if(Change != "ST")
  this.YEAR_Change = this.InventoryForm.value.YearControl;
  const obj = { 
    "DEALERID":this.InventoryForm.value.InventoryControl,
    "DROPDOWN_TYPE":Change,
    "STOCK_TYPE":this.STORETYPE_Change,
    "YEAR":this.YEAR_Change,
    "BRANDID":this.BRAND_Change,
    "MODELID":this.MODEL_Change,
    "STYLEID":this.TRIM_Change,
    "COLOR":this.COLOR_Change

  };
  this.spinnerService.show();
  this.authService.AXELPostmethod('AXELData/GetAxelMaxDigiInvDataQueryDropdowns',obj).subscribe(x =>{
    // console.log("ALL_DROPDOWNS", x.response.recordset);
    if(x !== ''){
      
      if(Change == "ST"){
        this.STORETYPE_Change = x.response.recordset[0].STOCKTYPE;
        this.StockType=x.response.recordset;
        this.YEAR_Change = this.YEAR_Change;
        this.BRAND_Change = 0;
        this.MODEL_Change = 0;
        this.TRIM_Change = 0;
        this.COLOR_Change = "";
        this.PRICE_Change = 0;
        this.MILAGE_Change = 0;
        this.SetDefaultFilters("Y");
        
        
      }
      
      else if(Change == "Y"){
        this.InventoryForm = this.formBuilder.group({
        InventoryControl: [this.InventoryForm.value.InventoryControl],
        YearControl:[x.response.recordset[0].YEAR],
        STOCKTYPEControl:[this.InventoryForm.value.STOCKTYPEControl]
        });
        this.Year=x.response.recordset;
        this.BRAND_Change = 0;
        this.MODEL_Change = 0;
        this.TRIM_Change = 0;
        this.COLOR_Change = "";
        this.PRICE_Change = 0;
        this.MILAGE_Change = 0;
        this.SetDefaultFilters("B");
        
      }
      else if(Change == "B"){
        this.Brand=x.response.recordset;
        this.MODEL_Change = 0;
        this.TRIM_Change = 0;
        this.COLOR_Change = "";
        this.PRICE_Change = 0;
        this.MILAGE_Change = 0;
        this.SetDefaultFilters("M");
        
      }
      else if(Change == "M"){
        this.Model=x.response.recordset;
        this.TRIM_Change = 0;
        this.COLOR_Change = "";
        this.PRICE_Change = 0;
        this.MILAGE_Change = 0;
        this.SetDefaultFilters("S");
        
      }
      else if(Change == "S"){
        this.Style=x.response.recordset;
        this.COLOR_Change = "";
        this.PRICE_Change = 0;
        this.MILAGE_Change = 0;
        this.SetDefaultFilters("C");
        
      }
      else if(Change == "C"){
        this.Color=x.response.recordset;
        this.PRICE_Change = 0;
        this.MILAGE_Change = 0;
       
        this.GridBind();
      }
      this.spinnerService.show();
    }
    });
}

SetSelectFilters(newValue, Typechange){
  
  if(Typechange=='ST'){
    // this.STORETYPE_Change = newValue.target.value;
    this.InventoryForm = this.formBuilder.group({
      InventoryControl: [this.InventoryForm.value.InventoryControl],
      YearControl:[this.InventoryForm.value.YearControl],
      STOCKTYPEControl:[newValue.target.value]
      });

    this.SetDefaultFilters("Y");
    
   }
   else if(Typechange=='Y'){
    this.InventoryForm = this.formBuilder.group({
      InventoryControl: [this.InventoryForm.value.InventoryControl],
      YearControl:[newValue.target.value],
      STOCKTYPEControl:[this.InventoryForm.value.STOCKTYPEControl]
      });
    // this.YEAR_Change = newValue.target.value;
    this.SetDefaultFilters("B");
   
   }
   else if(Typechange=='B'){
    this.BRAND_Change = newValue.target.value;
    this.SetDefaultFilters("M");
    
   }
   else if(Typechange=='M'){
    this.MODEL_Change = newValue.target.value;
    this.SetDefaultFilters("S");
    
   }
   else if(Typechange=='S'){
    this.TRIM_Change = newValue.target.value;
    this.SetDefaultFilters("C");
   }
   else if(Typechange=='C'){
    this.COLOR_Change = newValue.target.value;
    this.GridBind();
   }
   else if(Typechange=='P'){
    this.PRICE_Change = newValue.target.value;
    this.GridBind();
   }
   else if(Typechange=='MI'){
    this.MILAGE_Change = newValue.target.value;
    this.GridBind();
   }
 
}

GridBind(){
  
  let ST ;
 if(this.STORETYPE_Change == "NEW"){
    ST = 'N'
 }
  else 
  ST = 'U'

  const obj = { 
    "AU_ID": localStorage.getItem('User_ID'),
    "DEALERID":this.InventoryForm.value.InventoryControl,
    "STOCKTYPE":ST,
    "Year":this.InventoryForm.value.YearControl,
    "MAKE":this.BRAND_Change,
    "MODEL":this.MODEL_Change,
    "STYLE":this.TRIM_Change,
    "COLOR":this.COLOR_Change,
    "PRICE":this.PRICE_Change,
    "MILEAGE":this.MILAGE_Change
  };
  this.spinnerService.show();
  this.authService.AXELPostmethod('AXELData/GetAxelMaxDigiInventoryDataQuery',obj).subscribe(x =>{
    // console.log("BindGrid", x.response.recordset);
    if(x !== ''){
      this.GridData=x.response.recordset; 
      this.prev_toggle_row = 0 ;
      this.IsPrePrev_Prev = 'N';
      this.selecttr='';  
      this.selectedName = 0;
      this.Isinactive = true;
      this.spinnerService.hide();
    }
  });
}

}