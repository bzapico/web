import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviate'
})
export class AbbreviatePipe implements PipeTransform {
/**
  * Slice creates a new Array or String containing a subset (slice) of the elements.
  * NUM_TOTAL_CHARS is the total number of characters of a word
  * LAST_CHUNK_LENGTH is the last characters of the same word
  * @param value is a list or a string to be sliced.
*/
  transform(value: string): string {
    const NUM_TOTAL_CHARS = 8;
    const LAST_CHUNK_LENGTH = NUM_TOTAL_CHARS - 2;
    let abbString;
    abbString = value.slice(0, 1) + '...' + value.slice(value.length - LAST_CHUNK_LENGTH, value.length);
    if (value.length <= NUM_TOTAL_CHARS) {
      return value;
    } else {
      return abbString;
    }
  }
}
