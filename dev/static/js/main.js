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
                this.about(),
                this.consult(),
                this.certificates(),
                this.contacts();
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
                            .add([
                                TweenMax.staggerTo('.js-menu-link', 0.25, { transform: `translateX(0)`, opacity: 1 }, 0.1),
                                TweenMax.to('.navbar__button', 0.25, { transform: `translate(0, 0)`, opacity: 1, delay: 1 })
                            ])
                            .to('.js-nav-line', 0.15, { transform:  `translateY(0)` }),
                    scene = new ScrollMagic.Scene({
                                triggerElement: '.navbar',
                                reverse: false
                            })
                            .setTween(tween)
                            .addTo(app.scrollController);
            },
            firstScreen() {
                let data = $('.welcome').find('[data-anim-stagger]'),
                    tween = new TimelineMax()
                            .to('.welcome .image__move', .5, {transform: `translateX(0)`})
                            .to('.welcome .image__overlay', .5, {transform: `translateY(0)`})
                            .add([
                                TweenMax.to('.welcome .backdrop', .25, {scaleX: 1}),
                                TweenMax.staggerTo(data, .5, { transform: `translate(0, 0)`, opacity: 1}, .2)
                            ]),
                    scene = new ScrollMagic.Scene({
                                triggerElement: '#first-screen',
                                reverse: false
                            })
                            .setTween(tween)
                            .addTo(app.scrollController),
                    scene2 = new ScrollMagic.Scene({
                                triggerElement: '.scroll',
                                offset: 200
                            })
                            .setTween('.scroll', .35, { y: -150, opacity: 0})
                            .addTo(app.scrollController);
            },
            services() {
                let container = $('#services'),
                    anim = {
                        title: {
                            move: container.find('[data-title-move]'),
                            overlay: container.find('.title__overlay'),
                            timing: .5
                        }
                    },
                    tween = new TimelineMax()
                            .add([
                                TweenMax.staggerTo([
                                        anim.title.move, 
                                        anim.title.overlay
                                    ], anim.title.timing, { 
                                        x: 0,
                                        y: 0
                                    }, anim.title.timing)
                            ]),
                    scene = new ScrollMagic.Scene({
                                triggerElement: container,
                                reverse: false
                            })
                            .setTween(tween)
                            .addTo(app.scrollController);

                $.each($('.service'), function(i, item) {
                    let tween2 = new TimelineMax()
                                .staggerTo($(item).children(), .5, { 
                                    x: 0,
                                    y: 0,
                                    opacity: 1
                                }, .25),
                        scene2 = new ScrollMagic.Scene({
                                    triggerElement: $(this),
                                    triggerHook: 'onEnter',
                                    offset: 200,
                                    reverse: false
                                })
                                .setTween(tween2)
                                .addTo(app.scrollController);
                });
            },
            about() {
                let container = $('#about'),
                    anim = {
                        backdrop: '.about__backdrop',
                        text: container.find('[data-anim-stagger]'),
                        title: {
                            move: container.find('[data-title-move]'),
                            overlay: container.find('.title__overlay'),
                            timing: .5
                        },
                        picture: {
                            move: container.find('[data-img-move]'),
                            overlay: container.find('.image__overlay'),
                            timing: .5
                        }
                    },
                    tween = new TimelineMax()
                            .to(anim.backdrop, .75, { scale: 1 })
                            .add([
                                TweenMax.staggerTo([
                                        anim.picture.move, 
                                        anim.picture.overlay
                                    ], anim.picture.timing, {
                                        x: 0,
                                        y: 0
                                    }, anim.picture.timing),
                                TweenMax.staggerTo([
                                        anim.title.move, 
                                        anim.title.overlay
                                    ], anim.title.timing, { 
                                        x: 0,
                                        y: 0
                                    }, anim.title.timing),
                                TweenMax.staggerTo(anim.text, .5, { 
                                        x: 0, 
                                        y: 0, 
                                        opacity: 1
                                    }, .2)
                            ]),
                    scene = new ScrollMagic.Scene({
                                triggerElement: '.about-container',
                                reverse: false
                            })
                            .setTween(tween)
                            .addTo(app.scrollController);
            },
            consult() {
                let container = $('#consultation'),
                    anim = {
                        text: container.find('[data-anim-stagger]'),
                        title: {
                            move: container.find('[data-title-move]'),
                            overlay: container.find('.title__overlay'),
                            timing: .5
                        }
                    },
                    tween = new TimelineMax()
                            .add([
                                TweenMax.staggerTo([
                                        anim.title.move, 
                                        anim.title.overlay
                                    ], anim.title.timing, { 
                                        x: 0,
                                        y: 0
                                    }, anim.title.timing),
                                TweenMax.staggerTo(anim.text, .5, { 
                                        x: 0, 
                                        y: 0,
                                        opacity: 1
                                    }, .35)
                            ]),
                    scene = new ScrollMagic.Scene({
                                triggerElement: container,
                                reverse: false
                            })
                            .setTween(tween)
                            .addTo(app.scrollController);
            },
            certificates() {
                let container = $('#certificates'),
                    anim = {
                        text: container.find('[data-anim-stagger]'),
                        title: {
                            move: container.find('[data-title-move]'),
                            overlay: container.find('.title__overlay'),
                            timing: .5
                        }
                    },
                    tween = new TimelineMax()
                            .add([
                                TweenMax.staggerTo([
                                        anim.title.move, 
                                        anim.title.overlay
                                    ], anim.title.timing, { 
                                        x: 0,
                                        y: 0
                                    }, anim.title.timing),
                                TweenMax.staggerTo(anim.text, .5, { 
                                        x: 0, 
                                        y: 0,
                                        opacity: 1
                                    }, .35)
                            ]),
                    scene = new ScrollMagic.Scene({
                                triggerElement: container,
                                reverse: false
                            })
                            .setTween(tween)
                            .addTo(app.scrollController);
            },
            contacts() {
                let container = $('#contacts'),
                    anim = {
                        form: container.find('.contact-form'),
                        text: container.find('[data-anim-stagger]'),
                        title: {
                            move: container.find('[data-title-move]'),
                            overlay: container.find('.title__overlay'),
                            timing: .75
                        }
                    },
                    tween = new TimelineMax()
                            .add([
                                TweenMax.staggerTo([
                                        anim.title.move, 
                                        anim.title.overlay
                                    ], anim.title.timing, { 
                                        x: 0,
                                        y: 0
                                    }, anim.title.timing),
                                TweenMax.to(anim.form, 1, { scaleY: 1 }),
                                TweenMax.staggerTo(anim.text, .5, { 
                                        x: 0, 
                                        y: 0,
                                        opacity: 1
                                    }, .15)
                            ]),
                    scene = new ScrollMagic.Scene({
                                triggerElement: container,
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
                        breakpoint: 992,
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
                if ( $(window).width() >= 992 && $(window).width() <= 1200 ) {
                    return false;
                }

                if ($(this).height() < maxHeight ) {
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
            let lastScrollTop = 0;

            document.addEventListener('scroll', function (event) {
                if ( $('body').hasClass('modal-open') ) {
                    return;
                }

                let st = window.pageYOffset || document.documentElement.scrollTop;

                if ( $(window).scrollTop() < 70 ) {
                    $('.navbar-wrapper').removeClass('is-show is-fixed');

                    return;
                }

                if ( st < lastScrollTop ) {
                    $('.navbar-wrapper').removeClass('not-top');
                } else {
                    $('.navbar-wrapper').addClass('not-top').addClass('is-fixed');
                }

                lastScrollTop = st;
            }, false);
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