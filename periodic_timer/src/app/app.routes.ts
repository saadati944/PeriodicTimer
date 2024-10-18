import { Routes } from '@angular/router';
import { AppTimerComponent } from './app-timer/app-timer.component';
import { AppMenuComponent } from './app-menu/app-menu.component';

export const routes: Routes = [
    { path: "simple_timer", component: AppTimerComponent },
    { path: "**", component: AppMenuComponent }
];
