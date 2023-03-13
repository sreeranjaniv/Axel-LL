import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { ExcelService } from 'src/app/Core/_providers/Excel-service/excel.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-nightly-summary-variables',
  templateUrl: './nightly-summary-variables.component.html',
  styleUrls: ['./nightly-summary-variables.component.scss']
})
export class NightlySummaryVariablesComponent implements OnInit {

  Vrbleform: FormGroup;
  SummeryGrid: boolean = true;
  public SummeryForm  : FormGroup;
  EditSummery: boolean = false;
  public Dealer_DD: any = [];
  DEALER_Change: any = 0;
  dealercode: any;
  GridData: any = [];
  Drpdwn_chnge: any;
  submitted=false;
  startDate:any;
  ReportDate:any;
  vbleDrpdwnList:any=[];
  ChangeDate:any = new Date( new Date().setDate(new Date().getDate()));
    id:any = 0;
    storename:any='';
    storeab:any='';
    newunits:any= '';
    usedunits:any= '';
    recapgross:any= '';
    mfrmargin:any;
    servicegross:any;
    partsgross:any;
    mfrpvr:any;
    period:any;
    status:any= 'Y'
    HeaderDrpdwn_chnge:any=1;
    getdatemin:any =new Date().toISOString().slice(0, 10);
    GridData_excel:any=[];
   

    
  constructor(private authService: ApiService,
    private spinnerService: Ng4LoadingSpinnerService, private fb: FormBuilder,
    private excelService:ExcelService) {
    }

  ngOnInit() {
    this.storename="";
    this.Drpdwn_chnge = 1;
    this.DealerDropDown();
    this.GetGridSummary();
    this.GetVariableDropDown();
    this.getToday();
    console.log('this',this.startDate)
    this.Vrbleform = this.fb.group({
      variablename: ['',[Validators.required]],
    });
    }
   
  
  getToday(){
    this.startDate= new Date( new Date().setDate(new Date().getDate()));
  }

  updatedate(event){
    console.log('dateevent',event)
    // this.ChangeDate = new Date(event).toString();
    this.ChangeDate = event;
    this.GetGridSummary()
  }

  DealerDropDown() {
    const obj = {
      "AU_ID": localStorage.getItem('User_ID')
    };
    this.authService.AXELPostmethod('AXELData/GetCorporatesbyUser', obj).subscribe(x => {
      if (x !== '') {
        this.Dealer_DD = x.response.recordset;
        console.log("Errors", this.Dealer_DD);
      }
    });
  }

  DealerChange(newValue) {
    this.DEALER_Change = newValue.target.value;
    console.log(this.DEALER_Change, 'change')
    let list = this.Dealer_DD.filter((element) => {
      if (element.AS_ID == this.DEALER_Change) {
        this.dealercode = element.CORA_ACCT_CODE
        console.log(this.dealercode);
      }
    })
    this.storeab = this.dealercode;

  }
  HeaderDropDownchnge(event){
    this.HeaderDrpdwn_chnge = event.target.value;
    this.GetGridSummary();
  }

  GetVariableDropDown() {
    const obj = {}
    this.authService.AXELPostmethod('AXELData/GetNightlySalesVariables', obj).subscribe(x => {
      if (x !== '') {
        this.vbleDrpdwnList = x.response.recordset;
        console.log("drpdwns", this.vbleDrpdwnList);
      }
    });
  }
  DropDownchnge(newvalue) {
    this.Drpdwn_chnge = newvalue.target.value;
    console.log(this.Drpdwn_chnge, 'change1')
  }
  

  GetGridSummary() {
    const obj = {
      "NSVE_ID": 0,
      "NSVE_NSV_ID": this.HeaderDrpdwn_chnge,
       "NSVE_PERIOD": this.ChangeDate
    }
    console.log("gridobj",obj)
     this.spinnerService.show();
    this.authService.AXELPostmethod('AXELData/GetNightlySalesVariablesEntires',obj).subscribe(x=>{
      if(x !== ''){
        console.log("databinding",x);
        this.GridData = x.response.recordset;
        var excel = x.response.recordset.map(({AS_ID,...rest}) => ({...rest}));
        var excel1 = excel.map(({PERIOD,...rest}) => ({...rest}));
        var excel2 = excel1.map(({NSV_ID,...rest}) => ({...rest}));
        this.GridData_excel= excel2.map(({NSVE_ID,...rest}) => ({...rest}));
      }
      this.spinnerService.hide();
    })

  }


   edit(val) {
    console.log('edititem',val)
    this.SummeryGrid = false;
    this.EditSummery = true;
    this.id=val.NSVE_ID;
    this.storename = val.AS_ID;
    this.storeab = val.STOREAB
    this.newunits = val.NEW_UNITS;
    this.usedunits = val.USED_UNITS;
    this.recapgross = val.RECAP_GROSS;
    this.mfrmargin = val.MFR_MARGIN;
    this.servicegross = val.SERVICE_GROSS;
    this.partsgross = val.PARTS_GROSS;
    this.mfrpvr = val.MFR_PVR;
    this.period = val.PERIOD.slice(0,10);
    this.status = val.NSVE_STATUS
   }

  AddSummery() {
    this.SummeryGrid = false;
    this.EditSummery = true;
  }

  OnSubmit() {
  const obj={
    "NSVE_ID":this.id,
    "NSVE_NSV_ID":this.Drpdwn_chnge,
    "AS_ID":parseInt(this.storename),
    "STOREAB":this.storeab,
    "NEW_UNITS":parseInt(this.newunits),
    "USED_UNITS":parseInt(this.usedunits),
    "RECAP_GROSS":parseInt(this.recapgross),
    "MFR_MARGIN":parseInt(this.mfrmargin),
    "SERVICE_GROSS":parseInt(this.servicegross),
    "PARTS_GROSS":parseInt(this.partsgross),
    "MFR_PVR":parseInt(this.mfrpvr),
    "PERIOD":this.period,
    "STATUS":this.status,
    "USER_ID":parseInt(localStorage.getItem("User_ID"))
  }
        console.log('obj',obj)
         this.authService.AXELPostmethod('AXELData/NSalesVarEntiresAction',obj).subscribe((resp:any)=>{
            console.log('response',resp);
            if(resp.status== 200){
              if(this.id > 0 && this.id !== ""){
                alert("Record Updated Successfully");
                this.GetGridSummary();
              }
            else{
              alert("Record Added Successfully");
            }
             this.BackToGrid()
             
            }
            else if(resp.status ==401 ){
              alert("Store Already Exists");
            }
          });
  }
  
  BackToGrid() {
    this.SummeryGrid = true;
    this.EditSummery = false;
    this.clearAll();
  }

  AddButn(){
    this.submitted = false;
    this.Vrbleform.reset();
  }

  UpdateVariable(){
    this.submitted = true;
    console.log(this.Vrbleform);
    if(this.Vrbleform.invalid){
       console.log("invalid");
       $("#AddGroup").modal('show');
     }
    const formValue = this.Vrbleform.value;
    const obj={
      "NSV_ID":0,
      "NSV_NAME":formValue.variablename,
      "NSV_STATUS":"Y",
      "USER_ID":localStorage.getItem("User_ID")
  }
  console.log("vrblname", obj);
   this.authService.AXELPostmethod('AXELData/NightlySalesVariablesAction',obj).subscribe((x:any)=>{
    console.log('namecheck',x);
    if(x.response == 200){
        this.vbleDrpdwnList =x.response.recordset;
        $("#AddGroup").modal('hide');
    }
    else{
      alert(" Variable Name already exists");
      $("#AddGroup").modal('show');
    }
    this.GetVariableDropDown();
  })
  }

  clearAll(){
    this.id='';
    this.storename = '';
    this.storeab = '';
    this.newunits = '';
    this.usedunits = '';
    this.recapgross = '';
    this.mfrmargin = '';
    this.servicegross = '';
    this.partsgross = '';
    this.mfrpvr = '';
    this.period = '';
    this.status = 'Y';
  }

  exportAsXLSX() {

    this.excelService.exportAsExcelFile(this.GridData_excel, 'Nightly_Summary_Variable_Report');
   
  }
}
