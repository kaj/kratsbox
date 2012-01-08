(function($) {
    var links, root = false,
    methods = {
        open : function() {
            if(!root) {
                $('body').append('<div id="krbxviewer">'
                        +'<div id="krbxframe"><img alt="">'
                        +'<p>'
                        +'<a href="#close" id="krbxclose" title="close">\u00D7</a>'
                        +'<span class="krbxbtns">'
                        +'<a href="#prev" id="krbxprev" title="previous image">\u2190</a>'
                        +'<a href="#next" id="krbxnext" title="next image">\u2192</a>'
                        +'</span>'
                        +'<span id="krbxcaption"></span>'
                        +'</p>'
                        +'</div>'
                        +'</div>');
                root = $('#krbxviewer');
                root.find('#krbxclose').bind('click.kratsbox', methods.close);
                root.find('#krbxnext').bind('click.kratsbox', methods.next);
                root.find('#krbxprev').bind('click.kratsbox', methods.prev);
            }
            methods.loaddata(this);
            root.show();
            root.find('#krbxclose').focus();
            return false;
        },
        next: function() {
            var i = root.find('img').data('current') + 1
            methods.loaddata(links[i]);
            return false;
        },
        prev: function() {
            var i = root.find('img').data('current') - 1
            methods.loaddata(links[i]);
            return false;
        },
        loaddata: function(selected) {
            var imgsrc = $(selected).attr('href');
            var img = root.find('img');
            img.data('current', $(selected).data('krbxindex'));
            img.attr('src', imgsrc);
            root.find('#krbxcaption').text($(selected).attr('title'));
            img.bind('load', function() {
                root.find('#krbxframe').width(img.get(0).width);
            });
        },
        close : function() {
            $('#krbxviewer').hide();
            return false;
        }
    };
    $.fn.kratsbox = function(options) {
        // this is the jQuery-selected links
        var settings = $.extend({
            'whatever': 'default'
        }, options);
        links = this;
        this.each(function(index) {
            $(this).data('krbxindex', index);
        });
        this.bind('click.kratsbox', methods.open);
        return this;
    };
})(jQuery);
