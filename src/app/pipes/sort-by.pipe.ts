import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  /**
   * Check if a value is a string
   *  @param value value to be checked as a string
   */
  static isString(value: any) {
    return typeof value === 'string' || value instanceof String;
  }
  /**
   * Sorts values ignoring the case
   * @param a first param to ignore the case
   * @param b second param to ignore the case
   */
  static caseInsensitiveSort(a: any, b: any) {
    if (SortByPipe.isString(a) && SortByPipe.isString(b)) {
      return a.localeCompare(b);
    }
    return SortByPipe.defaultCompare(a, b);
  }
  /**
   * Default compare method
   * @param a first param to compare
   * @param b second param to compare
   */
  static defaultCompare(a: any, b: any) {
    if (a === b) {
      return 0;
    }
    if (a == null) {
      return 1;
    }
    if (b == null) {
      return -1;
    }
    return a > b ? 1 : -1;
  }
  /**
   * Parse expression, split into items
   * @param expression expression to be parsed
   */
  static parseExpression(expression: string): string[] {
    expression = expression.replace(/\[(\w+)\]/g, '.$1');
    expression = expression.replace(/^\./, '');
    return expression.split('.');
  }
  /**
   * Get value by expression
   * @param object get ordered nested object elements
   * @param expression expression to get value by
   */
  static getValue(object: any, expression: string[]) {
    for (let i = 0, n = expression.length; i < n; ++i) {
      const k = expression[i];
      if (!(k in object)) {
        return;
      }
      if (typeof object[k] === 'function') {
        object = object[k]();
      } else {
        object = object[k];
      }
    }
    return object;
  }
  /**
   * Set value by expression
   * @param object set ordered nested object elements
   * @param value value to be set
   * @param expression expression to set value by
   */
  static setValue(object: any, value: any, expression: string[]) {
    let i;
    for (i = 0; i < expression.length - 1; i++) {
      object = object[expression[i]];
    }
    object[expression[i]] = value;
  }
  transform(value: any | any[], expression?: any, reverse?: boolean, isCaseInsensitive: boolean = false, comparator?: Function): any {
    if (!value) {
      return value;
    }
    if (Array.isArray(expression)) {
      return this.multiExpressionTransform(value, expression, reverse, isCaseInsensitive, comparator);
    }
    if (Array.isArray(value)) {
      return this.sortArray(value.slice(), expression, reverse, isCaseInsensitive, comparator);
    }
    if (typeof value === 'object') {
      return this.transformObject(Object.assign({}, value), expression, reverse, isCaseInsensitive, comparator);
    }
    return value;
  }
  /**
   * Sort array
   * @param expressions expression that returns array as it is
   * @param reverse sort by multiple fields and preserve priority (reversed)
   * @param isCaseInsensitive order case-insensitively strings
   * @param comparator order with and change to order with custom comparator function
   */
  private sortArray(value: any[], expression?: any, reverse?: boolean, isCaseInsensitive?: boolean, comparator?: Function): any[] {
    const isDeepLink = expression && expression.indexOf('.') !== -1;
    if (isDeepLink) {
      expression = SortByPipe.parseExpression(expression);
    }
    let compareFn: Function;
    if (comparator && typeof comparator === 'function') {
      compareFn = comparator;
    } else {
      compareFn = isCaseInsensitive ? SortByPipe.caseInsensitiveSort : SortByPipe.defaultCompare;
    }
    const array: any[] = value.sort((a: any, b: any): number => {
      if (!expression) {
        return compareFn(a, b);
      }
      if (!isDeepLink) {
        if (a && b) {
          return compareFn(a[expression], b[expression]);
        }
        return compareFn(a, b);
      }
      return compareFn(SortByPipe.getValue(a, expression), SortByPipe.getValue(b, expression));
    });
    if (reverse) {
      return array.reverse();
    }
    return array;
  }
  /**
   * Transform Object
   * @param expressions expression to be transformed
   * @param reverse reverse sort by multiple fields and preserve priority (reversed)
   * @param isCaseInsensitive order case-insensitively strings
   * @param comparator order with and change to order with custom comparator function
   */
  private transformObject(
    value: any | any[],
    expression?: any,
    reverse?: boolean,
    isCaseInsensitive?: boolean,
    comparator?: Function
  ): any {
    const parsedExpression = SortByPipe.parseExpression(expression);
    let lastPredicate = parsedExpression.pop();
    let oldValue = SortByPipe.getValue(value, parsedExpression);
    if (!Array.isArray(oldValue)) {
      parsedExpression.push(lastPredicate);
      lastPredicate = null;
      oldValue = SortByPipe.getValue(value, parsedExpression);
    }
    if (!oldValue) {
      return value;
    }
    SortByPipe.setValue(value, this.transform(oldValue, lastPredicate, reverse, isCaseInsensitive), parsedExpression);
    return value;
  }
  /**
   * Apply multiple expressions
   * @param value value to be checked
   * @param expressions expression to be transformed
   * @param reverse sort by multiple fields and preserve priority (reversed)
   * @param isCaseInsensitive order case-insensitively strings
   * @param comparator order with and change to order with custom comparator function
   */
  private multiExpressionTransform
  (value: any,
    expressions: any[],
    reverse: boolean,
    isCaseInsensitive: boolean = false,
    comparator?: Function): any {
    return expressions.reverse().reduce((result: any, expression: any) => {
      return this.transform(result, expression, reverse, isCaseInsensitive, comparator);
    }, value);
  }
}
