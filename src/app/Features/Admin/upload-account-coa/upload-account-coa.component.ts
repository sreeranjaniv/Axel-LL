import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { FileUploadService } from "src/app/Core/_shared-services/file-upload.service"; 
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-upload-account-coa',
  templateUrl: './upload-account-coa.component.html',
  styleUrls: ['./upload-account-coa.component.scss']
})
export class UploadAccountCOAComponent implements OnInit {

  FileName:any;
  i = 0;
  Viewmore = false;
  ExcelData = [];
  list_item = [];
  keys:any;
  progress: number = 0;
  File;
  form: FormGroup;
  convertedJson!: string;
  Spacereplace:any = [];
  output:any;
  blob:any;
  isLoading: boolean = false;

  constructor( private authService: ApiService,
    private spinnerService: Ng4LoadingSpinnerService,private http: HttpClient,
    public fb: FormBuilder,private fileUploadService: FileUploadService ) { }
    
  ngOnInit() {
     this.GetGridData(0);
  }
  
  
  onFileChange(event:any){
    this.File = event.target.files[0];
    console.log(this.File,"file");
     this.FileName = <File>event.target.files[0].name;
  }

  Submit(){
    this.spinnerService.show();
    this.isLoading = true;
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.File);
    fileReader.onload = (event)=>{
      let binaryData = fileReader.result;
      let workbook = XLSX.read(binaryData, {type: 'binary'});
      console.log(workbook);
       workbook.SheetNames.forEach((Sheet) =>{
        if(Sheet == 'accountmap'){
          console.log(Sheet,"accountmapsheet");
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[Sheet]);
           this.convertedJson = (((JSON.stringify(data,undefined,4)).replace(/ /g,'')).replace(/'/g,"''")).replace(/&/g,'and'); // 4 -- space
           console.log('Spacereplace',this.convertedJson);
          this.output = eval("this.OBJtoXML("+this.convertedJson+");")
          console.log(this.output);
             this.XMLFileSave();
         // this.XMLToTable(this.output);
        }
        else {
          (Sheet == 'Sheet1')
          console.log(Sheet,"sheet1");
           const data = XLSX.utils.sheet_to_json(workbook.Sheets[Sheet]);
           this.convertedJson = (((JSON.stringify(data,undefined,4)).replace(/ /g,'')).replace(/'/g,"''")).replace(/&/g,'and'); // 4 -- space
           console.log('Spacereplace',this.convertedJson);
          this.output = eval("this.OBJtoXML("+this.convertedJson+");")
          console.log(this.output);
            this.XMLFileSave();
        }
       })
     }
    }

    
  OBJtoXML(obj) {
    var xml = '<accountmap>';
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += "<" + prop + ">";
          xml += this.OBJtoXML(new Object(obj[prop][array]));
          xml += "</" + prop + ">";
        }
      } else if (typeof obj[prop] == "object") {
        xml += this.OBJtoXML(new Object(obj[prop]));
      }
      else {
        xml += obj[prop];
      }
       xml +=obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
       var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
      xml +='</accountmap>';
      return xml
  }


  public blobToFile = (theBlob: Blob, fileName:string): File => {      
    return new File([theBlob], fileName)
  }

  
  XMLFileSave(){
    let date = new Date().toISOString().slice(0,10);
   let filename = "AccountCOA";
     let file = filename+"_"+date+'.xml';
    this.blob = this.blobToFile(this.output,file);
//  var blob = new Blob([this.output], { type: 'text/plain;charset=utf-8' });
//      FileSaver.saveAs(blob, file);
    const formData = new FormData();
    formData.append("file",  this.blob);
    // this.authService.AXELPostmethod("Login/AccountCOAExcelFileUpload",formData).subscribe((x:any)=>{
      this.fileUploadService.ImportFromExcel(this.blob).subscribe((x:any)=>{
      switch(x.type){
               case HttpEventType.UploadProgress:
               this.progress = Math.round((100 / x.total) * x.loaded);
              console.log(`Uploaded! ${this.progress}%`);
              break;
              case HttpEventType.Response:
              this.progress = null;
              console.log('File Uploaded Sucessfully!', x.body);
             }
             if(x.status == 200){
          console.log(x,'result');
         this.ImportExcelToTable(this.blob)
             }
    
  });
    
  }

  ImportExcelToTable(blob){
    // this.spinnerService.show();
    const obj={
      "FileName":blob.name
    }
    console.log(obj,'ImportExcelToTable')
    this.spinnerService.show();
    this.authService.AXELPostmethod('Login/ImportExcelToTable',obj).subscribe(x=>{
      console.log('upload');
      if(x.status == 200){
        this.GetGridData(0);
      }
    })
    // this.spinnerService.hide();
  }

  GetGridData(i){
    // this.spinnerService.show();
    const obj={
      "RECORDCOUNT":i
    }
    console.log(obj,'GridData')
    // this.spinnerService.show();
    this.authService.AXELPostmethod('Login/GetAccountCoaReport',obj).subscribe((x:any)=>{
      console.log(x.response)
      if(x.status == 200){
        if(i==0){
          this.ExcelData = x.response.recordset;
        }
        else
        for(i = 0;i<x.response.recordset.length;i++){
          this.ExcelData.push(x.response.recordset[i]);
        }
      let keys = Object.keys(this.ExcelData[0])
      this.list_item = this.ExcelData;
      this.keys = keys;
      }
      this.spinnerService.hide();
    });
  }

  ViewMore(){
    this.Viewmore = true;
    this.i = this.i+1;
    console.log('valueofi',this.i);
     this.GetGridData(this.i);
  }

}
