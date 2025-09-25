// Let Bootstrap handle navbar responsiveness automatically
document.addEventListener("DOMContentLoaded", function () {
  // Call on load and resize
  adjustCarouselText();
  window.addEventListener("resize", adjustCarouselText);

  // Handle horizontal scroll containers on mobile
  const scrollContainers = document.querySelectorAll(
    ".card-container, .stories-container"
  );

  scrollContainers.forEach((container) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
      isDown = true;
      container.classList.add("active");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      container.classList.remove("active");
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      container.classList.remove("active");
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Initialize Donation Swiper
  // Initialize Donation Swiper
  const donationSwiper = new Swiper(".donation-swiper", {
    // Basic settings
    slidesPerView: 3,
    spaceBetween: 24,
    centeredSlides: false,
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
        centeredSlides: false,
      },
      992: {
        slidesPerView: 2.5,
        spaceBetween: 24,
        centeredSlides: false,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 24,
        centeredSlides: false,
      },
    },

    // Auto-play settings for infinite right sliding
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      reverseDirection: true, // Ensures sliding to the right
      pauseOnMouseEnter: true,
    },

    // Smooth transitions
    speed: 800,

    // Pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Navigation arrows (if needed)
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Touch settings
    touchRatio: 1,
    simulateTouch: true,

    // Additional settings for smooth infinite sliding
    freeMode: false,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  });

  // Add smooth hover effects with improved infinite sliding
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

  // Ensure continuous right sliding by restarting autoplay if it stops
  donationSwiper.on("slideChange", function () {
    if (!donationSwiper.autoplay.running) {
      donationSwiper.autoplay.start();
    }
  });

  // Force autoplay to start immediately
  donationSwiper.autoplay.start();
});

// Utility function to debounce resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle window resize events
const handleResize = debounce(() => {
  // Recalculate any dynamic layouts
  const event = new Event("resize");
  window.dispatchEvent(event);
}, 250);

window.addEventListener("resize", handleResize);
