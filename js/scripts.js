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

  // Выпадайки при клике по кнопке
  // Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
  // Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
  function dropBlock(btn, lock = false) {
    let $this = undefined,
        drop = undefined,
        close = $('.js-drop-close'),
        body = $('body');
    btn.on('click', function () {
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
      preventClicks: false,
      preventClicksPropagation: false,
      navigation: {
        nextEl: '.benefit__slider-arrow--next',
        prevEl: '.benefit__slider-arrow--prev',
      },
      breakpoints: {
        576: {
          slidesPerView: 3,
        },
        768: {
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
      preventClicks: false,
      preventClicksPropagation: false,
    });
  }
  
  // Swiper | Слайдер "популярные типы"
  if ($('#popularTypesSlider').length) {
    const popularTypesSlider = new Swiper('#popularTypesSlider', {
      slidesPerView: 'auto',
      spaceBetween: 40,
      preventClicks: false,
      preventClicksPropagation: false,
    });
  }

  // // Air Datepicker | Календарь
  // new AirDatepicker('#airDatepicker', {
  //   position: 'right top',
  // });

  // // Magnific Popup | Попап окна
  // $('.open-popup-link').magnificPopup({
  //   mainClass: 'mfp-fade'
  // });

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

  // // Аккордеон
  // function accordion(accordion, settings) {
  //   if (accordion.length) {
  //     $('.js-accordion').each(function () {
  //       let currentAccordion = $(this);
  //       let trigger = currentAccordion.find('.js-accordion-trigger');
  //       let content = $('.js-accordion-content');
  //       let time = 300;
  //       trigger.on('click', function () {
  //         let currentTrigger = $(this);
  //         let data = currentTrigger.data('content');
  //         if (!currentTrigger.hasClass('active')) {
  //           if (settings) {
  //             content.stop().slideUp(
  //               time,
  //               function () {
  //                 $(this).removeClass('open');
  //               }
  //             )
  //             trigger.removeClass('active');
  //           };
  //           currentTrigger.addClass('active');
  //           currentAccordion.find('#' + data).stop().slideDown(
  //             time,
  //             function () {
  //               $(this).addClass('open')
  //             }
  //           );
  //         } else {
  //           currentTrigger.removeClass('active');
  //           currentAccordion.find('#' + data).stop().slideUp(
  //             time,
  //             function () {
  //               $(this).removeClass('open')
  //             }
  //           );
  //         }
  //       })
  //     })
  //   }
  // }
  // accordion($('.js-accordion'), true);

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