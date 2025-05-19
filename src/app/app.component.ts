import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageModule } from './pages/page.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'photobooth';
}
