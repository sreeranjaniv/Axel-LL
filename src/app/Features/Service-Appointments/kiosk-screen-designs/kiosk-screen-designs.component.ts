import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ApiService } from 'src/app/_providers/api-service/api.service';
import { ApiService } from 'src/app/Core/_providers/Api-service/api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { GlobalVariablesComponent } from 'src/app/global-variables/global-variables.component';
import { GlobalVariablesComponent } from 'src/app/Partials/global-variables/global-variables.component';
@Component({
  selector: 'app-kiosk-screen-designs',
  templateUrl: './kiosk-screen-designs.component.html',
  styleUrls: ['./kiosk-screen-designs.component.scss']
})
export class KioskScreenDesignsComponent implements OnInit {

 
  editor: any = "";
  AdminGrid: boolean;
  AddAdmin: boolean=false;
  AdminStatus: boolean;
  submitted = false;
  AdminData: any = [];
  ScreenDesignForm: FormGroup;
  fileinput: any;
  fileData: File = null;
  previewUrl: any = null;
  imagepopup: any = null;
  uploadedFileName: any;
  AdminImage: any;
  Imagepath = `${environment.TouchXpressApiUrl}` + 'v1/resources/images/';
  actionvariable: any;
  controls: any;
  screencomponents: any;
  component: any;
  componentval: any;
  controlval: any;
  editid: any;
  stores: any = [];
  storedefault: any;
  kioskdefault: any;
  searchstore: any;
  searchstoredata: any = [];
  selectedstore = '';
  storeselected: any;
  editsttore: any;
  kisok: any;
  controlstypes: any;
  controlselected: any;
  image: any;
  screennumber: any;
  selectedId='GTOY-A';
  defaultControl: any = 0
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: 'auto',
    translate: 'yes',
    sanitize: false,
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text  here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',

    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      ['undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull'
      ],
      [
        'backgroundColor',
        'customClasses',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ]
    ]
  };
  imageurl: any;
  headerImage : any;
  brandName : any;

  constructor(
    private spinner: Ng4LoadingSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private location:Location,
    private authService: ApiService,
    public globalVarComponent: GlobalVariablesComponent) {
    this.ScreenDesignForm = this.fb.group({
      kiosk_id: ['', [Validators.required]],
      stores: ['', [Validators.required]],
      screen_number: ['', [Validators.required, Validators.maxLength(100)]],
      control: ['', [Validators.required, Validators.maxLength(100)]],
      controltype: [''],
      component: ['', [Validators.required]],
      control_text: [''],
      control_color: [''],
      control_textcolor: [''],
      mod_seq: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(5)]],
      mod_status: ['Y'],
      mod_image: [''],
      avatar: [null]
    });
  }

  ngOnInit() {
    this.AdminGrid = true;
    this.Getcontrols();
    this.Getcontrolstypes('1');
    this.Getscreencomponents();
    this.getstores();
    this.storedefault = "0";
    this.kioskdefault = "0";
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";
  }


  AdminList(e) {
    this.spinner.show();
    const obj = {
      "kioskid": 1,
      "storeid": e,
      "screennumber": 1
    }
    this.authService.TouchXpressPostmethod('touch/GetTouchScreenDetails', obj).subscribe((resp: any) => {
      // // console.log(resp)
      if (resp.status == 200) {
        this.spinner.hide();
        this.AdminData = resp.response
        // // console.log(this.AdminData)
        this.AdminData.some(function (x: any) {
          // debugger;
          x.Details = JSON.parse(x.Details);
          return false;
        });
        // console.log(this.AdminData)
      }
    });
  }

  AdminAdd(action) {
    this.actionvariable = action
    this.AdminGrid = false;
    this.AddAdmin = true;
    this.ScreenDesignForm.controls.stores.setValue(this.selectedId);
    this.ScreenDesignForm.controls.stores.disable();
  }

  BackTOAdminGrid() {
    // // console.log(this.storedefault, this.kioskdefault)
    // if (this.searchstore != '') {
    //   this.AdminList(this.searchstore)
    //   this.searchstores(this.searchstore)
    //   this.kioskdefault = this.kisok
    //    this.getkisok(this.kisok)
    // }
    // else {
    //   this.searchstores("0");
    // }
    this.AdminGrid = true;
    this.AddAdmin = false;
    this.submitted = false;
    // this.ScreenDesignForm.controls.stores.reset("");
    this.ScreenDesignForm.controls.screen_number.reset("");
    this.ScreenDesignForm.controls.control_color.reset("");
    this.ScreenDesignForm.controls.control_textcolor.reset("");
    this.ScreenDesignForm.controls.component.reset("");
    this.ScreenDesignForm.controls.control_text.reset("");
    this.ScreenDesignForm.controls.control.reset("");
    this.ScreenDesignForm.controls.controltype.reset("");
    this.ScreenDesignForm.controls.mod_seq.reset("");
    this.ScreenDesignForm.controls.kiosk_id.reset("");
    this.clear();
  }

  clear() {
    this.fileinput = ''
    this.uploadedFileName = ''
    this.previewUrl = ''
    this.AdminImage = ''
  }

  EditAdmin(val, action, eid, item) {
    if(val.TC_ID != 0)
    {
    this.defaultControl =val.TC_ID;
    }
    else
    {
      this.defaultControl = 0;
    }
    // this.editsttore = val.K_STORE
    // // console.log(this.stores)
    this.editid = eid
    // // console.log(this.editid)
    this.actionvariable = action
    // // console.log(val);
    for (let i = 0; i < this.stores.length; i++) {
      if (val.K_STORE == this.stores[i].CORA_ACCT_CODE) {
        this.storeselected = this.stores[i].DEALER_NAME;
        // console.log(this.storeselected)
      }
    }
    this.AdminGrid = false;
    this.AddAdmin = true;
    this.AdminStatus = true;
    this.Getcontrolstypes(val.TC_ID);
    this.ScreenDesignForm = this.fb.group({
      id: this.editid,
      kiosk_id: [item.TSD_K_ID],
      stores: [{value: item.K_STORE, disabled: true}, [Validators.required]],
      screen_number: [item.TSD_SCREEN_NUMBER, [Validators.required, Validators.maxLength(50)]],
      control_color: [val.TSD_CONTROL_COLOR],
      control_textcolor: [val.TSD_CONTROL_TEXTCOLOR],
      component: [val.TSD_TSC_ID, [Validators.required]],
      control_text: [val.TSD_CONTROL_TEXT],
      control: [val.TSD_CT_TC_ID, [Validators.required]],
      controltype: [val.TSD_CT_TC_ID],
      mod_seq: [val.TSD_SEQ, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(5)]],
      mod_status: [val.TSD_STATUS == 'Y' ? true : false],
      mod_image: [val.TSD_IMAGE_URL],
    })
    this.editor = val.TSD_CONTROL_TEXT.replaceAll('<br>', '&lt; b  r &gt;')
    if (val.TSD_IMAGE_URL != '' && val.TSD_IMAGE_URL != undefined) {
      this.previewUrl = this.Imagepath + val.TSD_IMAGE_URL;
      this.imageurl=val.TSD_IMAGE_URL
    }
  }

  public processFile(fileInput: any): void {
    this.fileinput = fileInput
    this.fileData = <File>fileInput.target.files[0];
    this.uploadedFileName = <File>fileInput.target.files[0].name;
    const file = (fileInput.target as HTMLInputElement).files[0];
    this.ScreenDesignForm.patchValue({
      avatar: file
    });

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
 

  resetFileUploader(){
    this.imageurl=''
    this.fileData = null;
    this.previewUrl=null;
    this.fileinput = ''
    this.uploadedFileName = ''
    this.AdminImage = ''
  }

  

  AdminSaving() {

    this.submitted = true;
    if (this.ScreenDesignForm.value.controltype == null) {
      this.ScreenDesignForm.value.controltype = ''
    }
    if (this.ScreenDesignForm.invalid) {
      return;
    }
    else {
      this.spinner.show();
      if (this.actionvariable == 'A') {
        const fd: any = new FormData();
        fd.append('action', this.actionvariable),
          fd.append('id', ''),
          fd.append('k_id', this.ScreenDesignForm.value.kiosk_id),
          fd.append('screen_number', this.ScreenDesignForm.value.screen_number),
          fd.append('tsc_id', this.ScreenDesignForm.value.component),
          fd.append('tc_id', this.ScreenDesignForm.value.control),
          fd.append('ct_tc_id', this.ScreenDesignForm.value.controltype),
          fd.append('control_text', this.ScreenDesignForm.value.control_text.replaceAll('&lt; b  r &gt;', '<br>')),
          fd.append('control_color', this.ScreenDesignForm.value.control_color),
          fd.append('textcolor', this.ScreenDesignForm.value.control_textcolor)
          fd.append('seq', this.ScreenDesignForm.value.mod_seq),
          fd.append('status', this.ScreenDesignForm.value.mod_status == true?'Y':'N' ),
          fd.append('file', this.fileData),

        this.authService.TouchXpressPostmethod('touch/TouchScreenDetailsAction', fd).subscribe((resp: any) => {
          // console.log(resp)
          if (resp.status == 200) {
            this.spinner.hide();
            alert('Screen details added successfully.')
            this.submitted = false;
            this.ScreenDesignForm.controls.control_color.reset("");
            this.ScreenDesignForm.controls.control_textcolor.reset("");
            this.ScreenDesignForm.controls.component.reset("");
            this.ScreenDesignForm.controls.control_text.reset("");
            this.ScreenDesignForm.controls.control.reset("");
            this.ScreenDesignForm.controls.controltype.reset("");
            this.ScreenDesignForm.controls.mod_seq.reset("");
            this.clear();
            this.fileData = null
          }
          else {
            alert(resp.error)
          }
        });
      }
      else {
        this.ScreenDesignForm.value.control_text = this.ScreenDesignForm.value.control_text.replaceAll('&nbsp;', '')
        const fd: any = new FormData();
          fd.append('action', this.actionvariable),
          fd.append('id', this.editid),
          fd.append('k_id', this.ScreenDesignForm.value.kiosk_id),
          fd.append('screen_number', this.ScreenDesignForm.value.screen_number),
          fd.append('tsc_id', this.ScreenDesignForm.value.component),
          fd.append('tc_id', this.ScreenDesignForm.value.control),
          fd.append('ct_tc_id', this.ScreenDesignForm.value.controltype),
          fd.append('control_text', this.ScreenDesignForm.value.control_text.replaceAll('&lt; b  r &gt;', '<br>')),
          fd.append('control_color', this.ScreenDesignForm.value.control_color),
          fd.append('textcolor', this.ScreenDesignForm.value.control_textcolor)
          fd.append('seq', this.ScreenDesignForm.value.mod_seq),
          fd.append('status', this.ScreenDesignForm.value.mod_status== true?'Y':'N' )
          if (this.fileData != null) {
          fd.append('file', this.fileData)
          }
        else {
          // fd.append('file', this.previewUrl)
            fd.append('image_url', this.imageurl)
        }
        // fd.append('file', this.fileData) ,
        // // console.log(this.fileData, this.previewUrl);
        this.authService.TouchXpressPostmethod('touch/TouchScreenDetailsAction', fd).subscribe((resp: any) => {
          // // console.log(resp)
          if (resp.status == 200) {
            this.spinner.hide();
            alert('Screen Design Updated successfully');
            this.searchstores(this.storedefault)
            // this.AdminList();
            this.fileData = null
            this.previewUrl=null
            this.BackTOAdminGrid()
            this.kioskdefault = this.kisok
            this.getkisok(this.kisok)
          }
          else {
            alert(resp.error);
          }
        });
      }
    }
  }


  addbreak() {
    this.editor = this.editor + "<" + " b " + " r " + "> "
  }

// storedropdown
  getstores() {
    const obj = {
      "Id": 1
    }
    this.authService.TouchXpressPostmethod('touch/GetStores', obj).subscribe(res => {
      // // console.log(res);
      if (res.status == 200) {
        this.stores = res.response;
        this.storedefault=this.selectedId;
        this.searchstores(this.storedefault);
        // // console.log(this.stores);
      }
    });
  }
// select store
  searchstores(e) {
    this.searchstoredata = []
    this.kioskdefault = 0;
    this.searchstore = e;
    const obj = {
      "id": '',
      "store": this.searchstore,
    }
    this.authService.TouchXpressPostmethod('touch/GetKioskDetails', obj).subscribe((resp: any) => {
      // console.log(resp)
      if (resp.status == 200) {
        this.searchstoredata = resp.response
      }
    });
    if (this.searchstoredata.length == 0) {
      this.AdminData = '';
      this.kioskdefault = 0;
      // this.screennumber=0
    }

    if (this.searchstoredata.length != 0 &&  this.storedefault !=0 && this.kioskdefault==0) {
      this.AdminData = '';
      // this.kioskdefault = 0;
      // this.screennumber=0
    }
    // console.log(this.storedefault, this.kioskdefault)
    if (this.storedefault != '' && this.kioskdefault == 0) {
      this.AdminData = '';
      this.kioskdefault = 0;
    }
   
  //   if (this.storedefault == 0) {
  //     let data = ''
  //     // this.AdminList(data)
  //   }
  //   else {
  //     this.AdminList(this.searchstore)
  //   }
  //   // console.log(this.searchstore)
  //   if(this.storedefault != 0 && this.kioskdefault != 0){
  // }
  }
imageURl : any;
details: any = []

  getkisok(e) {
    this.spinner.show();
    // console.log(e)
    this.kisok = e
    const obj = {
      "kioskid": e,
      "storeid": this.storedefault,
      "screennumber": 1
    }
    this.authService.TouchXpressPostmethod('touch/GetTouchScreenDetails', obj).subscribe((resp: any) => {
      // // console.log(resp)
      if (resp.status == 200) {
        this.spinner.hide();
        this.AdminData = resp.response;
        console.log(this.AdminData);

        for(let i=0; i<this.AdminData.length; i++)
        {
           
              this.details.push(JSON.parse(this.AdminData[i].Details));
              // console.log(this.details);
        }

        for(let i=0; i<this.details.length; i++)
        {
          // console.log(this.details[i])      
          for(let j=0;j<this.details[i].length; j++)
          {
            if(this.details[i][j].TSD_IMAGE_URL != ""  && this.details[i][j].TSC_NAME == 'BG')
            {
              // console.log(this.details[i][j].TSD_IMAGE_URL);
              this.imageURl = this.details[i][j].TSD_IMAGE_URL
            }
            if(this.details[i][j].TSD_TSC_ID == 1 && this.details[i][j].TSD_CONTROL_TEXT == "")
            {
              this.headerImage = this.details[i][j].TSD_IMAGE_URL;

            }

            if(this.details[i][j].TSD_TSC_ID == 1 && this.details[i][j].TSD_CONTROL_TEXT != "Line")
            {
              this.brandName = this.details[i][j].TSD_CONTROL_TEXT;

            }
          }
        }
        
        this.AdminData.some(function (x: any) {
          // debugger;
          x.Details = JSON.parse(x.Details);
          // console.log(x.details);
          
          return false;
        });
        // this.AdminData = this.AdminData.filter(item=>item.MOD_STATUS!= 'D');
      }
    });
  }

  
  Getcontrols() {
    const obj = {
      "Id": 1
    }
    this.authService.TouchXpressPostmethod('touch/GetControls', obj).subscribe(res => {
      // // console.log(res);
      if (res.status == 200) {
        this.controls = res.response;
 console.log(this.controls);
      }
    });
  }

  Getcontrolstypes(e) {
    const obj = {
      "CT_TC_ID": e
    }
    this.authService.TouchXpressPostmethod('touch/GetControlTypes', obj).subscribe(res => {
    console.log(res);
      if (res.status == 200) {
        this.controlstypes = res.response;
        // // console.log(this.controlstypes);
      }
    });
  }

  Getscreencomponents() {
    const obj = {
      "Id": 1
    }
    this.authService.TouchXpressPostmethod('touch/GetScreenComponents', obj).subscribe(res => {
      // // console.log(res);
      if (res.status == 200) {
        this.screencomponents = res.response;
        // // console.log(this.screencomponents);
      }
    });
  }

  getcomponent(e) {
    // // console.log(e.target.value)
    this.componentval = e.target.value;
    // // console.log(this.componentval)
  }

  getcontrol(e) {
    // // console.log(e.target.value)
    this.controlval = e.target.value;
    this.Getcontrolstypes(this.controlval)
    // // console.log(this.controlval)
  }

  getcontroltype(e) {
    // console.log(e.target.value)
  }

  imageclick(e) {
    this.image = e
    this.imagepopup = this.Imagepath + e;
  }

  result : any =[]
  viewScreen(val)
  {
   this.result = val;  
  }

  PreviousUrl() {
    this.location.back();
  }

}
