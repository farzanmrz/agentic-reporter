import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component'; // <-- Import SidebarComponent
import { ContentAreaComponent } from './content-area/content-area.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, SidebarComponent, ContentAreaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agentic-reporter-app';
}
