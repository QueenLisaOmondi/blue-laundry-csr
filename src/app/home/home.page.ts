import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonChip,
  IonCard,
  IonFooter,
  IonButton,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonIcon,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoWhatsapp } from 'ionicons/icons';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonButton,
    IonToolbar,
    IonTitle,
    IonContent,
    IonChip,
    IonCard,
    IonFooter,
    IonBreadcrumb,
    IonBreadcrumbs,
    IonIcon,
    IonText,
    CommonModule,
  ],
})
export class HomePage implements AfterViewInit {
  @ViewChild('logo') logo!: ElementRef<HTMLElement>;
  @ViewChild('landingContainer') landingContainer!: ElementRef<HTMLElement>;
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  context!: CanvasRenderingContext2D;
  bubbles: { x: number; y: number; radius: number; speed: number }[] = [];
  bubbleCount = 100;
  bubbleSpeed = 0.8;
  popLines = 6;
  popDistance = 20;
  mouseOffset = { x: 0, y: 0 };
  displayMenu: boolean = false;
  constructor() {
    addIcons({
      logoWhatsapp,
    });
  }
  ngAfterViewInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context) {
      this.context = context;
      this.canvas.nativeElement.width = window.innerWidth;
      this.canvas.nativeElement.height = window.innerHeight;

      this.populateBubbles();
      this.animate();

      this.canvas.nativeElement.addEventListener(
        'mousemove',
        (e: MouseEvent) => {
          this.mouseOffset.x = e.offsetX;
          this.mouseOffset.y = e.offsetY;
        }
      );

      window.addEventListener('resize', () => {
        this.canvas.nativeElement.width = window.innerWidth;
        this.canvas.nativeElement.height = window.innerHeight;
      });
    } else {
      throw new Error('Failed to get 2D context from canvas');
    }
  }
  animate(): void {
    // Clear Canvas
    this.context.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    // Draw Bubbles
    this.context.beginPath();
    this.populateBubbles();
    // Filter out bubbles that are off-screen
    this.bubbles = this.bubbles.filter(
      (bubble) => bubble.y >= 0 - bubble.radius
    );

    for (let i = 0; i < this.bubbles.length; i++) {
      const bubble = this.bubbles[i];
      bubble.x += Math.sin(bubble.speed / bubble.radius) * 0.5; // Adjust horizontal movement
      bubble.y -= this.bubbleSpeed;

      this.context.beginPath();
      this.context.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      const gradient = this.context.createRadialGradient(
        bubble.x,
        bubble.y,
        bubble.radius * 0.1,
        bubble.x,
        bubble.y,
        bubble.radius
      );
      gradient.addColorStop(0, '#b1b3ff07');
      gradient.addColorStop(1, '#0436ff33');
      this.context.fillStyle = gradient;
      this.context.fill();

      // Randomly pop a few bubbles
      if (Math.random() < 0.002) {
        this.popBubble(bubble);
      }
    }

    // On Bubble Hover
    for (let i = 0; i < this.bubbles.length; i++) {
      const bubble = this.bubbles[i];
      if (
        this.mouseOffset.x > bubble.x - bubble.radius &&
        this.mouseOffset.x < bubble.x + bubble.radius &&
        this.mouseOffset.y > bubble.y - bubble.radius &&
        this.mouseOffset.y < bubble.y + bubble.radius
      ) {
        this.popBubble(bubble);
      }
    }

    requestAnimationFrame(() => this.animate());
  }

  createBubble(): { x: number; y: number; radius: number; speed: number } {
    const radius = 8 + Math.random() * 6;
    return {
      x: Math.random() * this.canvas.nativeElement.width,
      y: this.canvas.nativeElement.height + radius + Math.random() * 100, // Add random offset to starting position
      radius,
      speed: 50 + Math.random() * 40,
    };
  }

  populateBubbles(): void {
    for (let i = 0; i < this.bubbleCount - this.bubbles.length; i++) {
      this.bubbles.push(this.createBubble());
    }
  }

  popBubble(bubble: {
    x: number;
    y: number;
    radius: number;
    speed: number;
  }): void {
    this.context.beginPath();
    for (let i = 0; i < this.popLines; i++) {
      const angle = (2 * Math.PI * i) / this.popLines;
      const x = bubble.x + Math.cos(angle) * this.popDistance;
      const y = bubble.y + Math.sin(angle) * this.popDistance;
      this.context.moveTo(bubble.x, bubble.y);
      this.context.lineTo(x, y);
    }
    this.context.strokeStyle = '#8bc9ee';
    this.context.lineWidth = 1;
    this.context.stroke();
    bubble.y = this.canvas.nativeElement.height + bubble.radius; // Reset bubble position
  }
  requestOrderMessageGen() {
    return `Hello, I want to request service. Could you please assist? Thank you!`;
  }
  parallax(event: any) {
    const windowHeight = window.innerHeight;

    if (event.detail.currentY < windowHeight * 0.2) {
      this.landingContainer.nativeElement.classList.add('cover');
      this.landingContainer.nativeElement.classList.remove('coverBack');
      this.logo.nativeElement.classList.add('logo');
      //create
    } else {
      this.landingContainer.nativeElement.classList.add('coverBack');
      this.landingContainer.nativeElement.classList.remove('cover');
      this.logo.nativeElement.classList.remove('logo');
    }
    if (event.detail.currentY < windowHeight) {
      this.logo.nativeElement.style.bottom = `-${event.detail.currentY / 2}px`;
    }
    var introText = document.querySelectorAll('.appear');
    var the2X = 0;
    for (var _i = 0; _i < introText.length; _i++) {
      var tex: any = introText[_i];
      var introPositon = tex.getBoundingClientRect().top;
      if (introPositon < windowHeight * 0.86) {
        tex.style.opacity = 1;
        tex.style.transform = 'translateY(0%)';
        tex.style.transition = '0.3s all ' + the2X * 0.05 + 's ease-in-out';
        the2X++;
      } else {
        tex.style.opacity = 0;
        tex.style.transform = 'translateY(10%)';
      }
    }
    // make element dissapear before reaching top
    var dissp = document.querySelectorAll('.dissapeas');
    var theX = 0;
    for (var _a = 0; _a < dissp.length; _a++) {
      var tex: any = dissp[_a];
      var introPosition = tex.getBoundingClientRect().top;
      if (introPosition < -(event.detail.currentY * 0.1)) {
        tex.style.opacity = 0;
        tex.style.transform = 'translateY(-40%)';
        tex.style.transition = '0.3s all ' + theX * 0.07 + 's ease-in-out';
      } else {
        tex.style.opacity = 1;
        tex.style.transform = 'translateY(0)';
      }
      theX++;
    }
  }
  scrollToElement($element: HTMLElement): void {
    console.log($element);
    $element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
