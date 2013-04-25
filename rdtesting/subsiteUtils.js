/* - ++resource++umich_js/subsiteUtils.js - */
﻿//Javascript that handles all news funcionallity
var subsiteUtilx = {

    //initialize the news items
    init: function () {
        this.subsiteNavEvents();
    },

    subsiteNavEvents: function () {
        $(".expanded").delegate(".subsiteClose", "click", function (e) {
            $(".expanded").hide();
            $(".collapsed").show();
        });
        $(".collapsed").delegate(".subsiteOpen", "click", function (e) {
            $(".collapsed").hide();
            $(".expanded").show();
        });
    }
};



// Run init
$(function() {
	alert("11");
    subsiteUtilx.init();
});