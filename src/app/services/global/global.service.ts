import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public displayMenuCategories: boolean = true;
  constructor(private snackBar: MatSnackBar) { }

  OpenSnackBar(msg: string, timer: number = 3000) {
    this.snackBar.open(msg, null, {
      duration: timer
    });
  }
}
