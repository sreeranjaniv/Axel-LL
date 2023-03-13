import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vehicle-purchase',
  templateUrl: './vehicle-purchase.component.html',
  styleUrls: ['./vehicle-purchase.component.scss']
})
export class VehiclePurchaseComponent implements OnInit {

  ICOdata: any;
  Attachments: any;
  searchKeyWord: any;
  imagepath: any = "http://axelapi.axelautomotive.com/api/icointernal/";
  imagepopup: any;
  SelectStatus: any = "";
  SelectStore: any = "";
  log: any;
  Status: any;
  Store:any
  keys: string[];
  SubTabledata: any;
  popUpType: string;
  item: any;
  storesData: any =[];
  sortDir = 1;
  constructor(private location: Location, private authService: ApiService,
    private spinnerService: Ng4LoadingSpinnerService, public globalVarComponent: GlobalVariablesComponent, private ngbModal: NgbModal) { }

  ngOnInit() {
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";
    this.GetData();
    this.getStores();
  }
  GetData() {
    this.spinnerService.show();
    const obj = {
    }
    this.spinnerService.show();
    this.authService.AXELPostmethod('ico/get', obj).subscribe((Data: any) => {
      this.ICOdata = Data.response;
      console.log(this.ICOdata);

      this.Attachments = Data.response.attachments[0].originalfilename
      console.log(this.Attachments)
      this.spinnerService.hide();
    })
  }
  onSortClick(event) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir=-1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir=1;
    }
    this.sortArr('storecode');
  }
  sortArr(colName:any){
    this.ICOdata.sort((a,b)=>{
      a= a[colName].toLowerCase();
      b= b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }
  getStores(){
    const obj = {
    }
    this.authService.AXELPostmethod('ico/GetStores',obj).subscribe((Data: any) => {
      this.storesData = Data.response.recordset;
      console.log(this.storesData)
    })
  }
  ClickURL(e) {
    console.log(e);
    this.imagepopup = this.imagepath + e[0].uploadedfilename;
    console.log(this.imagepopup);
  }

  PreviousUrl() {
    this.location.back();
  }
  selectStatus(event) {
    this.Status = event.target.value;
    console.log(event.target.value);
    
  }
  dummyData : any =[]
  storechange(event) {
    this.Store = event.target.value;
    this.showSelectedStatus(this.ICOdata)
    
  }
  showSelectedStatus(ICOdata): any {
    console.log(this.SelectStatus)
    if (this.SelectStatus.length > 0) {
      let Vehicledata = [];
      let SelectStatus = this.SelectStatus;
      console.log(SelectStatus);
      Vehicledata = ICOdata.filter(x => x.status == SelectStatus);
      console.log(Vehicledata)
      return Vehicledata;
    }

    if(this.Store)
    {
      let Vehicledata = [];

      Vehicledata = ICOdata.filter(x => x.storecode == this.Store);
      console.log("ffge",Vehicledata);
      
      return Vehicledata;
    }
    // return IVRrec.IVR_STATUS ===this.SelectStatus;
    return ICOdata;
  }
  edit(item, mymodal) {
    this.popUpType = 'E';
    // console.log(item, 'item')
    this.item = item;
    this.ngbModal.open(mymodal, { size: 'sm', backdrop: 'static' });
    this.Status = item.status;
  }
  statuschange(evt) {
    this.Status = evt;
  }
  saveStatus() {
    const obj = {
      "id": this.item.id,
      "status": this.Status
    }

    console.log('statusupdate', obj)
    this.authService.AXELPostmethod('ico/IcoStatusesUpdate', obj).subscribe((x: any) => {
      console.log('update', x);
      if (x.status == 200) {
        alert(x.response);
        this.ngbModal.dismissAll();
        this.GetData();
      }
    })
  }
  downloadImage(e) {
    let url: any = this.imagepath + e.uploadedfilename;
    let name: any = e.originalfilename;
    console.log(name)
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

}
