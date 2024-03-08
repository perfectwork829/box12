import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFilter'
})

export class MomentFilterPipe implements PipeTransform {
  constructor(

  ) {
  }
  transform(data: any, type: string, lang = 'en'): any {
    moment.locale(lang);
    if(type==='dateText') return moment(data).format('YYYY-MM-DD');
    if(type==='monthText')  return moment(data).format('MMM');
    if(type==='dayNumber')  return moment(data).format('DD');
    if(type==='DayName')  return moment(data).format('dddd');
    if(type==='Week')  return moment(data).format('ddd');
    if(type==='time12') return moment(data).format('h:mm A');
    if(type==='time12NoAM') return moment(data).format('h:mm');
    if(type==='AMPM') return moment(data).format('a');
    if(type==='fullDate') return moment(data).format('YYYY-MM-DD h:mm A');
    if(type==='DayAsNumber') return moment(data).format('MMM DD, YY');
    if(type==='FullTime') return moment(data, 'hh:mm:ss').format('hh:mm A');
    if(type==='CrateAt') return moment().to(data);
    if(type==='DateTo') return moment().to(data);
    if(type==='Calender') return moment(data).format('D MMMM');
  }
}