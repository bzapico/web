import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {

  /**
   * @param items List of items to filter
   * @param term  a string term to compare with every property of the list
   * @param propertiesToFilterBy a key to add to the filter
   */
  static filter(
    items: Array<{ [key: string]: any }>,
    term: string,
    propertiesToFilterBy?: string[],
    callback?: any
    ): Array<{ [key: string]: any}> {

    const toCompare = term.toLowerCase();
    return items.filter(function (item: any) {
      if ( propertiesToFilterBy ) {
        for (const property of propertiesToFilterBy) {
          if (item[property] instanceof Object) {
            if (JSON.stringify(item[property]).toLowerCase().includes(toCompare)) {
              console.log('filter 2');
              if (typeof callback === 'function') {
                console.log('filter 2');
                return callback();
              }
              return true;
            }
           } else if (item[property].toString().toLowerCase().includes(toCompare)) {
            console.log('filter 1');
            if (typeof callback === 'function') {
               console.log('filter 1');
               return callback();
             }
            return true;
          }
        }
      } else {
        for (const property  in item) {
          if (item[property] === null || item[property] === undefined) {
            continue;
          }
          if (item[property] instanceof Object) {
            if (JSON.stringify(item[property]).toLowerCase().includes(toCompare)) {
              console.log('filter 3');
              if (typeof callback === 'function') {
                console.log('filter 3');
                return callback();
              }
              return true;
            }
           } else if (item[property].toString().toLowerCase().includes(toCompare)) {
            console.log('filter 4 ', typeof callback);
            callback();
            if (typeof callback === 'function') {
              console.log('filter 4');
              return callback();
            }
            return true;
          }
      }
      return false;
      }
    });
  }

  /**
   * @param items object from array
   * @param term term's search
   * @param propertiesToFilterBy key to be filtered by
   */
  transform(
    items: any,
    term: string,
    propertiesToFilterBy?: string[],
    callback?: any
    ): any {
    if (!term || !items) { return items; }
    if (propertiesToFilterBy) {
      if (typeof callback === 'function') {
        console.log('filter 5');
        return callback();
      }
      return FilterPipe.filter(items, term, propertiesToFilterBy);
    } else {
      return FilterPipe.filter(items, term);
    }
  }
}
