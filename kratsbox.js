if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

    function kratsbox(selector, options) {
        console.debug("In initkratsbox for selector '" + selector + "',",
                      options);

        function create(htmlStr) {
            var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
            temp.innerHTML = htmlStr;
            while (temp.firstChild) {
                frag.appendChild(temp.firstChild);
            }
            return frag;
        }

        var settings, data = {}, root = false,
        methods = {
        open : function() {
            root = document.querySelector('#kratsbox');
            console.debug('Open called, root:', root, ' data:', data);
            if(!root) {
                root = create('<div id="kratsbox"><div><img alt="">'+
                      '<a href="#close" class="krbxbtn close">close</a>'+
                      '<a href="#next" class="krbxbtn next">next</a>'+
                      '<a href="#prev" class="krbxbtn prev">prev</a>'+
                      '<p id="krbxcaption"></p></div></div>');

                document.body.appendChild(root);
                root = document.querySelector('#kratsbox');
                var img = root.querySelector('img');
                function limitSize() {
                    if (img.clientWidth) {
                        var kf = root.querySelector('div');
                        kf.style.width = 'auto';
                        img.style.maxHeight = (root.clientHeight-120)+'px';
                        kf.style.width = img.clientWidth + 'px';
                        kf.querySelector('.extra').style.height = img.clientHeight + 'px';
                    } else {
                        window.setTimeout(limitSize, 100);
                    }
                }
                console.debug("Img:", img)
                window.addEventListener('resize', limitSize);
                img.addEventListener('load', limitSize);
                limitSize();
            }

            var close = root.querySelector('.close'),
            next = root.querySelector('.next'),
            prev = root.querySelector('.prev');
            prev.innerHTML = settings['prev'] + '<span class="extra"></span>';
            next.innerHTML = settings['next'] + '<span class="extra"></span>';
            close.innerHTML = settings['close'];
            close.onclick = methods.close;
            next.onclick = methods.next;
            prev.onclick = methods.prev;
            function setupfocus(elem, nextelem, prevelem) {
                elem.onkeydown = function(event) {
                    if(event.which == 9) {
                        if(event.shiftKey) {
                            prevelem.focus();
                        } else {
                            nextelem.focus();
                        } 
                        event.stopPropagation();
                        return false;
                    }
                };
            }
            if (data.links.length > 1) {
                root.querySelector('div').className = 'group';
                setupfocus(close, prev, next);
                setupfocus(next, close, prev);
                setupfocus(prev, next, close);
            } else {
                root.querySelector('div').className = 'single';
                setupfocus(close, close, close);
            }
            root.onkeydown = function(event) {
                switch(event.which) {
                case 9: // tab
                    close.focus();
                    break;
                case 27: // escape
                    methods.close();
                    break;
                case 37: // left arrow
                case 38: // up arrow
                case 33: // pgup
                case 78: // 'n'
                    methods.prev();
                    break;
                case 39: // right arrow
                case 40: // down arrow
                case 34: // pgdn
                case 80: // 'p'
                    methods.next();
                    break;
                default:
                    return true;
                }
                event.stopPropagation();
                return false;
            };
            methods.loaddata(this);
            root.className = 'showing';
            root.querySelector('.close').focus();
            console.debug("open method returning false");
            return false;
        },
        next: function() {
            var i = data.current + 1
            methods.loaddata(data.links[i % data.links.length]);
            return false;
        },
        prev: function() {
            var i = data.current - 1
            methods.loaddata(data.links[(i+data.links.length) % data.links.length]);
            return false;
        },
        loaddata: function(selected) {
            console.debug('Loaddata for', selected, 'root:', root);
            var img = root.querySelector('img');
            var cap = selected.getAttribute('title'),
                capE = document.querySelector('#krbxcaption');
            data.current = selected.getAttribute('data-krbxindex');
            img.setAttribute('src', selected.getAttribute('href'));
            if (cap) {
                capE.innerHTML = cap;
            } else {
                var capSrc = selected.parentNode.querySelectorAll('figcaption');
                if (capSrc) {
		    capE.innerHTML = '';
		    [].forEach.call(capSrc, function(s) {
			capE.innerHTML += (s.innerHTML + ' ');
		    });
                } else {
		    capE.innerHTML = '';
		}
            }
            console.debug('Loaddata done');
        },
        close : function() {
            root.className = 'hidden';
            data.links[data.current].focus();
            return false;
        }
        };

        settings = {
            'minsize': 500,
            'next': 'next \u2192',
            'prev': '\u2190 prev',
            'close': 'close \u00D7'
        };
        for (var attrname in options) {
            settings[attrname] = options[attrname];
        }

        if (window.innerWidth < settings.minsize ||
            window.innerHeight < settings.minsize) {
            
            return this;
        }
        
        data.links = document.querySelectorAll(selector);
        console.log("Selector:", selector, "Links: ", data.links);
        var i = 0;
        [].forEach.call(data.links, function(link) {
            console.debug("Initializing", link);
            link.setAttribute('data-krbxindex', i++);
            link.onclick = methods.open;
        });
        console.log('Data:', data);
        return this;
    };
}
