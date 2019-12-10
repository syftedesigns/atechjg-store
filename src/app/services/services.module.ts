import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material.module';
import { GlobalService } from './global/global.service';
import { DbService } from './db/db.service';
import { StorageService } from './local/storage.service';


@NgModule({
  declarations: [],
  providers: [
    GlobalService,
    DbService,
    StorageService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule
  ]
})
export class ServicesModule { }
