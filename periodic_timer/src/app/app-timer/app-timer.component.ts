import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton, IonHeader, IonToolbar, IonCardHeader, IonButtons, IonBackButton, IonTitle, IonCard, IonCardTitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-app-timer',
  standalone: true,
  imports: [IonIcon, IonButtons, IonCardHeader, RouterModule, IonHeader, IonToolbar, IonButton, IonBackButton, IonTitle, IonCard, IonCardTitle, IonCardContent ],
  templateUrl: './app-timer.component.html',
  styleUrl: './app-timer.component.css'
})
export class AppTimerComponent {
  constructor() {
  }

  isRunning: boolean = false;
  startTime: Date | null = null;
  intervalId: number | null = null;
  timeString: string = '00:00:00:000';

  start() {
    this.startTime = new Date();
    this.isRunning = true;
    this.intervalId = setInterval(this.interval.bind(this), 21) as unknown as number;
  }

  stop() {
    this.isRunning = false;
    this.startTime = null;
    if(this.intervalId !== null)
      clearInterval(this.intervalId);
  }

  interval() {
    if(!this.isRunning || this.startTime === null)
      return;

    var millisDiff = new Date().getTime() - this.startTime.getTime();

    var s = (millisDiff - millisDiff % 1000) / 1000;
    var m = (s - s % 60) / 60
    var h = (m - m % 60) / 60

    this.timeString = (h).toString().padStart(2, '0')
      + ':'
      + (m % 60).toString().padStart(2, '0')
      + ':'
      + (s % 60).toString().padStart(2, '0')
      + ':'
      + (millisDiff % 1000).toString().padStart(3, '0');
  }
}
