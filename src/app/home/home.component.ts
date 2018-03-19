import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  items;
  i = 0;
  private subrss: Subscription;
  private subroute: Subscription;
  id: string;
  // lazyImages;

  constructor(public data: DataService, private route: ActivatedRoute ) {
    // const item =
    //     [{
    //       'title': 'WWWID Challenge',
    //       'author': 'Luqe',
    //       'categories': ['loading'],
    //       'content': 'Loading..',
    //       'description': '<p>Tunggu sebentar..</p>',
    //       'pubDate': new Date(),
    //       'thumbnail': '/assets/icons/placeholder.png'
    //     }];
    // this.items = [...item, ...item, ...item, ...item];

  }

  ngOnInit() {
    this.subroute = this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        console.log(params);
        this.data.setCategory(params.id);
      } else {
        this.data.setCategory('');
      }
    });

    this.subrss = this.data.getFeedList().subscribe(res => {
      this.items = res;
      setTimeout(() => {
        // this.lazyImages = document.querySelectorAll('.lazy-image');
        // console.log(this.lazyImages);
        this.data.loadImages(document.querySelectorAll('.lazy-image'));
      });
    });

    // window.addEventListener('load', this.loadImages)
    // window.addEventListener('scroll', this.loadImages);

    // this.data.setCategory('');
  }

  ngOnDestroy() {
    this.subrss.unsubscribe();
  }

  

}
