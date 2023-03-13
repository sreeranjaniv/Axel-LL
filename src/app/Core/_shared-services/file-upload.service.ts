import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
// import { ApiService } from  '.././_providers/api-service/api.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../_providers/Api-service/api.service';
const AXELapiUrl = environment.AXELapiUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {



  constructor( private authService: ApiService,private http: HttpClient) { }

 ImportFromExcel(ExcelFile: File): Observable<any> {
  const formData = new FormData();
  formData.append("file", ExcelFile);
 return this.http.post(AXELapiUrl + 'Login/AccountCOAExcelFileUpload',formData, {
  // return this.http.post('http://axelapi.azaz.com/api/Login/AccountCOAExcelFileUpload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
    
 }
 errorMgmt(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}

}
