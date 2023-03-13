import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ExcelService } from '../../../Core/_providers/Excel-service/excel.service';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-data-dictionary',
  templateUrl: './data-dictionary.component.html',
  styleUrls: ['./data-dictionary.component.scss']
})
export class DataDictionaryComponent implements OnInit {
  DataDicData = [];
  DataDicData_Details: any[];
  DataDicData_TableData: any[];
  TabelName: any[];
  TabelName_Data: any;
  Table_Desc: any;
  keys;
  Date : any[];
  constructor(private excelService:ExcelService,private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router) { }

  ngOnInit() {
    this.GetDataDictionaryData();
  }

  GetDataDictionaryData(){
    const obj = {}
        this.spinnerService.show();
        this.authService.AXELPostmethod('Brands/GetDataDictionary', obj).subscribe(x =>{
          if (x.status == 200){
            this.DataDicData = x.response.recordset;
            console.log("this.DataDicData", this.DataDicData);
            this.Date = x.response.output.ServerDateTime;
            const dateSendingToServer = new DatePipe('en-US').transform(this.Date, 'MM/dd/yyyy hh:mm')
            // alert(dateSendingToServer);
          }
          this.spinnerService.hide();
        });
      }

      TableDetails(tablename, dbName,tabledesc){
        const obj = {"Object_Name":tablename, "Object_DB":dbName}
        this.spinnerService.show();
        this.authService.AXELPostmethod('Brands/GetDetailedDataDictionary', obj).subscribe(x =>{
          if (x.status == 200){
            this.DataDicData_Details = x.response.recordset;
            this.TabelName = tablename;
            this.Table_Desc = tabledesc;
          }
          this.spinnerService.hide();
        });
      }
      TableData(tablename, dbName){
        const obj = {"TableName":tablename, "DBName":dbName}
        this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetDataDicTablesData', obj).subscribe(x =>{
          if (x.status == 200){
            this.keys = Object.keys(x.response.recordset[0]);
            this.DataDicData_TableData = x.response.recordset;
            this.TabelName_Data = tablename;
            console.log(this.keys);
            
          }
          this.spinnerService.hide();
        });
      }
      exportAsXLSXGrid() {
        this.excelService.exportAsExcelFile(this.DataDicData, 'Data_Dictionary');
     }
      exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.DataDicData, this.TabelName + '_Excel');
     }
}
