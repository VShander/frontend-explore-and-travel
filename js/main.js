$(document).ready(function () {
    const mMenuBtn = $('.m-menu-button');
    const mMenu = $('.m-menu');
    mMenuBtn.on('click', function () {
        mMenu.toggleClass('active');
        $('body').toggleClass('no-scroll')
    });
    var mySwiper = new Swiper('.swiper-container', {
        speed: 400,
        spaceBetween: 25,
        loop: true,
        navigation: {
            nextEl: '.button-next',
            prevEl: '.button-prev'
        }
    });
});