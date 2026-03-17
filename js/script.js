$(document).ready(function() {
    
    // ========================================
    // Initialize AOS (Animate on Scroll)
    // ========================================
    if (window.AOS && typeof window.AOS.init === 'function') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out',
            disable: 'mobile'
        });
    }

    // ========================================
    // Navbar Scroll Effect - Gradient on Scroll
    // ========================================
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }
    });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    $('a[href*="#"]').on('click', function(e) {
        if (this.hash !== '' && $(this.hash).length) {
            e.preventDefault();
            const hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800, function() {
                history.pushState(null, null, hash);
            });
            
            if ($(window).width() < 992) {
                $('#navbarNav').removeClass('show');
                $('body').css('overflow', 'auto');
            }
        }
    });

    // ========================================
    // Active Nav Link on Scroll
    // ========================================
    $(window).on('scroll', function() {
        var scrollPos = $(window).scrollTop();
        
        $('section').each(function() {
            var top = $(this).offset().top - 100;
            var bottom = top + $(this).outerHeight();
            
            if (scrollPos >= top && scrollPos <= bottom) {
                var id = $(this).attr('id');
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + id + '"]').addClass('active');
            }
        });
    });

    // ========================================
    // Back to Top Button
    // ========================================
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').addClass('show');
        } else {
            $('#back-to-top').removeClass('show');
        }
    });

    $('#back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    // ========================================
    // Hero Carousel - 3 Second Duration
    // ========================================
    $('#heroCarousel').carousel({
        interval: 3000,
        pause: 'hover',
        wrap: true,
        keyboard: true,
        ride: 'carousel'
    });

    $('.carousel-control-prev, .carousel-control-next, .carousel-indicators button').click(function() {
        $('#heroCarousel').carousel('pause');
        setTimeout(function() {
            $('#heroCarousel').carousel('cycle');
        }, 5000);
    });

    $('.hero-section').hover(
        function() {
            $('#heroCarousel').carousel('pause');
        },
        function() {
            $('#heroCarousel').carousel('cycle');
        }
    );

    $('#heroCarousel').on('slide.bs.carousel', function(event) {
        var index = event.to;
        $('.carousel-indicators button').removeClass('active').eq(index).addClass('active');
    });

    // ========================================
    // Ensure Images are Ultra-Sharp
    // ========================================
    $('.carousel-item img').css({
        '-webkit-transform': 'translateZ(0)',
        'transform': 'translateZ(0)',
        '-webkit-backface-visibility': 'hidden',
        'backface-visibility': 'hidden',
        'image-rendering': '-webkit-optimize-contrast',
        'image-rendering': 'crisp-edges',
        '-ms-interpolation-mode': 'nearest-neighbor'
    });

    // ========================================
    // Initialize Owl Carousel for Projects - FIXED VERSION
    // ========================================
    if ($.fn && typeof $.fn.owlCarousel === 'function' && $('.project-carousel').length) {
        $('.project-carousel').owlCarousel({
            loop: true,
            margin: 18,
            nav: false,        // Hide navigation arrows
            dots: true,         // Show dots
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            smartSpeed: 800,
            responsive: {
                0: {
                    items: 1,
                    dots: true,
                    nav: false
                },
                576: {
                    items: 1,
                    dots: true,
                    nav: false
                },
                768: {
                    items: 2,
                    dots: true,
                    nav: false
                },
                992: {
                    items: 3,
                    dots: true,
                    nav: false
                }
            },
            onInitialized: function() {
                // Ensure dots are visible
                $('.project-carousel .owl-dots').css('display', 'block');
            }
        });
    }

    // ========================================
    // Initialize Owl Carousel for Testimonials
    // ========================================
    if ($.fn && typeof $.fn.owlCarousel === 'function' && $('.testimonial-carousel').length) {
        $('.testimonial-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
        });
    }

    // ========================================
    // Update Copyright Year Automatically
    // ========================================
    var currentYear = new Date().getFullYear();
    $('footer .border-top p').html('&copy; ' + currentYear + ' Alukaz. All rights reserved. Designed with <i class="fa-solid fa-heart" style="color: #d8492a;"></i> for Alukaz');

    // ========================================
    // Add Hover Effect to Cards
    // ========================================
    $('.feature-card, .process-card, .team-card, .category-card, .value-card, .partner-card').hover(
        function() {
            $(this).addClass('shadow-lg');
        },
        function() {
            $(this).removeClass('shadow-lg');
        }
    );

    // ========================================
    // Counter Animation for Stats
    // ========================================
    function animateCounter() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var countTo = parseInt($this.attr('data-count'));
            
            if (!isNaN(countTo) && !$this.hasClass('counted')) {
                $({ countNum: parseInt($this.text()) }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        var num = Math.floor(this.countNum);
                        $this.text(num + (countTo === 100 ? '%' : '+'));
                    },
                    complete: function() {
                        $this.text(countTo + (countTo === 100 ? '%' : '+'));
                        $this.addClass('counted');
                    }
                });
            }
        });
    }

    $(window).on('scroll', function() {
        $('.stat-box').each(function() {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if (bottom_of_window > bottom_of_object) {
                animateCounter();
            }
        });
    });

    // ========================================
    // Mobile Menu Functions
    // ========================================
    window.closeMenu = function() {
        $('#navbarNav').removeClass('show');
        $('body').css('overflow', 'auto');
    };

    $('.navbar-toggler').click(function() {
        setTimeout(function() {
            if ($('#navbarNav').hasClass('show')) {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', 'auto');
            }
        }, 100);
    });

    $(document).keyup(function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('.navbar-collapse, .navbar-toggler').length) {
            if ($('#navbarNav').hasClass('show')) {
                closeMenu();
            }
        }
    });

    // ========================================
    // iOS Specific Fixes
    // ========================================
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        $('.carousel-item img').css({
            '-webkit-transform': 'translateZ(0)',
            'transform': 'translateZ(0)',
            '-webkit-backface-visibility': 'hidden',
            'backface-visibility': 'hidden'
        });
        
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
        
        $(window).on('resize', function() {
            var vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', vh + 'px');
        });
    }

});

// ========================================
// Window Load Event
// ========================================
$(window).on('load', function() {
    $('body').addClass('loaded');
    if (window.AOS && typeof window.AOS.refresh === 'function') {
        AOS.refresh();
    }
    console.log('%c Alukaz Website Loaded Successfully! ', 'background: #d8492a; color: white; font-size: 14px; padding: 5px; border-radius: 5px;');
});

// ========================================
// Window Resize Handler
// ========================================
$(window).on('resize', function() {
    if (window.AOS && typeof window.AOS.refresh === 'function') {
        AOS.refresh();
    }
});

// Dynamic Business Hours Status
function updateBusinessStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    
    let isOpen = false;
    let todayBadge1 = document.getElementById('todayBadge1');
    let todayBadge2 = document.getElementById('todayBadge2');
    let statusText = document.getElementById('statusText');
    let statusIndicator = document.querySelector('.status-indicator');
    let statusContainer = document.querySelector('.current-status');
    
    // Hide all today badges first
    if (todayBadge1) todayBadge1.style.display = 'none';
    if (todayBadge2) todayBadge2.style.display = 'none';
    
    // Monday - Friday (9 AM - 6 PM)
    if (day >= 1 && day <= 5) {
        if (day === 1 && todayBadge1) todayBadge1.style.display = 'inline-block'; // Monday
        const start = 9 * 60; // 9:00 AM
        const end = 18 * 60; // 6:00 PM
        isOpen = currentTime >= start && currentTime < end;
    }
    // Saturday (10 AM - 2 PM)
    else if (day === 6) {
        if (todayBadge2) todayBadge2.style.display = 'inline-block';
        const start = 10 * 60; // 10:00 AM
        const end = 14 * 60; // 2:00 PM
        isOpen = currentTime >= start && currentTime < end;
    }
    // Sunday (Closed)
    
    if (statusText) {
        statusText.textContent = isOpen ? 'Open' : 'Closed';
        statusText.style.color = isOpen ? '#28a745' : '#dc3545';
    }
    
    if (statusIndicator) {
        statusIndicator.style.background = isOpen ? '#28a745' : '#dc3545';
    }
    
    if (statusContainer) {
        statusContainer.style.background = isOpen 
            ? 'linear-gradient(135deg, rgba(40, 167, 69, 0.05), rgba(40, 167, 69, 0.1))'
            : 'linear-gradient(135deg, rgba(220, 53, 69, 0.05), rgba(220, 53, 69, 0.1))';
        statusContainer.style.borderColor = isOpen 
            ? 'rgba(40, 167, 69, 0.2)' 
            : 'rgba(220, 53, 69, 0.2)';
    }
}

// Update status on load and every minute
updateBusinessStatus();
setInterval(updateBusinessStatus, 60000);