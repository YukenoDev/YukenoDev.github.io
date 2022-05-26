$(document).ready(function () {
	$('.carousel__inner').slick({
		speed: 1000,
		prevArrow: '<button type="button" class="slick-prev"><img src="src/img/chevron_left_solid_980.svg" alt="left" /></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="src/img/chevron_right_solid_982.svg" alt="right" /></button>',
		autoplay: true,
		autoplaySpeed: 1500,
		responsive: [{
			breakpoint: 992,
			settings: {
				dots: true,
				arrows: false
			}
		}]
	})
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog__info').eq(i).toggleClass('catalog__info_active');
				$('.catalog__list').eq(i).toggleClass('catalog__list_active');
			})
		})
	}

	toggleSlide('.catalog__link');
	toggleSlide('.catalog__back');

	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('fast');
	});
	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #order, #thanks').fadeOut('fast');
	});

	$('.button_catalog').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog__subheader').eq(i).text());
			$('.overlay, #order').fadeIn('fast');
		});
	});

	function valideForm(form) {
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true,
				}
			},
			messages: {
				name: "Введите свое имя",
				phone: "Введите свой номер",
				email: {
					required: "Введите свою почту",
					email: "Неверная почта",
				},
			}
		});
	};

	valideForm('#consultation form');
	valideForm('#order form');
	valideForm('#consultation-form');

	$('input[name=phone').mask('+7 (999) 999-99-99');

	$('form').submit(function (e) {
		e.preventDefault();

		$.ajax({
			type: "POST",
			url: "src/mailer/smart.php",
			data: $(this).serialize(),
			success: function (data) {
				console.log('seccess');
			}

		}).done(function () {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('fast');

			$('form').trigger('reset');
		});
		return false;
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 600) {
			$('.pageup').fadeIn('fast');
		} else {
			$('.pageup').fadeOut('fast');
		}
	});

	new WOW().init();
});