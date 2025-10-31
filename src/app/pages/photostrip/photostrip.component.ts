import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ImageService } from '../../services/image.service';
import html2canvas from 'html2canvas';

type BgMode = 'tailwind' | 'hex' | 'image';

@Component({
  selector: 'app-photostrip',
  standalone: false,
  templateUrl: './photostrip.component.html',
  styleUrl: './photostrip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotostripComponent implements OnInit {
  constructor(private service: ImageService, private cdr: ChangeDetectorRef) {}

  images: string[] = [];
  colorRangeCombos: { color: string; range: number }[] = [];
  colors = ['red', 'blue'];
  range = [200, 500, 700];

  bgMode: BgMode = 'tailwind';
  selectedTailwind = 'bg-red-200';
  selectedHex = '#fca5a5';
  selectedImage: string | null = null;

  backgroundImages = ['/2.png'];

  ngOnInit(): void {
    this.images = this.service.getImages();
    for (const color of this.colors) {
      for (const range of this.range) {
        this.colorRangeCombos.push({ color, range });
      }
    }
    this.cdr.markForCheck();
  }

  changeColor(color: string, range: number) {
    this.bgMode = 'tailwind';
    this.selectedTailwind = `bg-${color}-${range}`;
    this.selectedImage = null;
    this.cdr.markForCheck();
  }

  onColorPickerChange(event: any) {
    this.bgMode = 'hex';
    this.selectedHex = event.target?.value ?? this.selectedHex;
    this.selectedImage = null;
    this.cdr.markForCheck();
  }

  selectBackgroundImage(url: string) {
    this.bgMode = 'image';
    this.selectedImage = url;
    this.cdr.markForCheck();
  }

  clearBackground() {
    this.bgMode = 'tailwind';
    this.selectedTailwind = 'bg-red-200';
    this.selectedImage = null;
    this.cdr.markForCheck();
  }

  get photostripClass(): string[] {
    return this.bgMode === 'tailwind' ? [this.selectedTailwind] : [];
  }

  get photostripStyle(): { [k: string]: string } {
    if (this.bgMode === 'hex') {
      return { backgroundColor: this.selectedHex };
    }
    if (this.bgMode === 'image' && this.selectedImage) {
      return {
        backgroundImage: `url('${this.selectedImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }
    return {};
  }

  downloadPhotoStrip() {
    const el = document.getElementById('photostrip');
    if (!el) return;
    html2canvas(el).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'photostrip.png';
      link.click();
    });
  }
}
