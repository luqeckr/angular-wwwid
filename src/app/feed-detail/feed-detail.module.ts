import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedDetailComponent } from './feed-detail.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: ':id', component: FeedDetailComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FeedDetailComponent
  ]
})
export class FeedDetailModule { }
