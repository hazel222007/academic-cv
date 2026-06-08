/* ============================================
   ACADEMIC WEBSITE - JAVASCRIPT
   Interactive Elements & Functionality
   ============================================ */

// ============================================
// 1. NAVIGATION HAMBURGER MENU
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideMenu && !isClickOnHamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ============================================
// 2. SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Optional: unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.interest-card, .experience-card, .award-item, .publication-item, .skill-category').forEach(el => {
    observer.observe(el);
});

// ============================================
// 3. FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Prepare form data
        const formData = new FormData(contactForm);

        // Create mailto link as fallback
        const mailtoLink = `mailto:mehjabinshirin001@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

        // Try to send via fetch (requires backend)
        // For now, we'll show success and open mailto
        showNotification('Thank you for your message! Redirecting to email client...', 'success');

        // Simulate sending (in real scenario, this would go to backend)
        setTimeout(() => {
            window.location.href = mailtoLink;
            contactForm.reset();
        }, 1500);
    });
}

// ============================================
// 4. NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        zIndex: '9999',
        fontSize: '14px',
        fontWeight: '600',
        animation: 'slideIn 0.3s ease-out',
        maxWidth: '400px'
    });

    // Set colors based on type
    const colors = {
        success: { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
        error: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
        info: { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' }
    };

    const colorScheme = colors[type] || colors.info;
    notification.style.backgroundColor = colorScheme.bg;
    notification.style.color = colorScheme.color;
    notification.style.border = `1px solid ${colorScheme.border}`;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// 5. SMOOTH SCROLL ENHANCEMENT
// ============================================

// Add smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80; // Account for sticky nav

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 6. ACTIVE NAVIGATION HIGHLIGHTING
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

updateActiveNavLink();

// ============================================
// 7. ADD CSS ANIMATIONS DYNAMICALLY
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    .nav-menu a.active {
        color: var(--primary);
        border-bottom-color: var(--accent);
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    /* Scrollbar styling */
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: var(--bg-light);
    }

    ::-webkit-scrollbar-thumb {
        background: var(--accent);
        border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: var(--primary);
    }
`;

document.head.appendChild(style);

// ============================================
// 8. COPY TO CLIPBOARD FUNCTIONALITY
// ============================================

function addCopyToClipboard() {
    const emailElement = document.querySelector('a[href^="mailto:"]');
    const phoneElement = document.querySelector('a[href^="tel:"]');

    if (emailElement) {
        emailElement.addEventListener('click', function(e) {
            const email = this.href.replace('mailto:', '');
            copyToClipboard(email);
            showNotification('Email address copied to clipboard!', 'success');
        });
    }

    if (phoneElement) {
        phoneElement.addEventListener('click', function(e) {
            const phone = this.textContent;
            copyToClipboard(phone);
            showNotification('Phone number copied to clipboard!', 'success');
        });
    }
}

function copyToClipboard(text) {
    // Modern browsers
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Initialize copy to clipboard
addCopyToClipboard();

// ============================================
// 9. COUNTER ANIMATION FOR STATS
// ============================================

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(element => {
        const target = parseInt(element.textContent);
        let current = 0;
        const increment = Math.ceil(target / 30); // Animate over ~30 frames

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = current;
            }
        }, 30);
    });
}

// Animate counters when section is visible
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ============================================
// 10. KEYBOARD NAVIGATION SUPPORT
// ============================================

document.addEventListener('keydown', function(event) {
    // Close menu with Escape key
    if (event.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }

    // Jump to contact form with Alt+C
    if (event.altKey && event.key === 'c') {
        event.preventDefault();
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.scrollIntoView({ behavior: 'smooth' });
            document.getElementById('name').focus();
        }
    }
});

// ============================================
// 11. PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', function() {
    // Add animation class to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.animation = 'fadeInUp 0.8s ease-out';
    }

    // Stagger animations for multiple elements
    const cards = document.querySelectorAll('.interest-card, .award-item');
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
        card.style.opacity = '0';
    });
});

// ============================================
// 12. PRINT STYLESHEET SUPPORT
// ============================================

function preparePrint() {
    window.addEventListener('beforeprint', function() {
        // Hide non-essential elements
        const navBar = document.querySelector('.navbar');
        const footer = document.querySelector('.footer');

        if (navBar) navBar.style.display = 'none';
        if (footer) footer.style.display = 'none';
    });

    window.addEventListener('afterprint', function() {
        // Show elements again
        const navBar = document.querySelector('.navbar');
        const footer = document.querySelector('.footer');

        if (navBar) navBar.style.display = '';
        if (footer) footer.style.display = '';
    });
}

preparePrint();

// ============================================
// 13. LAZY LOADING FOR IMAGES
// ============================================

function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

lazyLoadImages();

// ============================================
// 14. PERFORMANCE MONITORING
// ============================================

function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        const pageLoadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');

        // Log Core Web Vitals if available
        if ('web-vital' in window) {
            console.log('Core Web Vitals available');
        }
    }
}

window.addEventListener('load', logPerformanceMetrics);

// ============================================
// 15. INITIALIZATION
// ============================================

console.log('Academic Website initialized successfully');
console.log('Navigation, animations, and interactive features are active');

// Add any additional initialization code here
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - All scripts ready');
    // Any code that needs to run after DOM is fully loaded
});
