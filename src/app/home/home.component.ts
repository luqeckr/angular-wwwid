import { Component, OnInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  items;
  i = 0;
  dataIsReady: boolean = false;
  private subrss: Subscription;
  private subroute: Subscription;
  private scrollSub: Subscription;
  private lazySub: Subscription;
  
  id: string;
  @ViewChildren('lazyImg') lazyImages: QueryList<any>;
  currentImg: string;
  imgList: NodeListOf<any>;

  constructor(
    public data: DataService, 
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.currentImg = 'url("/assets/icons/placeholder.png")';
  }

  ngOnInit() {
    this.subroute = this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        console.log(params);
        this.data.setCategory(params.id);
      } else {
        this.data.setCategory(''); console.log('no category');
      }
    });

    this.data.createObserver();

    this.subrss = this.data.getFeedList().subscribe(res => {
    // this.subrss = this.data.rssfeed.subscribe(res => {
      if (res.length) {
        console.log(res.length)
        this.items = res;
        // this.items.map(item => {
        //   item.description = this.data.createSummary(item.content);
        // })
      }
      console.log('done')
      setTimeout(() => {
        if (!('IntersectionObserver' in window)) { // test kompabilitas
            this.lazyLoadCompatibility()
        } else {
          if (this.lazyImages) {
            this.lazyImages.forEach(img => {
              this.data.getObserver().observe(img.nativeElement);
            })
          }
        }
      });
      
    });
    
  }

  lazyLoadCompatibility() {
    this.imgList = document.querySelectorAll('.lazyimg');
    console.log(this.imgList)
    if (this.imgList[0].getAttribute('title')!=='undefined') { // load pertama undefined
      this.scrollSub = this.data.scrolling.subscribe(event => {
        for(var i=0; i<this.imgList.length; i++) {
          if (this.data.lazyImage(this.imgList[i])) {
            this.data.loadImage(this.imgList[i]);
          }
        }
      })
    }
  }


  ngOnDestroy() {
    this.subrss.unsubscribe();
    this.subroute.unsubscribe();
    if (this.scrollSub) this.scrollSub.unsubscribe();
    // this.lazySub.unsubscribe();
  }

  detail(i) {
    this.router.navigate(['feed', i]);
  }

  

}
