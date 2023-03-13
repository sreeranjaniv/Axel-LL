import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';

@Component({
  selector: 'app-residual-calculator',
  templateUrl: './residual-calculator.component.html',
  styleUrls: ['./residual-calculator.component.scss']
})
export class ResidualCalculatorComponent implements OnInit {

  SelectedYear: any = 0;
  SelectedMake: any = 0;
  SelectedMileage: any = 0;
  //SelectedTerm: any = 0;
  SalePriceval: any = 0;
  DownPayval: any = 0;
  Price: any = 0;
  KBBpriceval: any;
  CalculatorForm: FormGroup;

  date = new Date().getFullYear()
  years: any = [];
  Term: any = 0;
  // TERM: any = [
  //   { id: 1, data: 12 },
  //   { id: 2, data: 24 },
  //   { id: 23, data: 36 }
  // ];
  startYear = new Date().getFullYear()
  endYear = new Date().getFullYear() - 3;
  Mileagedata: any;
  Mdata: any = [];
  Branddata: any;
  Residualdata: any = [];
  submitted = false;
  KBBcntrl = new FormControl(null, { updateOn: 'blur' });
  Salecntrl = new FormControl(null, { updateOn: 'blur' });
  DownPaycntrl = new FormControl(null, { updateOn: 'blur' });
  NetCntrl = new FormControl(null, { updateOn: 'blur' });
  data: any;
  Number = '';
  Number2 = '';
  Number3 = '';
  dpprice = 0;
  kbprice = 0;
  saleprice = 0;
  RVoutputs: any = [];
  ResidualValue = 0;
  submit1: boolean = false;
  isShow: boolean = false
  isHide: boolean = true;
  CurrentMileageVal: any = 0;
  constructor(private router: Router, private Calculatordata: FormBuilder, private authService: ApiService,  private spinnerService: Ng4LoadingSpinnerService,) {
    this.CalculatorForm = this.Calculatordata.group({
      SalesPrice: [''],
      KBBprice: ['', [Validators.required]],
      CMileage: [''],
      Year: ['', [Validators.required]],
      Make: ['',[Validators.required]],
      Mileage: ['', [Validators.required, Validators.maxLength(10)]],
      Term: ['', [Validators.required, this.defaultValueOrRangeValidator(0, Validators.min(12), Validators.max(36)
      ),]],
      DownPay: [''],
      Price: [''],
      CurrentMileage: [''],

    });
  }

  ngOnInit() {
    this.GetBrand();
    this.GetMileage();
    // console.log(this.date);
    // console.log(this.startYear);
    // console.log(this.endYear);
    for (let i = this.startYear; i >= this.endYear; i--) {
      this.years.push({ years: i })
      console.log(i);
    }

  }
  defaultValueOrRangeValidator(
    defaultValue: number,
    ...rangeValidators: ValidatorFn[]
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == defaultValue) return null;

      for (let validator of rangeValidators) {
        if (validator(control)) return validator(control);
      }
    };
  }
  get Form() {
    return this.CalculatorForm.controls;
  }
  focusFunction(e, e1) {
    console.log(e, e1);
    if (e1 != "") {
      this.Number = e
    }
    //  this.KBBcntrl.setValue(e)
  }
  focus(e) {
    console.log(e);

    if (e != '') {
      // this.KBBcntrl.setValue(e);
      this.Number = e;
    }
  }
  keyupvalue(e) {
    console.log(e)
    this.Number = e.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  }
  focusFunction1(e, e1) {
    console.log(e);
    if (e1 != "") {
      this.Number2 = e
    }
  }
  focus1(e) {
    console.log(e);

    if (e != '') {
      // this.KBBcntrl.setValue(e);
      this.Number2 = e;
    }
  }
  keyupvalue1(e) {
    console.log(e)
    this.Number2 = e.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  }
  focusFunction2(e, e1) {
    console.log(e);
    if (e1 != "") {
      this.Number3 = e
    }
  }
  focus2(e) {
    console.log(e);
    if (e != '') {
      // this.KBBcntrl.setValue(e);
      this.Number3 = e;
    }
  }
  keyupvalue2(e) {
    console.log(e)
    this.Number3 = e.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  }
  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  a: any = []
  GetMileage() {
    const obj = {
      "VariableType": "Mileage"

    }
    this.authService.AXELPostmethod('RCData/GetRCVariableInputs', obj).subscribe((Data: any) => {
      this.Mileagedata = Data.response.recordset;
      this.Mileagedata = this.Mileagedata.sort((low, high) => low.Mileage - high.Mileage);
      console.log("response", this.Mileagedata);
    })
  }
  GetBrand() {
    const obj = {
      "VariableType": "Make"
      
    }
    this.authService.AXELPostmethod('RCData/GetRCVariableInputs', obj).subscribe((Data: any) => {
      this.Branddata = Data.response.recordset;
      console.log("response", this.Branddata);

    })
  }
  SelectedDisable(){
    if (this.CalculatorForm.controls.Year.value == "" || this.CalculatorForm.controls.Mileage.value == "" || this.CalculatorForm.controls.Term.value == "" || this.Term == 0 || this.CalculatorForm.controls.Make.value == "") {
      this.CalculatorForm.controls.KBBprice.disable()
      this.CalculatorForm.controls.SalesPrice.disable()
      this.CalculatorForm.controls.DownPay.disable()

    }
    else {
      this.CalculatorForm.controls.KBBprice.enable()
      this.CalculatorForm.controls.SalesPrice.enable()
      this.CalculatorForm.controls.DownPay.enable()
    }
    if (this.kbprice == 0) {
    }
    
    else {
      this.CalculateRV(this.CalculatorForm.value);
    }
  }
  selectedYear(e) {

    this.SelectedYear = e.target.value;
    // console.log(this.CalculatorForm.controls.Year.value);
    // console.log(this.SelectedYear);

    this.SelectedDisable();

  }
  selectedMake(e) {

    this.SelectedMake = e.target.value;

    this.SelectedDisable();

  }
  selectedMileage(e) {
    this.SelectedMileage = e.target.value;
    this.SelectedDisable();
  }
  // selectedTerm(e) {
  //   this.SelectedTerm = e.target.value;
  // }

  DownPayEntry(e) {
    this.DownPayval = e.target.value;
    let a = e.target.value.replace(/\,/g, '')
    this.dpprice = parseInt(a, 10)
    if (isNaN(this.dpprice))
      this.dpprice = 0;
    //this.Price = this.kbprice - this.dpprice;
    this.CalculatorForm.get('DownPay').setValue(this.DownPayval);
    this.CalculateRV(this.CalculatorForm.value);
  }
  SalePriceEntry(e) {
    this.SalePriceval = e.target.value;
    let b = e.target.value.replace(/\,/g, '')
    this.saleprice = parseInt(b, 10)
    this.CalculatorForm.get('SalesPrice').setValue(this.SalePriceval);
    this.CalculateRV(this.CalculatorForm.value);
  }
  CurrentMileage(e) {
    this.CurrentMileageVal = e.target.value;
    console.log(this.CurrentMileageVal);
    if(isNaN(this.CurrentMileageVal))
    this.CurrentMileageVal = 0;
    this.SelectedDisable();
  }

  KBBpriceEntry(e) {
    this.KBBpriceval = e.target.value;
    let c = e.target.value.replace(/\,/g, '')
    this.kbprice = parseInt(c, 10)
    if (isNaN(this.kbprice))
      this.kbprice = 0;
    // this.Price = this.kbprice - this.dpprice;
    this.CalculatorForm.get('KBBprice').setValue(this.KBBpriceval);
    this.CalculateRV(this.CalculatorForm.value);
  }
  TermEntry(e) {
    this.submit1 = true
    this.Term = e.target.value;
    if(isNaN(this.Term))
    this.Term = 0;
    this.SelectedDisable();
  }
  CalculateRV(value) {
    this.spinnerService.show();

    this.RVoutputs = [];

    const obj = {
      "KBBPrice": this.kbprice,
      "SalePrice": this.saleprice,
      "Year": this.SelectedYear,
      "Make": this.SelectedMake,
      "Mileage": this.SelectedMileage,
      "CurrentMileage":this.CurrentMileageVal,
      "Term": this.Term,
      "DownPay": this.dpprice
    }
    console.log(obj);

    this.authService.AXELPostmethod('RCData/ResidualCalculator', obj).subscribe((Data: any) => {
      console.log(Data.response);
      this.Residualdata = Data.response.recordset;
      this.Price = this.Residualdata[0].Net_Price;
      this.ResidualValue = this.Residualdata[0].Residual;
      this.spinnerService.hide();
    })

  }

  Calculate() {
    this.submitted = true;
    this.submit1 = true;
    if (this.CalculatorForm.invalid) {
      return;
    }
    this.RVoutputs[0] = { "Residual": "-", "Lease_Payment": "-" };
    this.RVoutputs[0].Residual = this.Residualdata[0].Residual;
    this.RVoutputs[0].Lease_Payment = this.Residualdata[0].Lease_Payment;
  }

}
