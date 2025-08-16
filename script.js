document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 800);
    });

    // Enhanced Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
    });

    // Smooth Scrolling with offset for fixed nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                }
            }
        });
    });

    // Enhanced Intersection Observer for animations
    // Enhanced Intersection Observer for animations (Mobile friendly)
const observerOptions = {
    root: null,
    threshold: window.innerWidth <= 768 ? 0.05 : 0.2,
    rootMargin: window.innerWidth <= 768 ? '0px' : '-50px'
};

// Apply fade-in immediately for mobile as a fallback
function fallbackShowFadeInSections() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.fade-in-section').forEach(section => {
            section.classList.add('is-visible');
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Unobserve only after revealing
        }
    });
}, observerOptions);

// Observe all fade-in sections
document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));

// Fallback: Always show on mobile after 2s, in case observer threshold fails
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(fallbackShowFadeInSections, 2000);
});


    // Enhanced Gallery Slider
    const sliderImages = document.querySelectorAll('.slider-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('bg-purple-600');
                indicator.classList.remove('bg-gray-300');
            } else {
                indicator.classList.add('bg-gray-300');
                indicator.classList.remove('bg-purple-600');
            }
        });
    }

    function showSlide(n) {
        // Hide all images
        sliderImages.forEach(image => {
            image.classList.add('hidden', 'opacity-0');
            image.classList.remove('opacity-100');
        });

        // Handle wrap-around
        if (n >= sliderImages.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = sliderImages.length - 1;
        }

        // Show current image
        if (sliderImages[currentSlide]) {
            sliderImages[currentSlide].classList.remove('hidden');
            setTimeout(() => {
                sliderImages[currentSlide].classList.add('opacity-100');
                sliderImages[currentSlide].classList.remove('opacity-0');
            }, 50);
        }

        updateIndicators();
    }

    // Navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
        });
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-play slider
    let autoPlayInterval = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);

    // Pause auto-play on hover
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        gallerySection.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        gallerySection.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                currentSlide++;
                showSlide(currentSlide);
            }, 5000);
        });
    }

    // Initialize slider
    if (sliderImages.length > 0) {
        showSlide(0);
    }

    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Parallax effect for hero section
    const hero = document.querySelector('header');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3; // Reduced for better performance
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.hover-lift');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Counter animation for statistics
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };

    // Trigger counter animation when statistics section is visible
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 500);
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        
        statsObserver.observe(aboutSection);
    }

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('a[class*="bg-"], button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't add ripple to navigation links
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                return;
            }
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add floating animation to particles with performance optimization
    const particles = document.querySelectorAll('.particle');
    if (particles.length > 0 && window.innerWidth > 768) { // Only on desktop
        particles.forEach((particle, index) => {
            particle.style.animationDelay = `-${index * 0.5}s`;
            particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        });
    }

    // Add interactive hover effects for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Smooth reveal animation for sections
    const revealElements = document.querySelectorAll('.glass-card, .hover-lift');
    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.transitionDelay = `${index * 0.1}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Your scroll-based animations here
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    // Enhanced scroll performance
    window.addEventListener('scroll', requestTick);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Form validation (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation logic here
            console.log('Form submitted');
        });
    });

    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50" y="50" text-anchor="middle" fill="%23999">Image</text></svg>';
        });
    });

    // Lazy loading implementation
    const lazyImages = document.querySelectorAll('[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Accessibility improvements
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );

    // Skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link sr-only focus:not-sr-only';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        
        // Disable auto-playing animations
        clearInterval(autoPlayInterval);
        
        // Disable parallax
        window.removeEventListener('scroll', () => {
            if (hero) {
                hero.style.transform = 'none';
            }
        });
    }

    // Console welcome message
    console.log('%c Welcome to KDS International School! ', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 16px; padding: 8px 16px; border-radius: 8px;');
    console.log('Built with modern web technologies for optimal performance and accessibility.');

    // Service Worker registration (for future PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});
