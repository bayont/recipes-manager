import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {
  transform(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    let minutesLeft = minutes - hours * 60;

    return `${hours}h ${minutesLeft}m`;
  }
}
