
/* - calendarUtils.js - */
﻿//Javascript that handles all calendar funcionallity
var calendarUtils = {
    minHeight: 0,
    //initialize the calendar
    init: function () {

        this.initEvents();

        umcoe.updateFilters();

        $(window).trigger('hashchange');
    },
    initEvents: function () {
        $(window).bind('hashchange', calendarUtils.handleHashChange);
        $(".calendar").delegate(".minDetails", "click", function (e) {
            var $this = $(this);
            //if event is not on inactive day      
            if (!$this.closest("td").hasClass("inactive")) {
                $(".fullDetails").each(function () {
                    $(this).slideUp().css("z-index", 0);
                    $(".eventBlock").css("z-index", 0);
                    $("td").css("z-index", 0);
                });
                $this
                    .siblings(".fullDetails")
                    .css("z-index", 99)
                    .slideDown();
                $this.closest(".eventBlock")
                    .css("z-index", 99);
                $this.closest("td")
                    .css("z-index", 99);
            }
        });
        $("a.closeDetails").live("click", function (e) {
            var $eventBlock = $(this).parent();
            e.preventDefault();
            $eventBlock
                .slideUp()
                .css("z-index", 0);
            $eventBlock.closest(".eventBlock")
                .css("z-index", 0);
            $eventBlock.closest("td")
                .css("z-index", 0);
            return false;
        });

        //More Results event
        $("a.resultsLink").click(calendarUtils.getMoreResults);

        this.setupAjaxEvents();
    },
    handleHashChange: function (e) {
        var wsData = {},
            frag = $.deparam.fragment(),
            qs = $.deparam.querystring();

        wsData = Object.keys(frag).length ? frag :
                Object.keys(qs).length ? qs : {};

        if ($(".calendarMonth").length) {
            umcoe.getJSONdata(webserviceUrl, wsData, calendarUtils.processMonthJSONdata);
        }
        if ($(".calendarWeek").length) {
            umcoe.getJSONdata(webserviceUrl, wsData, calendarUtils.processWeekJSONdata);
        }
        if ($(".calendarList").length) {
            umcoe.getJSONdata(webserviceUrl, wsData, calendarUtils.processListJSONdata);
        }
    },
    initParseLinks: function () {
        $("a.dayLink").each(function () {
            var classArray = $(this).closest(".day").attr("class").split(" "),
                dateArray = classArray[1] !== "currentDay" ? classArray[1].split("_") : classArray[2].split("_"),
                month = dateArray[1] * 1,
                year = dateArray[3] * 1,
                week = calendarUtils.getWeekofMonth(month, dateArray[2] * 1, year),
                $day = calendarUtils.getFDOWFromWeek(year, month - 1, week);
            this.href = weekUrl + "?date=" + $day.getFullYear() + "/" + ($day.getMonth() + 1) + "/" + $day.getDate() + "&week=" + week;
        });
    },
    // Ajax events
    setupAjaxEvents: function () {
        // Calendar Month events
        if ($(".calendarMonth").length) {
            $("#calendarNav").delegate("a", "click", calendarUtils.getNewMonth);
            $("#calendarFilter").delegate("select", "change", calendarUtils.filterChangeMonth);
            $("#searchEvents .icon").click(calendarUtils.searchMonthEvents);
            $("#searchEvents input").bind("focus blur", umcoe.toggleSearchPrompt);
            $("#searchEvents input").bind("keyup", function (e) { if (e.keyCode == "13") { $("#searchEvents .icon").click(); } });
        }
        // Calendar Week events
        if ($(".calendarWeek").length) {
            $("#calendarNav").delegate("a", "click", calendarUtils.getNewWeek);
            $("#calendarFilter").delegate("select", "change", calendarUtils.filterChangeWeek);
            $("#searchEvents .icon").click(calendarUtils.searchWeekEvents);
            $("#searchEvents input").bind("focus blur", umcoe.toggleSearchPrompt);
            $("#searchEvents input").bind("keyup", function (e) { if (e.keyCode == "13") { $("#searchEvents .icon").click(); } });
        }
        // Calendar List events
        if ($(".calendarList").length) {
            $("#calendarNav").delegate("a", "click", calendarUtils.getNewMonth);
            $("#calendarFilter").delegate("select", "change", calendarUtils.filterChangeMonth);
            $("#searchEvents .icon").click(calendarUtils.searchMonthEvents);
            $("#searchEvents input").bind("focus blur", umcoe.toggleSearchPrompt);
            $("#searchEvents input").bind("keyup", function (e) { if (e.keyCode == "13") { $("#searchEvents .icon").click(); } });
        }
    },
    getMoreResults: function (e) {
        var wsData = {},
            frag = $.deparam.fragment(),
            qs = $.deparam.querystring();

        wsData = Object.keys(frag).length ? frag :
                Object.keys(qs).length ? qs : {};

        wsData["set"] = "more";

        e.preventDefault();

        calendarUtils.moreResults = true;
        umcoe.getJSONdata(webserviceUrl, wsData, calendarUtils.processListJSONdata);
    },
    getNewMonth: function (e) {
        var $this = $(this),
            monthToGet = $this.attr("href").split("#").length > 1 ? $this.attr("href").split("#")[1] : "date=" + $this.attr("rel"),
            mData = {};

        e.preventDefault();

        if (monthToGet.length && monthToGet.indexOf("=") !== -1) {
            mData[monthToGet.split("=")[0]] = monthToGet.split("=")[1];
        }

        $.bbq.pushState(mData);
    },
    filterChangeMonth: function (e) {
        var filter = this.id,
            filterValue = $(this).val(),
            date = $("#currentMonth").attr("rel"),
            urlDate = $.bbq.getState("date"),
            mData = {};

        e.preventDefault();

        if (filterValue !== "") {
            mData["date"] = (date != null && date !== urlDate) ? date : (urlDate != null) ? urlDate : undefined;
            mData[filter] = filterValue;
            $.bbq.pushState(mData);
        } else {
            $.bbq.removeState(filter);
        }
    },
    getNewWeek: function (e) {
        var $this = $(this),
            weekToGet = $this.attr("href").split("#").length > 1 ? $this.attr("href").split("#")[1] : "date=" + $this.attr("rel"),
            urlDate = $.bbq.getState("date"),
            mData = {};

        e.preventDefault();

        if (weekToGet.length && weekToGet.indexOf("=") !== -1) {
            mData[weekToGet.split("=")[0]] = weekToGet.split("=")[1];
        } else if (urlDate != null) {
            mData["date"] = urlDate;
        }
        if (mData["date"] != null) { $.bbq.pushState(mData); }
    },
    filterChangeWeek: function (e) {
        var filter = this.id,
            filterValue = $(this).val(),
            date = $("#currentWeek").attr("rel"),
            urlDate = $.bbq.getState("date"),
            mData = {};

        e.preventDefault();

        if (filterValue !== "") {
            mData["date"] = (date != null && date !== urlDate) ? date : (urlDate != null) ? urlDate : undefined;
            mData[filter] = filterValue;
            $.bbq.pushState(mData);
        } else {
            $.bbq.removeState(filter);
        }
    },
    searchMonthEvents: function (e) {
        var searchText = $(this).siblings("input").val(),
            date = $("#currentMonth").attr("rel"),
            urlDate = $.bbq.getState("date"),
            mData = {};

        e.preventDefault();

        mData["date"] = (date != null && date !== urlDate) ? date : (urlDate != null) ? urlDate : undefined;
        mData["q"] = searchText;

        $.bbq.pushState(mData);
    },
    searchWeekEvents: function (e) {
        var searchText = $(this).siblings("input").val(),
            date = $("#currentWeek").attr("rel"),
            urlDate = $.bbq.getState("date"),
            mData = {};

        e.preventDefault();

        mData["date"] = (date != null && date !== urlDate) ? date : (urlDate != null) ? urlDate : undefined;
        mData["q"] = searchText;

        $.bbq.pushState(mData);
    },
    //get the JSON data
    processMonthJSONdata: function (data) {
        //clear days in calendar to prep for data
        calendarUtils.clearCal();
        //get current month/year and set calendar framework
        calendarUtils.drawMonthHeader(data.month - 1, data.year);
        calendarUtils.drawCalendar(data.month - 1, data.year);
        //for each event in the object, populate calendar
        $.each(data.events, function () {
            calendarUtils.drawEvent(this);
        });

        umcoe.trimString(".minDetails p b", 30);
        umcoe.trimString(".minDetails p span", 30);
        calendarUtils.initParseLinks();
        calendarUtils.updateWeekListLinks(data.month, data.year);
    },
    updateWeekListLinks: function (month, year) {
        var fdow = calendarUtils.getFDOWFromWeek(year, month - 1, 1),
            $monthLink = $("#monthView"),
            $weekLink = $("#weekView"),
            $listLink = $("#listView"),
            mnHref = $monthLink.attr("href"),
            wvHref = $weekLink.attr("href"),
            lvHref = $weekLink.attr("href"),
            hrefDate,
            today = new Date();

        // Is current month?
        if (today.getMonth() === month - 1) {
            fdow = calendarUtils.getFDOWFromWeek(
                       today.getFullYear(), 
                       today.getMonth(), 
                       calendarUtils.getWeekofMonth(today.getMonth()+1, today.getDate(), today.getFullYear())
                   );
        }
        calendarUtils.updateViewLinks((fdow.getMonth()+1), fdow.getDate(), fdow.getFullYear());
    },
    //get the JSON data
    processWeekJSONdata: function (data) {
        var fdow = calendarUtils.getFDOWFromWeek(data.year, data.month - 1, data.week),
            monthToShow = data.month;
        //clear days in calendar to prep for data
        calendarUtils.clearCal();
        //get current month/year and set calendar framework
        calendarUtils.drawWeekHeader(fdow.getMonth(), fdow.getFullYear(), fdow.getDate());
        calendarUtils.drawWeek(fdow.getMonth(), fdow.getFullYear(), fdow.getDate());
        //for each event in the object, populate calendar
        $.each(data.events, function () {
            calendarUtils.drawEvent(this);
        });
        $(".calendarWeek .day").css("height", calendarUtils.minHeight.toString() + 'px');
        if (data.week == 1 && fdow > 20) {
            monthToShow = fdow.getMonth() + 2;
        } else {
            monthToShow = fdow.getMonth() + 1;
        }
        umcoe.trimString(".minDetails p b", 30);
        umcoe.trimString(".minDetails p span", 30);
        calendarUtils.updateViewLinks(monthToShow, fdow.getDate(), fdow.getFullYear());
    },
    // Flag to determine if this is the initial pass on page
    moreResults: false,
    //get the JSON data
    processListJSONdata: function (data) {
        if (!calendarUtils.moreResults) {
            //clear days in calendar to prep for data
            calendarUtils.clearListEvents();

            //populate header
            calendarUtils.drawMonthHeader(data.month - 1, data.year);

            calendarUtils.moreResults = false;
            calendarUtils.updateViewLinks(data.month, 1, data.year);
        }

        //Render the events list
        $.each(data.events, function () {
            var theHTML = $("#eventListItem").render(this);
            if ($(".moreResults").length) {
                $(".moreResults").before(theHTML);
            } else {
                $(".eventListing").append(theHTML);
            }
        });
        //set styles for first and last
        calendarUtils.updateFirstLastEvent();

        //Add blank target for external links
        calendarUtils.updateExternalLinks();

        //Update blue box images with trimmed article titles
        umcoe.trimString(".trimmed", 70);

        //Reload the addthis javascript so it can update the newly rendered social buttons
        umcoe.reloadAddThis();
    },
    clearCal: function () {
        $(".day").html("").attr("class", "day").closest("td").removeClass("inactive");
        if ($(".calendarWeek").length) {
            $(".day").height("auto");
            calendarUtils.minHeight = 0;
        }
        $(".currentDay").removeClass("currentDay");
    },
    clearListEvents: function () {
        var mr = $(".moreResults").detach();

        $(".eventListing").html("").append(mr);
    },
    updateViewLinks: function (m, d, y) {
        // update view links with current month on changes
        $("#monthView, #weekView, #listView").each(function () {
            var $this = $(this),
                orgHref = $this.attr("href"),
                strippedHref = orgHref.length ? orgHref.split("?")[0] : orgHref;
            $this.attr("href", strippedHref + "?date=" + y + "/" + m + "/" + d);
        });
    },
    // Update external links
    updateExternalLinks: function () {
        $(".eventListing .item a.articleLink[href^='http']").attr("target", "_blank");
    },
    getFDOWFromWeek: function (y, m, w) {
        var d, baseDay,
            adjW = w,
            fdowOffset = 0,
            mon = m,
            year = y,
            firstWeekDayOfMon = new Date(year, mon, 1).getDay(),
            daysInMonth = new Date(year, mon + 1, 0).getDate(),
            firstWeekday = new Date(y, m, 1).getDay();

        if (w < 1) { adjW = 1; }
        if (w > 5) {
            if ((firstWeekDayOfMon > 4 && daysInMonth > 30) || (firstWeekDayOfMon > 5 && daysInMonth >= 30)) {
                adjW = 6;
            } else {
                adjW = 5;
            }
        }
        d = (adjW * 7) - firstWeekday;
        baseDay = new Date(year, mon, d);
        fdowOffset = baseDay.getDate() - baseDay.getUTCDay();

        if (fdowOffset < 0 && adjW !== 1) { mon += 1; }
        if (mon === 0) { mon = 12 - mon; year -= 1; }
        return new Date(year, mon, fdowOffset);
    },
    getWeekofMonth: function (m, d, y) {
        // passed month, day, year (month passed should NOT be zero-based)
        // returns week of the month that day falls in, 1 = first week
        return Math.floor((d + new Date(y, m - 1, 1).getDay() - 1) / 7) + 1;
    },
    drawMonthHeader: function (m, y) {
        var dispMon = m * 1 + 1,
            prevMon = dispMon - 1 < 1 ? 12 : dispMon - 1,
            prevYear = dispMon - 1 < 1 ? y * 1 - 1 : y,
            nextMon = dispMon + 1 > 12 ? 1 : dispMon + 1,
            nextYear = dispMon + 1 > 12 ? y * 1 + 1 : y;
        //populate current month header
        var month = calendarUtils.convertMonthToString(m).longName;
		
        $("#calendarNav span#currentMonth").text("qwqqw").attr("rel", y + "/" + dispMon + "/1");

        var previousMonth = new Date();
        previousMonth.setFullYear(y, m - 1, 1);
        month = calendarUtils.convertMonthToString(previousMonth.getMonth()).shortName;
        //populate previous arrow
        $("#calendarNav a#prevMonth span").text(month).closest("a").attr(
            { "rel": y + "/" + (dispMon - 1) + "/1", "href": location.href.split("#")[0] + "#date=" + prevYear + "/" + prevMon + "/1" });

        var nextMoth = new Date();
        nextMoth.setFullYear(y, m + 1, 1);
        month = calendarUtils.convertMonthToString(nextMoth.getMonth()).shortName;
        //populate next arrow
        $("#calendarNav a#nextMonth span").text(month).closest("a").attr(
            { "rel": y + "/" + (dispMon + 1) + "/1", "href": location.href.split("#")[0] + "#date=" + nextYear + "/" + nextMon + "/1" });

    },

    drawWeekHeader: function (m, y, d) {
        //find day of week for 1st event in the data
        var startDate = new Date(y, m, d),
            endDate = new Date(),
            prevStartDate = new Date(),
            prevEndDate = new Date(),
            nextStartDate = new Date(),
            nextEndDate = new Date(),
            fdow,
            prevYear = m * 1 - 1 < 1 ? y * 1 - 1 : y,
            nextYear = m * 1 + 1 > 12 ? y * 1 + 1 : y;

        //find first day of week
        fdow = startDate.getDate() - startDate.getUTCDay();
        //find last day of week
        endDate.setFullYear(y, m, fdow + 6);

        //populate current week header
        $("#calendarNav span#currentWeek").text(
            calendarUtils.convertMonthToString(m).shortName + " " + fdow + " - " +
            calendarUtils.convertMonthToString(endDate.getMonth()).shortName + " " +
            endDate.getDate()
        ).attr(
            { "rel": y + "/" + (startDate.getMonth() + 1) + "/" + fdow }
        );

        //populate previous week link
        prevStartDate.setFullYear(y, m, fdow - 7);
        prevEndDate.setFullYear(y, prevStartDate.getMonth(), prevStartDate.getDate() + 6);
        $("#calendarNav #prevWeek span").text(
            (prevStartDate.getMonth() + 1) + "/" + prevStartDate.getDate() + " - " +
            (prevEndDate.getMonth() + 1) + "/" + prevEndDate.getDate()
        ).closest("a").attr(
            { "rel": prevYear + "/" + (prevStartDate.getMonth() + 1) + "/" + prevStartDate.getDate(),
                "href": location.href.split("#")[0] + "#date=" + prevYear + "/" + (prevStartDate.getMonth() + 1) + "/" + prevStartDate.getDate()
            }
        );

        //populate next week link
        nextStartDate.setFullYear(y, m, fdow + 7);
        nextEndDate.setFullYear(y, nextStartDate.getMonth(), nextStartDate.getDate() + 6);
        $("#calendarNav #nextWeek span").text(
            (nextStartDate.getMonth() + 1) + "/" + nextStartDate.getDate() + " - " +
            (nextEndDate.getMonth() + 1) + "/" + nextEndDate.getDate()
        ).closest("a").attr(
            { "rel": nextYear + "/" + (nextStartDate.getMonth() + 1) + "/" + nextStartDate.getDate(),
                "href": location.href.split("#")[0] + "#date=" + nextYear + "/" + (nextStartDate.getMonth() + 1) + "/" + nextStartDate.getDate()
            }
        );
    },

    //draw the calendar days for the current month
    drawCalendar: function (m, y) {
        //get number of days in the month
        var totalDays = calendarUtils.getDaysInCurrentMonth(y, m),
        //find day of week for 1st day of the month
            startDate = new Date(y, m, 1),
            firstWeekday = startDate.getUTCDay(),
            i, x, d, start, lastCell;

        //previous month
        //draw days
        x = 1;
        for (i = firstWeekday; i > 0; i--) {
            d = new Date();
            d.setFullYear(y, m, startDate.getDate() - x);
            calendarUtils.drawDay(i, d, false);
            x += 1;
        }

        //current month
        //draw days
        x = 0;
        start = firstWeekday + 1;
        for (i = start; i <= totalDays + start - 1; i++) {
            d = new Date();
            d.setFullYear(y, m, startDate.getDate() + x);
            calendarUtils.drawDay(i, d, true);
            x += 1;
        }

        //next month
        //find last cell of calendar
        lastCell = totalDays + start - 1;
        if (lastCell > 35) {
            lastCell = 42;
            //if week 6 is needed, show it
            $('#week6').show();
        }
        else {
            lastCell = 35;
            //if week 6 is not needed, hide it
            $('#week6').hide();
        }
        //draw days
        x = 1;
        for (i = totalDays + start; i <= lastCell; i++) {
            d = new Date();
            d.setFullYear(y, m, totalDays + x);
            calendarUtils.drawDay(i, d, false);
            x += 1;
        }


    },

    drawDay: function (cell, date, active) {
        var curDate = Date();
        if (date == curDate) {
            $("#cell" + cell + " .day").addClass("currentDay");
        }
        $("#cell" + cell + " .day").append("<h2><a class='dayLink' title='view current week' href='#'>" + date.getDate() + "</a></h2>");
        $("#cell" + cell + " .day").addClass("date_" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getFullYear());
        if (!active) {
            $("#cell" + cell).addClass("inactive");
        }

    },

    //draw the current week
    drawWeek: function (m, y, dy) {
        //find day of week for 1st event in the data
        var startDate = new Date(y, m, dy),
            d, fdow, i;

        //find first day of week
        fdow = startDate.getDate() - startDate.getUTCDay();

        //draw days  
        for (i = 1; i <= 7; i++) {
            d = new Date();
            d.setFullYear(y, m, fdow);
            calendarUtils.drawDay(i, d, true);
            fdow += 1;
        }

    },

    //draw an event on the calendar
    drawEvent: function (event) {
        var $day = $(".date_" + event.month + "_" + event.day + "_" + event.year),
            theHTML,
            week = calendarUtils.getWeekofMonth(event.month, event.day, event.year),
            $fdow = calendarUtils.getFDOWFromWeek(event.year, event.month - 1, week);
        //check if day already has 3 events (the max displayed)
        //if so, add more button
        if ($day.find(".eventBlock").length >= 3 && $(".calendarMonth").length > 0) {
            if ($day.find(".moreLink").length === 0) {
                //create event link if it doesn't exist
                event.month = $fdow.getMonth() + 1;
                event.year = $fdow.getFullYear();
                event.day = $fdow.getDate();
                theHTML = $("#moreLinkTemplate").render(event);
                $day.append(theHTML.replace("{|weekUrl|}", weekUrl).replace("{|week|}", week));
                return;
            }
            else {
                return;
            }
        }

        //using jsrender template on the HTML page, render the html to the event
        theHTML = $("#eventTemplate").render(event);

        //add event div to the day
        $day.append(theHTML);

        if ($day.height() > calendarUtils.minHeight) {
            calendarUtils.minHeight = $day.height();
        }
        return;
    },
    showDetails: function ($div) {
        $div.addClass("showDetails");

    },

    //Update first and last article
    updateFirstLastEvent: function () {
        $(".eventListing .item.last").removeClass("last");
        $(".item").first().addClass("first");
        $(".item").last().addClass("last");
    },

    //returns the total number of days in the month
    getDaysInCurrentMonth: function (y, m) {
        return new Date(y, m + 1, 0).getDate();
    },

    //returns the total number of days in the previous month
    getDaysInPreviousMonth: function (y, m) {
        var prevoiusMonth = m - 1;
        //if the current month is Jan (0), then set the year to the previous year
        var prevoiusYear = y;
        if (m === 0) {
            prevoiusMonth = 11;
            prevoiusYear = y - 1;
        }
        return new Date(prevoiusYear, prevoiusMonth, 0).getDate();
    },
    convertMonthToString: function (m) {
        //var months = ['Jan'];
        //return months[m];

        var months = [{ "longName": "January", "shortName": "Jan" },
                        { "longName": "February", "shortName": "Feb" },
                        { "longName": "March", "shortName": "Mar" },
                        { "longName": "April", "shortName": "Apr" },
                        { "longName": "May", "shortName": "May" },
                        { "longName": "June", "shortName": "Jun" },
                        { "longName": "July", "shortName": "Jul" },
                        { "longName": "August", "shortName": "Aug" },
                        { "longName": "September", "shortName": "Sept" },
                        { "longName": "October", "shortName": "Oct" },
                        { "longName": "November", "shortName": "Nov" },
                        { "longName": "December", "shortName": "Dec" }
                        ];

        return months[m];

    }
};



$(function() {
    calendarUtils.init();
});
