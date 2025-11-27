// 1. Navigation and Mobile Menu
const nav = document.querySelector("nav");
const navBtn = document.querySelector("#nav-btn");
const navLinks = document.querySelectorAll(".nav-link");

// Hamburger menu toggle
if (navBtn) {
    navBtn.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});

// 2. Sticky Header and Back to Top
window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");
    const hero = document.querySelector("#home");
    const goToTop = document.querySelector("#goToTop");
    
    if (header && hero && goToTop) {
        let triggerHeight = hero.offsetHeight - 170;

        if (window.scrollY > triggerHeight) {
            header.classList.add("header-sticky");
            goToTop.classList.add("reveal");
        } else {
            header.classList.remove("header-sticky");
            goToTop.classList.remove("reveal");
        }
    }
});

// 3. Active Navigation Links - FIXED
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 4. Animated Skill Bars
function initializeSkillBars() {
    const skillBars = document.querySelectorAll(".skill");
    
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const fill = skillBar.querySelector(".skill-bar__fill");
                const percentage = skillBar.querySelector(".skill-percent");
                const progress = parseInt(fill.getAttribute("data-progress"), 10);
                
                // Animate the skill bar
                setTimeout(() => {
                    fill.style.width = `${progress}%`;
                }, 500);

                // Animate the percentage counter
                let counter = 0;
                const interval = setInterval(() => {
                    if (counter <= progress) {
                        percentage.textContent = `${counter}%`;
                        counter++;
                    } else {
                        clearInterval(interval);
                    }
                }, 1500 / progress);
                
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(skill => observer.observe(skill));
}

// 5. Project Click Functionality
document.querySelectorAll('.project-box').forEach(card => {
    card.addEventListener('click', () => {
        const link = card.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
    });
});

// 6. Image Slider Functionality - FIXED
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!slides || slides.length === 0 || !dotsContainer || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;

    // Create dots for slider
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Next/Previous buttons
    nextBtn.addEventListener('click', () => {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) nextSlide = 0;
        goToSlide(nextSlide);
    });

    prevBtn.addEventListener('click', () => {
        let prevSlide = currentSlide - 1;
        if (prevSlide < 0) prevSlide = slides.length - 1;
        goToSlide(prevSlide);
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) nextSlide = 0;
        goToSlide(nextSlide);
    }, 5000);
}

// 7. Canvas Drawing - ENHANCED
function initializeCanvas() {
    const canvas = document.getElementById('myCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#6f1d1b');
        gradient.addColorStop(1, '#8b4a48');
        
        // Draw rounded rectangle background
        ctx.fillStyle = gradient;
        roundRect(ctx, 5, 5, canvas.width - 10, canvas.height - 10, 15);
        ctx.fill();
        
        // Draw text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText('Welcome to my portfolio!', canvas.width / 2, 50);
        
        // Draw signature
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 85, 25, 0, Math.PI * 2);
        ctx.fillStyle = '#0c1618';
        ctx.fill();
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Poppins';
        ctx.fillText('S.S', canvas.width / 2 - 2, 90);
    }
}

// Helper function for rounded rectangles
function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

// 8. Contact Form Validation - FIXED to redirect to form-details.html
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showMessage('Please fill all fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Store form data in localStorage and redirect
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('message', message);
        
        showMessage('Thank you for your message! Redirecting...', 'success');
        
        // Redirect to form details page after 2 seconds
        setTimeout(() => {
            window.location.href = 'form-details.html';
        }, 2000);
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.prepend(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// 9. Dark/Light Mode Toggle - FIXED
function initializeDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            // Save theme preference
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            // Update toggle icon
            updateThemeIcon(isDarkMode);
        });
        
        // Update icon on load
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        updateThemeIcon(isDarkMode);
    }
}

function updateThemeIcon(isDarkMode) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = isDarkMode ? '☀️' : '🌓';
    }
}

// Load saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// 10. Footer Year
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// 11. CV Download Tracking (Optional)
function trackDownload() {
    const downloadBtn = document.querySelector('a[download]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // You can add analytics here later
            console.log('CV downloaded');
        });
    }
}

// 11b. Back to Top Button
function initializeGoToTop() {
    const goToTopBtn = document.getElementById('goToTop');
    if (goToTopBtn) {
        goToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Make keyboard accessible
        goToTopBtn.setAttribute('tabindex', '0');
        goToTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
}

// 12. Smooth scrolling for navigation links
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

// 13. Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSkillBars();
    initializeSlider();
    initializeCanvas();
    initializeDarkMode();
    initializeGoToTop();
    trackDownload();
    
    console.log('Portfolio initialized successfully!');
});