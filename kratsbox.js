(function($) {
    var settings, links, root = false,
    methods = {
        open : function() {
            if(!root) {
                $('body').append('<div id="krbxviewer">'
                        +'<div id="krbxframe"><img alt="">'
                        +'<p>'
                        +'<a href="#close" id="krbxclose" title="close">'
                        +settings['close']+'</a>'
                        +'<span class="krbxbtns">'
                        +'<a href="#prev" id="krbxprev" title="previous image">'
                        +settings['prev']+'</a>'
                        +'<a href="#next" id="krbxnext" title="next image">'
                        +settings['next']+'</a>'
                        +'</span>'
                        +'<span id="krbxcaption"></span>'
                        +'</p>'
                        +'</div>'
                        +'</div>');
                root = $('#krbxviewer');
                var close = root.find('#krbxclose'),
                next = root.find('#krbxnext'),
                prev = root.find('#krbxprev');
                close.bind('click.kratsbox', methods.close);
                next.bind('click.kratsbox', methods.next);
                prev.bind('click.kratsbox', methods.prev);
                function setupfocus(elem, nextelem, prevelem) {
                    elem.keydown(function(event){
                        if(event.which == 9) {
                            if(event.shiftKey) {
                                prevelem.focus();
                            } else {
                                nextelem.focus();
                            } 
                            event.stopPropagation();
                            return false;
                        }
                    });
                }
                setupfocus(close, prev, next);
                setupfocus(next, close, prev);
                setupfocus(prev, next, close);
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
        settings = $.extend({
            'next': 'next \u2192',
            'prev': '\u2190 prev',
            'close': 'close \u00D7'
        }, options);
        links = this;
        this.each(function(index) {
            $(this).data('krbxindex', index);
        });
        this.bind('click.kratsbox', methods.open);
        return this;
    };
})(jQuery);
