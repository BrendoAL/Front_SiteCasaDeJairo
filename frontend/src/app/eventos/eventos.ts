import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-eventos',
  standalone: true,
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.css']
})
export class Eventos implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const track = this.el.nativeElement.querySelector('.slider-track') as HTMLElement;
    const slides = track.querySelectorAll('img');
    let index = 0;

    function nextSlide() {
      index++;
      if (index >= slides.length) {
        index = 0;
      }
      const width = slides[0].clientWidth;
      track.style.transform = `translateX(-${index * width}px)`;
    }

    setInterval(nextSlide, 3000);
  }
}
