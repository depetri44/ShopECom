import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../../constatnt/constants';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the DateTimeFormatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateTimeFormat',
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    //return value.toLowerCase();
    return this.transform(value, Constants.DATE_TIME_FMT);
  }
}
