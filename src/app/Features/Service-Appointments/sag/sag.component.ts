import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';
import {ExcelService} from 'src/app/Core/_providers/Excel-service/excel.service';


@Component({
  selector: 'app-sag',
  templateUrl: './sag.component.html',
  styleUrls: ['./sag.component.scss']
})
export class SAGComponent implements OnInit {
  public AllHeaderkeys:any[];
  public All_LOC_Header:any[];
  public Required_HeaderKey:any[];
  public Appointment_Loc_Name_Grid:any[];
  Marketdays : any = '7';
  valueFromChild: string;
  CoraCodes: any ;
  keys: any[];
  constructor(private excelService:ExcelService, private spinnerService: NgxSpinnerService, 
    private authService: ApiService, private router: Router,
    public globalVarComponent: GlobalVariablesComponent) { }


  ngOnInit() {
    setTimeout(() => {
      this.authService.getCoraVals().subscribe(Codes => this.SAGAppiontmentReport(Codes))
     }, 1500);
  }
  MarketDays(value:string){
    this.Marketdays = value;
    this.SAGAppiontmentReport("");
}
exportAsXLSX() {
  this.excelService.exportAsExcelFile(this.Appointment_Loc_Name_Grid, 'SAG_Report');
}   
  SAGAppiontmentReport(Codes){
    const obj= {"AU_ID":localStorage.getItem('User_ID'),"marketdays":this.Marketdays, "AS_IDs":Codes}
        this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetSagAppointmentReportStoreBased',obj).subscribe(x =>{
          if (x.status == 200){
            this.AllHeaderkeys = Object.keys(x.response.recordset[0]);
            this.Required_HeaderKey = this.AllHeaderkeys.slice(1);
            this.Appointment_Loc_Name_Grid = x.response.recordset;
            this.keys = this.AllHeaderkeys.slice(1);
          }
            this.spinnerService.hide();
        });
        
      }

}
