import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  items = [];
  i = 0;
  private sub: any;
  private subrss: Subscription;
  id: string;

  constructor(public data: DataService, private route: ActivatedRoute) {
    const item =
        [{
          'title': 'WWWID Challenge',
          'author': 'Luqe',
          'categories': [],
          'content': 'Loading..',
          'description': '<p>Tunggu sebentar..</p>',
          'pubDate': new Date(),
          'thumbnail': '/assets/icons/loading.svg'
        }];
    this.items = [...item, ...item, ...item, ...item];

  }

  ngOnInit() {
    this.subrss = this.data.getFeedList().subscribe(res => {
      this.items = res;
    });

    this.sub = this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        console.log(params);
        this.data.setCategory(params.id);
      } else {
        this.data.setCategory('');
      }
    });

  }

  ngOnDestroy() {
    this.subrss.unsubscribe();
  }


}
