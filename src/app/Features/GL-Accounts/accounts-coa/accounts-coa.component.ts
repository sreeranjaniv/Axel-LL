import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';

@Component({
  selector: 'app-accounts-coa',
  templateUrl: './accounts-coa.component.html',
  styleUrls: ['./accounts-coa.component.scss']
})
export class AccountsCoaComponent implements OnInit {

  Acc_COA_Data: any[];
  DDLAccountType : any[];
  DDLCOATYPE : any[];
  i=0;
  viewmore = false;
  CORAACCTCODE = "";
  ACCOUNTTYPE = "";
  COATYPE = "";
  
  SearchData = {
    CORAACCTCODE: '',
 };
  constructor(private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router, private globalVarComponent : GlobalVariablesComponent) { }

  ngOnInit(): void {
    this.viewmore = false;
    this.AccountTypeDDL();
    this.COATypeDDL();
    this.GridBind();
  }

  AccountTypeDDL(){
    const obj = {}
    this.authService.AXELPostmethod('AXELData/GetAccountsCOAAccountTypeDD',obj).subscribe(x =>{
      this.DDLAccountType = x.response.recordset;
    });
  }
  COATypeDDL(){
    const obj = {}
    this.authService.AXELPostmethod('AXELData/GetAccountsCOACOATypeDD',obj).subscribe(x =>{
      this.DDLCOATYPE = x.response.recordset;
    });
  }
  DMSFilter(newValue, Typechange) {
    
    if(Typechange=='COAType'){
      this.CORAACCTCODE = newValue.target.value;
     }
     else if( Typechange=='AccountType'){
      this.ACCOUNTTYPE = newValue.target.value;
     }
  }
  GridBind(){
    this.viewmore = true;
    const obj = 
    {
      "CORAACCTCODE":this.SearchData.CORAACCTCODE,
      "ACCOUNTTYPE":this.ACCOUNTTYPE, 
      "COATYPE":this.CORAACCTCODE,
      "StartCnt":this.i
      };
      this.spinnerService.show();
    this.authService.AXELPostmethod('AXELData/GetAccountsCOA',obj).subscribe(x =>{
      if(x !== ''){
        if(this.i== 0){
            this.Acc_COA_Data=x.response.recordset;
          }
         else
            for (let i = 0; i < x.response.recordset.length; i++) {
            this.Acc_COA_Data.push(x.response.recordset[i]);
          } 
        }
            this.spinnerService.hide();
      });
  }
  ClearAll(){
    this.SearchData.CORAACCTCODE = "";
    this.ACCOUNTTYPE = "";
    this.CORAACCTCODE = "";
    // this.DDLAccountType = [];
    this.GridBind();
    
  }
  ViewMore() {
    this.viewmore = true;
    this.i= this.i + 100;
    this.GridBind();
  }

  OnSubmit(){
    this.GridBind();
  } 

}
