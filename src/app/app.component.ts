import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  items = [];
  item;
  bbut = false;

  constructor(private router: Router, private data: DataService) {
    router.events.filter(e => e instanceof NavigationEnd).subscribe( nav => {
      console.log(nav);
      if (nav['url'] !== '/') { this.bbut = true; } else { this.bbut = false; }
    });
  }
  
  scrollHandler(event: Event) {
    // console.log(event);
    this.data.loadImages();
  }

}
