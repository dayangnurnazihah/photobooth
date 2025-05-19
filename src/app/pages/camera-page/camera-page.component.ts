import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera-page',
  standalone: false,
  templateUrl: './camera-page.component.html',
  styleUrl: './camera-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraPageComponent implements AfterViewInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private service: ImageService,
    private router: Router
  ) {}
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  cameraEnabled: boolean = false;

  ngAfterViewInit(): void {
    this.startCamera();
  }

  startCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = this.videoElement.nativeElement;
        video.srcObject = stream;

        video.onloadedmetadata = () => {
          video.play();
          this.cameraEnabled = true;
          this.cdr.detectChanges();
        };
      })
      .catch((err) => {
        console.error('Error accessing camera', err);
        this.cameraEnabled = false;
      });
  }

  count = 3;
  countClicked = false;
  intervalId: any;
  started = false;
  captureIndex = 0;
  maxCaptures = 4;
  capturedImages: string[] = [];

  startCaptureSequence() {
    this.started = true;
    this.captureIndex = 0;
    this.capturedImages = [];
    this.startCountdown();
  }

  startCountdown() {
    this.count = 3;
    this.countClicked = true;
    this.cdr.detectChanges();
    this.intervalId = setInterval(() => {
      if (this.count > 1) {
        this.count--;
        this.cdr.detectChanges();
      } else {
        clearInterval(this.intervalId);
        this.countClicked = false;
        this.cdr.detectChanges();
        this.capture();
      }
    }, 1000);
  }

  capture() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (ctx) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL('image/png');
      this.capturedImages.push(imageData);
      this.service.setImages(this.capturedImages);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.captureIndex++;
    if (this.captureIndex != this.maxCaptures) {
      setTimeout(() => {
        this.startCountdown();
      }, 1000);
    } else {
      this.started = false;
      this.cdr.detectChanges();
    }
  }

  goToNextPage() {
    this.service.setImages(this.capturedImages);
    this.router.navigate(['/photostrip']);
  }
}
