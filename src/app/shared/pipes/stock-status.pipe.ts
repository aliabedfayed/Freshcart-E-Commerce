import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus'
})
export class StockStatusPipe implements PipeTransform {

  transform(qty: number, limit: number): null | string {
    if (qty > limit) {
      return null;
    } else {
      return `Only ${qty} left in stock`
    }
  }

}
