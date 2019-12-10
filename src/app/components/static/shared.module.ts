import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners/banners.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { RouterModule } from '@angular/router';
import { SlidersComponent } from './sliders/sliders.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { PatnersComponent } from './popup/patners/patners.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    BannersComponent,
    FooterComponent,
    MenuComponent,
    NewsletterComponent,
    TopHeaderComponent,
    SlidersComponent,
    PatnersComponent
  ],
  exports: [
    BannersComponent,
    FooterComponent,
    MenuComponent,
    NewsletterComponent,
    TopHeaderComponent,
    SlidersComponent,
    PatnersComponent
  ],
  entryComponents: [
    BannersComponent,
    FooterComponent,
    MenuComponent,
    NewsletterComponent,
    TopHeaderComponent,
    SlidersComponent,
    PatnersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AngularMaterialModule,
    CarouselModule
  ]
})
export class SharedModule { }
