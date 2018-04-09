import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/map';
import { retry } from 'rxjs/operators/retry';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  item =
        [{
          'title': 'WWWID Challenge',
          'author': 'Luqe',
          'categories': ['loading'],
          'content': 'Loading..',
          'description': 'Tunggu sebentar..',
          'pubDate': new Date(),
          'thumbnail': '/assets/icons/placeholder.png'
        }];
  items = [...this.item, ...this.item, ...this.item, ...this.item];
  private rssfeed = new BehaviorSubject<any>(this.items);
  private singlefeed = new BehaviorSubject<any>(this.items);
  scrolling = new BehaviorSubject('');
  // items = [];
  ori = [];
  category = '';
  categories = [];
  lazyImages;

  constructor(private http: HttpClient) { }

  offline() {
    window.alert('you\'re offline!');
  }

  createSummary(text: string) {
    // console.log(text);
    const climit = 260;
    text = text.replace(/<[^>]+>/g, '');
    if (text.length > climit) {
      text = text.substring(0, climit) + '...';
    }
    return text;
  }

  getAPI() {
    return this.http.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid')
  }

  getCategories() {
    let newCat:any[] = [];
    this.categories.forEach((elem, pos, arr) => {
      if (arr.indexOf(elem) == pos) {
        newCat.push(elem);
      } 
    });
    return newCat;
  }

  setCategories(cat) {
    this.categories = [...this.categories, ...cat];
  }

  description(desArr) {
    desArr['items'].map(items => {
      items.description = this.createSummary(items.description);
      items.smallthumb = 'https://res.cloudinary.com/dziesqzmn/image/fetch/c_fill,g_auto:face,h_60,w_60,fl_force_strip.progressive/f_webp/' + items.thumbnail;
      this.setCategories(items.categories);
      return items;
    });
    return desArr;
  }

  setRss() {
    if (this.category.length) {
      this.items = this.ori.filter(item => item.categories.indexOf(this.category) !== -1);
    } else {
      this.items = this.ori;
    }
    this.rssfeed.next(this.items);
  }

  fetchFeed() {
    if (navigator.onLine) {
      if (!this.ori.length) {
        // no data yet
        this.getAPI()
          .pipe(
            retry(3),
            map(result => this.description(result)),
            tap(result => {
              this.ori = result['items'];
              this.setRss();
            })
          )
          .subscribe()
      } else {
        // data exist
        this.setRss();
      }
    } else {
      this.offline()
    }
  }

  setFeed(num: number) {
    if (navigator.onLine) {
      if (!this.ori.length) {
        this.getAPI()
          .pipe(
            retry(3),
            map(result => result['items'][num])
          )
          .subscribe(result => this.singlefeed.next(result));
      } else {
        this.singlefeed.next(this.ori['items'][num]);
      }
    } else {
      this.offline();
    }
  }

  getFeed(): Observable<any> {
    return this.singlefeed.asObservable();
  }

  getFeedList(): Observable<any> {
    return this.rssfeed.asObservable();
  }

  setCategory(cat: string) {
    this.category = cat;
    this.fetchFeed();
  }

  emitScroll() {
    this.scrolling.next('');
  }

  isInViewport(yPostion) {
    if (yPostion > 0 && yPostion < (screen.availHeight-100)) return true
    else return false
  }

  lazyImage(img) {
    let position = img.getBoundingClientRect();
    if (this.isInViewport(position.y)) {
      return true;
    }
    return false;
  }
}
