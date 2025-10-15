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
    const opaciteMain = document.querySelector('.opacite-main')
    burger__js.addEventListener('click', function(){
        burger__jsBody.classList.toggle('active')
        body.classList.toggle('active')
        opacite.classList.toggle('active')
        burger__js.classList.toggle('open')
    })

    document.addEventListener('click', (e) => {
    const isClickOnBurger = e.composedPath().includes(burger__js);
    const isClickOnBurgerMenu = e.composedPath().includes(burger__jsBody);

    const isMenuOpen = burger__jsBody.classList.contains('active');
        if (isMenuOpen && !isClickOnBurger && !isClickOnBurgerMenu) {
            burger__jsBody.classList.remove('active');
            body.classList.remove('active');
            opacite.classList.remove('active');
            burger__js.classList.remove('open');
        }
    });

    //свайпер услуги мобилка
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 'auto',
        spaceBetween: 10,
    });

    //свайпер gallery
    var swiperKrytex = new Swiper(".mySwiperKrytex", {
        slidesPerView: 'auto',
        spaceBetween: 5,
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




    //блог
    const filterButtons = document.querySelectorAll('.nano__blog-buttons-item');
    const blogItems = document.querySelectorAll('.nano__item');
    const loadMoreButtonBlog = document.querySelector('.nano__blog-more');
    
    function getItemsPerPage() {
        return window.innerWidth < 1440 ? 8 : 9;
    }
    
    let currentFilter = 'all';
    let currentVisibleCount = 0;
    
    function applyFilter(filterId) {
        currentFilter = filterId;
        currentVisibleCount = 0;
        
        blogItems.forEach(item => item.classList.add('hidden'));

        loadMoreItems();
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === filterId) {
                btn.classList.add('active');
            }
        });
    }
    
    function loadMoreItems() {
        const itemsPerPage = getItemsPerPage();
        const filteredItems = currentFilter === 'all' 
            ? blogItems 
            : Array.from(blogItems).filter(item => item.id === currentFilter);
        
        let itemsShown = 0;
        
        filteredItems.forEach((item, index) => {
            if (index >= currentVisibleCount && index < currentVisibleCount + itemsPerPage) {
                item.classList.remove('hidden');
                itemsShown++;
            }
        });
        
        currentVisibleCount += itemsShown;
        if (loadMoreButtonBlog) {
            if (currentVisibleCount >= filteredItems.length) {
                loadMoreButtonBlog.style.display = 'none';
            } else {
                loadMoreButtonBlog.style.display = 'block';
            }
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            applyFilter(category);
        });
    });
    
    if (loadMoreButtonBlog) {
        loadMoreButtonBlog.addEventListener('click', loadMoreItems);
    }

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            applyFilter(currentFilter);
        }, 250);
    });

    applyFilter('all');




    

    //попап Консультация
    const popup = document.querySelector('.popup__consultation');
    const openButtons = document.querySelectorAll('[data-popup="consultation"]');
    const closeButton = popup?.querySelector('.popup__close');

    openButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            popup?.classList.add('active');
            body.classList.add('active')
            opaciteMain.classList.add('active')
        });
    });

    closeButton?.addEventListener('click', () => {
        popup?.classList.remove('active');
        body.classList.remove('active')
        opaciteMain.classList.remove('active')
    });

    document.addEventListener('click', (e) => {
    const isPopupOpen = popup.classList.contains('active');
    const isClickOutside = !popup.contains(e.target) && !e.target.closest('[data-popup="consultation"]');
    
        if (isPopupOpen && isClickOutside) {
            popup?.classList.remove('active');
            body.classList.remove('active');
            opaciteMain.classList.remove('active');
        }
    });

    const popupBook = document.querySelector('.popup__book');
    const openButtonsBook = document.querySelectorAll('[data-popup="book"]');
    const closeButtonBook = popupBook?.querySelector('.popup__close-book');

    openButtonsBook.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            popupBook?.classList.add('active');
            body.classList.add('active')
            opaciteMain.classList.add('active')
        });
    });

    closeButtonBook?.addEventListener('click', () => {
        popupBook?.classList.remove('active');
        body.classList.remove('active')
        opaciteMain.classList.remove('active')
    });

    document.addEventListener('click', (e) => {
    const isPopupBookOpen = popupBook.classList.contains('active');
    const isClickOutside = !popupBook.contains(e.target) && !e.target.closest('[data-popup="book"]');
    
        if (isPopupBookOpen && isClickOutside) {
            popupBook?.classList.remove('active');
            body.classList.remove('active');
            opaciteMain.classList.remove('active');
        }
    });






    const selects = document.querySelectorAll('.popup__form-select');

    selects.forEach(select => {
        const changeBox = select.nextElementSibling;

        select.addEventListener('click', (e) => {
            e.stopPropagation();
            document
                .querySelectorAll('.popup__form-select-change.active')
                .forEach(opened => {
                    if (opened !== changeBox) opened.classList.remove('active');
                });
            changeBox.classList.toggle('active');
        });

        changeBox.querySelectorAll('span').forEach(span => {
            span.addEventListener('click', () => {
                const value = span.textContent.trim();

                const buttonSpans = select.querySelectorAll('span');
                buttonSpans.forEach(s => {
                    s.classList.toggle('active', s.textContent.trim() === value);
                });

                changeBox.querySelectorAll('span').forEach(s => {
                    s.classList.toggle('active', s.textContent.trim() !== value);
                });

                changeBox.classList.remove('active');
            });
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.popup__form-group')) {
            document
                .querySelectorAll('.popup__form-select-change.active')
                .forEach(box => box.classList.remove('active'));
        }
    });

    document.addEventListener('click', (e) => {
        if (
            !e.target.closest('.popup__form-select') &&
            !e.target.closest('.popup__form-select-change')
        ) {
            document
            .querySelectorAll('.popup__form-select-change.active')
            .forEach(box => box.classList.remove('active'));
        }
    });





})