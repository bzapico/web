import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  /**
   * TruncatePipe makes the content to be shortened if it is past a certain length and add an ellipsis at the end
   * NUM_TOTAL_CHARS how long we would like the text to be
   * @param value is a list or a string to be sliced.
   */
    transform(value: string): string {
    const NUM_TOTAL_CHARS = 13;
    if (value && value.length > NUM_TOTAL_CHARS) {
      return value.substring(0, NUM_TOTAL_CHARS) + '...';
    } else {
      return value;
    }
   }
}


