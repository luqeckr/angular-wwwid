import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  private rssfeed = new Subject<any>();
  private singlefeed = new Subject<any>();
  items = [];
  ori = [];
  category = '';

  constructor(private http: HttpClient) { }

  createSummary(text: string) {
    // console.log(text);
    const climit = 160;
    text = text.replace(/<[^>]+>/g, '');
    if (text.length > climit) {
      text = text.substring(0, climit) + '...';
    }
    return text;
  }

  fetchFeed() {
    console.log(this.category);
    // no data yet
    if (!this.ori.length) {
      console.log('no data yet');
      this.http.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid')
        .map(result => {
          result['items'].map(items => {
            items.description = this.createSummary(items.description);
          });
          return result;
        })
        .subscribe(result => {
          console.log(result);
          this.ori = result['items'];
          this.items = result['items'];
          if (this.category.length) {
            this.items = this.ori.filter(item => item.categories.indexOf(this.category) !== -1);
          }
          this.rssfeed.next(this.items);
      });
    } else {
      // data exist
      if (this.category.length) {
        this.items = this.ori.filter(item => item.categories.indexOf(this.category) !== -1);
      } else {
        this.items = this.ori;
      }
      this.rssfeed.next(this.items);
    }
  }

  setFeed(num: number) {
    if (!this.ori.length) {
      console.log('no data yet');
      this.http.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid')
        .map(result => result['items'][num])
        .subscribe(result => this.singlefeed.next(result));
    } else {
      this.singlefeed.next(this.ori['items'][num]);
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
    console.log('set to: ' + cat);
    this.fetchFeed();
  }

}
