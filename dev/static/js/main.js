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

            this.mouseenter(), this.mouseleave(), this.scroll();
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
        scroll: function() {
            $('body').on('mousewheel', function(e) {
                if ( e.originalEvent.wheelDelta > 0 ) {
                    $('.navbar-wrapper').addClass('js-navbar-fixed');
                } else {
                    $('.navbar-wrapper').removeClass('js-navbar-fixed');
                }
            });
        }
    },
    navigation: {
        init: function() {
            $('.navbar-toggler').on('click', function() {
                $('.menu-wrapper').toggleClass('hidden'),
                $('body').toggleClass('no-scroll'),
                $(this).toggleClass('menu-open');
            })
        }
    },
    loaded: function() {
        this.lastNews.init();
        this.navbar.init();
        this.navigation.init();
    }
}

$(document).ready(function () {
    svg4everybody({});

    app.loaded();
});