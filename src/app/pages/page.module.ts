import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CameraPageComponent } from './camera-page/camera-page.component';
import { PhotostripComponent } from './photostrip/photostrip.component';

@NgModule({
  declarations: [CameraPageComponent, PhotostripComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [],
})
export class PageModule {}
