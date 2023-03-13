import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { GlobalVariablesComponent } from "src/app/Partials/global-variables/global-variables.component";
import { ApiService } from "src/app/Core/_providers/Api-service/api.service";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExcelService } from "src/app/Core/_providers/Excel-service/excel.service";
@Component({
  selector: "app-incident-form",
  templateUrl: "./incident-form.component.html",
  styleUrls: ["./incident-form.component.scss"],
})
export class IncidentFormComponent implements OnInit {
  IncidentForm: any;
  Attachments: any;
  searchKeyWord: any;
  imagepath: any = "http://axelapi.axelautomotive.com/api/icointernal/";
  imagepopup: any;
  SelectStatus: any = "";
  log: any;
  Status: any;
  keys: string[];
  SubTabledata: any;
  popUpType: string;
  item: any;
  currentDate: string;
  Showtextarea: boolean = false;
  Showtextarea1: boolean = false;
  myform: FormGroup;
  submitted = false;

  filterArray: any = [];
  constructor(
    private location: Location,
    private authService: ApiService,
    private spinnerService: Ng4LoadingSpinnerService,
    private ngbactive: NgbActiveModal,
    public globalVarComponent: GlobalVariablesComponent,
    private ngbModal: NgbModal,
    public fb: FormBuilder,
    private excelService: ExcelService
  ) {
    this.myform = this.fb.group({
      injury_1: [""],
      firstAid_1: [""],
      closeCallObservation_1: [""],
      injuryTime_1: ["", [Validators.required]],
      injuryLocation_1: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      causeOfInjury_1: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      injurySustained_1: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      medicalCenterPhysician_1: [""],
      descriptionOfIncident_1: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      injuryUnsafeAct_1: [""],
      injury_2: [""],
      firstAid_2: [""],
      closeCallObservation_2: [""],
      injuryTime_2: ["", [Validators.required]],
      injuryLocation_2: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      causeOfInjury_2: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      injurySustained_2: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      medicalCenterPhysician_2: [""],
      descriptionOfIncident_2: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern("[a-zA-Z ]*"),
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

  ngOnInit() {
    this.GetData();
    this.filterdatalloading();
  }

  // ClickURL(e) {
  //   //console.log(e);
  //   this.imagepopup = this.imagepath + e[0].uploadedfilename;
  //   //console.log(this.imagepopup);
  // }
  incdate: any = [];
  storedata: any = [];
  incidentdata: any = [];
  holddate: any = [];
  GetData() {
    this.spinnerService.show();
    const obj = {};
    this.spinnerService.show();
    this.authService
      .INTERNALPostmethod("IncidentForm/GetIncidentClaimFormData", obj)
      .subscribe((Data: any) => {
        this.IncidentForm = Data.response.recordset.map((v) => ({
          ...v,
          ClaimEdit: true,
          IncidentEdit: true,
          caseEdit: true,
        }));
        this.incidentdata = this.IncidentForm;

        this.incdate = [
          ...new Set(this.IncidentForm.map((item) => item.ic_incidentDate)),
        ];

        let str = [
          ...new Set(this.IncidentForm.map((item) => item.ic_dealership)),
        ];
        this.storedata = str.filter(
          (v) => v != "" && v != null && v != undefined
        );
        //console.log(this.incdate, "fgd");
        let hold = [
          ...new Set(this.IncidentForm.map((item) => item.ic_hold_date)),
        ];

        this.holddate = hold.filter(
          (v) => v != "" && v != null && v != undefined
        );
        for (let i = 0; i <= this.IncidentForm.length; i++) {
          this.IncidentForm[i].attachments = JSON.parse(
            this.IncidentForm[i].attachments
          );
          //console.log(this.IncidentForm);
        }
        //console.log("Incident data", this.IncidentForm);
        // this.authService.setdata(this.IncidentForm);
        this.spinnerService.hide();
        this.incdate = [
          ...new Set(this.IncidentForm.map((item) => item.ic_incidentDate)),
        ];
        //console.log(this.incdate, "fgd");
      });
  }
  id: any = "";
  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      // this.id = this.id + inp;
      // //console.log(this.id);
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  PreviousUrl() {
    this.location.back();
  }
  selectStatus(event) {
    this.Status = event.target.value;
    //console.log(event.target.value);
  }
  showSelectedStatus(IncidentForm): any {
    //console.log(this.SelectStatus);
    if (this.SelectStatus.length > 0) {
      let Incidentdata = [];
      let SelectStatus = this.SelectStatus;
      //console.log(SelectStatus);
      Incidentdata = IncidentForm.filter((x) => x.ic_status == SelectStatus);
      //console.log(Incidentdata);
      return Incidentdata;
    }
    // return IVRrec.IVR_STATUS ===this.SelectStatus;
    return IncidentForm;
  }
  edit(item, mymodal) {
    this.popUpType = "E";
    // //console.log(item, 'item')
    this.item = item;
    this.ngbModal.open(mymodal, { size: "sm", backdrop: "static" });
    this.Status = item.status;
  }

  fillingstatus(item, val, block, idx) {
    if (block == "C") {
      val.ClaimEdit = !item;
      val.ic_Claim_Number = val.ic_Claim_Number;
      (document.getElementById("claim" + idx) as HTMLInputElement).value =
        val.ic_Claim_Number;
    } else if (block == "I") {
      val.IncidentEdit = !item;
      val.ic_Incident_ID = val.ic_Incident_ID;
      (document.getElementById("inc" + idx) as HTMLInputElement).value =
        val.ic_Incident_ID;
    } else {
      val.caseEdit = !item;
      val.ic_case_num = val.ic_case_num;
      (document.getElementById("case" + idx) as HTMLInputElement).value =
        val.ic_case_num;
    }
    //console.log(val.ic_Claim_Number, val.ic_Incident_ID);
  }

  getfillingvalues(val, idx, ref) {
    if (ref == "claim") {
      var updatedvalue = (
        document.getElementById(ref + idx) as HTMLInputElement
      ).value;
      this.savefillingvalues(
        val.ic_id,
        val.ic_Incident_ID,
        updatedvalue,
        val.ic_case_num,
        ref,
        val
      );
    } else if (ref == "inc") {
      var updatedvalue = (
        document.getElementById(ref + idx) as HTMLInputElement
      ).value;
      this.savefillingvalues(
        val.ic_id,
        updatedvalue,
        val.ic_Claim_Number,
        val.ic_case_num,
        ref,
        val
      );
    } else {
      var updatedvalue = (
        document.getElementById(ref + idx) as HTMLInputElement
      ).value;
      this.savefillingvalues(
        val.ic_id,
        val.ic_Incident_ID,
        val.ic_Claim_Number,
        updatedvalue,
        ref,
        val
      );
    }
    //console.log(updatedvalue);
    // //console.log(val.ic_Incident_ID, val.ic_Claim_Number);
  }

  savefillingvalues(id, incid, claimid, caseid, ref, val) {
    const obj = {
      ic_id: id,
      IncidentID: incid,
      ClaimNumber: claimid,
      casenum: caseid,
    };
    this.authService
      .INTERNALPostmethod("IncidentForm/IncFmIncIdClNumUpdation", obj)
      .subscribe(
        (res: any) => {
          if (res.status == 200) {
            //console.log(res);
            // this.rtr.navigate(['userdashboard'])
            alert("Record updated successfully");
            if (ref == "claim") {
              val.ic_Claim_Number = claimid;
              val.ClaimEdit = true;
            } else if (ref == "inc") {
              val.ic_Incident_ID = incid;
              val.IncidentEdit = true;
            } else {
              val.ic_case_num = caseid;
              val.caseEdit = true;
            }
            //console.log(val);

            // document.getElementById("close").click();
            // this.GetData();
            // this.submitted = false;
          } else {
            //console.log(res);
            alert("Please check the details");
          }
        },
        (error) => {
          //console.log(error);
        }
      );
  }
  statuschange(evt) {
    this.Status = evt;
  }
  // saveStatus() {
  //   const obj = {
  //     "id": this.item.id,
  //     "first_name": this.item.firstname,
  //     "last_name": this.item.lastname,
  //     "street_address": this.item.street_address,
  //     "city": this.item.city,
  //     "state": this.item.state,
  //     "zip": this.item.zip,
  //     "email": this.item.email,
  //     "phone": this.item.phone,
  //     "make": this.item.make,
  //     "model": this.item.model,
  //     "year": this.item.year,
  //     "vin": this.item.vin,
  //     "vehiclemilage": this.item.vehiclemilage,
  //     "lienholdername": this.item.lienholdername,
  //     "vehiclepurchaseprice": this.item.vehiclepurchaseprice,
  //     "goodthroughdate": this.item.goodthroughdate,
  //     "dailyperdiemamount": this.item.dailyperdiemamount,
  //     "storecode": this.item.storecode,
  //     "purchasername": this.item.purchasername,
  //     "purchasercontact": this.item.purchasercontact,
  //     "purchaseprice": this.item.purchaseprice,
  //     "accountnumber": this.item.accountnumber,
  //     "payoffamount": this.item.payoffamount,
  //     "status": this.Status
  //   }

  //   //console.log('statusupdate', obj)
  //   this.authService.AXELPutmethod('ico', obj).subscribe((x: any) => {
  //     //console.log('update', x);
  //     if (x.status == 200) {
  //       alert(x.response);
  //       this.ngbModal.dismissAll();
  //       this.GetData();
  //     }
  //   })
  // }
  cid;
  injry1;
  frstaid1;
  closecll1;
  injry2;
  frstaid2;
  closecll2;
  selecteditem: any = "";
  openform(mymodal) {
    //console.log("data", mymodal);
    this.selecteditem = mymodal;
    this.cid = mymodal.ic_claim_id;

    this.injry1 = mymodal.ei_injury_1;
    this.frstaid1 = mymodal.ei_firstAid_1;
    this.closecll1 = mymodal.ei_closeCallObservation_1;

    this.injry2 = mymodal.ci_injury_2;
    this.frstaid2 = mymodal.ci_firstAid_2;
    this.closecll2 = mymodal.ci_closeCallObservation_2;

    this.medical1 = mymodal.ei_isMedicalTreatment_1;
    this.medical2 = mymodal.ci_isMedicalTreatment_2;

    this.Emp_Injures = mymodal.ic_employeeInjured;
    this.Cust_Injures = mymodal.ic_customerInjured;
    this.TextareaShow(this.medical1);
    this.TextareaShow1(this.medical2);

    //console.log(this.medical1, this.medical2);
    this.myform = this.fb.group({
      injury_1: [mymodal.ei_injury_1 == "true" ? true : false],
      firstAid_1: [mymodal.ei_firstAid_1 == "true" ? true : false],
      closeCallObservation_1: [
        mymodal.ei_closeCallObservation_1 == "true" ? true : false,
      ],
      injury_2: [mymodal.ci_injury_2 == "true" ? true : false],
      firstAid_2: [mymodal.ci_firstAid_2 == "true" ? true : false],
      closeCallObservation_2: [
        mymodal.ci_closeCallObservation_2 == "true" ? true : false,
      ],
      injuryTime_1: [
        mymodal.ei_injuryTime_1 == "null" ||
        mymodal.ei_injuryTime_1 == undefined ||
        mymodal.ei_injuryTime_1 == null
          ? ""
          : mymodal.ei_injuryTime_1,
      ],
      injuryLocation_1: [
        mymodal.ei_injuryLocation_1 == "null" ||
        mymodal.ei_injuryLocation_1 == undefined ||
        mymodal.ei_injuryLocation_1 == null
          ? ""
          : mymodal.ei_injuryLocation_1,
      ],
      causeOfInjury_1: [
        mymodal.ei_causeOfInjury_1 == "null" ||
        mymodal.ei_causeOfInjury_1 == undefined ||
        mymodal.ei_causeOfInjury_1 == null
          ? ""
          : mymodal.ei_causeOfInjury_1,
      ],
      injurySustained_1: [
        mymodal.ei_injurySustained_1 == "null" ||
        mymodal.ei_injurySustained_1 == undefined ||
        mymodal.ei_injurySustained_1 == null
          ? ""
          : mymodal.ei_injurySustained_1,
      ],
      medicalCenterPhysician_1: [
        mymodal.ei_medicalCenterPhysician_1 == "null" ||
        mymodal.ei_medicalCenterPhysician_1 == undefined ||
        mymodal.ei_medicalCenterPhysician_1 == null
          ? ""
          : mymodal.ei_medicalCenterPhysician_1,
      ],
      descriptionOfIncident_1: [
        mymodal.ei_descriptionOfIncident_1 == "null" ||
        mymodal.ei_descriptionOfIncident_1 == undefined ||
        mymodal.ei_descriptionOfIncident_1 == null
          ? ""
          : mymodal.ei_descriptionOfIncident_1,
      ],
      injuryUnsafeAct_1: [
        mymodal.ei_injuryUnsafeAct_1 == "null" ||
        mymodal.ei_injuryUnsafeAct_1 == undefined ||
        mymodal.ei_injuryUnsafeAct_1 == null
          ? ""
          : mymodal.ei_injuryUnsafeAct_1,
      ],
      injuryTime_2: [
        mymodal.ci_injuryTime_2 == "null" ||
        mymodal.ci_injuryTime_2 == undefined ||
        mymodal.ci_injuryTime_2 == null
          ? ""
          : mymodal.ci_injuryTime_2,
      ],
      injuryLocation_2: [
        mymodal.ci_injuryLocation_2 == "null" ||
        mymodal.ci_injuryLocation_2 == undefined ||
        mymodal.ci_injuryLocation_2 == null
          ? ""
          : mymodal.ci_injuryLocation_2,
      ],
      causeOfInjury_2: [
        mymodal.ci_causeOfInjury_2 == "null" ||
        mymodal.ci_causeOfInjury_2 == undefined ||
        mymodal.ci_causeOfInjury_2 == null
          ? ""
          : mymodal.ci_causeOfInjury_2,
      ],
      injurySustained_2: [
        mymodal.ci_injurySustained_2 == "null" ||
        mymodal.ci_injurySustained_2 == undefined ||
        mymodal.ci_injurySustained_2 == null
          ? ""
          : mymodal.ci_injurySustained_2,
      ],
      medicalCenterPhysician_2: [
        mymodal.ci_medicalCenterPhysician_2 == "null" ||
        mymodal.ci_medicalCenterPhysician_2 == undefined ||
        mymodal.ci_medicalCenterPhysician_2 == null
          ? ""
          : mymodal.ci_medicalCenterPhysician_2,
      ],
      descriptionOfIncident_2: [
        mymodal.ci_descriptionOfIncident_2 == "null" ||
        mymodal.ci_descriptionOfIncident_2 == undefined ||
        mymodal.ci_descriptionOfIncident_2 == null
          ? ""
          : mymodal.ci_descriptionOfIncident_2,
      ],
      injuryUnsafeAct_2: [
        mymodal.ci_injuryUnsafeAct_2 == "null" ||
        mymodal.ci_injuryUnsafeAct_2 == undefined ||
        mymodal.ci_injuryUnsafeAct_2 == null
          ? ""
          : mymodal.ci_injuryUnsafeAct_2,
      ],
    });

    //  this.myform.controls["injuryTime_1"].setValue(mymodal.ei_injuryTime_1);
    //  this.myform.controls["injuryLocation_1"].setValue(mymodal.ei_injuryLocation_1);
    //  this.myform.controls["causeOfInjury_1"].setValue(mymodal.ei_causeOfInjury_1);
    //  this.myform.controls["injurySustained_1"].setValue(mymodal.ei_injurySustained_1);
    //  this.myform.controls["medicalCenterPhysician_1"].setValue(mymodal.ei_medicalCenterPhysician_1);
    //  this.myform.controls["descriptionOfIncident_1"].setValue(mymodal.ei_descriptionOfIncident_1);
    //  this.myform.controls["injuryUnsafeAct_1"].setValue(mymodal.ei_injuryUnsafeAct_1);

    //  this.myform.controls["injuryTime_2"].setValue(mymodal.ci_injuryTime_2);
    //  this.myform.controls["injuryLocation_2"].setValue(mymodal.ci_injuryLocation_2);
    //  this.myform.controls["causeOfInjury_2"].setValue(mymodal.ci_causeOfInjury_2);
    //  this.myform.controls["injurySustained_2"].setValue(mymodal.ci_injurySustained_2);
    //  this.myform.controls["medicalCenterPhysician_2"].setValue(mymodal.ci_medicalCenterPhysician_2);
    //  this.myform.controls["descriptionOfIncident_2"].setValue(mymodal.ci_descriptionOfIncident_2);
    //  this.myform.controls["injuryUnsafeAct_2"].setValue(mymodal.ci_injuryUnsafeAct_2);

    this.ngbModal.open(mymodal, { size: "sm", backdrop: "static" });
    // this.myform.controls.injuryTime_1.setValue('mymodal.ei_injuryTime_1')
    mymodal.close();
  }

  update() {
    this.submitted = true;
    //console.log(this.myform.invalid);

    if (this.myform.invalid) {
      alert("Enter all required fields");
      return false;
    } else {
      if (window.confirm("Do you want to save the details")) {
        const fd: any = new FormData();
        // const obj = {
        fd.append("claim_id", this.cid);
        fd.append("dealership", this.selecteditem.ic_dealership);
        fd.append("employeePosition", this.selecteditem.ic_employeePosition);
        fd.append("department", this.selecteditem.ic_department);
        fd.append("employeeName", this.selecteditem.ic_employeeName);
        fd.append("employeeEmail", this.selecteditem.ic_employeeEmail);
        fd.append("employeePhone", this.selecteditem.ic_employeePhone);
        fd.append("supervisorEmail", this.selecteditem.ic_supervisorEmail);
        fd.append("supervisorName", this.selecteditem.ic_supervisorName);
        fd.append("needreview_status", this.selecteditem.ic_needreview_status);
        fd.append("hasVehicleFile", this.selecteditem.ic_hasVehicleFile);
        fd.append("hasPoliceFile", this.selecteditem.ic_hasPoliceFile);
        fd.append(
          "hasRepairEstimateFile",
          this.selecteditem.ic_hasRepairEstimateFile
        );
        fd.append(
          "hasSignedLoanerAgreementFile",
          this.selecteditem.ic_hasSignedLoanerAgreementFile
        );
        fd.append(
          "hasInsuranceCardFile",
          this.selecteditem.ic_hasInsuranceCardFile
        );
        fd.append("hasOtherFile", this.selecteditem.ic_hasOtherFile);
        fd.append("PropertyDamage", this.selecteditem.ic_propertydamage);
        fd.append(
          "damageToLoanerVehicle",
          this.selecteditem.ic_damageToLoanerVehicle
        );
        fd.append(
          "inventoryOrNonLoaner",
          this.selecteditem.ic_inventoryOrNonLoaner
        );
        fd.append("theftOfVehicle", this.selecteditem.ic_theftOfVehicle);
        fd.append(
          "lostMissingVehicle",
          this.selecteditem.ic_lostMissingVehicle
        );
        fd.append("otherDocumenting", this.selecteditem.ic_otherDocumenting);
        fd.append(
          "damageToCustomerVehicle",
          this.selecteditem.ic_damageToCustomerVehicle
        );
        fd.append("incidentDate", this.selecteditem.ic_incidentDate);
        fd.append("generalLocation", this.selecteditem.ic_generalLocation);
        fd.append(
          "incidentDescription",
          this.selecteditem.ic_incidentDescription
        );
        fd.append("hasWitnesses", this.selecteditem.ic_hasWitnesses);
        fd.append("witnessesInfo", this.selecteditem.ic_witnessesInfo);
        fd.append("vehicleMake_1", this.selecteditem.ic_vehicleMake_1);
        fd.append("vehicleModel_1", this.selecteditem.ic_vehicleModel_1);
        fd.append("vehicleMake_2", this.selecteditem.ic_vehicleMake_2);
        fd.append("vehicleModel_2", this.selecteditem.ic_vehicleModel_2);
        fd.append("vehicleMake_3", this.selecteditem.ic_vehicleMake_3);
        fd.append("vehicleModel_3", this.selecteditem.ic_vehicleModel_3);
        fd.append("vehicleMake_4", this.selecteditem.ic_vehicleMake_4);
        fd.append("vehicleModel_4", this.selecteditem.ic_vehicleModel_4);
        fd.append("vehicleMake_5", this.selecteditem.ic_vehicleMake_5);
        fd.append("vehicleModel_5", this.selecteditem.ic_vehicleModel_5);
        fd.append("vehicleColor_1", this.selecteditem.ic_vehicleColor_1);
        fd.append("vehicleColor_2", this.selecteditem.ic_vehicleColor_2);
        fd.append("vehicleColor_3", this.selecteditem.ic_vehicleColor_3);
        fd.append("vehicleColor_4", this.selecteditem.ic_vehicleColor_4);
        fd.append("vehicleColor_5", this.selecteditem.ic_vehicleColor_5);
        fd.append("vehicleVin_1", this.selecteditem.ic_vehicleVin_1);
        fd.append("vehicleVin_2", this.selecteditem.ic_vehicleVin_2);
        fd.append("vehicleVin_3", this.selecteditem.ic_vehicleVin_3);
        fd.append("vehicleVin_4", this.selecteditem.ic_vehicleVin_4);
        fd.append("vehicleVin_5", this.selecteditem.ic_vehicleVin_5);
        fd.append("vehicleOwner_1", this.selecteditem.ic_vehicleOwner_1);
        fd.append("vehicleOwner_2", this.selecteditem.ic_vehicleOwner_2);
        fd.append("vehicleOwner_3", this.selecteditem.ic_vehicleOwner_3);
        fd.append("vehicleOwner_4", this.selecteditem.ic_vehicleOwner_4);
        fd.append("vehicleOwner_5", this.selecteditem.ic_vehicleOwner_5);
        fd.append("vehicleLocation_1", this.selecteditem.ic_vehicleLocation_1);
        fd.append("vehicleLocation_2", this.selecteditem.ic_vehicleLocation_2);
        fd.append("vehicleLocation_3", this.selecteditem.ic_vehicleLocation_3);
        fd.append("vehicleLocation_4", this.selecteditem.ic_vehicleLocation_4);
        fd.append("vehicleLocation_5", this.selecteditem.ic_vehicleLocation_5);
        fd.append(
          "lastKnownMileage_1",
          this.selecteditem.ic_lastKnownMileage_1
        );
        fd.append(
          "lastKnownMileage_2",
          this.selecteditem.ic_lastKnownMileage_2
        );
        fd.append(
          "lastKnownMileage_3",
          this.selecteditem.ic_lastKnownMileage_3
        );
        fd.append(
          "lastKnownMileage_4",
          this.selecteditem.ic_lastKnownMileage_4
        );
        fd.append(
          "lastKnownMileage_5",
          this.selecteditem.ic_lastKnownMileage_5
        );
        fd.append("hasCostOfRepair_1", this.selecteditem.ic_hasCostOfRepair_1);
        fd.append("hasCostOfRepair_2", this.selecteditem.ic_hasCostOfRepair_2);
        fd.append("hasCostOfRepair_3", this.selecteditem.ic_hasCostOfRepair_3);
        fd.append("hasCostOfRepair_4", this.selecteditem.ic_hasCostOfRepair_4);
        fd.append("hasCostOfRepair_5", this.selecteditem.ic_hasCostOfRepair_5);
        fd.append("costOfRepair_1", this.selecteditem.ic_costOfRepair_1);
        fd.append("costOfRepair_2", this.selecteditem.ic_costOfRepair_2);
        fd.append("costOfRepair_3", this.selecteditem.ic_costOfRepair_3);
        fd.append("costOfRepair_4", this.selecteditem.ic_costOfRepair_4);
        fd.append("costOfRepair_5", this.selecteditem.ic_costOfRepair_5);
        fd.append("hasTowInvoice_1", this.selecteditem.ic_hasTowInvoice_1);
        fd.append("hasTowInvoice_2", this.selecteditem.ic_hasTowInvoice_2);
        fd.append("hasTowInvoice_3", this.selecteditem.ic_hasTowInvoice_3);
        fd.append("hasTowInvoice_4", this.selecteditem.ic_hasTowInvoice_4);
        fd.append("hasTowInvoice_5", this.selecteditem.ic_hasTowInvoice_5);
        fd.append(
          "isVehicleFloored_1",
          this.selecteditem.ic_isVehicleFloored_1
        );
        fd.append("flooredWithWhom_1", this.selecteditem.ic_flooredWithWhom_1);
        fd.append(
          "isVehicleFloored_2",
          this.selecteditem.ic_isVehicleFloored_2
        );
        fd.append("flooredWithWhom_2", this.selecteditem.ic_flooredWithWhom_2);
        fd.append(
          "isVehicleFloored_3",
          this.selecteditem.ic_isVehicleFloored_3
        );
        fd.append("flooredWithWhom_3", this.selecteditem.ic_flooredWithWhom_3);
        fd.append(
          "isVehicleFloored_4",
          this.selecteditem.ic_isVehicleFloored_4
        );
        fd.append("flooredWithWhom_4", this.selecteditem.ic_flooredWithWhom_4);
        fd.append(
          "isVehicleFloored_5",
          this.selecteditem.ic_isVehicleFloored_5
        );
        fd.append("flooredWithWhom_5", this.selecteditem.ic_flooredWithWhom_5);
        fd.append("isLoanerProgram_1", this.selecteditem.ic_isLoanerProgram_1);
        fd.append(
          "loanerProgramWithWhom_1",
          this.selecteditem.ic_loanerProgramWithWhom_1
        );
        fd.append(
          "insuranceCompany_1",
          this.selecteditem.ic_insuranceCompany_1
        );
        fd.append(
          "insuranceCompany_2",
          this.selecteditem.ic_insuranceCompany_2
        );
        fd.append(
          "insuranceCompany_3",
          this.selecteditem.ic_insuranceCompany_3
        );
        fd.append(
          "insuranceCompany_4",
          this.selecteditem.ic_insuranceCompany_4
        );
        fd.append(
          "insuranceCompany_5",
          this.selecteditem.ic_insuranceCompany_5
        );
        fd.append(
          "insuranceClaimNumber_1",
          this.selecteditem.ic_insuranceClaimNumber_1
        );
        fd.append(
          "insuranceClaimNumber_2",
          this.selecteditem.ic_insuranceClaimNumber_2
        );
        fd.append(
          "insuranceClaimNumber_3",
          this.selecteditem.ic_insuranceClaimNumber_3
        );
        fd.append(
          "insuranceClaimNumber_4",
          this.selecteditem.ic_insuranceClaimNumber_4
        );
        fd.append(
          "insuranceClaimNumber_5",
          this.selecteditem.ic_insuranceClaimNumber_5
        );
        fd.append(
          "insurancePolicyNumber_1",
          this.selecteditem.ic_insurancePolicyNumber_1
        );
        fd.append(
          "insurancePolicyNumber_2",
          this.selecteditem.ic_insurancePolicyNumber_2
        );
        fd.append(
          "insurancePolicyNumber_3",
          this.selecteditem.ic_insurancePolicyNumber_3
        );
        fd.append(
          "insurancePolicyNumber_4",
          this.selecteditem.ic_insurancePolicyNumber_4
        );
        fd.append(
          "insurancePolicyNumber_5",
          this.selecteditem.ic_insurancePolicyNumber_5
        );
        fd.append(
          "insuranceAgentFullName_1",
          this.selecteditem.ic_insuranceAgentFullName_1
        );
        fd.append(
          "insuranceAgentFullName_2",
          this.selecteditem.ic_insuranceAgentFullName_2
        );
        fd.append(
          "insuranceAgentFullName_3",
          this.selecteditem.ic_insuranceAgentFullName_3
        );
        fd.append(
          "insuranceAgentFullName_4",
          this.selecteditem.ic_insuranceAgentFullName_4
        );
        fd.append(
          "insuranceAgentFullName_5",
          this.selecteditem.ic_insuranceAgentFullName_5
        );
        fd.append(
          "insuranceAgentPhone_1",
          this.selecteditem.ic_insuranceAgentPhone_1
        );
        fd.append(
          "insuranceAgentPhone_2",
          this.selecteditem.ic_insuranceAgentPhone_2
        );
        fd.append(
          "insuranceAgentPhone_3",
          this.selecteditem.ic_insuranceAgentPhone_3
        );
        fd.append(
          "insuranceAgentPhone_4",
          this.selecteditem.ic_insuranceAgentPhone_4
        );
        fd.append(
          "insuranceAgentPhone_5",
          this.selecteditem.ic_insuranceAgentPhone_5
        );
        fd.append("employeeInjured", this.Emp_Injures);
        fd.append("customerInjured", this.Cust_Injures);
        fd.append("injuryDescription", this.selecteditem.ic_injuryDescription);
        fd.append("policeFileNumber", this.selecteditem.ic_policeFileNumber);
        fd.append("officerInCharge", this.selecteditem.ic_officerInCharge);
        fd.append("policeStation", this.selecteditem.ic_policeStation);
        fd.append(
          "policeStationPhone",
          this.selecteditem.ic_policeStationPhone
        );
        fd.append(
          "policeStationEmail",
          this.selecteditem.ic_policeStationEmail
        );
        fd.append("vehicleFiles_1", this.selecteditem.ic_vehicleFiles_1);
        fd.append("vehicleFiles_2", this.selecteditem.ic_vehicleFiles_2);
        fd.append("vehicleFiles_3", this.selecteditem.ic_vehicleFiles_3);
        fd.append("vehicleFiles_4", this.selecteditem.ic_vehicleFiles_4);
        fd.append("vehicleFiles_5", this.selecteditem.ic_vehicleFiles_5);
        fd.append("policeReportFiles", this.selecteditem.ic_policeReportFiles);
        fd.append(
          "repairEstimateFiles",
          this.selecteditem.ic_repairEstimateFiles
        );
        fd.append(
          "signedLoanerAgreementFiles",
          this.selecteditem.ic_signedLoanerAgreementFiles
        );
        fd.append("customerIdFiles", this.selecteditem.ic_customerIdFiles);
        fd.append(
          "insuranceCardFiles",
          this.selecteditem.ic_insuranceCardFiles
        );
        fd.append("otherFiles", this.selecteditem.ic_otherFiles);
        fd.append("injury_1", this.myform.value.injury_1 ? "true" : "false");
        fd.append(
          "firstAid_1",
          this.myform.value.firstAid_1 ? "true" : "false"
        );
        fd.append(
          "closeCallObservation_1",
          this.myform.value.closeCallObservation_1 ? "true" : "false"
        );
        fd.append("injuryTime_1", this.myform.value.injuryTime_1);
        fd.append("injuryLocation_1", this.myform.value.injuryLocation_1);
        fd.append("causeOfInjury_1", this.myform.value.causeOfInjury_1);
        fd.append("injurySustained_1", this.myform.value.injurySustained_1);
        fd.append("isMedicalTreatment_1", this.medical1);
        fd.append(
          "descriptionOfIncident_1",
          this.myform.value.descriptionOfIncident_1
        );
        fd.append("injuryUnsafeAct_1", this.myform.value.injuryUnsafeAct_1);
        fd.append(
          "medicalCenterPhysician_1",
          this.myform.value.medicalCenterPhysician_1
        );
        fd.append("injury_2", this.myform.value.injury_2 ? "true" : "false");
        fd.append(
          "firstAid_2",
          this.myform.value.firstAid_2 ? "true" : "false"
        );
        fd.append(
          "closeCallObservation_2",
          this.myform.value.closeCallObservation_2 ? "true" : "false"
        );
        fd.append("injuryTime_2", this.myform.value.injuryTime_2);
        fd.append("injuryLocation_2", this.myform.value.injuryLocation_2);
        fd.append("causeOfInjury_2", this.myform.value.causeOfInjury_2);
        fd.append("injurySustained_2", this.myform.value.injurySustained_2);
        fd.append("isMedicalTreatment_2", this.medical2);
        fd.append(
          "descriptionOfIncident_2",
          this.myform.value.descriptionOfIncident_2
        );
        fd.append("injuryUnsafeAct_2", this.myform.value.injuryUnsafeAct_2);
        fd.append(
          "medicalCenterPhysician_2",
          this.myform.value.medicalCenterPhysician_2
        );
        fd.append("status", this.selecteditem.ic_status);
        fd.append("ic_Incident_ID", this.selecteditem.ic_Incident_ID);
        fd.append("ic_Claim_Number", this.selecteditem.ic_Claim_Number);

        fd.append(
          "ic_VehicletowCompanyName_1",
          this.selecteditem.ic_VehicletowCompanyName_1
        );
        fd.append(
          "ic_VehicletowCompanyName_2",
          this.selecteditem.ic_VehicletowCompanyName_2
        );
        fd.append(
          "ic_VehicletowCompanyName_3",
          this.selecteditem.ic_VehicletowCompanyName_3
        );
        fd.append(
          "ic_VehicletowCompanyName_4",
          this.selecteditem.ic_VehicletowCompanyName_4
        );
        fd.append(
          "ic_VehicletowCompanyName_5",
          this.selecteditem.ic_VehicletowCompanyName_5
        );

        fd.append(
          "ic_VehicletowDescription_1",
          this.selecteditem.ic_VehicletowDescription_1
        );
        fd.append(
          "ic_VehicletowDescription_2",
          this.selecteditem.ic_VehicletowDescription_2
        );
        fd.append(
          "ic_VehicletowDescription_3",
          this.selecteditem.ic_VehicletowDescription_3
        );
        fd.append(
          "ic_VehicletowDescription_4",
          this.selecteditem.ic_VehicletowDescription_4
        );
        fd.append(
          "ic_VehicletowDescription_5",
          this.selecteditem.ic_VehicletowDescription_5
        );

        fd.append(
          "ic_vehicleownerPhone_1",
          this.selecteditem.ic_vehicleownerPhone_1
        );
        fd.append(
          "ic_vehicleownerPhone_2",
          this.selecteditem.ic_vehicleownerPhone_2
        );
        fd.append(
          "ic_vehicleownerPhone_3",
          this.selecteditem.ic_vehicleownerPhone_3
        );
        fd.append(
          "ic_vehicleownerPhone_4",
          this.selecteditem.ic_vehicleownerPhone_4
        );
        fd.append(
          "ic_vehicleownerPhone_5",
          this.selecteditem.ic_vehicleownerPhone_5
        );
        // };
        // //console.log(obj);
        this.authService
          .INTERNALPostmethod("IncidentForm/IncidentClaimFormUpdation", fd)
          .subscribe(
            (res: any) => {
              // //console.log('form data is :', ...formData)
              if (res.status == 200) {
                //console.log(res);
                // this.rtr.navigate(['userdashboard'])
                alert("Record updated successfully");
                document.getElementById("close").click();
                this.GetData();
                this.submitted = false;
              } else {
                //console.log(res);
                alert("Please check the details");
              }
            },
            (error) => {
              //console.log(error);
            }
          );

        // this.rtr.navigate(['userprofile'])
      }
    }
  }

  filterdatalloading() {
    this.filterArray = [
      {
        mainSection: "Employee Injury",
        subsection: [
          { colname: "Injury", status: false, show: true, link: "" },
          { colname: "First Aid", status: false, show: true, link: "" },
          {
            colname: "Close call/Obsesrvations",
            status: false,
            show: true,
            link: "",
          },

          { colname: "Incident Time", status: false, show: true, link: "" },
          {
            colname: "Specific Location of Incident",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Cause of lost time,injury or first aid",
            status: false,
            show: true,
            link: "",
          },

          {
            colname: "Type of Injury Sustained",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Medical treatment necessary?",
            status: false,
            show: true,
            link: "Name of medical center or physician",
          },
          {
            colname: "Name of medical center or physician",
            status: false,
            show: false,
            link: "",
          },
          {
            colname: "Description of Incident",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Event caused by unsafe act or unsafe condition",
            status: false,
            show: true,
            link: "",
          },
        ],
      },
      {
        mainSection: "Customer Injury",
        subsection: [
          { colname: "Injury", status: false, show: true, link: "" },
          { colname: "First Aid", status: false, show: true, link: "" },
          {
            colname: "Close call/Obsesrvations",
            status: false,
            show: true,
            link: "",
          },

          { colname: "Incident Time", status: false, show: true, link: "" },
          {
            colname: "Specific Location of Incident",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Cause of lost time,injury or first aid",
            status: false,
            show: true,
            link: "",
          },

          {
            colname: "Type of Injury Sustained",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Medical treatment necessary?",
            status: false,
            show: true,
            link: "Name of medical center or physician",
          },
          {
            colname: "Name of medical center or physician",
            status: false,
            show: false,
            link: "",
          },
          {
            colname: "Description of Incident",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Event caused by unsafe act or unsafe condition",
            status: false,
            show: true,
            link: "",
          },
        ],
      },
      {
        mainSection: "Preliminary Information",
        subsection: [
          {
            colname: "Property Damage",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Damage to loaner vehicle",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: " Damage to our vehicle",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Damage to customer vehicle",
            status: false,
            show: true,
            link: "",
          },

          { colname: "Theft of vehicle", status: false, show: true, link: "" },
          {
            colname: "Lost/missing vehicle",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Other",
            status: false,
            show: true,
            link: "",
          },

          {
            colname: "Employee Name",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Supervisor Name",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Employee Email",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Supervisor Email",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Position/Title",
            status: false,
            show: true,
            link: "",
          },

          {
            colname: "Department",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Employee Phone",
            status: false,
            show: true,
            link: "",
          },
        ],
      },
      {
        mainSection: "Incident Information",
        subsection: [
          {
            colname: "Incident Date",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "General Location of Incident",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Description of Incident",
            status: false,
            show: true,
            link: "",
          },

          {
            colname: "Witnesses to this incident",
            status: false,
            show: true,
            link: "Witnesses information",
          },
          {
            colname: "Witnesses information",
            status: false,
            show: false,
            link: "",
          },
        ],
      },
      {
        mainSection: "General Information",
        subsection: [
          {
            colname: "Store Name",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Today's Date",
            status: false,
            show: true,
            link: "",
          },
        ],
      },
      {
        mainSection: "Injury Information",
        subsection: [
          {
            colname: "Was an employee injured?",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Was a customer injured?",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "injury by unsafe act or condition",
            status: false,
            show: true,
            link: "",
          },
        ],
      },
      {
        mainSection: "Police Information",
        subsection: [
          {
            colname: "Incident reported to police?",
            status: false,
            show: true,
            link: "",
          },
          {
            colname: "Police File",
            status: false,
            show: false,
            link: "",
          },
          {
            colname: "Station Phone",
            status: false,
            show: false,
            link: "",
          },

          {
            colname: "Officer in charge",
            status: false,
            show: false,
            link: "",
          },
          {
            colname: "Station Email",
            status: false,
            show: false,
            link: "",
          },
          {
            colname: "Station Name",
            status: false,
            show: false,
            link: "",
          },
        ],
      },
    ];
  }
  // ClickURL(item) {
  //   //console.log(item);
  //   localStorage.setItem("id", item.ic_claim_id);
  //   window.open("http://localhost:4200/#/IncidentFormData");
  // }
  Emp_Injures: any = "";
  Cust_Injures: any = "";

  getInjuryInfo(e, block) {
    //console.log(e.target.checked, block);
    if (block == "Cust") {
      this.Cust_Injures = e.target.checked ? "yes" : "no";
      this.myform.controls["injuryTime_2"].setValue("");
      this.myform.controls["injuryLocation_2"].setValue("");
      this.myform.controls["causeOfInjury_2"].setValue("");
      this.myform.controls["injurySustained_2"].setValue("");
      this.myform.controls["medicalCenterPhysician_2"].setValue("");
      this.myform.controls["injuryUnsafeAct_2"].setValue("");
      this.myform.controls["injury_2"].setValue(false);
      this.myform.controls["firstAid_2"].setValue(false);
      this.myform.controls["closeCallObservation_2"].setValue(false);
      this.myform.controls["descriptionOfIncident_2"].setValue("");
      this.medical2 = false;
      // this.myform.controls["medicalCenterPhysician_1"].setValue("");
    }
    if (block == "Emp") {
      this.Emp_Injures = e.target.checked ? "yes" : "no";
      this.myform.controls["injuryTime_1"].setValue("");
      this.myform.controls["injuryLocation_1"].setValue("");
      this.myform.controls["causeOfInjury_1"].setValue("");
      this.myform.controls["injurySustained_1"].setValue("");
      this.myform.controls["medicalCenterPhysician_1"].setValue("");
      this.myform.controls["injuryUnsafeAct_1"].setValue("");
      this.myform.controls["injury_1"].setValue(false);
      this.myform.controls["firstAid_1"].setValue(false);
      this.myform.controls["closeCallObservation_1"].setValue(false);
      this.myform.controls["descriptionOfIncident_1"].setValue("");
      this.medical1 = false;
    }
  }
  ClickURL(item) {
    //  //console.log(item)
    localStorage.setItem("id", item.ic_claim_id);
    localStorage.setItem("IsIncidentReportDataPage", "Y");
    window.open(window.location.origin + "#/IncidentData");
  }
  medical1;
  medical2;
  TextareaShow(e) {
    if (e == "yes") {
      this.Showtextarea = true;
      this.medical1 = e;
    } else {
      this.medical1 = e;
      this.myform.controls["medicalCenterPhysician_1"].setValue("");
      this.Showtextarea = false;
    }
  }

  TextareaShow1(e) {
    if (e == "yes") {
      this.Showtextarea1 = true;
      this.medical2 = e;
    } else {
      this.medical2 = e;
      this.myform.controls["medicalCenterPhysician_2"].setValue("");
      this.Showtextarea1 = false;
    }
  }

  isDesc: boolean = false;
  column: string = "CategoryName";
  Ascesort(property) {
    this.clearselectedsortingvalues();

    this.IncidentForm = this.incidentdata;
    console.log(this.IncidentForm);
    console.log(property, this.isDesc);
    this.column = property;
    let direction = 1; // // //console.log(property)
    this.IncidentForm.sort(function (a, b) {
      if (a[property] > b[property]) {
        return -1 * direction;
      }
      //
    });
    console.log(this.IncidentForm);
  }

  DescsortHold(property) {
    this.clearselectedsortingvalues();
    this.IncidentForm = this.incidentdata;
    this.IncidentForm.sort(
      (a, b) =>
        new Date(a[property]).getTime() - new Date(b[property]).getTime()
    );
  }

  Descsort(property) {
    this.clearselectedsortingvalues();

    this.IncidentForm = this.incidentdata;
    console.log(this.IncidentForm);
    console.log(property, this.isDesc);
    this.column = property;
    let direction = -1;
    // // //console.log(property)
    this.IncidentForm.sort(function (a, b) {
      if (a[property] < b[property]) {
        return 1 * direction;
      }
      // console.log(this.IncidentForm);

      //  else if (a[property] < b[property]) {
      //   return 1 * direction;
      // }
      //  else if (a[property] > b[property]) {
      //   return 1 * direction;
      // }
      // else {
      //   return 0;
      // }
    });
    console.log(this.IncidentForm);
  }
  AscesortHold(property) {
    this.IncidentForm = this.incidentdata;
    this.clearselectedsortingvalues();
    this.IncidentForm.sort(
      (a, b) =>
        new Date(b[property]).getTime() - new Date(a[property]).getTime()
    );
  }
  selectedholddate: any = [];
  clearselectedsortingvalues() {
    this.selectedholddate = [];
    this.Selectedstr = [];
    this.Selectedincdate = [];
  }
  selorunsel(e, ref) {
    // //console.log(e.target.checked);
    this.clearselectedsortingvalues();
    if (ref == "I") {
      // let inc = this.incdate;
      if (e.target.checked == true) {
        this.Selectedincdate = [...this.incdate];
        // this.IncidentForm=this.incidentdata
        // //console.log(this.Selectedincdate);
      } else {
        this.Selectedincdate = [];
        //console.log(this.incdate);
      }
    }
    if (ref == "S") {
      if (e.target.checked == true) {
        this.Selectedstr = [...this.storedata];
        // this.IncidentForm=this.incidentdata
        // //console.log(this.Selectedincdate);
      } else {
        this.Selectedstr = [];
      }
    }
    if (ref == "H") {
      if (e.target.checked == true) {
        this.selectedholddate = [...this.holddate];
        // this.IncidentForm=this.incidentdata
        // //console.log(this.Selectedincdate);
      } else {
        this.selectedholddate = [];
      }
    }
  }
  Selectedincdate: any = [];
  Selectedstr: any = [];
  individualsel(e, item, ref) {
    if (ref == "I") {
      this.selectedholddate = [];
      this.Selectedstr = [];
      if (e.target.checked == true) {
        this.Selectedincdate.push(item);
      } else {
        this.Selectedincdate.splice(this.Selectedincdate.indexOf(item), 1);
      }
    }
    if (ref == "S") {
      this.selectedholddate = [];
      this.Selectedincdate = [];
      if (e.target.checked == true) {
        this.Selectedstr.push(item);
      } else {
        this.Selectedstr.splice(this.Selectedstr.indexOf(item), 1);
      }
      //console.log(this.storedata);
    }
    if (ref == "H") {
      this.Selectedstr = [];
      this.Selectedincdate = [];
      if (e.target.checked == true) {
        this.selectedholddate.push(item);
      } else {
        this.selectedholddate.splice(this.selectedholddate.indexOf(item), 1);
      }
      //console.log(this.storedata);
    }
    // //console.log(this.Selectedincdate);
  }

  apply(ref) {
    if (ref == "I") {
      this.IncidentForm = this.incidentdata.filter((a) =>
        this.Selectedincdate.some((b) => b === a.ic_incidentDate)
      );
    }
    if (ref == "S") {
      this.IncidentForm = this.incidentdata.filter((a) =>
        this.Selectedstr.some((b) => b === a.ic_dealership)
      );
    }
    if (ref == "H") {
      this.IncidentForm = this.incidentdata.filter((a) =>
        this.selectedholddate.some((b) => b === a.ic_hold_date)
      );
    }

    //console.log(this.IncidentForm);
  }

  changestatus(e, item, idx) {
    //console.log(e, item);
    item.status = e.target.checked;
    if (item.link != "") {
      let link = item.link;
      let index = this.filterArray[idx].subsection.findIndex(
        (i) => i.colname == link
      );
      this.filterArray[idx].subsection[index].show = e.target.checked;
    }
    if (idx == 6) {
      this.filterArray[idx].subsection[1].show = e.target.checked;
      this.filterArray[idx].subsection[2].show = e.target.checked;
      this.filterArray[idx].subsection[3].show = e.target.checked;
      this.filterArray[idx].subsection[4].show = e.target.checked;
      if (e.target.checked == false) {
        this.filterArray[idx].subsection[1].status = e.target.checked;
        this.filterArray[idx].subsection[2].status = e.target.checked;
        this.filterArray[idx].subsection[3].status = e.target.checked;
        this.filterArray[idx].subsection[4].status = e.target.checked;
      }
    }

    //console.log(e, item);
  }

  exportAsXLSX() {
    this.excelService.IncidentReportsXLSX();
  }

  cancelfiler() {
    this.filterdatalloading();
  }
}
