import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
// import { NgxLoader } from 'ngx-http-loader';
import { Location } from '@angular/common';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from '../../../Partials/global-variables/global-variables.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { __await } from 'tslib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial-budget-variables',
  templateUrl: './financial-budget-variables.component.html',
  styleUrls: ['./financial-budget-variables.component.scss']
})
export class FinancialBudgetVariablesComponent implements OnInit {
  // loader = NgxLoader;
  Dateflag: any = 0;
  @Input() storeID: number;
  DEALER_Change: number;
  ChangeDate: any;

  public GetStores: any = [];

  //Edit variables
  edit_Parent_ID: number = 0;
  edit_Total_Budget_Value: any;
  edit_Parent_Name: any;
  tmplt: any = "";
  constructor(private router: Router, private location: Location, public globalVarComponent: GlobalVariablesComponent, private authService: ApiService, private ngbActiveModal: NgbActiveModal, private ngbModal: NgbModal,) {


  }

  ngOnInit() {


    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";
    this.getCurrentMonth();
    this.StoresData();

  }

  StoresData() {
    const obj = { "AU_ID": localStorage.getItem('User_ID') };
    this.authService.AXELPostmethod('AXELData/GetCorporatesbyUser', obj).subscribe(x => {
      if (x !== '') {
        this.GetStores = x.response.recordset;

        this.authService.getFinanceBudgetVariable_StoreID().subscribe(as_id => {
          console.log("FSBV ========", as_id);
          if (as_id > 0) { this.DEALER_Change = as_id }
          else {
            this.DEALER_Change = this.GetStores[0].AS_ID;
          }
        });
        this.BudgetVariables('P');
      }
    });
  }

  budgetVariablesData: any[] = [];
  budgetChildVariablesData: any[] = [];
  AllDatakeys: any[] = [];
  AllChildDatakeys: any[] = [];
  BudgetVariables(FBV_TYPE) {
    let obj: any;
    if (FBV_TYPE == 'P') {
      obj = {
        "FBV_TYPE": FBV_TYPE,
        "FBV_FBV_ID": 0,
        "AS_ID": this.DEALER_Change,
        "DATE": this.BudgetDate
      };
    }
    else if (FBV_TYPE == 'C') {
      obj = {
        "FBV_TYPE": FBV_TYPE,
        "FBV_FBV_ID": this.edit_Parent_ID,
        "AS_ID": this.DEALER_Change,
        "DATE": this.BudgetDate
      };
    }
    this.authService.AXELPostmethod('AXELData/GetFinanceBudgetVariable', obj).subscribe(x => {
      if (x !== '') {
        if (FBV_TYPE == 'P') {
          this.budgetVariablesData = x.response.recordset;
          this.AllDatakeys = ["LABEL", "", "BUDGET_VALUE", "", "EDIT"];
          console.log(this.budgetVariablesData);
        }
        else if (FBV_TYPE == 'C') {
          this.AllChildDatakeys = Object.keys(x.response.recordset[0]);
          this.AllChildDatakeys = this.AllChildDatakeys.splice(1);
          this.budgetChildVariablesData = x.response.recordset;
          // this.AllDatakeys= ["LABEL", "", "BUDGET_VALUE", "", "EDIT"];
          console.log(this.budgetChildVariablesData);
          this.ngbActiveModal = this.ngbModal.open(this.tmplt, { size: 'sm', backdrop: 'static' });
        }
      }
    });
  }
  DealerChange(newValue) {
    this.DEALER_Change = newValue.target.value;
    this.BudgetVariables('P');
  }

  updatedate(event) {
    this.Dateflag = 1;
    this.ChangeDate = event;
    this.getCurrentMonth();
    this.BudgetVariables('P');
  }

  BudgetDate: any;
  getCurrentMonth() {

    let currentDate: any;
    if (this.Dateflag == 0) {
      this.ChangeDate = moment(new Date()).add(-1, 'M');
      currentDate = this.ChangeDate.toISOString().split('T')[0];
      if (this.ChangeDate._i.getMonth() > 9)
        this.BudgetDate = this.ChangeDate._d.getFullYear() + '-' + this.ChangeDate._i.getMonth();
      else if (this.ChangeDate._i.getMonth() < 9)
        this.BudgetDate = this.ChangeDate._d.getFullYear() + '-0' + this.ChangeDate._i.getMonth();
    }
    else {
      if (new Date(this.ChangeDate).toString().includes('GMT+')) // For IST
      {
        currentDate = this.ChangeDate;
      }
      else if (new Date(this.ChangeDate).toString().includes('GMT-')) // FOR US STANDARD TIMES
      {
        currentDate = this.ChangeDate;
        this.ChangeDate = moment(new Date(this.ChangeDate)).add(1, 'M');
      }
      this.BudgetDate = currentDate;
    }

  }

  populateEditPopUp(Variable_Parent_ID, Var_Name, Budget_Value, tmplt) {
    this.edit_Parent_ID = Variable_Parent_ID;
    this.edit_Parent_Name = Var_Name;
    this.edit_Total_Budget_Value = Budget_Value;
    this.tmplt = tmplt;

    this.BudgetVariables('C');



    // let myPromise = new Promise(function(){this.BudgetVariables('C'); }); 
    // myPromise.then(function(){
    //   this.ngbActiveModal = this.ngbModal.open(tmplt, { size: 'sm', backdrop: 'static' });
    // }) ;
  }
  CloseEditPopup() {
    this.ngbActiveModal.dismiss();
    this.ngbActiveModal.close();
  }

  SaveBudgetValues() {


    let UpdateStatus = 'N';
    for (var i = 0; i < this.budgetChildVariablesData.length; i++) {
      const obj = {
        //  "SVD_ID":this.edit_recId,
        "SVD_AS_ID": this.DEALER_Change,
        "SVD_BT_ID": this.budgetChildVariablesData[i]["SVD_BT_ID"],
        "SVD_PERIOD": this.BudgetDate,
        "SVD_BUDGET_VALUE_PV": this.budgetChildVariablesData[i]["SVD_BUDGET_VALUE_PV"],
        "SVD_BUDGET_VALUE_CV": this.budgetChildVariablesData[i]["SVD_BUDGET_VALUE_CV"],
        "SVD_USERID": localStorage.getItem('User_ID')
      };
      console.log(obj);
      this.authService.AXELPostmethod('AXELData/SalesVariablesAction', obj).subscribe(x => {
        if (x.status == '200') {

          if (UpdateStatus == 'N') {
            this.BudgetVariables('P');
            this.CloseEditPopup();
            alert("Record Updated Successfully");
            UpdateStatus = 'Y';
          }

        }
      });

    }
    // mySavePromise().then( x => {this.BudgetVariables('P') ; 
    // this.CloseEditPopup();  
    // alert("Record Updated Successfully");}  );



  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    else {
      return true;
    }
  }
  PreviousUrl() {
    this.location.back();
    //this.router.navigate(['FinancialSummary']);
  }
}
