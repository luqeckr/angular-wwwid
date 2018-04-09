import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  currentImg = 'url("/assets/icons/placeholder.png")';
  @Input() item;
  @Input() i;
  limitedTitle;
  @ViewChild('lazyImg') lazyImages: ElementRef;
  scrollSub: Subscription;

  constructor(private router: Router, private dataSvc: DataService) {
   }

  ngOnInit() {
    let img = this.lazyImages.nativeElement;
    this.scrollSub = this.dataSvc.scrolling.subscribe(event => {
      if(this.item.smallthumb != undefined) {
        if (this.dataSvc.lazyImage(img)) {
          this.currentImg = 'url('+this.item.smallthumb+')';
        }

      }
    })
  }

  ngOnDestroy() {
    this.scrollSub.unsubscribe();
  }

  detail() {
    this.router.navigate(['feed', this.i]);
  }


}
