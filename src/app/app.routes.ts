import { Routes } from '@angular/router';
import { CameraPageComponent } from './pages/camera-page/camera-page.component';
import { PhotostripComponent } from './pages/photostrip/photostrip.component';

export const routes: Routes = [
  { path: '', component: CameraPageComponent },
  { path: 'photostrip', component: PhotostripComponent },
];
