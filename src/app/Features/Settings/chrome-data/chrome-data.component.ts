import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ExcelService } from '../../../Core/_providers/Excel-service/excel.service';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-chrome-data',
  templateUrl: './chrome-data.component.html',
  styleUrls: ['./chrome-data.component.scss']
})
export class ChromeDataComponent implements OnInit {
Year_DD_Data : any[];
Division_DD_Data: any[];
Model_DD_Data: any[];
StylesGridData= [];
selectedValues=[];
year: any = "";
division: any = "";
make: any = "";
i=0;
viewmore = false;
  constructor(private excelService:ExcelService,private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router) { }

  ngOnInit() {
    this.YearDropDown();
    this.viewmore = false;
    this.GridStylesData();
  }
  DMSFilter(newValue, Typechange) {
    
    if(Typechange=='Year'){
      this.year = newValue.target.value;
      this.DivisionDropDown(this.year);
      
     }
     else if( Typechange=='Division'){
      this.division = newValue.target.value;
      this.ModelDropDown(this.year, this.division);
     }
     else if( Typechange=='Make'){
      this.make = newValue.target.value;

     }
  }
  YearDropDown(){
    
    const obj = {}
        this.authService.AXELPostmethod('Brands/GetModelYearsDD', obj).subscribe(x =>{
          if (x.status == 200){
            this.Year_DD_Data = x.response.recordset;
            
          }
          
        });
        
    }
      DivisionDropDown(year){
        const obj = {
          "Year":year
        }
            this.authService.AXELPostmethod('Brands/GetDivisionDD', obj).subscribe(x =>{
              if (x.status == 200){
                this.Division_DD_Data = x.response.recordset;
              }
              
            });
      }
      ModelDropDown(year, division){
        const obj = {
          "Year":year,
          "DivisionId":division
        }
            this.authService.AXELPostmethod('Brands/GetModelDD', obj).subscribe(x =>{
              if (x.status == 200){
                this.Model_DD_Data = x.response.recordset;
                console.log("MOdel", this.Model_DD_Data);
                
              }
            });
      }
      OnSubmit(){
        this.GridStylesData();
        this.viewmore = true;
      }

      GridStylesData(){
        const obj = {
                  "ModelYear":this.year,
                  "DivisionId":this.division,
                  "ModelId":this.make,
                  "StartCnt":this.i
        }
            this.authService.AXELPostmethod('Brands/GetStylesData', obj).subscribe(x =>{
              if (x.status == 200){
                if(this.i== 0){
                  this.StylesGridData=x.response.recordset;
                }
               else
                  for (let i = 0; i < x.response.recordset.length; i++) {
                  this.StylesGridData.push(x.response.recordset[i]);
                } 
                // this.StylesGridData = x.response.recordset;
                // console.log("Styles", this.StylesGridData);
                
              }
            });
      }
      ClearAll(){
        this.year = "";
        this.division = "";
        this.make = "";
      //   $("#btnReset").bind("click", function () {
      //     $("#make")[0].selectedIndex = 0;
      // });
        this.GridStylesData();
      }

      ViewMore() {
        this.viewmore = true;
        this.i= this.i + 100;
        this.GridStylesData();
      }
      exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.StylesGridData, 'Styles_Excel');
     }
}
