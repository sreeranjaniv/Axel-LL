import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ExcelService {
constructor(private datepipe: DatePipe) { }
public exportAsExcelFile(json: any[], excelFileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   let fileDate =this.datepipe.transform(new Date(), 'MMddyyyy');
   //alert(fileDate);
   FileSaver.saveAs(data, fileName + '_export_' + fileDate + EXCEL_EXTENSION);
}

/* Export from Html table data to Excel for SINGLE sheet*/
public ExportTableToExcel(tablename,excelFileName){
  const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tablename,{raw:true,dateNF:'MMM-YYYY'});
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);

}

/* Export from Html table data to Excel for MULTIPLE sheets*/
public ExportMultipleTablesToExcel(tablename,tablename_1,tablename_2,excelFileName){
  const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tablename,{raw:true,dateNF:'MMM-YYYY'});
  const workbook: XLSX.WorkBook = { Sheets: { }, SheetNames: [] };
  workbook.SheetNames.push("Variable");
  workbook.Sheets["Variable"] = worksheet;

  const worksheet_1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tablename_1,{raw:true,dateNF:'MMM-YYYY'});
  // const workbook_1: XLSX.WorkBook = { Sheets: { }, SheetNames: [] };
  workbook.SheetNames.push("Passenger Car");
  workbook.Sheets["Passenger Car"] = worksheet_1;

  const worksheet_2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tablename_2,{raw:true,dateNF:'MMM-YYYY'});
  // const workbook_2: XLSX.WorkBook = { Sheets: { }, SheetNames: [] };
  workbook.SheetNames.push("Commercial Vans");
  workbook.Sheets["Commercial Vans"] = worksheet_2;

  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);

}
IncidentReportsXLSX() {
  let element = document.getElementById("inc_Grid");
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "sheet1");
  XLSX.writeFile(wb, "Incident.xlsx");
}
}