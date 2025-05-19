import { Routes } from '@angular/router';
import { CameraPageComponent } from './pages/camera-page/camera-page.component';
import { PhotostripComponent } from './pages/photostrip/photostrip.component';

export const routes: Routes = [
  { path: '', redirectTo: 'camera', pathMatch: 'full' },
  { path: 'camera', component: CameraPageComponent },
  { path: 'photostrip', component: PhotostripComponent },
];
