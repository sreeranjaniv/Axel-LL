import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ExcelService } from '../../../Core/_providers/Excel-service/excel.service';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';

@Component({
  selector: 'app-kiosk-report',
  templateUrl: './kiosk-report.component.html',
  styleUrls: ['./kiosk-report.component.scss']
})
export class KioskReportComponent implements OnInit {
  public Dealer_DD: any =[]; 
  DEALER_Change: any=0
  public ServiceAppointment_Excel:any[];
  ServiceAppointmentsCurrentDate: any[]=[];
  ChangeDate : any = '';
  varNoShow : any = '';
  varIsNoShowExist : any = false;
  varTotalCount : any= 0;
  varNoShowCount : any = 0;
  constructor(private excelService:ExcelService, private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router) { }
  ngOnInit() {
   
    this.ChangeDate =new Date( new Date().setDate(new Date().getDate())).toISOString().split('T')[0];
    this.ServiceAppointments();
    this.DealerDropDown();
  }
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.ServiceAppointment_Excel, 'ServiceAppointments');
 }
 getToday(): string {

  var InputDate = new Date( new Date().setDate(new Date().getDate()));
  return InputDate.toISOString().split('T')[0];

  //  if(this.ReportDate == null && this.TabChange == '1')
  // return InputDate.toISOString().split('T')[0];
  // else if(this.ReportDate == null && this.TabChange != '1')
  // return new Date().toISOString().split('T')[0];
  // else  if(this.ReportDate != null)
  //  return new Date(new Date().setDate(new Date(this.ReportDate).getDate())).toISOString().split('T')[0];
 // return "";
}
 DealerChange(newValue){
  this.DEALER_Change = newValue.target.value;
  this.ServiceAppointments();
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
 ServiceAppointments(){  
 // this.ServiceAppointmentsCurrentDate = [];
  const obj= {
    "AU_ID":localStorage.getItem('User_ID'),
    "AS_ID":this.DEALER_Change,
    "REPORT_DATE":this.ChangeDate,
    "NOSHOW" : this.varNoShow
    }
    
      this.spinnerService.show();
      this.authService.AXELPostmethod('AXELData/GetServiceAppointmentsCurrentDate',obj).subscribe(x =>{
        if (x.status == 200){
          if(x.response.recordset[0].NOSHOWFLAG == undefined)
          this.varIsNoShowExist =  false;
          else
          this.varIsNoShowExist =  true;
          this.varNoShow = '';
          this.varTotalCount = x.response.output.TOTAL_COUNT;
          this.varNoShowCount = x.response.output.NOSHOW_COUNT; 
          this.ServiceAppointmentsCurrentDate = x.response.recordset;
          
          this.ServiceAppointment_Excel= x.response.recordset.map(({AS_ID,...rest}) => ({...rest}));
          console.log("ServiceAppointmentsCurrentDate", this.ServiceAppointmentsCurrentDate);
        }
      });
}

updateDate(event) {
  //new Date( new Date().setDate(new Date().getDate())).toISOString().split('T')[0];
  this.ChangeDate = new Date(event).toISOString().split('T')[0];
  this.ServiceAppointments();
}
checkNoShow(event)
{
 let chkNoShow = event.target;
 if (chkNoShow.checked) {
   this.varNoShow = 'Y';
 }
 else
 {
  this.varNoShow = '';
 }
 this.ServiceAppointments();

}

}

