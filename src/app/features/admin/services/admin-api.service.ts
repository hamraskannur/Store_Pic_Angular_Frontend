import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, User } from 'src/app/core/models/interceptors';
@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http: HttpClient) {}
  private serverApi = 'http://localhost:3008/admin/';

  adminLogin = (formData: object): Observable<{message: string, status: Boolean,token:string}> => {
    return this.http.post<  {message: string, status: Boolean,token:string}>(`${this.serverApi}adminLogin`, formData);
  };
}
