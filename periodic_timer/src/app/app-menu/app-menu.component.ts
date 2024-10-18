import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton, IonNavLink, IonToolbar, IonHeader, IonTitle, IonListHeader, IonList, IonLabel, IonItem } from "@ionic/angular/standalone";
import { AppTimerComponent } from '../app-timer/app-timer.component';

@Component({
  selector: 'app-app-menu',
  standalone: true,
  imports: [IonItem, IonLabel, IonList, IonListHeader, IonTitle, IonHeader, IonToolbar, IonNavLink, IonButton, RouterModule],

  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.css'
})
export class AppMenuComponent {
  simpleTimerComponent = AppTimerComponent;
}
