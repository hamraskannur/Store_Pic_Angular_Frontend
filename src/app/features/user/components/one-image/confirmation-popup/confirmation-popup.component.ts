import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from 'src/app/core/models/interceptors';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css'],
})
export class ConfirmationPopupComponent {
  @Output() cancelDelete: EventEmitter<void> = new EventEmitter<void>();
  @Input() image?: Image;
  constructor(private ApiService: ApiService,private router: Router) {}

  deleteImage() {
    if(this.image){
      this.ApiService.deleteImage(this.image._id).subscribe(({success}:{ success: boolean; message: string })=>{
        if(success){
          this.router.navigate(['/']);
        }
      })
    }
  }

  cancelImage() {
    this.cancelDelete.emit();
  }
}
