// import {Location, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';
import { Location ,DatePipe} from '@angular/common';

@Component({
  selector: 'app-powered-by-axel-ico',
  templateUrl: './powered-by-axel-ico.component.html',
  styleUrls: ['./powered-by-axel-ico.component.scss']
})
export class PoweredByAxelICOComponent implements OnInit {

  searchKeyWord: any;
  ICOData: any;
  bootstrap: any;
  status: any;
  selectStatus: any = "";
  config: any;
  blob: any;
  vechDet: FormGroup;
  FirstCustomerDet: FormGroup;
  SecondCustomerDet: FormGroup;
  ThirdCustomerDet: FormGroup;
  driverLicenseName: any;
  driverLicenseImg: any;
  registrationName: any;
  registrationImg: any;
  odometer:any;
  odometerImgName:any;
  payoff_LetterName: any;
  payoff_LetterImg: any;
  miscellaneousName: any;
  miscellaneousImg: any;
  titleImageName: any;
  titleImage: any;
  date: any;
  issuedate: any;
  editObj: any;
  CarRegst: any;
  DriverLicense: any;
  PayOff:any;
  Misc:any;
  TtleImg:any;




  constructor(public globalVarComponent: GlobalVariablesComponent, private authService: ApiService,
    private spinnerService: Ng4LoadingSpinnerService, private location: Location, private ngbActiveModal: NgbActiveModal,
    private fB: FormBuilder, private datepipe: DatePipe, private ngbModal: NgbModal) { }

  ngOnInit() {
    this.signin();
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";

    this.vechDet = this.fB.group({
      date: [''], vin: [''], year: [''], make: [''], model: [''],
      purchaseprice: [''], body: [''], odometer: [''], vehicleOwnershp: [''],
      ttlePresent: [''], mtlpeowners: [''], allparties: [''], ttleno: [''],
      ttldoc: [''], ttldte: [''], loanlease: [''], loansrce: [''], acctnmbr: [''],
      payoffamont: [''], status: ['']
    })

    this.FirstCustomerDet = this.fB.group({
      firstName: [''], lastName: [''], email: [''], phone: [''],
      address: [''], city: [''], state: [''], zip: ['']
    })
    this.SecondCustomerDet = this.fB.group({
      firstName: [''], lastName: [''], email: [''], phone: [''],
      address: [''], city: [''], state: [''], zip: ['']
    })
    this.ThirdCustomerDet = this.fB.group({
      firstName: [''], lastName: [''], email: [''], phone: [''],
      address: [''], city: [''], state: [''], zip: ['']
    })
  }





  signin() {
    this.spinnerService.show();
    this.authService.SigninICO('auth/signin').subscribe((x: any) => {
      localStorage.setItem('token', x.response)
      this.GetGridData();
    })
  }
  GetGridData() {
    this.spinnerService.show();
    const obj = {
      "Phone": "",
      "StartCnt": 0
    }
    this.spinnerService.show();
    this.authService.GetIVR('ico/get', obj).subscribe((x: any) => {
      this.config = {
        itemsPerPage: 20,
        currentPage: 1,
        totalItems: x.response.count
      }

      console.log(x, "response");
      this.ICOData = x.response;
      this.spinnerService.hide();

    })
  }

  handlePageChange(event) {
    console.log(event)
    this.config.currentPage = event;
    // this.GetGridData()
  }

  PreviousUrl() {
    this.location.back();
  }
  ClickURL(event) {
    console.log("event click")
    window.open(event, '_blank');
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    return new File([theBlob], fileName)
  }

  downloadImage(url: any, name: any) {
    fetch(url)
      .then(resp => resp.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert('An error sorry'));

  }
  edit(item: any) {
    this.editObj = item
    let date;
    let issuedate;
    console.log(item)
      this.driverLicenseName = item.DRIVER_LICENSE_FILE_NAME,
      this.registrationName = item.CAR_REGISTRATION_FILE_NAME,
      this.payoff_LetterName = item.TENDAY_PAYOFF_LETTER_FILE_NAME,
      this.miscellaneousName = item.MISCELLANEOUS_DOCUMENT_FILE_NAME,
      this.odometerImgName = item.ODOMETER_IMAGE_FILE_NAME,  
      this.titleImageName = item.TITLE_IMAGE_FILE_NAME,
      console.log( this.driverLicenseName)
      console.log( this.registrationName)

      this.registrationImg = item.CAR_REGISTRATION,
      this.payoff_LetterImg = item.TENDAY_PAYOFF_LETTER,
      this.miscellaneousImg = item.MISCELLANEOUS_DOCUMENT,
      this.titleImage = item.TITLE_IMAGE,
      this.driverLicenseImg = item.DRIVER_LICENSE,
      this.odometer = item.ODOMETER_IMAGE,
      

      date = this.datepipe.transform(item.CREATED_TS, 'yyyy-MM-dd'),
      issuedate = this.datepipe.transform(item.TITLE_DATE_ISSUED, 'yyyy-MM-dd'),
      console.log(issuedate, ' this.issuedate')
      this.vechDet = this.fB.group({
      date: [date], vin: [item.VIN], year: [item.VEHICLE_YEAR], make: [item.VEHICLE_MAKE],
      model: [item.VEHICLE_MODE], purchaseprice: [item.PURCHASE_PRICE], body: [item.VEHICLE_BODY],
      odometer: [item.ODOMETER], vehicleOwnershp: [item.VEHICLE_OWNERSHIP],
      ttlePresent: [item.TITLE_PRESENT], mtlpeowners: [item.MULTIPLE_OWNERS], allparties: [item.ALlPARTIES_AVAILABLE],
      ttleno: [item.TITLE_NUMBER], ttldoc: [item.TITLE_DOCUMENT], ttldte: [issuedate], loanlease: [item.LOAN_LEASE],
      loansrce: [item.LOAN_LEASE_SOURCE], acctnmbr: [item.ACCOUNT_NUMBER], payoffamont: [item.TENDAY_PAYOFF_AMOUNT],
      status: [item.ICO_STATUS]

    })
    this.FirstCustomerDet = this.fB.group({
      firstName: [item.CUST_FIRST_NAME], lastName: [item.CUST_LAST_NAME], email: [item.CUST_EMAIL], phone: [item.CUST_PHONE],
      address: [item.CUST_STREET_ADDRESS], city: [item.CUST_CITY], state: [item.CUST_STATE], zip: [item.CUST_ZIP]
    })
    this.SecondCustomerDet = this.fB.group({
      firstName: [item.CUST_2_FIRST_NAME], lastName: [item.CUST_2_LAST_NAME], email: [item.CUST_2_EMAIL], phone: [item.CUST_2_PHONE],
      address: [item.CUST_2_STREET_ADDRESS], city: [item.CUST_2_CITY], state: [item.CUST_2_STATE], zip: [item.CUST_2_ZIP]
    })
    this.ThirdCustomerDet = this.fB.group({
      firstName: [item.CUST_3_FIRST_NAME], lastName: [item.CUST_3_LAST_NAME], email: [item.CUST_3_EMAIL], phone: [item.CUST_3_PHONE],
      address: [item.CUST_3_STREET_ADDRESS], city: [item.CUST_3_CITY], state: [item.CUST_3_STATE], zip: [item.CUST_3_ZIP]
    })

  }

  driverLicenseFile:any;
  registrationFile:any;
  payoffFile:any;
  miscellaneousFile:any;
  titleImgFile:any;
  OdometerFile:any;

  fileChangeEvent(event,type) {
    console.log(type,'type')

    if (type == 'DL'){
      this.driverLicenseFile = <File>event.target.files[0];
      this.driverLicenseName = <File>event.target.files[0].name;
      console.log( this.driverLicenseName,"driverLicenseName");
    }
     
    if (type == 'CR'){
      this.registrationFile = <File>event.target.files[0];
      this.registrationName = <File>event.target.files[0].name;
      console.log( this.registrationName,"registrationName");
   }

    if(type == 'PAY'){
      this.payoffFile = <File>event.target.files[0];
      this.payoff_LetterName  = <File>event.target.files[0].name;
      console.log( this.payoff_LetterName,"payoff_LetterName");
    }
    
   if(type == "MS"){
      this.miscellaneousFile = <File>event.target.files[0];
      this.miscellaneousName = <File>event.target.files[0].name;
      console.log( this.miscellaneousName,"miscellaneousName");
   }
    
    
   if(type == 'TTL'){
      this.titleImgFile = <File>event.target.files[0];
      this.titleImageName =  <File>event.target.files[0].name;
      console.log( this.titleImageName,"titleImageName");
   
   }
    
    if(type == 'ODO'){
      this.OdometerFile = <File>event.target.files[0];
      this.odometerImgName =  <File>event.target.files[0].name;
      console.log(this.odometerImgName,"odometerImgName");
    }
   
   
  }

  update() {
    var formData: any = new FormData();

    formData.append("id", this.editObj.ID);

    formData.append("cust_first_name", this.FirstCustomerDet.get('firstName').value);
    formData.append("cust_last_name", this.FirstCustomerDet.get('lastName').value);
    formData.append("cust_street_address", this.FirstCustomerDet.get('address').value);
    formData.append("cust_city", this.FirstCustomerDet.get('city').value);
    formData.append("cust_state", this.FirstCustomerDet.get('state').value);
    formData.append("cust_zip", this.FirstCustomerDet.get('zip').value);
    formData.append("cust_email", this.FirstCustomerDet.get('email').value);
    formData.append("cust_phone", this.FirstCustomerDet.get('phone').value);

  
    formData.append("vehicle_make", this.vechDet.get('make').value);
    formData.append("vehicle_model", this.vechDet.get('model').value);
    formData.append("vehicle_year", this.vechDet.get('year').value);
    formData.append("vehicle_body", this.vechDet.get('body').value);
    formData.append("odometer", this.vechDet.get('odometer').value);
    formData.append("vin", this.vechDet.get('vin').value);
    formData.append("purchase_price", this.vechDet.get('purchaseprice').value);
    formData.append("title_number", this.vechDet.get('ttleno').value);
    formData.append("title_date_issued", this.vechDet.get('ttldte').value);
    formData.append("vehicle_ownership", this.vechDet.get('vehicleOwnershp').value);
    formData.append("title_present", this.vechDet.get('ttlePresent').value);
    formData.append("multiple_owneers", this.vechDet.get('mtlpeowners').value);
    formData.append("ALlPARTIES_AVAILABLE", this.vechDet.get('allparties').value);
    formData.append("loan_lease", this.vechDet.get('loanlease').value);
    formData.append("lease_loan_source", this.vechDet.get('loansrce').value);
    formData.append("account_number", this.vechDet.get('acctnmbr').value);
    formData.append("tendaypayoff_amount", this.vechDet.get('payoffamont').value);
    formData.append("title_document", this.vechDet.get('ttldoc').value);
    formData.append("ico_status", this.vechDet.get('status').value);

    formData.append("cust_2_first_name", this.SecondCustomerDet.get('firstName').value);
    formData.append("cust_2_last_name", this.SecondCustomerDet.get('lastName').value);
    formData.append("cust_2_street_address", this.SecondCustomerDet.get('address').value);
    formData.append("cust_2_city", this.SecondCustomerDet.get('city').value);
    formData.append("cust_2_state", this.SecondCustomerDet.get('state').value);
    formData.append("cust_2_zip", this.SecondCustomerDet.get('zip').value);
    formData.append("cust_2_phone", this.SecondCustomerDet.get('phone').value);
    formData.append("cust_2_email", this.SecondCustomerDet.get('email').value);

    formData.append("cust_3_first_name", this.ThirdCustomerDet.get('firstName').value);
    formData.append("cust_3_last_name", this.ThirdCustomerDet.get('lastName').value);
    formData.append("cust_3_street_address", this.ThirdCustomerDet.get('address').value);
    formData.append("cust_3_city", this.ThirdCustomerDet.get('city').value);
    formData.append("cust_3_state", this.ThirdCustomerDet.get('state').value);
    formData.append("cust_3_zip", this.ThirdCustomerDet.get('zip').value);
    formData.append("cust_3_email", this.ThirdCustomerDet.get('email').value);
    formData.append("cust_3_phone", this.ThirdCustomerDet.get('phone').value);
   
    formData.append("title_image",  this.titleImgFile);
    formData.append("miscellaneous_document",  this.miscellaneousFile);
    formData.append("tenday_payoff_letter",  this.payoffFile );
    formData.append("odometer_image", this.OdometerFile );
    formData.append("car_registration", this.registrationFile );
    formData.append("driver_license", this.driverLicenseFile );

    console.log(...formData);
    this.authService.ICOUpdate('ico', formData).subscribe((x:any)=>{
      console.log(x.response)
      if(x.status == 200){
        alert ("Updated Succesfully");
        document.getElementById("close").click();
        this.GetGridData();
        
      }
    })
  }

  delete(id){
 this.authService.ICODelete('ico',id).subscribe((x:any)=>{
   console.log(x.response);
   if(x.status == 200){
     alert('Record Deleted Successfully');
     this.GetGridData();
   }
 })
  }

}
