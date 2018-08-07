/*!
 * All sorts javascript/jQuery functions
 *
 * @author      Flurin Dürst
 * @version     3.5.0
 * @since       WPSeed 0.12
 * was main.js until 3.4.1
 *
 */
/*==================================================================================
  Functions
==================================================================================*/

/* Hamburger switch
/––––––––––––––––––––––––*/

// /* Post Carousel  */
var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initSlick() {
  var $slider = $('.slider-nav');
  $slider.not('.slick-initialized').on('init', function(slick) {
    //console.log('fired!');
    $('.slider').fadeIn(1000);
  }).slick({
    slidesToShow: 2,
    swipeToSlide: true,
    dots: false,
    draggable: true,
    arrows: true,
    lazyLoad: 'ondemand',
    focusOnSelect: true,
    infinite: false,
    initialSlide: 0,
    variableWidth: true
  });
  var varWidthSlides = $('.varWidth').closest('.slick-slide');
  var counter = 0;
  var total = varWidthSlides.length;
  var videoWidth = $('.video-slide').width(); //666
  var totalWidth = $('.slick-list').width(); //1060
  var frontPageSpace = totalWidth - videoWidth;
  var leftOver = (totalWidth - 2) / 2;
  $.each(varWidthSlides, function() {
    counter++;
    var currentTotal = total - 1;
    var newVal = leftOver / document.documentElement.clientWidth * 100;
    varWidthSlides.css({
      "min-width": newVal + "vw",
    });
  });
}
$(function() {
  if ($(window).width() > 767 && ($(window).width() != 812)) {
    initSlick();
  }
  var home = Barba.BaseView.extend({
    namespace: 'home',
    onEnter: function() {
      console.log('home');
      $('body').removeClass('post row middle-xs').addClass('home');
    },
    onEnterCompleted: function() {
      var $bio = $('.bio');
      initThree();
      //Fade out Bio information
       var $hamburger = $('#hamburger');
      // var getUrl = window.location;
      $hamburger.on('click', function() {
         alert('clicked');
      //   if ($bio.hasClass('faded')) {
      //     $hamburger.closest('a').attr('href', window.globalObject.homeUrl + '/menu/');
      //   } else {
      //     $bio.fadeOut(2000).addClass('faded');
      //   }
       });
    },
    onLeave: function() {
      $('body').removeClass('home');
    },
    onLeaveCompleted: function() {}
  });
  home.init();
  var menu = Barba.BaseView.extend({
    namespace: 'menu',
    onEnter: function() {
      $('body').removeClass('post row middle-xs').addClass('menu');
      $('.post-item').hide();
      $('.top').animate({
        'opacity': 0
      }, 1000, function() {
        $(this).after($(this).css({
          'background': 'transparent'
        }));
      });
    },
    onEnterCompleted: function() {},
    onLeave: function() {
      $('body').removeClass('menu');
    },
    onLeaveCompleted: function() {

    }
  });
  menu.init();
  var post = Barba.BaseView.extend({
    namespace: 'post',
    onEnter: function() {
      if ($(window).width() > 767 && ($(window).width() != 812)) {
        initSlick();
      }
    },
    onEnterCompleted: function() {
      $('body').addClass('post row middle-xs');
      var $slider = $('.slider-contain');
      $slider.fadeIn(1000);
      if ($(window).width() > 767 && ($(window).width() != 812)) {
        initSlick();
      }
      $('.top').animate({
        'opacity': 1
      }, 1000, function() {
        $(this).after($(this).css({
          'background': 'black'
        }));
      });
      $('.barba-container').animate({
        'opacity': 1
      }, 1000);
    },
    onLeave: function() {},
    onLeaveCompleted: function() {}
  });
  post.init();
  var transEffect = Barba.BaseTransition.extend({
    start: function() {
      var _this = this;
      this.newContainerLoading.then(function val() {
        var newC = $(_this.newContainer);
        $("html, body").animate({
          scrollTop: 0
        }, "slow");
        _this.fadeInNewContent(newC);
        _this.valid(newC);
      });
    },
    fadeInNewContent: function(nc) {
      var _this = this;
      nc.hide();
      $(this.oldContainer).fadeOut(1000).promise().done(function() {
        nc.css('visibility', 'visible');
        nc.fadeIn(1000, function() {
          _this.done();
          initVideo();
          if ($(window).width() > 767 && ($(window).width() != 812)) {
            initSlick();
          }
        })
      });
    },
    valid: function(nc) {
      var prev = Barba.HistoryManager.prevStatus();
      //console.log(prev);
      // return prev.namespace === '' ...
    }
  });
  Barba.Pjax.getTransition = function() {
    // if (FromAsteroids.valid()){
    //   return FromAsteroids;
    // }
    // if (MenuToProject.valid()){
    //   return MenuToProject;
    // }
    // if (MenuToAsteroids.valid()) {
    //   return MenuToAsteroids;
    // }
    return transEffect;
  }
  Barba.Pjax.start();
  initVideo();

  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
    //history.scrollRestoration = 'manual';
  });

});

/* Smooth Anchor Scrolling
/––––––––––––––––––––––––*/
// https://css-tricks.com/snippets/jquery/smooth-scrolling/
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // define custom offset (examples: 50 or -200 or (".anchor").height();)
    var custom_offset = 0;
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top + custom_offset
        }, 500, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
