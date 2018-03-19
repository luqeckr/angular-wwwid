import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.component.html',
  styleUrls: ['./feed-detail.component.css']
})
export class FeedDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  private subfeed: any;
  id: number;
  item;

  constructor(private route: ActivatedRoute, private data: DataService) {}

  ngOnInit() {
    this.subfeed = this.data.getFeed().subscribe(result => {
      this.item = result;
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.data.ori.length) {
        this.item = this.data.ori[this.id];
      } else {
        this.data.setFeed(this.id);
      }

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
