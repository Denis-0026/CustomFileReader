import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'factorToPercent',
})
export class FactorToPercentPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    if (value) {
      let numValue = value;
      return numValue ? Math.trunc(numValue * 100) + ' %' : '';
    }
    return '';
  }
}
