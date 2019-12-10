import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../services/db/db.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {
  public queryProducts: any[] = [];
  constructor(private db: DbService, private route: Router) { }

  ngOnInit() {
  }

  findProductsByQuery(query: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.GetDBQueryOperation('explorer', 'product', 'query', query)
        .subscribe((data) => {
          if (data.status) {
            const ArrayWithPhoto = new Array();
            for (const prod of data.search) {
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

  async Intellisence(queryString) {
    if (queryString !== undefined && (queryString !== null) && (queryString)) {
      const match = await this.findProductsByQuery(queryString);
      if (match !== null) {
        this.queryProducts = match;
      }
    } else {
      this.queryProducts = [];
    }
  }

  GetOption(value: any): void {
    this.route.navigate(['/redirect/product/' + value.id]);
    this.queryProducts = [];
    $('#formValue')[0].reset();
  }
}
