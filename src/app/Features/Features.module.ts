import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './Features-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesComponent } from './Admin/roles/roles.component';
//import { HeaderComponent } from '../Layout/header/header.component';
import { DashboardComponent } from './Sales/dashboard/dashboard.component';
import { FinancialSummaryReportComponent } from './Finance/financial-summary-report/financial-summary-report.component';
import { PermissionsComponent } from './Admin/permissions/permissions.component';
import { VautoInventoryComponent } from './Inventory/vauto-inventory/vauto-inventory.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AdminModulesComponent } from './Admin/admin-modules/admin-modules.component';
import { NgxHttpLoaderModule } from 'ngx-http-loader';
// import {HeaderComponent} from '../Layout/header/header.component';
import { TextMaskModule } from 'angular2-text-mask';
import { SalesReportComponent } from './Sales/Nightly/sales-report/sales-report.component';

import { VAutoDataQueryComponent } from './Inventory/vauto-data-query/vauto-data-query.component';
import { SalesServiceOverviewComponent } from './Service-Parts/sales-service-overview/sales-service-overview.component';
import { HeaderComponent } from '../Layout/header/header.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { PageNotFound404Component } from './PageNotFound/page-not-found404/page-not-found404.component';
import { PageNotFound401Component } from './PageNotFound/page-not-found401/page-not-found401.component';
import { ServiceSalesClosedComponent } from './Service-Parts/service-sales-closed/service-sales-closed.component';
import { SAGComponent } from './Service-Appointments/sag/sag.component';
import { FiltersPopupComponent } from './filters-popup/filters-popup.component';
import { TreeviewModule } from 'ngx-treeview';
import { MaloneyReportComponent } from './Service-Appointments/maloney-report/maloney-report.component';
import { KioskReportComponent } from './Service-Appointments/kiosk-report/kiosk-report.component';
import { FinancialBudgetVariablesComponent } from './Finance/financial-budget-variables/financial-budget-variables.component';
import { GroupsComponent } from './Settings/groups/groups.component';
import { GroupsStoresComponent } from './Settings/groups-stores/groups-stores.component';
import { StoreBrandsComponent } from './Settings/store-brands/store-brands.component';
import { DataDictionaryComponent } from './Settings/data-dictionary/data-dictionary.component';
import { ChromeDataComponent } from './Settings/chrome-data/chrome-data.component';
import { StoresComponent } from './Settings/stores/stores.component';
import { InventoryRawDataComponent } from './RawData/inventory-raw-data/inventory-raw-data.component';
//import { AppoinntmentCheckInComponent } from './Service-Appointments/appoinntment-check-in/appoinntment-check-in.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ELeadsCustomersComponent } from './Eleads/eleads-customers/eleads-customers.component';
import { VehiclePurchaseComponent } from './RawData/vehicle-purchase/vehicle-purchase.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { GlobalVariablesModule } from '../Partials/global-variables/global-variables.module';
import { IncidentFormComponent } from './RawData/incident-form/incident-form.component';
import { IncidentFormDataComponent } from './RawData/incident-form-data/incident-form-data.component';
import { NightlySummaryVariablesComponent } from './RawData/nightly-summary-variables/nightly-summary-variables.component';
import { PoweredByAxelICOComponent } from './RawData/powered-by-axel-ico/powered-by-axel-ico.component';
import { PoweredByAxelIVRComponent } from './RawData/powered-by-axel-ivr/powered-by-axel-ivr.component';
import { PoweredByAxelTestIVRComponent } from './RawData/powered-by-axel-test-ivr/powered-by-axel-test-ivr.component';
import { EleadsOpportunityComponent } from './Eleads/eleads-opportunity/eleads-opportunity.component';
import { ELeadsHistorybyOpportunityComponent } from './Eleads/eleads-historyby-opportunity/eleads-historyby-opportunity.component';
import { PaylocityEmployeeComponent } from './Paylocity/paylocity-employee/paylocity-employee.component';
import { UploadAccountCOAComponent } from './Admin/upload-account-coa/upload-account-coa.component';
import { UsersComponent } from './Admin/users/users.component';
import { ResidualCalculatorComponent } from './Calculator/residual-calculator/residual-calculator.component';
import { AccountsCoaComponent } from './GL-Accounts/accounts-coa/accounts-coa.component';
import { AppointmentCheckInComponent } from './Service-Appointments/appointment-check-in/appointment-check-in.component';
import { KioskScreenDesignsComponent } from './Service-Appointments/kiosk-screen-designs/kiosk-screen-designs.component';
import { ServiceContractFormComponent } from './service-contract-form/service-contract-form.component';
import { WelcomepageComponent } from './Dashboard/welcomepage/welcomepage.component';
//import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatSliderModule } from '@angular/material';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    PageNotFound404Component,
    PageNotFound401Component,
    RolesComponent,
    AdminModulesComponent,
    DashboardComponent,
    FinancialSummaryReportComponent,
    PermissionsComponent,
    VautoInventoryComponent,
    VAutoDataQueryComponent,
    SalesReportComponent,
    ServiceContractFormComponent,
    SalesServiceOverviewComponent,
    HeaderComponent,
    ServiceSalesClosedComponent,
    SAGComponent,
    FiltersPopupComponent,
    MaloneyReportComponent,
    KioskReportComponent,
   // AppoinntmentCheckInComponent,
    FinancialBudgetVariablesComponent,
    GroupsComponent,
    GroupsStoresComponent,
    StoreBrandsComponent,
    DataDictionaryComponent,
    ChromeDataComponent,
    StoresComponent,
    InventoryRawDataComponent,
    VehiclePurchaseComponent,
    IncidentFormComponent,
    IncidentFormDataComponent,
    NightlySummaryVariablesComponent,
    PoweredByAxelICOComponent,
    PoweredByAxelIVRComponent,
    PoweredByAxelTestIVRComponent,
    ELeadsCustomersComponent,
    EleadsOpportunityComponent,
    ELeadsHistorybyOpportunityComponent,
    PaylocityEmployeeComponent,
    UploadAccountCOAComponent,
    UsersComponent,
    ResidualCalculatorComponent,
    AccountsCoaComponent,
    AppointmentCheckInComponent,
    KioskScreenDesignsComponent,
    WelcomepageComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule,
    TextMaskModule,
    NgxHttpLoaderModule,
    // Ng4LoadingSpinnerModule
    NgxSpinnerModule,
    TreeviewModule.forRoot(),
    NgbModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    GlobalVariablesModule,
    AngularEditorModule
    // BrowserAnimationsModule, 
    // MatDatepickerModule,
    // MatInputModule,
    // MatNativeDateModule,
    // MatFormFieldModule, 
    // MatSliderModule
 
  ],
})
export class FeaturesModule { }
