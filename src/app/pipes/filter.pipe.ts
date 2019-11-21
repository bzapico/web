/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  /**
   * @param items object from array
   * @param term term's search
   * @param propertiesToFilterBy key to be filtered by
   */
  transform(items: any, term: string, propertiesToFilterBy?: string[]): any {
    if (!term || !items) { return items; }
    if (propertiesToFilterBy) {
      return FilterPipe.filter(items, term, propertiesToFilterBy);
    } else {
      return FilterPipe.filter(items, term);
    }
  }
  /**
   * @param items List of items to filter
   * @param term  a string term to compare with every property of the list
   * @param propertiesToFilterBy a key to add to the filter
   */
  static filter(items: Array<{ [key: string]: any }>, term: string,  propertiesToFilterBy?: string[] ): Array<{ [key: string]: any}> {
    const toCompare = term.toLowerCase();
    return items.filter(function (item: any) {
      if ( propertiesToFilterBy ) {
        for (const property of propertiesToFilterBy) {
          if (item[property] instanceof Object) {
            if (JSON.stringify(item[property]).toLowerCase().includes(toCompare)) {
              return true;
            }
          } else if (item[property] && item[property].toString().toLowerCase().includes(toCompare)) {
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
              return true;
            }
          } else if (item[property] && item[property].toString().toLowerCase().includes(toCompare)) {
            return true;
          }
      }
      return false;
      }
    });
  }
}
