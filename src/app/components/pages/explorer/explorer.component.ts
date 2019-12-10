import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global/global.service';
import { DbService } from '../../../services/db/db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {
  public QueryToMatch: string;
  public StoreProducts: any[] = [];
  public loading: boolean = false;

  constructor(private global: GlobalService, private db: DbService,
              private query: ActivatedRoute) {
    this.global.displayMenuCategories = false;
    this.query.params.subscribe((data) => {
      this.QueryToMatch = data.query;
    });
  }

  async ngOnInit() {
    this.StoreProducts = await this.getAllProducts();
    console.log(this.StoreProducts);
  }

  // Traer todos los productos de la categoria
  getAllProducts(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.GetDBQueryOperation('productByCategory', 'product', 'category', `${this.QueryToMatch}&subcategory=${this.QueryToMatch}`)
        .subscribe((data) => {
          if (data.status) {
            const ArrayWithPhoto = new Array();
            for (const prod of data.products) {
                // Verificamos si el campo photo, tiene jpg
                if ((prod.photo.indexOf('jpg') >= 0)  ||
                (prod.photo.indexOf('jpeg') >= 0)  ||
                (prod.photo.indexOf('png') >= 0)   ||
                (prod.photo.indexOf('gif') >= 0) ) {
                  ArrayWithPhoto.push(prod);
                }
            }
            resolve(ArrayWithPhoto);
          } else {
            resolve(null);
          }
        });
    });
  }
  // Products by match
  GetAllProductByMatched(sortColumn: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:max-line-length
      this.db.GetDBQueryOperation('productByCategorySort', 'product', 'category', `${this.QueryToMatch}&subcategory=${this.QueryToMatch}&sortType=${sortColumn}`)
      .subscribe((data) => {
        if (data.status) {
          const ArrayWithPhoto = new Array();
          for (const prod of data.products) {
              // Verificamos si el campo photo, tiene jpg
              if ((prod.photo.indexOf('jpg') >= 0)  ||
              (prod.photo.indexOf('jpeg') >= 0)  ||
              (prod.photo.indexOf('png') >= 0)   ||
              (prod.photo.indexOf('gif') >= 0) ) {
                ArrayWithPhoto.push(prod);
              }
          }
          resolve(ArrayWithPhoto);
        } else {
          resolve(null);
        }
      });
    });
  }
  // Devolver productos ordenados
  async FilterProducts(filterByvalue: any) {
      this.StoreProducts = null; // Eliminamos el array desordenado
      this.loading = true;
      this.StoreProducts = await this.GetAllProductByMatched(filterByvalue.value);
      if (this.StoreProducts !== null) {
        this.loading = false;
      }
  }
}
