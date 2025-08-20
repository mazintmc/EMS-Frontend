import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Navbar],
  template: `
    <div class="layout">
        <app-sidebar></app-sidebar>
        <div class="main">
          <app-navbar></app-navbar>
      <div class="content">
        <router-outlet></router-outlet>
         </div>
      </div>
    </div>
  `,
  styleUrls: ['./layout.scss']
})
export class LayoutComponent {}
