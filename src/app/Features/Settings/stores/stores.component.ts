import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  
  StoresForm : FormGroup;
  StoresGrid:boolean = true;
  EditStore:boolean = true;
  GroupStatus: boolean = true;
  StoresGridData: any = [];
  StoreId: any = '0';
  addeditVar:  any= "";
  lbl_Action: any ="";
  StoresArraydata = {
    DealerName: '',
    AccountingAccount: '',
    CapLoan: '',
    CompanyName: '',
    CoraAccountCode: '',
    CoraAccountId: '',
    Dealer: '',
    Flooring: '',
    Metro: '',
    MKTDays: '',
    Realestate: '',
    ServceAct: '',
    State: '',
    DealerAbbr: '',
    Status:'Y',
    Action:'A'
  }
  constructor(private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService,private router: Router, private StoreData: FormBuilder) { 
    
    this.StoresForm = this.StoreData.group({
      dealerName: [''],
      accountingAccount: [''],
      capLoan: [''],
      companyName: [''],
      coraAccountCode: [''],
      coraAccountId: [''],
      dealer: [''],
      flooring: [''],
      metro: [''],
      mKTDays: [''],
      realestate: [''],
      servceAct: [''],
      state: [''],
      dealerAbbr: [''],
      status:[''],
      avatar: [null]
    });
  }

  ngOnInit() {
    this.StoresGrid = true;
    this.EditStore =  false;
    this.GetStoresData();
  }


  GetStoresData(){
    const obj = {
      "ID":0,
      "StartCnt":0
      }
        this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetStoreData', obj).subscribe(x =>{
          if (x.status == 200){
            this.EditStore = false;
            this.StoresGridData = x.response.recordset;
            console.log("StoresGridData", this.StoresGridData);
            
          }
          this.spinnerService.hide();
        });
      }
  
      editStore(ID){
        this.lbl_Action = "Edit";
        this.addeditVar = "";
        this.GroupStatus =true;
        this.StoresGrid = false;
        this.EditStore =  true;
        const obj = {
          "ID":ID,
          "StartCnt":0
          }
        this.authService.AXELPostmethod('AXELData/GetStoreData', obj).subscribe(x =>{
          
          if (x.status == 200){
            let tempray = (x.response.recordset);
            let StoreData = tempray.filter(tempray => tempray.AS_ID === ID )
            this.StoreId = StoreData[0].AS_ID;
            this.StoresArraydata.CompanyName = StoreData[0].AS_COMPANYNAME;
            this.StoresArraydata.CoraAccountCode = StoreData[0].AS_CORA_ACCT_CODE;
            this.StoresArraydata.CoraAccountId = StoreData[0].AS_CORA_ACCT_ID;
            this.StoresArraydata.Dealer = StoreData[0].AS_DEALER;
            this.StoresArraydata.AccountingAccount = StoreData[0].AS_ACCOUNTING_ACCOUNT;
            this.StoresArraydata.ServceAct = StoreData[0].AS_SERVICE_ACT;
            this.StoresArraydata.DealerName = StoreData[0].AS_DEALERNAME;
            this.StoresArraydata.DealerAbbr = StoreData[0].AS_DEALERABBR;
            this.StoresArraydata.State = StoreData[0].AS_STATE;
            this.StoresArraydata.Metro = StoreData[0].AS_METRO;
            this.StoresArraydata.Flooring = StoreData[0].AS_FLOORING;
            this.StoresArraydata.CapLoan = StoreData[0].AS_CAPLOAN;
            this.StoresArraydata.Realestate = StoreData[0].AS_REALESTATE;
            this.StoresArraydata.Status = StoreData[0].AS_ACTIVE;
            this.StoresArraydata.Action = 'U'
            
          }
        });
      }
      AddStore(){
        this.clear();
        this.lbl_Action = "Add";
        this.addeditVar = "";
        this.GroupStatus =false;
        this.StoresGrid = false;
        this.EditStore =  true;
      }
      BackToGrid(){
        this.EditStore =  false;
        this.StoresGrid = true;
      }
      SaveStore(){
       
        const obj = {
          "ACTION" :this.StoresArraydata.Action,
          "AS_ID" :this.StoreId,
          "AS_COMPANYNAME" :this.StoresArraydata.CompanyName,
          "AS_CORA_ACCT_CODE" :this.StoresArraydata.CoraAccountCode,
          "AS_CORA_ACCT_ID" :this.StoresArraydata.CoraAccountId,
          "AS_DEALER" :this.StoresArraydata.Dealer,
          "AS_ACCOUNTING_ACCOUNT" :this.StoresArraydata.AccountingAccount,
          "AS_SERVICE_ACT" :this.StoresArraydata.ServceAct,
          "AS_DEALERNAME" :this.StoresArraydata.DealerName,
          "AS_DEALERABBR" :this.StoresArraydata.DealerAbbr,
          "AS_STATE" :this.StoresArraydata.State,
          "AS_METRO" :this.StoresArraydata.Metro,
          "AS_FLOORING" :this.StoresArraydata.Flooring,
          "AS_CAPLOAN" :this.StoresArraydata.CapLoan,
          "AS_REALESTATE" :this.StoresArraydata.Realestate,
          "AS_ACTIVE" :this.StoresArraydata.Status
          }
          this.spinnerService.show();
          if(this.StoresArraydata.DealerName == ""){
            alert("Please Enter Store Name");
          }
          else 
          {
          this.authService.AXELPostmethod('AXELData/StoreAction', obj).subscribe(x =>{
            if (x.status == 200) {
              if (this.StoresArraydata.Action === 'U' && this.StoreId > 0 && this.StoreId != "") {
                alert('Record updated successfully.');
              } else if (this.StoresArraydata.Action === 'A')
              alert('Record added successfully.');
              this.StoresGrid = true;
              this.EditStore =  false;
              this.GetStoresData();
            }
            else if (x.status == 401){alert('Record already exists.');}
            this.spinnerService.hide();
          });
        }
      }
      clear(){
        this.StoresArraydata.Action = 'A'
        this.StoreId = 0;
        this.StoresArraydata.Status = 'Y';
        this.StoresArraydata.CompanyName ="";
        this.StoresArraydata.CoraAccountCode = '';
        this.StoresArraydata.CoraAccountId = '';
        this.StoresArraydata.Dealer = '';
        this.StoresArraydata.AccountingAccount = '';
        this.StoresArraydata.ServceAct = '';
        this.StoresArraydata.DealerName = '';
        this.StoresArraydata.DealerAbbr = '';
        this.StoresArraydata.State = '';
        this.StoresArraydata.Metro = '';
        this.StoresArraydata.Flooring = '';
        this.StoresArraydata.CapLoan = '';
        this.StoresArraydata.Realestate = '';
      }
}
