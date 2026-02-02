/**
 * Studio Visual Landing Page - Main JavaScript
 * Handles animations, form validation, and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollAnimations();
    initSmoothScroll();
    initPhoneMask();
    initFormSubmission();
    initParallax();
    initButtonEffects();
});

/**
 * Scroll-based animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animation;
                const delay = element.dataset.delay || 0;

                setTimeout(() => {
                    element.classList.add('animated');

                    // Apply animation based on type
                    switch(animation) {
                        case 'fade-in-up':
                            element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                            break;
                        case 'fade-in-left':
                            element.style.animation = 'fadeInLeft 0.8s ease-out forwards';
                            break;
                        case 'fade-in-right':
                            element.style.animation = 'fadeInRight 0.8s ease-out forwards';
                            break;
                        case 'fade-in':
                            element.style.animation = 'fadeIn 0.8s ease-out forwards';
                            break;
                        case 'scale-in':
                            element.style.animation = 'scaleIn 0.6s ease-out forwards';
                            break;
                        default:
                            element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    }
                }, parseInt(delay));

                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Phone number input mask
 */
function initPhoneMask() {
    const phoneInput = document.querySelector('input[type="tel"]');

    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 0) {
                // Format: +55 (11) 00000-0000
                if (value.length <= 2) {
                    value = '+' + value;
                } else if (value.length <= 4) {
                    value = '+' + value.slice(0, 2) + ' (' + value.slice(2);
                } else if (value.length <= 9) {
                    value = '+' + value.slice(0, 2) + ' (' + value.slice(2, 4) + ') ' + value.slice(4);
                } else {
                    value = '+' + value.slice(0, 2) + ' (' + value.slice(2, 4) + ') ' + value.slice(4, 9) + '-' + value.slice(9, 13);
                }
            }

            e.target.value = value;
        });

        // Set initial placeholder
        phoneInput.addEventListener('focus', function() {
            if (!this.value) {
                this.value = '+55 ';
            }
        });

        phoneInput.addEventListener('blur', function() {
            if (this.value === '+55 ') {
                this.value = '';
            }
        });
    }
}

/**
 * Form submission handling
 */
function initFormSubmission() {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            if (!validateForm(form)) {
                return;
            }

            // Get submit button
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            // Add loading state
            button.textContent = 'Enviando...';
            button.disabled = true;
            button.classList.add('opacity-75', 'cursor-not-allowed');

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simulate API call (replace with actual endpoint)
            setTimeout(() => {
                // Success state
                button.textContent = 'Enviado com sucesso!';
                button.classList.remove('bg-primary-500', 'hover:bg-primary-600', 'opacity-75', 'cursor-not-allowed');
                button.classList.add('bg-green-500');

                // Show success message
                showNotification('Obrigado! Seu e-book será enviado para o e-mail informado.', 'success');

                // Reset form after delay
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('bg-green-500');
                    button.classList.add('bg-primary-500', 'hover:bg-primary-600');
                    button.disabled = false;
                    form.reset();
                }, 3000);
            }, 1500);
        });
    }
}

/**
 * Form validation
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        // Remove previous error styles
        field.classList.remove('border-red-500');

        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('border-red-500');
                isValid = false;
            }
        }

        // Checkbox validation
        if (field.type === 'checkbox' && !field.checked) {
            field.classList.add('ring-2', 'ring-red-500');
            isValid = false;
        }
    });

    if (!isValid) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
    }

    return isValid;
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;

    // Set colors based on type
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-primary-500', 'text-white');
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Auto remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

/**
 * Parallax effect for hero section
 */
function initParallax() {
    const heroImage = document.querySelector('.animate-float');

    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;

            if (scrolled < 800) {
                const translateY = scrolled * 0.1;
                heroImage.style.transform = `translateY(${translateY}px)`;
            }
        }, { passive: true });
    }
}

/**
 * Button hover effects
 */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-glow');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Lazy load images
 */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Counter animation for statistics
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

/**
 * Typewriter effect for text
 */
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Export functions for external use
window.StudioVisual = {
    showNotification,
    animateCounter,
    typewriterEffect
};
