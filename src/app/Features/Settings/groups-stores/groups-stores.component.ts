import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';


@Component({
  selector: 'app-groups-stores',
  templateUrl: './groups-stores.component.html',
  styleUrls: ['./groups-stores.component.scss']
})
export class GroupsStoresComponent implements OnInit {
  @ViewChildren("StoreIds") StoreIds: QueryList<ElementRef>;
  GroupStoreGrid:boolean = true;
  EditGroupStore:boolean = true;
  GroupStoreStatus: boolean = true
  GroupsStoreData : any[];
  public Dealer_DD: any =[];
  public Groups_DD: any =[];
  FormGroupStores : FormGroup;
  GroupForm: FormGroup;
  GroupStoreId: any = '0';
  SelectedStoreIds: any = "";
  storeids : any = [];
  selectedItemsList = [];
  checkedIDs = [];
  // EditStore : any = [];
  CheckedEditStore : any = [];
  GroupStoreArraydata = {
    SelectedStoreIds : "",
    StoreIds : '',
    Groupid : '',
    Status:'Y',
    Action:'A'
  }
  GroupArraydata = {
    GroupName : '',
    GroupCode : '',
    Status:'Y',
    Action:'A'
  }
  lbl_Action = "Add";
  constructor(private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router, private GroupData: FormBuilder) {
    this.FormGroupStores = this.GroupData.group({
      
      SelectedStoreIds : '',
      StoreIds: [''],
      Groupid: [''],
      Status: [''],
      avatar: [null]
    });
    this.GroupForm = this.GroupData.group({
      GroupName: ['', []],
      GroupCode: ['', []],
      Status: [''],
      avatar: [null]
    });
   }

  ngOnInit() {
    this.GetGroupsStoreData();
    this.EditGroupStore = false;
    this.GroupStoreGrid = true;
  }
  StoresData(){
    const obj = { };
    this.authService.AXELPostmethod('Group/GetStoreCheckboxes',obj).subscribe(x =>{
      if(x !== ''){
        this.Dealer_DD=x.response.recordset;
        console.log("Dealer_DD", this.Dealer_DD);
      }
      });
  }
  GroupsDropDown(){
    const obj = { };
    this.authService.AXELPostmethod('Group/GetGroupsDD',obj).subscribe(x =>{
      if(x !== ''){
        this.Groups_DD=x.response.recordset;
        // console.log("GroupsDDL", this.Groups_DD);
      }
      });
  }
  UpdateGroup(){
    
    const obj = {
      "ACTION":'A',
      "GID":0 , 
      "GNAME":this.GroupArraydata.GroupName, 
      "GCODE":this.GroupArraydata.GroupCode, 
      "GSTATUS":'Y'
      }
      if(this.GroupArraydata.GroupName == ""){
        alert("Please Enter Group Name");
      }
      else
      this.authService.AXELPostmethod('Group/GroupAction', obj).subscribe(x =>{
        if (x.status == 200) {
          if (this.GroupArraydata.Action === 'A')
          alert('Added Successfully');
               this.GroupsDropDown();
        }
        else if (x.status == 401){alert('Record already exists');}
      });
      this.GroupArraydata.GroupName ="";
      this.GroupArraydata.GroupCode = '';
  }
  BackToGroupStoreEditpanned(){
    this.EditGroupStore = true;
    this.GroupStoreGrid = false;
    this.GroupArraydata.GroupName ="";
    this.GroupArraydata.GroupCode = '';
  }
  GetGroupsStoreData(){
    const obj = {
      "G_ID":0, 
      "StartCnt":0
      }
        this.spinnerService.show();
        this.authService.AXELPostmethod('Group/GetGroupsStoresData', obj).subscribe(x =>{
          if (x.status == 200){
            this.EditGroupStore = false;
            this.GroupsStoreData = x.response.recordset;
            console.log("GroupsStore_Data", x.response.recordset);
          }
          this.spinnerService.hide();
        });
      }
  AddGroupStore(){
    this.clear();    
    this.lbl_Action = 'Add';
    this.GroupsDropDown();
    this.CheckedEditStore = [];
    this.StoresData();
    this.GroupStoreStatus =false;     
    this.EditGroupStore = true;
    this.GroupStoreGrid = false;
    this.GroupStoreArraydata.Status = 'Y';
  }
  editGroup(Group_id){
    this.lbl_Action = 'Edit';
    this.GroupsDropDown();
    this.StoresData();
    this.GroupStoreGrid = false;
    this.EditGroupStore = true;
    this.GroupStoreStatus =true;

    const obj = {
      "G_ID":Group_id, 
      "StartCnt":0
      }
        this.spinnerService.show();
        this.authService.AXELPostmethod('Group/GetGroupsStoresData', obj).subscribe(x =>{
          if (x.status == 200){
            let tempArray = (x.response.recordset);
            let GroupStoreData = tempArray.filter(tempArray => tempArray.G_Id === Group_id )
            this.GroupStoreId = GroupStoreData[0].G_Id;
            this.SelectedStoreIds = GroupStoreData[0].STORE_IDs ;
            this.GroupStoreArraydata.Groupid = GroupStoreData[0].G_Id;
            this.GroupStoreArraydata.Status = GroupStoreData[0].GS_Status;
            this.GroupStoreArraydata.Action = 'U'
            this.storeids =  this.SelectedStoreIds.split(",");
            parseInt(this.storeids)
            // console.log("EditStore" , EditStore);
          }
          this.spinnerService.hide();
        });
        
        // console.log("Selected ")
      }
      clear(){
        this.GroupStoreArraydata.Action = 'A'
        this.GroupStoreId = 0;
        this.GroupStoreArraydata.Status = 'Y';
        this.GroupStoreArraydata.Groupid  ="";
      }
  DeleteGroup(Id, Action)
  {
    const obj = {
      "ACTION":Action,
      "GSID":Id, 
      "GSCORAACCTID":"", 
      "GSGID":0, 
      "GSSTATUS":""
      }
        this.spinnerService.show();
        this.authService.AXELPostmethod('Group/GroupStoresAction', obj).subscribe(x =>{
          if (x.status == 200) {
            alert('Deleted Successfully');
          }
          this.GetGroupsStoreData();
          this.spinnerService.hide();
          
        });
   
  }
  SaveGroupStores(){
        
    const obj = {
      "ACTION":this.GroupStoreArraydata.Action,
      "GS_ID":this.GroupStoreId, 
      "GS_AS_IDs":this.SelectedStoreIds, 
      "GS_G_ID":this.GroupStoreArraydata.Groupid, 
      "GS_STATUS":this.GroupStoreArraydata.Status
      }
      if(this.GroupStoreArraydata.Groupid == ""){
        alert("Please Select Group Name");
      }

      if(this.SelectedStoreIds == ""){
        alert("Please Select Store Name");
      }
      else 
      this.authService.AXELPostmethod('Group/GroupStoresAction', obj).subscribe(x =>{
        if (x.status == 200) {
          if (this.GroupStoreArraydata.Action === 'U' && this.GroupStoreId > 0 && this.GroupStoreId != "") {
            alert('Updated Successfully');
          } else if (this.GroupStoreArraydata.Action === 'A')
          alert('Added Successfully');
            this.GetGroupsStoreData();
            this.EditGroupStore = false;
            this.GroupStoreGrid = true;
        }
        else if (x.status == 401){alert('Record already Exsist');}
      });
  }
  selected(event){
    const obj={
      "GID":event
    }
    this.authService.AXELPostmethod('Group/GetGroupIdStatus', obj).subscribe(x =>{
      if (x.status == 200){
        if(x.response.output.STATUS == "Y")
        alert("Group Already Exist");
      }
    });
  }

  HandleStoreIds(event){
    
    var i =0
    event = String(event);
    if(!this.storeids.includes(event))
   {    this.storeids.push(event);
    if(this.SelectedStoreIds  == "")
    this.SelectedStoreIds = event;
    else 
    this.SelectedStoreIds += ','+ event;
    i++;}
    if(i==0 ){
  this.SelectedStoreIds = "";
    this.selectedItemsList = this.storeids.filter((value, index) => {
      if(value != event )
    {
      if(this.SelectedStoreIds  == "")
      this.SelectedStoreIds = value;
      else 
      this.SelectedStoreIds += ',' + value ;
      return value;
    } 

    });

    this.storeids = this.selectedItemsList;
  }
  
  //  console.log("selectedItemsList",  this.storeids);
  //  console.log("Comma_Val",  this.SelectedStoreIds);
  
  }
  IsStoreChecked( Cora_Id){
    this.CheckedEditStore = [];
    if(this.GroupStoreArraydata.Action  == "U" ) 
    {
      if(this.storeids != null && this.storeids != ''){
        this.CheckedEditStore = this.storeids.filter((value, index) => {
          if(String(Cora_Id) == value){
            return 1;
          }  
           });
           if(this.CheckedEditStore.length > 0)
           return 1;
           else 
           return 0;
          }
       
        else
        return 0;
        }
      }

  BackToGroupGrid(){
    this.EditGroupStore = false;
    this.GroupStoreGrid = true;
  }
}

