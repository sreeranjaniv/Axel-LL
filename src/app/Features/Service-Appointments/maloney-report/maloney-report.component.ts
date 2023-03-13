import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/Core/_providers/Excel-service/excel.service';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';

@Component({
  selector: 'app-maloney-report',
  templateUrl: './maloney-report.component.html',
  styleUrls: ['./maloney-report.component.scss']
})
export class MaloneyReportComponent implements OnInit {
  public AllHeaderkeys:any[];
  public All_LOC_Header:any[];
  public Required_HeaderKey:any;
  public Appointment_Excel:any[];
  Service_App_Grid: any[];
  Marketdays : any = '7';
  valueFromChild: string;
  CoraCodes: any ;
  HeaderStatic: any[];
  keys: any[];
  datatime: any[];
  StoreName = "";
  public keyHead1 = "";
  public keyHead2 = "";
  public DetailedAppointmentData:any=[];
  DetailedAppointmentkeys: any = [];
  public currentDate: any =new Date();
  public DateString: any;
  APPOINTMENT_DATESTRING: any;
  constructor(private excelService:ExcelService, private spinnerService: NgxSpinnerService, private authService: ApiService, private router: Router,
    public globalVarComponent: GlobalVariablesComponent) { }
  ngOnInit() {
    this.ServiceAppointments();
  }
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.Appointment_Excel, 'ServiceAppointments');
 }
 ServiceAppointments(){
  const obj= {
    "AU_ID":localStorage.getItem('User_ID'),
    "INPUT_DATE":null
    }
      this.spinnerService.show();
      this.authService.AXELPostmethod('AXELData/GetServiceAppointments7DayReport',obj).subscribe(x =>{
        if (x.status == 200){
          this.Appointment_Excel = x.response.recordset;
          // console.log("FullData",this.Appointment_Excel);
          this.datatime = x.response.recordset[0].CompanyName;
          this.Service_App_Grid = x.response.recordset.slice(1);
          this.AllHeaderkeys = Object.keys(x.response.recordset[0]);
          this.Required_HeaderKey = this.AllHeaderkeys.slice(1, -1);
          this.keys = this.AllHeaderkeys.slice(1, -1);
          this.spinnerService.hide();
        }
      });
}

AppointmentDetailed(Code, DateString, Storename){
  var dt = this.currentDate ;
  
  if(DateString == "SCHEDULED YESTERDAY" || DateString == "YESTERDAY'S SHOWS" || DateString == "YESTERDAY'S ROS") {
    const dd = new Date(dt).getDate() -1;
    this.DateString =   (dt.getMonth() + 1) + "/" + (dd.toString().length == 1 ? '0' + dd : dd) + "/" + dt.getFullYear().toString().substr(-2);
    // alert(this.DateString );
  }
  else if(DateString == "SCHEDULED TODAY") {
    const dd = new Date(dt).getDate();
    this.DateString =   (dt.getMonth() + 1) + "/" + (dd.toString().length == 1 ? '0' + dd : dd) + "/" + dt.getFullYear().toString().substr(-2);
    // alert(this.DateString );
  }
  // else if (DateString == "7 DAY SCHEDULED TOTAL"){
  //   alert("Please select the date");
  // } 
  else {
    this.DateString = DateString.substr(DateString.indexOf(' ')+1)
    // alert(Date);
  }
  
  const obj=
    {
      "AS_ID":Code,
      "APPOINTMENT_DATESTRING":this.DateString
    };
         this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetServiceAppointmentsDetailedReportv5',obj).subscribe(x =>{
          if (x.status == 200){
            this.DetailedAppointmentkeys = Object.keys(x.response.recordset[0]);
            this.StoreName = Storename;
            this.DetailedAppointmentData = x.response.recordset;
            // console.log("Detailed", this.DetailedAppointmentData);
          }
          this.spinnerService.hide();
        });
      }
      exportAsXLSX_Detailed() {
        this.excelService.exportAsExcelFile(this.DetailedAppointmentData, this.StoreName+'_ServiceAppointments_');
     }
    HeaderIndex(index){
      var keyary= index.split(' '); 
      if(keyary.length-1 == 1)
        {
          this.keyHead1 = index.substr(0,index.indexOf(' '));
          this.keyHead2 = index.substr(index.indexOf(' '),index.length).trim();
        } else 
        { 
          this.keyHead1 = index.split(' ')[0]+' '+index.split(' ')[1];
          this.keyHead2 = index.split(' ')[2]+' '+index.split(' ')[3];
        }
        
    }
}
