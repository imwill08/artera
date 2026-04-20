$(function () {

    /* HEADER TOGGLE handled by React state in Header.jsx */


    /* =========================
       FAQ ACCORDION
    ========================= */
    // $('.faq_box_head').on('click', function () {

    //     const $parent = $(this).closest('.faq_box');

    //     $('.faq_box').not($parent)
    //         .removeClass('active')
    //         .find('.faq_box_body')
    //         .slideUp(300);

    //     $parent.toggleClass('active')
    //         .find('.faq_box_body')
    //         .stop(true, true)
    //         .slideToggle(300);
    // });


    /* =========================
       MOBILE OWL SLIDER
    ========================= */
    // const $mobileSlider = $('.mobileslider');
    // let mobileInit = false;

    // const toggleMobileSlider = () => {
    //     const isMobile = window.innerWidth <= 767;

    //     if (isMobile && !mobileInit) {
    //         $mobileSlider.owlCarousel({
    //             items: 1,
    //             loop: true,
    //             autoplay: true,
    //             autoplayTimeout: 3000,
    //             nav: true,
    //             dots: false,
    //             margin: 10
    //         });
    //         mobileInit = true;

    //     } else if (!isMobile && mobileInit) {
    //         $mobileSlider.trigger('destroy.owl.carousel');
    //         $mobileSlider.removeClass('owl-loaded');
    //         $mobileSlider.find('.owl-stage-outer').children().unwrap();
    //         mobileInit = false;
    //     }
    // };

    // toggleMobileSlider();
    // $(window).on('resize', debounce(toggleMobileSlider, 250));


    /* =========================
       SMOOTH SCROLL
    ========================= */
    const smoothScroll = (selector, offset = 80) => {

        $(selector).on('click', function (e) {

            const target = $(this).attr('href');

            if (target?.startsWith('#') && $(target).length) {
                e.preventDefault();

                $('html, body').animate({
                    scrollTop: $(target).offset().top - offset
                }, 500);
            }
        });
    };

    smoothScroll('.newheadbtn a', 100);


    /* =========================
       AUTO SCROLL ON PAGE LOAD
    ========================= */
    const hash = window.location.hash;

    if (hash && $(hash).length) {

        const offset = 80;

        $('html, body').scrollTop(0);

        setTimeout(() => {
            $('html, body').animate({
                scrollTop: $(hash).offset().top - offset
            }, 300);
        }, 100);
    }


    /* =========================
       DEBOUNCE FUNCTION
    ========================= */
    function debounce(fn, delay = 200) {
        let timer;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(fn, delay);
        };
    }

});