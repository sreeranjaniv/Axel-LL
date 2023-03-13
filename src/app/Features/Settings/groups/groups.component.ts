import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  GroupGrid:boolean = true;
  EditGroup:boolean = true;
  GroupStatus: boolean = true;
  public GroupsData =[];
  GroupForm : FormGroup;
  GroupId: any = '0';
  GroupArraydata = {
    GroupName : '',
    GropCode : '',
    Status:'Y',
    Action:'A'
  }
  lbl_Action : any ="";
  constructor(private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router, private GroupData: FormBuilder) { 
    
    this.GroupForm = this.GroupData.group({
      GroupName: ['', []],
      GroupCode: ['', []],
      Status: [''],
      avatar: [null]
    });
  }

  ngOnInit() {
    this.GetGroupsData();
    this.EditGroup = false;
    this.GroupGrid = true;
  }

  GetGroupsData(){
    const obj = {
      "ID":0, 
      "NAME":"", 
      "CODE":"", 
      "StartCnt":0,
      "totCnt":0
      }
        this.spinnerService.show();
        this.authService.AXELPostmethod('Group/GetGroupsData', obj).subscribe(x =>{
          if (x.status == 200){
            this.EditGroup = false;
            this.GroupsData = x.response.recordset;
            // console.log("Groups_Data", x.response.recordset);
          }
          this.spinnerService.hide();
        });
      }
      AddGroup(){
        this.clear();
        this.lbl_Action = "Add";
        this.EditGroup = true;
        this.GroupGrid = false;
        this.GroupStatus =false;
        this.GroupArraydata.GroupName  = '';
        this.GroupArraydata.GropCode = '';
        this.GroupArraydata.Status = 'Y';
        // this.GetGroupsData();
       
      }
      editGroup(Group_id){
        this.GroupStatus =true;
        this.EditGroup = true;
        this.GroupGrid = false;
        this.lbl_Action = "Edit";
        const obj = {
          "ID":Group_id, 
          "NAME":"", 
          "CODE":"", 
          "StartCnt":0,
          "totCnt":0
          }
            this.spinnerService.show();
            this.authService.AXELPostmethod('Group/GetGroupsData', obj).subscribe(x =>{
              if (x.status == 200){
                let tempArray = (x.response.recordset);
                let GroupData = tempArray.filter(tempArray => tempArray.G_Id === Group_id )
                this.GroupId = GroupData[0].G_Id;
                this.GroupArraydata.GroupName = GroupData[0].G_Name ;
                this.GroupArraydata.GropCode = GroupData[0].G_Code;
                this.GroupArraydata.Status = GroupData[0].G_Status;
                this.GroupArraydata.Action = 'U'
              }
             
            });
          }
          clear(){
            this.GroupArraydata.Action = 'A'
            this.GroupId = 0;
            this.GroupArraydata.Status = 'Y';
            this.GroupArraydata.GroupName ="";
            this.GroupArraydata.GropCode = '';
          }
          UpdateGroup(){
        
            const obj = {
              "ACTION":this.GroupArraydata.Action,
              "GID":this.GroupId , 
              "GNAME":this.GroupArraydata.GroupName, 
              "GCODE":this.GroupArraydata.GropCode, 
              "GSTATUS":this.GroupArraydata.Status
              }
              if(this.GroupArraydata.GroupName == ""){
                alert("Please Enter Group Name");
              }
              else 
              this.authService.AXELPostmethod('Group/GroupAction', obj).subscribe(x =>{
                if (x.status == 200) {
                  if (this.GroupArraydata.Action === 'U' && this.GroupId > 0 && this.GroupId != "") {
                    alert('Record updated successfully.');
                  } else if (this.GroupArraydata.Action === 'A')
                  alert('Record added successfully.');
                    this.GetGroupsData();
                    this.EditGroup = false;
                    this.GroupGrid = true;
                }
                else if (x.status == 401){alert('Record already exists.');}
                this.spinnerService.hide();
              });
          }

          DeleteGroup(Group_id, event){
            const obj = {
              "ACTION":event,
              "GID":Group_id , 
              "GNAME":this.GroupArraydata.GroupName, 
              "GCODE":this.GroupArraydata.GropCode, 
              "GSTATUS":this.GroupArraydata.Status
              }
             
              this.authService.AXELPostmethod('Group/GroupAction', obj).subscribe(x =>{
                if (x.status == 200) {
                 if (event === 'D')
                  alert('Deleted Successfully');
                    this.GetGroupsData();
                    this.EditGroup = false;
                    this.GroupGrid = true;
                }
              });
          

          }

      BackToGroupGrid(){
        this.EditGroup = false;
        this.GroupGrid = true;
      }


}
