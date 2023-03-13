import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ApiService } from "src/app/Core/_providers/Api-service/api.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Location } from "@angular/common";
import { GlobalVariablesComponent } from "src/app/Partials/global-variables/global-variables.component";
import { DatePipe } from "@angular/common";
import html2canvas from "html2canvas";
import { NgxCaptureService } from "ngx-capture";
import { tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { saveAs as fileSaverSave } from "file-saver";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { pairwise, startWith } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-service-contract-form",
  templateUrl: "./service-contract-form.component.html",
  styleUrls: ["./service-contract-form.component.scss"],
})
export class ServiceContractFormComponent implements OnInit {
  VehicleDet: FormGroup;
  ReasonsForCancel: FormGroup;
  ContractType: FormGroup;
  RefundDet: FormGroup;

  cancellationData: any[];
  vehicleyear: any = [];
  vehiclemake: any = [];
  vehiclemodel: any = [];
  stores: any = [];
  states: any = [];

  CollectInfo = "N";

  dtofcntrct: any;
  dtofcnclton: any;
  uploadcontract: any;
  ContractName: any;
  uploadreason: any;
  reasonName: any;
  outstandingLoan: any;
  searchQuery: string;
  cancellation: any = [];
  storedata: any = [];
  searchtype: any = "";
  statusType: any = "";

  Selectedlist: any = [];
  @ViewChild("screen", { static: false }) screen: ElementRef;
  @ViewChild("canvas", { static: false }) canvas: ElementRef;
  @ViewChild("downloadLink", { static: false }) downloadLink: ElementRef;
  // @ViewChild("screens", { static: true }) screens: any;

  picture: boolean;
  grid: boolean;
  captureimage: any;
  mainstatus: boolean;
  process: boolean;
  message: boolean;
  responceContent: any;
  cf_active: string;

  progress: number;
  progressbar: boolean;
  progresslimit: any;
  storename: any;
  requestId: any = "";
  Rows: number;
  paginationStart: number;
  paginationEnd: number;
  contract: string;
  cancel: string;
  DocumentfileName: any;
  ContractFileName: any;
  id: any;
  phoneFormat: any[] = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  submitted: boolean = false;
  chequeName: any = "";
  uploadcheque: any;
  vieworedit: any;
  cheque: string;
  refundcontract: boolean;
  gettingCount = 0;
  storeemail: any;
  prevNotes: any;
  createdts: any;
  updatedts: any;
  constructor(
    private captureService: NgxCaptureService,
    private router: Router,
    private api: ApiService,
    private fB: FormBuilder,
    private location: Location,
    public globalVarComponent: GlobalVariablesComponent,
    private datepipe: DatePipe,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    this.VehicleDet = this.fB.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      emailid: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,5}$"),
        ],
      ],
      mtdofcontact: [""],
      exportimeframe: [""],

      sellingDealership: ["", [Validators.required]],
      contract: [""],
      vin: ["", [Validators.required, Validators.minLength(17)]],
      year: ["0"],
      make: ["0"],
      model: ["0"],
      dateOfContract: [""],
      dateOfCancellation: [""],
      mileage: [""],
    });
    this.ReasonsForCancel = this.fB.group({
      customerRequest: [""],
      SalesDeal: [""],
      vehicleSold: [""],
      repossession: [""],
      satisfiedLien: [""],
      totalLossofVehicle: [""],
      other: [""],
      otheretext: [""],
      upload: [""],
      dealercancellation: [""],
    });
    this.ContractType = this.fB.group({
      type: ["0"],
      vehicleServiceContract: [""],
      gap: [""],
      ancillary: [""],
      ancillaryType: [""],
      uploadContract: [""],
    });
    this.RefundDet = this.fB.group({
      contractOwner: [""],
      address: [""],
      city: [""],
      state: [""],
      zip: [""],
      loanleasedet: [""],
      ach: [""],
      bankName: [""],
      routing: [""],
      acct: [""],
      outstandingLoan: [""],
      finame: [""],
      acnumber: [""],
      reqExpedited: [""],
      approveExpedited: [""],
      agreeCancellationTerms: [true],
      customerSignchk: [""],
      customersign: [""],
      acknowledge: [""],
    });
  }
  editstatus: any;
  refeditstatus: any;
  notes: any;
  ngOnInit() {
    this.message = false;
    this.process = false;
    this.mainstatus = false;
    this.progressbar = false;
    this.progress = 1;
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";
    this.cancellationList("L");
    this.getstores();
    this.getyear();
    // this.getstoreswithemails();
    this.getStates();
    this.storename = 0;
  }
  gap(e) {
    if (e.target.checked) {
      this.RefundDet.controls.outstandingLoan.setValue("");
      this.RefundDet.controls.ach.setValue(false);
      this.RefundDet.controls.bankName.setValue("");
      this.RefundDet.controls.routing.setValue("");
      this.RefundDet.controls.acct.setValue("");
      this.RefundDet.controls.reqExpedited.setValue(false);
      this.RefundDet.controls.approveExpedited.setValue(false);
    } else {
      this.RefundDet.controls.outstandingLoan.setValue("");
    }
  }
  reqProcessing(e) {
    if (e.target.checked == true) {
      this.RefundDet.controls.approveExpedited.setValue(true);
    } else {
      this.RefundDet.controls.approveExpedited.setValue(false);
    }
  }
  getStates() {
    const obj = {};
    this.api.postmethod("CancellationForm/GetStates", obj).subscribe((res) => {
      // console.log('store', res.response.recordset)
      this.states = res.response.recordset;
    });
  }

  getyear() {
    const obj = {
      y_id: "",
    };
    this.api.postmethod("CancellationForm/GetYears", obj).subscribe((res) => {
      // console.log('year', res)
      this.vehicleyear = res.response.recordset;
      // console.log('year', this.vehicleyear)
    });
  }
  getmake() {
    if (this.VehicleDet.value.year > 0) {
      const obj = {
        d_year: this.VehicleDet.value.year,
      };
      this.api.postmethod("CancellationForm/GetMake", obj).subscribe((res) => {
        // console.log('make', res)
        this.vehiclemake = res.response.recordset;
      });
    }
  }

  getmodel() {
    // console.log(this.VehicleDet.value.year.length, this.VehicleDet.value.make.length);
    if (this.VehicleDet.value.year > 0 && this.VehicleDet.value.make > 0) {
      // console.log("if block");
      const obj = {
        division_id: this.VehicleDet.value.make,
        year: this.VehicleDet.value.year,
      };
      this.api.postmethod("CancellationForm/GetModel", obj).subscribe((res) => {
        // console.log('model', res)
        this.vehiclemodel = res.response.recordset;
      });
    }
  }
  // getstoreswithemails(){
  //   const obj = {}
  //   this.api.postmethod('CancellationForm/GetCFGroupMails', obj).subscribe(res => {
  //     console.log('storewithemail', res.response.recordset)
  //     this.stores = res.response.recordset
  //   })
  // }

  Ancillary(event) {
    let target = event.target;
    if (target.checked) {
    } else {
      this.ContractType.controls.ancillaryType.setValue(" ");
    }
  }
  keyPressNumbers(event) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  Others(event) {
    // console.log(event.target)
    let target = event.target;
    if (target.checked) {
    } else {
      this.ReasonsForCancel.controls.otheretext.setValue(" ");
    }
  }
  PdfDownload(val) {
    if (val.CF_ACTIVE == "Open" || val.CONTRACT_TYPE == "Manufacturer") {
      let fileName =
        "https://swickardapi.axelautomotive.com/api/addfiles/" +
        val.CF_REFERENCEID +
        ".pdf";
      fileSaverSave(fileName, val.CF_REFERENCEID);
    } else {
      let fileName =
        "https://swickardapi.axelautomotive.com/api/download/" +
        val.CF_REFERENCEID +
        ".pdf";
      fileSaverSave(fileName, val.CF_REFERENCEID);
    }
  }
  changeachvalues() {
    this.RefundDet.controls.ach.setValue(false);
    this.RefundDet.controls.bankName.setValue("");
    this.RefundDet.controls.routing.setValue("");
    this.RefundDet.controls.acct.setValue("");
    this.RefundDet.controls.loanleasedet.setValue("");
    this.RefundDet.controls.finame.setValue("");
    this.RefundDet.controls.acnumber.setValue("");
  }
  getselectedrecord(e, val) {
    if (e.target.checked == true) {
      // this.Selectedlist.push(val)
      let subres = this.cancellationData.filter(
        (ele, i) =>
          ele.CF_ACTIVE == this.statusType &&
          i >= this.start &&
          i < this.end &&
          ele.status == true
      );
      if (subres.length == 3) {
        document.getElementById("warningbtn").click();
        this.responceContent = "Please select up to 3 records for PWC process.";
        //  this.message=true
        //  this.responceContent = "Please select up to 3 records for PWC process.";
        val.status = false;
        e.target.checked = false;
      } else {
        val.status = true;
      }
      //  console.log(this.cancellationData);

      // val.status = true;
      let falsearray: any = [];
      this.cancellationData.forEach((val, i) => {
        if (
          val.CF_ACTIVE == this.statusType &&
          i >= this.start &&
          i < this.end
        ) {
          if (val.status == false) {
            falsearray.push(val.status);
          }
        }
      });
      if (falsearray.length > 0) {
        this.mainstatus = false;
      } else {
        this.mainstatus = true;
      }
    } else {
      // this.Selectedlist.splice(this.Selectedlist.indexOf(val), 1);
      val.status = false;
      this.mainstatus = false;
    }
    // console.log(this.Selectedlist)
    //  this.openform(val)
  }
  SelectedDealership: any = "";
  updateEmail(e) {
    // console.log(e.target.value)

    if (e.target.value == 2) {
      document.getElementById("Epicford").click();
      // setTimeout(() => {
      //   this.editstatus=this.statusType
      // }, 100);
    } else {
      this.SelectedDealership = e.target.value;
    }

    let grpemail = this.stores.filter((item) => item.AS_ID == e.target.value);
    this.storeemail = grpemail[0].STOREMAIL;
  }
  EpicfordCancel() {
    if (this.SelectedDealership != "") {
      this.VehicleDet.controls.sellingDealership.setValue(
        this.SelectedDealership
      );
      let grpemail = this.stores.filter(
        (item) => item.AS_ID == this.SelectedDealership
      );
      this.storeemail = grpemail[0].STOREMAIL;
    } else {
      this.VehicleDet.controls.sellingDealership.setValue(this.Dealership);
      let grpemail = this.stores.filter(
        (item) => item.AS_ID == this.Dealership
      );
      this.storeemail = grpemail[0].STOREMAIL;
    }
  }

  uploadFile(e) {
    this.reasonName = e.target.value.substring(12);
    this.DocumentfileName = e.target.files[0];
    var extension = this.reasonName.substring(this.reasonName.lastIndexOf("."));
    //  '.jpg', '.png', '.jpeg', '.doc', '.docx', '.xls', '.xlsx', '.PDF',
    //  '.JPG', '.PNG', '.gif', '.GIF', '.pdf', '.DOC', '.rtf', '.RTF'
    if (
      extension != ".txt" &&
      extension != ".jpg" &&
      extension != ".png" &&
      extension != ".jpeg" &&
      extension != ".doc" &&
      extension != ".docx" &&
      extension != ".xls" &&
      extension != ".xlsx" &&
      extension != ".PDF" &&
      extension != ".JPG" &&
      extension != ".PNG" &&
      extension != ".gif" &&
      extension != ".GIF" &&
      extension != ".pdf" &&
      extension != ".pdf" &&
      extension != ".DOC" &&
      extension != ".rtf" &&
      extension != ".RTF"
    ) {
      if (extension != "") {
        this.reasonName = "";
        this.DocumentfileName = "";
        document.getElementById("warningbtn").click();
        this.responceContent =
          ' File extension " ' + extension + ' "  is not Supported to Upload';

        this.ReasonsForCancel.controls.upload.setValue("");
      }
    }
  }
  uploadCheque(e) {
    // console.log(e.target.files)
    this.chequeName = e.target.value.substring(12);
    this.uploadcheque = e.target.files[0];
    // console.log(this.uploadcheque)
  }
  uploadContract(e) {
    this.ContractName = e.target.value.substring(12);
    this.ContractFileName = e.target.files[0];
    var extension = this.ContractName.substring(
      this.ContractName.lastIndexOf(".")
    );
    //  '.jpg', '.png', '.jpeg', '.doc', '.docx', '.xls', '.xlsx', '.PDF',
    //  '.JPG', '.PNG', '.gif', '.GIF', '.pdf', '.DOC', '.rtf', '.RTF'
    if (
      extension != ".txt" &&
      extension != ".jpg" &&
      extension != ".png" &&
      extension != ".jpeg" &&
      extension != ".doc" &&
      extension != ".docx" &&
      extension != ".xls" &&
      extension != ".xlsx" &&
      extension != ".PDF" &&
      extension != ".JPG" &&
      extension != ".PNG" &&
      extension != ".gif" &&
      extension != ".GIF" &&
      extension != ".pdf" &&
      extension != ".pdf" &&
      extension != ".DOC" &&
      extension != ".rtf" &&
      extension != ".RTF"
    ) {
      if (extension != "") {
        this.ContractName = "";
        this.ContractFileName = "";
        document.getElementById("warningbtn").click();
        this.responceContent =
          ' File extension " ' + extension + ' "  is not Supported to Upload';

        this.ReasonsForCancel.controls.uploadContract.setValue("");
      }
    }
  }
  dealercancel(e) {
    this.RefundDet.controls.contractOwner.setValue("");
    this.RefundDet.controls.address.setValue("");
    this.RefundDet.controls.city.setValue("");
    this.RefundDet.controls.state.setValue("");
    this.RefundDet.controls.zip.setValue("");
    this.RefundDet.controls.outstandingLoan.setValue("");
    this.RefundDet.controls.finame.setValue("");
    this.RefundDet.controls.acnumber.setValue("");
    if (e.target.checked) {
      this.refundcontract = true;
    } else {
      this.refundcontract = false;
    }
  }
  update() {
    // if(this.VehicleDet.invalid ||  (this.RefundDet.value.outstandingLoan=='Y' && this.RefundDet.value.finame=='') || (this.RefundDet.value.outstandingLoan=='Y' && this.RefundDet.value.acnumber=='')){

    // }
    console.log(this.editstatus, this.refeditstatus);
    if (
      this.VehicleDet.value.firstName == "" ||
      this.VehicleDet.value.lastName == "" ||
      this.VehicleDet.value.phone == "" ||
      this.VehicleDet.value.emailid == "" ||
      this.VehicleDet.value.sellingDealership == 0 ||
      this.VehicleDet.value.vin == "" ||
      this.reasonName == "" ||
      (this.RefundDet.value.outstandingLoan == "Y" &&
        this.RefundDet.value.finame == "") ||
      (this.RefundDet.value.outstandingLoan == "Y" &&
        this.RefundDet.value.acnumber == "")
    ) {
      this.submitted = true;

      document.getElementById("validation").click();
    } else if (
      this.ReasonsForCancel.value.customerRequest == "" &&
      this.ReasonsForCancel.value.SalesDeal == "" &&
      this.ReasonsForCancel.value.vehicleSold == "" &&
      this.ReasonsForCancel.value.repossession == "" &&
      this.ReasonsForCancel.value.satisfiedLien == "" &&
      this.ReasonsForCancel.value.totalLossofVehicle == "" &&
      this.ReasonsForCancel.value.other == "" &&
      this.ReasonsForCancel.value.dealercancellation == ""
    ) {
      this.message = true;
      this.submitted = false;
      document.getElementById("warningbtn").click();
      this.responceContent = "Please check atleast one Reason for Cancellation";
    } else {
      this.contract = this.datepipe.transform(
        this.VehicleDet.value.dateOfContract,
        "MM-dd-yyyy"
      );
      if (this.contract == null) {
        this.contract = "";
      }
      this.cancel = this.datepipe.transform(
        this.VehicleDet.value.dateOfCancellation,
        "MM-dd-yyyy"
      );
      if (this.cancel == null) {
        this.cancel = "";
      }
      if (this.VehicleDet.value.mtdofcontact == null) {
        this.VehicleDet.value.mtdofcontact = "";
      }
      // console.log(this.DocumentfileName)
      // console.log(this.ContractFileName)
      const fd: any = new FormData();
      this.spinner.show();

      fd.append("ACTION", "U");
      fd.append("CF_ID", this.id);
      fd.append(
        "CF_CUSTFIRSTNAME",
        this.VehicleDet.value.firstName.toUpperCase()
      );
      fd.append(
        "CF_CUSTLASTNAME",
        this.VehicleDet.value.lastName.toUpperCase()
      );
      fd.append("CF_CUST_PHONE", this.VehicleDet.value.phone);
      fd.append("CF_CUST_EMAILID", this.VehicleDet.value.emailid);

      fd.append(
        "CF_PREFERRED_METHODOF_CONTACT",
        this.VehicleDet.value.mtdofcontact
      );
      fd.append("CF_AS_ID", this.VehicleDet.value.sellingDealership);
      fd.append("CF_CONTRACTNUM", this.VehicleDet.value.contract);
      fd.append("CF_VIN", this.VehicleDet.value.vin.toUpperCase());
      fd.append("CF_YEAR", this.VehicleDet.value.year);
      fd.append("CF_MAKE", this.VehicleDet.value.make);
      fd.append("CF_MODEL", this.VehicleDet.value.model);
      fd.append("CF_CONTRACTDATE", this.contract);
      fd.append("CF_CANCELLATIONDATE", this.cancel);
      fd.append("CF_MILEAGEATCANCELLATION", this.VehicleDet.value.mileage);

      fd.append(
        "CF_REASON_CUSTOMER",
        this.ReasonsForCancel.value.customerRequest ? "Y" : "N"
      );
      fd.append(
        "CF_SALES_DEAL_VOIDED",
        this.ReasonsForCancel.value.SalesDeal ? "Y" : "N"
      );
      fd.append("CF_SPtoPP_CREATED_BY", localStorage.getItem("User_ID"));
      fd.append(
        "CF_CLOSED_CREATED_BY",
        this.editstatus == "Closed" ? localStorage.getItem("User_ID") : ""
      );
      fd.append("CF_DELETED_CREATED_BY", "");

      fd.append(
        "CF_REASON_VEHICLESOLD",
        this.ReasonsForCancel.value.vehicleSold ? "Y" : "N"
      );
      fd.append(
        "CF_REASON_REPOSSESSION",
        this.ReasonsForCancel.value.repossession ? "Y" : "N"
      );
      fd.append(
        "CF_REASON_SATISFIEDLIEN",
        this.ReasonsForCancel.value.satisfiedLien ? "Y" : "N"
      );
      fd.append(
        "CF_REASON_TOTALLOSS",
        this.ReasonsForCancel.value.totalLossofVehicle ? "Y" : "N"
      );
      fd.append(
        "CF_REASON_OTHER",
        this.ReasonsForCancel.value.other ? "Y" : "N"
      );
      fd.append("CF_REASON_OTHERTEXT", this.ReasonsForCancel.value.otheretext);
      fd.append(
        "CF_REASON_IS_DEALER_CANCELLATION",
        this.ReasonsForCancel.value.dealercancellation ? "Y" : "N"
      );

      fd.append("CF_CONTRACTTYPE", this.ContractType.value.type);
      fd.append(
        "CF_CONTRACTTYPE_VSC",
        this.ContractType.value.vehicleServiceContract ? "Y" : "N"
      );
      fd.append("CF_CONTRACTTYPE_GAP", this.ContractType.value.gap ? "Y" : "N");
      fd.append(
        "CF_CONTRACTTYPE_ANCILLARY",
        this.ContractType.value.ancillary ? "Y" : "N"
      );
      fd.append(
        "CF_CONTRACTTYPE_ANCILLARYTEXT",
        this.ContractType.value.ancillaryType
      );

      fd.append("CF_CONTRACTOWNER", this.RefundDet.value.contractOwner);
      fd.append("CF_ADDRESS", this.RefundDet.value.address);
      fd.append("CF_CITY", this.RefundDet.value.city);
      fd.append("CF_STATE", this.RefundDet.value.state);
      fd.append("CF_ZIP", this.RefundDet.value.zip);
      fd.append("CF_REFUND_ACH", this.RefundDet.value.ach ? "Y" : "N");
      fd.append("CF_REFUND_ACH_BANKNAME", this.RefundDet.value.bankName);
      fd.append("CF_REFUND_ACH_ROUTINGNUM", this.RefundDet.value.routing);
      fd.append("CF_REFUND_ACH_ACCOUNTNUM", this.RefundDet.value.acct);
      fd.append(
        "CF_REFUND_ISEXISTSOUTSTANDINGLOAN",
        this.RefundDet.value.outstandingLoan
      );
      fd.append(
        "CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO",
        this.RefundDet.value.loanleasedet
      );
      fd.append("CF_REFUND_FIN_INSTITUTE", this.RefundDet.value.finame);
      fd.append("CF_REFUND_FIN_ACCTNUM", this.RefundDet.value.acnumber);
      fd.append(
        "CF_REFUND_PROCESSINGFEE",
        this.RefundDet.value.reqExpedited ? "Y" : "N"
      );
      fd.append(
        "CF_REFUND_PROCESSINGFEE_APPROVE",
        this.RefundDet.value.approveExpedited ? "Y" : "N"
      );
      fd.append(
        "CF_REFUND_TERMSAGGREEMENT",
        this.RefundDet.value.agreeCancellationTerms ? "Y" : "N"
      );
      fd.append(
        "CF_REFUND_IS_DIGITALCUSTOMERSIGN",
        this.RefundDet.value.customerSignchk ? "Y" : "N"
      );
      fd.append(
        "CF_IS_ACKNOWLEDGEMENT",
        this.RefundDet.value.acknowledge ? "Y" : "N"
      );
      fd.append("CF_CREATEDBY", localStorage.getItem("User_ID"));
      fd.append("CF_ACTIVE", this.editstatus);
      fd.append("CF_NOTES", this.notes);
      fd.append(
        "CF_REASON_UPLOADFILE",
        this.DocumentfileName == undefined ||
          this.DocumentfileName == "" ||
          this.DocumentfileName == null
          ? this.fileuploads.CF_REASON_UPLOADFILE
          : this.DocumentfileName
      );
      fd.append(
        "CF_CONTRACTTYPE_UPLOADFILE",
        this.ContractFileName == undefined ||
          this.ContractFileName == "" ||
          this.ContractFileName == null
          ? this.fileuploads.CF_CONTRACTTYPE_UPLOADFILE
          : this.ContractFileName
      );
      fd.append(
        "CF_PAYMENT_UPLOAD_CHEQUE",
        this.uploadcheque == undefined ||
          this.uploadcheque == "" ||
          this.uploadcheque == null
          ? this.fileuploads.CF_PAYMENT_UPLOAD_CHEQUE
          : this.uploadcheque
      );
      fd.append("FILENAME1", this.fileuploads.CF_REASON_UPLOADFILE);
      fd.append("FILENAME2", this.fileuploads.CF_CONTRACTTYPE_UPLOADFILE);
      fd.append("FILENAME3", this.fileuploads.CF_PAYMENT_UPLOAD_CHEQUE);
      fd.append("IMAGELINK", "");
      fd.append("CF_REFERENCEID", this.requestId);
      fd.append("MAIL", "");
      // fd.append('')
      fd.append("CF_EXPEDITE_FEE_AMOUNT", this.VehicleDet.value.exportimeframe);

      fd.append("CF_CUST_IP_ADDRESS", this.fileuploads.CF_CUST_IP_ADDRESS);
      // fd.append(
      //   "CF_REASON_UPLOADED_FILENAME",
      //   this.fileuploads.CF_REASON_UPLOADED_FILENAME
      // );
      // fd.append(
      //   "CF_CONTRACTTYPE_UPLOADED_FILENAME",
      //   this.fileuploads.CF_CONTRACTTYPE_UPLOADED_FILENAME
      // );
      // fd.append(
      //   "CF_PAYMENT_CHEQUE_UPLOADED_FILENAME",
      //   this.fileuploads.CF_PAYMENT_CHEQUE_UPLOADED_FILENAME
      // );

      console.log(fd.getAll("CF_REASON_UPLOADFILE"));
      // console.log(obj)
      this.api
        .postmethod("CancellationForm/CancellationFormAction", fd)
        .subscribe((res) => {
          console.log("update response", res);
          if (res.status == "200") {
            this.spinner.hide();
            document.getElementById("close").click();
            this.message = true;
            this.responceContent = "Record Updated Successfully";
            this.cancellationList("AP");
            // if (this.refeditstatus != this.editstatus) {
            const obj = {
              CFAL_REFERENCEID: this.requestId,
              CFAL_PREVACTIVE: this.refeditstatus,
              CFAL_ACTIVE: this.editstatus,
              CFAL_PREVNOTES: this.prevNotes,
              CFAL_NOTES: this.notes,
              CFAL_PREVCREATED_TS: this.createdts,
              CFAL_PREVUPDATED_TS: this.updatedts,
              CFAL_USERID: localStorage.getItem("User_ID"),
            };
            this.api
              .postmethod("CancellationForm/CFActiveLogAction", obj)
              .subscribe((res) => {
                console.log("update log response", res);
              });
            // }
          } else {
            alert(res.status);
          }
        });
    }
  }
  imageslink: any = [];
  count = 0;
  UpdateStatus(e) {
    this.count = 0;
    this.Selectedlist = [];
    var testarray: any = [];
    this.imageslink = [];

    this.cancellationData.forEach((val, i) => {
      if (val.CF_ACTIVE == this.statusType && i >= this.start && i < this.end) {
        if (val.status == false) {
          testarray.push(val.status);
        } else {
          // if(this.Selectedlist.length == 3 ){
          //   this.message=true;
          //   this.responceContent = 'Please Select up to 3 '
          // }
          // else{
          this.Selectedlist.push(val);
          // }
        }
      }
    });

    if (this.Selectedlist.length == 0) {
      this.message = true;
      this.responceContent = "Please Select atleast one CheckBoxes";
    } else {
      this.responceContent = "";
      this.message = false;
      this.progressbar = true;

      this.Selectedlist.forEach((data, i) => {
        this.progress++;
        setTimeout(() => {
          this.openform(data, "M");
          this.progress++;
        }, 500);
        setTimeout(() => {
          this.progress++;
          this.downloadImage(data, e);
          this.progress++;
        }, 500);
      });
      console.log(this.Selectedlist);
      this.progresslimit = Math.round(100 / this.Selectedlist.length / 2);
    }
  }
  countc = 0;
  downloadImage(value, e) {
    //
    // console.log(this.countc)
    this.progress++;
    //  if(value.CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO==null){
    //    let accno_fin=''
    //  }
    //  else{
    //   let accno_fin=value.CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO
    //  }
    if (value.CF_ACTIVE == "Open") {
      const fd: any = new FormData();
      fd.append("ACTION", "U");
      fd.append("CF_ID", value.CF_ID);
      fd.append("CF_CUSTFIRSTNAME", value.CF_CUST_FIRSTNAME);
      fd.append("CF_CUSTLASTNAME", value.CF_CUST_LASTNAME);
      fd.append("CF_CUST_PHONE", value.CUST_PHONE);
      fd.append("CF_CUST_EMAILID", value.CUST_EMAILID);
      fd.append(
        "CF_PREFERRED_METHODOF_CONTACT",
        value.CF_PREFERRED_METHODOF_CONTACT == null
          ? ""
          : value.CF_PREFERRED_METHODOF_CONTACT
      );
      fd.append("CF_AS_ID", value.CF_AS_ID);
      fd.append("CF_CONTRACTNUM", value.CONTRACT_NUM);
      fd.append("CF_VIN", value.CUST_VIN);
      fd.append("CF_YEAR", value.CF_YEAR);
      fd.append("CF_MAKE", value.CF_MAKE);
      fd.append("CF_MODEL", value.CF_MODEL);
      fd.append(
        "CF_CONTRACTDATE",
        value.CONTRACT_DATE == null ? "" : value.CONTRACT_DATE
      );
      fd.append(
        "CF_CANCELLATIONDATE",
        value.CANCELLATION_DATE == null ? "" : value.CANCELLATION_DATE
      );
      fd.append("CF_MILEAGEATCANCELLATION", value.CF_MILEAGEATCANCELLATION);
      fd.append(
        "CF_REASON_CUSTOMER",
        value.CF_REASON_CUSTOMER == null ? "" : value.CF_REASON_CUSTOMER
      );
      fd.append(
        "CF_SALES_DEAL_VOIDED",
        value.CF_SALES_DEAL_VOIDED == null ? "" : value.CF_SALES_DEAL_VOIDED
      );
      fd.append("CF_SPtoPP_CREATED_BY", value.CF_SPtoPP_CREATED_BY);
      fd.append("CF_CLOSED_CREATED_BY", value.CF_CLOSED_CREATED_BY);
      fd.append("CF_DELETED_CREATED_BY", value.CF_DELETED_CREATED_BY);
      fd.append(
        "CF_REASON_VEHICLESOLD",
        value.CF_REASON_VEHICLESOLD == null ? "" : value.CF_REASON_VEHICLESOLD
      );
      fd.append(
        "CF_REASON_REPOSSESSION",
        value.CF_REASON_REPOSSESSION == null ? "" : value.CF_REASON_REPOSSESSION
      );
      fd.append(
        "CF_REASON_SATISFIEDLIEN",
        value.CF_REASON_SATISFIEDLIEN == null
          ? ""
          : value.CF_REASON_SATISFIEDLIEN
      );
      fd.append(
        "CF_REASON_TOTALLOSS",
        value.CF_REASON_TOTALLOSS == null ? "" : value.CF_REASON_TOTALLOSS
      );
      fd.append(
        "CF_REASON_OTHER",
        value.CF_REASON_OTHER == null ? "" : value.CF_REASON_OTHER
      );
      fd.append("CF_REASON_OTHERTEXT", value.CF_REASON_OTHERTEXT);
      fd.append(
        "CF_REASON_IS_DEALER_CANCELLATION",
        value.CF_REASON_IS_DEALER_CANCELLATION == null
          ? ""
          : value.CF_REASON_IS_DEALER_CANCELLATION
      );

      fd.append("CF_CONTRACTTYPE", value.CONTRACT_TYPE);
      fd.append(
        "CF_CONTRACTTYPE_VSC",
        value.CF_CONTRACTTYPE_VSC == null ? "" : value.CF_CONTRACTTYPE_VSC
      );
      fd.append(
        "CF_CONTRACTTYPE_GAP",
        value.CF_CONTRACTTYPE_GAP == null ? "" : value.CF_CONTRACTTYPE_GAP
      );
      fd.append(
        "CF_CONTRACTTYPE_ANCILLARY",
        value.CF_CONTRACTTYPE_ANCILLARY == null
          ? ""
          : value.CF_CONTRACTTYPE_ANCILLARY
      );
      fd.append(
        "CF_CONTRACTTYPE_ANCILLARYTEXT",
        value.CF_CONTRACTTYPE_ANCILLARYTEXT
      );
      fd.append("CF_CONTRACTOWNER", value.CF_CONTRACTOWNER);
      fd.append("CF_ADDRESS", value.CF_ADDRESS);
      fd.append("CF_CITY", value.CF_CITY);
      fd.append("CF_STATE", value.CF_STATE);
      fd.append("CF_ZIP", value.CF_ZIP);
      fd.append(
        "CF_REFUND_ACH",
        value.CF_REFUND_ACH == null ? "" : value.CF_REFUND_ACH
      );
      fd.append("CF_REFUND_ACH_BANKNAME", value.CF_REFUND_ACH_BANKNAME);
      fd.append("CF_REFUND_ACH_ROUTINGNUM", value.CF_REFUND_ACH_ROUTING_NUM);
      fd.append("CF_REFUND_ACH_ACCOUNTNUM", value.CF_REFUND_ACH_ACCOUNT_NUM);
      fd.append(
        "CF_REFUND_ISEXISTSOUTSTANDINGLOAN",
        value.CF_REFUND_ISEXISTSOUTSTANDINGLOAN == null
          ? ""
          : value.CF_REFUND_ISEXISTSOUTSTANDINGLOAN
      );
      fd.append(
        "CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO",
        value.CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO == null
          ? ""
          : value.CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO
      );
      fd.append("CF_REFUND_FIN_INSTITUTE", value.CF_REFUND_FIN_INSTITUTE);
      fd.append("CF_REFUND_FIN_ACCTNUM", value.CF_REFUND_FIN_ACCTNUM);
      fd.append(
        "CF_REFUND_PROCESSINGFEE",
        value.CF_REFUND_PROCESSINGFEE == null
          ? ""
          : value.CF_REFUND_PROCESSINGFEE
      );
      fd.append(
        "CF_REFUND_PROCESSINGFEE_APPROVE",
        value.CF_REFUND_PROCESSINGFEE_APPROVE == null
          ? ""
          : value.CF_REFUND_PROCESSINGFEE_APPROVE
      );
      fd.append("CF_REFUND_TERMSAGGREEMENT", value.CF_REFUND_TERMSAGGREEMENT);
      fd.append(
        "CF_REFUND_IS_DIGITALCUSTOMERSIGN",
        value.CF_REFUND_IS_DIGITALCUSTOMERSIGN
      );
      fd.append("CF_IS_ACKNOWLEDGEMENT", value.CF_IS_ACKNOWLEDGEMENT);
      fd.append("CF_CREATEDBY", localStorage.getItem("User_ID"));
      fd.append("CF_ACTIVE", value.CF_ACTIVE == "Open" ? "SP" : "PP");
      fd.append("CF_NOTES", value.CF_NOTES);
      fd.append("CF_REASON_UPLOADFILE", value.CF_REASON_UPLOADFILE);
      fd.append("CF_CONTRACTTYPE_UPLOADFILE", value.CF_CONTRACTTYPE_UPLOADFILE);
      fd.append("CF_PAYMENT_UPLOAD_CHEQUE", value.CF_PAYMENT_UPLOAD_CHEQUE);
      fd.append("FILENAME1", value.CF_REASON_UPLOADFILE);
      fd.append("FILENAME2", value.CF_CONTRACTTYPE_UPLOADFILE);
      fd.append("FILENAME3", value.CF_PAYMENT_UPLOAD_CHEQUE);

      fd.append("IMAGELINK", this.captureimage);
      fd.append("CF_REFERENCEID", value.CF_REFERENCEID);
      // fd.append('CFStoreMail', this.storeemail)
      fd.append("STOREMAIL", this.storeemail);

      fd.append("MAIL", "M");
      fd.append("CF_EXPEDITE_FEE_AMOUNT", value.CF_EXPEDITE_FEE_AMOUNT);
      fd.append("CF_CUST_IP_ADDRESS", value.CF_CUST_IP_ADDRESS);
      // fd.append(
      //   "CF_REASON_UPLOADED_FILENAME",
      //   value.CF_REASON_UPLOADED_FILENAME
      // );
      // fd.append(
      //   "CF_CONTRACTTYPE_UPLOADED_FILENAME",
      //   value.CF_CONTRACTTYPE_UPLOADED_FILENAME
      // );
      // fd.append(
      //   "CF_PAYMENT_CHEQUE_UPLOADED_FILENAME",
      //   value.CF_PAYMENT_CHEQUE_UPLOADED_FILENAME
      // );

      console.log(fd.getAll("CF_REASON_UPLOADFILE"));
      // console.log(obj)
      this.api
        .postmethod("CancellationForm/CancellationFormAction", fd)
        .subscribe(
          (res) => {
            // console.log(res)
            if (res.status == "200") {
              this.count++;
              this.progress++;
              this.progress++;
              // this.progress=this.progress+this.progresslimit
              if (
                this.count == this.Selectedlist.length &&
                res.status == "200"
              ) {
                this.progress = 100;
                this.progressbar = false;
                this.cancellationList("AP");
                this.mainstatus = false;
                this.process = false;
                // this.searchtype='';
                // this.statusType=''
                this.progress = 0;
              }
            }
            // responce=res
          },
          (error) => {
            //Error callback
            console.error("error caught in component");
            this.progressbar = false;
            this.cancellationList("AP");

            this.mainstatus = false;
            this.process = false;
            // this.searchtype='';
            // this.statusType=''
            this.progress = 0;

            this.message = true;
            this.responceContent = "We ran into some issue please try again!!";

            //throw error;   //You can also throw the error to a global error handler
            this.cancellationData.forEach((val) => {
              val.status = false;
            });
            e.stopPropagation();
          }
        );
    } else {
      this.captureService
        .getImage(this.screen.nativeElement, true)
        .pipe(
          tap((img) => {
            this.captureimage = img;
            let image = this.captureimage;
            // console.log(this.captureimage);

            this.countc++;
            // console.log(this.countc)
            const fd: any = new FormData();

            fd.append("ACTION", "U");
            fd.append("CF_ID", value.CF_ID);
            fd.append("CF_CUSTFIRSTNAME", value.CF_CUST_FIRSTNAME);
            fd.append("CF_CUSTLASTNAME", value.CF_CUST_LASTNAME);
            fd.append("CF_CUST_PHONE", value.CUST_PHONE);
            fd.append("CF_CUST_EMAILID", value.CUST_EMAILID);
            fd.append(
              "CF_PREFERRED_METHODOF_CONTACT",
              value.CF_PREFERRED_METHODOF_CONTACT == null
                ? ""
                : value.CF_PREFERRED_METHODOF_CONTACT
            );
            fd.append("CF_AS_ID", value.CF_AS_ID);
            fd.append("CF_CONTRACTNUM", value.CONTRACT_NUM);
            fd.append("CF_VIN", value.CUST_VIN);
            fd.append("CF_YEAR", value.CF_YEAR);
            fd.append("CF_MAKE", value.CF_MAKE);
            fd.append("CF_MODEL", value.CF_MODEL);
            fd.append(
              "CF_CONTRACTDATE",
              value.CONTRACT_DATE == null ? "" : value.CONTRACT_DATE
            );
            fd.append(
              "CF_CANCELLATIONDATE",
              value.CANCELLATION_DATE == null ? "" : value.CANCELLATION_DATE
            );
            fd.append(
              "CF_MILEAGEATCANCELLATION",
              value.CF_MILEAGEATCANCELLATION
            );
            fd.append(
              "CF_REASON_CUSTOMER",
              value.CF_REASON_CUSTOMER == null ? "" : value.CF_REASON_CUSTOMER
            );
            fd.append(
              "CF_SALES_DEAL_VOIDED",
              value.CF_SALES_DEAL_VOIDED == null
                ? ""
                : value.CF_SALES_DEAL_VOIDED
            );
            fd.append("CF_SPtoPP_CREATED_BY", localStorage.getItem("User_ID"));
            fd.append("CF_CLOSED_CREATED_BY", value.CF_CLOSED_CREATED_BY);
            fd.append("CF_DELETED_CREATED_BY", value.CF_DELETED_CREATED_BY);
            fd.append(
              "CF_REASON_VEHICLESOLD",
              value.CF_REASON_VEHICLESOLD == null
                ? ""
                : value.CF_REASON_VEHICLESOLD
            );
            fd.append(
              "CF_REASON_REPOSSESSION",
              value.CF_REASON_REPOSSESSION == null
                ? ""
                : value.CF_REASON_REPOSSESSION
            );
            fd.append(
              "CF_REASON_SATISFIEDLIEN",
              value.CF_REASON_SATISFIEDLIEN == null
                ? ""
                : value.CF_REASON_SATISFIEDLIEN
            );
            fd.append(
              "CF_REASON_TOTALLOSS",
              value.CF_REASON_TOTALLOSS == null ? "" : value.CF_REASON_TOTALLOSS
            );
            fd.append(
              "CF_REASON_OTHER",
              value.CF_REASON_OTHER == null ? "" : value.CF_REASON_OTHER
            );
            fd.append("CF_REASON_OTHERTEXT", value.CF_REASON_OTHERTEXT);
            fd.append(
              "CF_REASON_IS_DEALER_CANCELLATION",
              value.CF_REASON_IS_DEALER_CANCELLATION == null
                ? ""
                : value.CF_REASON_IS_DEALER_CANCELLATION
            );

            fd.append("CF_CONTRACTTYPE", value.CONTRACT_TYPE);
            fd.append(
              "CF_CONTRACTTYPE_VSC",
              value.CF_CONTRACTTYPE_VSC == null ? "" : value.CF_CONTRACTTYPE_VSC
            );
            fd.append(
              "CF_CONTRACTTYPE_GAP",
              value.CF_CONTRACTTYPE_GAP == null ? "" : value.CF_CONTRACTTYPE_GAP
            );
            fd.append(
              "CF_CONTRACTTYPE_ANCILLARY",
              value.CF_CONTRACTTYPE_ANCILLARY == null
                ? ""
                : value.CF_CONTRACTTYPE_ANCILLARY
            );
            fd.append(
              "CF_CONTRACTTYPE_ANCILLARYTEXT",
              value.CF_CONTRACTTYPE_ANCILLARYTEXT
            );
            fd.append("CF_CONTRACTOWNER", value.CF_CONTRACTOWNER);
            fd.append("CF_ADDRESS", value.CF_ADDRESS);
            fd.append("CF_CITY", value.CF_CITY);
            fd.append("CF_STATE", value.CF_STATE);
            fd.append("CF_ZIP", value.CF_ZIP);
            fd.append(
              "CF_REFUND_ACH",
              value.CF_REFUND_ACH == null ? "" : value.CF_REFUND_ACH
            );
            fd.append("CF_REFUND_ACH_BANKNAME", value.CF_REFUND_ACH_BANKNAME);
            fd.append(
              "CF_REFUND_ACH_ROUTINGNUM",
              value.CF_REFUND_ACH_ROUTING_NUM
            );
            fd.append(
              "CF_REFUND_ACH_ACCOUNTNUM",
              value.CF_REFUND_ACH_ACCOUNT_NUM
            );
            fd.append(
              "CF_REFUND_ISEXISTSOUTSTANDINGLOAN",
              value.CF_REFUND_ISEXISTSOUTSTANDINGLOAN == null
                ? ""
                : value.CF_REFUND_ISEXISTSOUTSTANDINGLOAN
            );

            fd.append(
              "CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO",
              value.CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO == null
                ? ""
                : value.CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO
            );
            fd.append("CF_REFUND_FIN_INSTITUTE", value.CF_REFUND_FIN_INSTITUTE);
            fd.append("CF_REFUND_FIN_ACCTNUM", value.CF_REFUND_FIN_ACCTNUM);

            fd.append(
              "CF_REFUND_PROCESSINGFEE",
              value.CF_REFUND_PROCESSINGFEE == null
                ? ""
                : value.CF_REFUND_PROCESSINGFEE
            );
            fd.append(
              "CF_REFUND_PROCESSINGFEE_APPROVE",
              value.CF_REFUND_PROCESSINGFEE_APPROVE == null
                ? ""
                : value.CF_REFUND_PROCESSINGFEE_APPROVE
            );
            fd.append(
              "CF_REFUND_TERMSAGGREEMENT",
              value.CF_REFUND_TERMSAGGREEMENT
            );
            fd.append(
              "CF_REFUND_IS_DIGITALCUSTOMERSIGN",
              value.CF_REFUND_IS_DIGITALCUSTOMERSIGN
            );
            fd.append("CF_IS_ACKNOWLEDGEMENT", value.CF_IS_ACKNOWLEDGEMENT);
            fd.append("CF_CREATEDBY", "");
            fd.append("CF_ACTIVE", value.CF_ACTIVE == "Open" ? "SP" : "PP");
            fd.append("CF_NOTES", value.CF_NOTES);

            fd.append("CF_REASON_UPLOADFILE", value.CF_REASON_UPLOADFILE);
            fd.append(
              "CF_CONTRACTTYPE_UPLOADFILE",
              value.CF_CONTRACTTYPE_UPLOADFILE
            );
            fd.append(
              "CF_PAYMENT_UPLOAD_CHEQUE",
              value.CF_PAYMENT_UPLOAD_CHEQUE
            );

            fd.append("FILENAME1", value.CF_REASON_UPLOADFILE);
            fd.append("FILENAME2", value.CF_CONTRACTTYPE_UPLOADFILE);
            fd.append("FILENAME3", value.CF_PAYMENT_UPLOAD_CHEQUE);
            fd.append("IMAGELINK", this.captureimage);
            fd.append("CF_REFERENCEID", value.CF_REFERENCEID);
            // fd.append('CFStoreMail', this.storeemail)
            fd.append("STOREMAIL", this.storeemail);

            fd.append("MAIL", "M");
            fd.append("CF_EXPEDITE_FEE_AMOUNT", value.CF_EXPEDITE_FEE_AMOUNT);
            fd.append("CF_CUST_IP_ADDRESS", value.CF_CUST_IP_ADDRESS);
            // fd.append(
            //   "CF_REASON_UPLOADED_FILENAME",
            //   value.CF_REASON_UPLOADED_FILENAME
            // );
            // fd.append(
            //   "CF_CONTRACTTYPE_UPLOADED_FILENAME",
            //   value.CF_CONTRACTTYPE_UPLOADED_FILENAME
            // );
            // fd.append(
            //   "CF_PAYMENT_CHEQUE_UPLOADED_FILENAME",
            //   value.CF_PAYMENT_CHEQUE_UPLOADED_FILENAME
            // );
            console.log(fd.getAll("CF_REASON_UPLOADFILE"));
            // console.log(obj)
            this.api
              .postmethod("CancellationForm/CancellationFormAction", fd)
              .subscribe(
                (res) => {
                  console.log(res);
                  if (res.status == "200") {
                    this.count++;
                    this.progress++;
                    this.progress++;
                    // this.progress=this.progress+this.progresslimit
                    if (
                      this.count == this.Selectedlist.length &&
                      res.status == "200"
                    ) {
                      this.progress = 100;
                      this.progressbar = false;
                      this.cancellationList("AP");
                      this.mainstatus = false;
                      this.process = false;
                      // this.searchtype='';
                      // this.statusType=''
                      this.progress = 0;
                    }
                  }
                  // responce=res
                },
                (error) => {
                  //Error callback
                  console.error("error caught in component");
                  this.progressbar = false;
                  this.cancellationList("AP");

                  this.mainstatus = false;
                  this.process = false;
                  // this.searchtype='';
                  // this.statusType=''
                  this.progress = 0;
                  this.message = true;
                  this.responceContent =
                    "We ran into some issue please try again!!";

                  //throw error;   //You can also throw the error to a global error handler
                  this.cancellationData.forEach((val) => {
                    val.status = false;
                  });
                  e.stopPropagation();
                }
              );
          })
        )
        .subscribe();
    }
  }
  getstores() {
    const obj = {
      as_id: "",
    };
    this.api.postmethod("CancellationForm/GetStores", obj).subscribe((res) => {
      // console.log('store', res.response.recordset)
      this.stores = res.response.recordset;
    });
  }
  selectAll(e) {
    if (e.target.checked == true) {
      this.mainstatus = true;
      this.cancellationData.forEach((val, i) => {
        if (
          val.CF_ACTIVE == this.statusType &&
          i >= this.start &&
          i < this.end &&
          val.CONTRACT_TYPE == "PWC"
        ) {
          val.status = true;
        }
      });
    } else {
      // console.log(e.target.checked)
      this.mainstatus = false;
      this.cancellationData.forEach((val, i) => {
        if (
          val.CF_ACTIVE == this.statusType &&
          i >= this.start &&
          i < this.end &&
          val.CONTRACT_TYPE == "PWC"
        ) {
          val.status = false;
        }
      });
    }
  }
  closemessage() {
    this.responceContent = "";
    this.message = false;
  }
  PreviousUrl() {
    this.location.back();
  }

  cancellationList(val) {
    this.spinner.show();
    const obj = {};
    this.cancellationData = [];
    this.cancellation = [];
    this.storedata = [];
    this.api
      .postmethod("CancellationForm/GetServiceCancellations", obj)
      .subscribe((res) => {
        console.log(res);

        this.storedata = res.response.recordset.map((v) => ({
          ...v,
          status: false,
        }));
        // res.response.recordset.forEach(val => {
        //   val.status = false;
        // })

        // this.storedata= res.response.recordset
        // this.cancellationData = res.response.recordset
        this.cancellation = this.storedata;
        this.spinner.hide();
        this.cancellationData = this.storedata.filter(
          (item) => item.CF_ACTIVE == "Open"
        );
        if (val == "AP") {
          // console.log(this.storename,this.statusType)
          if (this.storename == 0) {
            this.cancellationData = this.storedata.filter(
              (item) => item.CF_ACTIVE == this.statusType
            );
            this.cancellation = this.storedata.filter(
              (item) => item.CF_ACTIVE == this.statusType
            );
            if (
              this.cancellationData.length > 0 &&
              this.statusType != "PP" &&
              this.statusType != "Closed" &&
              this.statusType != "A"
            ) {
              this.process = true;
            } else {
              this.process = false;
            }
          } else {
            this.cancellationData = this.storedata.filter(
              (item) =>
                item.CF_AS_ID == this.storename &&
                item.CF_ACTIVE == this.statusType
            );
            this.cancellation = this.storedata.filter(
              (item) =>
                item.CF_AS_ID == this.storename &&
                item.CF_ACTIVE == this.statusType
            );

            // console.log(this.cancellationData)
            if (
              this.cancellationData.length > 0 &&
              this.statusType != "PP" &&
              this.statusType != "Closed" &&
              this.statusType != "A"
            ) {
              this.process = true;
            } else {
              this.process = false;
            }
          }
        } else {
          this.statusType = "Open";
        }
        console.log(this.cancellationData);
        // console.log(this.searchtype)

        this.nextprevious();
      });

    // this.oRows = document.getElementById('MyTable').getElementsByTagName('tr').length;
    // this.oRows--
  }
  startcount = 1;
  endcount = 0;
  start = 0;
  end = 10;
  Previousdata() {
    this.Rows = 0;
    let resarray: any = [];
    this.startcount--;
    this.start = this.start - 10;
    this.end = this.end - 10;
    this.paginationStart = this.start + 1;
    this.cancellationData.forEach((val, i) => {
      if (i >= this.start && i < this.end) {
        this.Rows++;
        if (val.status == false) {
          this.mainstatus = false;
          resarray.push(val.status);
        }
      } else {
        val.status = false;
        this.mainstatus = false;
      }
    });
    if (resarray.length > 0) {
      this.mainstatus = false;
    } else {
      this.mainstatus = true;
    }
    this.paginationEnd = this.paginationStart + (this.Rows - 1);

    // this.oRows = document.getElementById('MyTable').getElementsByTagName('tr').length;
    // this.oRows--
  }
  Nextdata() {
    this.Rows = 0;
    let resarray: any = [];
    this.startcount++;
    this.start = this.start + 10;
    this.end = this.end + 10;
    this.paginationStart = this.start + 1;

    this.cancellationData.forEach((val, i) => {
      if (i >= this.start && i < this.end) {
        this.Rows++;
        if (val.status == false) {
          this.mainstatus = false;
          resarray.push(val.status);
        }
      } else {
        val.status = false;
        this.mainstatus = false;
      }
    });
    if (resarray.length > 0) {
      this.mainstatus = false;
    } else {
      this.mainstatus = true;
    }
    // this.oRows = document.getElementById('MyTable').getElementsByTagName('tr').length;
    // this.oRows--
    this.paginationEnd = this.paginationStart + (this.Rows - 1);
  }
  tempstatus: any;
  searchFilter() {
    if (this.statusType != "") {
      // if (this.storename == 0) {
      //   if (this.statusType == "Approval" || this.statusType == "Decline") {
      //     if (this.statusType == "Approval") {
      //       this.cancellationData = this.storedata.filter(
      //         (item) => item.PaymentStatus == this.statusType
      //       );
      //       this.cancellation = this.storedata.filter(
      //         (item) => item.PaymentStatus == this.statusType
      //       );
      //     } else {
      //       this.cancellationData = this.storedata.filter(
      //         (item) =>
      //           item.PaymentStatus != "Approval" &&
      //           item.PaymentStatus != null &&
      //           item.PaymentStatus != ""
      //       );
      //       this.cancellation = this.storedata.filter(
      //         (item) =>
      //           item.PaymentStatus != "Approval" &&
      //           item.PaymentStatus != null &&
      //           item.PaymentStatus != ""
      //       );
      //     }
      //   } else {
      //     this.cancellationData = this.storedata.filter(
      //       (item) => item.CF_ACTIVE == this.statusType
      //     );
      //     this.cancellation = this.storedata.filter(
      //       (item) => item.CF_ACTIVE == this.statusType
      //     );
      //   }
      //  }
      //  else {
      //   if (this.statusType == "Approval" || this.statusType == "Decline") {
      //     if (this.statusType == "Approval") {
      //       this.cancellationData = this.storedata.filter(
      //         (item) =>
      //           item.PaymentStatus == this.statusType &&
      //           item.CF_AS_ID == this.storename
      //       );
      //       this.cancellation = this.storedata.filter(
      //         (item) =>
      //           item.PaymentStatus == this.statusType &&
      //           item.CF_AS_ID == this.storename
      //       );
      //     } else {
      //       this.cancellationData = this.storedata.filter(
      //         (item) =>
      //           item.PaymentStatus != "Approval" &&
      //           item.PaymentStatus != null &&
      //           item.CF_AS_ID == this.storename &&
      //           item.PaymentStatus != ""
      //       );
      //       this.cancellation = this.storedata.filter(
      //         (item) =>
      //           item.PaymentStatus != "Approval" &&
      //           item.PaymentStatus != null &&
      //           item.CF_AS_ID == this.storename &&
      //           item.PaymentStatus != ""
      //       );
      //     }
      //   } else {
      //     this.cancellationData = this.storedata.filter(
      //       (item) =>
      //         item.CF_ACTIVE == this.statusType &&
      //         item.CF_AS_ID == this.storename
      //     );
      //     this.cancellation = this.storedata.filter(
      //       (item) =>
      //         item.CF_ACTIVE == this.statusType &&
      //         item.CF_AS_ID == this.storename
      //     );
      //   }
      // }
      // this.cancellation = this.cancellation.filter(
      //   (item) => item.CF_ACTIVE == this.statusType
      // );
    }
    // console.log(this.searchQuery)
    if (this.searchtype == "CUST_VIN") {
      // console.log(this.searchQuery)
      // console.log('BC......',this.cancellation);
      // console.log('BCD...............',this.cancellationData);

      let searchValue = this.searchQuery;
      if (searchValue != undefined) {
        if (searchValue == "") {
          this.cancellationData = this.cancellation;
        } else {
          this.cancellationData = this.cancellation.filter((item) => {
            if (searchValue == "") {
              this.cancellationData = this.cancellation;
            } else {
              if (item.CUST_VIN != null && item.CUST_VIN != "") {
                //  console.log('ACD...............',this.cancellationData);
                return item.CUST_VIN.toUpperCase().includes(
                  searchValue.trim().toUpperCase()
                );
              }
            }
          });
        }
      }

      if (this.cancellationData.length == 1 && this.statusType == "") {
        this.tempstatus = this.statusType;
        this.statusType = this.cancellationData[0].CF_ACTIVE;
      }
      if (this.cancellationData.length > 1 && this.tempstatus == "") {
        // this.tempstatus =this.statusType
        this.statusType = "";
      }
      // console.log('AC...............',this.cancellation);
      // console.log('ACD...............',this.cancellationData);
      this.nextprevious();
    }
    if (this.searchtype == "CONTRACT_NUM") {
      let searchValue = this.searchQuery;
      if (searchValue != undefined) {
        if (searchValue == "") {
          this.cancellationData = this.cancellation;
        } else {
          this.cancellationData = this.cancellation.filter((item) => {
            if (searchValue == "") {
              this.cancellationData = this.cancellation;
            } else {
              if (item.CONTRACT_NUM != null && item.CONTRACT_NUM != "") {
                return item.CONTRACT_NUM.toUpperCase().includes(
                  searchValue.trim().toUpperCase()
                );
              }
            }
          });
        }
      }
      if (this.cancellationData.length == 1 && this.statusType == "") {
        this.tempstatus = this.statusType;
        this.statusType = this.cancellationData[0].CF_ACTIVE;
      }
      if (this.cancellationData.length > 1 && this.tempstatus == "") {
        // this.tempstatus =this.statusType
        this.statusType = "";
      }
      this.nextprevious();
    }
    if (this.searchtype == "CF_CUST_LASTNAME") {
      let searchValue = this.searchQuery;
      if (searchValue != undefined) {
        if (searchValue == "") {
          this.cancellationData = this.cancellation;
        } else {
          this.cancellationData = this.cancellation.filter((item) => {
            if (searchValue == "") {
              this.cancellationData = this.cancellation;
            } else {
              if (
                item.CF_CUST_LASTNAME != null &&
                item.CF_CUST_LASTNAME != ""
              ) {
                return item.CF_CUST_LASTNAME.toUpperCase().includes(
                  searchValue.trim().toUpperCase()
                );
              }
            }
          });
        }
      }
      if (this.cancellationData.length == 1 && this.statusType == "") {
        this.tempstatus = this.statusType;
        this.statusType = this.cancellationData[0].CF_ACTIVE;
      }
      if (this.cancellationData.length > 1 && this.tempstatus == "") {
        // this.tempstatus =this.statusType
        this.statusType = "";
      }
      this.nextprevious();
    }
    if (this.searchtype == "CF_REFERENCEID") {
      console.log(this.searchQuery);
      let searchValue = this.searchQuery;
      if (searchValue != undefined) {
        if (searchValue == "") {
          this.cancellationData = this.cancellation;
        } else {
          this.cancellationData = this.cancellation.filter((item) => {
            if (searchValue == "") {
              this.cancellationData = this.cancellation;
            } else {
              if (item.CF_REFERENCEID != null && item.CF_REFERENCEID != "") {
                return item.CF_REFERENCEID.toString().includes(
                  searchValue.trim().toString()
                );
              }
            }
          });
        }
      }
      if (this.cancellationData.length == 1 && this.statusType == "") {
        this.tempstatus = this.statusType;
        this.statusType = this.cancellationData[0].CF_ACTIVE;
      }
      if (this.cancellationData.length > 1 && this.tempstatus == "") {
        // this.tempstatus =this.statusType
        this.statusType = "";
      }
      this.nextprevious();
    }

    // if(this.searchtype=='CF_ACTIVE'){
    //   let searchValue = this.searchQuery;
    //   if (searchValue == '') {
    //     this.cancellationData = this.cancellation;
    //   } else {
    //     this.cancellationData = this.cancellation.filter(item => {
    //       if (searchValue == '') {
    //         this.cancellationData = this.cancellation;
    //       } else {
    //         if (item.CF_ACTIVE != null && item.CF_ACTIVE != "") {
    //           return item.CF_ACTIVE.toUpperCase().includes(searchValue.trim().toUpperCase())

    //         }
    //       }

    //     })
    //   }
    // }
    // this.oRows = document.getElementById('MyTable').getElementsByTagName('tr').length;
    // this.oRows--
  }
  selectSearch(e) {
    this.process = false;
    this.gettingCount++;
    // console.log(this.searchtype)
    // console.log(this.cancellationData)
    // console.log(this.cancellation)
    this.mainstatus = false;
    this.cancellationData.forEach((val) => {
      val.status = false;
    });
    if (this.gettingCount == 1 && this.searchtype == "CF_ACTIVE") {
      this.cancellationData = this.cancellationData;
    } else if (this.statusType != "") {
      if (this.storename == 0) {
        if (this.statusType == "Approval" || this.statusType == "Decline") {
          if (this.statusType == "Approval") {
            this.cancellationData = this.storedata.filter(
              (item) => item.PaymentStatus == this.statusType
            );
            this.cancellation = this.storedata.filter(
              (item) => item.PaymentStatus == this.statusType
            );
          } else {
            this.cancellationData = this.storedata.filter(
              (item) =>
                item.PaymentStatus != "Approval" &&
                item.PaymentStatus != null &&
                item.PaymentStatus != ""
            );
            this.cancellation = this.storedata.filter(
              (item) =>
                item.PaymentStatus != "Approval" &&
                item.PaymentStatus != null &&
                item.PaymentStatus != ""
            );
          }
        } else {
          this.cancellationData = this.storedata.filter(
            (item) => item.CF_ACTIVE == this.statusType
          );
          this.cancellation = this.storedata.filter(
            (item) => item.CF_ACTIVE == this.statusType
          );
        }
      } else {
        if (this.statusType == "Approval" || this.statusType == "Decline") {
          if (this.statusType == "Approval") {
            this.cancellationData = this.storedata.filter(
              (item) =>
                item.PaymentStatus == this.statusType &&
                item.CF_AS_ID == this.storename
            );
            this.cancellation = this.storedata.filter(
              (item) =>
                item.PaymentStatus == this.statusType &&
                item.CF_AS_ID == this.storename
            );
          } else {
            this.cancellationData = this.storedata.filter(
              (item) =>
                item.PaymentStatus != "Approval" &&
                item.PaymentStatus != null &&
                item.CF_AS_ID == this.storename &&
                item.PaymentStatus != ""
            );
            this.cancellation = this.storedata.filter(
              (item) =>
                item.PaymentStatus != "Approval" &&
                item.PaymentStatus != null &&
                item.CF_AS_ID == this.storename &&
                item.PaymentStatus != ""
            );
          }
        } else {
          this.cancellationData = this.storedata.filter(
            (item) =>
              item.CF_ACTIVE == this.statusType &&
              item.CF_AS_ID == this.storename
          );
          this.cancellation = this.storedata.filter(
            (item) =>
              item.CF_ACTIVE == this.statusType &&
              item.CF_AS_ID == this.storename
          );
        }
      }
    } else {
      this.cancellationData = this.cancellation;
    }
    this.searchtype = e.target.value;
    // console.log(this.cancellationData)
    // console.log(this.cancellation)
    // ***************************************************** NEED TO CHECK**********************************************************************************************
    // if (this.searchtype !== 'CF_ACTIVE') {
    //   this.statusType = ''
    // }
    this.nextprevious();
    this.searchFilter();
  }
  appProcessing(e) {
    if (e.target.checked == true) {
      this.RefundDet.controls.reqExpedited.setValue(true);
    } else {
      this.RefundDet.controls.reqExpedited.setValue(false);
    }
  }
  updateUserStatus() {
    console.log(this.ContractType.value.type);
    if (this.ContractType.value.type == "PWC") {
      if (this.statusType == "Open" && this.isGroupMail != "Y") {
        document.getElementById("warningbtn").click();
        this.responceContent =
          "Please process the record before changing the Status";
        setTimeout(() => {
          this.editstatus = this.statusType;
        }, 100);
      }
      if (
        this.statusType == "SP" &&
        this.iscustmail != "Y" &&
        this.editstatus == "PP"
      ) {
        document.getElementById("warningbtn").click();
        this.responceContent =
          "Please process the record before changing the Status";
        setTimeout(() => {
          this.editstatus = this.statusType;
        }, 100);
      }
    }
  }
  bindbystatus(e) {
    if (e != "") {
      // this.searchQuery=''
      // this.searchtype = "";
      this.mainstatus = false;
      this.cancellationData.forEach((val) => {
        val.status = false;
      });
      this.statusType = e;
      this.tempstatus = e;
      if (this.storename == 0) {
        if (e == "Approval" || e == "Decline") {
          if (e == "Approval") {
            this.cancellationData = this.storedata.filter(
              (item) => item.PaymentStatus == e
            );
            this.cancellation = this.storedata.filter(
              (item) => item.PaymentStatus == e
            );
          } else {
            this.cancellationData = this.storedata.filter(
              (item) =>
                item.PaymentStatus != "Approval" &&
                item.PaymentStatus != null &&
                item.PaymentStatus != ""
            );
            this.cancellation = this.storedata.filter(
              (item) =>
                item.PaymentStatus != "Approval" &&
                item.PaymentStatus != null &&
                item.PaymentStatus != ""
            );
          }
        } else {
          this.cancellationData = this.storedata.filter(
            (item) => item.CF_ACTIVE == e
          );
          this.cancellation = this.storedata.filter(
            (item) => item.CF_ACTIVE == e
          );
        }
      } else {
        if (e == "Approval" || e == "Decline") {
          if (e == "Approval") {
            this.cancellationData = this.storedata.filter(
              (item) =>
                item.PaymentStatus == e && item.CF_AS_ID == this.storename
            );
            this.cancellation = this.storedata.filter(
              (item) =>
                item.PaymentStatus == e && item.CF_AS_ID == this.storename
            );
          } else {
            this.cancellationData = this.storedata.filter(
              (item) =>
                item.PaymentStatus != "Approval" &&
                item.PaymentStatus != null &&
                item.CF_AS_ID == this.storename &&
                item.PaymentStatus != ""
            );
            this.cancellation = this.storedata.filter(
              (item) =>
                item.PaymentStatus != "Approval" &&
                item.PaymentStatus != null &&
                item.CF_AS_ID == this.storename &&
                item.PaymentStatus != ""
            );
          }
        } else {
          this.cancellationData = this.storedata.filter(
            (item) => item.CF_ACTIVE == e && item.CF_AS_ID == this.storename
          );
          this.cancellation = this.storedata.filter(
            (item) => item.CF_ACTIVE == e && item.CF_AS_ID == this.storename
          );
        }
      }
      // console.log(this.cancellationData)
      this.searchFilter();
      this.nextprevious();
      if (
        e != "PP" &&
        this.cancellationData.length > 0 &&
        e != "Closed" &&
        e != "A"
      ) {
        this.process = true;
      } else {
        this.process = false;
      }
      // this.oRows = document.getElementById('MyTable').getElementsByTagName('tr').length;
      // this.oRows--
    }
    if (e == "") {
      console.log(this.storename);
      if (this.storename != "0") {
        this.cancellationData = this.storedata.filter(
          (item) => item.CF_AS_ID == this.storename
        );
        this.cancellation = this.storedata.filter(
          (item) => item.CF_AS_ID == this.storename
        );
        this.statusType = e;
        // this.cancellationData = this.storedata;
        // this.cancellation = this.storedata;
        this.process = false;
        this.searchFilter();

        this.nextprevious();
      } else {
        this.statusType = e;
        this.cancellationData = this.storedata;
        this.cancellation = this.storedata;
        this.process = false;
        this.searchFilter();

        this.nextprevious();
      }
    }
  }
  bindbystores(e) {
    this.storename = e.target.value;
    if (e.target.value == 0) {
      this.cancellationData = this.storedata;
      this.cancellation = this.storedata;
      this.nextprevious();
    } else {
      this.cancellationData = this.storedata.filter(
        (item) => item.CF_AS_ID == e.target.value
      );
      this.cancellation = this.storedata.filter(
        (item) => item.CF_AS_ID == e.target.value
      );
      console.log(this.cancellation, this.cancellationData);
      this.nextprevious();
    }
    // if (this.searchtype !== "CF_ACTIVE") {
    //   this.searchFilter();
    // }
    // else{
    this.bindbystatus(this.statusType);
    // }
    // this.oRows = document.getElementById('MyTable').getElementsByTagName('tr').length;
    // this.oRows--
  }
  paymentrecord: any = [];
  getpaymentResponse(id) {
    const obj = {
      REFERENCEID: id,
    };
    this.api.postmethod("CancellationForm/GetCFPaymentResponse", obj).subscribe(
      (res) => {
        console.log(res);
        if (res.status == "200") {
          document.getElementById("payRes").click();
          this.paymentrecord = res.response.recordset;
        } else {
          document.getElementById("warningbtn").click();
          this.responceContent = "Something Went Wrong please try again!!";
        }
      },
      (error) => {
        document.getElementById("warningbtn").click();
        this.responceContent = "Something Went Wrong please try again!!"; //Error callback
        console.error("error caught in component");
      }
    );
  }
  isGroupMail: any = "";
  iscustmail: any = "";
  PaymentResponse: any = "";
  Dealership: any = "";
  fileuploads: any;

  openform(data, val) {
    return new Promise((resolve, reject) => {
      this.SelectedDealership = "";
      this.PaymentResponse = data.ResponseStatus;
      this.vieworedit = val;
      let grpemail = this.stores.filter((item) => item.AS_ID == data.CF_AS_ID);
      console.log(grpemail);
      this.fileuploads = data;
      this.storeemail = grpemail[0].STOREMAIL;
      this.isGroupMail = data.CF_GROUP_MAIL;
      this.iscustmail = data.CF_CUST_ISMAIL;
      //  console.log(data , this.storeemail)
      this.requestId = data.CF_REFERENCEID;
      this.id = data.CF_ID;
      this.editstatus = data.CF_ACTIVE;
      this.refeditstatus = data.CF_ACTIVE;
      this.chequeName = data.CF_PAYMENT_UPLOAD_CHEQUE;
      this.Dealership = data.CF_AS_ID;
      //       if(data.CANCELLATION_DATE == '01-01-1900'){
      //         // this.dtofcnclton = this.datepipe.transform(data.CANCELLATION_DATE, 'yyyy-MM-dd')
      //         // var datearray1=this.dtofcnclton.split("-");
      //         // this.dtofcnclton = datearray1[1] + '/' + datearray1[2] + '/' + datearray1[0];
      //         this.dtofcnclton = ''

      //       }
      //       else{
      // this.dtofcnclton=data.CANCELLATION_DATE
      //       }
      //       if(data.CONTRACT_DATE == '01-01-1900'){

      //     this.dtofcntrct = '';
      //       }
      //       else{
      //         this.dtofcntrct=data.CONTRACT_DATE
      //       }
      // this.dtofcntrct = this.datepipe.transform(data.CONTRACT_DATE, 'yyyy-MM-dd')
      //       // var datearray1 = data.CANCELLATION_DATE.substring(0,10).split("-");

      //     var datearray2 = this.dtofcntrct.split("-");
      //     this.dtofcntrct = datearray2[1] + '/' + datearray2[2] + '/' + datearray2[0];
      // console.log(this.dtofcnclton)
      // console.log(this.dtofcntrct)
      this.dtofcnclton = data.CANCELLATION_DATE;
      this.dtofcntrct = data.CONTRACT_DATE;
      this.uploadcontract =
        "http://swickardapi.axelautomotive.com/api/resources/images/" +
        data.CF_CONTRACTTYPE_UPLOADFILE;
      this.uploadreason =
        "http://swickardapi.axelautomotive.com/api/resources/images/" +
        data.CF_REASON_UPLOADFILE;
      this.cheque =
        "http://swickardapi.axelautomotive.com/api/resources/images/" +
        data.CF_PAYMENT_UPLOAD_CHEQUE;
      this.ContractName = data.CF_CONTRACTTYPE_UPLOADFILE;
      this.DocumentfileName = data.CF_CONTRACTTYPE_UPLOADFILE;
      // console.log(this.ContractName,'dfhj')
      this.reasonName = data.CF_REASON_UPLOADFILE;
      this.ContractFileName = data.CF_CONTRACTTYPE_UPLOADFILE;
      this.uploadcheque = data.CF_PAYMENT_UPLOAD_CHEQUE;
      if (data.CF_REFUND_ISEXISTSOUTSTANDINGLOAN != null) {
        if (data.CF_REFUND_ISEXISTSOUTSTANDINGLOAN == "Y") {
          this.outstandingLoan = "Y";
        } else {
          this.outstandingLoan = "N";
        }
      } else {
        this.outstandingLoan = "";
      }
      if (data.CF_REFUND_ACH == "Y") {
        this.CollectInfo = "Y";
      } else {
        this.CollectInfo = "N";
      }
      this.notes = data.CF_NOTES;
      this.prevNotes = data.CF_NOTES;
      this.createdts = data.CF_CREATED_TS;
      this.updatedts = data.CF_UPDATED_TS;
      console.log(data.CF_EXPEDITE_FEE_AMOUNT.toString());
      this.VehicleDet = this.fB.group({
        firstName: [data.CF_CUST_FIRSTNAME, [Validators.required]],
        lastName: [data.CF_CUST_LASTNAME, [Validators.required]],
        phone: [data.CUST_PHONE, [Validators.required]],
        emailid: [data.CUST_EMAILID, [Validators.required]],
        mtdofcontact: [data.CF_PREFERRED_METHODOF_CONTACT],
        exportimeframe: [
          data.CF_EXPEDITE_FEE_AMOUNT == 150 ||
          data.CF_EXPEDITE_FEE_AMOUNT == 79
            ? data.CF_EXPEDITE_FEE_AMOUNT.toString()
            : "0",
        ],

        sellingDealership: [data.DEALER_NAME],
        contract: [data.CONTRACT_NUM],
        vin: [data.CUST_VIN, [Validators.required]],
        year: [data.CF_YEAR],
        make: [data.Make_NAME],
        model: [data.Model_NAME],
        dateOfContract: [data.CONTRACT_DATE],
        dateOfCancellation: [data.CANCELLATION_DATE],
        mileage: [data.CF_MILEAGEATCANCELLATION],
      });
      this.ReasonsForCancel = this.fB.group({
        customerRequest: [data.CF_REASON_CUSTOMER == "Y" ? true : false],
        SalesDeal: [data.CF_SALES_DEAL_VOIDED == "Y" ? true : false],
        vehicleSold: [data.CF_REASON_VEHICLESOLD == "Y" ? true : false],
        repossession: [data.CF_REASON_REPOSSESSION == "Y" ? true : false],
        satisfiedLien: [data.CF_REASON_SATISFIEDLIEN == "Y" ? true : false],
        totalLossofVehicle: [data.CF_REASON_TOTALLOSS == "Y" ? true : false],
        other: [data.CF_REASON_OTHER == "Y" ? true : false],
        otheretext: [data.CF_REASON_OTHERTEXT],
        upload: [""],
        dealercancellation: [
          data.CF_REASON_IS_DEALER_CANCELLATION == "Y" ? true : false,
        ],
      });
      this.ContractType = this.fB.group({
        type: [data.CONTRACT_TYPE],
        vehicleServiceContract: [
          data.CF_CONTRACTTYPE_VSC == "Y" ? true : false,
        ],
        gap: [data.CF_CONTRACTTYPE_GAP == "Y" ? true : false],
        ancillary: [data.CF_CONTRACTTYPE_ANCILLARY == "Y" ? true : false],
        ancillaryType: [data.CF_CONTRACTTYPE_ANCILLARYTEXT],
        uploadContract: [""],
      });
      this.RefundDet = this.fB.group({
        contractOwner: [data.CF_CONTRACTOWNER],
        address: [data.CF_ADDRESS],
        city: [data.CF_CITY],
        state: [data.State_Name],
        zip: [data.CF_ZIP],
        loanleasedet: [data.CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO],
        finame: [data.CF_REFUND_FIN_INSTITUTE],
        acnumber: [data.CF_REFUND_FIN_ACCTNUM],
        ach: [data.CF_REFUND_ACH == "Y" ? true : false],
        bankName: [data.CF_REFUND_ACH_BANKNAME],
        routing: [data.CF_REFUND_ACH_ROUTING_NUM],
        acct: [data.CF_REFUND_ACH_ACCOUNT_NUM],
        outstandingLoan: [this.outstandingLoan],
        reqExpedited: [data.CF_REFUND_PROCESSINGFEE == "Y" ? true : false],
        approveExpedited: [
          data.CF_REFUND_PROCESSINGFEE_APPROVE == "Y" ? true : false,
        ],
        agreeCancellationTerms: [true],
        customerSignchk: [true],
        customersign: [""],
        acknowledge: [true],
      });

      if (val != "M") {
        this.DocumentfileName = data.CF_REASON_UPLOADFILE;
        this.ContractFileName = data.CF_CONTRACTTYPE_UPLOADFILE;
        this.uploadcheque = data.CF_PAYMENT_UPLOAD_CHEQUE;

        this.dtofcnclton = this.datepipe.transform(
          data.CANCELLATION_DATE,
          "yyyy-MM-dd"
        );
        this.dtofcntrct = this.datepipe.transform(
          data.CONTRACT_DATE,
          "yyyy-MM-dd"
        );
        this.VehicleDet.controls.sellingDealership.setValue(data.CF_AS_ID);
        this.getmake();
        this.VehicleDet.controls.make.setValue(data.CF_MAKE);
        this.getmodel();
        this.VehicleDet.controls.model.setValue(data.CF_MODEL);
        this.VehicleDet.controls.dateOfContract.setValue(this.dtofcntrct);
        this.VehicleDet.controls.dateOfCancellation.setValue(this.dtofcnclton);
        this.RefundDet.controls.state.setValue(data.CF_STATE);
      }
      if (data.CF_REASON_IS_DEALER_CANCELLATION == "Y") {
        this.RefundDet.controls.outstandingLoan.setValue("");
        this.refundcontract = true;
      } else {
        this.refundcontract = false;
      }
      if (val == "V") {
        this.refundcontract = true;
      }
      return resolve(true);
    });
  }
  nextprevious() {
    this.Rows = 0;
    this.startcount = 1;
    this.endcount = 0;
    this.start = 0;
    this.end = 10;
    if (this.cancellationData.length > 0) {
      let cdatalen = this.cancellationData.length / 10;
      let dotindex = cdatalen.toString().indexOf(".");
      if (dotindex > 0) {
        let count = parseInt(cdatalen.toString().substring(0, dotindex));
        count++;
        this.endcount = count;
      }
      if (dotindex < 0) {
        this.endcount = cdatalen;
      }
      this.cancellationData.forEach((val, i) => {
        if (i >= this.start && i < this.end) {
          this.Rows++;
        }
      });
    } else {
      this.endcount = 1;
    }
    this.paginationStart = this.start + 1;
    this.paginationEnd = this.end;
    if (this.cancellationData.length < this.paginationEnd) {
      this.paginationEnd = this.cancellationData.length;
    }
    if (this.cancellationData.length == 0) {
      this.paginationStart = this.cancellationData.length;
    }
  }
  DelselectedReq: any;
  ConfirmDel(val) {
    this.DelselectedReq = val;
    this.requestId = val.CF_REFERENCEID;
  }
  Delete(value) {
    // console.log(value)
    const fd: any = new FormData();
    fd.append("ACTION", "U");
    fd.append("CF_ID", value.CF_ID);
    fd.append("CF_CUSTFIRSTNAME", value.CF_CUST_FIRSTNAME);
    fd.append("CF_CUSTLASTNAME", value.CF_CUST_LASTNAME);
    fd.append("CF_CUST_PHONE", value.CUST_PHONE);
    fd.append("CF_CUST_EMAILID", value.CUST_EMAILID);
    fd.append(
      "CF_PREFERRED_METHODOF_CONTACT",
      value.CF_PREFERRED_METHODOF_CONTACT == null
        ? ""
        : value.CF_PREFERRED_METHODOF_CONTACT
    );
    fd.append("CF_AS_ID", value.CF_AS_ID);
    fd.append("CF_CONTRACTNUM", value.CONTRACT_NUM);
    fd.append("CF_VIN", value.CUST_VIN);
    fd.append("CF_YEAR", value.CF_YEAR);
    fd.append("CF_MAKE", value.CF_MAKE);
    fd.append("CF_MODEL", value.CF_MODEL);
    fd.append(
      "CF_CONTRACTDATE",
      value.CONTRACT_DATE == null ? "" : value.CONTRACT_DATE
    );
    fd.append(
      "CF_CANCELLATIONDATE",
      value.CANCELLATION_DATE == null ? "" : value.CANCELLATION_DATE
    );
    fd.append("CF_MILEAGEATCANCELLATION", value.CF_MILEAGEATCANCELLATION);
    fd.append(
      "CF_REASON_CUSTOMER",
      value.CF_REASON_CUSTOMER == null ? "" : value.CF_REASON_CUSTOMER
    );
    fd.append(
      "CF_SALES_DEAL_VOIDED",
      value.CF_SALES_DEAL_VOIDED == null ? "" : value.CF_SALES_DEAL_VOIDED
    );
    fd.append("CF_SPtoPP_CREATED_BY", value.CF_SPtoPP_CREATED_BY);
    fd.append("CF_CLOSED_CREATED_BY", value.CF_CLOSED_CREATED_BY);
    fd.append("CF_DELETED_CREATED_BY", localStorage.getItem("User_ID"));
    fd.append(
      "CF_REASON_VEHICLESOLD",
      value.CF_REASON_VEHICLESOLD == null ? "" : value.CF_REASON_VEHICLESOLD
    );
    fd.append(
      "CF_REASON_REPOSSESSION",
      value.CF_REASON_REPOSSESSION == null ? "" : value.CF_REASON_REPOSSESSION
    );
    fd.append(
      "CF_REASON_SATISFIEDLIEN",
      value.CF_REASON_SATISFIEDLIEN == null ? "" : value.CF_REASON_SATISFIEDLIEN
    );
    fd.append(
      "CF_REASON_TOTALLOSS",
      value.CF_REASON_TOTALLOSS == null ? "" : value.CF_REASON_TOTALLOSS
    );
    fd.append(
      "CF_REASON_OTHER",
      value.CF_REASON_OTHER == null ? "" : value.CF_REASON_OTHER
    );
    fd.append("CF_REASON_OTHERTEXT", value.CF_REASON_OTHERTEXT);
    fd.append(
      "CF_REASON_IS_DEALER_CANCELLATION",
      value.CF_REASON_IS_DEALER_CANCELLATION == null
        ? ""
        : value.CF_REASON_IS_DEALER_CANCELLATION
    );

    fd.append("CF_CONTRACTTYPE", value.CONTRACT_TYPE);
    fd.append(
      "CF_CONTRACTTYPE_VSC",
      value.CF_CONTRACTTYPE_VSC == null ? "" : value.CF_CONTRACTTYPE_VSC
    );
    fd.append(
      "CF_CONTRACTTYPE_GAP",
      value.CF_CONTRACTTYPE_GAP == null ? "" : value.CF_CONTRACTTYPE_GAP
    );
    fd.append(
      "CF_CONTRACTTYPE_ANCILLARY",
      value.CF_CONTRACTTYPE_ANCILLARY == null
        ? ""
        : value.CF_CONTRACTTYPE_ANCILLARY
    );
    fd.append(
      "CF_CONTRACTTYPE_ANCILLARYTEXT",
      value.CF_CONTRACTTYPE_ANCILLARYTEXT
    );
    fd.append("CF_CONTRACTOWNER", value.CF_CONTRACTOWNER);
    fd.append("CF_ADDRESS", value.CF_ADDRESS);
    fd.append("CF_CITY", value.CF_CITY);
    fd.append("CF_STATE", value.CF_STATE);
    fd.append("CF_ZIP", value.CF_ZIP);
    fd.append(
      "CF_REFUND_ACH",
      value.CF_REFUND_ACH == null ? "" : value.CF_REFUND_ACH
    );
    fd.append("CF_REFUND_ACH_BANKNAME", value.CF_REFUND_ACH_BANKNAME);
    fd.append("CF_REFUND_ACH_ROUTINGNUM", value.CF_REFUND_ACH_ROUTING_NUM);
    fd.append("CF_REFUND_ACH_ACCOUNTNUM", value.CF_REFUND_ACH_ACCOUNT_NUM);
    fd.append(
      "CF_REFUND_ISEXISTSOUTSTANDINGLOAN",
      value.CF_REFUND_ISEXISTSOUTSTANDINGLOAN == null
        ? ""
        : value.CF_REFUND_ISEXISTSOUTSTANDINGLOAN
    );

    fd.append(
      "CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO",
      value.CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO == null
        ? ""
        : value.CF_REFUND_IFOUTSTANDINGLOAN_IS_FIN_ACCTNO
    );
    fd.append("CF_REFUND_FIN_INSTITUTE", value.CF_REFUND_FIN_INSTITUTE);
    fd.append("CF_REFUND_FIN_ACCTNUM", value.CF_REFUND_FIN_ACCTNUM);

    fd.append(
      "CF_REFUND_PROCESSINGFEE",
      value.CF_REFUND_PROCESSINGFEE == null ? "" : value.CF_REFUND_PROCESSINGFEE
    );
    fd.append(
      "CF_REFUND_PROCESSINGFEE_APPROVE",
      value.CF_REFUND_PROCESSINGFEE_APPROVE == null
        ? ""
        : value.CF_REFUND_PROCESSINGFEE_APPROVE
    );
    fd.append("CF_REFUND_TERMSAGGREEMENT", value.CF_REFUND_TERMSAGGREEMENT);
    fd.append(
      "CF_REFUND_IS_DIGITALCUSTOMERSIGN",
      value.CF_REFUND_IS_DIGITALCUSTOMERSIGN
    );
    fd.append("CF_IS_ACKNOWLEDGEMENT", value.CF_IS_ACKNOWLEDGEMENT);
    fd.append("CF_CREATEDBY", "");
    fd.append("CF_ACTIVE", "A");
    fd.append("CF_NOTES", value.CF_NOTES);

    fd.append("CF_REASON_UPLOADFILE", value.CF_REASON_UPLOADFILE);
    fd.append("CF_CONTRACTTYPE_UPLOADFILE", value.CF_CONTRACTTYPE_UPLOADFILE);
    fd.append("CF_PAYMENT_UPLOAD_CHEQUE", value.CF_PAYMENT_UPLOAD_CHEQUE);

    fd.append("FILENAME1", value.CF_REASON_UPLOADFILE);
    fd.append("FILENAME2", value.CF_CONTRACTTYPE_UPLOADFILE);
    fd.append("FILENAME3", value.CF_PAYMENT_UPLOAD_CHEQUE);
    fd.append("IMAGELINK", "");
    fd.append("CF_REFERENCEID", value.CF_REFERENCEID);
    fd.append("MAIL", "");
    fd.append("CF_EXPEDITE_FEE_AMOUNT", value.CF_EXPEDITE_FEE_AMOUNT);
    fd.append("CF_CUST_IP_ADDRESS", value.CF_CUST_IP_ADDRESS);
    // fd.append("CF_REASON_UPLOADED_FILENAME", value.CF_REASON_UPLOADED_FILENAME);
    // fd.append(
    //   "CF_CONTRACTTYPE_UPLOADED_FILENAME",
    //   value.CF_CONTRACTTYPE_UPLOADED_FILENAME
    // );
    // fd.append(
    //   "CF_PAYMENT_CHEQUE_UPLOADED_FILENAME",
    //   value.CF_PAYMENT_CHEQUE_UPLOADED_FILENAME
    // );
    console.log(fd.getAll("CF_REASON_UPLOADFILE"));
    // console.log(obj)
    this.api
      .postmethod("CancellationForm/CancellationFormAction", fd)
      .subscribe(
        (res) => {
          console.log(res);
          if (res.status == "200") {
            this.message = true;
            this.responceContent = "Record Deleted Successfully";
            this.cancellationList("AP");
          }
        },

        (error) => {
          //Error callback
          console.error("error caught in component");
          this.mainstatus = false;
          this.process = false;
          // this.searchtype='';
          // this.statusType=''
          this.message = true;
          this.responceContent = "We ran into some issue please try again!!";

          //throw error;   //You can also throw the error to a global error handler
          this.cancellationData.forEach((val) => {
            val.status = false;
          });
        }
      );
  }
}
