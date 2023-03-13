import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbActiveModal,
  NgbModal,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDate,
  NgbDateStruct,
  NgbDatepickerConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { GlobalVariablesComponent } from "src/app/Partials/global-variables/global-variables.component";
import { ApiService } from "src/app/Core/_providers/Api-service/api.service";
import { DatePipe } from "@angular/common";
import { saveAs as fileSaverSave } from "file-saver";
import * as JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import jsPDF from "jspdf";
import { NgxCaptureService } from "ngx-capture";
import { tap } from "rxjs/operators";
// import {
//   BsDatepickerModule,
//   BsDatepickerConfig,
// } from "ngx-bootstrap/datepicker";

@Component({
  selector: "app-incident-form-data",
  templateUrl: "./incident-form-data.component.html",
  styleUrls: ["./incident-form-data.component.scss"],
})
export class IncidentFormDataComponent implements OnInit {
  currentDate: string;
  Showvehicle1: boolean = true;
  Showvehicle2: boolean = false;
  Showvehicle3: boolean = false;
  Showvehicle4: boolean = false;
  Showvehicle5: boolean = false;
  Showtextarea: boolean = false;
  ShowText1V1: boolean = false;
  ShowText2V1: boolean = false;
  ShowText3V1: boolean = false;
  ShowText1V2: boolean = false;
  ShowText2V2: boolean = false;
  ShowText3V2: boolean = false;
  ShowText1V3: boolean = false;
  ShowText2V3: boolean = false;
  ShowText3V3: boolean = false;
  ShowText1V4: boolean = false;
  ShowText2V4: boolean = false;
  ShowText3V4: boolean = false;
  ShowText1V5: boolean = false;
  ShowText2V5: boolean = false;
  ShowText3V5: boolean = false;
  ShowPoliceInfo: boolean = false;
  GETDATA: any;
  myform: FormGroup;
  injur_details_cust: FormGroup;
  injur_details_emp: FormGroup;

  store: any = 0;
  model: any;
  checklist: any = [];
  DropdownsData: any;
  submitted = false;
  injuryStatus: any;
  TowinvoiceStatus1: any;
  TowinvoiceStatus2: any;
  TowinvoiceStatus3: any;
  TowinvoiceStatus4: any;
  TowinvoiceStatus5: any;
  Employeestatus: any;
  CustomerStatus: any;
  Witnessescolor: any;
  costofrepairbutton1: any;
  towbutton1: any;
  flooredbutton1: any;
  loanerbutton1: any;

  costofrepairbutton2: any;
  towbutton2: any;
  flooredbutton2: any;
  loanerbutton2: any;

  costofrepairbutton3: any;
  towbutton3: any;
  flooredbutton3: any;
  loanerbutton3: any;

  costofrepairbutton4: any;
  towbutton4: any;
  flooredbutton4: any;
  loanerbutton4: any;

  costofrepairbutton5: any;
  towbutton5: any;
  flooredbutton5: any;
  loanerbutton5: any;
  showattachments: boolean;

  incidentdate: any;

  claimNumber: any;
  incidentid: any;
  caseid: any;
  phoneFormat: any[] = [
    /[1-9]/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  holddate: any = "";
  constructor(
    public globalVarComponent: GlobalVariablesComponent,
    private ngbModal: NgbModal,
    private authService: ApiService,
    public fb: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService,
    private Datepipe: DatePipe,
    private captureService: NgxCaptureService
  ) {
    (this.myform = fb.group({
      Employeename: ["", [Validators.required]],
      Supervisorname: ["", [Validators.required]],
      Employeemail: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-z]{2,}$"),
        ],
      ],
      Employeephone: [
        "",
        [
          Validators.required,
          Validators.pattern("[0-9- ]*"),
          Validators.minLength(10),
        ],
      ],
      Supervisormail: [""],
      Position: [
        "",
        [
          Validators.required,
          // Validators.maxLength(50),
          // Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      Department: [
        "",
        [
          Validators.required,
          // Validators.maxLength(50),
          // Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      StoreName: [""],
      ic_propertyDamage: [""],
      ic_damageToLoanerVehicle: [""],
      ic_inventoryOrNonLoaner: [""],
      ic_theftOfVehicle: [""],
      ic_lostMissingVehicle: [""],
      ic_otherDocumenting: [""],
      ic_damageToCustomerVehicle: [""],

      // Employeename: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      // Supervisorname: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      // Employeemail: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      // Employeephone: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
      // Supervisormail: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      // Position: ['', Validators.required],
      // Department: ['', Validators.required],
      // StoreName: ['', Validators.required],

      IncidentDate: ["", [Validators.required]],
      TodaysDate: [""],
      GeneralLocation: [
        "",
        [
          Validators.required,
          // Validators.maxLength(50),
          // Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      DesofIncident: [""],
      witnessInfo: [""],

      VehicleOwner1: [""],
      VehicleMake1: [""],
      VehicleModel1: [""],
      VIN1: [""],
      Color1: [""],
      LastKnownMileage1: [""],
      Location1: [""],
      VehiclePhone1: [""],
      costOfRepair_1: [""],
      towCompanyname_1: [""],
      towCompanydesc_1: [""],
      flooredWithWhom_1: [""],
      loanerProgramWithWhom_1: [""],
      InsuranceCompany1: [""],
      ClaimNumber1: [""],
      PolicyNumber1: [""],
      AgentFullName1: [""],
      AgentPhone1: [""],

      VehicleOwner2: [""],
      VehicleMake2: [""],
      VehicleModel2: [""],
      VIN2: [""],
      Color2: [""],
      LastKnownMileage2: [""],
      Location2: [""],
      VehiclePhone2: [""],
      costOfRepair_2: [""],
      towCompanyname_2: [""],
      towCompanydesc_2: [""],

      flooredWithWhom_2: [""],
      loanerProgramWithWhom_2: [""],
      InsuranceCompany2: [""],
      ClaimNumber2: [""],
      PolicyNumber2: [""],
      AgentFullName2: [""],
      AgentPhone2: [""],

      VehicleOwner3: [""],
      VehicleMake3: [""],
      VehicleModel3: [""],
      VIN3: [""],
      Color3: [""],
      LastKnownMileage3: [""],
      Location3: [""],
      VehiclePhone3: [""],
      costOfRepair_3: [""],
      towCompanyname_3: [""],
      towCompanydesc_3: [""],

      flooredWithWhom_3: [""],
      loanerProgramWithWhom_3: [""],
      InsuranceCompany3: [""],
      ClaimNumber3: [""],
      PolicyNumber3: [""],
      AgentFullName3: [""],
      AgentPhone3: [""],

      VehicleOwner4: [""],
      VehicleMake4: [""],
      VehicleModel4: [""],
      VIN4: [""],
      Color4: [""],
      LastKnownMileage4: [""],
      Location4: [""],
      VehiclePhone4: [""],
      costOfRepair_4: [""],
      towCompanyname_4: [""],
      towCompanydesc_4: [""],

      flooredWithWhom_4: [""],
      loanerProgramWithWhom_4: [""],
      InsuranceCompany4: [""],
      ClaimNumber4: [""],
      PolicyNumber4: [""],
      AgentFullName4: [""],
      AgentPhone4: [""],

      VehicleOwner5: [""],
      VehicleMake5: [""],
      VehicleModel5: [""],
      VIN5: [""],
      Color5: [""],
      LastKnownMileage5: [""],
      Location5: [""],
      VehiclePhone5: [""],
      costOfRepair_5: [""],
      towCompanyname_5: [""],
      towCompanydesc_5: [""],

      flooredWithWhom_5: [""],
      loanerProgramWithWhom_5: [""],
      InsuranceCompany5: [""],
      ClaimNumber5: [""],
      PolicyNumber5: [""],
      AgentFullName5: [""],
      AgentPhone5: [""],
      injuryDescription: [""],

      policeFileNumber: [""],
      officerInCharge: [""],
      policeStation: [""],
      policeStationPhone: [""],
      policeStationEmail: [""],

      noOfVehicles: [""],
      status: [""],
    })),
      (this.injur_details_emp = this.fb.group({
        injury_1: [""],
        firstAid_1: [""],
        closeCallObservation_1: [""],
        injuryTime_1: [""],
        injuryLocation_1: ["", [Validators.required]],
        causeOfInjury_1: ["", [Validators.required]],
        injurySustained_1: ["", [Validators.required]],
        medicalCenterPhysician_1: [""],
        descriptionOfIncident_1: ["", [Validators.required]],
        injuryUnsafeAct_1: [""],
      }));

    this.injur_details_cust = this.fb.group({
      injury_2: [""],
      firstAid_2: [""],
      closeCallObservation_2: [""],
      injuryTime_2: [""],
      injuryLocation_2: [
        "",
        [
          Validators.required,
          // Validators.maxLength(50),
          // Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      causeOfInjury_2: [
        "",
        [
          Validators.required,
          // Validators.maxLength(50),
          // Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      injurySustained_2: [
        "",
        [
          Validators.required,
          // Validators.maxLength(50),
          // Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      medicalCenterPhysician_2: [""],
      descriptionOfIncident_2: [
        "",
        [
          Validators.required,
          // Validators.maxLength(50),
          // Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      injuryUnsafeAct_2: [""],
    });
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";
    this.currentDate = new Date().toISOString().slice(0, 10);
  }
  get f() {
    return this.myform.controls;
  }

  get inj_emp() {
    return this.injur_details_emp.controls;
  }
  get inj_cust() {
    return this.injur_details_cust.controls;
  }
  // data1 = [
  //   { id: "ic_damageToLoanerVehicle", name: "Damage to loaner vehicle", status: false },
  //   { id: "ic_inventoryOrNonLoaner", name: "Damage to our vehicle", status: false },
  //   { id: "ic_damageToCustomerVehicle", name: "Damage to customer vehicle", status: false },
  //   { id: "ic_theftOfVehicle", name: "Theft of vehicle", status: false },
  //   { id: "ic_lostMissingVehicle", name: "Lost/missing vehicle", status: false },
  //   { id: "ic_otherDocumenting", name: "Other", status: false },
  // ]
  filterArray: any = [];
  attachmentextensions: any = [];
  id: any;
  status: any = "Pending";
  myDateValue;
  Emp_Injures: any = "";
  Cust_Injures: any = "";
  // filterArray = [
  //   {
  //     mainSection: "Employee Injury",
  //     id: "Employee_Injury",
  //     status: false,
  //     show: true,
  //   },
  //   {
  //     mainSection: "Customer Injury",
  //     id: "Customer_Injury",
  //     status: false,
  //     show: true,
  //   },
  //   {
  //     mainSection: "Preliminary Information",
  //     id: "Preliminary_Information",
  //     show: true,
  //     status: false,
  //   },
  //   {
  //     mainSection: "Incident Information",
  //     id: "Incident_Information",
  //     status: false,
  //     show: true,
  //   },
  //   {
  //     mainSection: "General Information",
  //     id: "General_Information",
  //     status: false,
  //     show: true,
  //   },
  //   // {
  //   //   mainSection: "Injury Information",
  //   //   id: "Injury_Information",
  //   //   status: false,
  //   //   show: true,
  //   // },
  //   {
  //     mainSection: "Police Information",
  //     id: "Police_Information",
  //     status: false,
  //     show: true,
  //   },
  // ];
  ngOnInit() {
    this.id = localStorage.getItem("id");
    // this.id = 2023012317;
    this.getNotes();

    this.getdata(this.cl_id);
    this.f.StoreName.setValue(0);
    localStorage.removeItem("id");
    // this.getDropdowns();
    // this.myform.controls.status.setValue('')
  }
  // checkList = []
  // change(e, item) {
  //   if (e.target.checked) {
  //     this.checkList.push(item.id);

  //   }
  //   else {
  //     let el = this.checkList.find(itm => itm === item.id);
  //     if (el)
  //       this.checkList.splice(this.checkList.indexOf(el), 1);
  //   }

  //   console.log(this.checkList);

  // }
  ATTACHMENTS = [];
  dlveh;
  dlveh2;
  dlveh3;
  dlveh4;
  dlveh5;
  dlveh6;
  dlveh7;
  GETALLDATA;
  cl_id = 0;
  selecteditem: any = "";
  notes: any = "";
  Notesdata: any = [];
  getNotes() {
    // alert('hi')
    const obj = {
      // ICN_IC_CLAIM_ID: "2023012317",
      ICN_IC_CLAIM_ID: this.id.toString(),
      // 2023012317,
      // claimid: this.id,
    };
    this.authService
      .INTERNALPostmethod("IncidentForm/GetIncidentFormNotes", obj)
      .subscribe((Data: any) => {
        this.Notesdata = Data.response.recordset;
        console.log(this.Notesdata);
      });
  }

  defaultdate = new Date("1990-01-01");
  getdata(cid) {
    console.log(this.id);
    this.spinnerService.show();
    const obj = {
      // claimid: 2023012317,

      // 2023012317,
      claimid: this.id,
    };
    this.authService
      .INTERNALPostmethod("IncidentForm/GetIncidentClaimFormData", obj)
      .subscribe((Data: any) => {
        console.log(Data);
        this.spinnerService.hide();
        this.GETDATA = Data.response.recordset[this.cl_id];
        this.GETALLDATA = Data.response.recordset;
        console.log(this.GETALLDATA);

        console.log(Data.response.recordset.length);

        // Object.keys(this.GETDATA).forEach(key => {

        //   for (let i = 0; i < this.data1.length; i++) {
        //     if (key == this.data1[i].id) {
        //       if (this.GETDATA[key] == "" || this.GETDATA[key] == "false") {
        //         this.data1[i].status = false;
        //       }
        //       else if (this.GETDATA[key] == "true" || this.GETDATA[key] == true) {
        //         this.data1[i].status = true;
        //         this.checkList.push(key)
        //       }
        //       else {
        //         if (this.GETDATA[key] == true || this.GETDATA[key] == false) {
        //           this.data1[i].status = this.GETDATA[key]
        //         }
        //       }
        //     }
        //   }
        // })
        this.claimNumber =
          this.GETDATA.ic_Claim_Number == "null" ||
          this.GETDATA.ic_Claim_Number == undefined ||
          this.GETDATA.ic_Claim_Number == null
            ? ""
            : this.GETDATA.ic_Claim_Number;
        this.incidentid =
          this.GETDATA.ic_Incident_ID == "null" ||
          this.GETDATA.ic_Incident_ID == undefined ||
          this.GETDATA.ic_Incident_ID == null
            ? ""
            : this.GETDATA.ic_Incident_ID;

        this.caseid =
          this.GETDATA.ic_case_num == "null" ||
          this.GETDATA.ic_case_num == undefined ||
          this.GETDATA.ic_case_num == null
            ? ""
            : this.GETDATA.ic_case_num;
        this.holddate =
          this.GETDATA.ic_hold_date == "null" ||
          this.GETDATA.ic_hold_date == undefined ||
          this.GETDATA.ic_hold_date == null
            ? ""
            : new Date(this.GETDATA.ic_hold_date).toISOString().split("T")[0];
        console.log(this.GETDATA, this.holddate);

        this.incidentdate = new Date(this.GETDATA.ic_incidentDate)
          .toISOString()
          .split("T")[0];
        if (this.GETDATA.ic_numOfVehicles == 0) {
          this.vehcle0();
        }
        if (this.GETDATA.ic_numOfVehicles == 1) {
          this.vehcle1();
        }
        if (this.GETDATA.ic_numOfVehicles == 2) {
          this.vehcle2();
        }
        if (this.GETDATA.ic_numOfVehicles == 3) {
          this.vehcle3();
        }
        if (this.GETDATA.ic_numOfVehicles == 4) {
          this.vehcle4();
        }
        if (this.GETDATA.ic_numOfVehicles == 5) {
          this.vehcle5();
        }
        // console.log(
        //   new Date(this.GETDATA.ic_incidentDate).toISOString().split("T")[0]
        // );
        // this.Datepipe.transform(
        //   this.GETDATA.ic_incidentDate,
        //   "MM/dd/yyyy"
        // );

        this.costofrepairbutton1 = this.GETDATA.ic_hasCostOfRepair_1;
        this.towbutton1 = this.GETDATA.ic_hasTowInvoice_1;
        this.flooredbutton1 = this.GETDATA.ic_isVehicleFloored_1;
        this.loanerbutton1 = this.GETDATA.ic_isLoanerProgram_1;

        this.costofrepairbutton2 = this.GETDATA.ic_hasCostOfRepair_2;
        this.towbutton2 = this.GETDATA.ic_hasTowInvoice_2;
        this.flooredbutton2 = this.GETDATA.ic_isVehicleFloored_2;
        this.loanerbutton2 = this.GETDATA.ic_isLoanerProgram_2;

        this.costofrepairbutton3 = this.GETDATA.ic_hasCostOfRepair_3;
        this.towbutton3 = this.GETDATA.ic_hasTowInvoice_3;
        this.flooredbutton3 = this.GETDATA.ic_isVehicleFloored_3;
        this.loanerbutton3 = this.GETDATA.ic_isLoanerProgram_3;

        this.costofrepairbutton4 = this.GETDATA.ic_hasCostOfRepair_4;
        this.towbutton4 = this.GETDATA.ic_hasTowInvoice_4;
        this.flooredbutton4 = this.GETDATA.ic_isVehicleFloored_4;
        this.loanerbutton4 = this.GETDATA.ic_isLoanerProgram_4;

        this.costofrepairbutton5 = this.GETDATA.ic_hasCostOfRepair_5;
        this.towbutton5 = this.GETDATA.ic_hasTowInvoice_5;
        this.flooredbutton5 = this.GETDATA.ic_isVehicleFloored_5;
        this.loanerbutton5 = this.GETDATA.ic_isLoanerProgram_5;
        this.EmpInj = this.GETDATA.ic_employeeInjured;
        this.CusInj = this.GETDATA.ic_customerInjured;
        this.PoliceFile = this.GETDATA.ic_hasPoliceFile;

        (this.id = this.GETDATA.ic_claim_id),
          this.myform.controls.status.setValue(this.GETDATA.ic_status);
        this.dlveh7 = this.GETDATA.ic_propertydamage;
        this.dlveh = this.GETDATA.ic_damageToLoanerVehicle;
        this.dlveh2 = this.GETDATA.ic_inventoryOrNonLoaner;
        this.dlveh3 = this.GETDATA.ic_theftOfVehicle;
        this.dlveh4 = this.GETDATA.ic_lostMissingVehicle;
        this.dlveh5 = this.GETDATA.ic_damageToCustomerVehicle;
        this.dlveh6 = this.GETDATA.ic_otherDocumenting;

        this.cid = this.GETDATA.ic_claim_id;
        this.injry1 = this.GETDATA.ei_injury_1;
        this.frstaid1 = this.GETDATA.ei_firstAid_1;
        this.closecll1 = this.GETDATA.ei_closeCallObservation_1;

        this.injry2 = this.GETDATA.ci_injury_2;
        this.frstaid2 = this.GETDATA.ci_firstAid_2;
        this.closecll2 = this.GETDATA.ci_closeCallObservation_2;

        this.medical1 = this.GETDATA.ei_isMedicalTreatment_1;
        this.medical2 = this.GETDATA.ci_isMedicalTreatment_2;

        this.myform.controls["ic_propertyDamage"].setValue(
          this.GETDATA.ic_propertydamage == "true" ? true : false
        );
        this.myform.controls["ic_damageToLoanerVehicle"].setValue(
          this.GETDATA.ic_damageToLoanerVehicle == "true" ? true : false
        );
        this.myform.controls["ic_inventoryOrNonLoaner"].setValue(
          this.GETDATA.ic_inventoryOrNonLoaner == "true" ? true : false
        );
        this.myform.controls["ic_theftOfVehicle"].setValue(
          this.GETDATA.ic_theftOfVehicle == "true" ? true : false
        );
        this.myform.controls["ic_lostMissingVehicle"].setValue(
          this.GETDATA.ic_lostMissingVehicle == "true" ? true : false
        );
        this.myform.controls["ic_damageToCustomerVehicle"].setValue(
          this.GETDATA.ic_damageToCustomerVehicle == "true" ? true : false
        );
        this.myform.controls["ic_otherDocumenting"].setValue(
          this.GETDATA.ic_otherDocumenting == "true" ? true : false
        );

        this.myform.controls["Employeename"].setValue(
          this.GETDATA.ic_employeeName == null ||
            this.GETDATA.ic_employeeName == undefined ||
            this.GETDATA.ic_employeeName == "null"
            ? ""
            : this.GETDATA.ic_employeeName
        );
        this.myform.controls["Supervisorname"].setValue(
          this.GETDATA.ic_supervisorName == null ||
            this.GETDATA.ic_supervisorName == undefined ||
            this.GETDATA.ic_supervisorName == "null"
            ? ""
            : this.GETDATA.ic_supervisorName
        );
        this.myform.controls["Employeemail"].setValue(
          this.GETDATA.ic_employeeEmail == null ||
            this.GETDATA.ic_employeeEmail == undefined ||
            this.GETDATA.ic_employeeEmail == "null"
            ? ""
            : this.GETDATA.ic_employeeEmail
        );
        this.myform.controls["Employeephone"].setValue(
          this.GETDATA.ic_employeePhone == null ||
            this.GETDATA.ic_employeePhone == undefined ||
            this.GETDATA.ic_employeePhone == "null"
            ? ""
            : this.GETDATA.ic_employeePhone
        );
        this.myform.controls["Supervisormail"].setValue(
          this.GETDATA.ic_supervisorEmail == null ||
            this.GETDATA.ic_supervisorEmail == undefined ||
            this.GETDATA.ic_supervisorEmail == "null"
            ? ""
            : this.GETDATA.ic_employeeEmail
        );
        this.myform.controls["Position"].setValue(
          this.GETDATA.ic_employeePosition == null ||
            this.GETDATA.ic_employeePosition == undefined ||
            this.GETDATA.ic_employeePosition == "null"
            ? ""
            : this.GETDATA.ic_employeePosition
        );
        this.myform.controls["Department"].setValue(
          this.GETDATA.ic_department == null ||
            this.GETDATA.ic_department == undefined ||
            this.GETDATA.ic_department == "null"
            ? ""
            : this.GETDATA.ic_department
        );
        this.myform.controls["StoreName"].setValue(
          this.GETDATA.ic_dealership == null ||
            this.GETDATA.ic_dealership == undefined ||
            this.GETDATA.ic_dealership == "null"
            ? ""
            : this.GETDATA.ic_dealership
        );
        // this.myform.controls["IncidentDate"].setValue(
        //   this.GETDATA.ic_incidentDate
        // );
        this.myform.controls["GeneralLocation"].setValue(
          this.GETDATA.ic_generalLocation == null ||
            this.GETDATA.ic_generalLocation == undefined ||
            this.GETDATA.ic_generalLocation == "null"
            ? ""
            : this.GETDATA.ic_generalLocation
        );
        this.myform.controls["DesofIncident"].setValue(
          this.GETDATA.ic_incidentDescription == null ||
            this.GETDATA.ic_incidentDescription == undefined ||
            this.GETDATA.ic_incidentDescription == "null"
            ? ""
            : this.GETDATA.ic_incidentDescription
        );
        this.myform.controls["witnessInfo"].setValue(
          this.GETDATA.ic_witnessesInfo == null ||
            this.GETDATA.ic_witnessesInfo == undefined ||
            this.GETDATA.ic_witnessesInfo == "null"
            ? ""
            : this.GETDATA.ic_witnessesInfo
        );
        this.myform.controls["VehicleOwner1"].setValue(
          this.GETDATA.ic_vehicleOwner_1 == null ||
            this.GETDATA.ic_vehicleOwner_1 == undefined ||
            this.GETDATA.ic_vehicleOwner_1 == "null"
            ? ""
            : this.GETDATA.ic_vehicleOwner_1
        );
        this.myform.controls["VehicleMake1"].setValue(
          this.GETDATA.ic_vehicleOwner_1 == null ||
            this.GETDATA.ic_vehicleOwner_1 == undefined ||
            this.GETDATA.ic_vehicleOwner_1 == "null"
            ? ""
            : this.GETDATA.ic_vehicleOwner_1
        );
        this.myform.controls["VehicleModel1"].setValue(
          this.GETDATA.ic_vehicleModel_1 == null ||
            this.GETDATA.ic_vehicleModel_1 == undefined ||
            this.GETDATA.ic_vehicleModel_1 == "null"
            ? ""
            : this.GETDATA.ic_vehicleModel_1
        );
        this.myform.controls["VIN1"].setValue(
          this.GETDATA.ic_vehicleVin_1 == null ||
            this.GETDATA.ic_vehicleVin_1 == undefined ||
            this.GETDATA.ic_vehicleVin_1 == "null"
            ? ""
            : this.GETDATA.ic_vehicleVin_1
        );
        this.myform.controls["Color1"].setValue(
          this.GETDATA.ic_vehicleColor_1 == null ||
            this.GETDATA.ic_vehicleColor_1 == undefined ||
            this.GETDATA.ic_vehicleColor_1 == "null"
            ? ""
            : this.GETDATA.ic_vehicleColor_1
        );
        this.myform.controls["LastKnownMileage1"].setValue(
          this.GETDATA.ic_lastKnownMileage_1 == null ||
            this.GETDATA.ic_lastKnownMileage_1 == undefined ||
            this.GETDATA.ic_lastKnownMileage_1 == "null"
            ? ""
            : this.GETDATA.ic_lastKnownMileage_1
        );
        this.myform.controls["Location1"].setValue(
          this.GETDATA.ic_vehicleLocation_1 == null ||
            this.GETDATA.ic_vehicleLocation_1 == undefined ||
            this.GETDATA.ic_vehicleLocation_1 == "null"
            ? ""
            : this.GETDATA.ic_vehicleLocation_1
        );
        this.myform.controls["costOfRepair_1"].setValue(
          this.GETDATA.ic_costOfRepair_1 == null ||
            this.GETDATA.ic_costOfRepair_1 == undefined ||
            this.GETDATA.ic_costOfRepair_1 == "null"
            ? ""
            : this.GETDATA.ic_costOfRepair_1
        );
        this.myform.controls["flooredWithWhom_1"].setValue(
          this.GETDATA.ic_flooredWithWhom_1 == null ||
            this.GETDATA.ic_flooredWithWhom_1 == undefined ||
            this.GETDATA.ic_flooredWithWhom_1 == "null"
            ? ""
            : this.GETDATA.ic_flooredWithWhom_1
        );
        this.myform.controls["loanerProgramWithWhom_1"].setValue(
          this.GETDATA.ic_loanerProgramWithWhom_1 == null ||
            this.GETDATA.ic_loanerProgramWithWhom_1 == undefined ||
            this.GETDATA.ic_loanerProgramWithWhom_1 == "null"
            ? ""
            : this.GETDATA.ic_loanerProgramWithWhom_1
        );

        this.myform.controls["InsuranceCompany1"].setValue(
          this.GETDATA.ic_insuranceCompany_1 == null ||
            this.GETDATA.ic_insuranceCompany_1 == undefined ||
            this.GETDATA.ic_insuranceCompany_1 == "null"
            ? ""
            : this.GETDATA.ic_insuranceCompany_1
        );
        this.myform.controls["ClaimNumber1"].setValue(
          this.GETDATA.ic_insuranceClaimNumber_1 == null ||
            this.GETDATA.ic_insuranceClaimNumber_1 == undefined ||
            this.GETDATA.ic_insuranceClaimNumber_1 == "null"
            ? ""
            : this.GETDATA.ic_insuranceClaimNumber_1
        );
        this.myform.controls["PolicyNumber1"].setValue(
          this.GETDATA.ic_insurancePolicyNumber_1 == null ||
            this.GETDATA.ic_insurancePolicyNumber_1 == undefined ||
            this.GETDATA.ic_insurancePolicyNumber_1 == "null"
            ? ""
            : this.GETDATA.ic_insurancePolicyNumber_1
        );
        this.myform.controls["AgentFullName1"].setValue(
          this.GETDATA.ic_insuranceAgentFullName_1 == null ||
            this.GETDATA.ic_insuranceAgentFullName_1 == undefined ||
            this.GETDATA.ic_insuranceAgentFullName_1 == "null"
            ? ""
            : this.GETDATA.ic_insuranceAgentFullName_1
        );
        this.myform.controls["AgentPhone1"].setValue(
          this.GETDATA.ic_insuranceAgentPhone_1 == null ||
            this.GETDATA.ic_insuranceAgentPhone_1 == undefined ||
            this.GETDATA.ic_insuranceAgentPhone_1 == "null"
            ? ""
            : this.GETDATA.ic_insuranceAgentPhone_1
        );

        this.myform.controls["VehicleOwner2"].setValue(
          this.GETDATA.ic_vehicleOwner_2 == null ||
            this.GETDATA.ic_vehicleOwner_2 == undefined ||
            this.GETDATA.ic_vehicleOwner_2 == "null"
            ? ""
            : this.GETDATA.ic_vehicleOwner_2
        );
        this.myform.controls["VehicleMake2"].setValue(
          this.GETDATA.ic_vehicleMake_2 == null ||
            this.GETDATA.ic_vehicleMake_2 == undefined ||
            this.GETDATA.ic_vehicleMake_2 == "null"
            ? ""
            : this.GETDATA.ic_vehicleMake_2
        );
        this.myform.controls["VehicleModel2"].setValue(
          this.GETDATA.ic_vehicleModel_2 == null ||
            this.GETDATA.ic_vehicleModel_2 == undefined ||
            this.GETDATA.ic_vehicleModel_2 == "null"
            ? ""
            : this.GETDATA.ic_vehicleModel_2
        );
        this.myform.controls["VIN2"].setValue(
          this.GETDATA.ic_vehicleVin_2 == null ||
            this.GETDATA.ic_vehicleVin_2 == undefined ||
            this.GETDATA.ic_vehicleVin_2 == "null"
            ? ""
            : this.GETDATA.ic_vehicleVin_2
        );
        this.myform.controls["Color2"].setValue(
          this.GETDATA.ic_vehicleColor_2 == null ||
            this.GETDATA.ic_vehicleColor_2 == undefined ||
            this.GETDATA.ic_vehicleColor_2 == "null"
            ? ""
            : this.GETDATA.ic_vehicleColor_2
        );
        this.myform.controls["LastKnownMileage2"].setValue(
          this.GETDATA.ic_lastKnownMileage_2 == null ||
            this.GETDATA.ic_lastKnownMileage_2 == undefined ||
            this.GETDATA.ic_lastKnownMileage_2 == "null"
            ? ""
            : this.GETDATA.ic_lastKnownMileage_2
        );
        this.myform.controls["Location2"].setValue(
          this.GETDATA.ic_vehicleLocation_2 == null ||
            this.GETDATA.ic_vehicleLocation_2 == undefined ||
            this.GETDATA.ic_vehicleLocation_2 == "null"
            ? ""
            : this.GETDATA.ic_vehicleLocation_2
        );
        this.myform.controls["costOfRepair_2"].setValue(
          this.GETDATA.ic_costOfRepair_2 == null ||
            this.GETDATA.ic_costOfRepair_2 == undefined ||
            this.GETDATA.ic_costOfRepair_2 == "null"
            ? ""
            : this.GETDATA.ic_costOfRepair_2
        );
        this.myform.controls["flooredWithWhom_2"].setValue(
          this.GETDATA.ic_flooredWithWhom_2 == null ||
            this.GETDATA.ic_flooredWithWhom_2 == undefined ||
            this.GETDATA.ic_flooredWithWhom_2 == "null"
            ? ""
            : this.GETDATA.ic_flooredWithWhom_2
        );
        this.myform.controls["loanerProgramWithWhom_2"].setValue(
          this.GETDATA.ic_loanerProgramWithWhom_2 == null ||
            this.GETDATA.ic_loanerProgramWithWhom_2 == undefined ||
            this.GETDATA.ic_loanerProgramWithWhom_2 == "null"
            ? ""
            : this.GETDATA.ic_loanerProgramWithWhom_2
        );
        this.myform.controls["InsuranceCompany2"].setValue(
          this.GETDATA.ic_insuranceCompany_2 == null ||
            this.GETDATA.ic_insuranceCompany_2 == undefined ||
            this.GETDATA.ic_insuranceCompany_2 == "null"
            ? ""
            : this.GETDATA.ic_insuranceCompany_2
        );
        this.myform.controls["ClaimNumber2"].setValue(
          this.GETDATA.ic_insuranceClaimNumber_2 == null ||
            this.GETDATA.ic_insuranceClaimNumber_2 == undefined ||
            this.GETDATA.ic_insuranceClaimNumber_2 == "null"
            ? ""
            : this.GETDATA.ic_insuranceClaimNumber_2
        );
        this.myform.controls["PolicyNumber2"].setValue(
          this.GETDATA.ic_insurancePolicyNumber_2 == null ||
            this.GETDATA.ic_insurancePolicyNumber_2 == undefined ||
            this.GETDATA.ic_insurancePolicyNumber_2 == "null"
            ? ""
            : this.GETDATA.ic_insurancePolicyNumber_2
        );
        this.myform.controls["AgentFullName2"].setValue(
          this.GETDATA.ic_insuranceAgentFullName_2 == null ||
            this.GETDATA.ic_insuranceAgentFullName_2 == undefined ||
            this.GETDATA.ic_insuranceAgentFullName_2 == "null"
            ? ""
            : this.GETDATA.ic_insuranceAgentFullName_2
        );
        this.myform.controls["AgentPhone2"].setValue(
          this.GETDATA.ic_insuranceAgentPhone_2 == null ||
            this.GETDATA.ic_insuranceAgentPhone_2 == undefined ||
            this.GETDATA.ic_insuranceAgentPhone_2 == "null"
            ? ""
            : this.GETDATA.ic_insuranceAgentPhone_2
        );

        this.myform.controls["VehicleOwner3"].setValue(
          this.GETDATA.ic_vehicleOwner_3 == null ||
            this.GETDATA.ic_vehicleOwner_3 == undefined ||
            this.GETDATA.ic_vehicleOwner_3 == "null"
            ? ""
            : this.GETDATA.ic_vehicleOwner_3
        );
        this.myform.controls["VehicleMake3"].setValue(
          this.GETDATA.ic_vehicleMake_3 == null ||
            this.GETDATA.ic_vehicleMake_3 == undefined ||
            this.GETDATA.ic_vehicleMake_3 == "null"
            ? ""
            : this.GETDATA.ic_vehicleMake_3
        );
        this.myform.controls["VehicleModel3"].setValue(
          this.GETDATA.ic_vehicleModel_3 == null ||
            this.GETDATA.ic_vehicleModel_3 == undefined ||
            this.GETDATA.ic_vehicleModel_3 == "null"
            ? ""
            : this.GETDATA.ic_vehicleModel_3
        );
        this.myform.controls["VIN3"].setValue(
          this.GETDATA.ic_vehicleVin_3 == null ||
            this.GETDATA.ic_vehicleVin_3 == undefined ||
            this.GETDATA.ic_vehicleVin_3 == "null"
            ? ""
            : this.GETDATA.ic_vehicleVin_3
        );
        this.myform.controls["Color3"].setValue(
          this.GETDATA.ic_vehicleColor_3 == null ||
            this.GETDATA.ic_vehicleColor_3 == undefined ||
            this.GETDATA.ic_vehicleColor_3 == "null"
            ? ""
            : this.GETDATA.ic_vehicleColor_3
        );
        this.myform.controls["LastKnownMileage3"].setValue(
          this.GETDATA.ic_lastKnownMileage_3 == null ||
            this.GETDATA.ic_lastKnownMileage_3 == undefined ||
            this.GETDATA.ic_lastKnownMileage_3 == "null"
            ? ""
            : this.GETDATA.ic_lastKnownMileage_3
        );
        this.myform.controls["Location3"].setValue(
          this.GETDATA.ic_vehicleLocation_3 == null ||
            this.GETDATA.ic_vehicleLocation_3 == undefined ||
            this.GETDATA.ic_vehicleLocation_3 == "null"
            ? ""
            : this.GETDATA.ic_vehicleLocation_3
        );
        this.myform.controls["costOfRepair_3"].setValue(
          this.GETDATA.ic_costOfRepair_3 == null ||
            this.GETDATA.ic_costOfRepair_3 == undefined ||
            this.GETDATA.ic_costOfRepair_3 == "null"
            ? ""
            : this.GETDATA.ic_costOfRepair_3
        );
        this.myform.controls["flooredWithWhom_3"].setValue(
          this.GETDATA.ic_flooredWithWhom_3 == null ||
            this.GETDATA.ic_flooredWithWhom_3 == undefined ||
            this.GETDATA.ic_flooredWithWhom_3 == "null"
            ? ""
            : this.GETDATA.ic_flooredWithWhom_3
        );
        this.myform.controls["loanerProgramWithWhom_3"].setValue(
          this.GETDATA.ic_loanerProgramWithWhom_3 == null ||
            this.GETDATA.ic_loanerProgramWithWhom_3 == undefined ||
            this.GETDATA.ic_loanerProgramWithWhom_3 == "null"
            ? ""
            : this.GETDATA.ic_loanerProgramWithWhom_3
        );
        this.myform.controls["InsuranceCompany3"].setValue(
          this.GETDATA.ic_insuranceCompany_3 == null ||
            this.GETDATA.ic_insuranceCompany_3 == undefined ||
            this.GETDATA.ic_insuranceCompany_3 == "null"
            ? ""
            : this.GETDATA.ic_insuranceCompany_3
        );
        this.myform.controls["ClaimNumber3"].setValue(
          this.GETDATA.ic_insuranceClaimNumber_3 == null ||
            this.GETDATA.ic_insuranceClaimNumber_3 == undefined ||
            this.GETDATA.ic_insuranceClaimNumber_3 == "null"
            ? ""
            : this.GETDATA.ic_insuranceClaimNumber_3
        );
        this.myform.controls["PolicyNumber3"].setValue(
          this.GETDATA.ic_insurancePolicyNumber_3 == null ||
            this.GETDATA.ic_insurancePolicyNumber_3 == undefined ||
            this.GETDATA.ic_insurancePolicyNumber_3 == "null"
            ? ""
            : this.GETDATA.ic_insurancePolicyNumber_3
        );
        this.myform.controls["AgentFullName3"].setValue(
          this.GETDATA.ic_insuranceAgentFullName_3 == null ||
            this.GETDATA.ic_insuranceAgentFullName_3 == undefined ||
            this.GETDATA.ic_insuranceAgentFullName_3 == "null"
            ? ""
            : this.GETDATA.ic_insuranceAgentFullName_3
        );
        this.myform.controls["AgentPhone3"].setValue(
          this.GETDATA.ic_insuranceAgentPhone_3 == null ||
            this.GETDATA.ic_insuranceAgentPhone_3 == undefined ||
            this.GETDATA.ic_insuranceAgentPhone_3 == "null"
            ? ""
            : this.GETDATA.ic_insuranceAgentPhone_3
        );

        this.myform.controls["VehicleOwner4"].setValue(
          this.GETDATA.ic_vehicleOwner_4 == null ||
            this.GETDATA.ic_vehicleOwner_4 == undefined ||
            this.GETDATA.ic_vehicleOwner_4 == "null"
            ? ""
            : this.GETDATA.ic_vehicleOwner_4
        );
        this.myform.controls["VehicleMake4"].setValue(
          this.GETDATA.ic_vehicleMake_4 == null ||
            this.GETDATA.ic_vehicleMake_4 == undefined ||
            this.GETDATA.ic_vehicleMake_4 == "null"
            ? ""
            : this.GETDATA.ic_vehicleMake_4
        );
        this.myform.controls["VehicleModel4"].setValue(
          this.GETDATA.ic_vehicleModel_4 == null ||
            this.GETDATA.ic_vehicleModel_4 == undefined ||
            this.GETDATA.ic_vehicleModel_4 == "null"
            ? ""
            : this.GETDATA.ic_vehicleModel_4
        );
        this.myform.controls["VIN4"].setValue(
          this.GETDATA.ic_vehicleVin_4 == null ||
            this.GETDATA.ic_vehicleVin_4 == undefined ||
            this.GETDATA.ic_vehicleVin_4 == "null"
            ? ""
            : this.GETDATA.ic_vehicleVin_4
        );
        this.myform.controls["Color4"].setValue(
          this.GETDATA.ic_vehicleColor_4 == null ||
            this.GETDATA.ic_vehicleColor_4 == undefined ||
            this.GETDATA.ic_vehicleColor_4 == "null"
            ? ""
            : this.GETDATA.ic_vehicleColor_4
        );
        this.myform.controls["LastKnownMileage4"].setValue(
          this.GETDATA.ic_lastKnownMileage_4 == null ||
            this.GETDATA.ic_lastKnownMileage_4 == undefined ||
            this.GETDATA.ic_lastKnownMileage_4 == "null"
            ? ""
            : this.GETDATA.ic_lastKnownMileage_4
        );
        this.myform.controls["Location4"].setValue(
          this.GETDATA.ic_vehicleLocation_4 == null ||
            this.GETDATA.ic_vehicleLocation_4 == undefined ||
            this.GETDATA.ic_vehicleLocation_4 == "null"
            ? ""
            : this.GETDATA.ic_vehicleLocation_4
        );
        this.myform.controls["costOfRepair_4"].setValue(
          this.GETDATA.ic_costOfRepair_4 == null ||
            this.GETDATA.ic_costOfRepair_4 == undefined ||
            this.GETDATA.ic_costOfRepair_4 == "null"
            ? ""
            : this.GETDATA.ic_costOfRepair_4
        );
        this.myform.controls["flooredWithWhom_4"].setValue(
          this.GETDATA.ic_flooredWithWhom_4 == null ||
            this.GETDATA.ic_flooredWithWhom_4 == undefined ||
            this.GETDATA.ic_flooredWithWhom_4 == "null"
            ? ""
            : this.GETDATA.ic_flooredWithWhom_4
        );
        this.myform.controls["loanerProgramWithWhom_4"].setValue(
          this.GETDATA.ic_loanerProgramWithWhom_4 == null ||
            this.GETDATA.ic_loanerProgramWithWhom_4 == undefined ||
            this.GETDATA.ic_loanerProgramWithWhom_4 == "null"
            ? ""
            : this.GETDATA.ic_loanerProgramWithWhom_4
        );
        this.myform.controls["InsuranceCompany4"].setValue(
          this.GETDATA.ic_insuranceCompany_4 == null ||
            this.GETDATA.ic_insuranceCompany_4 == undefined ||
            this.GETDATA.ic_insuranceCompany_4 == "null"
            ? ""
            : this.GETDATA.ic_insuranceCompany_4
        );
        this.myform.controls["ClaimNumber4"].setValue(
          this.GETDATA.ic_insuranceClaimNumber_4 == null ||
            this.GETDATA.ic_insuranceClaimNumber_4 == undefined ||
            this.GETDATA.ic_insuranceClaimNumber_4 == "null"
            ? ""
            : this.GETDATA.ic_insuranceClaimNumber_4
        );
        this.myform.controls["PolicyNumber4"].setValue(
          this.GETDATA.ic_insurancePolicyNumber_4 == null ||
            this.GETDATA.ic_insurancePolicyNumber_4 == undefined ||
            this.GETDATA.ic_insurancePolicyNumber_4 == "null"
            ? ""
            : this.GETDATA.ic_insurancePolicyNumber_4
        );
        this.myform.controls["AgentFullName4"].setValue(
          this.GETDATA.ic_insuranceAgentFullName_4 == null ||
            this.GETDATA.ic_insuranceAgentFullName_4 == undefined ||
            this.GETDATA.ic_insuranceAgentFullName_4 == "null"
            ? ""
            : this.GETDATA.ic_insuranceAgentFullName_4
        );
        this.myform.controls["AgentPhone4"].setValue(
          this.GETDATA.ic_insuranceAgentPhone_4 == null ||
            this.GETDATA.ic_insuranceAgentPhone_4 == undefined ||
            this.GETDATA.ic_insuranceAgentPhone_4 == "null"
            ? ""
            : this.GETDATA.ic_insuranceAgentPhone_4
        );

        this.myform.controls["VehicleOwner5"].setValue(
          this.GETDATA.ic_vehicleOwner_5 == null ||
            this.GETDATA.ic_vehicleOwner_5 == undefined ||
            this.GETDATA.ic_vehicleOwner_5 == "null"
            ? ""
            : this.GETDATA.ic_vehicleOwner_5
        );
        this.myform.controls["VehicleMake5"].setValue(
          this.GETDATA.ic_vehicleMake_5 == null ||
            this.GETDATA.ic_vehicleMake_5 == undefined ||
            this.GETDATA.ic_vehicleMake_5 == "null"
            ? ""
            : this.GETDATA.ic_vehicleMake_5
        );
        this.myform.controls["VehicleModel5"].setValue(
          this.GETDATA.ic_vehicleModel_5 == null ||
            this.GETDATA.ic_vehicleModel_5 == undefined ||
            this.GETDATA.ic_vehicleModel_5 == "null"
            ? ""
            : this.GETDATA.ic_vehicleModel_5
        );
        this.myform.controls["VIN5"].setValue(
          this.GETDATA.ic_vehicleVin_5 == null ||
            this.GETDATA.ic_vehicleVin_5 == undefined ||
            this.GETDATA.ic_vehicleVin_5 == "null"
            ? ""
            : this.GETDATA.ic_vehicleVin_5
        );
        this.myform.controls["Color5"].setValue(
          this.GETDATA.ic_vehicleColor_5 == null ||
            this.GETDATA.ic_vehicleColor_5 == undefined ||
            this.GETDATA.ic_vehicleColor_5 == "null"
            ? ""
            : this.GETDATA.ic_vehicleColor_5
        );
        this.myform.controls["LastKnownMileage5"].setValue(
          this.GETDATA.ic_lastKnownMileage_5 == null ||
            this.GETDATA.ic_lastKnownMileage_5 == undefined ||
            this.GETDATA.ic_lastKnownMileage_5 == "null"
            ? ""
            : this.GETDATA.ic_lastKnownMileage_5
        );
        this.myform.controls["Location5"].setValue(
          this.GETDATA.ic_vehicleLocation_5 == null ||
            this.GETDATA.ic_vehicleLocation_5 == undefined ||
            this.GETDATA.ic_vehicleLocation_5 == "null"
            ? ""
            : this.GETDATA.ic_vehicleLocation_5
        );
        this.myform.controls["costOfRepair_5"].setValue(
          this.GETDATA.ic_costOfRepair_5 == null ||
            this.GETDATA.ic_costOfRepair_5 == undefined ||
            this.GETDATA.ic_costOfRepair_5 == "null"
            ? ""
            : this.GETDATA.ic_costOfRepair_5
        );
        this.myform.controls["flooredWithWhom_5"].setValue(
          this.GETDATA.ic_flooredWithWhom_5 == null ||
            this.GETDATA.ic_flooredWithWhom_5 == undefined ||
            this.GETDATA.ic_flooredWithWhom_5 == "null"
            ? ""
            : this.GETDATA.ic_flooredWithWhom_5
        );
        this.myform.controls["loanerProgramWithWhom_5"].setValue(
          this.GETDATA.ic_loanerProgramWithWhom_5 == null ||
            this.GETDATA.ic_loanerProgramWithWhom_5 == undefined ||
            this.GETDATA.ic_loanerProgramWithWhom_5 == "null"
            ? ""
            : this.GETDATA.ic_loanerProgramWithWhom_5
        );
        this.myform.controls["InsuranceCompany5"].setValue(
          this.GETDATA.ic_insuranceCompany_5 == null ||
            this.GETDATA.ic_insuranceCompany_5 == undefined ||
            this.GETDATA.ic_insuranceCompany_5 == "null"
            ? ""
            : this.GETDATA.ic_insuranceCompany_5
        );
        this.myform.controls["ClaimNumber5"].setValue(
          this.GETDATA.ic_insuranceClaimNumber_5 == null ||
            this.GETDATA.ic_insuranceClaimNumber_5 == undefined ||
            this.GETDATA.ic_insuranceClaimNumber_5 == "null"
            ? ""
            : this.GETDATA.ic_insuranceClaimNumber_5
        );
        this.myform.controls["PolicyNumber5"].setValue(
          this.GETDATA.ic_insurancePolicyNumber_5 == null ||
            this.GETDATA.ic_insurancePolicyNumber_5 == undefined ||
            this.GETDATA.ic_insurancePolicyNumber_5 == "null"
            ? ""
            : this.GETDATA.ic_insurancePolicyNumber_5
        );
        this.myform.controls["AgentFullName5"].setValue(
          this.GETDATA.ic_insuranceAgentFullName_5 == null ||
            this.GETDATA.ic_insuranceAgentFullName_5 == undefined ||
            this.GETDATA.ic_insuranceAgentFullName_5 == "null"
            ? ""
            : this.GETDATA.ic_insuranceAgentFullName_5
        );
        this.myform.controls["AgentPhone5"].setValue(
          this.GETDATA.ic_insuranceAgentPhone_5 == null ||
            this.GETDATA.ic_insuranceAgentPhone_5 == undefined ||
            this.GETDATA.ic_insuranceAgentPhone_5 == "null"
            ? ""
            : this.GETDATA.ic_insuranceAgentPhone_5
        );
        this.myform.controls["injuryDescription"].setValue(
          this.GETDATA.ic_injuryDescription == null ||
            this.GETDATA.ic_injuryDescription == undefined ||
            this.GETDATA.ic_injuryDescription == "null"
            ? ""
            : this.GETDATA.ic_injuryDescription
        );
        this.myform.controls["policeFileNumber"].setValue(
          this.GETDATA.ic_policeFileNumber == "null" ||
            this.GETDATA.ic_policeFileNumber == null ||
            this.GETDATA.ic_policeFileNumber == undefined
            ? ""
            : this.GETDATA.ic_policeFileNumber
        );
        this.myform.controls["officerInCharge"].setValue(
          this.GETDATA.ic_officerInCharge == "null" ||
            this.GETDATA.ic_officerInCharge == null ||
            this.GETDATA.ic_officerInCharge == undefined
            ? ""
            : this.GETDATA.ic_officerInCharge
        );
        this.myform.controls["policeStation"].setValue(
          this.GETDATA.ic_policeStation == "null" ||
            this.GETDATA.ic_policeStation == null ||
            this.GETDATA.ic_policeStation == undefined
            ? ""
            : this.GETDATA.ic_policeStation
        );
        this.myform.controls["policeStationPhone"].setValue(
          this.GETDATA.ic_policeStationPhone == "null" ||
            this.GETDATA.ic_policeStationPhone == null ||
            this.GETDATA.ic_policeStationPhone == undefined
            ? ""
            : this.GETDATA.ic_policeStationPhone
        );
        this.myform.controls["policeStationEmail"].setValue(
          this.GETDATA.ic_policeStationEmail == "null" ||
            this.GETDATA.ic_policeStationEmail == null ||
            this.GETDATA.ic_policeStationEmail == undefined
            ? ""
            : this.GETDATA.ic_policeStationEmail
        );
        this.Witnessescolor = this.GETDATA.ic_hasWitnesses;
        this.TextareaShow(this.Witnessescolor);
        this.TextShow1v1(this.costofrepairbutton1);
        this.Towbutton1(this.towbutton1);
        this.TextShow2v1(this.flooredbutton1);
        this.TextShow3v1(this.loanerbutton1);

        this.TextShow1v2(this.costofrepairbutton2);
        this.Towbutton2(this.towbutton2);
        this.TextShow2v2(this.flooredbutton2);
        this.TextShow3v2(this.loanerbutton2);

        this.TextShow1v3(this.costofrepairbutton3);
        this.Towbutton3(this.towbutton3);
        this.TextShow2v3(this.flooredbutton3);
        this.TextShow3v3(this.loanerbutton3);

        this.TextShow1v4(this.costofrepairbutton4);
        this.Towbutton4(this.towbutton4);
        this.TextShow2v4(this.flooredbutton4);
        this.TextShow3v4(this.loanerbutton4);

        this.TextShow1v5(this.costofrepairbutton5);
        this.Towbutton5(this.towbutton5);
        this.TextShow2v5(this.flooredbutton5);
        this.TextShow3v5(this.loanerbutton5);
        this.PoliceStationInfo(this.PoliceFile);
        this.selecteditem = this.GETDATA;

        this.myform.controls["towCompanyname_1"].setValue(
          this.GETDATA.ic_VehicletowCompanyName_1 == null ||
            this.GETDATA.ic_VehicletowCompanyName_1 == undefined ||
            this.GETDATA.ic_VehicletowCompanyName_1 == "null"
            ? ""
            : this.GETDATA.ic_VehicletowCompanyName_1
        );
        this.myform.controls["towCompanydesc_1"].setValue(
          this.GETDATA.ic_VehicletowDescription_1 == null ||
            this.GETDATA.ic_VehicletowDescription_1 == undefined ||
            this.GETDATA.ic_VehicletowDescription_1 == "null"
            ? ""
            : this.GETDATA.ic_VehicletowDescription_1
        );
        this.myform.controls["towCompanyname_2"].setValue(
          this.GETDATA.ic_VehicletowCompanyName_2 == null ||
            this.GETDATA.ic_VehicletowCompanyName_2 == undefined ||
            this.GETDATA.ic_VehicletowCompanyName_2 == "null"
            ? ""
            : this.GETDATA.ic_VehicletowCompanyName_2
        );
        this.myform.controls["towCompanydesc_2"].setValue(
          this.GETDATA.ic_VehicletowDescription_2 == null ||
            this.GETDATA.ic_VehicletowDescription_2 == undefined ||
            this.GETDATA.ic_VehicletowDescription_2 == "null"
            ? ""
            : this.GETDATA.ic_VehicletowDescription_2
        );
        this.myform.controls["towCompanyname_3"].setValue(
          this.GETDATA.ic_VehicletowCompanyName_3 == null ||
            this.GETDATA.ic_VehicletowCompanyName_3 == undefined ||
            this.GETDATA.ic_VehicletowCompanyName_3 == "null"
            ? ""
            : this.GETDATA.ic_VehicletowCompanyName_3
        );
        this.myform.controls["towCompanydesc_3"].setValue(
          this.GETDATA.ic_VehicletowDescription_3 == null ||
            this.GETDATA.ic_VehicletowDescription_3 == undefined ||
            this.GETDATA.ic_VehicletowDescription_3 == "null"
            ? ""
            : this.GETDATA.ic_VehicletowDescription_3
        );
        this.myform.controls["towCompanyname_4"].setValue(
          this.GETDATA.ic_VehicletowCompanyName_4 == null ||
            this.GETDATA.ic_VehicletowCompanyName_4 == undefined ||
            this.GETDATA.ic_VehicletowCompanyName_4 == "null"
            ? ""
            : this.GETDATA.ic_VehicletowCompanyName_4
        );
        this.myform.controls["towCompanydesc_4"].setValue(
          this.GETDATA.ic_VehicletowDescription_4 == null ||
            this.GETDATA.ic_VehicletowDescription_4 == undefined ||
            this.GETDATA.ic_VehicletowDescription_4 == "null"
            ? ""
            : this.GETDATA.ic_VehicletowDescription_4
        );
        this.myform.controls["towCompanyname_5"].setValue(
          this.GETDATA.ic_VehicletowCompanyName_5 == null ||
            this.GETDATA.ic_VehicletowCompanyName_5 == undefined ||
            this.GETDATA.ic_VehicletowCompanyName_5 == "null"
            ? ""
            : this.GETDATA.ic_VehicletowCompanyName_5
        );
        this.myform.controls["towCompanydesc_5"].setValue(
          this.GETDATA.ic_VehicletowDescription_5 == null ||
            this.GETDATA.ic_VehicletowDescription_5 == undefined ||
            this.GETDATA.ic_VehicletowDescription_5 == "null"
            ? ""
            : this.GETDATA.ic_VehicletowDescription_5
        );

        this.myform.controls["VehiclePhone1"].setValue(
          this.GETDATA.ic_vehicleownerPhone_1 == null ||
            this.GETDATA.ic_vehicleownerPhone_1 == undefined ||
            this.GETDATA.ic_vehicleownerPhone_1 == "null"
            ? ""
            : this.GETDATA.ic_vehicleownerPhone_1
        );
        this.myform.controls["VehiclePhone2"].setValue(
          this.GETDATA.ic_vehicleownerPhone_2 == null ||
            this.GETDATA.ic_vehicleownerPhone_2 == undefined ||
            this.GETDATA.ic_vehicleownerPhone_2 == "null"
            ? ""
            : this.GETDATA.ic_vehicleownerPhone_2
        );
        this.myform.controls["VehiclePhone3"].setValue(
          this.GETDATA.ic_vehicleownerPhone_3 == null ||
            this.GETDATA.ic_vehicleownerPhone_3 == undefined ||
            this.GETDATA.ic_vehicleownerPhone_3 == "null"
            ? ""
            : this.GETDATA.ic_vehicleownerPhone_3
        );
        this.myform.controls["VehiclePhone4"].setValue(
          this.GETDATA.ic_vehicleownerPhone_4 == null ||
            this.GETDATA.ic_vehicleownerPhone_4 == undefined ||
            this.GETDATA.ic_vehicleownerPhone_4 == "null"
            ? ""
            : this.GETDATA.ic_vehicleownerPhone_4
        );
        this.myform.controls["VehiclePhone5"].setValue(
          this.GETDATA.ic_vehicleownerPhone_5 == null ||
            this.GETDATA.ic_vehicleownerPhone_5 == undefined ||
            this.GETDATA.ic_vehicleownerPhone_5 == "null"
            ? ""
            : this.GETDATA.ic_vehicleownerPhone_5
        );

        this.myform.controls["noOfVehicles"].setValue(
          this.GETDATA.ic_numOfVehicles == null ||
            this.GETDATA.ic_numOfVehicles == undefined ||
            this.GETDATA.ic_numOfVehicles == "null"
            ? ""
            : this.GETDATA.ic_numOfVehicles
        );

        console.log(
          this.GETDATA.ic_numOfVehicles,
          this.myform.value.noOfVehicles,
          "sdfsdfsdfsd"
        );
        // this.injur_details = this.fb.group({
        //   injury_1: [this.GETDATA.ei_injury_1 == "true" ? true : false],
        //   firstAid_1: [this.GETDATA.ei_firstAid_1 == "true" ? true : false],
        //   closeCallObservation_1: [
        //     this.GETDATA.ei_closeCallObservation_1 == "true" ? true : false,
        //   ],
        //   injury_2: [this.GETDATA.ci_injury_2 == "true" ? true : false],
        //   firstAid_2: [this.GETDATA.ci_firstAid_2 == "true" ? true : false],
        //   closeCallObservation_2: [
        //     this.GETDATA.ci_closeCallObservation_2 == "true" ? true : false,
        //   ],
        //   injuryTime_1: [this.GETDATA.ei_injuryTime_1],
        //   injuryLocation_1: [this.GETDATA.ei_injuryLocation_1],
        //   causeOfInjury_1: [this.GETDATA.ei_causeOfInjury_1],
        //   injurySustained_1: [this.GETDATA.ei_injurySustained_1],
        //   medicalCenterPhysician_1: [this.GETDATA.ei_medicalCenterPhysician_1],
        //   descriptionOfIncident_1: [this.GETDATA.ei_descriptionOfIncident_1],
        //   injuryUnsafeAct_1: [this.GETDATA.ei_injuryUnsafeAct_1],
        //   injuryTime_2: [this.GETDATA.ci_injuryTime_2],
        //   injuryLocation_2: [this.GETDATA.ci_injuryLocation_2],
        //   causeOfInjury_2: [this.GETDATA.ci_causeOfInjury_2],
        //   injurySustained_2: [this.GETDATA.ci_injurySustained_2],
        //   medicalCenterPhysician_2: [this.GETDATA.ci_medicalCenterPhysician_2],
        //   descriptionOfIncident_2: [this.GETDATA.ci_descriptionOfIncident_2],
        //   injuryUnsafeAct_2: [this.GETDATA.ci_injuryUnsafeAct_2],
        // });

        this.injur_details_emp.controls["injury_1"].setValue(
          this.GETDATA.ei_injury_1 == "true" ? true : false
        );
        this.injur_details_emp.controls["firstAid_1"].setValue(
          this.GETDATA.ei_firstAid_1 == "true" ? true : false
        );
        this.injur_details_emp.controls["closeCallObservation_1"].setValue(
          this.GETDATA.ei_closeCallObservation_1 == "true" ? true : false
        );
        this.injur_details_cust.controls["injury_2"].setValue(
          this.GETDATA.ci_injury_2 == "true" ? true : false
        );
        this.injur_details_cust.controls["firstAid_2"].setValue(
          this.GETDATA.ci_firstAid_2 == "true" ? true : false
        );
        this.injur_details_cust.controls["closeCallObservation_2"].setValue(
          this.GETDATA.ci_closeCallObservation_2 == "true" ? true : false
        );

        this.injur_details_emp.controls["injuryTime_1"].setValue(
          this.GETDATA.ei_injuryTime_1 == "null" ||
            this.GETDATA.ei_injuryTime_1 == undefined ||
            this.GETDATA.ei_injuryTime_1 == null
            ? ""
            : this.GETDATA.ei_injuryTime_1
        );

        this.injur_details_emp.controls["injuryLocation_1"].setValue(
          this.GETDATA.ei_injuryLocation_1 == "null" ||
            this.GETDATA.ei_injuryLocation_1 == undefined ||
            this.GETDATA.ei_injuryLocation_1 == null
            ? ""
            : this.GETDATA.ei_injuryLocation_1
        );
        this.injur_details_emp.controls["causeOfInjury_1"].setValue(
          this.GETDATA.ei_causeOfInjury_1 == "null" ||
            this.GETDATA.ei_causeOfInjury_1 == undefined ||
            this.GETDATA.ei_causeOfInjury_1 == null
            ? ""
            : this.GETDATA.ei_causeOfInjury_1
        );
        this.injur_details_emp.controls["injurySustained_1"].setValue(
          this.GETDATA.ei_injurySustained_1 == "null" ||
            this.GETDATA.ei_injurySustained_1 == undefined ||
            this.GETDATA.ei_injurySustained_1 == null
            ? ""
            : this.GETDATA.ei_injurySustained_1
        );
        this.injur_details_emp.controls["medicalCenterPhysician_1"].setValue(
          this.GETDATA.ei_medicalCenterPhysician_1 == "null" ||
            this.GETDATA.ei_medicalCenterPhysician_1 == undefined ||
            this.GETDATA.ei_medicalCenterPhysician_1 == null
            ? ""
            : this.GETDATA.ei_medicalCenterPhysician_1
        );
        this.injur_details_emp.controls["descriptionOfIncident_1"].setValue(
          this.GETDATA.ei_descriptionOfIncident_1 == "null" ||
            this.GETDATA.ei_descriptionOfIncident_1 == undefined ||
            this.GETDATA.ei_descriptionOfIncident_1 == null
            ? ""
            : this.GETDATA.ei_descriptionOfIncident_1
        );
        this.injur_details_emp.controls["injuryUnsafeAct_1"].setValue(
          this.GETDATA.ei_injuryUnsafeAct_1 == "null" ||
            this.GETDATA.ei_injuryUnsafeAct_1 == undefined ||
            this.GETDATA.ei_injuryUnsafeAct_1 == null
            ? ""
            : this.GETDATA.ei_injuryUnsafeAct_1
        );

        this.injur_details_cust.controls["injuryTime_2"].setValue(
          this.GETDATA.ci_injuryTime_2 == "null" ||
            this.GETDATA.ci_injuryTime_2 == undefined ||
            this.GETDATA.ci_injuryTime_2 == null
            ? ""
            : this.GETDATA.ci_injuryTime_2
        );
        this.injur_details_cust.controls["injuryLocation_2"].setValue(
          this.GETDATA.ci_injuryLocation_2 == "null" ||
            this.GETDATA.ci_injuryLocation_2 == undefined ||
            this.GETDATA.ci_injuryLocation_2 == null
            ? ""
            : this.GETDATA.ci_injuryLocation_2
        );
        this.injur_details_cust.controls["causeOfInjury_2"].setValue(
          this.GETDATA.ci_causeOfInjury_2 == "null" ||
            this.GETDATA.ci_causeOfInjury_2 == undefined ||
            this.GETDATA.ci_causeOfInjury_2 == null
            ? ""
            : this.GETDATA.ci_causeOfInjury_2
        );
        this.injur_details_cust.controls["injurySustained_2"].setValue(
          this.GETDATA.ci_injurySustained_2 == "null" ||
            this.GETDATA.ci_injurySustained_2 == undefined ||
            this.GETDATA.ci_injurySustained_2 == null
            ? ""
            : this.GETDATA.ci_injurySustained_2
        );
        this.injur_details_cust.controls["medicalCenterPhysician_2"].setValue(
          this.GETDATA.ci_medicalCenterPhysician_2 == "null" ||
            this.GETDATA.ci_medicalCenterPhysician_2 == undefined ||
            this.GETDATA.ci_medicalCenterPhysician_2 == null
            ? ""
            : this.GETDATA.ci_medicalCenterPhysician_2
        );

        this.injur_details_cust.controls["descriptionOfIncident_2"].setValue(
          this.GETDATA.ci_descriptionOfIncident_2 == "null" ||
            this.GETDATA.ci_descriptionOfIncident_2 == undefined ||
            this.GETDATA.ci_descriptionOfIncident_2 == null
            ? ""
            : this.GETDATA.ci_descriptionOfIncident_2
        );
        this.injur_details_cust.controls["injuryUnsafeAct_2"].setValue(
          this.GETDATA.ci_injuryUnsafeAct_2 == "null" ||
            this.GETDATA.ci_injuryUnsafeAct_2 == undefined ||
            this.GETDATA.ci_injuryUnsafeAct_2 == null
            ? ""
            : this.GETDATA.ci_injuryUnsafeAct_2
        );
        this.Emp_Injures = this.GETDATA.ic_employeeInjured;
        this.Cust_Injures = this.GETDATA.ic_customerInjured;
        // this.injur_details = this.fb.group({
        //   // injury_1: [this.GETDATA.ei_injury_1 == "true" ? true : false],
        //   // firstAid_1: [this.GETDATA.ei_firstAid_1 == "true" ? true : false],
        //   // closeCallObservation_1: [
        //   //   this.GETDATA.ei_closeCallObservation_1 == "true" ? true : false,
        //   // ],
        //   // injury_2: [this.GETDATA.ci_injury_2 == "true" ? true : false],
        //   // firstAid_2: [this.GETDATA.ci_firstAid_2 == "true" ? true : false],
        //   // closeCallObservation_2: [
        //   //   this.GETDATA.ci_closeCallObservation_2 == "true" ? true : false,
        //   // ],
        //   injuryTime_1: [
        //     this.GETDATA.ei_injuryTime_1 == "null" ||
        //     this.GETDATA.ei_injuryTime_1 == undefined ||
        //     this.GETDATA.ei_injuryTime_1 == null
        //       ? ""
        //       : this.GETDATA.ei_injuryTime_1,
        //   ],
        //   injuryLocation_1: [
        //     this.GETDATA.ei_injuryLocation_1 == "null" ||
        //     this.GETDATA.ei_injuryLocation_1 == undefined ||
        //     this.GETDATA.ei_injuryLocation_1 == null
        //       ? ""
        //       : this.GETDATA.ei_injuryLocation_1,
        //   ],
        //   causeOfInjury_1: [
        //     this.GETDATA.ei_causeOfInjury_1 == "null" ||
        //     this.GETDATA.ei_causeOfInjury_1 == undefined ||
        //     this.GETDATA.ei_causeOfInjury_1 == null
        //       ? ""
        //       : this.GETDATA.ei_causeOfInjury_1,
        //   ],
        //   injurySustained_1: [
        //     this.GETDATA.ei_injurySustained_1 == "null" ||
        //     this.GETDATA.ei_injurySustained_1 == undefined ||
        //     this.GETDATA.ei_injurySustained_1 == null
        //       ? ""
        //       : this.GETDATA.ei_injurySustained_1,
        //   ],
        //   medicalCenterPhysician_1: [
        //     this.GETDATA.ei_medicalCenterPhysician_1 == "null" ||
        //     this.GETDATA.ei_medicalCenterPhysician_1 == undefined ||
        //     this.GETDATA.ei_medicalCenterPhysician_1 == null
        //       ? ""
        //       : this.GETDATA.ei_medicalCenterPhysician_1,
        //   ],
        //   descriptionOfIncident_1: [
        //     this.GETDATA.ei_descriptionOfIncident_1 == "null" ||
        //     this.GETDATA.ei_descriptionOfIncident_1 == undefined ||
        //     this.GETDATA.ei_descriptionOfIncident_1 == null
        //       ? ""
        //       : this.GETDATA.ei_descriptionOfIncident_1,
        //   ],
        //   injuryUnsafeAct_1: [
        //     this.GETDATA.ei_injuryUnsafeAct_1 == "null" ||
        //     this.GETDATA.ei_injuryUnsafeAct_1 == undefined ||
        //     this.GETDATA.ei_injuryUnsafeAct_1 == null
        //       ? ""
        //       : this.GETDATA.ei_injuryUnsafeAct_1,
        //   ],
        //   injuryTime_2: [
        //     this.GETDATA.ci_injuryTime_2 == "null" ||
        //     this.GETDATA.ci_injuryTime_2 == undefined ||
        //     this.GETDATA.ci_injuryTime_2 == null
        //       ? ""
        //       : this.GETDATA.ci_injuryTime_2,
        //   ],
        //   injuryLocation_2: [
        //     this.GETDATA.ci_injuryLocation_2 == "null" ||
        //     this.GETDATA.ci_injuryLocation_2 == undefined ||
        //     this.GETDATA.ci_injuryLocation_2 == null
        //       ? ""
        //       : this.GETDATA.ci_injuryLocation_2,
        //   ],
        //   causeOfInjury_2: [
        //     this.GETDATA.ci_causeOfInjury_2 == "null" ||
        //     this.GETDATA.ci_causeOfInjury_2 == undefined ||
        //     this.GETDATA.ci_causeOfInjury_2 == null
        //       ? ""
        //       : this.GETDATA.ci_causeOfInjury_2,
        //   ],
        //   injurySustained_2: [
        //     this.GETDATA.ci_injurySustained_2 == "null" ||
        //     this.GETDATA.ci_injurySustained_2 == undefined ||
        //     this.GETDATA.ci_injurySustained_2 == null
        //       ? ""
        //       : this.GETDATA.ci_injurySustained_2,
        //   ],
        //   medicalCenterPhysician_2: [
        //     this.GETDATA.ci_medicalCenterPhysician_2 == "null" ||
        //     this.GETDATA.ci_medicalCenterPhysician_2 == undefined ||
        //     this.GETDATA.ci_medicalCenterPhysician_2 == null
        //       ? ""
        //       : this.GETDATA.ci_medicalCenterPhysician_2,
        //   ],
        //   descriptionOfIncident_2: [
        //     this.GETDATA.ci_descriptionOfIncident_2 == "null" ||
        //     this.GETDATA.ci_descriptionOfIncident_2 == undefined ||
        //     this.GETDATA.ci_descriptionOfIncident_2 == null
        //       ? ""
        //       : this.GETDATA.ci_descriptionOfIncident_2,
        //   ],
        //   injuryUnsafeAct_2: [
        //     this.GETDATA.ci_injuryUnsafeAct_2 == "null" ||
        //     this.GETDATA.ci_injuryUnsafeAct_2 == undefined ||
        //     this.GETDATA.ci_injuryUnsafeAct_2 == null
        //       ? ""
        //       : this.GETDATA.ci_injuryUnsafeAct_2,
        //   ],
        // });

        this.attachmentextensions = [
          { Name: "Vehicle 1", Extension: "Veh1", Attachments: [] },
          { Name: "Vehicle 2", Extension: "Veh2", Attachments: [] },
          { Name: "Vehicle 3", Extension: "Veh3", Attachments: [] },
          { Name: "Vehicle 4", Extension: "Veh4", Attachments: [] },
          { Name: "Vehicle 5", Extension: "Veh5", Attachments: [] },
          {
            Name: "Police Report",
            Extension: "policeReportFiles",
            Attachments: [],
          },
          {
            Name: "Repair Estimate",
            Extension: "repairEstimateFiles",
            Attachments: [],
          },
          {
            Name: "Signed Loaner Agreement",
            Extension: "signedLoanerAgreementFiles",
            Attachments: [],
          },
          {
            Name: "Customer ID",
            Extension: "customerIdFiles",
            Attachments: [],
          },
          {
            Name: "Insurance Card",
            Extension: "insuranceCardFiles",
            Attachments: [],
          },
          { Name: "Other", Extension: "otherFiles", Attachments: [] },
        ];
        this.ATTACHMENTS = JSON.parse(this.GETDATA.attachments);

        console.log(this.ATTACHMENTS);
        if (this.ATTACHMENTS.length == 0) {
          this.showattachments = false;
        } else {
          this.ATTACHMENTS.forEach((val, i) => {
            this.attachmentextensions.forEach((ele, j) => 
            {let first = val.attachment_name.indexOf("_");
            let second = val.attachment_name.indexOf("_", first + 1);
             let third = val.attachment_name.indexOf("_", second + 1);
            let mainbit = val.attachment_name.substring(second + 1, third);
            console.log(mainbit);
            if (mainbit == ele.Extension) 
            {ele.Attachments.push(val);
            }
           // console.log(this.attachmentextensions);});
            });
          });
          this.showattachments = true;
        }
      });
    console.log(this.attachmentextensions);
    // this.filterArray[0].show = this.EmpInj == "Yes" ? true : false;
    // this.filterArray[1].show = this.CusInj == "Yes" ? true : false;
    console.log(this.filterArray);
  }
  // filterArray:any=[]
  changefilterarray() {
    this.selecteall = false;
    this.filterArray = [
      {
        mainSection: "Employee Injury",
        id: "Employee_Injury",
        status: false,
        show: true,
      },
      {
        mainSection: "Customer Injury",
        id: "Customer_Injury",
        status: false,
        show: true,
      },
      {
        mainSection: "Preliminary Information",
        id: "Preliminary_Information",
        show: true,
        status: false,
      },
      {
        mainSection: "Incident Information",
        id: "Incident_Information",
        status: false,
        show: true,
      },
      {
        mainSection: "General Information",
        id: "General_Information",
        status: false,
        show: true,
      },
      // {
      //   mainSection: "Injury Information",
      //   id: "Injury_Information",
      //   status: false,
      //   show: true,
      // },
      {
        mainSection: "Police Information",
        id: "Police_Information",
        status: false,
        show: true,
      },
    ];
    console.log(
      this.GETDATA.ic_customerInjured,
      this.GETDATA.ic_employeeInjured
    );

    if (this.GETDATA.ic_employeeInjured == "yes") {
      this.filterArray[0].show = true;
    } else {
      this.filterArray[0].show = false;
    }
    if (this.GETDATA.ic_customerInjured == "yes") {
      this.filterArray[1].show = true;
    } else {
      this.filterArray[1].show = false;
    }
    console.log(this.filterArray);
  }
  medical1;
  medical2;
  cid;
  injry1;
  frstaid1;
  closecll1;
  injry2;
  frstaid2;
  closecll2;
  // openform() {
  //   console.log("data", this.GETDATA);
  //   this.selecteditem = this.GETDATA;
  //   this.cid = this.GETDATA.ic_claim_id;
  //   this.injry1 = this.GETDATA.ei_injury_1;
  //   this.frstaid1 = this.GETDATA.ei_firstAid_1;
  //   this.closecll1 = this.GETDATA.ei_closeCallObservation_1;

  //   this.injry2 = this.GETDATA.ci_injury_2;
  //   this.frstaid2 = this.GETDATA.ci_firstAid_2;
  //   this.closecll2 = this.GETDATA.ci_closeCallObservation_2;

  //   this.medical1 = this.GETDATA.ei_isMedicalTreatment_1;
  //   this.medical2 = this.GETDATA.ci_isMedicalTreatment_2;

  //   console.log(this.medical1, this.medical2);
  //   this.myform = this.fb.group({
  //     injury_1: [this.GETDATA.ei_injury_1 == "true" ? true : false],
  //     firstAid_1: [this.GETDATA.ei_firstAid_1 == "true" ? true : false],
  //     closeCallObservation_1: [
  //       this.GETDATA.ei_closeCallObservation_1 == "true" ? true : false,
  //     ],
  //     injury_2: [this.GETDATA.ci_injury_2 == "true" ? true : false],
  //     firstAid_2: [this.GETDATA.ci_firstAid_2 == "true" ? true : false],
  //     closeCallObservation_2: [
  //       this.GETDATA.ci_closeCallObservation_2 == "true" ? true : false,
  //     ],
  //     injuryTime_1: [this.GETDATA.ei_injuryTime_1],
  //     injuryLocation_1: [this.GETDATA.ei_injuryLocation_1],
  //     causeOfInjury_1: [this.GETDATA.ei_causeOfInjury_1],
  //     injurySustained_1: [this.GETDATA.ei_injurySustained_1],
  //     medicalCenterPhysician_1: [this.GETDATA.ei_medicalCenterPhysician_1],
  //     descriptionOfIncident_1: [this.GETDATA.ei_descriptionOfIncident_1],
  //     injuryUnsafeAct_1: [this.GETDATA.ei_injuryUnsafeAct_1],
  //     injuryTime_2: [this.GETDATA.ci_injuryTime_2],
  //     injuryLocation_2: [this.GETDATA.ci_injuryLocation_2],
  //     causeOfInjury_2: [this.GETDATA.ci_causeOfInjury_2],
  //     injurySustained_2: [this.GETDATA.ci_injurySustained_2],
  //     medicalCenterPhysician_2: [this.GETDATA.ci_medicalCenterPhysician_2],
  //     descriptionOfIncident_2: [this.GETDATA.ci_descriptionOfIncident_2],
  //     injuryUnsafeAct_2: [this.GETDATA.ci_injuryUnsafeAct_2],
  //   });

  //   //  this.myform.controls["injuryTime_1"].setValue(this.GETDATA.ei_injuryTime_1);
  //   //  this.myform.controls["injuryLocation_1"].setValue(this.GETDATA.ei_injuryLocation_1);
  //   //  this.myform.controls["causeOfInjury_1"].setValue(this.GETDATA.ei_causeOfInjury_1);
  //   //  this.myform.controls["injurySustained_1"].setValue(this.GETDATA.ei_injurySustained_1);
  //   //  this.myform.controls["medicalCenterPhysician_1"].setValue(this.GETDATA.ei_medicalCenterPhysician_1);
  //   //  this.myform.controls["descriptionOfIncident_1"].setValue(this.GETDATA.ei_descriptionOfIncident_1);
  //   //  this.myform.controls["injuryUnsafeAct_1"].setValue(this.GETDATA.ei_injuryUnsafeAct_1);

  //   //  this.myform.controls["injuryTime_2"].setValue(this.GETDATA.ci_injuryTime_2);
  //   //  this.myform.controls["injuryLocation_2"].setValue(this.GETDATA.ci_injuryLocation_2);
  //   //  this.myform.controls["causeOfInjury_2"].setValue(this.GETDATA.ci_causeOfInjury_2);
  //   //  this.myform.controls["injurySustained_2"].setValue(this.GETDATA.ci_injurySustained_2);
  //   //  this.myform.controls["medicalCenterPhysician_2"].setValue(this.GETDATA.ci_medicalCenterPhysician_2);
  //   //  this.myform.controls["descriptionOfIncident_2"].setValue(this.GETDATA.ci_descriptionOfIncident_2);
  //   //  this.myform.controls["injuryUnsafeAct_2"].setValue(this.GETDATA.ci_injuryUnsafeAct_2);

  //   this.ngbModal.open(this.GETDATA, { size: "sm", backdrop: "static" });
  //   // this.myform.controls.injuryTime_1.setValue('this.GETDATA.ei_injuryTime_1')
  //   this.GETDATA.close();
  // }
  getDropdowns() {
    const obj = {};
    this.authService
      .INTERNALPostmethod("insurance/prepopulated-data", obj)
      .subscribe((res) => {
        this.DropdownsData = res.data;
        console.log("dropdwns", this.DropdownsData);
      });
  }
  getInjuryInfo(e, block) {
    //console.log(e.target.checked, block);
    if (block == "Cust") {
      this.Cust_Injures = e.target.checked ? "yes" : "no";
      this.injur_details_cust.controls["injuryTime_2"].setValue("");
      this.injur_details_cust.controls["injuryLocation_2"].setValue("");
      this.injur_details_cust.controls["causeOfInjury_2"].setValue("");
      this.injur_details_cust.controls["injurySustained_2"].setValue("");
      this.injur_details_cust.controls["medicalCenterPhysician_2"].setValue("");
      this.injur_details_cust.controls["injuryUnsafeAct_2"].setValue("");
      this.injur_details_cust.controls["injury_2"].setValue(false);
      this.injur_details_cust.controls["firstAid_2"].setValue(false);
      this.injur_details_cust.controls["closeCallObservation_2"].setValue(
        false
      );
      this.injur_details_cust.controls["descriptionOfIncident_2"].setValue("");
      this.medical2 = false;
      // this.myform.controls["medicalCenterPhysician_1"].setValue("");
    }
    if (block == "Emp") {
      this.Emp_Injures = e.target.checked ? "yes" : "no";
      this.injur_details_emp.controls["injuryTime_1"].setValue("");
      this.injur_details_emp.controls["injuryLocation_1"].setValue("");
      this.injur_details_emp.controls["causeOfInjury_1"].setValue("");
      this.injur_details_emp.controls["injurySustained_1"].setValue("");
      this.injur_details_emp.controls["medicalCenterPhysician_1"].setValue("");
      this.injur_details_emp.controls["injuryUnsafeAct_1"].setValue("");
      this.injur_details_emp.controls["injury_1"].setValue(false);
      this.injur_details_emp.controls["firstAid_1"].setValue(false);
      this.injur_details_emp.controls["closeCallObservation_1"].setValue(false);
      this.injur_details_emp.controls["descriptionOfIncident_1"].setValue("");
      this.medical1 = false;
    }
  }
  injuryYes(e) {
    this.injuryStatus = e;
    console.log(e);
  }
  TowInvoiceYes1(e) {
    this.TowinvoiceStatus1 = e;
    console.log(e);
  }
  TowInvoiceYes2(e) {
    this.TowinvoiceStatus2 = e;
    console.log(e);
  }
  TowInvoiceYes3(e) {
    this.TowinvoiceStatus3 = e;
    console.log(e);
  }
  TowInvoiceYes4(e) {
    this.TowinvoiceStatus4 = e;
    console.log(e);
  }
  TowInvoiceYes5(e) {
    this.TowinvoiceStatus5 = e;
    console.log(e);
  }
  // EmployeeInjury(e) {
  //   this.Employeestatus = e;
  //   console.log(e);
  // }
  CustomerInjury(e) {
    this.CustomerStatus = e;
    console.log(e);
  }
  updatedata() {
    this.submitted = true;
    console.log(
      this.injur_details_emp.value,
      this.myform.value.noOfVehicles,
      this.injur_details_cust.value
    );

    if (
      this.myform.invalid ||
      (this.Emp_Injures == "yes" && this.injur_details_emp.invalid) ||
      (this.Cust_Injures == "yes" && this.injur_details_cust.invalid)
    ) {
      return false;
    } else {
      if (window.confirm("Do you want to save the details")) {
        const fd: any = new FormData();
        fd.append("claim_id", this.GETDATA.ic_claim_id);
        fd.append("dealership", this.myform.value.StoreName);
        fd.append("employeePosition", this.myform.value.Position);
        fd.append("department", this.myform.value.Department);
        fd.append("employeeName", this.myform.value.Employeename);
        fd.append("employeeEmail", this.myform.value.Employeemail);
        fd.append("employeePhone", this.myform.value.Employeephone);
        fd.append("supervisorEmail", this.myform.value.Supervisormail);
        fd.append("supervisorName", this.myform.value.Supervisorname);
        fd.append("needreview_status", "");
        fd.append("hasVehicleFile", "");
        fd.append("hasPoliceFile", this.PoliceFile);
        fd.append("hasRepairEstimateFile", "");
        fd.append("hasSignedLoanerAgreementFile", "");
        fd.append("hasInsuranceCardFile", "");
        fd.append("hasOtherFile", "");
        fd.append("todaysDate", this.currentDate);

        fd.append(
          "PropertyDamage",
          this.myform.value.ic_propertyDamage ? "true" : "false"
        );
        fd.append(
          "damageToLoanerVehicle",
          this.myform.value.ic_damageToLoanerVehicle ? "true" : "false"
        );
        fd.append(
          "inventoryOrNonLoaner",
          this.myform.value.ic_inventoryOrNonLoaner ? "true" : "false"
        );
        fd.append(
          "theftOfVehicle",
          this.myform.value.ic_theftOfVehicle ? "true" : "false"
        );
        fd.append(
          "lostMissingVehicle",
          this.myform.value.ic_lostMissingVehicle ? "true" : "false"
        );
        fd.append(
          "otherDocumenting",
          this.myform.value.ic_otherDocumenting ? "true" : "false"
        );
        fd.append(
          "damageToCustomerVehicle",
          this.myform.value.ic_damageToCustomerVehicle ? "true" : "false"
        );
        fd.append("incidentDate", this.myform.value.IncidentDate);
        fd.append("generalLocation", this.myform.value.GeneralLocation);
        fd.append("incidentDescription", this.myform.value.DesofIncident);
        fd.append("hasWitnesses", this.Witnessescolor);
        fd.append("witnessesInfo", this.myform.value.witnessInfo);
        fd.append("vehicleMake_1", this.myform.value.VehicleMake1);
        fd.append("vehicleModel_1", this.myform.value.VehicleModel1);
        fd.append("vehicleMake_2", this.myform.value.VehicleMake2);
        fd.append("vehicleModel_2", this.myform.value.VehicleModel2);
        fd.append("vehicleMake_3", this.myform.value.VehicleMake3);
        fd.append("vehicleModel_3", this.myform.value.VehicleModel3);
        fd.append("vehicleMake_4", this.myform.value.VehicleMake4);
        fd.append("vehicleModel_4", this.myform.value.VehicleModel4);
        fd.append("vehicleMake_5", this.myform.value.VehicleMake5);
        fd.append("vehicleModel_5", this.myform.value.VehicleModel5);

        fd.append("vehicleColor_1", this.myform.value.Color1);
        fd.append("vehicleColor_2", this.myform.value.Color2);
        fd.append("vehicleColor_3", this.myform.value.Color3);
        fd.append("vehicleColor_4", this.myform.value.Color4);
        fd.append("vehicleColor_5", this.myform.value.Color5);

        fd.append("vehicleVin_1", this.myform.value.VIN1);
        fd.append("vehicleVin_2", this.myform.value.VIN2);
        fd.append("vehicleVin_3", this.myform.value.VIN3);
        fd.append("vehicleVin_4", this.myform.value.VIN4);
        fd.append("vehicleVin_5", this.myform.value.VIN5);

        fd.append("vehicleOwner_1", this.myform.value.VehicleOwner1);
        fd.append("vehicleOwner_2", this.myform.value.VehicleOwner2);
        fd.append("vehicleOwner_3", this.myform.value.VehicleOwner3);
        fd.append("vehicleOwner_4", this.myform.value.VehicleOwner4);
        fd.append("vehicleOwner_5", this.myform.value.VehicleOwner5);

        fd.append("vehicleLocation_1", this.myform.value.Location1);
        fd.append("vehicleLocation_2", this.myform.value.Location2);
        fd.append("vehicleLocation_3", this.myform.value.Location3);
        fd.append("vehicleLocation_4", this.myform.value.Location4);
        fd.append("vehicleLocation_5", this.myform.value.Location5);

        fd.append("lastKnownMileage_1", this.myform.value.LastKnownMileage1);
        fd.append("lastKnownMileage_2", this.myform.value.LastKnownMileage2);
        fd.append("lastKnownMileage_3", this.myform.value.LastKnownMileage3);
        fd.append("lastKnownMileage_4", this.myform.value.LastKnownMileage4);
        fd.append("lastKnownMileage_5", this.myform.value.LastKnownMileage5);

        fd.append("hasCostOfRepair_1", this.costofrepairbutton1);
        fd.append("hasCostOfRepair_2", this.costofrepairbutton2);
        fd.append("hasCostOfRepair_3", this.costofrepairbutton3);
        fd.append("hasCostOfRepair_4", this.costofrepairbutton4);
        fd.append("hasCostOfRepair_5", this.costofrepairbutton5);

        fd.append(
          "costOfRepair_1",

          this.myform.value.costOfRepair_1
        );
        fd.append("costOfRepair_2", this.myform.value.costOfRepair_2);
        fd.append("costOfRepair_3", this.myform.value.costOfRepair_3);
        fd.append("costOfRepair_4", this.myform.value.costOfRepair_4);
        fd.append("costOfRepair_5", this.myform.value.costOfRepair_5);

        fd.append("hasTowInvoice_1", this.towbutton1);
        fd.append("hasTowInvoice_2", this.towbutton2);
        fd.append("hasTowInvoice_3", this.towbutton3);
        fd.append("hasTowInvoice_4", this.towbutton4);
        fd.append("hasTowInvoice_5", this.towbutton5);

        fd.append("isVehicleFloored_1", this.flooredbutton1);
        fd.append("flooredWithWhom_1", this.myform.value.flooredWithWhom_1);
        fd.append("isVehicleFloored_2", this.flooredbutton2);
        fd.append("flooredWithWhom_2", this.myform.value.flooredWithWhom_2);
        fd.append("isVehicleFloored_3", this.flooredbutton3);
        fd.append("flooredWithWhom_3", this.myform.value.flooredWithWhom_3);
        fd.append("isVehicleFloored_4", this.flooredbutton4);
        fd.append("flooredWithWhom_4", this.myform.value.flooredWithWhom_4);
        fd.append("isVehicleFloored_5", this.flooredbutton5);
        fd.append("flooredWithWhom_5", this.myform.value.flooredWithWhom_5);

        fd.append("isLoanerProgram_1", "");
        fd.append("loanerProgramWithWhom_1", "");

        fd.append("insuranceCompany_1", this.myform.value.InsuranceCompany1);
        fd.append("insuranceCompany_2", this.myform.value.InsuranceCompany2);
        fd.append("insuranceCompany_3", this.myform.value.InsuranceCompany3);
        fd.append("insuranceCompany_4", this.myform.value.InsuranceCompany4);
        fd.append("insuranceCompany_5", this.myform.value.InsuranceCompany5);

        fd.append("insuranceClaimNumber_1", this.myform.value.ClaimNumber1);
        fd.append("insuranceClaimNumber_2", this.myform.value.ClaimNumber2);
        fd.append("insuranceClaimNumber_3", this.myform.value.ClaimNumber3);
        fd.append("insuranceClaimNumber_4", this.myform.value.ClaimNumber4);
        fd.append("insuranceClaimNumber_5", this.myform.value.ClaimNumber5);

        fd.append("insurancePolicyNumber_1", this.myform.value.PolicyNumber1);
        fd.append("insurancePolicyNumber_2", this.myform.value.PolicyNumber2);
        fd.append("insurancePolicyNumber_3", this.myform.value.PolicyNumber3);
        fd.append("insurancePolicyNumber_4", this.myform.value.PolicyNumber4);
        fd.append("insurancePolicyNumber_5", this.myform.value.PolicyNumber5);

        fd.append("insuranceAgentFullName_1", this.myform.value.AgentFullName1);
        fd.append("insuranceAgentFullName_2", this.myform.value.AgentFullName2);
        fd.append("insuranceAgentFullName_3", this.myform.value.AgentFullName3);
        fd.append("insuranceAgentFullName_4", this.myform.value.AgentFullName4);
        fd.append("insuranceAgentFullName_5", this.myform.value.AgentFullName5);

        fd.append("insuranceAgentPhone_1", this.myform.value.AgentPhone1);
        fd.append("insuranceAgentPhone_2", this.myform.value.AgentPhone2);
        fd.append("insuranceAgentPhone_3", this.myform.value.AgentPhone3);
        fd.append("insuranceAgentPhone_4", this.myform.value.AgentPhone4);
        fd.append("insuranceAgentPhone_5", this.myform.value.AgentPhone5);

        fd.append("employeeInjured", this.Emp_Injures);
        fd.append("customerInjured", this.Cust_Injures);

        fd.append("injuryDescription", this.myform.value.injuryDescription);

        fd.append("policeFileNumber", this.myform.value.policeFileNumber);
        fd.append("officerInCharge", this.myform.value.officerInCharge);
        fd.append("policeStation", this.myform.value.policeStation);
        fd.append("policeStationPhone", this.myform.value.policeStationPhone);
        fd.append("policeStationEmail", this.myform.value.policeStationEmail);

        fd.append("vehicleFiles_1", "");
        fd.append("vehicleFiles_2", "");
        fd.append("vehicleFiles_3", "");
        fd.append("vehicleFiles_4", "");
        fd.append("vehicleFiles_5", "");

        fd.append("policeReportFiles", "");
        fd.append("repairEstimateFiles", "");
        fd.append("signedLoanerAgreementFiles", "");
        fd.append("customerIdFiles", "");
        fd.append("insuranceCardFiles", "");
        for (var i = 0; i < this.AdditionalFiles.length; i++) {
          fd.append("otherFiles", this.AdditionalFiles[i]);
        }
        //  // fd.append("otherFiles", this.AdditionalFiles);
        // fd.append(
        //   "injury_1",
        //   this.GETDATA.ei_injury_1 == null ||
        //     this.GETDATA.ei_injury_1 == "null" ||
        //     this.GETDATA.ei_injury_1 == undefined
        //     ? ""
        //     : this.GETDATA.ei_injury_1
        // );
        // fd.append(
        //   "firstAid_1",
        //   this.GETDATA.ei_firstAid_1 == null ||
        //     this.GETDATA.ei_firstAid_1 == "null" ||
        //     this.GETDATA.ei_firstAid_1 == undefined
        //     ? ""
        //     : this.GETDATA.ei_firstAid_1
        // );
        // fd.append(
        //   "closeCallObservation_1",
        //   this.GETDATA.ei_closeCallObservation_1 == null ||
        //     this.GETDATA.ei_closeCallObservation_1 == "null" ||
        //     this.GETDATA.ei_closeCallObservation_1 == undefined
        //     ? ""
        //     : this.GETDATA.ei_closeCallObservation_1
        // );
        // fd.append(
        //   "injuryTime_1",
        //   this.GETDATA.ei_injuryTime_1 == null ||
        //     this.GETDATA.ei_injuryTime_1 == "null" ||
        //     this.GETDATA.ei_injuryTime_1 == undefined
        //     ? ""
        //     : this.GETDATA.ei_injuryTime_1
        // );
        // fd.append(
        //   "injuryLocation_1",
        //   this.GETDATA.ei_injuryLocation_1 == null ||
        //     this.GETDATA.ei_injuryLocation_1 == "null" ||
        //     this.GETDATA.ei_injuryLocation_1 == undefined
        //     ? ""
        //     : this.GETDATA.ei_injuryLocation_1
        // );
        // fd.append(
        //   "causeOfInjury_1",
        //   this.GETDATA.ei_causeOfInjury_1 == null ||
        //     this.GETDATA.ei_causeOfInjury_1 == "null" ||
        //     this.GETDATA.ei_causeOfInjury_1 == undefined
        //     ? ""
        //     : this.GETDATA.ei_causeOfInjury_1
        // );
        // fd.append(
        //   "injurySustained_1",
        //   this.GETDATA.ei_injurySustained_1 == null ||
        //     this.GETDATA.ei_injurySustained_1 == "null" ||
        //     this.GETDATA.ei_injurySustained_1 == undefined
        //     ? ""
        //     : this.GETDATA.ei_injurySustained_1
        // );
        // fd.append(
        //   "isMedicalTreatment_1",
        //   this.GETDATA.ei_isMedicalTreatment_1 == null ||
        //     this.GETDATA.ei_isMedicalTreatment_1 == "null" ||
        //     this.GETDATA.ei_isMedicalTreatment_1 == undefined
        //     ? ""
        //     : this.GETDATA.ei_isMedicalTreatment_1
        // );
        // fd.append(
        //   "descriptionOfIncident_1",
        //   this.GETDATA.ei_descriptionOfIncident_1 == null ||
        //     this.GETDATA.ei_descriptionOfIncident_1 == "null" ||
        //     this.GETDATA.ei_descriptionOfIncident_1 == undefined
        //     ? ""
        //     : this.GETDATA.ei_descriptionOfIncident_1
        // );
        // fd.append(
        //   "injuryUnsafeAct_1",
        //   this.GETDATA.ei_injuryUnsafeAct_1 == null ||
        //     this.GETDATA.ei_injuryUnsafeAct_1 == "null" ||
        //     this.GETDATA.ei_injuryUnsafeAct_1 == undefined
        //     ? ""
        //     : this.GETDATA.ei_injuryUnsafeAct_1
        // );
        // fd.append(
        //   "medicalCenterPhysician_1",
        //   this.GETDATA.ei_medicalCenterPhysician_1 == null ||
        //     this.GETDATA.ei_medicalCenterPhysician_1 == "null" ||
        //     this.GETDATA.ei_medicalCenterPhysician_1 == undefined
        //     ? ""
        //     : this.GETDATA.ei_medicalCenterPhysician_1
        // );
        // fd.append(
        //   "injury_2",
        //   this.GETDATA.ci_injury_2 == null ||
        //     this.GETDATA.ci_injury_2 == "null" ||
        //     this.GETDATA.ci_injury_2 == undefined
        //     ? ""
        //     : this.GETDATA.ci_injury_2
        // );
        // fd.append(
        //   "firstAid_2",
        //   this.GETDATA.ci_firstAid_2 == null ||
        //     this.GETDATA.ci_firstAid_2 == "null" ||
        //     this.GETDATA.ci_firstAid_2 == undefined
        //     ? ""
        //     : this.GETDATA.ci_firstAid_2
        // );
        // fd.append(
        //   "closeCallObservation_2",
        //   this.GETDATA.ci_closeCallObservation_2 == null ||
        //     this.GETDATA.ci_closeCallObservation_2 == "null" ||
        //     this.GETDATA.ci_closeCallObservation_2 == undefined
        //     ? ""
        //     : this.GETDATA.ci_closeCallObservation_2
        // );
        // fd.append(
        //   "injuryTime_2",
        //   this.GETDATA.ci_injuryTime_2 == null ||
        //     this.GETDATA.ci_injuryTime_2 == "null" ||
        //     this.GETDATA.ci_injuryTime_2 == undefined
        //     ? ""
        //     : this.GETDATA.ci_injuryTime_2
        // );
        // fd.append(
        //   "injuryLocation_2",
        //   this.GETDATA.ci_injuryLocation_2 == null ||
        //     this.GETDATA.ci_injuryLocation_2 == "null" ||
        //     this.GETDATA.ci_injuryLocation_2 == undefined
        //     ? ""
        //     : this.GETDATA.ci_injuryLocation_2
        // );
        // fd.append(
        //   "causeOfInjury_2",
        //   this.GETDATA.ci_causeOfInjury_2 == null ||
        //     this.GETDATA.ci_causeOfInjury_2 == "null" ||
        //     this.GETDATA.ci_causeOfInjury_2 == undefined
        //     ? ""
        //     : this.GETDATA.ci_causeOfInjury_2
        // );
        // fd.append(
        //   "injurySustained_2",
        //   this.GETDATA.ci_injurySustained_2 == null ||
        //     this.GETDATA.ci_injurySustained_2 == "null" ||
        //     this.GETDATA.ci_injurySustained_2 == undefined
        //     ? ""
        //     : this.GETDATA.ci_injurySustained_2
        // );
        // fd.append(
        //   "isMedicalTreatment_2",
        //   this.GETDATA.ci_isMedicalTreatment_2 == null ||
        //     this.GETDATA.ci_isMedicalTreatment_2 == "null" ||
        //     this.GETDATA.ci_isMedicalTreatment_2 == undefined
        //     ? ""
        //     : this.GETDATA.ci_isMedicalTreatment_2
        // );
        // fd.append(
        //   "descriptionOfIncident_2",
        //   this.GETDATA.ci_descriptionOfIncident_2 == null ||
        //     this.GETDATA.ci_descriptionOfIncident_2 == "null" ||
        //     this.GETDATA.ci_descriptionOfIncident_2 == undefined
        //     ? ""
        //     : this.GETDATA.ci_descriptionOfIncident_2
        // );

        // fd.append(
        //   "injuryUnsafeAct_2",
        //   this.GETDATA.ci_injuryUnsafeAct_2 == null ||
        //     this.GETDATA.ci_injuryUnsafeAct_2 == "null" ||
        //     this.GETDATA.ci_injuryUnsafeAct_2 == undefined
        //     ? ""
        //     : this.GETDATA.ci_injuryUnsafeAct_2
        // );
        // fd.append(
        //   "medicalCenterPhysician_2",
        //   this.GETDATA.ci_medicalCenterPhysician_2 == null ||
        //     this.GETDATA.ci_medicalCenterPhysician_2 == "null" ||
        //     this.GETDATA.ci_medicalCenterPhysician_2 == undefined
        //     ? ""
        //     : this.GETDATA.ci_medicalCenterPhysician_2
        // );

        fd.append(
          "injury_1",
          this.injur_details_emp.value.injury_1 ? "true" : "false"
        );
        fd.append(
          "firstAid_1",
          this.injur_details_emp.value.firstAid_1 ? "true" : "false"
        );
        fd.append(
          "closeCallObservation_1",
          this.injur_details_emp.value.closeCallObservation_1 ? "true" : "false"
        );
        fd.append("injuryTime_1", this.injur_details_emp.value.injuryTime_1);
        fd.append(
          "injuryLocation_1",
          this.injur_details_emp.value.injuryLocation_1
        );
        fd.append(
          "causeOfInjury_1",
          this.injur_details_emp.value.causeOfInjury_1
        );
        fd.append(
          "injurySustained_1",
          this.injur_details_emp.value.injurySustained_1
        );
        fd.append("isMedicalTreatment_1", this.medical1);
        fd.append(
          "descriptionOfIncident_1",
          this.injur_details_emp.value.descriptionOfIncident_1
        );
        fd.append(
          "injuryUnsafeAct_1",
          this.injur_details_emp.value.injuryUnsafeAct_1
        );
        fd.append(
          "medicalCenterPhysician_1",
          this.injur_details_emp.value.medicalCenterPhysician_1
        );
        fd.append(
          "injury_2",
          this.injur_details_cust.value.injury_2 ? "true" : "false"
        );
        fd.append(
          "firstAid_2",
          this.injur_details_cust.value.firstAid_2 ? "true" : "false"
        );
        fd.append(
          "closeCallObservation_2",
          this.injur_details_cust.value.closeCallObservation_2
            ? "true"
            : "false"
        );
        fd.append("injuryTime_2", this.injur_details_cust.value.injuryTime_2);
        fd.append(
          "injuryLocation_2",
          this.injur_details_cust.value.injuryLocation_2
        );
        fd.append(
          "causeOfInjury_2",
          this.injur_details_cust.value.causeOfInjury_2
        );
        fd.append(
          "injurySustained_2",
          this.injur_details_cust.value.injurySustained_2
        );
        fd.append("isMedicalTreatment_2", this.medical2);
        fd.append(
          "descriptionOfIncident_2",
          this.injur_details_cust.value.descriptionOfIncident_2
        );
        fd.append(
          "injuryUnsafeAct_2",
          this.injur_details_cust.value.injuryUnsafeAct_2
        );
        fd.append(
          "medicalCenterPhysician_2",
          this.injur_details_cust.value.medicalCenterPhysician_2
        );
        fd.append("status", this.myform.value.status);
        fd.append("ic_Incident_ID", this.incidentid);
        fd.append("ic_Claim_Number", this.claimNumber);
        fd.append(
          "ic_VehicletowCompanyName_1",
          this.myform.value.towCompanyname_1
        );
        0;
        fd.append(
          "ic_VehicletowCompanyName_2",
          this.myform.value.towCompanyname_2
        );
        fd.append(
          "ic_VehicletowCompanyName_3",
          this.myform.value.towCompanyname_3
        );
        fd.append(
          "ic_VehicletowCompanyName_4",
          this.myform.value.towCompanyname_4
        );
        fd.append(
          "ic_VehicletowCompanyName_5",
          this.myform.value.towCompanyname_5
        );

        fd.append(
          "ic_VehicletowDescription_1",
          this.myform.value.towCompanydesc_1
        );
        fd.append(
          "ic_VehicletowDescription_2",
          this.myform.value.towCompanydesc_2
        );
        fd.append(
          "ic_VehicletowDescription_3",
          this.myform.value.towCompanydesc_3
        );
        fd.append(
          "ic_VehicletowDescription_4",
          this.myform.value.towCompanydesc_4
        );
        fd.append(
          "ic_VehicletowDescription_5",
          this.myform.value.towCompanydesc_5
        );

        fd.append("ic_vehicleownerPhone_1", this.myform.value.VehiclePhone1);
        fd.append("ic_vehicleownerPhone_2", this.myform.value.VehiclePhone2);
        fd.append("ic_vehicleownerPhone_3", this.myform.value.VehiclePhone3);
        fd.append("ic_vehicleownerPhone_4", this.myform.value.VehiclePhone4);
        fd.append("ic_vehicleownerPhone_5", this.myform.value.VehiclePhone5);

        fd.append(
          "ic_hold_date",
          this.holddate != null &&
            this.holddate != undefined &&
            this.holddate != ""
            ? this.holddate
            : this.defaultdate
        );
        fd.append("ic_case_num", this.caseid);
        fd.append("numOfVehicles", this.myform.value.noOfVehicles);
        // console.log(obj);
        this.authService
          .INTERNALPostmethod("IncidentForm/IncidentClaimFormUpdation", fd)
          .subscribe(
            (res: any) => {
              // console.log('form data is :', ...formData)
              if (res.status == 200) {
                console.log(res);
                // this.rtr.navigate(['userdashboard'])
                this.spinnerService.show();

                alert("Record updated successfully");
                this.AdditionalFiles = [];
                this.getdata("");
                // if (this.notes != "") {
                //   this.saveNotes();
                // }
                // window.close();
                // this.getdata(this.cl_id);
                console.log(this.GETDATA.ic_claim_id, this.GETALLDATA);

                for (let i = 0; i < this.GETALLDATA.length; i++) {
                  this.spinnerService.show();

                  //   if(this.GETALLDATA[i].ic_claim_id == this.GETDATA.ic_claim_id){
                  //     console.log(i,this.GETALLDATA[i]);
                  //     this.cl_id = i;
                  // this.spinnerService.hide();

                  //     // this.getdata(this.cl_id )

                  //   }
                  //   else
                  //   {
                  //     alert("enter")
                  //   }
                }
                // this.spinnerService.hide();
                this.submitted = false;
              } else {
                console.log(res);
                alert("Please check the details");
              }
            },
            (error) => {
              console.log(error);
            }
          );

        // this.getdata();
        // this.rtr.navigate(['userprofile'])
      }
    }
  }

  saveNotes() {
    const obj = {
      ICN_IC_CLAIM_ID: this.id,
      ICN_NOTES: this.notes,
      ICN_USER_ID: localStorage.getItem("User_ID"),
    };
    this.authService
      .INTERNALPostmethod("IncidentForm/IncidentClaimFormNotesLog", obj)
      .subscribe((res: any) => {
        // console.log('form data is :', ...formData)
        if (res.status == 200) {
          console.log(res);
          this.notes = "";
          this.getNotes();
          // this.rtr.navigate(['userdashboard'])
          // this.spinnerService.show();

          // alert("Record updated successfully");
          // window.close();
          // this.getdata(this.cl_id);
          // console.log(this.GETDATA.ic_claim_id, this.GETALLDATA);

          // for (let i = 0; i < this.GETALLDATA.length; i++) {
          //   this.spinnerService.show();

          //   //   if(this.GETALLDATA[i].ic_claim_id == this.GETDATA.ic_claim_id){
          //   //     console.log(i,this.GETALLDATA[i]);
          //   //     this.cl_id = i;
          //   // this.spinnerService.hide();

          //   //     // this.getdata(this.cl_id )

          //   //   }
          //   //   else
          //   //   {
          //   //     alert("enter")
          //   //   }
          // }
          // this.spinnerService.hide();
          // this.submitted = false;
        }
      });
  }

  dateRangeCreated($event) {
    console.log($event);
    // if ($event !== null) {
    //   let startDate = $event[0].toJSON();
    //   let endDate = $event[1].toJSON();
    //   console.log(startDate, endDate);

    //   this.FromDate = this.pipe.transform(startDate, 'MM-dd-yyyy');
    //   this.ToDate = this.pipe.transform(endDate, 'MM-dd-yyyy');
    //   if (this.DateType == 'C') {
    //     this.custom = true;
    //   }
    //   console.log(this.FromDate);
    //   console.log(this.ToDate);
    // }
  }
  TextareaShow(e) {
    if (e == "yes") {
      this.Showtextarea = true;
      this.Witnessescolor = e;
    } else {
      this.Witnessescolor = e;
      this.Showtextarea = false;
      this.myform.controls["witnessInfo"].setValue("");
    }
  }
  Showtextarea1: boolean = false;

  TextareaShow1(e) {
    if (e == "yes") {
      this.Showtextarea1 = true;
      this.medical2 = e;
    } else {
      this.medical2 = e;
      this.Showtextarea1 = false;
      this.injur_details_cust.controls["medicalCenterPhysician_2"].setValue("");
    }
  }

  Showtextarea_emp: boolean = false;

  TextareaShow_emp(e) {
    if (e == "yes") {
      this.Showtextarea_emp = true;
      this.medical1 = e;
    } else {
      this.medical1 = e;
      this.Showtextarea_emp = false;
      this.injur_details_emp.controls["medicalCenterPhysician_1"].setValue("");
    }
  }

  TextShow1v1(e) {
    if (e == "yes") {
      this.ShowText1V1 = true;
      this.costofrepairbutton1 = e;
    } else {
      this.costofrepairbutton1 = e;
      this.ShowText1V1 = false;
      this.myform.controls["costOfRepair_1"].setValue("");
    }
  }

  Towbutton1(e) {
    if (e == "yes") {
      this.towbutton1 = e;
    } else {
      this.towbutton1 = e;
      this.myform.controls["towCompanyname_1"].setValue("");
      this.myform.controls["towCompanydesc_1"].setValue("");
    }
  }

  TextShow2v1(e) {
    if (e == "yes") {
      this.ShowText2V1 = true;
      this.flooredbutton1 = e;
    } else {
      this.flooredbutton1 = e;
      this.ShowText2V1 = false;
      this.myform.controls["flooredWithWhom_1"].setValue("");
    }
  }

  TextShow3v1(e) {
    if (e == "yes") {
      this.ShowText3V1 = true;
      this.loanerbutton1 = e;
    } else {
      this.loanerbutton1 = e;
      this.ShowText3V1 = false;
    }
  }

  TextShow1v2(e) {
    if (e == "yes") {
      this.ShowText1V2 = true;
      this.costofrepairbutton2 = e;
    } else {
      this.costofrepairbutton2 = e;
      this.ShowText1V2 = false;
      this.myform.controls["costOfRepair_2"].setValue("");
    }
  }
  Towbutton2(e) {
    if (e == "yes") {
      this.towbutton2 = e;
    } else {
      this.towbutton2 = e;
      this.myform.controls["towCompanyname_2"].setValue("");
      this.myform.controls["towCompanydesc_2"].setValue("");
    }
  }

  TextShow2v2(e) {
    if (e == "yes") {
      this.ShowText2V2 = true;
      this.flooredbutton2 = e;
    } else {
      this.flooredbutton2 = e;
      this.ShowText2V2 = false;
      this.myform.controls["flooredWithWhom_2"].setValue("");
    }
  }

  TextShow3v2(e) {
    if (e == "yes") {
      this.ShowText3V2 = true;
      this.loanerbutton2 = e;
    } else {
      this.loanerbutton2 = e;
      this.ShowText3V2 = false;
    }
  }

  TextShow1v3(e) {
    if (e == "yes") {
      this.ShowText1V3 = true;
      this.costofrepairbutton3 = e;
    } else {
      this.costofrepairbutton3 = e;
      this.ShowText1V3 = false;
      this.myform.controls["costOfRepair_3"].setValue("");
    }
  }
  Towbutton3(e) {
    if (e == "yes") {
      this.towbutton3 = e;
    } else {
      this.towbutton3 = e;
      this.myform.controls["towCompanyname_3"].setValue("");
      this.myform.controls["towCompanydesc_3"].setValue("");
    }
  }

  TextShow2v3(e) {
    if (e == "yes") {
      this.ShowText2V3 = true;
      this.flooredbutton3 = e;
    } else {
      this.flooredbutton3 = e;
      this.ShowText2V3 = false;
      this.myform.controls["flooredWithWhom_3"].setValue("");
    }
  }

  TextShow3v3(e) {
    if (e == "yes") {
      this.ShowText3V3 = true;
      this.loanerbutton3 = e;
    } else {
      this.loanerbutton3 = e;
      this.ShowText3V3 = false;
    }
  }

  TextShow1v4(e) {
    if (e == "yes") {
      this.ShowText1V4 = true;
      this.costofrepairbutton4 = e;
    } else {
      this.costofrepairbutton4 = e;
      this.ShowText1V4 = false;
      this.myform.controls["costOfRepair_4"].setValue("");
    }
  }
  Towbutton4(e) {
    if (e == "yes") {
      this.towbutton4 = e;
    } else {
      this.towbutton4 = e;
      this.myform.controls["towCompanyname_4"].setValue("");
      this.myform.controls["towCompanydesc_4"].setValue("");
    }
  }

  TextShow2v4(e) {
    if (e == "yes") {
      this.ShowText2V4 = true;
      this.flooredbutton4 = e;
    } else {
      this.flooredbutton4 = e;
      this.ShowText2V4 = false;
      this.myform.controls["flooredWithWhom_4"].setValue("");
    }
  }

  TextShow3v4(e) {
    if (e == "yes") {
      this.ShowText3V4 = true;
      this.loanerbutton4 = e;
    } else {
      this.loanerbutton4 = e;
      this.ShowText3V4 = false;
    }
  }

  TextShow1v5(e) {
    if (e == "yes") {
      this.ShowText1V5 = true;
      this.costofrepairbutton5 = e;
    } else {
      this.costofrepairbutton5 = e;
      this.ShowText1V5 = false;
      this.myform.controls["costOfRepair_5"].setValue("");
    }
  }
  Towbutton5(e) {
    if (e == "yes") {
      this.towbutton5 = e;
    } else {
      this.towbutton5 = e;
      this.myform.controls["towCompanyname_5"].setValue("");
      this.myform.controls["towCompanydesc_5"].setValue("");
    }
  }

  TextShow2v5(e) {
    if (e == "yes") {
      this.ShowText2V5 = true;
      this.flooredbutton5 = e;
    } else {
      this.flooredbutton5 = e;
      this.ShowText2V5 = false;
      this.myform.controls["flooredWithWhom_5"].setValue("");
    }
  }

  TextShow3v5(e) {
    if (e == "yes") {
      this.ShowText3V5 = true;
      this.loanerbutton5 = e;
    } else {
      this.loanerbutton5 = e;
      this.ShowText3V5 = false;
    }
  }
  EmpInj;
  CusInj;
  PoliceFile;
  EmployeeInjured(e) {
    if (e == "yes") {
      this.EmpInj = e;
    } else {
      this.EmpInj = e;
    }
  }
  CustomerInjured(e) {
    if (e == "yes") {
      this.CusInj = e;
    } else {
      this.CusInj = e;
    }
  }
  PoliceStationInfo(e) {
    if (e == "yes") {
      this.PoliceFile = e;
      this.ShowPoliceInfo = true;
    } else {
      this.PoliceFile = e;
      this.ShowPoliceInfo = false;
      this.myform.controls["policeFileNumber"].setValue("");
      this.myform.controls["officerInCharge"].setValue("");
      this.myform.controls["policeStation"].setValue("");
      this.myform.controls["policeStationPhone"].setValue("");
      this.myform.controls["policeStationEmail"].setValue("");
    }
  }
  vehcle0() {
    this.Showvehicle1 = false;
    this.Showvehicle2 = false;
    this.Showvehicle3 = false;
    this.Showvehicle4 = false;
    this.Showvehicle5 = false;
  }
  vehcle1() {
    this.Showvehicle1 = true;
    this.Showvehicle2 = false;
    this.Showvehicle3 = false;
    this.Showvehicle4 = false;
    this.Showvehicle5 = false;
  }
  vehcle2() {
    this.Showvehicle1 = true;
    this.Showvehicle2 = true;
    this.Showvehicle3 = false;
    this.Showvehicle4 = false;
    this.Showvehicle5 = false;
  }
  vehcle3() {
    this.Showvehicle1 = true;
    this.Showvehicle2 = true;
    this.Showvehicle3 = true;
    this.Showvehicle4 = false;
    this.Showvehicle5 = false;
  }
  vehcle4() {
    this.Showvehicle1 = true;
    this.Showvehicle2 = true;
    this.Showvehicle3 = true;
    this.Showvehicle4 = true;
    this.Showvehicle5 = false;
  }
  vehcle5() {
    this.Showvehicle1 = true;
    this.Showvehicle2 = true;
    this.Showvehicle3 = true;
    this.Showvehicle4 = true;
    this.Showvehicle5 = true;
  }
  Click(item) {
    // console.log("http://internalapi.swickard.com/api/resources/{{item.attachment_name}}")
    let d = "http://internalapi.swickard.com/api/resources/";
    window.open(d + item);
  }

  PdfDownload(val) {
    let fileName = "http://internalapi.swickard.com/api/resources/" + val;
    fileSaverSave(fileName, val);
  }

  downloadZip() {
    var count = 0;
    const zip = new JSZip();
    console.log(this.ATTACHMENTS);
    let urls = this.ATTACHMENTS;
    urls.forEach((val) => {
      JSZipUtils.getBinaryContent(
        "http://internalapi.swickard.com/api/resources/" + val.attachment_name,
        function (err, data) {
          if (err) {
            throw err;
          }
          zip.file(val.attachment_name, data, { binary: true });
          count++;
          if (count == urls.length) {
            zip.generateAsync({ type: "blob" }).then(function (content) {
              fileSaverSave(content, "Attachments.zip");
            });
          }
        }
      );
    });
  }

  AdditionalFiles: any = [];
  getFileDetails(e) {
    console.log(e);

    // console.log(e.target.files);
    for (var i = 0; i < e.length; i++) {
      this.AdditionalFiles.push(e[i]);
    }
    console.log(this.AdditionalFiles);
  }
  cancelfile(index) {
    this.AdditionalFiles.splice(index, 1);
    console.log(this.AdditionalFiles);
  }

  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      // this.id = this.id + inp;
      // console.log(this.id);
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  changestatus(e, item) {
    console.log(e, item);
    item.status = e.target.checked;
    this.selectedblocks = this.filterArray.filter((val) => val.status == true);
    let listoftrue = this.filterArray.filter((val) => val.show == true);
    if (this.selectedblocks.length == listoftrue.length) {
      this.selecteall = true;
    } else [(this.selecteall = false)];
  }

  SelectAll(e) {
    this.filterArray.forEach((val) => {
      if (val.show == true) {
        val.status = e.target.checked;
      }
    });

    this.selecteall = e.target.checked;
  }
  selectedblocks: any = [];
  selecteall: boolean = false;
  generatepdf() {
    this.selectedblocks = this.filterArray.filter((val) => val.status == true);
    console.log(this.selectedblocks);
    this.spinnerService.show();
    let doc = new jsPDF({
      orientation: "p",
      compress: true,
      unit: "in",
      format: [11, 12],
    });
    this.selectedblocks.forEach((val, i) => {
      let src = document.getElementById(val.id);
      // this.downloadPdf(val.id);
      let width = document.getElementById(val.id).offsetWidth;
      let height = document.getElementById(val.id).offsetHeight;

      this.captureService
        .getImage(src, true)
        .pipe(
          tap((img) => {
            // const imgData = img.toDataURL('image/png')

            console.log(img);
            // var image = document.createElement("img");
            // image.addEventListener("load", function () {
            //   console.log(image.width + " × " + image.height);
            // });
          })
        )
        .subscribe((res) => {
          // image.src = res;

          console.log(width, height);
          doc.addImage(res, "JPEG", 1, 1, 0, 0, null, "FAST", 0);
          // doc.addImage(res, "JPG", 10, 10, 180, 150);
          // doc.addImage(imageData, "JPG", 10, (i+1)*10, 180, 150);
          if (i < this.selectedblocks.length - 1) {
            doc.addPage();
          }

          if (i == this.selectedblocks.length - 1) {
            // alert("Hi");
            this.spinnerService.hide();
            doc.save("IncidentDetails.pdf");
          }
        });
    });

    //   for(var i=0;i< selectedblocks.length;i++){
    //  let imageData= document.getElementById('img'+i);
    //  console.log(imageData);

    //    doc.addImage(imageData, "JPG", 10, (i+1)*10, 180, 150);
    //    doc.addPage();
    // }

    //  doc.autoTable(col, rows);

    //  doc.save('FirstPdf.pdf');
  }

  // downloadPdf(val) {
  //   const doc = new jsPDF();
  //   const specialElementHandlers = {
  //     "#editor": function (element, renderer) {
  //       return true;
  //     },
  //   };
  //   const content = document.getElementById(val);

  //   doc.html(content.innerHTML);

  //   doc.save("asdfghj" + ".pdf");
  // }
  @ViewChild("pdfTable", { static: false }) pdfTable: ElementRef;

  NotesdownloadPdf() {
    let doc = new jsPDF({
      orientation: "p",
      compress: true,
      unit: "in",
      format: [11, 12],
    });
    // doc.html(document.getElementById("obrz"), function() {
    //    doc.save("obrz.pdf");
    // });

    // const pdfTable = this.pdfTable.nativeElement;

    // doc.html(pdfTable.innerHTML, {
    //   callback: (doc) => {
    //     doc.output("dataurlnewwindow");
    //   },
    // });

    // doc.save("tableToPdf.pdf");
    let notes = document.getElementById("notes");
    this.captureService
      .getImage(notes, true)
      .pipe(
        tap((img) => {
          console.log(img);
          // var image = document.createElement("img");
          // image.addEventListener("load", function () {
          //   console.log(image.width + " × " + image.height);
          // });
        })
      )
      .subscribe((res) => {
        // doc.addImage(res, "JPG", 10, (1 + 1) * 10, 180, 150);
        // doc.addImage(res, "JPEG", 3, 20, 0, 0, null, "FAST", 0);
        doc.addImage(res, "JPEG", 1, 1, 0, 0, null, "FAST", 0);
        doc.save("IncidentNotes.pdf");
      });
  }
}
