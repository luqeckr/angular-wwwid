import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { retry ,  map ,  tap } from 'rxjs/operators';
import { BehaviorSubject ,  Observable } from 'rxjs';

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
  // items = [...this.item, ...this.item, ...this.item, ...this.item];
  items = [];
  rssfeed = new BehaviorSubject<any>(this.items);
  private singlefeed = new BehaviorSubject<any>(this.items);
  private observer: IntersectionObserver;
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
    text = text.replace(/<figure[^>]*.*\/figure>/g,''); 
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
    desArr['items'].map(item => {
      // item.content = null;
      item.description = this.createSummary(item.description);
      // item.thumbnail = item.thumbnail.replace(/\/max\/(.+)\//g, '/max/300/')
      // item.smallthumb = 'https://res.cloudinary.com/dziesqzmn/image/fetch/c_fill,g_auto:face,h_80,w_80,fl_force_strip.progressive/f_webp/' + item.thumbnail;
      // item.thumbnail = item.thumbnail.replace(/\/max\/(.+)\//g, '/max/350/')
      item.smallthumb = item.thumbnail.replace(/\/max\/(.+)\//g, '/max/80/')
      this.setCategories(item.categories);
      return item;
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
    // if (navigator.onLine) {
      if (!this.ori.length) {
        // no data yet
        this.getAPI()
          .pipe(
            retry(3),
            map(result => this.description(result)),
          )
          .subscribe(result => {
            this.ori = result['items'];
            if (result['status']) {
              this.setRss();
            }
          })
      } else {
        // data exist
        this.setRss();
      }
    // } else {
    //   this.offline()
    // }
  }

  setFeed(num: number) {
    // if (navigator.onLine) {
      if (!this.ori.length) {        
        this.getAPI()
        .pipe(
          retry(3),
          map(result => {
              return result['items'][num]
            }) 
          )
          .subscribe(result => {
            this.singlefeed.next(result)
          })
      } else {
        this.singlefeed.next(this.ori['items'][num]);
      }
    // } else {
    //   this.offline();
    // }
  }

  getFeed(): Observable<any> {
    return this.singlefeed.asObservable();
  }

  getFeedList(): Observable<any> {
    return this.rssfeed.asObservable();
  }

  setCategory(cat: string) {
    console.log(this.category.length, cat.length)
    if (this.category != cat || this.category.length == 0) {
      this.category = cat;
      this.fetchFeed();
    }
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


  createObserver() {
    if (('IntersectionObserver' in window)) {  
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            this.observer.unobserve(entry.target);
            // preload
            this.loadImage(entry.target);
            // entry.target['style'].backgroundImage = 'url('+entry.target['title']+')';
          }
        })
      }, { rootMargin: '0px', threshold: 0.5 });
    }
  }

  getObserver() {
    return this.observer;
  }

  loadImage(img) {
    img.style.backgroundImage = 'url('+img.title+')';
  }

}
