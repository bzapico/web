import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviate'
})
export class AbbreviatePipe implements PipeTransform {

  transform(value: string, args: string[]): string {
    const NUM_TOTAL_CHARS = 8;
    const LAST_CHUNK_LENTH = NUM_TOTAL_CHARS - 2;
    const abbstring = value.slice(0, 1) + '...' + value.slice(value.length - LAST_CHUNK_LENTH, value.length - 1);

    return abbstring;
  }
}
