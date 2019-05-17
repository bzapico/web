import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {

  /**
   * @param items List of items to filter
   * @param term  a string term to compare with every property of the list
   * @param specificKey a key to add to the filter
   */
  static filter(items: Array<{ [key: string]: any }>, term: string,  specificKey?: string ): Array<{ [key: string]: any}> {

    const toCompare = term.toLowerCase();

    return items.filter(function (item: any) {
      if ( specificKey ) {
        if (item[specificKey].toString().toLowerCase().includes(toCompare)) {
          return true;
        }
        return false;
      } else {
      for (const property in item) {
        if (item[property] === null || item[property] === undefined) {
          continue;
        }
        if (item[property] instanceof Object) {
          if ( JSON.stringify(item[property]).toLowerCase().includes(toCompare)) {
            return true;
          }
        } else {
          console.log('term ', toCompare);
          // console.log('item property ', item[property].toString()); 
          // console.log('condition ' , item[property].toString().toLowerCase().includes(toCompare));

          if (item[property].toString().toLowerCase().includes(toCompare)) {
            console.log('item property ', item[property], item[property].toString().toLowerCase().includes(toCompare));
            return true;
          }
        }
      }
      return false;
    }
  });
  }

  /**
   * @param items object from array
   * @param term term's search
   * @param specificKey key to be filtered by
   */
  transform(items: any, term: string, specificKey?: string): any {
    if (!term || !items) { return items; }
    if (specificKey) {
      return FilterPipe.filter(items, term, specificKey);
    } else {
      return FilterPipe.filter(items, term);
    }
  }
}
