import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/core/models/interceptors';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-one-image',
  templateUrl: './one-image.component.html',
  styleUrls: ['./one-image.component.css']
})
export class OneImageComponent implements OnInit {
  image:Image|undefined
  popup=false
  constructor(private route: ActivatedRoute,private ApiService:ApiService,private router: Router) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.ApiService.getOneImages(id).subscribe(({success,image}:{ success: boolean; message: string ,image:Image})=>{
           if(success){
             this.image=image
           }else{
            this.router.navigate(['/404']);
          }
        })
      }else{
        this.router.navigate(['/404']);
      }
      console.log('ID:', id);
    });
  }

  
  
  copyToClipboard(id:string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.select();
    document.execCommand('copy');
  }

  deleteImagePopup(){
     this.popup=!this.popup
  }
}
