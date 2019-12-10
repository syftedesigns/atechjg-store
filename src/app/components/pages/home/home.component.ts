import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../services/db/db.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OWL_CONFIG, OWL_CONFIG2 } from '../../../config/owl.config';
import * as $ from 'jquery';
import { GlobalService } from '../../../services/global/global.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  row1: any[] = []; // celda 1
  row2: any[] = []; // celda 2
  row3: any[] = []; // celda 3
  row4: any[] = []; // Celda 4
  rowSlider1: any[] = [];
  rowSlider2: any[] = [];
  rowSlider3: any[] = [];
  rowSlider4: any[] = [];
  ProductSliders: any[] = []; // primeros 3 productos

  /*
  OWL OPTS
  */
 customOptions: OwlOptions = OWL_CONFIG;
 bestSellerTab: OwlOptions = OWL_CONFIG2;
  constructor(private db: DbService, private global: GlobalService) {
    this.global.displayMenuCategories = true;
  }

  async ngOnInit() {
    /*
    Creamos el despliegue de items por celdas
    */
   // Sliders
    this.ProductSliders = await this.LoadDbList(3, 700); // primeros 3 productos
    this.row1 = await this.LoadDbList(40, 0);
    this.row2 = await this.LoadDbList(30, 45);
    this.row3 = await this.LoadDbList(20, 60);
    this.row4 = await this.LoadDbList(30, 90);
    this.rowSlider1 = await this.LoadDbList(5, 95);
    this.rowSlider2 = await this.LoadDbList(10, 1);
    this.rowSlider3 = await this.LoadDbList(10, 154);
    this.rowSlider4 = await this.LoadDbList(1, 189);
    console.log(this.row1);
  }

  LoadDbList(limit: number, offset: number = 0): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.GetDBQuerySort('getProducts', 'product', limit, offset)
        .subscribe((productList) => {
          if (productList.status) {
            const ArrayWithPhoto = new Array();
            for (const prod of productList.products) {
              // Verificamos si el campo photo, tiene jpg
              if ((prod.photo.indexOf('jpg') >= 0)  ||
              (prod.photo.indexOf('jpeg') >= 0)  ||
              (prod.photo.indexOf('png') >= 0)   ||
              (prod.photo.indexOf('gif') >= 0) ) {
                ArrayWithPhoto.push(prod);
              }
            }
            resolve(ArrayWithPhoto);
            // resolve(productList.products);
          } else {
            resolve(null);
          }
        });
    });
  }
}
