;(function(){
	'use strict';
	// these are labels for the days of the week
	var cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

	// these are human-readable month name labels, in order
		cal_months_labels = ['January', 'February', 'March', 'April',
	                     	'May', 'June', 'July', 'August', 'September',
	                     	'October', 'November', 'December'],

	// these are the days of the week for each month, in order
		cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		that =this,
		calDate = new Date();
	
	/**
	  * @param 
	  * @param 
	  * return [Number] current date
	**/
	var getCurrentDate = function(){
		var calCurrentDate = calDate.getDate();
		return calCurrentDate;
	}

	/**
	  * @param [Number] month for the calendar
	  * @param [Number] year for the calendar
	  * return
	**/
	var fullDateHeader = function(month,year){
		var month = month,
			year = year,
			monthName = cal_months_labels[month],
			$fullDate=  monthName + ' ' + year;
		$('.full-date').html($fullDate);
	}; 	

	/**
	  * @param [Number] month month for the calendar
	  * @param [Number]
	  * return
	**/
	var showDays = function(){
		var $dayHeader= $('<tr></tr>').attr('class','day-header'); 
		for(var i = 0; i < cal_days_labels.length; i++ ){
			var $dayData = $("<th></th>").attr('class','day-data').append(cal_days_labels[i]);
			$dayHeader.append($dayData);
			$('.calendar-table').append($dayHeader);
		}
	};
	

	var events = function(nowMonth,nowYear){
		var heading = "Event Heading",
			year = 2015,
			month = 11,
			date = 19,
			nowMonth = nowMonth,
			nowYear = nowYear,
			tdArray = $('.calendar-table tr td');
			if(year === nowYear && month === nowMonth){
				for(var i=0; i<tdArray.length; i++){
					if(date === parseInt($(tdArray[i]).html())){
						var $event = $('<span></span>').addClass('event').append(heading);
						$(tdArray[i]).addClass('make-relative');
						$(tdArray[i]).prepend($event);
					}
					else{
						$(tdArray[i]).removeClass('make-relative');
					}
				}
				
			}
	};

	var buttonMapping = function(month,year){
		var month = month;
		var year = year;
		$('.today-btn').click(function(){
				$('.calendar-day').remove();
				var month = calDate.getMonth(),
					year = calDate.getFullYear();
				fullDateHeader(month,year);
				var showTodayCal = new ShowNumberDate(month, year);
				var monthLength = showTodayCal.monthLength();
				var startDay = showTodayCal.getStartDay();	
				var prevMonthLen = showTodayCal.prevMonthLen();
				showTodayCal.printDate(monthLength,startDay,prevMonthLen);
				month = month;
				year = year;
			});

			$('.prev-month').click(function(){
				if(month > 0){
					$('.calendar-day').remove();
					var prevMonth = month - 1;
					fullDateHeader(prevMonth, year);
					var showDatePrev = new ShowNumberDate(prevMonth, year);
					var monthLength = showDatePrev.monthLength();
					var startDay = showDatePrev.getStartDay();	
					var prevMonthLen = showDatePrev.prevMonthLen();
					showDatePrev.printDate(monthLength,startDay,prevMonthLen);
					month = prevMonth;
				}
				else{
					$('.calendar-day').remove();
					var prevMonth = 11;
					var prevYear = year - 1;
					fullDateHeader(prevMonth,prevYear);
					var showPrevYear = new ShowNumberDate(prevMonth, prevYear);
					var monthLength = showPrevYear.monthLength();
					var startDay = showPrevYear.getStartDay();	
					var prevMonthLen = showPrevYear.prevMonthLen();
					showPrevYear.printDate(monthLength,startDay,prevMonthLen);
					month = prevMonth;
					year = prevYear;
				}
			});

			$('.next-month').click(function(){
				if(month < 11){
					$('.calendar-day').remove();
					console.log('this.month: ' + month);
					var nextMonth = month + 1;
					console.log('nextMonth: ' + nextMonth);
					fullDateHeader(nextMonth,year);
					var showDateNext = new ShowNumberDate(nextMonth, year);
					var monthLength = showDateNext.monthLength();
					var startDay = showDateNext.getStartDay();	
					var prevMonthLen = showDateNext.prevMonthLen();
					showDateNext.printDate(monthLength,startDay,prevMonthLen);
					month = nextMonth;
				}
				else{
					$('.calendar-day').remove();
					var nextMonth = 0;
					var nextYear = year + 1;
					fullDateHeader(nextMonth,nextYear);
					var showNextYear = new ShowNumberDate(nextMonth, nextYear);
					var monthLength = showNextYear.monthLength();
					var startDay = showNextYear.getStartDay();	
					var prevMonthLen = showNextYear.prevMonthLen();
					showNextYear.printDate(monthLength,startDay,prevMonthLen);
					month = nextMonth;
					year = nextYear;
				}
			});

	};




	/**
	  * @param [Number] month for the calendar
	  * @param [Number] year for the calendar
	  * return
	**/
	function ShowNumberDate(month,year){
		var month=month,
			year=year;

		// find number of days in month	
		this.monthLength = function(){
			var monthLength = cal_days_in_month[month];
			
			// compensate for leap year
			if (month === 1) { // February only!
				if((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0){
				  monthLength = 29;
				}
			}
			console.log('monthLength: ' + monthLength);
			return monthLength;	
		};	

		this.prevMonthLen = function(){
			var prevMonthLength = cal_days_in_month[month - 1];
			return prevMonthLength;
		};

		// get first day of month
		this.getStartDay = function(){
			console.log('year: ' + year);
			console.log('month: ' + month);
			var firstDay = new Date(year, month, 1),
				startingDay = firstDay.getDay();
			console.log('firstDay: ' + firstDay);
			return startingDay;
		}

		this.printDate = function(monthLength, startDay, prevMonthLen){
			var monthLength = monthLength,
				prevMonthLen = prevMonthLen;
			console.log('prevMonthLength: ' + prevMonthLen);
			if(calDate.getMonth() === month){
				var todayDate =  getCurrentDate();
			}
			
			//fill in the days
			var day = 1,
				isLabelled = 1,
				flag = false,
				startingDay = startDay;
			// this loop is for is weeks (rows)
			for (var i = 0; i < 6; i++) {
				// this loop is for weekdays (cells)
				var $dayRow= $('<tr></tr>').attr('class','day-row'); 
			    for (var j = 0; j < cal_days_labels.length; j++) { 
				    var $calendarDay = $("<td></td>").attr('class','calendar-day');
				    if (day <= monthLength && (i > 0 || j >= startingDay)) {
				      $calendarDay.append(day);

				      if(day === todayDate && month === calDate.getMonth() && isLabelled === 1){
				      	$calendarDay.addClass('today');
				      	isLabelled++;
				      }
				      if(flag === true){
			    		$calendarDay.css('color','red');
				      }
				      day++;
				    }
				    else {
				    	// day =28;
				    }
				    if(day > monthLength){
				    	day = 1;
				    	flag = true;
				    }
			    	$dayRow.append($calendarDay);
				}
			    $('.calendar-table').append($dayRow);
			}
			var nowMonth = month + 1;
			events(nowMonth,year);
		};
	}; 


	function Calendar(){
		this.init = function(month,year){
			this.year = year;
			this.month = month;
			var that = this;
			this.month = (isNaN(this.month) || this.month == null) ? calDate.getMonth() : this.month;
			this.year  = (isNaN(this.year) || this.year == null) ? calDate.getFullYear() : this.year;
		

			var clickDate = function(){
				var tdList = $('.calendar-table tr td');
				$(tdList).click(function(){
					console.log($(this));
				});	
			};

			fullDateHeader(this.month,this.year);
			showDays();
			var showDate = new ShowNumberDate(this.month, this.year);
			var monthLength = showDate.monthLength();
			var startDay = showDate.getStartDay();	
			var prevMonthLen = showDate.prevMonthLen();
			showDate.printDate(monthLength,startDay, prevMonthLen);
			console.log('this.month.init: ' + this.month);

			buttonMapping(this.month,this.year);
			
			clickDate();  		
		};
	};

	$(document).ready(function(){
		var calendar = new Calendar;
		calendar.init();
	});
})();
