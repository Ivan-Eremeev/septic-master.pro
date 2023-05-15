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
      autoplay: true,
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
      spaceBetween: 8,
      threshold: 3,
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

  // Swiper | Слайдер "акции и скидки"
  if ($('#sliderDiscount').length) {
    const sliderDiscount = new Swiper('#sliderDiscount', {
      slidesPerView: 1.6,
      spaceBetween: 17,
      threshold: 3,
      loop: true,
      autoplay: true,
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
      autoplay: true,
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

  // Swiper | Слайдер "наши работы"
  if ($('#sliderPortfolio').length) {

    let sliderPortfolio;
    let init = false;
    function sliderToggle() {
      if ($(window).width() <= 768 && !init) {
        init = true;
        sliderPortfolio = new Swiper('#sliderPortfolio', {
          slidesPerView: 1.22,
          spaceBetween: 15,
          loop: true,
          autoplay: true,
          speed: 1000,
          navigation: false,
          pagination: {
            el: '.portfolio__pagination',
            clickable: true,
          },
          breakpoints: {
            576: {
              slidesPerView: 2,
              spaceBetween: 20,
            }
          }
        });
      } else if ($(window).width() > 768 && init) {
        init = false;
        sliderPortfolio.destroy();
      }
    };
    sliderToggle();
    $(window).resize(function () {
      sliderToggle();
    });

  }

  // Swiper | Слайдер "отзывы"
  if ($('#sliderReviews').length) {
    const sliderReviews = new Swiper('#sliderReviews', {
      slidesPerView: 1.1,
      spaceBetween: 15,
      loop: true,
      autoplay: true,
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
      autoplay: true,
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

  // Select2 | Стилизация селектов
  $('.select select').select2({
    minimumResultsForSearch: Infinity,
  });

  // Inputmask | Маска для ввода телефона
  $('.js-input-tel  input').inputmask("+7(999)-999-99-99");

  // // Air Datepicker | Календарь
  // new AirDatepicker('#airDatepicker', {
  //   position: 'right top',
  // });

  // Magnific Popup | Попап окна
  if ($('.js-open-popup').length) {
    $('.js-open-popup').magnificPopup({
      mainClass: 'mfp-fade',
      callbacks: {
        beforeOpen: function () {
          if ($('.header').hasClass('sticky')) {
            let documentWidth = parseInt(document.documentElement.clientWidth);
            let windowsWidth = parseInt(window.innerWidth);
            let scrollbarWidth = windowsWidth - documentWidth;
            $('.header').css('padding-right', scrollbarWidth);
          }
        },
        close: function () {
          $('.header').css('padding-right', 0);
        }
      }
    });
  }

  //  Magnific Popup || Попап "специальное предложение"
  if ($('#offerPopup').length) {
    setTimeout(function () {
      $.magnificPopup.open({
        items: {
          src: '#offerPopup'
        },
        type: 'inline'
      });
    }, 5000);
  }

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
      $('.js-accordion').each(function () {
        let currentAccordion = $(this);
        let item = currentAccordion.find('.accordion__item');
        let trigger = currentAccordion.find('.js-accordion-trigger');
        let content = $('.js-accordion-content');
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

  // Fancybox | галлереи
  // Fancybox.bind("[data-fancybox]");

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

  // // Показать еще в фильтрах
  // function showMoreFilters() {
  //   const list = $('.js-more-list');
  //   const btn = $('.js-more-btn');
  //   const count = 4;
  //   list.each(function () {
  //     $(this).find('li').each(function (index) {
  //       if (index > count - 1) {
  //         $(this).fadeOut();
  //       }
  //     })
  //   })
  //   btn.on('click', function () {
  //     $(this).fadeOut();
  //     $(this).parent().find($('.js-more-list li')).fadeIn();
  //   })
  // }
  // showMoreFilters();

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