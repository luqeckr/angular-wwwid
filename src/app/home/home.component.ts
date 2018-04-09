import { Component, OnInit, OnDestroy, ViewChild, ElementRef, QueryList, ViewChildren, ContentChildren, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  items;
  i = 0;
  private subrss: Subscription;
  private subroute: Subscription;
  id: string;
  scrollSub: Subscription
  @ViewChildren('card') lazyImages: QueryList<any>;

  constructor(public data: DataService, private route: ActivatedRoute, private dataSvc: DataService ) {}

  ngOnInit() {
    this.subroute = this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        console.log(params);
        this.data.setCategory(params.id);
      } else {
        this.data.setCategory(''); console.log('no category');
      }
    });

    this.subrss = this.data.getFeedList().subscribe(res => {
      this.items = res;
      console.log('feed is here');
      // console.log(document.querySelectorAll('.lazyimg'));

      // let img = this.lazyImages;
      //   console.log(res);
      // })
    });
  }
  
  ngAfterViewInit() {
    // console.log(this.lazyImages);
    // // this.lazyImages.changes.subscribe(res => {
    // //   console.log(res)
    // // })
    // this.lazyImages.forEach(res => {
    //   let img = res.nativeElement;
    //   console.log(res.nativeElement)
    // })

  }


  ngOnDestroy() {
    this.subrss.unsubscribe();
  }

  

}
