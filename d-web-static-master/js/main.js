;(function () {
    'use strict';

    // Carousel Feature Slide
    var owlCrouselFeatureSlide = function() {
        var owl = $('.owl-carousel');

        owl.on('initialized.owl.carousel change.owl.carousel',function(elem){
            var current = elem.item.index;
            $(elem.target).find(".owl-item").eq(current).find(".to-animate").removeClass('fadeInUp animated');
            $(elem.target).find(".owl-item").eq(current).find(".to-animate-2").removeClass('fadeInUp animated');
        
        });
        owl.on('initialized.owl.carousel changed.owl.carousel',function(elem){
            setTimeout(function(){
                var current = elem.item.index;
                $(elem.target).find(".owl-item").eq(current).find(".to-animate").addClass('fadeInUp animated');
            }, 700);
            setTimeout(function(){
                var current = elem.item.index;
                $(elem.target).find(".owl-item").eq(current).find(".to-animate-2").addClass('fadeInUp animated');
            }, 900);
        });
        owl.owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            responsiveClass: true,
            nav: true,
            dots: true,
            autoHeight: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 8000,
            autoplayHoverPause: true,
            navText: [  
              "<i class='icon-arrow-left2 owl-direction'></i>",
              "<i class='icon-arrow-right2 owl-direction'></i>"
            ]
        });
    };

    // animate-box
    var contentWayPoint = function() {
        $('.animate-box').waypoint( function( direction ) {
            if( direction === 'down' && !$(this).hasClass('animated') ) {
                $(this.element).addClass('fadeInUp animated');
            }
        } , { offset: '75%' } );
    };

    // Page Nav
    var clickMenu = function() {
        $('a:not([class="external"])').click(function(event){
            var section = $(this).data('nav-section'),
                navbar = $('#navbar');
            $('html, body').animate({
                scrollTop: $('[data-section="' + section + '"]').offset().top
            }, 500);

            if ( navbar.is(':visible')) {
                navbar.removeClass('in');
                navbar.attr('aria-expanded', 'false');
                $('.js-fh5co-nav-toggle').removeClass('active');
            }

            event.preventDefault();
            return false;
        });
    };

    // Reflect scrolling in navigation
    var navActive = function(section) {

        var $el = $('#navbar > ul');
        $el.find('li').removeClass('active');
        $el.each(function(){
            $(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
        });

    };
    var navigationSection = function() {

        var $section = $('div[data-section]');
        
        $section.waypoint(function(direction) {
            if (direction === 'down') {
                navActive($(this.element).data('section'));
            
            }
        }, {
            offset: '150px'
        });

        $section.waypoint(function(direction) {
            if (direction === 'up') {
                navActive($(this.element).data('section'));
            }
        }, {
            offset: function() { return -$(this.element).height() + 155; }
        });

    };


    // Window Scroll
    var windowScroll = function() {
        var lastScrollTop = 0;

        $(window).scroll(function(event){

            var header = $('#fh5co-header'),
                scrlTop = $(this).scrollTop();

            if ( scrlTop > 500 && scrlTop <= 2000 ) {
                header.addClass('navbar-fixed-top fh5co-animated slideInDown');
            } else if ( scrlTop <= 500) {
                if ( header.hasClass('navbar-fixed-top') ) {
                    header.addClass('navbar-fixed-top fh5co-animated slideOutUp');
                    setTimeout(function(){
                        header.removeClass('navbar-fixed-top fh5co-animated slideInDown slideOutUp');
                    }, 100 );
                }
            } 
            
        });
    };

    // Animations
    var publicAnimate = function() {
        if ( $('.public-section').length > 0 ) {    
            $('.public-section .to-animate').each(function( k ) {
                var el = $(this);
                
                setTimeout ( function () {
                    el.addClass('fadeInUp animated');
                },  k * 200, 'easeInOutExpo' );
            });
        }
    };

    var publicWayPoint = function() {
        if ( $('.public-section').length > 0 ) {
            $('.public-section').waypoint( function( direction ) {              
                if( direction === 'down' && !$(this).hasClass('animated') ) {
                    setTimeout(publicAnimate, 200);
                    $(this.element).addClass('animated');
                }
            } , { offset: '95%' } );
        }
    };  

    // Document on load.
    $(document).ready(function(){
        owlCrouselFeatureSlide();
        clickMenu();
        windowScroll();
        navigationSection();

        publicWayPoint();
    });
}());
function($) {
    'use strict';

    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');

    var startUpload = function(files) {
        console.log(files)
    }

    uploadForm.addEventListener('submit', function(e) {
        var uploadFiles = document.getElementById('js-upload-files').files;
        e.preventDefault()

        startUpload(uploadFiles)
    })

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';

        startUpload(e.dataTransfer.files)
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }

}(jQuery);
