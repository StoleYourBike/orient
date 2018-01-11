'use strict';

var app = {
    scrollController: new ScrollMagic.Controller(),
    misc: {
        init() {
            this.anim.init();
        },
        anim: {
            init() {
                this.header(),
                this.navbar(),
                this.firstScreen(),
                this.services(),
                this.about();
            },
            header() {
                let tween = new TimelineMax()
                            .staggerTo(
                                '.header [data-anim-stagger="vertical"]',
                                0.35,
                                {
                                    transform: `translateY(0)`,
                                    opacity: 1
                                },
                                0.2
                            ),
                    scene = new ScrollMagic.Scene({
                                triggerElement: '.header',
                                reverse: false
                            })
                            .setTween(tween)
                            .addTo(app.scrollController);
            },
            navbar() {
                let navListItems = $('.js-menu').find('.js-menu-link'),
                    tween = new TimelineMax()
                            .to('.navbar-wrapper', 0.1, { transform: `translateY(0)` }, .25)
                            .add([
                                TweenMax.staggerTo('.js-menu-link', 0.25, { transform: `translateX(0)`, opacity: 1 }, 0.1),
                                TweenMax.to('.navbar__button', 0.25, { transform: `translate(0, 0)`, opacity: 1, delay: 1 })
                            ])
                            .to('.js-nav-line', 0.15, { transform:  `translateY(0)` }),
                    scene = new ScrollMagic.Scene({
                                triggerElement: '.navbar',
                                triggerHook: 0.9,
                                reverse: false
                            })
                            .setTween(tween)
                            .addTo(app.scrollController);
            },
            firstScreen() {
                let data = $('.welcome').find('[data-anim-stagger]'),
                    tween = new TimelineMax()
                            .to('.welcome .image__move', .75, {transform: `translateX(0)`})
                            .to('.welcome .image__overlay', .75, {transform: `translateY(0)`})
                            .to('.welcome .backdrop', .25, {scaleX: 1})
                            .add([
                                TweenMax.staggerTo(data, .5, { transform: `translate(0, 0)`, opacity: 1}, .2),
                                TweenMax.to('.scroll', .25, { transform: `translate(0, 0)`, opacity: 1})
                            ]),
                    scene = new ScrollMagic.Scene({
                                triggerElement: '#first-screen',
                                reverse: false
                            })
                            .setTween(tween)
                            .addTo(app.scrollController),
                    scene2 = new ScrollMagic.Scene({
                                triggerElement: '#first-screen',
                                offset: 700
                            })
                            .setTween('.scroll', .35, { bottom: 150, opacity: 0})
                            .addTo(app.scrollController);
            },
            services() {
                let array = [],
                    delay = 0;

                $.each($('.service__inner'), function() {
                    array.push(TweenMax.to($(this), .35, { transform: `translateY(0)`, opacity: 1, delay: delay }))
                    delay += 0.25;

                    let tween = new TimelineMax()
                                .add(array),
                        scene = new ScrollMagic.Scene({
                                    triggerElement: $(this),
                                    reverse: false
                                })
                                .setTween(tween)
                                .addTo(app.scrollController);
                    console.log(this);
                });
            },
            about() {
                let tween = new TimelineMax()
                            .to('.about__backdrop', .75, { scaleX: 1 })
                            .to('#about .image__move', .75, {transform: `translateX(0)`})
                            .to('#about .image__overlay', .75, {transform: `translateY(0)`}),
                    scene = new ScrollMagic.Scene({
                                triggerElement: '.about-container',
                                reverse: false
                            })
                            .setTween(tween)
                            .addTo(app.scrollController);
            }
        }
    },
    lastNews: {
        init() {
            $('.js-last-news').slick({
                draggable: false,
                vertical: true,
                slidesToShow: 2,
                prevArrow: $('.last-news__control_prev'),
                nextArrow: $('.last-news__control_next'),
                infinite: false,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            vertical: false,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3
                        }
                    }
                ]
            });


            let maxHeight = -1;
            
            $('.slick-slide').each(function() {
                if ($(this).height() > maxHeight) {
                    maxHeight = $(this).height();
                }
            });

            $('.slick-slide').each(function() {
                if ($(this).height() < maxHeight) {
                    $(this).css('margin', Math.ceil((maxHeight - $(this).height()) / 2) + 'px 0');
                }
            });
        }
    },
    navbar: {
        init: function() {
            if ( !$('.js-menu-link.active').hasClass('hasLine') ) {
                $('.js-menu-link.active').addClass('hasLine').prepend('<span class="line js-nav-line"></span>');
            }


            this.mouseenter(), 
            this.mouseleave(), 
            this.scroll(), 
            this.click();
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
        this.misc.init();
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

    app.loaded();

});