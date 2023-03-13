import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: 'Layout/Header', loadChildren: () => import('./Layout/header/header.module').then(m => m.HeaderModule) }, 
  { path: 'Layout/side-menu', loadChildren: () => import('./Layout/side-menu/side-menu.module').then(m => m.SideMenuModule) },
  { path: 'Partials/global-variables', loadChildren: () => import('./Partials/global-variables/global-variables.module').then(m => m.GlobalVariablesModule) },
  { path: '404Error', loadChildren: () => import('./Features/PageNotFound/page-not-found404/page-not-found404.module').then(m => m.PageNotFound404Module) },
  { path: 'Admin/Modules', loadChildren: () => import('./Features/Admin/admin-modules/admin-modules.module').then(m => m.AdminModulesModule) },
  // { path: 'SalesServiceOverview', loadChildren: () => import('./Features/sales-service-overview/sales-service-overview.module').then(m => m.SalesServiceOverviewModule) },
  { path: 'Admin/Permissions', loadChildren: () => import('./Features/Admin/permissions/permissions.module').then(m => m.PermissionsModule) },
  { path: 'SalesOverview', loadChildren: () => import('./Features/Sales/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'InventoryOverview', loadChildren: () => import('./Features/Inventory/vauto-inventory/vauto-inventory.module').then(m => m.VautoInventoryModule) },
  { path: 'FinancialSummary', loadChildren: () => import('./Features/Finance/financial-summary-report/financial-summary-report.module').then(m => m.FinancialSummaryReportModule) },
  { path: 'Admin/Roles', loadChildren: () => import('./Features/Admin/roles/roles.module').then(m => m.RolesModule) },
  { path: 'NightlyReportSales', loadChildren: () => import('./Features/Sales/Nightly/sales-report/sales-report.module').then(m => m.SalesReportModule) },
  { path: '401Error', loadChildren: () => import('./Features/PageNotFound/page-not-found401/page-not-found401.module').then(m => m.PageNotFound401Module) },
  { path: 'InventoryData', loadChildren: () => import('./Features/Inventory/vauto-data-query/vauto-data-query.module').then(m => m.VAutoDataQueryModule) },
  { path: 'SalesServiceOverview', loadChildren: () => import('./Features/Service-Parts/sales-service-overview/sales-service-overview.module').then(m => m.SalesServiceOverviewModule) },
 { path: 'ServiceSalesClosed', loadChildren: () => import('./Features/Service-Parts/service-sales-closed/service-sales-closed.module').then(m => m.ServiceSalesClosedModule) },
 { path: 'SAGReport', loadChildren: () => import('./Features/Service-Appointments/sag/sag.module').then(m => m.SAGModule) },
  { path: 'ServiceAppointments', loadChildren: () => import('./Features/Service-Appointments/maloney-report/maloney-report.module').then(m => m.MaloneyReportModule) },
  { path: 'KioskReport', loadChildren: () => import('./Features/Service-Appointments/kiosk-report/kiosk-report.module').then(m => m.KioskReportModule) },
  { path: 'FinancialBudgetVariables', loadChildren: () => import('./Features/Finance/financial-budget-variables/financial-budget-variables.module').then(m => m.FinancialBudgetVariablesModule) },
  { path: 'Groups', loadChildren: () => import('./Features/Settings/groups/groups.module').then(m => m.GroupsModule) },
  { path: 'GroupsStores', loadChildren: () => import('./Features/Settings/groups-stores/groups-stores.module').then(m => m.GroupsStoresModule) },
  { path: 'StoreBrands', loadChildren: () => import('./Features/Settings/store-brands/store-brands.module').then(m => m.StoreBrandsModule) },
  { path: 'DataDictionary', loadChildren: () => import('./Features/Settings/data-dictionary/data-dictionary.module').then(m => m.DataDictionaryModule) },
  { path: 'ChromeData', loadChildren: () => import('./Features/Settings/chrome-data/chrome-data.module').then(m => m.ChromeDataModule) },
  { path: 'Stores', loadChildren: () => import('./Features/Settings/stores/stores.module').then(m => m.StoresModule) },
  { path: 'InvRawData', loadChildren: () => import('./Features/RawData/inventory-raw-data/inventory-raw-data.module').then(m => m.InventoryRawDataModule) },
  { path: 'KioskScreenDesigns', loadChildren: () => import('./Features/Service-Appointments/kiosk-screen-designs/kiosk-screen-designs.module').then(m => m.KioskScreenDesignsModule) },
  { path: 'AppointmentCheckIns', loadChildren: () => import('./Features/Service-Appointments/appointment-check-in/appointment-check-in.module').then(m => m.AppointmentCheckInModule) },
  { path: 'AccountsCOA', loadChildren: () => import('./Features/GL-Accounts/accounts-coa/accounts-coa.module').then(m => m.AccountsCoaModule) },
  { path: 'NightlySummaryVariables', loadChildren: () => import('./Features/RawData/nightly-summary-variables/nightly-summary-variables.module').then(m => m.NightlySummaryVariablesModule) },
  { path: 'AxelIVR', loadChildren: () => import('./Features/RawData/powered-by-axel-ivr/powered-by-axel-ivr.module').then(m => m.PoweredByAxelIVRModule) },
  { path: 'AxelICO', loadChildren: () => import('./Features/RawData/powered-by-axel-ico/powered-by-axel-ico.module').then(m => m.PoweredByAxelICOModule) },
  { path: 'AxelTestIVR', loadChildren: () => import('./Features/RawData/powered-by-axel-test-ivr/powered-by-axel-test-ivr.module').then(m => m.PoweredByAxelTestIVRModule) },
  { path: 'VehiclePurchase', loadChildren: () => import('./Features/RawData/vehicle-purchase/vehicle-purchase.module').then(m => m.VehiclePurchaseModule) },
  { path: 'IncidentReport', loadChildren: () => import('./Features/RawData/incident-form/incident-form.module').then(m => m.IncidentFormModule) },
  { path: 'IncidentData', loadChildren: () => import('./Features/RawData/incident-form-data/incident-form-data.module').then(m => m.IncidentFormDataModule) },
  { path: 'ResidualCalculator', loadChildren: () => import('./Features/Calculator/residual-calculator/residual-calculator.module').then(m => m.ResidualCalculatorModule) },
  { path: 'Admin/Users', loadChildren: () => import('./Features/Admin/users/users.module').then(m => m.UsersModule) },
  { path: 'UploadAccountCOA', loadChildren: () => import('./Features/Admin/upload-account-coa/upload-account-coa.module').then(m => m.UploadAccountCOAModule) },
  { path: 'ServiceContractForm', loadChildren: () => import('./Features/service-contract-form/service-contract-form.module').then(m => m.ServiceContractFormModule) },
  { path: 'Dashboard', loadChildren: () => import('./Features/Dashboard/welcomepage/welcomepage.module').then(m => m.WelcomepageModule) },
  { path: 'UserAuthentication/:Name', loadChildren: () => import('./Layout/denied-access/denied-access.module').then(m => m.DeniedAccessModule) },
  { path: 'Default', loadChildren: () => import('./Layout/default-page/default-page.module').then(m => m.DefaultPageModule) },
  
  //{ path: 'AppointmentCheckIns', loadChildren: () => import('./Features/Service-Appointments/appoinntment-check-in/appoinntment-check-in.module').then(m => m.AppoinntmentCheckInModule) },
  
  {
    path: '**',
    redirectTo: '401Error',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
