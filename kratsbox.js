(function($) {
    var settings, links, root = false,
    methods = {
        open : function() {
            if(!root) {
                root =
                    $('<div id="kratsbox"><div class="bg"></div>'+
                      '<div id="krbxframe"><img alt="">'+
                      '<p>'+
                      '<a href="#close" class="close" title="close">'+
                      settings['close']+'</a>'+
                      '<span class="krbxbtns">'+
                      '<a href="#prev" class="prev" title="previous image">'+
                      settings['prev']+'<span class="extra"></span></a>'+
                      '<a href="#next" class="next" title="next image">'+
                      settings['next']+'<span class="extra"></span></a>'+
                      '</span>'+
                      '<span id="krbxcaption"></span>'+
                      '</p>'+
                      '</div>'+
                      '</div>').appendTo('body');
                var close = root.find('.close'),
                next = root.find('.next'),
                prev = root.find('.prev');
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
                function limitSize() {
                    var img = root.find('img');
                    root.find('#krbxframe').width('auto');
                    img.css('max-height', (root.height()-100)+'px');
                    root.find('#krbxframe').width(img.width());
                    root.find('.extra').height(img.height());
                }
                $(window).resize(limitSize);
                root.find('img').bind('load', limitSize);
                limitSize();
            }
            methods.loaddata(this);
            root.show();
            root.find('.bg').fadeTo(200, 0.8);
            root.find('#krbxframe').show();
            root.find('.close').focus();
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
            root.find('#krbxcaption').text(s.attr('title') || '');
        },
        close : function() {
            root.find('.bg').fadeOut(400, function(){root.hide()});
            root.find('#krbxframe').hide();
            $(links[root.find('img').data('current')]).focus();
            return false;
        }
    };
    $.fn.kratsbox = function(options) {
        settings = $.extend({
            'next': 'next \u2192',
            'prev': '\u2190 prev',
            'close': 'close \u00D7'
        }, options);
        links = this;
        links.each(function(index) {
            $(this).data('krbxindex', index);
        });
        links.bind('click.kratsbox', methods.open);
        return this;
    };
})(jQuery);
