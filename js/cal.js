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

	var changeSelectBoxYear = function(year){
		var year = year;
		 // $( ".year-select option:selected" ).each(function() {
		 // 	console.log('current: ' + $('.year-select option:selected').val() + 'provided: ' + year);
		 //      if($('.year-select option:selected').val() < year){
		 //      	$(this).removeAttr('selected');
		 //      	$(this).next().attr('selected','selected');
		 //      }
		 //      if($('.year-select option:selected').val() > year){
		 //      	$(this).removeAttr('selected');
		 //      	$(this).prev().attr('selected','selected');
		 //      }
	  //   });
	};

	var selectYear = function(month,year){
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

		$(".year-select").change(function() {
		    var str = "";
		    $( ".year-select option:selected" ).each(function() {
		      year = parseInt($(this).val());
		      createCalendarDatas(month,year);
		    });
		    buttonMapping(month,year);
		})

		$(".month-select").change(function() {
		    var str = "";
		    $( ".month-select option:selected" ).each(function() {
		      var monthName = $(this).val();
		      console.log($(this).val());
		      for(var i=0; i < cal_months_labels.length; i++){
		      	if(cal_months_labels[i] === monthName){
		      		month = i;
		      	}
		      }
		      createCalendarDatas(month,year);
		    });
		    buttonMapping(month,year);
		})
	 	.trigger( "change" );
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
		});

		$('.prev-month').click(function(){
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
				changeSelectBoxYear(year);
			}
		});

		$('.next-month').click(function(){
			if(month < 11){
				var nextMonth = month + 1;
				createCalendarDatas(nextMonth,year);
				month = nextMonth;
			}
			else{
				var nextMonth = 0,
					nextYear = year + 1;
					console.log('Next Year: ' + nextYear);
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
				      console.log('year sdfs '+year)
				      if(year === calDate.getFullYear()){
				    	if(day === todayDate && month === calDate.getMonth() && isLabelled === 1){
				      		$calendarDay.addClass('today');
				      		isLabelled++;
				     	}
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
					console.log($(this));
				});	
			};

			fullDateHeader(this.month,this.year);
			selectYear(this.month,this.year);
			showDays();
			createCalendarDatas(this.month,this.year);
			buttonMapping(this.month,this.year);
			clickDate();  		
		};
	};

})(jQuery);
