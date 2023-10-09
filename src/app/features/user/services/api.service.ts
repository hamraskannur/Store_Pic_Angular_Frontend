import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {AuthResponse} from "../../../core/interceptors/interceptors"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  private serverApi = 'http://localhost:3008/';

  userSignup=(formData:object):Observable<AuthResponse>=>{
    return this.http.post<AuthResponse>(
      `${this.serverApi}userSingup`,
      formData
    );
  }

  userLogin=(formData:object):Observable<AuthResponse>=>{
    return this.http.post<AuthResponse>(
      `${this.serverApi}userLogin`,
      formData
    );
  }

}
