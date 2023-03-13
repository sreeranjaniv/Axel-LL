import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-vauto-inventory',
  templateUrl: './vauto-inventory.component.html',
  styleUrls: ['./vauto-inventory.component.scss']
})
export class VautoInventoryComponent implements OnInit {

  public Inventory_Overview:any=[];
  public Inv_Header:any=[];

  
  constructor(private authService: ApiService, private router: Router, private _Activatedroute: ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) {
   
   }

   ngOnInit() {
    this.GridBind();
  }
 

  GridBind() {
    const obj={
      "AU_ID": localStorage.getItem('User_ID')
    };
        this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetAxelMAXDIGIInventoryOverview',obj).subscribe(x =>{
        this.Inventory_Overview = x.response.recordset;
        this.Inv_Header = x.response.recordset[0];
        this.Inventory_Overview.shift();
        this.spinnerService.hide();
    });
  }
  RedirectToDataQuery(item) {
    console.log("StoreID", item);
    let navigationExtras: NavigationExtras = {
      state: {
        Store_Id: item.STORE_ID
      }
    };
    console.log("StoreID", item);
    this.router.navigate(['InventoryData'], navigationExtras);
  }
}
