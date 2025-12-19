// ===================================
// DIGITAL CX - MAIN JAVASCRIPT
// ===================================

(function() {
    'use strict';

    // ===================================
    // VARIABLES
    // ===================================
    
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const demoForm = document.getElementById('demo-form');
    const demoSuccess = document.getElementById('demo-success');
    const billingToggle = document.getElementById('billing-toggle');
    const faqItems = document.querySelectorAll('.faq-item__question');

    // ===================================
    // HEADER SCROLL EFFECT
    // ===================================
    
    function handleHeaderScroll() {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);

    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('show');
            document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ===================================
    // SMOOTH SCROLL
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // ACTIVE NAV LINK ON SCROLL
    // ===================================
    
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - header.offsetHeight - 50;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    // ===================================
    // SCROLL TO TOP BUTTON
    // ===================================
    
    if (scrollToTopBtn) {
        function handleScrollToTop() {
            if (window.scrollY >= 400) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }

        window.addEventListener('scroll', handleScrollToTop);

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // SCROLL ANIMATIONS
    // ===================================
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(element => {
        observer.observe(element);
    });

    // ===================================
    // COUNTER ANIMATION
    // ===================================
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Observe counters
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-counter]').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ===================================
    // PRICING TOGGLE (MONTHLY/ANNUAL)
    // ===================================
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const priceAmounts = document.querySelectorAll('.price__amount:not(.price__amount--custom)');
            const billingNotes = document.querySelectorAll('.billing-note');
            
            priceAmounts.forEach(amount => {
                const monthly = parseInt(amount.getAttribute('data-monthly'));
                const annual = parseInt(amount.getAttribute('data-annual'));
                
                if (this.checked) {
                    // Show annual pricing
                    amount.textContent = annual;
                } else {
                    // Show monthly pricing
                    amount.textContent = monthly;
                }
            });

            billingNotes.forEach(note => {
                if (this.checked) {
                    note.textContent = 'Facturado anualmente (ahorro del 20%)';
                } else {
                    note.textContent = 'Facturado mensualmente';
                }
            });
        });
    }

    // ===================================
    // FAQ ACCORDION
    // ===================================
    
    faqItems.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            faqItems.forEach(item => {
                if (item !== this) {
                    item.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            this.setAttribute('aria-expanded', !isExpanded);
        });

        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ===================================
    // FORM VALIDATION
    // ===================================
    
    if (demoForm) {
        const inputs = demoForm.querySelectorAll('input[required], select[required], textarea[required]');

        // Validation functions
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validatePhone(phone) {
            // Allow various phone formats
            const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
            return re.test(phone.replace(/\s/g, ''));
        }

        function validateName(name) {
            return name.trim().length >= 2;
        }

        function showError(input, message) {
            const errorElement = document.getElementById(`${input.id}-error`);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
        }

        function hideError(input) {
            const errorElement = document.getElementById(`${input.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
            input.classList.remove('error');
            input.setAttribute('aria-invalid', 'false');
        }

        function validateField(input) {
            const value = input.value.trim();
            let isValid = true;

            // Clear previous error
            hideError(input);

            if (input.hasAttribute('required') && !value) {
                showError(input, 'Este campo es obligatorio');
                return false;
            }

            switch (input.id) {
                case 'nombre':
                    if (!validateName(value)) {
                        showError(input, 'Por favor ingresa un nombre válido (mínimo 2 caracteres)');
                        isValid = false;
                    }
                    break;
                
                case 'empresa':
                    if (value.length < 2) {
                        showError(input, 'Por favor ingresa el nombre de tu empresa');
                        isValid = false;
                    }
                    break;
                
                case 'email':
                    if (!validateEmail(value)) {
                        showError(input, 'Por favor ingresa un email válido');
                        isValid = false;
                    }
                    break;
                
                case 'telefono':
                    if (!validatePhone(value)) {
                        showError(input, 'Por favor ingresa un teléfono válido');
                        isValid = false;
                    }
                    break;
            }

            return isValid;
        }

        // Validate on blur
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim()) {
                    validateField(this);
                }
            });

            // Clear error on input
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    hideError(this);
                }
            });
        });

        // Form submit
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isFormValid = true;

            // Validate all required fields
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Show loading state
                const submitButton = demoForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitButton.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    // Hide form and show success message
                    demoForm.style.display = 'none';
                    demoSuccess.style.display = 'block';

                    // Scroll to success message
                    demoSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Log form data (in production, this would be sent to an API)
                    const formData = new FormData(demoForm);
                    console.log('Form submitted with data:');
                    for (let [key, value] of formData.entries()) {
                        console.log(`${key}: ${value}`);
                    }

                    // Reset form for next use
                    setTimeout(() => {
                        demoForm.reset();
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }, 3000);
                }, 1500);
            } else {
                // Scroll to first error
                const firstError = demoForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    }

    // ===================================
    // INITIALIZE ON LOAD
    // ===================================
    
    window.addEventListener('load', function() {
        // Set initial header state
        handleHeaderScroll();
        
        // Set initial active nav link
        setActiveNavLink();
        
        // Trigger initial animations for elements in viewport
        document.querySelectorAll('[data-animate]').forEach(element => {
            const rect = element.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isInViewport) {
                element.classList.add('animated');
            }
        });

        // Log to console
        console.log('%c🚀 DIGITAL CX Website Loaded Successfully!', 'color: #7f47dd; font-size: 16px; font-weight: bold;');
        console.log('%c✨ All features are ready to use', 'color: #22c55e; font-size: 14px;');
    });

    // ===================================
    // PERFORMANCE MONITORING
    // ===================================
    
    if ('PerformanceObserver' in window) {
        try {
            // Monitor Largest Contentful Paint (LCP)
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Monitor First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            // PerformanceObserver not supported
            console.log('Performance monitoring not available');
        }
    }

    // ===================================
    // EASTER EGG: KONAMI CODE
    // ===================================
    
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.style.animation = 'rainbow 2s linear infinite';
                
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
                
                alert('🎉 ¡Easter Egg Activado! ¡Bienvenido al modo arcoíris de DIGITAL CX! 🌈');
                
                setTimeout(() => {
                    document.body.style.animation = '';
                    style.remove();
                }, 5000);
                
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // ===================================
    // UTILITY FUNCTIONS
    // ===================================
    
    // Debounce function for performance optimization
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

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Optimize scroll events
    const optimizedScrollHandler = throttle(() => {
        handleHeaderScroll();
        setActiveNavLink();
        if (scrollToTopBtn) {
            if (window.scrollY >= 400) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }
    }, 100);

    window.addEventListener('scroll', optimizedScrollHandler);

    // ===================================
    // ACCESSIBILITY ENHANCEMENTS
    // ===================================
    
    // Focus management for keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Trap focus in mobile menu when open
        if (navMenu && navMenu.classList.contains('show') && e.key === 'Tab') {
            const focusableElements = navMenu.querySelectorAll('a[href], button:not([disabled])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });

    // Announce page changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }

    // Add screen reader only class to CSS
    const srOnlyStyle = document.createElement('style');
    srOnlyStyle.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    `;
    document.head.appendChild(srOnlyStyle);

    // ===================================
    // CONSOLE ART
    // ===================================
    
    console.log(`
    ╔═══════════════════════════════════════════════╗
    ║                                               ║
    ║          🚀 DIGITAL CX - GO CX CRM            ║
    ║                                               ║
    ║     El CRM Todo-en-Uno para PYMES             ║
    ║                                               ║
    ║     Diseñado con 💜 por el equipo de          ║
    ║     DIGITAL CX                                ║
    ║                                               ║
    ║     Versión: 1.0.0                            ║
    ║     Fecha: 2024                               ║
    ║                                               ║
    ╚═══════════════════════════════════════════════╝
    `);

})();