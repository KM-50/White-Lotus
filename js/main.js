$(document).ready(() => {
    $('.staff-cards').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        variableWidth: true,
        centerMode: true,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 479,
                settings: {
                    arrows: true
                }
            },
            {
                breakpoint: 280,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });

    $('#gallery-carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        variableWidth: true,
        centerMode: true,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 479,
                settings: {
                    arrows: true
                }
            },
            {
                breakpoint: 280,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });

    $(() => {
        $('#answers-accordion').accordion({
            active: true,
            collapsible: true
        });
    });

    $('.open-modal').click(() => {
        $('#reservation-window').css('display', 'flex');
    });

    $('#reservation-close, #reservation-window').click((e) => {
        if (e.target.id === 'reservation-window' || e.target.id === 'reservation-close-img') {
            $('#reservation-window').hide();
        }
    });

    let loader = $('#loader');

    $('#reserve-btn > button').click(() => {
        $('.text-error').hide();

        let inputs = $('.input');
        inputs.css('border-color', 'rgb(114, 17, 99)');

        let name = $('#name');
        let phone = $('#phone');
        let ritual = $('#ritual');
        let dateTime = $('#date-time');

        if (!name.val()) {
            name.siblings('.text-error').show();
            name.css('border-color', 'red');
            return false;
        } else if (!phone.val()) {
            phone.siblings('.text-error').show();
            phone.css('border-color', 'red');
            return false;
        } else if (!ritual.val()) {
            ritual.siblings('.text-error').show();
            ritual.css('border-color', 'red');
            return false;
        } else if (!dateTime.val()) {
            dateTime.siblings('.text-error').show();
            dateTime.css('border-color', 'red');
            return false;
        } else {
            loader.css('display', 'flex');
            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: 'name=' + name.val() + '&phone=' + phone.val() + '&ritual=' + ritual.val() + '&dateTime=' + dateTime.val(),
                success: () => {
                    $('#order-status').show();
                    $('#reservation-content').hide();
                },
                error: () => {
                    $('#reservation-window').hide();
                    alert('Возникла ошибка при отправке данных. Пожалуйста, свяжитесь с нами по указанному номеру телефона.')
                },
            });
        }
    });

    $('#callback').click(() => {
        $('.text-error').hide();

        let phoneNumber = $('#phone-number');
        phoneNumber.css('border-color', 'rgb(114, 17, 99)');

        if (!phoneNumber.val()) {
            phoneNumber.siblings('.text-error').show();
            phoneNumber.css('border-color', 'red');
            return false;
        } else {
            loader.css('display', 'flex');
            $.ajax({
                type: 'post',
                url: 'callback.php',
                data: 'phoneNumber=' + phoneNumber.val(),
                success: () => {
                    $('#form-callback').css('display', 'none');
                    $('#answer-form-callback').css('display', 'flex');
                },
                error: () => {
                    loader.hide();
                    phoneNumber.siblings('.text-error').hide();
                    $('#form-callback').show();
                    alert('Возникла ошибка при отправке данных. Пожалуйста, свяжитесь с нами по указанному номеру телефона.')
                },
            });
        }
    });

    new WOW({animateClass: 'animate__animated'}).init();

    $('.image-popup-vertical-fit').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }
    });

    $('#burger').click(() => {
        $('#header-container').toggleClass('menu-open');
    });

    $('.menu, #header-menu svg').click(() => {
        $('#header-container').removeClass('menu-open');
    });

    $("#phone").mask("+7 (999) 999 — 9999");
    $("#phone-number").mask("+7 (999) 999 — 9999");

    $('#main-btn').click(() => {
        window.location.href = '#services';
    });
});