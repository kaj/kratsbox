Kratsbox
========

A simple lightbox-like jQuery plugin focusing on usability.

Usage
-----

Basic usage is just to jQuery-select the links you want to use the box
on and call kratsbox, like so:

    $('a.image').kratsbox();

As usual, you need to execute that after the links actualla exits.
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
