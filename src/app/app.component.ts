import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { DataService } from './data.service';
import { SwUpdate } from '@angular/service-worker';

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
  updateMsg = '';

  constructor(private router: Router, private data: DataService, private swUpdate: SwUpdate) {
    router.events.filter(e => e instanceof NavigationEnd).subscribe( nav => {
      if (nav['url'] !== '/') { this.bbut = true; } else { this.bbut = false; }
    });
  }

  ngOnInit() {
    // this.swUpdate.checkForUpdate().then(a => {
    //   console.log(a);
    // }).catch(err => {
    //   console.log(err);
    // })
    this.swUpdate.available.subscribe(event => {
      // window.alert('[App] Update available: current version is '+ event.current.hash + ' available version is ' + event.available.hash);
      // console.log(event);
      this.newUpdate = true;
      this.updateMsg = '[App] Versi Baru Tersedia';
    })
  }
  
  scrollHandler(event: Event) {
    // this.data.loadImages(); 
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
