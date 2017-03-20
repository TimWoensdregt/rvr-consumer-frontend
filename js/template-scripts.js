jQuery(document).ready(function($) {      
  // Owl Carousel 
  $(".carousel-default").owlCarousel({		
   	 navigation : true,
   	 slideSpeed : 300,
   	 paginationSpeed : 400,
   	 autoPlay : true,
     addClassActive: true,
     navigationText: ["&#xf007","&#xf006"],
   	 singleItem:true
  }); 
  
  // Owl Carousel - Content Blocks
  $(".carousel-blocks").owlCarousel({
     slideSpeed: 300,
     autoPlay: false,
     navigation: true,
     navigationText: ["&#xf007","&#xf006"],
     pagination: false,
     addClassActive: true,
     items: 5,
     itemsDesktop: [768,3],
     itemsDesktopSmall: [480,1]
  });
  
  $(".carousel-fade-transition").owlCarousel({		
   	 navigation : true,
   	 slideSpeed : 300,
   	 paginationSpeed : 400,
   	 autoPlay : true,
     addClassActive: true,
     navigationText: ["&#xf007","&#xf006"],
   	 singleItem:true,
     transitionStyle : "fade"
  }); 
  
  // skillbar
  $('.skillbar').bind('inview', function (event, visible) {
    if (visible) {  
      $('.skillbar').each(function(){
  	    $(this).find('.skillbar-bar').animate({
  	   	  width:$(this).attr('data-percent')
  	    },3000);
      });
       
    } 
  });
  
  // countTo
  $('.timer').bind('inview', function (event, visible) {
    if (visible) {  
      $('.timer').countTo({
        speed: 1400,
        refreshInterval: 10,
        formatter: function (value, options) {
          return value.toFixed(options.decimals);
        },
        onUpdate: function (value) {
          console.debug(this);
        },
        onComplete: function (value) {
          console.debug(this);
        }
      });
      $( this ).off( event );
    } 
  });      
  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
  }
  // custom formatting example
  $('#decimal').data('countToOptions', {
    formatter: function (value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
  });
  
  // Sticky Nav Bar
  $(window).scroll(function() {
    if ($(this).scrollTop() > 20){  
        $('.sticky').addClass("fixed");
    }
    else{
        $('.sticky').removeClass("fixed");
    }
  });
  
  // Lightbox
  $('a[data-rel^=lightcase]').lightcase({
    maxWidth: 1000,
    maxHeight: 'auto',
    transition: 'scrollHorizontal',
    speedIn: 600,
    speedOut: 600,
    video: {
			width: 1000,
			height: 'auto',
			loop: true
		},
  });
  
  // Content Animation
  $(window).scroll(function(d,h) {
      $(".animated").each(function(i) {
          a = $(this).offset().top + $(this).height();
          b = $(window).scrollTop() + $(window).height();
          if (a < b){
            $(this).addClass("animation");
          }          
    });
  });  
});


// In view animation
/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
(function ($) {
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks
        }

        return height;
    }

    $(window).scroll(function () {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];
        
        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });

        if (elems.length) {
            $(elems).each(function () {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data('inview') || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data('inview', false);
                        $el.trigger('inview', [ false ]);                        
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data('inview', true);
                        $el.trigger('inview', [ true ]);
                    }
                }
            });
        }
    });
    
    // kick the event to pick up any elements already in view.
    // note however, this only works if the plugin is included after the elements are bound to 'inview'
    $(function () {
        $(window).scroll();
    });
})(jQuery);