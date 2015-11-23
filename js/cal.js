;(function($){
	'use strict';
	// these are labels for the days of the week
	var cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

	// these are human-readable month name labels, in order
		cal_months_labels = ['January', 'February', 'March', 'April',
	                     	'May', 'June', 'July', 'August', 'September',
	                     	'October', 'November', 'December'],

	// these are the days of the week for each month, in order
		cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		that = this,
		events = [
         			{
         				heading: "Event Heading",
						year: 2015,
						month: 11,
						date: 1
         			},
         			{
         				heading: "Event Heading",
						year: 2015,
						month: 11,
						date: 19
         			},
         			{
         				heading: "Same Day Event",
						year: 2015,
						month: 11,
						date: 19
         			},
         			{
         				heading: "Event2",
						year: 2015,
						month: 11,
						date: 28
         			},
         			{
         				heading: "Event",
						year: 2015,
						month: 12,
						date: 6
         			},
         			{
         				heading: "Event",
						year: 2016,
						month: 1,
						date: 30
         			}
            	],
		calDate = new Date();

	var event = function(nowMonth,nowYear){
		var nowMonth = nowMonth,
			nowYear = nowYear,
			year,
			month,
			heading,
			date,
			$eventObj,
			tdArray = $('.calendar-table tr td');
		for(var i=0; i < events.length; i++){
			heading = events[i].heading;
			year = events[i].year;
			month = events[i].month;
			date = events[i].date;
			if(year === nowYear && month === nowMonth){
				for(var j=0; j<tdArray.length; j++){
					var innerTdValue = parseInt($					//get integer value
													(tdArray[j])	//current table data element
												  	.clone()		//clone the table data so it doesnt get removed
												  	.children()		//get all the children of the table data
												  	.remove()		//remove all the children
												  	.end()			//again go back to selected element
												  	.text()			//get the text for conversion into integer
												);
					if(date === abc && !$(tdArray[j]).hasClass('disabled')){
						$eventObj = $('<span></span>').addClass('event').append(heading);
						console.log('here')
						$(tdArray[j]).addClass('make-relative');
						$(tdArray[j]).prepend($eventObj);
					}
				}
			}
		}
			
			
	};
	/**
	  * @param 
	  * @param 
	  * return [Number] current date
	**/
	var getCurrentDate = function(){
		var calCurrentDate = calDate.getDate();
		return calCurrentDate;
	}

	var changeSelectBoxYear = function(year){
		var year = year;
		$(".year-select option:selected").each(function() {
			if(year === parseInt($(this).val())){
			}
			else{
		    	$(".year-select option").each(function() {
		    	if(parseInt($(this).val()) === year){
		    		$(this).attr('selected','selected');
		    	}
		    	else{
		    		$(this).removeAttr('selected');
		    	}
		    });
		    //buttonMapping(month,year);
			}
		});
	};

	var selectDate = function(month,year){
		var year = year,
		    month = month,
			earliestYear = 2009,
			$optionsYear = [],
			$optionsMonth = [],
			$yearSelect = $('<select></select>').addClass('year-select'),
			$monthSelect = $('<select></select>').addClass('month-select');
		for(var i=0;i<9;i++){
			$optionsYear[i] = $('<option></option>').attr('class','year-option').append(earliestYear);
			if(year === earliestYear){
				$optionsYear[i].attr('selected','selected');
			}
			$yearSelect.append($optionsYear[i]);
			earliestYear++;	
		}
		$('.selector').append($yearSelect);
		for(var i=0; i < cal_months_labels.length ;i++){
			$optionsMonth[i] = $('<option></option>').attr('class','month-option').append(cal_months_labels[i]);
			if(month === i){
				$optionsMonth[i].attr('selected','selected');
			}
			$monthSelect.append($optionsMonth[i]);
		}
		$('.selector').append($monthSelect);

		var selectYear = function(){
			$(".year-select").unbind().change(function() {
			    var str = "";
			    $( ".year-select option:selected" ).each(function() {
			      year = parseInt($(this).val());
			      createCalendarDatas(month,year);
			    });
			      buttonMapping(month,year);
			    console.log('sent to button mapping year: ' +year)
			});	
		};

		var selectMonth = function(){
			$(".month-select").unbind().change(function() {
			    var str = "";
			    $(".month-select option:selected").each(function() {
			      var monthName = $(this).val();
			      for(var i=0; i < cal_months_labels.length; i++){
			      	if(cal_months_labels[i] === monthName){
			      		month = i;
			      	}
			      }
			      createCalendarDatas(month,year);
			    });
			    buttonMapping(month,year);
			});
		};	
		selectYear();
		selectMonth();
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

	var createCalendarDatas = function(month,year){
		var month = month,
			year = year;
		$('.calendar-day').remove();
		$('.day-row').remove();
		fullDateHeader(month,year);
		var calendarDate = new ShowNumberDate(month,year),
			monthLength = calendarDate.monthLength(),
			startDay = calendarDate.getStartDay(),	
			prevMonthLen = calendarDate.prevMonthLen();
		calendarDate.printDate(monthLength,startDay,prevMonthLen);
	};

	var buttonMapping = function(month,year){
		var month = month;
		var year = year;
		$('.today-btn').click(function(){
			var todayMonth = calDate.getMonth(),
				todayYear = calDate.getFullYear();
				createCalendarDatas(todayMonth,todayYear);
			month = todayMonth;
			year = todayYear;
			changeSelectBoxYear(year);
		});

		$('.prev-month').unbind().click(function(){
			if(month > 0){
				var prevMonth = month - 1;
				createCalendarDatas(prevMonth,year);
				month = prevMonth;
			}
			else{
				var prevMonth = 11,
					prevYear = year - 1;
					createCalendarDatas(prevMonth,prevYear);
				month = prevMonth;
				year = prevYear;
				console.log('prev-button-given-year: ' + year);
				changeSelectBoxYear(year);
			}
		});

		$('.next-month').unbind().click(function(){
			if(month < 11){
				var nextMonth = month + 1;
				createCalendarDatas(nextMonth,year);
				month = nextMonth;
			}
			else{
				var nextMonth = 0,
					nextYear = year + 1;
				createCalendarDatas(nextMonth,nextYear);
				month = nextMonth;
				year = nextYear;
				changeSelectBoxYear(year);
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
			    	// var event = checkEvent(date);
			    	// if (event) ?{
			    	// 	//
			    	// }
			    	
		    		var $calendarDay = $("<td></td>").attr('class','calendar-day');
				    if (day <= monthLength && (i > 0 || j >= startingDay)) {
							$calendarDay.append(day);
						if(year === calDate.getFullYear()){
						if(day === todayDate && month === calDate.getMonth() && isLabelled === 1){
								$calendarDay.addClass('today');
								isLabelled++;
							}
						}
				     
						if(flag === true){
							$calendarDay.addClass('disabled');
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
			event(nowMonth,year);
		};
	}; 


	$.fn.Calendar = function(){
		$.fn.Calendar.init = function(month,year){
			this.year = year;
			this.month = month;
			var that = this;
			this.month = (isNaN(this.month) || this.month == null) ? calDate.getMonth() : this.month;
			this.year  = (isNaN(this.year) || this.year == null) ? calDate.getFullYear() : this.year;
		

			var clickDate = function(){
				var tdList = $('.calendar-table tr td');
				$(tdList).click(function(){
				});	
			};

			fullDateHeader(this.month,this.year);
			/*Select options for both month and year*/
			selectDate(this.month,this.year);
			showDays();
			createCalendarDatas(this.month,this.year);
			buttonMapping(this.month,this.year);
			clickDate();  		
		};
	};

})(jQuery);
