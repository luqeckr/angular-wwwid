import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { DataService } from './data.service';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  items = [];
  item;
  kats = [];
  bbut = false;
  isKategori = false;
  newUpdate = false;

  constructor(
    private router: Router, 
    private data: DataService, 
    private swUpdate: SwUpdate
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe( nav => {
      if (nav['url'] !== '/') { this.bbut = true; } else { this.bbut = false; }
    });

  }
  
  ngOnInit() {
    this.data.getFeedList().subscribe();
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then(result => {
        console.log(result)
      })
      this.swUpdate.available.subscribe(event => {
        this.newUpdate = true;
      })
    }
  }
  
  scrollHandler(event: Event) {
    this.data.emitScroll();
  }

  toggleKat() {
    this.isKategori = !this.isKategori;
    if (this.isKategori) {
      this.kats = this.data.getCategories();
    }
  }

  gotoKat(kat) {
    this.router.navigate(['cat', kat]);
    this.isKategori = false;
  }

  reload() {
    location.reload();
  }

}
