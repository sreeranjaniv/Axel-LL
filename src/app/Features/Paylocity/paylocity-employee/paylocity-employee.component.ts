import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';

@Component({
  selector: 'app-paylocity-employee',
  templateUrl: './paylocity-employee.component.html',
  styleUrls: ['./paylocity-employee.component.scss']
})
export class PaylocityEmployeeComponent implements OnInit {

  GridData : any = [];
    viewmore = false;
    i=0;
    searchterm:any;


  constructor(private http: HttpClient,private fb: FormBuilder,private authService: ApiService,private spinnerService:Ng4LoadingSpinnerService ) { }


  ngOnInit() {
    // this.GetGridData(0);
   // let myPromise = new Promise(function (resolve){ this.spinnerService.show();this.GetGridData(); resolve("true");})
   // myPromise.then(function(){ this.spinnerService.hide();});
   this.GetGridData();
  }


  // GetGridData(i){
  //   this.spinnerService.show();
  //   const obj ={
  //     "StartCnt":i
  //   }
  //   this.authService.AXELPostmethod('AXELData/GetPaylocityEmployeeData',obj).subscribe((x:any)=>{
  //     console.log(x.response);
  //     if(x.status == 200){
  //       if(i == 0)
  //       this.GridData = x.response.recordset;
  //       else
  //       for(i = 0 ;i<x.response.recordset.length; i++ ){
  //         this.GridData.push(x.response.recordset[i])
  //       }
  //     }
  //   })
  //   this.spinnerService.hide();
  // }

  // ViewMore() {
  //   this.viewmore = true;
  //   this.i = this.i + 50;
  //   this.GetGridData(this.i);

  // }



  // GetGridData(){
  //     const obj ={
  //       "StartCnt":0
  //     }
  //     this.spinnerService.show();
  //     this.authService.AXELPostmethod('AXELData/GetPaylocityEmployeeData',obj).subscribe((x:any)=>{
  //       this.spinnerService.show();
  //        if(x.status == 200){
  //          this.GridData = x.response.recordset;
  //          console.log(this.GridData.length)
  //        }
  //       },() =>{
  //       this.spinnerService.hide();
  //       })
  //   }

  GetGridData(){
        const obj ={
          "StartCnt":0
        }
        this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetPaylocityEmployeeData',obj).subscribe((x:any)=>{
         this.GridData = x.response.recordset;
         if(x.status == 200)
         {
         setTimeout(() => {
         this.spinnerService.hide();
          // this.GetGridData = x.response.recordset;
         }, 200000);
        }
         console.log(this.GridData.length)
          })
      }
  

}
