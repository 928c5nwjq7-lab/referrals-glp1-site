// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`nav a[href*=${sectionId}]`)?.classList.add('active');
        } else {
            document.querySelector(`nav a[href*=${sectionId}]`)?.classList.remove('active');
        }
    });
});

// Track affiliate link clicks (optional - for analytics)
document.querySelectorAll('a[href*="YOUR_AFFILIATE_LINK"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // You can add Google Analytics or other tracking here
        console.log('Affiliate link clicked:', this.href);
        
        // Example: Google Analytics event tracking
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'click', {
        //         'event_category': 'Affiliate Link',
        //         'event_label': this.href,
        //         'transport_type': 'beacon'
        //     });
        // }
    });
});

// Fade in elements on scroll (optional animation)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe provider cards and other elements
document.querySelectorAll('.provider-card, .review-card, .guide-item, .faq-item').forEach(el => {
    observer.observe(el);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .provider-card,
    .review-card,
    .guide-item,
    .faq-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    nav a.active {
        color: #2563eb;
    }
`;
document.head.appendChild(style);