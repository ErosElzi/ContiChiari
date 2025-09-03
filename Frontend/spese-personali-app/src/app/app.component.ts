import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SpeseListComponent } from './components/spese-list/spese-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('speseList') speseList?: SpeseListComponent;
  
  currentRoute = '';
  title = 'Gestione Spese Personali';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  refreshSpese(): void {
    if (this.speseList) {
      this.speseList.loadSpese();
    }
  }
}
