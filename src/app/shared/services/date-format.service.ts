import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor() { }
  formatDate(date: Date, format = 'YYYY-MM-DD') {
    const d = new Date(date);

    // Define the month and day formatting (zero-padded)
    const padZero = (num: number) => (num < 10 ? '0' : '') + num;

    const replacements: any = {
      'YYYY': d.getFullYear(),
      'MM': padZero(d.getMonth() + 1),
      'DD': padZero(d.getDate()),
      'HH': padZero(d.getHours()),
      'mm': padZero(d.getMinutes()),
      'ss': padZero(d.getSeconds())
    };

    // Replace each format key with the corresponding date value
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (key) => replacements[key]);
  }
}
