import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private router: Router) { }
  handleError(error: any): void {
    if (error.status === 404) {
        this.router.navigate(['/404']); 
      } else if (error.status === 500) {
        this.router.navigate(['/500']); 
      }else if (error.status === 502) {
        this.router.navigate(['/502']); 
      } else if(error.status ===401){
        localStorage.clear();
        this.router.navigate(['/login']); 
    } else{
        this.router.navigate(['/error']); 
      }
  }
}
