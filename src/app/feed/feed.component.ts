import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @Input() item;
  @Input() i;
  content;
  limitedTitle;
  scTarget;

  constructor(private router: Router) { }

  ngOnInit() {
    this.scTarget = document.getElementById('container');
    const limit = 65;
    const dots = this.item.title.length > limit ? '..' : '';
    const limitTitle = this.item.title.substr(0, limit);
    if (this.item.title.length > limit) {
      this.limitedTitle = limitTitle.substr(0, Math.min(limitTitle.length, limitTitle.lastIndexOf(' '))) + dots;
    } else {
      this.limitedTitle = this.item.title;
    }
  }

  detail() {
    this.router.navigate(['feed', this.i]);
  }

}
