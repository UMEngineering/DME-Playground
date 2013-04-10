
/* - ++resource++umich_js/heading_split.jquery.js - */
(function( $ ) {
    var methods = {
        init : function(options) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data('heading_split');
                 
                var content = $this.html();
                
                if (!data) {
                    $(this).data('heading_split', {
                        target : $this,
                        content: content
                    });

                    var i = 0;
                    var rc = $('<div>' + content + '</div>').contents().map(function() {
                            var e = $(this);

                            // Always wrap the first part
                            if (i == 0) {
                                i++;
                                return "<div class=\"contentBlock shadow first\"><div class=\"innerShadow\">" + e.clone()
                                                                    .wrap('<div></div>')
                                                                    .parent()
                                                                    .html(); 
                            } 
                            else {
                                return (e.is('h3') || e.is('h2')) ? "</div></div><div class=\"contentBlock shadow\"><div class=\"innerShadow\">" + e.clone().wrap('<div></div>').parent().html() : e.clone().wrap('<div></div>').parent().html();
                            }
                    }).get().join(' ');
                   


                    if (options && options['target']) {
                        options['target'].html(rc);
                        $(this).html('');
                    }
                    else {
                        $(this).parent().html(rc);
                    }
                }
            });
        }
    };

    $.fn.heading_split = function( method ) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if ( typeof method === 'object' || !method) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.heading_split' );
        }
    }
})(jQuery);


// Call heading_split method
$(function () {
    $('div.contentBlock.first > div.innerShadow').heading_split({
        target: $('#replacement')
    });
   
    // Add class of 'last' if Disqus doesn't appear on the page - ticket #1311.
    if (!$('div#disqusComments').length) {
        var $allContentBlocks = $('div.contentBlock');
        $($allContentBlocks[$allContentBlocks.length - 1]).addClass('last');
    }
});

