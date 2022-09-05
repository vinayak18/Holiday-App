import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HolidayService } from 'src/app/services/holiday.service';
import { DateInMonth } from 'src/app/DateInMonth';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  @Input() monthIndex;
  @Input() year;
  @Input() city;
  weekHeader = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // assign user selected date to selectedDate
  selectedDate: any;

  // use dateObj to store DateInMonth objects
  dateObj: Array<Array<DateInMonth>> = Array();

  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  responseDateObjs: Map<any, any> = new Map();

  constructor(private holidayServiceObj: HolidayService) {

  }

  /**
   * Generate month when year or monthIndex or city changes
   */

  ngOnChanges(changes: SimpleChanges): void {
    this.monthGenerator();
  }


  ngOnInit() {
    this.monthGenerator();
  }

  /**
   *  Generate the data for the 42 cells in the table
   *  Property "enabled" to be true for the current month
   *  After generating fetch holiday list.
   */
  monthGenerator() {
    this.dateObj = new Array();
    let startDate = new Date(this.year, this.monthIndex, 1)
    let first = startDate.getDay();
    startDate.setDate(startDate.getDate()-first);
    let days = new Date(this.year, this.monthIndex+1, 0).getDate();
    for(let i=0;i<6;i++){
      let arr = new Array<DateInMonth>();
      for(let j=0;j<7;j++){
        let dd = String(startDate. getDate()). padStart(2, '0');
        let mm = String(startDate. getMonth() + 1). padStart(2, '0');
        let yyyy = startDate. getFullYear();
        ​let dateString = dd + '/' + mm + '/' + yyyy;
        let d = new DateInMonth();
        d.date = dateString;
        d.enabled = false;
        if(first>0 && first--){
          arr.push(d);
        }
        else if(days>0 && days--){
          d.enabled = true;
          arr.push(d);
        }
        else{
          arr.push(d);
        }
        startDate.setDate(startDate.getDate()+1);
      }
      this.dateObj.push(arr);
    }
    console.log(this.dateObj);
    this.holidayInitializer();  
  }


  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  holidayInitializer() {
    this.holidayServiceObj.getHolidays(this.city,this.monthIndex,this.year).subscribe((data)=>{
      console.log(data);
      let i = 0;
      for(let x of data){
        this.responseDateObjs.set(x.date,x);
      }
      console.log(this.responseDateObjs);
      console.log(this.responseDateObjs.get('15/09/2022'))
    })
    
  }

  // check(date){
  //   console.log(this.responseDateObjs.get(date))
  // }
}
