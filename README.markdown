Kratsbox
========

A simple javascript lightbox focusing on usability.
What makes kratsbox different from other lightboxes is:

* _Keyboard focus_.  The close, next and prev actions get visible
  focus, and when kratsbox is closed, focus returns to the right link.

* _Only images_.  While not an feature in itself, lack of support for
  embeddly, iframes or ajax does allow the small size of kratsbox.
  The fact that no jQuery or other library is required also helps.

* _No extra loading_.  The graphics in kratsbox is pure css3, no extra
  images / sprites.


Usage
-----

First, put the kratsbox files in some path on your web server and make
sure you have them availiable in the page:

    <link rel="stylesheet" type="text/css" href="/somepath/kratsbox.css"/>
    <script type="text/javascript" src="/somepath/kratsbox.js"></script>

You can (and should) combine and minify them with your other javascript and
css files to minimize impact on page load time.
If you prefer a white box over a gray, you can use _kratsbox.light.css_
instead of _kratsbox.css_.

Basic usage is just call kratsbox, with a querySelector string as an
argument, like so:

    kratsbox('a.image');

As usual, you need to execute that after the links actually exist.
You also might want to set some options, e.g. for localization.
  
    kratsbox('a.image', {
        'next': 'nästa \u2192',
        'prev': 'förra \u2190',
        'close': 'stäng \u00D7'
    });

This assumes you have image links.  I usually do something like:

    <a class="image" href="large-image.jpg"
       title="Wild rose beside a road in Stockholm. Cc-by Rasmus Kaj">
     <img src="small-image.jpg" width="200" height="133"
          alt="Image: A flower">
    </a>

This makes the small image visible directly in the page, and clicking it
brings up a box displaying the large image.
The title attribute from the link describes what is linked to and is
used as a caption when showing the large image.
Img alts saying it's an image is sometimes frowned upon, but I tink it
is good when considered it is the link text for the larger version of
the image.

Kratsbox also supports the figure / figcaption elements, where
figcaption may contain markup.  Depending on your stylesheet, the
figcaption may be visible for the small image as well as in the box
with the large image.

    <figure>
      <a href="large-image.jpg">
        <img src="small-image.jpg" width="200" height="133"
             alt="Image: A flower">
      </a>
      <figcaption>
        Wild rose beside a road in Stockholm.
        Cc-by <a href="http://rasmus.krats.se/">Rasmus Kaj</a>.
      </figcaption>
    </figure>

    kratsbox('figure > a')

Options
-------

* `next` - Text for the link to the next image.
* `prev` - Text for the link to the previous image.
* `close` - Text for the close button.
* `minsize` - If the browser window is less tall or less wide than
   this, kratsbox functionality will be disabled.
