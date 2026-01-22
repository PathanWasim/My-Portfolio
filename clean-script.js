// Clean Portfolio JavaScript - Simple & Functional

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe cards for staggered animations
    const cards = document.querySelectorAll('.project-card, .achievement-card, .skill-category');
    cards.forEach((card, index) => {
        setTimeout(() => {
            observer.observe(card);
        }, index * 100); // Stagger the observation
    });

    // Simple mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');

        // Only create mobile menu on small screens
        if (window.innerWidth <= 768) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--primary-color);
                cursor: pointer;
            `;

            // Add toggle functionality
            menuToggle.addEventListener('click', () => {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            });

            navContainer.appendChild(menuToggle);
        }
    };

    // Initialize mobile menu if needed
    createMobileMenu();

    // Handle window resize
    window.addEventListener('resize', () => {
        const existingToggle = document.querySelector('.mobile-menu-toggle');
        if (existingToggle) {
            existingToggle.remove();
        }
        createMobileMenu();
    });

    // Add loading class removal
    document.body.classList.add('loaded');

    // Simple form validation (if contact form is added later)
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Utility function for smooth reveal animations
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.reveal');

        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);

    // Handle email link clicks
    const emailLink = document.querySelector('.email-link');
    if (emailLink) {
        emailLink.addEventListener('click', function (e) {
            // Let the default mailto behavior work
            console.log('Email link clicked');

            // Fallback: if mailto doesn't work, copy email to clipboard
            setTimeout(() => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText('wpathan157@gmail.com').then(() => {
                        console.log('Email copied to clipboard as fallback');
                    });
                }
            }, 1000);
        });
    }

    // Console log for debugging
    console.log('Clean portfolio script loaded successfully');

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;

    window.addEventListener('scroll', function () {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(function () {
            // Scroll handling code here
        }, 10);
    });

    // Preload critical images (if any)
    const preloadImages = () => {
        const imageUrls = [
            // Add any critical images here
        ];

        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    };

    preloadImages();
});