import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HolidayService } from '../services/holiday.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // assign selected city to selectedCity
  selectedCity: string = null;

  // use year to display year
  year: number = 2022;

  // add month names in monthInAlphabets Array
  monthInAlphabets: Array<any> = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  // Use month index to get month in monthInAlphabets
  monthIndex = 0;
  currentDate = new Date();

  // get cities and assign it to cities
  cities: Array<any>;

  constructor(public dialog: MatDialog, private holidayServiceObj: HolidayService, private route: Router) {

  }

  /**
   * Set the current month index to monthIndex and set current year to year
   * get cities
   */
  ngOnInit() {
    this.monthIndex = this.currentDate.getMonth();
    this.year = this.currentDate.getFullYear();
    this.getCities();

  }

  /**
   *  To navigate month
   *  if "flag" is 0 which means that user click left arrow key <-
   *  if "flag" is 1 which means that user click right arrow key ->
   */
  navigationArrowMonth(flag) {
    if(flag === 0){
      console.log("decrement--"+this.monthIndex)
      if(this.monthIndex!==0){
        this.monthIndex -= 1;
      }else{
        this.monthIndex = 11;
        this.year -= 1;
      }
    }else{
      console.log("increment--"+this.monthIndex)
      if(this.monthIndex!==11){
        this.monthIndex += 1;
      }else{
        this.monthIndex = 0;
        this.year += 1;
      }
    }
  }

  /**
   *  To navigate year
   *  if "flag" is 0 which means that user onclick left arrow key <-
   *  if "flag" is 1 which means that user onclick right arrow key ->
   */
  navigationArrowYear(flag) {
    if(flag === 0){
      this.year = this.year-1;
    }else{
      this.year = this.year+1;
    }
  }

  /**
   * To disable navigation for month
   * Return true to disable
   * Return false to enable
   */
  monthNavigatorValidation() {
    if((this.monthIndex===11 && this.year>=this.currentDate.getFullYear())){
      if(this.monthIndex===11 && this.currentDate.getMonth()===11 && this.year === this.currentDate.getFullYear()){
        return false;
      }
      return true;
    }else{
      return false;
    }
    
  }

  /**
   * To disable navigation for year
   * return true to disable
   * return false to enable
   */
  yearNavigatorValidation() {
    if(this.year >= this.currentDate.getFullYear()){
      if(this.monthIndex===11 && this.currentDate.getMonth()===11 && this.year === this.currentDate.getFullYear()){
        return false;
      }
      return true;
    }
    return false;
   
  }

  // Get cities list and assign the response value to cities
  getCities() {
    this.holidayServiceObj.getCities().subscribe((data)=>{
      console.log(data);
      this.cities = data;
    })
  }


}
