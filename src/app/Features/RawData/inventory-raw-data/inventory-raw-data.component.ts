import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../Core/_providers/Excel-service/excel.service';

@Component({
  selector: 'app-inventory-raw-data',
  templateUrl: './inventory-raw-data.component.html',
  styleUrls: ['./inventory-raw-data.component.scss']
})
export class InventoryRawDataComponent implements OnInit {
  Year_DD_Data = [];
  startDate: any;
  endDate: any;
  InvtryData = [];
  i = 0;
  viewmore = false;
  showModal = false;
  showPhotosModal = false;
  Ftsdata: any;
  Photosdata: any;
  txtStck: any;
  txtVin: any;
  GridData_excel:any=[];
 
  constructor(private authService: ApiService,
    private spinnerService: Ng4LoadingSpinnerService,
    private excelService:ExcelService) { }

  ngOnInit() {
    this.GetInvtry(0);
  }
 
  searchdata() {
      const startDateToServer = new DatePipe('en-US').transform(this.startDate, 'dd/MM/yyyy')
      const endDateToServer = new DatePipe('en-US').transform(this.endDate, 'dd/MM/yyyy')
    this.i = 0;
    const obj = {
      "StockNo": this.txtStck,
      "VIN": this.txtVin,
      "FromDate": startDateToServer,
      "ToDate": endDateToServer
    }
    console.log('searchobj', obj);
    this.InvtryData = [];
    this.GetInvtry(0, obj);

  }


  GetInvtry(i, obj = {}) {
    const startDateToServer = new DatePipe('en-US').transform(this.startDate, 'dd/MM/yyyy')
      const endDateToServer = new DatePipe('en-US').transform(this.endDate, 'dd/MM/yyyy')
    const getdata = {
      "StockNo": this.txtStck,
      "VIN": this.txtVin,
      "FromDate": startDateToServer,
      "ToDate": endDateToServer,
      "StartCnt": i
    };
    this.spinnerService.show();
    this.authService.AXELPostmethod('AXELData/GetVAutoInventoryData', getdata).subscribe(x => {
      console.log('response', x)
      if (x.status == 200) {
        if (i == 0) {
          this.InvtryData = x.response.recordset;
          console.log(this.InvtryData.length);
        }
        else
          for (i = 0; i < x.response.recordset.length; i++) {
            this.InvtryData.push(x.response.recordset[i]);
          }
      }
      this.spinnerService.hide();
    });
  }

  ViewMore() {
    this.viewmore = true;
    this.i = this.i + 50;
    this.GetInvtry(this.i);

  }

  featuresdata(x) {
    console.log('checking', x);
    this.showModal = true;
    this.showPhotosModal = false;
    this.Ftsdata = x;
    
  }
  photosdata(x) {
    console.log('checkingPhotos', x);
    this.showModal = false;
    this.showPhotosModal = true;
    this.Photosdata = x;
  }

  UrlClick(event) {
     console.log("event click")
     window.open(event, '_blank');
  }

  searchClear(){
    this.txtVin = "";
    this.txtStck = "";
    this.startDate = "";
    this.endDate = "";
    this.GetInvtry(0);
  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.InvtryData, 'Inventory_RawData_Report');
  }
}
