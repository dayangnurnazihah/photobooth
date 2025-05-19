import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ImageService } from '../../services/image.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-photostrip',
  standalone: false,
  templateUrl: './photostrip.component.html',
  styleUrl: './photostrip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotostripComponent implements OnInit {
  constructor(private service: ImageService, private cdr: ChangeDetectorRef) {}
  colorRangeCombos: { color: string; range: number }[] = [];

  colors = ['red', 'blue'];
  range = [200, 500, 700];
  selectedColor = 'bg-red-200';
  isTailwindClass = true;

  changeColor(color: string, range: number) {
    this.selectedColor = `bg-${color}-${range}`;
    this.isTailwindClass = true;
  }

  images: string[] = [];

  ngOnInit(): void {
    this.images = this.service.getImages();
    for (const color of this.colors) {
      for (const range of this.range) {
        this.colorRangeCombos.push({ color, range });
        this.cdr.detectChanges();
      }
    }
  }
  onColorPickerChange(event: any) {
    this.selectedColor = event.target.value;
    this.isTailwindClass = false;
  }

  downloadPhotoStrip() {
    const photostrip = document.getElementById('photostrip');

    if (!photostrip) return;

    html2canvas(photostrip).then((canvas) => {
      // Convert canvas to data URL
      const image = canvas.toDataURL('image/png');

      // Create a link element
      const link = document.createElement('a');
      link.href = image;
      link.download = 'photostrip.png';

      // Trigger download
      link.click();
    });
  }
}
