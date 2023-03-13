import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';

@Component({
  selector: 'app-store-brands',
  templateUrl: './store-brands.component.html',
  styleUrls: ['./store-brands.component.scss']
})
export class StoreBrandsComponent implements OnInit {
  
  StoresBrandsGrid:boolean = true;
  EditStoreBrands:boolean = true;
  Dealer_DD: any =[];
  GetBrands :  any =[];
  FormStoresBrands : FormGroup;
  brandids : any = [];
  SelectedBrandIds: any = "";
  selectedItemsList = [];
  CheckedEditBrands : any = [];
  StoresBrandGridData: any = [];
  StoreId: any = '0';
  StoresBrandArraydata = {
    
    Storeid: '',
    Status:'Y',
    Action:'A'
  }
  constructor(private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService,private router: Router, private GroupData: FormBuilder) { 
    
    this.FormStoresBrands = this.GroupData.group({
      
      Storeid: [''],
      brandids: [''],
      Status: [''],
      avatar: [null]
    });
  }

  ngOnInit() {
    this.StoresBrandsGrid = true;
    this.EditStoreBrands =  false;
    this.GetStoresBrandData();
  }
 
  StoresData(){
    const obj = {"AU_ID":localStorage.getItem('User_ID') };
    this.authService.AXELPostmethod('AXELData/GetCorporatesbyUser',obj).subscribe(x =>{ 
      if(x !== ''){
        this.Dealer_DD=x.response.recordset;
        console.log("StoresData", this.Dealer_DD);
      }
      });
  }
  
  GetBrandsData(){
    const obj = { };
    this.authService.AXELPostmethod('Brands/GetBrands',obj).subscribe(x =>{
      if(x !== ''){
        this.GetBrands=x.response.recordset;      
      }
      });
  }

  GetStoresBrandData(){

    const obj = {
      "ID":0,
      "CORAID":0,
      "GROUPID":0,
      "StartCnt":0,
      "totCnt":0
      }
        this.spinnerService.show();
        this.authService.AXELPostmethod('Brands/GetStoresData', obj).subscribe(x =>{
          if (x.status == 200){
            this.EditStoreBrands = false;
            this.StoresBrandGridData = x.response.recordset;        
          }
          this.spinnerService.hide();
        });
      }
  AddStoreBrand(){
    this.StoresBrandArraydata.Storeid ="";
   
    this.StoresData();
    this.CheckedEditBrands = [];
    this.brandids=[];
    this.GetBrandsData();
    
    this.StoresBrandsGrid = false;
    this.EditStoreBrands =  true;
  }

  HandleStoreIds(event){
    
    var i =0
    event = String(event);
    if(!this.brandids.includes(event))
   {    this.brandids.push(event);
    if(this.SelectedBrandIds  == "")
    this.SelectedBrandIds = event;
    else 
    this.SelectedBrandIds += ','+ event;
    i++;}
    if(i==0 ){
  this.SelectedBrandIds = "";
    this.selectedItemsList = this.brandids.filter((value, index) => {
      if(value != event )
    {
      if(this.SelectedBrandIds  == "")
      this.SelectedBrandIds = value;
      else 
      this.SelectedBrandIds += ',' + value ;
      return value;
    } 
    });
    this.brandids = this.selectedItemsList;
  }

  
  }
  IsStoreChecked( Cora_Id){
    this.CheckedEditBrands = [];
    
    // if(this.StoresBrandArraydata.Action  == "U" ) 
    // {
      this.CheckedEditBrands = this.brandids.filter((value, index) => {
        if(String(Cora_Id) == value){
          return value;
        }  
         });
    // }
    
 if(this.CheckedEditBrands.length > 0)
 return 1;
 else 
 return 0;
}

BackToBrandsGrid(){
  this.EditStoreBrands = false;
  this.StoresBrandsGrid = true;
}
editGroup(id){
  this.brandids =[];
  this.StoresData();
  this.GetBrandsData();
  this.StoresBrandsGrid = false;
  this.EditStoreBrands =  true;

  const obj = {
    "ID":id,
    "StartCnt":0
    }
      this.spinnerService.show();
      this.authService.AXELPostmethod('Brands/GetStoresData', obj).subscribe(x =>{
        if (x.status == 200){
          let tempArray = (x.response.recordset);
          let StoreData = tempArray.filter(tempArray => tempArray.AS_ID === id )
          this.StoreId = StoreData[0].AS_ID;
          this.SelectedBrandIds = StoreData[0].AS_BRANDIDS ;
          this.StoresBrandArraydata.Storeid = StoreData[0].AS_ID;
          if(this.SelectedBrandIds != null && this.SelectedBrandIds != ''){
            this.brandids =  this.SelectedBrandIds.split("," );
          parseInt(this.brandids)
          }  
        }
        this.spinnerService.hide();
      });
 
    }

    SaveStoresBrands(){
  const obj = {
    "AS_ID":this.StoresBrandArraydata.Storeid,
    "BRANDIDS":this.SelectedBrandIds
    }
    if(this.StoresBrandArraydata.Storeid == ""){
      alert("Please Select Group Name");
    }

    if(this.SelectedBrandIds == ""){
      alert("Please Select Store Name");
    }
    else 
    this.authService.AXELPostmethod('Brands/StoreBrandAssignmentAction', obj).subscribe(x =>{
      if (x.status == 200) {
        alert('Updated Successfully');
        // if (this.GroupStoreArraydata.Action === 'U' && this.GroupStoreId > 0 && this.GroupStoreId != "") {
        //   alert('Updated Successfully');
        // } 
      //   else if (this.GroupStoreArraydata.Action === 'A')
      //   alert('Added Successfully');
      //     this.GetGroupsStoreData();
      //     this.EditGroupStore = false;
      //     this.GroupStoreGrid = true;
       }
      // else if (x.status == 401){alert('Record already Exsist');}
      this.StoresBrandsGrid = true;
      this.EditStoreBrands =  false;
      this.GetStoresBrandData();
    });
}

}
