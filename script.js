// Navbar responsive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
            
            // Toggle aria-expanded attribute
            const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
            navbarToggler.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
            
            if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Responsive carousel text sizing
    function adjustCarouselText() {
        const carouselCaptions = document.querySelectorAll('.carousel-caption h2');
        const windowWidth = window.innerWidth;
        
        carouselCaptions.forEach(caption => {
            if (windowWidth <= 576) {
                caption.style.fontSize = '1.8rem';
                caption.style.lineHeight = '2.2rem';
            } else if (windowWidth <= 768) {
                caption.style.fontSize = '2.2rem';
                caption.style.lineHeight = '2.6rem';
            } else if (windowWidth <= 992) {
                caption.style.fontSize = '2.5rem';
                caption.style.lineHeight = '3rem';
            } else {
                caption.style.fontSize = '3rem';
                caption.style.lineHeight = '3.5rem';
            }
        });
    }
    
    // Call on load and resize
    adjustCarouselText();
    window.addEventListener('resize', adjustCarouselText);
    
    // Handle horizontal scroll containers on mobile
    const scrollContainers = document.querySelectorAll('.card-container, .stories-container');
    
    scrollContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
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
    const event = new Event('resize');
    window.dispatchEvent(event);
}, 250);

window.addEventListener('resize', handleResize);