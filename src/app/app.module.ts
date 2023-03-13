import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA,ModuleWithProviders  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  {SideMenuComponent} from './Layout/side-menu/side-menu.component'
import {FeaturesModule} from  './Features/Features.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import {ExcelService} from './Core/_providers/Excel-service/excel.service';
import { NgxCaptureModule } from 'ngx-capture';
import { NgxCaptureService } from "ngx-capture";
import { TextMaskModule } from 'angular2-text-mask';
import {DatePipe} from '@angular/common';
import { NgxHttpLoaderModule } from 'ngx-http-loader';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import  { GlobalVariablesComponent} from './Partials/global-variables/global-variables.component';
//import { PageNotFound401Module } from './Features/PageNotFound/page-not-found401/page-not-found401.module';
//import { PageNotFound404Module } from './Features/PageNotFound/page-not-found404/page-not-found404.module';
import { TreeviewModule } from 'ngx-treeview';
//import { GestureConfig } from "@angular/material";
import  { DefaultPageComponent} from './Layout/default-page/default-page.component';
import  { DeniedAccessComponent} from './Layout/denied-access/denied-access.component';



// import {ModuleWithProviders, NgModule} from '@angular/core';
@NgModule({
  declarations: [
    AppComponent,  
    SideMenuComponent,   
    GlobalVariablesComponent,   
    DefaultPageComponent,
    DeniedAccessComponent
  ],
  imports: [
    NgxCaptureModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,        
    FeaturesModule,
    HttpClientModule,   
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgxHttpLoaderModule.forRoot(),
    NgbModule,
    ChartsModule,
    NgxSpinnerModule

   // TreeviewModule.forRoot(),
  ],

  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
providers:[GlobalVariablesComponent,NgxCaptureService,DatePipe,NgbActiveModal,ExcelService],
exports:[NgxSpinnerModule]
})

export class AppModule { 
  
}
