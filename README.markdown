Kratsbox
========

A simple lightbox-like jQuery plugin focusing on usability.

Usage
-----

First, put the kratsbox file in some path on your web server and make
sure you have them (and jQuery) availiable in the page:

    <link rel="stylesheet" type="text/css" href="/somepath/kratsbox.css"/>
    <script type="text/javascript" src="/somepath/jquery.js"></script>
    <script type="text/javascript" src="/somepath/kratsbox.js"></script>

You can (and should) combine and minify them with your other javascript and
css files to minimize impact on page load time.
If you prefer a white box over a gray, you can use _kratsbox.light.css_
instead of _kratsbox.css_.

Basic usage is just to jQuery-select the links you want to use the box
on and call kratsbox, like so:

    $('a.image').kratsbox();

As usual, you need to execute that after the links actually exits.
You also might want to set some options, e.g. for localization.
  
    $(function() {
      $('a.image').kratsbox({
        'next': 'nästa \u2192',
        'prev': 'förra \u2190',
        'close': 'stäng \u00D7'
      });
    });

Options
-------

* `next` - Text for the link to the next image.
* `prev` - Text for the link to the previous image.
* `close` - Text for the close button.
* `minsize` - If the browser window is less tall or less wide than
   this, kratsbox functionality will be disabled.
