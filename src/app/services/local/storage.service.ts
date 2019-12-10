import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public CurrentSession: any = null;
  constructor() {
    this.LoadCustomer().then((sessionValue) => {
      if (sessionValue !== null) {
        this.CurrentSession = sessionValue;
      }
    });
  }

  SaveCustomerOnCookie(dataCustomer: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      localStorage.setItem('session', dataCustomer);
      resolve(true);
    });
  }
  LoadCustomer(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('session') !== undefined && localStorage.getItem('session') !== null && (localStorage.getItem('session'))) {
        resolve(JSON.parse(localStorage.getItem('session')));
      } else {
        resolve(null);
      }
    });
  }
  ClearCookie(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('session');
      resolve(true);
    });
  }
}
