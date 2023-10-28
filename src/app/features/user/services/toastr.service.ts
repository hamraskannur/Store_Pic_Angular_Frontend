import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrCallService {

  constructor(private toastr: ToastrService) {}

  showSuccess(message: string) {      
    this.toastr.success(message, 'Success', {
      timeOut: 3000,
      toastClass: 'custom-toast',
      tapToDismiss: true
    });
  }

showError(message: string) {
  this.toastr.error(message, 'Error', {
    timeOut: 3000,
    tapToDismiss: true, 
    toastClass: 'errCustom-toast',
  });
}}
