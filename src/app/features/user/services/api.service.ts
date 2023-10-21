import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent } from '@angular/common/http';

import { AuthResponse, Image, User } from '../../../core/models/interceptors';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private serverApi = 'http://localhost:3008/';

  userSignup = (formData: object): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(
      `${this.serverApi}userSingup`,
      formData
    );
  };

  userLogin = (formData: object): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(`${this.serverApi}userLogin`, formData);
  };

  getUser = (): Observable<{ success: boolean; message: string; user: User }> => {
    return this.http.get<{ success: boolean; message: string; user: User }>(`${this.serverApi}getUser`);
  };

  uploadImage=(formData:FormData): Observable<HttpEvent<{ success: boolean,image:Image, message: string }>> => {
    return this.http.post<{ success: boolean,image:Image , message: string }>(`${this.serverApi}upload`, formData, {reportProgress: true,observe: 'events'})
  };

  getImages=(): Observable<{ success: boolean; message: string ,images:Image[]}> => {
    return this.http.get<{ success: boolean; message: string ,images:Image[]}>(`${this.serverApi}getAllImages`)
  };
  getOneImages=(ImageId:string): Observable<{ success: boolean; message: string ,image:Image}> => {
    return this.http.get<{ success: boolean; message: string ,image:Image}>(`${this.serverApi}getOneImages/${ImageId}`)
  };

  deleteImage=(ImageId:string): Observable<{ success: boolean; message: string }> => {
    return this.http.delete<{ success: boolean; message: string }>(`${this.serverApi}deleteImage/${ImageId}`)
  };

  changeApi=(): Observable<{ success: boolean; message: string ,user:User}> => {
    return this.http.put<{ success: boolean; message: string ,user:User}>(`${this.serverApi}changeApi`, {})
  };

  

}
