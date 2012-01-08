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
                root.keydown(function(event){
                    function stop(e) { e.stopPropagation(); return false; }
                    switch(event.which) {
                    case 27: // escape
                        methods.close();
                        return stop(event);
                    case 37: // left arrow
                    case 38: // up arrow
                    case 33: // pgup
                    case 78: // 'n'
                        methods.prev();
                        return stop(event);
                    case 39: // right arrow
                    case 40: // down arrow
                    case 34: // pgdn
                    case 80: // 'p'
                        methods.next();
                        return stop(event);
                    }
                });
            }
            methods.loaddata(this);
            root.show();
            root.find('#krbxclose').focus();
            return false;
        },
        next: function() {
            var i = root.find('img').data('current') + 1
            methods.loaddata(links[i % links.length]);
            return false;
        },
        prev: function() {
            var i = root.find('img').data('current') - 1
            methods.loaddata(links[(i+links.length) % links.length]);
            return false;
        },
        loaddata: function(selected) {
            var s = $(selected),
                img = root.find('img');
            img.data('current', s.data('krbxindex'));
            img.attr('src', s.attr('href'));
            root.find('#krbxcaption').text(s.attr('title'));
            img.bind('load', function() {
                root.find('#krbxframe').width(img.width());
            });
        },
        close : function() {
            root.hide();
            $(links[root.find('img').data('current')]).focus();
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
