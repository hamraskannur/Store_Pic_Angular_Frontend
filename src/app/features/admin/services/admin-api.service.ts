import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  User } from 'src/app/core/models/interceptors';
@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http: HttpClient) {}
  private serverApi = 'http://34.203.242.181:3008/admin/';

  adminLogin = (formData: object): Observable<{message: string, status: Boolean,token:string}> => {
    return this.http.post<  {message: string, status: Boolean,token:string}>(`${this.serverApi}adminLogin`, formData);
  };

  getUsers = (): Observable<{message: string, status: Boolean,users:User[]}> => {
    return this.http.get<  {message: string, status: Boolean,users:User[]}>(`${this.serverApi}getUsers`);
  };
  blockUser = (userId:string): Observable<{message: string, status: Boolean}> => {
    return this.http.put<  {message: string, status: Boolean}>(`${this.serverApi}blockUser/${userId}`,{});
  };
  
}
