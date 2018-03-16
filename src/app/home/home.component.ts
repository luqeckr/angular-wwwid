import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  items = [];
  i = 0;
  private subrss: Subscription;
  id: string;

  constructor(public data: DataService) {
    const item =
        [{
          'title': 'WWWID Challenge',
          'author': 'Luqe',
          'categories': [],
          'content': 'Loading..',
          'description': '<p>Tunggu sebentar..</p>',
          'pubDate': new Date(),
          'thumbnail': '/assets/icons/placeholder.png'
        }];
    this.items = [...item, ...item, ...item, ...item];

  }

  ngOnInit() {
    this.subrss = this.data.getFeedList().subscribe(res => {
      this.items = res;
    });

    this.data.fetchFeed();
  }

  ngOnDestroy() {
    this.subrss.unsubscribe();
  }

}
