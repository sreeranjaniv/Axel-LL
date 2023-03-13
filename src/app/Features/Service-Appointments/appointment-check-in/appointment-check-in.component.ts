import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerComponent, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointment-check-in',
  templateUrl: './appointment-check-in.component.html',
  styleUrls: ['./appointment-check-in.component.scss']
})
export class AppointmentCheckInComponent implements OnInit {
  AppointmentDATA: any = [];

  stores: any;

  storedefault: any;
  checksign: any;
  public dateTime1: Date;
  public dateTime2: Date;
  public dateTime3: Date;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  pageIndex = 0;
  checkedsignvalue: any;
  checked: any;
  signed: any;
  image: any;
  imagepopup: string;
  progressbar: boolean;
  searchQuery: string = '';
  constructor(public location : Location, public authService: ApiService, public spinner: Ng4LoadingSpinnerService, public globalVarComponent: GlobalVariablesComponent) { }

  ngOnInit(): void {
    this.storedefault = "0";
    this.checksign = "0"
    this.checked = 0;
    this.signed = 0;
    this.progressbar = false;
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";

    let today = new Date();
    this.model = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
    this.model1 = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
    this.getstores();
  }
  getIndex(pageIndex) {
    this.pageIndex = pageIndex
    this.AppointmentDetails()
  }

  prevIndex() {
    this.pageIndex--
    this.AppointmentDetails()
  }

  nextIndex() {
    this.pageIndex++
    this.AppointmentDetails()
  }
  searchstores(e) {
    this.pageIndex = 0
    this.AppointmentDetails()
  }

  AdminAdd(type) { }
  searchchecksign(e) {
    this.checkedsignvalue = e
    this.AppointmentDetails()
  }
  AppointmentDetails() {
    this.spinner.show();
    if (this.checkedsignvalue == 0) {
      this.checked = 0
      this.signed = 0
    }
    if (this.checkedsignvalue == 1) {
      this.checked = 1
      this.signed = 0
    }
    if (this.checkedsignvalue == 2) {
      this.checked = 0
      this.signed = 1
    }
    var obj =
    {
      "acct_id": this.storedefault,
      "phone": this.searchQuery != '' ? this.searchQuery : "0",
      "checked": this.checked,
      "signature": this.signed,
      "startdate": this.model.year + '-' + ('0' + this.model.month).slice(-2) + '-' + ('0' + this.model.day).slice(-2),
      "enddate": this.model1.year + '-' + ('0' + this.model1.month).slice(-2) + '-' + ('0' + this.model1.day).slice(-2),
      "pageindex": this.pageIndex,
      "pagesize": "25"
    }
    this.authService.TouchXpressPostmethod('touch/GetAppointmentsAdmin', obj).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide();
        this.AppointmentDATA = res.response;
        this.AppointmentDATA.some(function (x: any) {
          x.ServiceItems = JSON.parse(x.ServiceItems);
          return false;
        });
        console.log(this.AppointmentDATA);
      }
    })

  }

  searchFilter() {
    this.pageIndex = 0;
    this.AppointmentDetails();
  }
  startDate(e) {
    this.pageIndex = 0
    this.AppointmentDetails();
  }


  endDate(e) {
    this.pageIndex = 0
    this.AppointmentDetails();
  }

  getstores() {
    const obj = {
      "Id": 1
    }
    this.authService.TouchXpressPostmethod('touch/GetStores', obj).subscribe(res => {
      if (res.status == 200) {
        this.stores = res.response;
        this.AppointmentDetails();
      }
    });
  }

  imageclick(e) {
    this.image = e
    this.imagepopup = 'http://touchxpressapi.azaz.com/api/v1/resources/signatures/' + e;
  }
  PreviousUrl() {
    this.location.back();
  }

}
