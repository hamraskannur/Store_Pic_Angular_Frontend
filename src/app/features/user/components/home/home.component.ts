import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Image } from 'src/app/core/models/interceptors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images: Image[] = [];
  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.ApiService.getImages().subscribe(
      ({ images }: { success: boolean; message: string; images: Image[] }) => {
        this.images = images;
      }
    );
  }

  addImage(image:Image) {
    this.images.unshift(image);
  }
}
