document.addEventListener("DOMContentLoaded", function () {
  // Initialize Donation Swiper
  const donationSwiper = new Swiper(".donation-swiper", {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,

    // Responsive breakpoints
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
        centeredSlides: true,
      },
      576: {
        slidesPerView: 1.2,
        spaceBetween: 20,
        centeredSlides: true,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 2.5,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },

    // Auto-play settings
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      reverseDirection: true, // slide to the right
      pauseOnMouseEnter: true,
    },

    speed: 800,

    // Pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Navigation arrows (if you add them in HTML)
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Pause autoplay on hover
  const swiperSlides = document.querySelectorAll(
    ".donation-swiper .swiper-slide"
  );
  swiperSlides.forEach((slide) => {
    slide.addEventListener("mouseenter", () => {
      donationSwiper.autoplay.stop();
    });
    slide.addEventListener("mouseleave", () => {
      donationSwiper.autoplay.start();
    });
  });
});
