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
         				heading: "Event1",
						startDay: "2015-11-19",
						endDay: "2015-11-20",
						label: 1
         			},
         			{
         				heading: "Event2",
         				startDay: "2015-11-19",
         				endDay: "2015-11-25",
         				label: 2
         			},
         			{
         				heading: "Event3",
         				startDay: "2015-11-25",
         				endDay: "2015-11-28",
         				label: 2
         			},
         			{
         				heading: "Event4",
         				startDay: "2015-11-26",
         				endDay: "2015-11-29",
         				label: 1
         			},
         			{
         				heading: "Event4",
         				startDay: "2015-11-28",
         				endDay: "2015-11-30",
         				label: 3
         			}
         	
            	],
		calDate = new Date();

	function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
		// b starts in a
	    if (a_start <= b_start && b_start <= a_end) {return true;}	
	    // b ends in a
	    if (a_start <= b_end   && b_end   <= a_end) {return true;}
		// a in b
	    if (b_start <=  a_start && a_end   <=  b_end) {return true;}
	  return false;  
	};

	function multipleDateRangeOverlaps() {
	    if (dateRangeOverlaps(27, 30,20, 30)){
	    	//return true;
        	console.log('true');
	    }
	    for(var i=0; i<events.length; i++){
	    	var startDate = events[i].startDay,
				splitStartDate = new splitDate(startDate),
				a_start = splitStartDate.date;

			var endDate =events[i].endDay,
				splitEndDate = new splitDate(endDate),
				a_end = splitEndDate.date;

			var startDate2 = $(events[i+1]).startDay,
				splitStartDate2 = new splitDate(startDate),
				b_start = splitStartDate2.date;

			var endDate2 = $(events[i+1]).endDay,
				splitEndDate2 = new splitDate(endDate),
				b_end = splitEndDate2.date;

	    	if(dateRangeOverlaps(a_start, a_end, b_start, b_end)){
	    		events[i].label = 1;
	    		$(events[i+1]).label = 2;
	    	}
	    	else{
	    		events[i].label = 1;
	    		$(events[i+1]).label = 1;
	    	}
	    }
	};

	/**
		* Splits the date entered in the hash map seperated by a '-'
	  	* @param full date seperated by '-'
	  	* return [Number] splited year, month and date objects
	**/
	var splitDate = function(fullDate){
		var fullDate = fullDate,
			splitDate = fullDate.split("-"),
			year = parseInt(splitDate[0]),
			month = parseInt(splitDate[1]),
			date = parseInt(splitDate[2]);
			return {
				year : year,
				month : month,
				date : date
			}
	};

	var event = function(nowMonth,nowYear){
		var nowMonth = nowMonth,
			nowYear = nowYear,
			heading,
			$eventObj = [],
			counter = 1,
			tdArray = $('.calendar-table tr td');
				
			for(var i=0; i<tdArray.length; i++){
				for(var eventIndex = 0; eventIndex < events.length; eventIndex++){
					heading = events[eventIndex].heading;
					var startDate = events[eventIndex].startDay,
						splitStartDate = new splitDate(startDate),
						startYear = splitStartDate.year,
						startMonth = splitStartDate.month,
						startDate = splitStartDate.date;

					var endDate =events[eventIndex].endDay,
						splitEndDate = new splitDate(endDate),
						endYear = splitEndDate.year,
						endMonth = splitEndDate.month,
						endDate = splitEndDate.date;
					if(startYear === nowYear && startMonth === nowMonth){
					//innerTdValue gives numeric value inside the tds ignoring all other elements
					var innerTdValue = parseInt(				//get integer value
												$(tdArray[i])	//current table data element
											  	.clone()		//clone the table data so it doesnt get removed
											  	.children()		//get all the children of the table data
											  	.remove()		//remove all the children
											  	.end()			//again go back to selected element
											  	.text()			//get the text for conversion into integer
												);

					if(startDate === innerTdValue && !$(tdArray[i]).hasClass('disabled')){
						var flag = 1;
						var temp = i;
						var counterLength = 2;
						for (var k = startDate; k <= endDate; k++){
							//debugger;
							if(flag === 1){
								$eventObj[eventIndex] = $('<span></span>').addClass('event event'+ eventIndex).append(heading);
								$eventObj[eventIndex].css('border-radius','12px 0 0 12px');
								flag++;
							}
							else{
								$eventObj[eventIndex] = $('<span></span>').addClass('event event'+ eventIndex);
								if(k === endDate){
									$eventObj[eventIndex].css('border-radius','0 12px 12px 0');
								}
							}
							if(events[eventIndex].label === 1){
								$eventObj[eventIndex].css('top','0px');
								$(tdArray[i]).prepend($eventObj[eventIndex]);
							}
							else if(events[eventIndex].label === 2){
								$eventObj[eventIndex].css('top','24px');
								$(tdArray[i]).prepend($eventObj[eventIndex]);
							}
							else{
								var showMoreBtn = $('<a></a>').addClass('show-more-btn fa fa-eye').attr('title','View All Events');
								$(tdArray[i]).prepend(showMoreBtn);
							}
							i++;
						}
						counter++;	
						i = temp;
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
			    	
		    		var $calendarDay = $("<td></td>").attr('class','calendar-day').attr('data-slot','unoccupied');
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
			//multipleDateRangeOverlaps();  

			// $('.event').each(function(i){
			// 	$(this).click(function(){
			// 		console.log($('.event1').html());
			// 	})
			// });	
		};
	};

}(jQuery));
