import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, type: string): any {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    if (type == 'manufacturer')
      return items.filter(it => {
        return it.Manufacturername.toLocaleLowerCase().includes(searchText);
      });
    if (type == 'model')
      return items.filter(it => {
        return it.VehicleName.toLocaleLowerCase().includes(searchText);
      });
  }

}
