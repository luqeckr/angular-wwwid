import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { DataService } from './data.service';

@Injectable()
export class PreloadrssService implements CanActivate {

  constructor(private data: DataService) { }

  canActivate() {
    this.data.fetchFeed();
    return true;
  }

}
