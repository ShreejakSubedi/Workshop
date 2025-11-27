// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully!');
    
    // Initialize all features
    initMobileMenu();
    initSkillBars();
    initProjectClicks();
    initImageSlider();
    initContactForm();
    initDarkMode();
    initBackToTop();
    initCanvas();
});

// 1. Mobile Menu Toggle - Simple version
function initMobileMenu() {
    const navBtn = document.querySelector('.nav-btn');
    const navList = document.querySelector('.nav-list');
    
    if (navBtn && navList) {
        navBtn.addEventListener('click', function() {
            navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// 2. Animated Skill Bars - Easy to understand
function initSkillBars() {
    const skills = document.querySelectorAll('.skill');
    
    // Create an observer to watch when skills enter the screen
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skill = entry.target;
                const progressBar = skill.querySelector('.skill-progress');
                const percentElement = skill.querySelector('.skill-percent');
                const progress = progressBar.getAttribute('data-progress');
                
                // Animate the progress bar
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 500);
                
                // Animate the percentage counter
                let counter = 0;
                const timer = setInterval(() => {
                    if (counter <= progress) {
                        percentElement.textContent = counter + '%';
                        counter++;
                    } else {
                        clearInterval(timer);
                    }
                }, 20);
                
                // Stop observing after animation
                observer.unobserve(skill);
            }
        });
    });
    
    // Observe each skill element
    skills.forEach(skill => {
        observer.observe(skill);
    });
}

// 3. Project Click Handler - No <a> tags used
function initProjectClicks() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectLink = this.getAttribute('data-link');
            if (projectLink) {
                // Open project in new tab
                window.open(projectLink, '_blank');
            }
        });
    });
}

// 4. Simple Image Slider
function initImageSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    // Create dots for navigation
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        showSlide(nextIndex);
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) prevIndex = slides.length - 1;
        showSlide(prevIndex);
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        showSlide(nextIndex);
    }, 5000);
}

// 5. Contact Form with Validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form from refreshing page
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields!');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address!');
                return;
            }
            
            // Save to localStorage (browser memory)
            localStorage.setItem('contactName', name);
            localStorage.setItem('contactEmail', email);
            localStorage.setItem('contactMessage', message);
            
            // Redirect to form details page
            window.location.href = 'form-details.html';
        });
    }
}

// Helper function to validate email
function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}

// 6. Dark/Light Mode Toggle
function initDarkMode() {
    const themeBtn = document.getElementById('themeToggle');
    
    // Check if dark mode was enabled before
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = '☀️';
    }
    
    themeBtn.addEventListener('click', function() {
        // Toggle dark mode class
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Change button icon
        themeBtn.textContent = isDarkMode ? '☀️' : '🌓';
    });
}

// 7. Back to Top Button
function initBackToTop() {
    const backBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        // Show button when scrolled down 300px
        if (window.scrollY > 300) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    });
    
    backBtn.addEventListener('click', function() {
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 8. Canvas Drawing
function initCanvas() {
    const canvas = document.getElementById('myCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#6f1d1b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    ctx.fillStyle = 'white';
    ctx.font = '20px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Welcome to My Portfolio!', canvas.width/2, 50);
    
    // Draw a simple shape
    ctx.beginPath();
    ctx.arc(canvas.width/2, 100, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#0c1618';
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = '16px Poppins';
    ctx.fillText('S.S', canvas.width/2 - 5, 105);
}