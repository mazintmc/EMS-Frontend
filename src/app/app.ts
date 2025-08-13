import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './features/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor() {
    console.log((Login as any).ɵcmp.standalone);
  }
}
