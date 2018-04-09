import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { DataService } from './data.service';

import { environment } from '../environments/environment';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';
// import { FeedDetailComponent } from './feed-detail/feed-detail.component';
import { uhohComponent } from './uhoh.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: 'feed/:id', component: FeedDetailComponent},
  {path: 'feed', loadChildren: './feed-detail/feed-detail.module#FeedDetailModule'},
  {path: 'cat/:id', component: HomeComponent},
  {path: '**', pathMatch: 'full', component: uhohComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    HomeComponent,
    // FeedDetailComponent,
    uhohComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(routes),
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
