import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';



const headersData = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) };


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  CoraCodes = new BehaviorSubject('');
  RoleId = new BehaviorSubject(0);//0 is the initial value. 
  Default_Rolebased_Pagename = new BehaviorSubject('');
  sideMenuCount = new BehaviorSubject(0);
  g_SideMenu = new BehaviorSubject([]);
  FullSideMenu = new BehaviorSubject([]);
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  FBV_StoreID = new BehaviorSubject(0);
  token: any = '';
  constructor(private http: HttpClient) { }

  // Postmethod(endpoint: string, obj: object): Observable<any> {
  //   return this.http.post(`${environment.ApiUrl}${endpoint}`, obj)
  //   .pipe(map(
  //     (res: any) => {
  //     return res;
  //   }));
  //   }
  AXELPostmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.post(`${environment.AXELapiUrl}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
          return res;
        }));
  }
  DMSpostmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.post(`${environment.DMSapiUrl}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
          return res;
        }));
  }
  AXELPutmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.put(`${environment.AXELapiUrl}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
          return res;
        }));
  }
  AXELDeletemethod(obj, modname) {
    return this.http.request('delete', `${environment.AXELapiUrl}` + modname, { body: obj });
  }
  private httpheader() {
    this.token = localStorage.getItem("token");
    let httpOptions: any;
    if (this.token != null) {
      return httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          'access-token': this.token,
        })
      }
    }
  }
  INTERNALPostmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.post(`${environment.InternalAPI}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
          return res;
        }));
  }


//Schedule Tracking

StoreId = new BehaviorSubject('');
SDate = new BehaviorSubject('');

getstoreID(): Observable<any> {
  return this.StoreId.asObservable();
}

getSDate(): Observable<any>{
  return this.SDate.asObservable();
}

setstoreID(Store: any,SDate:any) {
  this.StoreId.next(Store);
  this.SDate.next(SDate);
}

  ELeadsBulk(url: string, FromDate:string,ToDate:string,DMS_ID:any,DS_ID:any,DST_ID:any):Observable<any>{

    const options = {   
     params: new HttpParams().append('DateFrom',FromDate)   
                              .append('DateTo',ToDate)   
                              .append('DMS_ID',DMS_ID)   
                               .append('DS_ID',DS_ID)   
                               .append('DST_ID',DST_ID)   
           }
   
      return this.http.get<any>(`${environment.USerDataApiUrl}${url}`,options);      
   
   }
  //PowerBY_Axel
  GetIVR(url: string, obj) {
    // return this.http.post('http://swickardapi.axelautomotive.com/api/PoweredbyAXEL/GetPoweredbyAxelIVRData',obj);
    return this.http.post(`${environment.PoweredByAxel_Url}${url}`, obj, this.httpheader());
  }
  StatusUpdate(url: string, obj) {
    return this.http.put(`${environment.PoweredByAxel_Url}${url}`, obj, this.httpheader());
  }
 
  ICOUpdate(url: string,obj: object) {
    // return this.http.put('http://api.poweredbyaxel.com/api/ico',obj,this.httpOptionImageSave())
    return this.http.put(`${environment.PoweredByAxel_Url}${url}`,obj,this.httpOptionImageSave())
  }
  private httpOptionImageSave() {
    this.token = localStorage.getItem("token");
    let httpOptionsForImage: any;
    if (this.token != null) {
      return httpOptionsForImage = {
        headers: new HttpHeaders({
          "Accept": "*/*",
          'access-token': this.token,
        })
      }
    }
  }
// IVR Delete

IVRDelete(url:string,obj){
  this.token = localStorage.getItem("token");
  const options = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      'access-token': this.token,
    }),
    body:{
      id:obj
    }
  }
  console.log("header", options);
   return this.http.delete(`${environment.PoweredByAxel_Url}${url}`,options);
}

  StoresCode(url: string) {
    return this.http.get(`${environment.PoweredByAxel_Url}${url}`, this.httpheader());
  }

ICODelete(url:string,obj)
{ this.token = localStorage.getItem("token");
 const options = {
   headers: new HttpHeaders({ "Content-Type": "application/json",'access-token': this.token, }),
       body:{id:obj } }
       // console.log("header", options)
    return this.http.delete(`${environment.PoweredByAxel_Url}${url}`,options);}

// --start here
TestSigninICO(url: string){
  const obj={
    "email":"icodev",
    "password": "1234"
  }
  return this.http.post(`${environment.PoweredByAxel_devUrl}${url}`,obj)
}
TestICOUpdate(url: string,obj: object) {
  return this.http.put(`${environment.PoweredByAxel_devUrl}${url}`,obj,this.httpOptionImageSave())
}
TestICODelete(url:string,obj){
  this.token = localStorage.getItem("token");
  const options = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      'access-token': this.token,
    }),
    body:{
      id:obj
    }
  }
  console.log("header", options)
   return this.http.delete(`${environment.PoweredByAxel_devUrl}${url}`,options);
}
//Test ICO End


    //IVR Signin
SigninIVR(url: string){
  const obj={
    "email":"ivrprod",
    "password": "1234"
  }
  return this.http.post(`${environment.PoweredByAxel_Url}${url}`,obj)
}
//ICO Signin
SigninICO(url: string){
  const obj={
    "email":"icoprod",
    "password": "1234"
  }
  return this.http.post(`${environment.PoweredByAxel_Url}${url}`,obj)
}

//start here PoweredByAxel --- Test IVR
TestGetIVR(url: string,obj){
    return this.http.post(`${environment.PoweredByAxel_devUrl}${url}`,obj,this.httpheader());
  }
  TestStatusUpdate(url: string,obj){
    return this.http.put(`${environment.PoweredByAxel_devUrl}${url}`,obj,this.httpheader());
  }
  TestSigninIVR(url: string){
    const obj={
      "email":"ivrdev",
      "password": "1234"
    }
    return this.http.post(`${environment.PoweredByAxel_devUrl}${url}`,obj)
  }
  TestStoresCode(url: string){
    return this.http.get(`${environment.PoweredByAxel_devUrl}${url}`,this.httpheader());
  }
  // //IVR Signin
  // Signin(url: string) {
  //   const obj = {
  //     "email": "guest",
  //     "password": "1234"
  //   }
  //   return this.http.post(`${environment.PoweredByAxel_Url}${url}`, obj)
  // }
  getCoraVals(): Observable<any> {
    return this.CoraCodes.asObservable();
  }

  setCoraVals(Codes: any) {
    this.CoraCodes.next(Codes);
  }


  // ELeads Employee data
  getPositionList(obj: any) {
    return this.http.post('http://mwapi.axelautomotive.com/api/OpprtunityData/GetCompanyPositionsData', obj)
  }
  getEmployeeData(obj: any) {
    return this.http.post('http://mwapi.axelautomotive.com/api/OpprtunityData/GetCompanyEmployeesData', obj)
  }


  getRoleID(): Observable<any> {
    return this.RoleId.asObservable();
    // console.log("Get", this.RoleId);
  }
  setRoleID(Codes: any) {
    this.RoleId.next(Codes);
    // console.log("Set", this.RoleId);
  }

  getPageName(): Observable<any> {
    return this.Default_Rolebased_Pagename.asObservable();
  }
  setPagename(Pagename: any) {
    this.Default_Rolebased_Pagename.next(Pagename);
  }

  getSidemenuItemCount(): Observable<any> {
    return this.sideMenuCount.asObservable();
  }
  setSidemenuItemCount(Pagename: any) {
    this.sideMenuCount.next(Pagename);
  }
  getSideMenu(): Observable<any> {
    return this.g_SideMenu.asObservable();
  }
  setSideMenu(Sidemenu_list: any) {
    this.g_SideMenu.next(Sidemenu_list);
  }
  getFullSideMenu(): Observable<any> {
    return this.FullSideMenu.asObservable();
  }
  setFullSideMenu(FullSidemenu_list: any) {
    this.FullSideMenu.next(FullSidemenu_list);
  }
  postmethod(url: string, obj: object): Observable<any> {

    return this.http.post(`${environment.CustomerSwickardUrl}${url}`, obj)

      .pipe(map(

        (res: Response) => {

          return res;

        }));

  }

  TouchXpressPostmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.post(`${environment.TouchXpressApiUrl}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
          return res;
        }));
  }
  setFinanceBudgetVariable_StoreID(storeID: number) {
    this.FBV_StoreID.next(storeID);
  }
  getFinanceBudgetVariable_StoreID(): Observable<number> {
    return this.FBV_StoreID.asObservable();
  }
  
}
