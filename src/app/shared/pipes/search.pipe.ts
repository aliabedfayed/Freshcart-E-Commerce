import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../features/product/models/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], searchTerm: string) {
    return products.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }

}
