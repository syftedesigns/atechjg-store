import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../static/shared.module';
import { PagesRoutingModule } from './pages.routes';
import { NoImagePipe } from '../../services/pipes/no-image.pipe';
import { ExplorerComponent } from './explorer/explorer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { RefreshComponent } from './explorer/refresh.component';
import { AngularMaterialModule } from '../../angular-material.module';



@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    ExplorerComponent,
    NoImagePipe,
    RefreshComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PagesRoutingModule,
    CarouselModule,
    FormsModule,
    NgxImageZoomModule,
    AngularMaterialModule
  ]
})
export class PagesModule { }
