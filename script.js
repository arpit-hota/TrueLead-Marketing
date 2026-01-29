// Configuration - IMPORTANT: Replace with your actual WhatsApp number
const WHATSAPP_NUMBER = '918114981337'; // Replace with your WhatsApp number (with country code, no + or spaces)
// Example: For India +91 9876543210, use '919876543210'

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Form submission to WhatsApp
const form = document.getElementById('auditForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const business = document.getElementById('business').value;
    const query = document.getElementById('query').value;

    // Create WhatsApp message
    const message = `
🎯 *New Free Audit Request*

*Name:* ${name}
*WhatsApp:* ${whatsapp}

*Business Details:*
${business}

*Query/Challenge:*
${query || 'Not specified'}

Looking forward to connecting!
    `.trim();

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Redirect to WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    // Optional: Reset form
    form.reset();
    
    // Show success message (optional)
    alert('Redirecting to WhatsApp... Please complete your message there!');
});

// Smooth scroll behavior for anchor links
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

// Add parallax effect to hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Counter animation for stats
const animateCounter = (element, target, duration) => {
    let start = 0;
    const increment = target / (duration / 16);
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                stat.textContent = '0' + suffix;
                animateCounter(stat, number, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.setProperty('--hover', '1');
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.setProperty('--hover', '0');
    });
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevent form submission if WhatsApp number is not configured
if (WHATSAPP_NUMBER === '1234567890') {
    console.warn('⚠️ IMPORTANT: Please update the WHATSAPP_NUMBER in script.js with your actual WhatsApp number!');
}

// Easter egg: Console message
console.log('%c🚀 TrueLead Marketing', 'font-size: 20px; font-weight: bold; color: #FF6B35;');
console.log('%cWebsite built with modern web technologies', 'font-size: 12px; color: #666;');
console.log('%cNeed a website like this? Contact TrueLead! 💼', 'font-size: 12px; color: #004E89;');
