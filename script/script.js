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


    //смена языка
    const languageSvg = document.querySelector('.header__language-svg')
    const languageButton = document.querySelector('.header__language-button')
    const languageContainer = document.querySelector('.header__language-container')
    const languageFlag = document.querySelectorAll('.header__language-flag')
    const languageName = document.querySelectorAll('.header__language-name')
    const languageChange = document.querySelector('.header__language-change')

    languageButton.addEventListener('click', () => {
        languageSvg.classList.toggle('active')
        languageContainer.classList.toggle('active')
    })

    languageChange.addEventListener('click', () => {
        languageFlag.forEach(flag => {
            flag.classList.toggle('active')
        })
        languageName.forEach(name => {
            name.classList.toggle('active')
        })
        languageContainer.classList.remove('active')
        languageSvg.classList.remove('active')
    })

    document.addEventListener('click', (e) => {
    const isClickInsideButton = e.target.closest('.header__language-button')
    const isClickInsideContainer = e.target.closest('.header__language-container')
    
        if (!isClickInsideButton && !isClickInsideContainer) {
            languageContainer.classList.remove('active')
            languageSvg.classList.remove('active')
        }
    })


    //показать больше
    const additionalItems = document.querySelectorAll('.additional__item');
    const loadMoreButton = document.querySelector('.additional__item-more');

    if (loadMoreButton) {
        const itemsToShow = 3; 
        if (additionalItems.length <= itemsToShow) {
            loadMoreButton.style.display = 'none';
        } else {
            additionalItems.forEach((item, index) => {
                if (index >= itemsToShow) {
                    item.style.display = 'none';
                }
            });
            loadMoreButton.addEventListener('click', function() {
                const hiddenItems = Array.from(additionalItems).filter(item => 
                    item.style.display === 'none'
                );
                hiddenItems.forEach(item => {
                    item.style.display = '';
                });
                loadMoreButton.style.display = 'none';
            });
        }
    }


})