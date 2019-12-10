import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global/global.service';
import { DbService } from '../../../services/db/db.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OWL_CONFIG } from '../../../config/owl.config';
import * as $ from 'jquery';
import { MatDialog } from '@angular/material';
import { PatnersComponent } from '../../static/popup/patners/patners.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId: number;
  productInfo: any = '';
  relatedProducts: any[] = [];
  moqQty: number = 1;
  owlRelatedConfig: OwlOptions = OWL_CONFIG;
  constructor(private global: GlobalService, private db: DbService,
              private param: ActivatedRoute, private dialog: MatDialog) {
    this.global.displayMenuCategories = false;
    this.param.params.subscribe(
      (data) => {
        this.productId = data.id;
      }
    );
  }

  async ngOnInit() {
    this.SmoothScrool();
    this.productInfo = await this.getCurrentProductInfo();
    const relatedProducts = await this.getRelatedProducts(this.productInfo.categoria, this.productInfo.subcategoria);
    if (relatedProducts) {
      this.relatedProducts = relatedProducts;
    }
  }

  // Obtener información del producto
  getCurrentProductInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.GetDBQueryOperation('getProductsId', 'product', 'prod_id', this.productId)
        .subscribe((productData) => {
          if (productData.status) {
            resolve(productData.products[0]);
          }
        });
    });
  }

  // Productos relacionados
  getRelatedProducts(category: string, subcategory: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.GetDBQueryOperation('productByCategory', 'product', 'category', `${category}&subcategory=${subcategory}`)
        .subscribe((data) => {
          if (data.status) {
            const ArrayWithPhoto = new Array();
            let qty = 0;
            for (const prod of data.products) {
              if (qty <= 10) {
                // Verificamos si el campo photo, tiene jpg
                if ((prod.photo.indexOf('jpg') >= 0)  ||
                (prod.photo.indexOf('jpeg') >= 0)  ||
                (prod.photo.indexOf('png') >= 0)   ||
                (prod.photo.indexOf('gif') >= 0) ) {
                  ArrayWithPhoto.push(prod);
                  qty++;
                }
              } else {
                break;
              }
            }
            resolve(ArrayWithPhoto);
          } else {
            resolve(null);
          }
        });
    });
  }
  // Smoothscroll
  SmoothScrool(): void {
    $(document).ready(() => {
      $('html, body').animate(
        {
          scrollTop: $('#product-description').offset().top,
        },
        500,
        'linear'
      );
    });
  }
  OpenPatnerDialog(moq: number, data: any): void {
    const popup = this.dialog.open(PatnersComponent, {
      data: {moq, data},
      autoFocus: false
    });
    popup.afterClosed().subscribe((returnData) => {
      console.log('cerro');
    });
  }
}
