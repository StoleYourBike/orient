'use strict';

var app = {
    lastNews: {
        init() {
            $('.js-last-news').slick({
                arrows: false,
                dots: true,
                appendDots: $('.last-news__dots'),
                dotsClass: 'last-news__dots-list',
                draggable: false
            });
        }
    },
    navbar: {
        init: function() {
            if ( !$('.js-menu-link.active').hasClass('hasLine') )
               $('.js-menu-link.active').addClass('hasLine').prepend('<span class="line"></span>');

            this.mouseenter(), this.mouseleave(), this.scroll(), this.click();
        },
        mouseenter: function() {
            $('.js-menu-link').on('mouseenter', function() {
                let leftOffset = $(this).offset().left,
                    elemWidth = $(this).width();

                $('.js-menu-link .line').offset({'left': leftOffset}).css({'width': `${elemWidth}px`});
            });
        },
        mouseleave: function() {
            $('.js-menu').on('mouseleave', function() {
                let elemWidth = $('.js-menu-link.active').width();

                $('.js-menu-link .line')
                    .css({
                        'left': 0, 
                        'width': `${elemWidth}px`
                    });
            })
        },
        click: function() {
            $('a[href*=\\#]').on('click', function(event){     
                event.preventDefault();
                smoothScrollingTo(this.hash);

                $('.navbar-wrapper').addClass('js-navbar-fixed');
            });
        },
        scroll: function() {
            $('body').on('mousewheel', function(e) {
                if ( $('body').hasClass('modal-open') ) {
                    return;
                }

                if ( e.originalEvent.wheelDelta > 0 ) {
                    $('.navbar-wrapper').removeClass('not-top');
                } else {
                    $('.navbar-wrapper').addClass('not-top');
                }
            });
        }
    },
    input: function() {
        $('.phone-number').on('focus', function() {
            $(this).mask('+38 (000) 000-00-00');
        });
    },
    navigation: {
        init: function() {
            $('.navbar-toggler').on('click', function() {
                $('body').toggleClass('modal-open'),
                $(this).toggleClass('menu-open');


                let delay = 0.25;

                $('.menu-wrapper')
                    .toggleClass('hidden')
                    .find('.c-menu').children().each((i, item) => {
                        $(item).css({'animation-delay': `${delay}s`});

                        delay += 0.25;
                });
            });
        }
    },
    gallery: {
        init: function() {
            $('.js-gallery-thumbnail').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        }
    },
    loaded: function() {
        this.lastNews.init();
        this.navbar.init();
        this.navigation.init();
        this.input();
        this.gallery.init();
    }
}

function smoothScrollingTo(target){
    $('html, body').animate({
        scrollTop: $(target).offset().top - 70
    }, 500);

    console.log(target);
}

$(document).ready(function () {
    svg4everybody({});

    $('.js-tilt').tilt({
        perspective: 3000
    })

    app.loaded();
});