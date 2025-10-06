(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Audio Controls - Initialize after DOM is ready
    let bgMusic, audioControl, audioIcon;
    let isPlaying = false;
    
    // Initialize audio controls when DOM is ready
    function initializeAudioControls() {
        bgMusic = document.getElementById('bgMusic');
        audioControl = document.getElementById('audioControl');
        
        if (!bgMusic || !audioControl) {
            console.error('Audio elements not found');
            return false;
        }
        
        audioIcon = audioControl.querySelector('i');
        
        // Set default volume
        bgMusic.volume = 0.8;
        return true;
    }

    // Auto-play background music when page loads
    function attemptAutoPlay() {
        if (!bgMusic || !audioIcon) {
            console.error('Audio elements not initialized');
            return;
        }
        
        // Start with muted autoplay (browsers allow this)
        bgMusic.muted = true;
        bgMusic.play().then(() => {
            console.log('Background music started (muted)');
            // After a short delay, try to unmute
            setTimeout(() => {
                bgMusic.muted = false;
                isPlaying = true;
                audioIcon.classList.remove('fa-volume-mute');
                audioIcon.classList.add('fa-volume-up');
                console.log('Background music unmuted and playing');
            }, 500);
        }).catch((error) => {
            console.log('Auto-play blocked by browser:', error);
            // Auto-play was blocked, user will need to click to start
            isPlaying = false;
            audioIcon.classList.remove('fa-volume-up');
            audioIcon.classList.add('fa-volume-mute');
        });
    }

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing audio controls...');
        
        if (initializeAudioControls()) {
            // Play/Pause functionality
            audioControl.addEventListener('click', function() {
                if (isPlaying) {
                    bgMusic.pause();
                    audioIcon.classList.remove('fa-volume-up');
                    audioIcon.classList.add('fa-volume-mute');
                    isPlaying = false;
                } else {
                    bgMusic.muted = false;
                    bgMusic.play().then(() => {
                        audioIcon.classList.remove('fa-volume-mute');
                        audioIcon.classList.add('fa-volume-up');
                        isPlaying = true;
                        console.log('Music started by user interaction');
                    }).catch((error) => {
                        console.error('Failed to play audio:', error);
                    });
                }
            });
            
            // Try to auto-play after initialization
            setTimeout(attemptAutoPlay, 1000);
            
            // Add user interaction listener for browsers that block autoplay
            document.addEventListener('click', function startAudioOnInteraction() {
                if (!isPlaying && bgMusic.paused) {
                    bgMusic.muted = true;
                    bgMusic.play().then(() => {
                        console.log('Audio started on user interaction');
                        setTimeout(() => {
                            bgMusic.muted = false;
                            isPlaying = true;
                            audioIcon.classList.remove('fa-volume-mute');
                            audioIcon.classList.add('fa-volume-up');
                        }, 100);
                    }).catch(console.error);
                }
                document.removeEventListener('click', startAudioOnInteraction);
            });
        }
    });
    
    // Dark/Light Mode Toggle
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        const modeIcon = modeToggle.querySelector('i');
        let isDarkMode = false;
        
        // Check for saved theme preference
        if (localStorage.getItem('darkMode') === 'true') {
            enableDarkMode();
        }
        
        modeToggle.addEventListener('click', function() {
            if (isDarkMode) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
        
        function enableDarkMode() {
            document.body.classList.add('dark-mode');
            modeIcon.classList.remove('fa-moon');
            modeIcon.classList.add('fa-sun');
            isDarkMode = true;
            localStorage.setItem('darkMode', 'true');
        }
        
        function disableDarkMode() {
            document.body.classList.remove('dark-mode');
            modeIcon.classList.remove('fa-sun');
            modeIcon.classList.add('fa-moon');
            isDarkMode = false;
            localStorage.setItem('darkMode', 'false');
        }
    }
    
    // Initiate the wowjs
    new WOW().init();

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Smooth scrolling to section
    $(".btn-scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 0
            }, 1500, 'easeInOutExpo');
        }
    });
    
    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Skills progress bar animation
    var skillsAnimated = false;
    $(window).scroll(function () {
        if (!skillsAnimated) {
            var skillsSection = $('#skills');
            if (skillsSection.length > 0) {
                var sectionTop = skillsSection.offset().top;
                var sectionHeight = skillsSection.outerHeight();
                var windowTop = $(window).scrollTop();
                var windowHeight = $(window).height();
                if (windowTop + windowHeight > sectionTop + sectionHeight / 2) {
                    $('.progress-bar').each(function() {
                        var value = $(this).attr('aria-valuenow');
                        $(this).css('width', value + '%');
                    });
                    skillsAnimated = true;
                }
            }
        }
    });

})(jQuery);
