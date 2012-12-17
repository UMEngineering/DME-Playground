// JavaScript Document
$(document).ready(function() {
    umcoe.init();
	$(".c1Image").each(function(index, element) {
        $(this).css("background", "url("+$(this).children("img").attr("src")+")");
		$(this).append("<div class='play-button'><span style='opacity: 0;'>1</span></div>");
    });
	$(".c1Image img").remove();
	$(".c1Image").css({"width" : "141px", "height" : "109px"});
	$(".play-button").css({"width" : "141px", "height" : "109px", "background" : "url(img/map-play-arrow.png) center no-repeat"});
	/*var ytid = "phJDxXI9Dqk";
	$("#promoYoutube").html("<a class='youtube-lazy-link' href='http://www.youtube.com/watch?v="+ytid+"'></a>");
	
	$("a.youtube-lazy-link").each(function(index) {
		var embedparms = $(this).attr("href").split("/embed/")[1];
		if(!embedparms) embedparms = $(this).attr("href").split("?v=")[1].replace(/\&/,'?');
		var youid = embedparms.split("?")[0].split("#")[0];
		var start = embedparms.match(/[#&]t=(\d+)s/);
		if(start) start = start[1];
		else {
			start = embedparms.match(/[#&]t=(\d+)m(\d+)s/);
			if(start) start = parseInt(start[1])*60+parseInt(start[2]);
			else {
				start = embedparms.match(/[?&]start=(\d+)/);
			if(start) start = start[1];
		  }
		}
		embedparms = embedparms.split("#")[0];
		if(start && embedparms.indexOf("start=") == -1)
		  embedparms += ((embedparms.indexOf("?")==-1) ? "?" : "&") + "start="+start;
		if(embedparms.indexOf("showinfo=0") != -1)
		  $(this).html('');
		$(this).prepend('<div class="youtube-lazy-link-div"></div>&nbsp;')
		$(this).css("background", "#000 url(http://i2.ytimg.com/vi/"+youid+"/0.jpg) center no-repeat");
		$(this).css("background-size", "180%");
		$(this).attr("id", youid);
		$(this).attr("href", "http://www.youtube.com/watch?v="+youid+(start ? "#t="+start+"s" : ""));
		var emu = 'http://www.youtube.com/embed/'+embedparms;
		emu += ((emu.indexOf("?")==-1) ? "?" : "&") + "autoplay=1";
		var videoFrame = '<iframe width="'+parseInt($(this).css("width"))+'" height="'+parseInt($(this).css("height"))+'" style="vertical-align:top;" src="'+emu+'" frameborder="0" allowfullscreen></iframe>';
		$(this).attr("onclick", "$('#"+youid+"').replaceWith('"+videoFrame+"'); $('.youtubeinfo').css('display', 'none'); return false;");
	});
		*/
});


/* - scripts.js - */
var umcoe = {
    init: function () {
        var carouselNum;

        // Fix jQuery < v1.7.1 to remove console logging regarding deprecated layerX/layerY
        $.event.props = $.event.props.join('|').replace('layerX|layerY|', '').split('|');

        // Setup log() function to use instead of console.log()
        this.fixLog();

        // Check if you can get Object.keys(obj) and if not, fix it        
        this.fixObj();

        this.setupEvents();
        this.setupNavDropdowns();
        this.setupSideNav();
        this.setupChangeRoleDropdown();
        this.addAccessibility();
        if ($(document.body).hasClass("primaryLanding") && typeof slideShowImgs !== "undefined" && slideShowImgs.length) {
            this.setupSupersizedPrimaryLanding();
        }
        if ($(".carouselFull").length) {
            if ($(".thinCol").length) { carouselNum = 3; }
            if ($(".wideCol").length) { carouselNum = 4; }
            this.setupCarousels(".carouselFull .carousel", carouselNum);
        }
        if ($(".carouselSingle").length) {
            carouselNum = 1;
            this.setupCarousels(".carouselSingle .carousel", carouselNum);
        }
        if ($(document.body).hasClass("eventDetail")) {
            this.setupMoreLink();
        }
        if ($(document.body).hasClass("faqs")) {
            this.setupFAQToggle();
        }
        if ($(document.body).hasClass("form")) {
            this.enableValidation($("#form1").get(0));
        }
        if ($(document.body).hasClass("hasBreadcrumbs")) {
            $(document.body).css("background-position", "0 112px");
        }
        if ($(document.body).hasClass("search")) {
            this.setupSearch();
        }
    },
    setupEvents: function () {
        $("#utility .search a").click(function (e) {
            var searchQuery = $(this).siblings("input").val();

            e.preventDefault();

            if (searchQuery.length) {
                window.location = this.href + "?q=" + encodeURI(searchQuery);
            } else {
                alert("Please enter a search query.");
            }
        });
        $("#utility .search input").keypress(function (e) {
            var searchQuery = $(this).val();
            if (e.keyCode === 13) {
                if (searchQuery.length) {
                    window.location = $(this).siblings("a").attr("href") + "?q=" + encodeURI(searchQuery);
                } else {
                    alert("Please enter a search query.");
                }
            }
        });
        $("#mainBar .current > a, #sideNav .current > a, #breadcrumbs .last > a").click(function (e) {
            e.preventDefault();
        });
        $(".lbClose").click(function () {
            parent.$.colorbox.close();
            return false;
        });
        if ($.fn.colorbox) {
            $(".cbxVideo").colorbox({ inline: true, width: "748" });
        }
    },
    setupNavDropdowns: function () {
        var hiConfig = {
            over: function () {
                $(this).siblings().removeClass("jsHover").end().addClass("jsHover");
            },
            timeout: 500,
            out: function () {
                $(this).removeClass("jsHover");
            }
        };
        $("#mainBar > ul > li").hoverIntent(hiConfig);
    },
    setupChangeRoleDropdown: function () {
        var hiConfig = {
            over: function () {
                $(this).addClass("jsHover");
            },
            timeout: 500,
            out: function () {
                $(this).removeClass("jsHover");
            }
        };
        $("#utility li").hoverIntent(hiConfig);
        umcoe.setGetRoleCookie();
    },
    setGetRoleCookie: function () {
        if ($.cookie("role") != null) {
            if ($("#roleFilter").length) { $("#roleFilter").val($.cookie("role")); }
            if ($("li.role span").length) { $("li.role span").text($.cookie("role")); }
            if ($("li.role span").length) { $("li.role").children("a").eq(0).text("Change Role"); }
        }
        else {
            if ($("li.role span").length) { $("li.role").children("a").eq(0).text("Select Role"); }
        }
        if ($(".role > a").length) {
            $(".role > a").click(function (e) {
                e.preventDefault();
            });
        }
        if ($("#roleFilter").length) {
            $("#roleFilter").change(umcoe.handleFilterContentChange);
        }
        if ($(".role ul a").length) {
            $(".role ul a").click(umcoe.handleRoleMenuClick);
        }
    },
    handleFilterContentChange: function (e) {
        if ($("#roleFilter").prop("selectedIndex") > 0 && $("#roleFilter").val().length) {
            $.cookie("role", $("#roleFilter").val(), { path: "/" });
            $("li.role span").text($("#roleFilter").val());
            $("li.role").children("a").eq(0).text("Change Role");
            location.reload();
        }
    },
    handleRoleMenuClick: function (e) {
        var $this = $(this);
        e.preventDefault();
        if ($this.text().length) {
            $.cookie("role", $this.text(), { path: "/" });
            if ($("#roleFilter").length) { $("#roleFilter").val($this.text()); }
            if ($("li.role span").length) { $("li.role span").text($this.text()).children("a").eq(0).text("Change Role"); }
            $("#utility li.role div").removeClass("roleChangeHover").hide();
            $this.closest(".role").removeClass("jsHover");
            location.reload();
        }
    },
    // Add tab accessibility for Select/Change role
    addAccessibility: function () {
        $(document.body).delegate(".roleChange", "click", function (e) {
            e.preventDefault();
            $("#utility li.role div").toggle().toggleClass("roleChangeHover");
        });
        $(document.body).delegate(".search", "focus", function (e) {
            $("#utility li.role div").hide();
        });
    },
    getJSONdata: function (wsUrl, jsonData, cb) {
        var request;
        if (typeof wsUrl !== "undefined") {
            // if jsonData is undefined, just get json from the URL
            if (!jsonData || !Object.keys(jsonData).length) {
                $.getJSON(wsUrl, cb);
            } else {
                // If there is jsonData, POST it to the webservice call
                // the object should be a flat, non-nested json object
                request = $.ajax({
                    url: wsUrl,
                    type: "POST",
                    data: jsonData,
                    dataType: "json"
                });

                // on success, execute callback
                request.done(cb);

                // Call for default results if POST call fails
                request.fail(function (jqXHR, textStatus) {
                    $.getJSON(wsUrl, cb);
                });
            }

        }
    },
    updateFilters: function (urlData) {
        var wsData = {},
            frag = $.deparam.fragment(),
            qs = $.deparam.querystring(),
            i;

        wsData = Object.keys(frag).length ? frag :
                 Object.keys(qs).length ? qs : {};

        $.each(wsData, function (key, val) {
            if ($("#" + key).length) {
                $("#" + key).val(val);
            }
        });
    },
    fixObj: function () {
        if (!Object.keys) {
            Object.keys = function (obj) {
                var keys = [],
                    k;
                for (k in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, k)) {
                        keys.push(k);
                    }
                }
                return keys;
            };
        }
    },
    toggleSearchPrompt: function (e) {
        var $this = $(this);

        if (e.type === "focus" && $this.val() === "Enter Text...") {
            $this.val("");
        } else if (e.type === "blur" && $this.val() === "") {
            $this.val("Enter Text...");
        }
    },
    setupSideNav: function () {
        /* This function initializes the "accordian" style menu for the side nav menu */
        var $sideNav = $("#sideNav"),
			$snCurrent = $sideNav.find(".current"),
			$snHasCurrent = $sideNav.find(".hasCurrent"),
			$plus = $('<span>+</span>').addClass("ir").attr("tabindex", "0"); /* use .clone(true) to duplicate and append as needed */


        if ($snHasCurrent.length) {
            $snHasCurrent.find("> a").append($plus.clone(true));
        }

        $sideNav.delegate("span", "click keydown", umcoe.sideNavToggle);

        /* if top level is labeled as current, hide all but top level nav items */
        if ($snCurrent.length && $snCurrent.parents(".hasCurrent").length === 0) {
            $snCurrent.find("li li").hide().end().siblings().show();
        } else if ($snCurrent.parents(".hasCurrent").length && $snCurrent.find("ul").length > 0) {
            /* if the current page nav item is has children nav items, hide the siblings */
            $snCurrent.siblings().hide();
        } else {
            /* otherwise show the siblings of the current item */
            $snCurrent.siblings().show();
            $snHasCurrent.eq(-1).find("> a span").text("-").addClass("open");
        }

        /* Always hide the siblings of elements that contain the current page nav item */
        $snHasCurrent.siblings().hide();

        /* If no "current" class, show the first last "hasCurrent" children and remove the ability to collapse them */
        if (!$snCurrent.length) {
            $snHasCurrent.eq(-1).find("li").show().end().find("> a span").remove();
        }
    },
    sideNavToggle: function (e) {
        var $this = $(this);
        // Keycodes are 9=Tab, 13=Enter, 32=Space
        if (e.type === "keydown" && $.inArray(e.keyCode, [9, 13, 32]) === -1) {
            return;
        }
        if (e.keyCode !== 9) { // Allows Tab to just fall through everything and execute the normal Tab functionality
            e.preventDefault();

            $("a span.open").not(this).click();

            /* Switch collapsed / expanded text */
            if ($this.text() == "+") { $this.text("-").addClass("open"); } else { $this.text("+").removeClass("open"); }

            /* Toggle visibility of the appropriate elements */
            $this.closest("li").children("ul").children("li").not(".hasCurrent, .current").slideToggle();
        }
    },
    setupSupersizedPrimaryLanding: function () {
        // setup theater w/background images		
        $.supersized({
            // Setup slideshow
            slideshow: 1, 			// Slideshow on/off
            start_slide: 1, 		// Start slide (0 is random)
            stop_loop: 1, 			// Pauses slideshow on last slide
            slide_interval: 10000, 	// Length between transitions
            transition: 6, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
            transition_speed: 1000, // Speed of transition
            slide_links: 'num', 	// Individual links for each slide (Options: false, 'num', 'name', 'blank')

            // Other Options
            image_protect: 0, 		// Disallow right-click on image
            pause_hover: 0, 		// Pause slideshow on hover
            keyboard_nav: 1, 		// Allow keyboard navigation
            min_width: 1024, 		// Min width allowed (in pixels)
            min_height: 633, 		// Min height allowed (in pixels)
            fit_always: 0, 			// Image will never exceed browser width or height (Ignores min. dimensions)
            vertical_center: 0, 	// Vertically center background
            horizontal_center: 0, // Horizontally center background

            // Components
            slides: slideShowImgs
        });
    },
    setupCarousels: function (selector, numToShow) {
        var circ = false, //Default state is false if there are less elements than the shownElements
			btns = false, //No navigation arrows on the page unless they are inserted
			btnPrev,
			btnNext,
			currentIndex = 0,
			$navSummary,
			updateNavSummary,
			dataObj,
            $selector = $(selector),
            totalItems = $selector.find("ul li").length;

        if (totalItems > numToShow) {
            btnNext = $("<p>Next</p>").addClass("slider sliderNext").insertAfter($selector);
            btnPrev = $("<p>Prev</p>").addClass("slider sliderPrev").insertAfter($selector);
            btns = true;
        }

        if (numToShow > 1) {
            $navSummary = $("<p>").addClass("navSummary").html('<span class="firstVisible">1</span>' + ' - ' + '<span class="lastVisible">' + numToShow + '</span> of <span class="total">' + totalItems + '</span>');
        } else {
            $navSummary = $("<p>").addClass("navSummary").html('<span class="firstVisible">1</span> of <span class="total">' + totalItems + '</span>');
        }
        $navSummary.insertAfter($selector);

        updateNavSummary = function ($vEl) {
            var firstVisible, lastVisible, total, $next, $prev, $navSummary, numToShow;

            $navSummary = $vEl.eq(0).closest(".carousel").siblings(".navSummary");
            numToShow = $vEl.length;
            total = $vEl.eq(0).siblings("li").length + 1;

            firstVisible = $vEl.eq(0).parent().find("li").index($vEl.eq(0)) + 1;
            lastVisible = $vEl.eq(0).parent().find("li").index($vEl.eq($vEl.length - 1)) + 1;

            $navSummary.find(".firstVisible").text(firstVisible);
            if (numToShow > 1) { $navSummary.find(".lastVisible").text(lastVisible); }
            $navSummary.find(".total").text(total);

            if (numToShow === 1 && typeof slideShowData !== "undefined" && slideShowData.length) {
                $navSummary.closest(".carouselHolder").find("h4").text(slideShowData[firstVisible - 1].title);
                $navSummary.closest(".carouselHolder").siblings(".carouselCaption").find("p").text(slideShowData[firstVisible - 1].caption);
            }

            $next = $vEl.closest(".carouselHolder").find(".sliderNext");
            $prev = $vEl.closest(".carouselHolder").find(".sliderPrev");

            if (firstVisible === 1) { $prev.hide(); } else { $prev.show(); }
            if (lastVisible === total) { $next.hide(); } else { $next.show(); }
        };

        updateNavSummary($selector.find("li").slice(0, numToShow));

        if ($selector.find(".current").length) { currentIndex = $selector.find(".current").parent("li").index(); }

        $selector.jCarouselLite({
            btnPrev: btns ? ".sliderPrev" : "",
            btnNext: btns ? ".sliderNext" : "",
            mouseWheel: true,
            circular: circ,
            visible: numToShow || 1,
            auto: 0,
            speed: 300,
            start: currentIndex,
            afterEnd: updateNavSummary
        });

        /* Events for carousel */
        $selector.find("li a").click(function (e) {
            var $this = $(this);
            e.preventDefault();

            // open colorbox
            $("." + $this.attr("class")).colorbox({ rel: $this.attr("class"), inline: true, width: "748", loop: false });

            if ($this.hasClass("current")) { returnFocus: false; }
            $this.parent("li").siblings().children("a").removeClass("current");
            $this.addClass("current");
        });
    },
    setupMoreLink: function () {
        // Create more link and append to #eventsBox
        var $moreLink = $("<a>").addClass("moreBtn").attr("href", "#").html("MORE<span></span>");
        $moreLink.bind("click", umcoe.moreLinkToggle);
        $("#eventsBox").append($moreLink);

        //umcoe.toggleEvents($eventSets, false, 0);
        //umcoe.toggleEventsByClass($eventSets, true, 400, "visibleByDefault");
    },
    moreLinkToggle: function (e) {
        var $eventSets = $("#eventsBox").find(".eventSet"),
			$moreLink = $(this);
        e.preventDefault();
        if ($moreLink.hasClass("open")) {
            //umcoe.toggleEvents($eventSets, false, 400);
            umcoe.toggleEventsByClass($eventSets, false, 400, "visibleOnLoad");
        } else {
            //umcoe.toggleEvents($eventSets, true, 400);
            umcoe.toggleEventsByClass($eventSets, true, 400, "visibleOnLoad");
        }
        $moreLink.toggleClass("open");
    },
    toggleEventsByClass: function ($eventSets, showEvents, slideEventTime, toggleClass) {
        if (showEvents) {
            // Open everything
            $eventSets.slideDown(slideEventTime);
            $eventSets.find("p").slideDown(slideEventTime);
        } else {
            // Close everything not marked with toggleClass
            $eventSets.each(function () {
                if (!$(this).hasClass(toggleClass)) {
                    $(this).slideUp(slideEventTime);
                }
            });
            $eventSets.find("p").each(function () {
                if (!$(this).hasClass(toggleClass)) {
                    $(this).slideUp(slideEventTime);
                }
            });
        }
    },
    // Trim article parts
    trimString: function (elToFix, maxLength) {
        var stringToTrim,
            $elToFix = $(elToFix);
        $elToFix.each(function () {
            //$(".stringToTrim").each(function() {
            var $this = $(this), punc = /,|\.|\?|!|;|:/;
            stringToTrim = $this.text();
            if (stringToTrim.length > maxLength) {
                stringToTrim = stringToTrim.substring(0, maxLength - 1);
                stringToTrim = stringToTrim.substring(0, stringToTrim.lastIndexOf(" "));

                // Strip a finishing puncutation mark?
                if (stringToTrim.substring(stringToTrim.length - 1).match(punc)) {
                    stringToTrim = stringToTrim.substring(0, stringToTrim.length - 1);
                }

                // append ellipsis
                stringToTrim += "&hellip;";
            }
            $this.html(stringToTrim);
        });
    },

    fixLog: function () {
        // Helper function that allows the use of console.log by using log()
        // won't break if console is not available
        // Usage: log(LOGDATA);
        window.log = function () {
            log.history = log.history || []; // store logs to an array for reference
            log.history.push(arguments);
            if (this.console) {
                console.log(Array.prototype.slice.call(arguments));
            }
        };
    },
    hashList: [],
    setupFAQToggle: function () {

        var hash = location.hash,
        onloadHashes,
		hL,
		i;

        $(".faqBlock").find(".faqAnswer").slideUp(); // hide all answers on load

        // when a FAQ link is clicked
        $("#contentHolder").delegate(".faqToggle", "click", umcoe.toggleFAQs);

        if (hash) { // if there are hashes in the URL on load
            onloadHashes = hash.split("&"); // turn the string into array
            hL = onloadHashes.length;

            for (i = 0; i < hL; i++) {
                // run FAQ IDs against array and slideDown matches
                $(onloadHashes[i]).find(".faqToggle").click();
            }
        }
    },
    toggleFAQs: function (e) {
        var $faqBlock = $(this).closest(".faqBlock"),
		    $faqId = "#" + $faqBlock.attr("id"),
		    $this = $(this),
            hashString;

        e.preventDefault();
        if (!$faqBlock.hasClass("open")) { // if FAQ block is closed
            umcoe.hashList.push($faqId); // add faqBlock ID to our array for use in URL
        } else { // if FAQ is open
            hL = umcoe.hashList.length;
            for (i = 0; i < hL; i++) {
                if (umcoe.hashList[i] === $faqId) {
                    // find the faqBlock in our array and remove it
                    umcoe.hashList.splice(i, 1);
                }
            }
        }
        // turn the array into a string
        hashString = umcoe.hashList.join("&");
        // if hashString is empty
        if (!hashString) {
            hashString = "#";
        }
        // change the URL if feature supported
        if (window.history && history.pushState) {
            history.replaceState("", "", hashString);
        }
        $this.animate({ opacity: 0.3 }, 400);
        $faqBlock.find(".faqAnswer").slideToggle(function () {
            $faqBlock.toggleClass("open");
        });
        $this.animate({ opacity: 1 }, 400);
    },
    enableValidation: function (form) {
        var $form = $(form),
			validator,
			settings,
			valSettings;

        $.validator.messages = umDefaultMessages;

        validator = $form.validate({
            //debug: true,
            errorElement: "p",
            errorPlacement: function (error, element) {
                error.appendTo(element.closest(".requiredField"));
            },
            highlight: function (element, errorClass, validClass) {
                var $element = $(element);
                $element.addClass(errorClass).removeClass(validClass);
                $element.closest(".requiredField").addClass("hasError");
            },
            unhighlight: function (element, errorClass, validClass) {
                var $element = $(element);
                $element.addClass(validClass).removeClass(errorClass);
                $element.closest(".requiredField").removeClass("hasError");
            },
            invalidHandler: function (e, validator) {
                //log("Form Errors");
            },
            submitHandler: function (form) {
                form.submit();  // Note: Don't use $(form).submit() as that will re-trigger validation!
                //log("Submitted");
            }
        });

        // Additional validation methods
        $.validator.addMethod("date", function (value, element) {
            return this.optional(element) || /^(([1-9])|(0[1-9])|(1[0-2]))\/(([0-9])|([0-2][0-9])|(3[0-1]))\/(([0-9][0-9])|([1-2][0,9][0-9][0-9]))$/.test(value);
        }, '<span class="errArrow"></span>Please enter a proper date. (xx/xx/xxxx)');
        $.validator.addMethod("phone", function (value, element) {
            return this.optional(element) || /^[\(\)\d-]{10,20}$/.test(value);
        }, '<span class="errArrow"></span>Please enter a proper phone number (no letters, numeric only.)');

        // Extend settings with settings from HTML
        settings = $form.validate().settings;
        $.extend(true, settings, umValidationCustomSettings);

        //Add validation / required marks
        $(".requiredField").each(function () {
            $(this).find("label").eq(0).prepend('<span class="errorX">X</span>').append('<span class="reqStar">*</span>');
        });

        // Setup click event for submit link
        $(".submit").bind("click", function (e) {
            e.preventDefault();
            $form.submit();
        });
    },
    //Get social feed information
    getSocialFeeds: function () {
        umcoe.getJSONdata(socialFeedWS, {}, umcoe.processSocialData);
    },
    addFeedClickNavigation: function () {
        $(document.body).delegate(".feedLink", "click keydown", umcoe.openFeedItem);
        $(document.body).delegate(".feedLink .close", "click", umcoe.closeFeedItem);
        $(document.body).bind("keydown", umcoe.closeFeedItem);
        $(document.body).delegate(".feedLink a", "click", function (e) {
            e.stopPropagation();
        });
        $(".socialFeedsHolder").delegate("*", "focus", umcoe.addSocialFeedFocus);
    },
    addSocialFeedFocus: function (e) {
        $(".socialFeedsHolder").addClass("focused");
        $(".socialFeedsHolder").undelegate("*", "focus");
        $(document.body).delegate("*", "focus", umcoe.removeSocialFeedFocus);
        return false;
    },
    removeSocialFeedFocus: function (e) {
        if ($(this).closest(".socialFeedsHolder").length) { return false; }
        $(".socialFeedsHolder").removeClass("focused");
        $(document.body).undelegate("*", "focus");
        $(".socialFeedsHolder").delegate("*", "focus", umcoe.addSocialFeedFocus);
        return false;
    },
    openFeedItem: function (e) {
        var $this = $(this),
            bubbleLeft = $this.offset().left,
            holderWidth = $(".mainSocialBar").width(),
            bubbleSize = 339;

        if (e.type === "keydown" && e.which !== 13) { return; }
        e.preventDefault();
        $(".iconHover").removeClass("iconHover");
        $(".socialBubble").hide();
        $this.addClass("iconHover");
        if (holderWidth - bubbleLeft < bubbleSize) {
            $this.children(".socialBubble").css("left", (holderWidth - bubbleLeft - bubbleSize) + "px");
        }
        $this.children(".socialBubble").show();

        // Fix z-index issue
        $(".feedScroller, .socialFeedsHolder").css("z-index", 99);
        if ($(".scrollRight").is(":visible") && $.browser.msie && $.browser.version.substring(0, 1) < 8) {
            $(".scrollRight").hide();
            umcoe.reshowScrollRight = true;
        }

        // Fix selection
        if (document.selection) {
            document.selection.empty();
        } else if (window.getSelection()) {
            window.getSelection().removeAllRanges();
        }
        //$(document.body).bind("click.socialClose", umcoe.closeFeedItem);
        return false;
    },
    reshowScrollRight: false,
    closeFeedItem: function (e) {
        if (e.type === "keydown" && e.which !== 27) { return; }
        e.preventDefault();
        $(".iconHover").removeClass("iconHover");
        $(".socialBubble").hide();

        // Fix z-index issue
        $(".feedScroller, .socialFeedsHolder").css("z-index", 1);
        if (umcoe.reshowScrollRight && $.browser.msie && $.browser.version.substring(0, 1) < 8) {
            $(".scrollRight").show();
        }
        if (e.type !== "keydown") { $(".feedLink").blur(); }
        //$(document.body).unbind("click.socialClose");
        e.stopPropagation();
        return false;
    },

    //Add scrollers to social feed area
    addSocialFeedScroller: function () {
        var comboHolderLeft = $(".comboHolder").position().left,
            innerHolderLeft = $(".innerHolder").position().left,
            comboHolderWidth = $(window).width() - $(".scrollRight").width(),
            socialFeedLength = 0,
            makeFocusedFeedLinkVisible,
            reactToScrollClick,
            dayWidth = 0;

        $(".innerHolder").css("width", "99999");
        $(".socialFeedDay").each(function () {
            var dayWidth = umcoe.calculateAllDaysWidth(this);
            $(this).css("width", dayWidth);
            socialFeedLength += dayWidth;
        });

        socialFeedLength += $(".viewFeedsInScroll").width() + +$(".viewFeedsInScroll").css("margin-right").replace("px", "");
        innerHolderLeft = -(socialFeedLength - comboHolderWidth);
        $(".innerHolder").css({ "width": socialFeedLength, "left": innerHolderLeft });

        // For initial load, hide the right arrow
        $(".scrollRight").hide();

        scrollFeed = function (el, distance, duration) {
            $(".socialBubble").hide();
            $(".iconHover").removeClass("iconHover");

            $(el).stop().animate({ left: distance }, duration);
        }

        reactToScrollClick = function (e) {
            var $this = $(this),
				direction = $this.hasClass("scrollRight") ? "right" : "left",
                comboHolderWidth = $(window).width(),
                moveAmount = comboHolderWidth - $(".scrollRight").width() - $(".scrollLeft").width() - 150,
                maxMoveTarget = innerHolderLeft,
                curPosition = $(".innerHolder").position().left,
                moveTarget;

            // Standard is to show both scroll arrows
            $(".scrollRight").fadeIn();
            $(".scrollLeft").fadeIn();

            switch (direction) {
                case "left":
                    if (curPosition + moveAmount >= 0) {
                        // Got to end of social feed, hide left scroll arrow
                        moveTarget = 0 + $(".scrollRight").width();
                        $(".scrollLeft").fadeOut();
                    } else {
                        // Just moving a page
                        moveTarget = curPosition + moveAmount + $(".scrollRight").width();
                    }
                    break;
                case "right":
                    if (curPosition - moveAmount <= maxMoveTarget) {
                        // Got to beginning of social feed, hide right scroll arrow
                        moveTarget = maxMoveTarget;
                        $(".scrollRight").fadeOut();
                        umcoe.reshowScrollRight = false;
                    } else {
                        // Just moving a page width
                        moveTarget = curPosition - moveAmount - $(".scrollLeft").width();
                    }
                    break;
                default:
                    return;
            }

            scrollFeed(".innerHolder", moveTarget, 1200);

            e.preventDefault;
            return false;
        }

        makeFocusedFeedLinkVisible = function (e) {
            var $this = $(this),
                thisElOffsetLeft = $this.positionAncestor(".innerHolder").left,
                moveAmount = comboHolderWidth - $(".scrollRight").width() - $(".scrollLeft").width() - 150,
                maxMoveTarget = innerHolderLeft,
                curPosition = $(".innerHolder").position().left,
                moveTarget;

            // Don't adjust in these cases (handles tabs into bubble and mouse clicks)
            if (e.target.tagName.toLowerCase() !== "span") { return; }
            if (e.type === "mousedown") { $this.data("clicked", true); return; }
            if ($this.data("clicked")) { $this.data("clicked", false); return; }

            // Standard is to show both scroll arrows
            if (curPosition < 0 + $(".scrollRight").width() && $(".scrollRight").is(":hidden")) {
                $(".scrollRight").fadeIn();
            }
            if (curPosition > maxMoveTarget && $(".scrollLeft").is(":hidden")) {
                $(".scrollLeft").fadeIn();
            }
            moveTarget = -thisElOffsetLeft + moveAmount;

            if (moveTarget > 0) {
                moveTarget = 0 + $(".scrollRight").width();
                $(".scrollLeft").hide();
            } else if (moveTarget < maxMoveTarget) {
                moveTarget = maxMoveTarget;
                $(".scrollRight").hide();
            }

            if (moveTarget < curPosition + moveAmount || moveTarget > curPosition) {
                scrollFeed(".innerHolder", moveTarget, 1200);
            }
        }

        // Set up events
        $(".feedToggle").delegate("a", "click", umcoe.toggleSocialFeed);
        $(".comboHolder").delegate(".feedLink, .viewFeedsInScroll", "mousedown focus", makeFocusedFeedLinkVisible);
        $(".feedScroller").delegate(".scrollRight, .scrollLeft", "click", reactToScrollClick);
    },
    toggleSocialFeed: function (e) {
        e.preventDefault();
        $(".iconHover").removeClass("iconHover");
        $(".socialBubble").hide();
        if ($(".feedScroller").is(":visible")) {
            $(".feedScroller").slideUp();
            $(".feedToggle").removeClass("arrowDown").addClass("arrowUp");
        } else {
            $(".feedScroller").css("height", "").slideDown();
            $(".feedToggle").removeClass("arrowUp").addClass("arrowDown");
        }
    },
    calculateAllDaysWidth: function (el) {
        var $el = $(el), dWidth = 0;
        $el.children().each(function () {
            var $feedItem = $(this);
            dWidth += $feedItem.width();
            if ($feedItem.hasClass("feedLink")) {
                dWidth += parseInt($feedItem.css("margin-left").replace("px", ""));
            }
        });
        return dWidth;
    },
    processSocialData: function (data) {
        $.views.allowCode = true;
        $.each(data.socialFeeds, function (i, item) {
            umcoe.renderSocialDays(i, item);
        });
        umcoe.addRandomClasses();
        umcoe.addSocialFeedScroller();
        $("#supersized a").attr("tabindex", "-1");
        umcoe.addFeedClickNavigation();
        $(document).trigger("sfLoaded");
    },
    renderSocialDays: function (count, day) {
        var theHTML = $("#socialFeedDayHolder").render(day);
        $(".viewFeedsInScroll").before(theHTML);
        theHTML = $("#socialDayTemplate").render(day);
        $(".socialFeedDay").eq(count).addClass("day" + count);
        $(".day" + count).append(theHTML);
        $.each(day.feeds, function (i, item) {
            umcoe.renderSocialFeeds(i, item, count);
        });

        umcoe.trimString(".socialName", 25);
        umcoe.trimString(".socialMetaData", 40);
        umcoe.trimString(".socialTitle", 40);
        umcoe.trimString(".socialAction", 40);
        umcoe.trimString(".fbPreviewTitle", 30);
        umcoe.trimString(".fbPreviewDescription", 80);
        umcoe.trimString(".facebook.fbPreview .socialContent", 120);
        umcoe.trimString(".facebook .socialContent", 160);
        umcoe.trimString(".twitter .socialContent", 100);
        umcoe.trimString(".blog .socialContent", 80);
        umcoe.trimString(".news .socialContent", 80);
        umcoe.trimString(".youTube .socialContent", 60);
        umcoe.trimString(".flickr .socialContent", 60);
    },
    renderSocialFeeds: function (i, feeds, count) {
        var theHTML = $("#socialFeedTemplate").render(feeds);
        $(".day" + count).append(theHTML);
    },
    addRandomClasses: function () {
        var randomNum;
        $(".feedLink").each(function () {
            randomNum = Math.floor(Math.random() * 5) + 1;
            $(this).addClass("feedSpacer" + randomNum);
        });
    },
    setupSearch: function () {
        $(".submit").click(function (e) {
            var searchQuery = $(".searchText").val();
            e.preventDefault();
            if (searchQuery.length) {
                window.location = $(this).attr("href") + "?q=" + encodeURI(searchQuery);
            } else {
                alert("Please enter a search query.");
            }
        });
        $(".searchText").keypress(function (e) {
            var searchQuery = $(this).val();
            if (e.keyCode === 13) {
                if (searchQuery.length) {
                    window.location = $(this).siblings("a").attr("href") + "?q=" + encodeURI(searchQuery);
                } else {
                    alert("Please enter a search query.");
                }
            }
        });
    },
    // Reload addthis
    reloadAddThis: function () {
        var script = 'http://s7.addthis.com/js/250/addthis_widget.js#pubid=xa-4ec44a58724ed4d0';
        try {
            window.addthis = undefined;
            delete window.addthis;
        } catch (e) { }

        $.getScript(script, function () {
            addthis.init();
            setTimeout(umcoe.reinitAddThis, 50);
        });
    },
    // Reinit addthis
    reinitAddThis: function () {
        if (window.addthis) {
            window.addthis.ost = 0;
            window.addthis.ready();
        }
    }
};

// Run init
$(function() {
	// Put an play-button over the image
	/*$(".c1Image").each(function(index, element) {
        $(this).css("background", "url("+$(this).children("img").attr("src")+")");
		$(this).append("<div class='play-button'><span style='opacity: 0;'>1</span></div>");
    });
	$(".c1Image img").remove();
	$(".c1Image").css({"width" : "141px", "height" : "109px"});
	$(".play-button").css({"width" : "141px", "height" : "109px", "background" : "url(img/map-play-arrow.png) center no-repeat"});*/
	
	// Start the umcoe slider
    //umcoe.init();
});