document.addEventListener("DOMContentLoaded", function(){
    
    
    //галерея
    const marquee = document.querySelector('.marquee');
    const containerWidth = document.querySelector('.marquee-container')?.offsetWidth;
    const marqueeWidth = marquee?.scrollWidth;
    const animationDuration = (marqueeWidth / 100) + 's';
    if (marquee) {
        marquee.style.animationDuration = animationDuration;
    }


    //бургер
    const burger__js = document.querySelector('.header__burger-button')
    const burger__jsBody = document.querySelector('.header__burger')
    const body = document.querySelector('body')
    const opacite = document.querySelector('.opacite')
    burger__js.addEventListener('click', function(){
        burger__jsBody.classList.toggle('active')
        body.classList.toggle('active')
        opacite.classList.toggle('active')
        burger__js.classList.toggle('open')
    })

    document.addEventListener('click', (e) => {
    const isClickOnBurger = e.composedPath().includes(burger__js);
    const isClickOnBurgerMenu = e.composedPath().includes(burger__jsBody);

        if (!isClickOnBurger && !isClickOnBurgerMenu) {
            burger__jsBody.classList.remove('active');
            body.classList.remove('active');
            opacite.classList.remove('active');
            burger__js.classList.remove('open')
        }
    });

    //свайпер услуги мобилка
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 'auto',
        spaceBetween: 10,
    });

})