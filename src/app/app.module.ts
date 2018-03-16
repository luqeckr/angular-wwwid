import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

// import { LazyLoadImageModule } from 'ng-lazyload-image';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatCardModule} from '@angular/material/card';
// import {MatButtonModule} from '@angular/material/button';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { DataService } from './data.service';

import { environment } from '../environments/environment';
import { FeedComponent } from './feed/feed.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { FeedDetailComponent } from './feed-detail/feed-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'feed/:id', component: FeedDetailComponent},
  {path: 'cat/:id', component: CategoryComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    CategoryComponent,
    HomeComponent,
    FeedDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(routes),
    HttpClientModule,
    // LazyLoadImageModule,
    // MatToolbarModule,
    // MatCardModule,
    // MatButtonModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
