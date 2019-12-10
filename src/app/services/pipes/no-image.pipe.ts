import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(url: string, alter?: string): string {
    // return (url) ? url : './assets/img/product/15.jpg';
    if (url && url !== null && url !== '' && url !== undefined) {
      if (url.indexOf('https://imgur.com') !== -1) {
        return './assets/img/product/15.jpg';
      } else {
        return alter;
      }
    } else {
      return url;
    }
  }

}
