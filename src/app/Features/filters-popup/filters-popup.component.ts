import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TreeItem, TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-filters-popup',
  templateUrl: './filters-popup.component.html',
  styleUrls: ['./filters-popup.component.scss']
})
export class FiltersPopupComponent implements OnInit {
  
  StoreName = "";
  public DetailedAppointmentData:any=[];
  DetailedAppointmentkeys: any = [];
  GetStores : any = [];
  GetBrands: any = [];
  GetBrandStores : any = [];
  GetGroups : any = [];
  public GetGroupsStores : any = [];
  StoresItems:TreeviewItem[];
  GroupItems:TreeviewItem[];
  BrandItems:TreeviewItem[];
  StoreTreeItems :TreeItem;
  StoreTreeItemsAry:TreeItem[]=[];
  GroupTreeItems :TreeItem;
  GroupTreeItemsAry:TreeItem[]=[];
  GroupStoresTreeItems:TreeItem;
  GroupStoresTreeItemsAry:TreeItem[]=[];
  BrandTreeItems :TreeItem;
  BrandTreeItemsAry:TreeItem[]=[];
  BrandStoresTreeItems:TreeItem;
  BrandStoresTreeItemsAry:TreeItem[]=[];
  values: number[];
  RadioValue= "C";
  CorporateComma: string;
  StoreFilters:boolean = true;
  Selected: any;
  CorporateValues: any;
  Groupvalues: any;
  Brandvalues: any;
  // @Output() public FinalArray = new EventEmitter<any>();
  @Output() public sendChildValue: EventEmitter<any> = new EventEmitter<any>();
  config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasFilter: false,
      hasCollapseExpand: false,
      decoupleChildFromParent: false,
      // maxHeight: 400
  });
  form: FormGroup;
  constructor(private authService: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.BrandParentData();
    this.GroupsParentData();
    this.StoresData();
  }

  Filters(){
      this.StoresItems = this.getCorporateItems();   
      this.GroupItems = this.getGroupItems();          
      this.BrandItems = this.getBrandItems();
      this.ResetValues();
  
    
  }
  StoresData(){
    const obj = { "AU_ID":localStorage.getItem('User_ID') };
    this.authService.AXELPostmethod('AXELData/GetCorporatesbyUser',obj).subscribe(x =>{
      if(x !== ''){
  
        this.GetStores=x.response.recordset;
        console.log("GetStores", this.GetStores);
      }
      });
  } 
  GroupsParentData(){
    const obj = {
      "AU_ID":localStorage.getItem('User_ID'),
      "GROUP_TYPE":"P",
      "GROUP_ID":0
     };
    this.authService.AXELPostmethod('Group/GetGroupsFilter',obj).subscribe(
     x =>{
      if(x !== ''){
        this.GetGroups=x.response.recordset;
        // console.log("Groups", this.GetGroups);
        for(var i =0; i<this.GetGroups.length; i++){
           this.GroupsChildData(this.GetGroups[i].GROUP_ID);
  
        }
      }
      });
  } 
  
    GroupsChildData(GroupID):any{
    const obj = {
      "AU_ID":localStorage.getItem('User_ID'),
      "GROUP_TYPE":"C",
      "GROUP_ID":GroupID
     };
     
  this.authService.AXELPostmethod('Group/GetGroupsFilter',obj).subscribe(x =>{
  
    if(x !== ''){ 
      // for( var j = 0; j<x.response.recordset.length-1; j++){
        this.GetGroupsStores.push(x.response.recordset);
      // }
      // console.log("GetGroupsStores", this.GetGroupsStores);
    }
  });
  }
  BrandParentData(){
    const obj = {
      "AU_ID":localStorage.getItem('User_ID'),
      "Type":"P",
      "Brand_ID":0
     };
    this.authService.AXELPostmethod('Group/GetBrandsFilter',obj).subscribe(x =>{
      if(x !== ''){
        this.GetBrands=x.response.recordset;
        // console.log("Brands", this.GetBrands);
        for(var i =0; i<this.GetBrands.length; i++){
          this.BrandChildData(this.GetBrands[i].BRAND_ID);
       }
      }
      });
  }
  BrandChildData(BrandId){
    const obj = {
      "AU_ID":localStorage.getItem('User_ID'),
      "Type":"C",
      "Brand_ID":BrandId
     };
    this.authService.AXELPostmethod('Group/GetBrandsFilter',obj).subscribe(x =>{
      if(x !== ''){
  
        this.GetBrandStores.push(x.response.recordset);
        // console.log("BrandStores", this.GetBrandStores);
      }
      });
  }
  storeChildItems(){ 
    for(var i =0; i<this.GetStores.length; i++){
      this.StoreTreeItems = { text: this.GetStores[i].DEALER_NAME, value: this.GetStores[i].AS_ID };
      this.StoreTreeItemsAry.push(this.StoreTreeItems);
    }
    }
  
    getCorporateItems(): TreeviewItem[] {
      this.StoreTreeItemsAry=[];
      this.storeChildItems();
      const CorporateCategoryChild=this.StoreTreeItemsAry.map((item) => {
      return new TreeviewItem(item);  });  
      const CorporateCategory = new TreeviewItem({text: 'Select All', value: 0, children:CorporateCategoryChild});
      return [CorporateCategory];
      // const CorporateCategory = new TreeviewItem({
      //     text: 'Select All', value: 0, children: this.StoreTreeItemsAry
      // });
  }
      getGroupItems(): TreeviewItem[] {
        this.GroupTreeItemsAry=[];
        
         let GroupCategory ;
         this.GroupParentItems();
        const GroupCategoryChild1=this.GroupTreeItemsAry.map((item) => {
          return new TreeviewItem(item);  });  
          GroupCategory = new TreeviewItem({text: 'Select All', value: 0, children:GroupCategoryChild1});
        return [GroupCategory];
  
  }
       GroupParentItems(){
        //  let GroupStoresCategoryItems TreeviewItem: new (arg0: TreeItem) => any[]=[];
        for(var i =0; i<this.GetGroups.length; i++){
          const ChildArray = this.GetGroupsStores.map(item => item).filter(item => item[0].PARENT_ID == this.GetGroups[i].GROUP_ID);
          this.GroupStoresTreeItemsAry =[];
            for(var j =0; j<ChildArray[0].length; j++){
              this.GroupStoresTreeItems =  { text: ChildArray[0][j].DEALER_NAME, value:ChildArray[0][j].AS_ID};
              this.GroupStoresTreeItemsAry.push(this.GroupStoresTreeItems);
           }
          const  GroupStoresCategoryItems=this.GroupStoresTreeItemsAry.map((item) => {
             return new TreeviewItem(item);  });
             this.GroupTreeItems =  { text: this.GetGroups[i].GROUP_NAME, value: this.GetGroups[i].GROUP_ID, children:GroupStoresCategoryItems};
          this.GroupTreeItemsAry.push(this.GroupTreeItems);
        } 
      }
      
      
      getBrandItems(): TreeviewItem[] {
        this.BrandTreeItemsAry=[];
        this.BrandParentItems();
        const BrandCategoryChild1=this.BrandTreeItemsAry.map((item) => {
        return new TreeviewItem(item);  });  
        const BrandCategory = new TreeviewItem({text: 'Select All', value: 0, children:BrandCategoryChild1});
        return [BrandCategory];
  }
      BrandParentItems(){
        for(var i =0; i<this.GetBrands.length; i++){
          const ChildArray = this.GetBrandStores.map(item => item).filter(item => item[0].PARENT_ID == this.GetBrands[i].BRAND_ID);
          // console.log("Brand_Child", ChildArray);
          this.BrandStoresTreeItemsAry =[];
            for(var j =0; j<ChildArray[0].length; j++){
              this.BrandStoresTreeItems =  { text: ChildArray[0][j].DEALER_NAME, value:ChildArray[0][j].AS_ID};
              this.BrandStoresTreeItemsAry.push(this.BrandStoresTreeItems);
           }
          const  BrandStoresCategoryItems=this.BrandStoresTreeItemsAry.map((item) => {
             return new TreeviewItem(item);  });
             this.BrandTreeItems =  { text: this.GetBrands[i].BRAND_NAME, value: this.GetBrands[i].BRAND_ID, children:BrandStoresCategoryItems};
          this.BrandTreeItemsAry.push(this.BrandTreeItems);
        } 
        
      }
  onFilterChange(value: string) {
    
  }
  OnSubmit(Groupvalues, CorporateValues, Brandvalues){
   
    if(this.RadioValue == 'C'){  
      this.authService.setCoraVals(CorporateValues);
    }
    else if(this.RadioValue == 'G'){     
      this.authService.setCoraVals(Groupvalues);
    }
    else if(this.RadioValue == 'B'){
      this.authService.setCoraVals(Brandvalues);
    }
    
  }

  RadioChange(event, val){
    this.RadioValue = val;
    if(val== 'G'){
      $("#ngx-C input").attr("disabled", "disabled");
      $("#ngx-B input").attr("disabled", "disabled");
      $("#ngx-G input").removeAttr("disabled"); 
    }
    else if(val== 'C'){
      $("#ngx-C input").removeAttr("disabled");
      $("#ngx-B input").attr("disabled", "disabled");
      $("#ngx-G input").attr("disabled", "disabled"); 
    }
    else if(val== 'B'){
      $("#ngx-C input").attr("disabled", "disabled");
      $("#ngx-B input").removeAttr("disabled");
      $("#ngx-G input").attr("disabled", "disabled"); 
    }

  }

  ResetValues(){
    setTimeout(function(){
      $('#C').prop('checked',true);
      $("#ngx-C input").removeAttr("disabled");
      $("#ngx-B input").attr("disabled", "disabled");
      $("#ngx-G input").attr("disabled", "disabled");  
      }, 800);
      
  }

}
