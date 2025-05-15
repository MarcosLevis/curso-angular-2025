import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
})
export class CounterPageComponent {
    
  counter = 0;
  counterSignal = signal(10);
  
  incraseBy(value: number) {
    this.counterSignal.update( (current) => current + value)
    this.counter += value;
  }

  inicializar() {    
    this.counter = 0;
    this.counterSignal.set(0)
  }
}
