import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from '../../../Core/_providers/Api-service/api.service';

import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { environment } from 'src/environments/environment';
// import {environment} from '../../environments/environment'
import * as $ from 'jquery'
@Component({
  selector: 'app-admin-modules',
  templateUrl: './admin-modules.component.html',
  styleUrls: ['./admin-modules.component.scss']
})
export class AdminModulesComponent implements OnInit {

  AdminGrid:boolean;
  AddAdmin:boolean;
  AddSubMod:boolean;
  SubModGrid:boolean;
  SubModStatus:boolean;
  AdminStatus:boolean;
  
  submitted=false;
  
  AdminData:any=[];
  SubModData:any=[];
  
  AdminModuleForm: FormGroup;
  SubModuleForm:FormGroup
  fileinput:any;
  fileData: File = null;
  previewUrl: any = null;
  uploadedFileName: any;
  AdminImage: any;
  
  Imagepath = `${environment.AXELapiUrl}`+'resources/images/';
  
  
   
    constructor(private spinnerService: Ng4LoadingSpinnerService,
       private authService: ApiService, 
       private router: Router,
       private fb: FormBuilder
       ) {
      this.AdminModuleForm = this.fb.group({
        mod_id: [''],
        mod_name: ['', [Validators.required, Validators.maxLength(100)]],
        mod_seq: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(5)]],
      //  mod_admin: ['Y', [Validators.required]],
      //  mod_front: ['N', [Validators.required]],
        mod_status: ['Y'],
        mod_image: [''],
        avatar: [null]
      });
  
      
      this.SubModuleForm = this.fb.group({
        smod_id:[''],
        smod_name: ['', [Validators.required, Validators.maxLength(50)]],
        smod_filename: ['', [Validators.required]],
        smod_seq: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(5)]],
        smod_active: ['Y']    
  
      })
     }
  
    ngOnInit() {
      this.AdminGrid=true;
   this.AdminList()
    }
  AdminList(){
    const obj = {
      "ID": 0,
    } 
    this.authService.AXELPostmethod('Login/get',obj).subscribe( (resp:any) => {
      // console.log(resp)
      if(resp.status==200){
        this.AdminData=resp.response
        this.AdminData = this.AdminData.filter(item=>item.MOD_STATUS!= 'D');
  
      }
    });
  }
  
  SubModList(){
    const obj = {
      
        "MODID" :this.AdminModuleForm.value.mod_id,  
        "SUBID"  :0,
        "EXPRESSION":""
  
    } 
    // console.log(obj)
    this.authService.AXELPostmethod('Login/GetSubAdminModule',obj).subscribe( (resp:any) => {
      if(resp.status==200){
        this.SubModData=resp.response.recordset
        // console.log(this.SubModData)
      }
    });
  }
    AdminAdd(){
      this.AdminGrid=false;
      this.AddAdmin=true;
      this.AddSubMod=false;
      this.SubModGrid=false;
      this.AdminStatus=false;;
  
    }
    SubModAdd(){
      this.AdminGrid=false;
      this.AddAdmin=false;
      this.AddSubMod=true;
      this.SubModGrid=false;
      this.SubModStatus=false;
      // this.SubModuleForm.controls.smod_Id.reset("");
      // this.SubModuleForm.controls.smod_name.reset("");
      // this.SubModuleForm.controls.smod_filename.reset("");
      // this.SubModuleForm.controls.smod_seq.reset("");
  
  
    }
    BackTOAdminGrid(){
      this.AdminGrid=true;
      this.AddAdmin=false;
      this.AddSubMod=false;
      this.SubModGrid=false;
      this.submitted=false;
      this.AdminModuleForm.controls.mod_name.reset("");
      this.AdminModuleForm.controls.mod_seq.reset("");
      this.AdminModuleForm.controls.mod_id.reset("");
      this.clear();
  
  
    }
    BackToSubModGrid(){
     
      this.AdminGrid=false;
      this.AddAdmin=true;
      this.SubModGrid=true;
      this.AddSubMod=false;
      this.SubModList();
      $("#SubModGrid").show();
      $("#SubModGrid").css("display", "none"); 
      this.SubModuleForm.reset()
      this.submitted=false;
      if(this.fileinput!=''){
       this.processFile(this.fileinput)
      }
   
    }
  
    clear(){
      this.fileinput=''
      this.uploadedFileName=''
      this.previewUrl=''
      this.AdminImage=''
    }
    EditAdmin(val){
      //  console.log(val)
  
       this.AdminGrid=false;
       this.AddAdmin=true;
       this.AddSubMod=false;
       this.SubModGrid=true;
       this.AdminStatus=true;
       this.AdminModuleForm=this.fb.group({​​​​​​​​
        mod_id: [val.MOD_ID],
        mod_name: [val.MOD_NAME, [Validators.required, Validators.maxLength(50)]],
        mod_seq: [val.MOD_SEQ, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(5)]],
    //  mod_admin : [val.MOD_ADMIN,[Validators.required]],
    //  mod_front: [val.MOD_FRONT, [Validators.required]],
        mod_status: [val.MOD_STATUS],
        mod_image: [val.MOD_PATH] ,
      
                }​​​​​​​​)
      // console.log(this.AdminModuleForm.value)
                if(val.mod_image!='' && val.mod_image!=undefined){
                  this.AdminImage=val.mod_image;
                  this.previewUrl=this.Imagepath+val.mod_image;
                }            
                this.SubModList();
     
    }
  
    EditSubMod(val){
      // console.log(val)
      this.AdminGrid=false;
      this.AddAdmin=false;
      this.AddSubMod=true;
      this.SubModGrid=false;
      this.SubModStatus=true;
      // this.SubModuleForm = this.fb.group({
  
      //   smod_name: [val.smod_name, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      //   smod_filename: [val.smod_filename, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      //   smod_seq: [val.smod_seq, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(5)]],
      //   smod_active: [val.smod_active]    
  
      // })
       this.SubModuleForm = this.fb.group({
        smod_id:[val.SMOD_ID],
        smod_name: [val.SMOD_NAME, [Validators.required, Validators.maxLength(50)]],
        smod_filename: [val.SMOD_FILENAME, [Validators.required]],
        smod_seq: [val.SMOD_SEQ, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(5)]],
        smod_active: [val.SMOD_ACTIVE]    
  
      })
    }
  
    public processFile(fileInput: any): void {
      // console.log(fileInput)
      this.fileinput=fileInput
      this.fileData = <File>fileInput.target.files[0];
      this.uploadedFileName = <File>fileInput.target.files[0].name;
      // console.log('file upload', this.uploadedFileName);
      // console.log(this.fileData)
      const file = (fileInput.target as HTMLInputElement).files[0];
      this.AdminModuleForm.patchValue({
        avatar: file
      });
  
   //   this.AdminModuleForm.get('avatar').updateValueAndValidity();
      this.preview();
    }
  
    public preview(): void {
      // Show preview
      const mimeType = this.fileData.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (_event) => {
        this.previewUrl = reader.result;
      };
    }
    HandleAdminStatus(evt) {
      let target = evt.target;
      if (target.checked) {
      this.AdminModuleForm.value.mod_status = 'Y';
      } else {
      this.AdminModuleForm.value.mod_status = 'N';
      }
      }
    AdminSaving(){
      this.submitted = true;
      if (this.AdminModuleForm.invalid) {
            return;
      }
      else{
        if(this.AdminModuleForm.value.mod_id=='' || this.AdminModuleForm.value.mod_id==null){
        // alert('Post')
          const fd = new FormData();
          // console.log(this.uploadedFileName,this.fileData,
          //   this.AdminModuleForm.value.mod_name,
          //   this.AdminModuleForm.value.mod_seq,
          //   this.AdminModuleForm.value.mod_admin,
          //   this.AdminModuleForm.value.mod_front,
          //   this.AdminModuleForm.value.mod_status)
            fd.append('MOD_ID', this.AdminModuleForm.value.mod_id)
            fd.append('MOD_SEQ', this.AdminModuleForm.value.mod_seq)
            fd.append('MOD_NAME', this.AdminModuleForm.value.mod_name)
            fd.append('MOD_PATH', this.fileData)
            fd.append('MOD_STATUS', this.AdminModuleForm.value.mod_status)
            fd.append('MOD_UID', '1')
            fd.append('MOD_ADMIN', 'Y')
           fd.append('MOD_FRONT','N')
            // console.log(fd)
              this.authService.AXELPostmethod('Login/AddAdminModule',fd).subscribe( (resp:any) => {
            //  console.log(resp)          
              if (resp.status == 200) {
                alert('Admin Module Added successfully')
               this.BackTOAdminGrid()
               this.AdminList()
              }
             else{
                 alert(resp.status+ 'Please Check Details')
                     }   
          });      
  
        }
     else{
          //  alert('put')
          //  console.log(this.AdminModuleForm.value.mod_id,
            // this.AdminImage,
            // this.uploadedFileName,
            // this.AdminModuleForm.value.mod_name,
            // this.AdminModuleForm.value.mod_seq,
            // this.AdminModuleForm.value.mod_admin,
            // this.AdminModuleForm.value.mod_front,
            // this.AdminModuleForm.value.mod_status)
           const fd: any = new FormData();
           if (this.uploadedFileName == '' || this.uploadedFileName == undefined) {
            // console.log(this.uploadedFileName);
            this.AdminImage = this.AdminModuleForm.value.mod_image;
            // console.log(this.AdminImage);
            this.fileData = null;
            // console.log(this.fileData);
          }
          // else {
          //   console.log(this.fileData);
          // }
      
          fd.append('MOD_ID', this.AdminModuleForm.value.mod_id)    
          fd.append('MOD_SEQ', this.AdminModuleForm.value.mod_seq)
          fd.append('MOD_NAME', this.AdminModuleForm.value.mod_name)
          fd.append('MOD_PATH', this.AdminImage)
          fd.append('MOD_STATUS', this.AdminModuleForm.value.mod_status)
          fd.append('MOD_UID', '1')
          fd.append('MOD_ADMIN', 'Y')
          fd.append('MOD_FRONT', 'N')
      //    fd.append('MOD_PATH', this.fileData)
          
          // console.log(fd)
          this.authService.AXELPostmethod('Login/UpdateAdminModule',fd).subscribe( (resp:any) => {
            // console.log(resp)
            if (resp.status == 200) {
              alert('AdminModule Updated successfully'); 
              this.AdminList();
               this.BackTOAdminGrid()    
            }
            else {    
              alert(resp.status+'Please check the details');
            }
          });
         }
      }
    }
    HandleSubModStatus(evt) {
      let target = evt.target;
      if (target.checked) {
      this.SubModuleForm.value.smod_active = 'Y';
      } else {
      this.SubModuleForm.value.smod_active = 'N';
      }
      }
      AdminDelete(val){
        const obj = {    
          "MOD_ID":val
      } 
      this.authService.AXELDeletemethod(obj,'Login/DeleteAdminModule').subscribe( (resp:any) => {
        if(resp.status==200){
        alert('AdminModule Deleted Successfully')
        this.AdminList()
        }
      });
      }
    SubModSaving(){
      this.submitted = true;
      if (this.SubModuleForm.invalid) {
            return;
      }
      else{
        // console.log(this.SubModuleForm.value)
        if(this.SubModuleForm.value.smod_id=='' || this.SubModuleForm.value.smod_id==null){
          // alert('Post')
          const obj = {
            SMOD_MOD_ID: this.AdminModuleForm.value.mod_id,
            SMOD_NAME: this.SubModuleForm.value.smod_name,
            SMOD_FILENAME: this.SubModuleForm.value.smod_filename,
            SMOD_SEQ: this.SubModuleForm.value.smod_seq,
            SMOD_ACTIVE: this.SubModuleForm.value.smod_active,
          }
        //  console.log(obj)
         this.authService.AXELPostmethod('Login/AddAdminSubModule',obj).subscribe( (resp:any) => {
          if (resp.status == 200) {
            alert('SubModule Added successfully');
            this.SubModList();
            this.BackToSubModGrid();
          }
          else {  
            alert('Please check the details');
            
          }
        });
        }
     else{
          //  alert('put')
           const obj = {
            SMOD_ID:this.SubModuleForm.value.smod_id,   
            SMOD_MOD_ID: this.AdminModuleForm.value.mod_id,
            SMOD_NAME: this.SubModuleForm.value.smod_name,
              SMOD_FILENAME: this.SubModuleForm.value.smod_filename,
              SMOD_SEQ: this.SubModuleForm.value.smod_seq,
              SMOD_ACTIVE: this.SubModuleForm.value.smod_active,
            }
          //  console.log(obj)
           this.authService.AXELPostmethod('Login/UpdateAdminSubModule',obj).subscribe( (resp:any) => {
            if (resp.status == 200) {
              alert('SubModule Updated successfully');
              this.SubModList()
              this.BackToSubModGrid();
            }
            else {  
              alert('Please check the details');
            }
          });
         }
      }
    }
    SubModDelete(val){
      const obj = {    
        "SMOD_ID":val.SMOD_ID,   
        "SMOD_MOD_ID": val.SMOD_MOD_ID,
        "SMOD_NAME": val.SMOD_NAME,
          "SMOD_FILENAME": val.SMOD_FILENAME,
          "SMOD_SEQ": val.SMOD_SEQ,
          "SMOD_ACTIVE": val.SMOD_ACTIVE,
    } 
    this.authService.AXELDeletemethod(obj,'Login/DeleteAdminSubModule').subscribe( (resp:any) => {
      if(resp.status==200){
      alert('SubModule Deleted Successfully')
      this.SubModList()
      }
    });
    }
  
  
  
  }
  