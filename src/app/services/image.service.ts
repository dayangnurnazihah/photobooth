import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private images: string[] = [];

  setImages(images: string[]) {
    this.images = images;
  }

  getImages(): string[] {
    return this.images;
  }

  clearImages() {
    this.images = [];
  }
}
