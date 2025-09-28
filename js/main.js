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
    
    // Audio Controls
    const bgMusic = document.getElementById('bgMusic');
    const audioControl = document.getElementById('audioControl');
    const audioIcon = audioControl.querySelector('i');
    let isPlaying = false;
    
    // Set default volume
    bgMusic.volume = 0.5;
    
    // Play/Pause functionality
    audioControl.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            audioIcon.classList.remove('fa-volume-up');
            audioIcon.classList.add('fa-volume-mute');
        } else {
            bgMusic.play();
            audioIcon.classList.remove('fa-volume-mute');
            audioIcon.classList.add('fa-volume-up');
        }
        isPlaying = !isPlaying;
    });
    
    // Dark/Light Mode Toggle
    const modeToggle = document.getElementById('modeToggle');
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
    
    
    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


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
})(jQuery);

