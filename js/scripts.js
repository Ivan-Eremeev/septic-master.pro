window.onload = function () {

  // Липкое меню.
  function stikyMenu(header) {
    let headerTop = header.offset().top;
    headerToggleClass();
    $(window).scroll(function () {
      headerToggleClass();
    });
    function headerToggleClass() {
      if ($(window).scrollTop() > headerTop + 250) {
        header.addClass('sticky');
      } else if ($(window).scrollTop() <= headerTop) {
        header.removeClass('sticky');
      }
    }
  };
  stikyMenu($('#headerSticky'));

  // Меню в хедере
  function headerMenu() {
    let link = $('.js-menu-toggle');
    let sublist = $('.header__menu-sublist');
    link.on('click', function (e) {
      e.preventDefault();
      let currentLink = $(this);
      let currentSublist = currentLink.siblings('.header__menu-sublist');
      if (!currentLink.hasClass('active')) {
        link.removeClass('active');
        currentLink.addClass('active');
        sublist.removeClass('open');
        currentSublist.addClass('open');
        if ($(window).width() <= 991) {
          sublist.stop().slideUp();
          currentSublist.stop().slideDown();
        }
      }else {
        currentLink.removeClass('active');
        currentSublist.removeClass('open');
        if ($(window).width() <= 991) {
          currentSublist.stop().slideUp();
        }
      }
    });
    if ($(window).width() > 991) {
      $(document).mouseup(function (e) {
        if (!link.is(e.target)
          && link.has(e.target).length === 0
          && !sublist.is(e.target)
          && sublist.has(e.target).length === 0) {
          link.removeClass('active');
          sublist.removeClass('open');
        }
      });
    }
    $(window).resize(function () {
      if ($(window).width() > 991) {
        sublist.attr('style', '');
      }
    });
  }
  headerMenu();

  // Каталог в хедере
  function catalogMenu() {
    let btn = $('#catalogBtn');
    let catalog = $('#catalogMenu');
    let body = $('body');
    let hamburger = btn.find('.hamburger');
    btn.on('click', function (e) {
      e.preventDefault;
      btn.toggleClass('active');
      catalog.toggleClass('open');
      body.toggleClass('overlay');
      hamburger.toggleClass('is-active');
    });
    $(document).mouseup(function (e) {
      if (!btn.is(e.target)
        && btn.has(e.target).length === 0
        && !catalog.is(e.target)
        && catalog.has(e.target).length === 0) {
        btn.removeClass('active');
        catalog.removeClass('open');
        body.removeClass('overlay');
        hamburger.removeClass('is-active');
      }
    });
  }
  catalogMenu();

  // Переключение табов в каталоге
  function catalogTabs() {
    let menuItem = $('[data-catalog-trigger]');
    let dropItem = $('[data-catalog-drop]');
    menuItem.on('click', function (e) {
      e.preventDefault();
      let currentMenuItem = $(this);
      let currentDropItem = $('[data-catalog-drop="' + currentMenuItem.data('catalog-trigger') + '"]');
      if (!currentMenuItem.hasClass('active')) {
        menuItem.removeClass('active');
        dropItem.removeClass('open');
        currentMenuItem.addClass('active');
        currentDropItem.addClass('open');
      }
    })
  }
  catalogTabs();

  // Выпадайки при клике по кнопке
  // Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
  // Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
  function dropBlock(btn, lock = false) {
    let $this = undefined,
        drop = undefined,
        close = $('.js-drop-close'),
        body = $('body');
    btn.on('click', function (e) {
      e.preventDefault;
      let $this = $(this);
      let drop = $('#' + $this.data('drop'));
      let scrollWidth = (window.innerWidth - $(window).width());
      if (!$this.hasClass('is-active')) {
        $this.addClass('is-active');
        drop.addClass('open');
        if (lock) {
          body.toggleClass('lock');
          body.css('padding-right', scrollWidth);
        }
      } else {
        $this.removeClass('is-active');
        drop.removeClass('open');
        body.removeClass('lock');
        body.css('padding-right', 0);
      }
      $(document).mouseup(function (e) {
        if (!$this.is(e.target)
          && $this.has(e.target).length === 0
          && !drop.is(e.target)
          && drop.has(e.target).length === 0) {
          $this.removeClass('is-active');
          drop.removeClass('open');
          body.removeClass('lock');
          body.css('padding-right', 0);
        }
      });
    })
    close.on('click', function () {
      $('[data-drop="' + $(this).data('drop') +'"]').removeClass('is-active');
      $('#' + $(this).data('drop')).removeClass('open');
      body.removeClass('lock');
      body.css('padding-right', 0);
    })
  }
  dropBlock($('.js-drop-btn'));
  dropBlock($('.js-drop-menu'), true);

  // Swiper | Слайдер
  // if ($('#swiper').length) {
  //   const swiper = new Swiper('#swiper', {
  //     slidesPerView: 1,
  //     simulateTouch: false,
  //     pagination: {
  //       el: '.swiper-pagination',
  //       clickable: true,
  //     },
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     },
  //     scrollbar: {
  //       el: '.swiper-scrollbar',
  //     },
  //   });
  // }

  // Swiper | Слайдер баннер на главной
  if ($('#sliderWelcome').length) {
    const sliderWelcome = new Swiper('#sliderWelcome', {
      slidesPerView: 1,
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      speed: 500,
      autoplay: {
        delay: 5000
      },
      pagination: {
        el: '.welcome__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.welcome__slider-arrow--next',
        prevEl: '.welcome__slider-arrow--prev',
      },
    });
  }

  // Swiper | Слайдер "преимущества"
  if ($('#sliderBenefit').length) {
    const sliderBenefit = new Swiper('#sliderBenefit', {
      slidesPerView: 2.1,
      threshold: 3,
      loop: true,
      autoplay: {
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 1000,
      navigation: {
        nextEl: '.benefit__slider-arrow--next',
        prevEl: '.benefit__slider-arrow--prev',
      },
      breakpoints: {
        576: {
          slidesPerView: 3,
        },
        769: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 7,
        },
        1400: {
          slidesPerView: 9,
        },
      }
    });
  }

  // Swiper | Слайдер "популярные категории"
  if ($('#popularCategoriesSlider').length) {
    const popularCategoriesSlider = new Swiper('#popularCategoriesSlider', {
      slidesPerView: 'auto',
      autoplay: {
        anabled: true,
        delay: 1,
      },
      speed: 4000,
      navigation: {
        nextEl: '.popular__slider-arrow--next',
        prevEl: '.popular__slider-arrow--prev',
      },
      threshold: 3,
      grid: {
        fill: 'row',
        rows: 2,
      },
    });
  }
  
  // Swiper | Слайдер "популярные типы"
  if ($('#popularTypesSlider').length) {
    const popularTypesSlider = new Swiper('#popularTypesSlider', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      threshold: 3,
      breakpoints: {
        768: {
          spaceBetween: 40,
        },
      }
    });
  }

  // Swiper | Слайдер "производители"
  if ($('#sliderBrands').length) {
    const sliderBrands = new Swiper('#sliderBrands', {
      slidesPerView: 2.1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        anabled: true,
        delay: 1,
      },
      speed: 4000,
      pagination: {
        el: '.brands__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.brands__slider-arrow--next',
        prevEl: '.brands__slider-arrow--prev',
      },
      breakpoints: {
        576: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        769: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        1400: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
      }
    });
  }

  // Swiper | Слайдер "производители"
  if ($('.js-brands-slider').length) {
    const Swipers = Array.from(document.querySelectorAll('.js-brands-slider'), n => {
      const sliderBrands = new Swiper(n.querySelector('.sliderBrands'), {
        slidesPerView: 2.2,
        spaceBetween: 10,
        loop: true,
        autoplay: {
          anabled: true,
          delay: 1,
        },
        speed: 4000,
        pagination: {
          el: n.querySelector('.brands__pagination'),
          clickable: true,
        },
        navigation: {
          nextEl: n.querySelector('.brands__slider-arrow--next'),
          prevEl: n.querySelector('.brands__slider-arrow--prev'),
        },
        breakpoints: {
          576: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          769: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }
      });
    })
  }

  // Swiper | Слайдер "акции и скидки"
  if ($('#sliderDiscount').length) {
    const sliderDiscount = new Swiper('#sliderDiscount', {
      slidesPerView: 1.6,
      spaceBetween: 17,
      threshold: 3,
      // loop: true,
      autoplay: {
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 1000,
      pagination: {
        el: '.discount__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.discount__slider-arrow--next',
        prevEl: '.discount__slider-arrow--prev',
      },
      breakpoints: {
        576: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        769: {
          spaceBetween: 30,
          slidesPerView: 2,
        },
        992: {
          spaceBetween: 30,
          slidesPerView: 3,
        },
        1200: {
          spaceBetween: 30,
          slidesPerView: 4,
        },
        1400: {
          spaceBetween: 30,
          slidesPerView: 4,
        },
      }
    });
  }

  // Swiper | Слайдер "сертификаты"
  if ($('#sliderSertificates').length) {
    const sliderSertificates = new Swiper('#sliderSertificates', {
      slidesPerView: 2.07,
      spaceBetween: 20,
      threshold: 3,
      loop: true,
      autoplay: {
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 1000,
      pagination: {
        el: '.sertificates__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.sertificates__slider-arrow--next',
        prevEl: '.sertificates__slider-arrow--prev',
      },
      breakpoints: {
        576: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        769: {
          spaceBetween: 30,
          slidesPerView: 3,
        },
        992: {
          spaceBetween: 30,
          slidesPerView: 4,
        },
        1200: {
          spaceBetween: 30,
          slidesPerView: 5,
        },
        1400: {
          spaceBetween: 30,
          slidesPerView: 6,
        },
      }
    });
  }

  // // Swiper | Слайдер "наши работы"
  // if ($('#sliderPortfolio').length) {

  //   let sliderPortfolio;
  //   let init = false;
  //   function sliderToggle() {
  //     if ($(window).width() <= 768 && !init) {
  //       init = true;
  //       sliderPortfolio = new Swiper('#sliderPortfolio', {
  //         slidesPerView: 1.22,
  //         spaceBetween: 15,
  //         loop: true,
  //         autoplay: {
  //           disableOnInteraction: false,
  //           pauseOnMouseEnter: true,
  //         },
  //         speed: 1000,
  //         navigation: false,
  //         pagination: {
  //           el: '.portfolio__pagination',
  //           clickable: true,
  //         },
  //         breakpoints: {
  //           576: {
  //             slidesPerView: 2,
  //             spaceBetween: 20,
  //           }
  //         }
  //       });
  //     } else if ($(window).width() > 768 && init) {
  //       init = false;
  //       sliderPortfolio.destroy();
  //     }
  //   };
  //   sliderToggle();
  //   $(window).resize(function () {
  //     sliderToggle();
  //   });

  // }

  // Swiper | Слайдер "наши работы"
  if ($('#sliderPortfolioSlider').length) {
    sliderPortfolioSlider = new Swiper('#sliderPortfolioSlider', {
      slidesPerView: 1.22,
      spaceBetween: 15,
      loop: true,
      autoplay: {
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 1000,
      navigation: false,
      pagination: {
        el: '.portfolio-slider__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.portfolio-slider__slider-arrow--next',
        prevEl: '.portfolio-slider__slider-arrow--prev',
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        }
      }
    });
  }

  // Swiper | Слайдер "наши работы2"
  if ($('#sliderPortfolioSlider2').length) {
    sliderPortfolioSlider = new Swiper('#sliderPortfolioSlider2', {
      slidesPerView: 1.22,
      spaceBetween: 15,
      loop: true,
      autoplay: {
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 1000,
      navigation: false,
      pagination: {
        el: '.portfolio-slider2__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.portfolio-slider2__slider-arrow--next',
        prevEl: '.portfolio-slider2__slider-arrow--prev',
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        769: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1400: {
          slidesPerView: 5,
          spaceBetween: 30,
        }
      }
    });
  }

  // Swiper | Слайдер "отзывы"
  if ($('#sliderReviews').length) {
    const sliderReviews = new Swiper('#sliderReviews', {
      slidesPerView: 1.1,
      spaceBetween: 15,
      loop: true,
      autoplay: {
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 1000,
      threshold: 3,
      pagination: {
        el: '.reviews__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.reviews__slider-arrow--next',
        prevEl: '.reviews__slider-arrow--prev',
      },
      breakpoints: {
        576: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        768: {
          spaceBetween: 30,
          slidesPerView: 2,
        },
      }
    });
  }

  // Swiper | Слайдер "статьи"
  if ($('#sliderArticles').length) {
    const sliderArticles = new Swiper('#sliderArticles', {
      slidesPerView: 1.1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 1000,
      threshold: 3,
      pagination: {
        el: '.articles-slider__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.articles-slider__slider-arrow--next',
        prevEl: '.articles-slider__slider-arrow--prev',
      },
      breakpoints: {
        576: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        769: {
          spaceBetween: 30,
          slidesPerView: 2,
        },
        992: {
          spaceBetween: 30,
          slidesPerView: 3,
        },
        1200: {
          spaceBetween: 30,
          slidesPerView: 4,
        },
        1400: {
          spaceBetween: 30,
          slidesPerView: 4,
        },
      }
    });
  }

  // Swiper | Слайдер галлерея в попап окне товара
  if ($('.product-popup__slider').length) {
    const Swipers = Array.from(document.querySelectorAll('.product-popup__slider'), n => {
      const thumbProductPopup = new Swiper(n.querySelector('.thumbProductPopup'), {
        spaceBetween: 12,
        slidesPerView: 4,
        watchSlidesProgress: true,
        breakpoints: {
          769: {
            spaceBetween: 20,
          },
        }
      });
      const sliderProductPopup = new Swiper(n.querySelector('.sliderProductPopup'), {
        spaceBetween: 12,
        thumbs: {
          swiper: thumbProductPopup,
        },
        breakpoints: {
          769: {
            spaceBetween: 20,
          },
        }
      });
    });
  }

  // Swiper | Слайдер версии в попап окне товара
  if ($('.product-popup__version').length) {
    const productPopupVersion  = Array.from(document.querySelectorAll('.product-popup__version '), n => {
      const sliderVersion = new Swiper(n.querySelector('.sliderVersion'), {
        slidesPerView:  'auto',
        spaceBetween: 8,
        watchSlidesProgress: true,
        navigation: {
          nextEl: n.querySelector('.product-popup__slider-arrow--next'),
          prevEl: n.querySelector('.product-popup__slider-arrow--prev'),
        },
      });
    });
  }

  // Swiper | Слайдер мини-баннер
  if ($('.banner-small__slider ').length) {
    const slider = Array.from(document.querySelectorAll('.banner-small__slider '), n => {
      const sliderBannerSmall = new Swiper(n.querySelector('.sliderBannerSmall'), {
        slidesPerView: 1,
        spaceBetween: 20,
        threshold: 3,
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        speed: 1000,
        pagination: {
          el: n.querySelector('.banner-small__pagination'),
          clickable: true,
        },
      });
    })
  }

  // Swiper | Слайдер галлереи на странице товара
  if ($('#sliderProduct').length) {
    const thumbProduct = new Swiper('#thumbProduct', {
      spaceBetween: 12,
      slidesPerView: 4,
      watchSlidesProgress: true,
      breakpoints: {
        769: {
          spaceBetween: 20,
        },
      }
    });
    const sliderProduct = new Swiper('#sliderProduct', {
      spaceBetween: 12,
      thumbs: {
        swiper: thumbProduct,
      },
      breakpoints: {
        769: {
          spaceBetween: 20,
        },
      }
    });
  }

  // Swiper | Слайдер версии на странице товара
  if ($('#sliderVersion').length) {
      const sliderVersion = new Swiper('#sliderVersion', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ('.product__slider-arrow--next'),
          prevEl: ('.product__slider-arrow--prev'),
        },
      });
  }

  // Swiper | Слайдер для табов
  if ($('#tabsThumbs').length) {
    const tabsThumbs = new Swiper('#tabsThumbs', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      watchSlidesProgress: true,
      threshold: 3,
      breakpoints: {
        769: {
          spaceBetween: 40,
        },
      }
    });
    const tabsSlider = new Swiper('#tabsSlider', {
      effect: 'fade',
      autoHeight: true,
      allowTouchMove: true,
      threshold: 3,
      thumbs: {
        swiper: tabsThumbs,
      },
      breakpoints: {
        769: {
          spaceBetween: 40,
          allowTouchMove: false,
        },
      }
    });
  }

  // Swiper | Слайдер с карточками товара
  if ($('.sliderCards').length) {
    const sliderCardsWrapper = Array.from(document.querySelectorAll('.slider-cards__slider'), n => {
      const sliderCards = new Swiper(n.querySelector('.sliderCards'), {
        slidesPerView: 2,
        spaceBetween: 8,
        threshold: 3,
        navigation: {
          nextEl: n.querySelector('.slider-cards__slider-arrow--next'),
          prevEl: n.querySelector('.slider-cards__slider-arrow--prev'),
        },
        pagination: {
          el: n.querySelector('.slider-cards__pagination'),
          clickable: true,
        },
        breakpoints: {
          // 576: {
          //   slidesPerView: 3,
          // },
          // 769: {
          //   slidesPerView: 4,
          // },
          769: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
          1400: {
            slidesPerView: 5,
          },
        }
      });
    })
  }

  // Swiper | Слайдер с карточками товара
  if ($('.sliderCards2').length) {
    const sliderCardsWrapper = Array.from(document.querySelectorAll('.slider-cards__slider'), n => {
      const sliderCards = new Swiper(n.querySelector('.sliderCards2'), {
        slidesPerView: 2,
        spaceBetween: 8,
        threshold: 3,
        navigation: {
          nextEl: n.querySelector('.slider-cards__slider-arrow--next'),
          prevEl: n.querySelector('.slider-cards__slider-arrow--prev'),
        },
        pagination: {
          el: n.querySelector('.slider-cards__pagination'),
          clickable: true,
        },
        breakpoints: {
          // 576: {
          //   slidesPerView: 3,
          // },
          769: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
          1400: {
            slidesPerView: 4,
          },
        }
      });
    })
  }

  // Swiper | Слайдер с карточками категорий
  if ($('.sliderCategoryCards').length) {
    const sliderCardsWrapper = Array.from(document.querySelectorAll('.slider-category-cards__slider'), n => {
      const sliderCards = new Swiper(n.querySelector('.sliderCategoryCards'), {
        slidesPerView: 1.2,
        spaceBetween: 8,
        threshold: 3,
        navigation: {
          nextEl: n.querySelector('.slider-category-cards__slider-arrow--next'),
          prevEl: n.querySelector('.slider-category-cards__slider-arrow--prev'),
        },
        pagination: {
          el: n.querySelector('.slider-category-cards__pagination'),
          clickable: true,
        },
        breakpoints: {
          576: {
            slidesPerView: 2,
          },
          769: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
          1400: {
            slidesPerView: 4,
          },
        }
      });
    })
  }

  // Swiper | Слайдер с карточками категорий 2
  if ($('.sliderCategoryCards2').length) {
    const sliderWrap = Array.from(document.querySelectorAll('.slider-category-cards2__slider'), n => {
      const sliderCategoryCards2 = new Swiper(n.querySelector('.sliderCategoryCards2'), {
        slidesPerView: 2.25,
        spaceBetween: 8,
        threshold: 3,
        navigation: {
          nextEl: n.querySelector('.slider-category-cards2__slider-arrow--next'),
          prevEl: n.querySelector('.slider-category-cards2__slider-arrow--prev'),
        },
        breakpoints: {
          576: {
            slidesPerView: 3,
          },
          769: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
          1400: {
            slidesPerView: 6,
          },
        }
      });
    })
  }

  // Select2 | Стилизация селектов
  $('.select select').select2({
    minimumResultsForSearch: Infinity,
  });

  $('.js-select--in-calc-modal select').select2({
    minimumResultsForSearch: Infinity,
    dropdownParent: $('#popupCalc .modal-content')
  });

  // Inputmask | Маска для ввода телефона
  $('.js-input-tel  input').inputmask("+7(999)-999-99-99");

  // // Air Datepicker | Календарь
  // new AirDatepicker('#airDatepicker', {
  //   position: 'right top',
  // });

  // // Magnific Popup | Попап окна
  // if ($('.js-open-popup').length) {
  //   $('.js-open-popup').magnificPopup({
  //     mainClass: 'mfp-fade',
  //     callbacks: {
  //       beforeOpen: function () {
  //         if ($('.header').hasClass('sticky')) {
  //           let documentWidth = parseInt(document.documentElement.clientWidth);
  //           let windowsWidth = parseInt(window.innerWidth);
  //           let scrollbarWidth = windowsWidth - documentWidth;
  //           $('.header').css('padding-right', scrollbarWidth);
  //         }
  //         $('body').addClass('lock');
  //       },
  //       close: function () {
  //         $('.header').css('padding-right', 0);
  //         $('body').removeClass('lock');
  //       }
  //     }
  //   });
  // }

  //  Bootstrap modal | Добавление хедеру padding при окрытие попап окна
  if ($('.modal').length) {
    let modal = $('.modal');
    modal.each(function (indexInArray, valueOfElement) { 
      valueOfElement.addEventListener('show.bs.modal', function (event) {
        let documentWidth = parseInt(document.documentElement.clientWidth);
        let windowsWidth = parseInt(window.innerWidth);
        let scrollbarWidth = windowsWidth - documentWidth;
        $('.header').css('padding-right', scrollbarWidth);
      });
      valueOfElement.addEventListener('hidden.bs.modal', function (event) {
        $('.header').css('padding-right', 0);
      });
    });
  }

  //  Bootstrap modal || Попап "специальное предложение"
  // if ($('#offerPopup').length) {
  //   var offerPopup = new bootstrap.Modal(document.getElementById('offerPopup'));
  //   setTimeout(function () {
  //     offerPopup.show();
  //   }, 5000);
  // }

  // // Табы
	// function tabs() {
  //   const tabs = $('.js-tabs');
	// 	if (tabs.length) {
	// 		tabs.each( function () {
  //       let triggers = $(this).find('.js-tabs-trigger');
  //       let contents = $(this).find('.js-tabs-content');
  //       let time = 300;
  //       triggers.on('click', function () {
  //         let trigger = $(this);
  //         let content = $('.js-tabs-content[data-href="' + trigger.attr('href') +'"]');
  //         if (!trigger.hasClass('active')) {
  //           triggers.removeClass('active');
  //           trigger.addClass('active');
  //           contents.hide();
  //           contents.removeClass('open');
  //           content.fadeIn(time, function () {
  //             $(this).addClass('open');
  //           });
  //         }else {
  //           return false;
  //         }
  //       })
  //     });
	// 	}
	// }
	// tabs();

  // Аккордеон
  function accordion(accordion, settings) {
    if (accordion.length) {
      $(accordion).each(function () {
        let currentAccordion = $(this);
        let item = currentAccordion.find('.accordion__item');
        let trigger = currentAccordion.find('.js-accordion-trigger');
        let content = currentAccordion.find('.js-accordion-content');
        let time = 300;
        trigger.on('click', function () {
          let currentTrigger = $(this);
          let data = currentTrigger.data('content');
          if (!currentTrigger.hasClass('active')) {
            if (settings) {
              content.stop().slideUp(
                time,
                function () {
                  $(this).removeClass('open');
                }
              )
              trigger.removeClass('active');
              item.removeClass('active');
            };
            currentTrigger.addClass('active');
            currentTrigger.closest('.accordion__item').addClass('active');
            currentAccordion.find('#' + data).stop().slideDown(
              time,
              function () {
                $(this).addClass('open')
              }
            );
          } else {
            currentTrigger.removeClass('active');
            currentTrigger.closest('.accordion__item').removeClass('active');
            currentAccordion.find('#' + data).stop().slideUp(
              time,
              function () {
                $(this).removeClass('open')
              }
            );
          }
        })
      })
    }
  }
  accordion($('.js-accordion'), true);
  accordion($('.js-accordion-filter'), false);

  // Fancybox | галлереи
  Fancybox.bind("[data-fancybox]");

  // Выпадайка "поделиться товаром" в попапе товара
  function dropSocialPopup() {
    let btn = $('.js-drop-social-popup');
    let close = $('.product-popup__drop-close');
    btn.on('click', function () {
      console.log('hh');
      let currentDrop = $(this).closest('.product-popup__items').find('.product-popup__drop');
      currentDrop.addClass('open');
    })
    close.on('click', function () {
      let currentDrop = $(this).closest('.product-popup__drop');
      currentDrop.removeClass('open');
    })
  }
  dropSocialPopup();

  // Выпадайка "поделиться товаром" на странице товара
  function dropSocial() {
    let btn = $('.js-drop-social');
    let close = $('.product__drop-close');
    btn.on('click', function () {
      let currentDrop = $(this).closest('.product__items').find('.product__drop');
      currentDrop.addClass('open');
    })
    close.on('click', function () {
      let currentDrop = $(this).closest('.product__drop');
      currentDrop.removeClass('open');
    })
  }
  dropSocial();

  // // Sticky Sidebar | Липкий сайдбар
  // if ($('.js-sticky').length) {
  //   var stickySidebar = new StickySidebar('.js-sticky', {
  //     topSpacing: 65,
  //     bottomSpacing: 10,
  //     containerSelector: false,
  //     innerWrapperSelector: '.sidebar__inner',
  //     resizeSensor: true,
  //     stickyClass: 'is-affixed',
  //     minWidth: 0
  //   });
  // }

  // // Кнопка скролла вверх страницы
  // function scrollUp() {
  //   const btn = $('.js-scrollup');
  //   $(window).scroll(function () {
  //     btnShowFade();
  //   });
  //   function btnShowFade() {
  //     if ($(this).scrollTop() > 200) {
  //       btn.addClass('show');
  //     } else {
  //       btn.removeClass('show');
  //     }
  //   }
  //   btnShowFade();
  //   btn.click(function () {
  //     $('body,html').animate({
  //       scrollTop: 0
  //     }, 500);
  //     return false;
  //   });
  // }
  // scrollUp();

  // Показать еще пункты списка
  function showMoreFilters(list, count, countMobile) {
    if (!countMobile) {
      countMobile = count;
    }
    list.each(function () {
      let currentList = $(this);
      let btn = currentList.find('.js-more-btn');
      currentList.find('li').each(function (index) {
        if ($(window).width() > 768) {
          if (index > count - 1) {
            $(this).hide();
          }
        } else {
          if (index > countMobile - 1) {
            $(this).hide();
          }
        }
      });
      btn.on('click', function (e) {
        e.preventDefault();
        btn.hide();
        currentList.find($('li')).show();
      });
    })
  }
  showMoreFilters($('.js-more-list'), 9, 4);
  showMoreFilters($('.js-more-tags'), 11, 4);

  // noUiSlider | Ползунок цены в фильтрах
  if ($('#priceSlider').length) {
    let slider = document.getElementById('priceSlider');
    let inputMin = document.getElementById('priceMin');
    let inputMax = document.getElementById('priceMax');
    let min = Number(slider.getAttribute('data-min'));
    let max = Number(slider.getAttribute('data-max'));
    noUiSlider.create(slider, {
      start: [min, max],
      connect: true,
      range: {
        'min': min,
        'max': max
      },
      format: wNumb({ decimals: 0 })
    });
    slider.noUiSlider.on('update', function (values, handle) {
      inputMin.value = values[0];
      inputMax.value = values[1];
    });
    inputMin.addEventListener('change', function () {
      slider.noUiSlider.set([this.value, null]);
    });
    inputMax.addEventListener('change', function () {
      slider.noUiSlider.set([null, this.value]);
    });
  }
  
  if ($('#map').length) {
    ymaps.ready(init);
    function init() {
      var myMap = new ymaps.Map("map", {
        center: [55.74855262697573, 37.62146452060852],
        zoom: 9,
        controls: ['zoomControl']
      }, {
        searchControlProvider: 'yandex#search'
      });

      // // Создаем многоугольник, используя вспомогательный класс Polygon.
      // var myPolygon = new ymaps.Polygon([
      //   // Указываем координаты вершин многоугольника.
      //   // Координаты вершин внешнего контура.
      //   [
      //     [55.9482840640558, 37.53694895703127],
      //     [55.942118877049154, 37.759422101562514],
      //     [55.927472607343056, 37.90087107617189],
      //     [55.759027697806914, 38.093131818359375],
      //     [55.648135556962735, 38.082145490234396],
      //     [55.547828670754015, 37.94756297070314],
      //     [55.45934115228066, 37.739567547952255],
      //     [55.48664322493386, 37.466282635842894],
      //     [55.55598297932597, 37.16141203037414],
      //     [55.68964040880396, 37.09686735263976],
      //     [55.811242450552065, 37.1037338077179],
      //     [55.891584662666176, 37.17102506748352],
      //     [55.935547642946325, 37.35229948154603]
      //   ],
      // ], {
      //   hintContent: "Многоугольник"
      // }, {
      //   fillColor: 'rgba(3,131,253,0.2)',
      //   strokeWidth: 3,
      //   strokeColor: '#0383FD',
      // });

      // // Добавляем многоугольник на карту.
      // myMap.geoObjects.add(myPolygon);

      // Создаем круг.
      var myCircle = new ymaps.Circle([
        // Координаты центра круга.
        [55.74855262697573, 37.62146452060852],
        // Радиус круга в метрах.
        22000
      ], {
        
      }, {
        fillColor: "#0383FD",
        fillOpacity: 0.2,
        strokeColor: "#0383FD",
        strokeWidth: 3
      });

      // Добавляем круг на карту.
      myMap.geoObjects.add(myCircle);
    }
  }

  // Модификации товара
  function productVariants() {
    let product = $('.js-product-variants');
    product.each(function () {
      let currentProduct = $(this);
      let trigger = currentProduct.find('[data-variants-trigger]');
      let change = currentProduct.find('[data-variants-change]');
      trigger.on('click', function () {
        let currentTrigger = $(this);
        let currentChange = currentProduct.find('[data-variants-change="' + currentTrigger.data('variants-trigger') + '"]');
        if (!currentTrigger.hasClass('active')) {
          trigger.removeClass('active');
          change.removeClass('open');
          currentTrigger.addClass('active');
          currentChange.addClass('open');
        }
      })
    });
  }
  productVariants();

  

  // // Очистить фильтр 
  // function clearFilter() {
  //   let clearBnt = $('.js-filters-clear');
  //   clearBnt.on('click', function () {
  //     $(this).closest('.filters').find('input').prop('checked', false);
  //   })
  // }
  // clearFilter();

  // // Изменение количества товара (плюс минус)
  // function counter(block) {
  //   const counter = document.querySelectorAll(block);
  //   if (counter) {
  //     counter.forEach(element => {
  //       const minus = element.querySelector('.js-counter-minus');
  //       const plus = element.querySelector('.js-counter-plus');
  //       const inputWrap = element.querySelector('.js-counter-input');
  //       const input = inputWrap.querySelector('input');
  //       plus.addEventListener('click', () => {
  //         if (Number(input.value) < 999) {
  //           input.value = Number(input.value) + 1;
  //         }
  //       })
  //       minus.addEventListener('click', () => {
  //         if (Number(input.value) > 1) {
  //           input.value = Number(input.value) - 1;
  //         }
  //       })
  //       input.addEventListener('keyup', () => {
  //         input.value = input.value.replace(/[^\d]/g, '');
  //       })
  //       input.addEventListener('blur', () => {
  //         if (input.value == '' || input.value == 0) {
  //           input.value = 1;
  //         }
  //       })
  //     });
  //   }
  // }
  // counter('.js-counter');

  // // noUiSlider || Ползунок выбора
  // if (document.getElementById('noUiSlider')) {
  //   const rangeSlider = document.getElementById('noUiSlider');
  //   const inputMin = document.getElementById('noUiSliderMin');
  //   const inputMax = document.getElementById('noUiSliderMax');
  //   let min = Number(rangeSlider.dataset.min);
  //   let max = Number(rangeSlider.dataset.max);
  //   let nowMin = Number(rangeSlider.dataset.nowmin);
  //   let nowMax = Number(rangeSlider.dataset.nowmax);
  //   console.log(nowMin,nowMax);
  //   noUiSlider.create(rangeSlider, {
  //     start: [nowMin, nowMax],
  //     connect: true,
  //     step: 10,
  //     range: {
  //       'min': min,
  //       'max': max
  //     }
  //   });
  //   rangeSlider.noUiSlider.on('update', function (values, handle) {
  //     if (handle) {
  //       inputMax.value = values[handle];
  //     } else {
  //       inputMin.value = values[handle];
  //     }
  //   });
  //   inputMin.addEventListener('change', function () {
  //     rangeSlider.noUiSlider.set([this.value, null]);
  //   });
  //   inputMax.addEventListener('change', function () {
  //     rangeSlider.noUiSlider.set([null, this.value]);
  //   });
  // };

  // // Анимация счетчика
  // function countNumber(block) {
  //   block.each(function () {
  //     var scrollTop = false,
  //       countNumberStatus = true,
  //       $this = $(this),
  //       blockPosition = $this.position().top,
  //       valUp = $this.data('val-up'),
  //       valTo = $this.data('val-to'),
  //       valDuration = $this.data('duration'),
  //       valDelay = $this.data('delay');
  //     $this.html(0);
  //     gofunc();
  //     $(window).scroll(function () {
  //       gofunc();
  //     });
  //     function gofunc() {
  //       scrollTop = $(window).scrollTop() + $(window).height() - 150;
  //       if (scrollTop > blockPosition && countNumberStatus) {
  //         setTimeout(() => {
  //           $({ numberValue: valUp }).animate({ numberValue: valTo }, {
  //             duration: valDuration,
  //             easing: "swing",
  //             step: function (val) {
  //               $this.html(Math.ceil(val));
  //             }
  //           });
  //         }, valDelay);
  //         countNumberStatus = false;
  //       }
  //     }
  //   });
  // };
  // countNumber($(".count-number"));

}