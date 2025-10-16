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



    const tabs = document.querySelectorAll('.pricing__tabs-btn');
    const asides = document.querySelectorAll('.pricing__aside');
    const tables = document.querySelectorAll('.pricing__content-table');

    function isMobile() {
    return window.innerWidth <= 768;
    }

    function initPricing() {
    const firstTab = tabs[0];
    const type = firstTab?.dataset.type;

    tabs.forEach(t => t.classList.remove('active'));
    firstTab?.classList.add('active');

    asides.forEach(aside => {
        aside.classList.toggle('active', aside.dataset.type === type);
        const buttons = aside.querySelectorAll('.pricing__aside-button');

        if (isMobile()) {
        buttons.forEach(b => b.classList.remove('active'));
        tables.forEach(table => table.classList.remove('active'));
        } else {
        buttons.forEach((b, i) => b.classList.toggle('active', i === 0));
        const firstTableName = buttons[0]?.dataset.table;
        tables.forEach(table => {
            table.classList.toggle('active', table.dataset.table === firstTableName &&
            table.closest('.pricing__bottom').querySelector(`.pricing__aside[data-type="${type}"]`)
            );
        });
        }
    });
    }

    tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const type = tab.dataset.type;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        asides.forEach(aside => {
        aside.classList.toggle('active', aside.dataset.type === type);
        const buttons = aside.querySelectorAll('.pricing__aside-button');

        if (isMobile()) {
            buttons.forEach(b => b.classList.remove('active'));
            tables.forEach(table => table.classList.remove('active'));
        } else {
            buttons.forEach((b, i) => b.classList.toggle('active', i === 0));
            const firstTableName = buttons[0]?.dataset.table;
            tables.forEach(table => {
            table.classList.toggle('active', table.dataset.table === firstTableName &&
                table.closest('.pricing__bottom').querySelector(`.pricing__aside[data-type="${type}"]`)
            );
            });
        }
        });
    });
    });

    asides.forEach(aside => {
    const buttons = aside.querySelectorAll('.pricing__aside-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
        const tableName = btn.dataset.table;
        const type = aside.dataset.type;

        const relatedTables = Array.from(tables).filter(t => t.closest('.pricing__bottom').querySelector(`.pricing__aside[data-type="${type}"]`));
        const table = relatedTables.find(t => t.dataset.table === tableName);

        if (!table) return;

        if (isMobile()) {
            const isActive = btn.classList.contains('active');
            btn.classList.toggle('active', !isActive);

            if (!isActive) {
            btn.insertAdjacentElement('afterend', table);
            table.classList.add('active');
            } else {
            table.classList.remove('active');
            }
        } else {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            relatedTables.forEach(t => t.classList.toggle('active', t.dataset.table === tableName));
        }
        });
    });
    });

    window.addEventListener('load', initPricing);
    window.addEventListener('resize', initPricing);





    $.fn.setCursorPosition = function(pos) {
    const el = $(this).get(0);
    if (el.setSelectionRange) {
        el.setSelectionRange(pos, pos);
    } else if (el.createTextRange) {
        const range = el.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
    return this;
    };

    $('input[type="tel"]')
    .mask('+358 (999) 999 99 99', { autoclear: false })
    .on('click', function(e) {
        const value = $(this).val();

        const clean = value.replace(/[^0-9]/g, '');

        if (clean.length <= 3) {
        e.preventDefault();
        $(this).setCursorPosition(6);
        }
    });


      



    const ButtonService = document.querySelectorAll('.btn-service');
    const TargetService = document.querySelector('.target__service');
    const isOnIndexPage = window.location.pathname.includes('index.html');

    ButtonService?.forEach(button => {
        button?.addEventListener('click', function() {
            if (isOnIndexPage) {
                if (TargetService) {
                    window.scrollTo({ top: TargetService.offsetTop, behavior: 'smooth' });
                }
            } else {
                localStorage.setItem('scrollToPartner', true);
                window.location.href = 'index.html';
            }
        });
    });

    if (isOnIndexPage && localStorage.getItem('scrollToPartner')) {
        setTimeout(() => {
            if (TargetService) {
                window.scrollTo({ top: TargetService.offsetTop, behavior: 'smooth' });
            }
            localStorage.removeItem('scrollToPartner');
        }, 500);
    }














})