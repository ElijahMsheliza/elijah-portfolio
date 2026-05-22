// Smooth scrolling navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu after click
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open navigation menu');
            }
        });
    });
    
    // Highlight active navigation link on scroll
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll event listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    
    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Hide scroll indicator after user scrolls
        let hasScrolled = false;
        window.addEventListener('scroll', function() {
            if (!hasScrolled && window.scrollY > 100) {
                hasScrolled = true;
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.3s ease';
            }
        });
    }
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Typing animation for hero title (optional enhancement)
    function typeWriter() {
        const titleElement = document.querySelector('.hero-title');
        if (!titleElement) return;
        
        const originalText = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < originalText.length) {
                titleElement.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 50);
    }
    
    // Uncomment to enable typing animation
    // setTimeout(typeWriter, 1000);
    
    // Email link feedback functionality
    function handleEmailClick(event) {
        event.preventDefault();
        const email = 'mshelizaelijah@yahoo.com';
        const subject = 'Inquiry about IT Support Position';
        const body = 'Hello Elijah,\n\nI am interested in discussing potential opportunities.\n\nBest regards,';
        
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Try to open email client
        window.location.href = mailtoLink;
        
        const targetElement = event.target.closest('a');
        if (!targetElement) return;

        const originalHTML = targetElement.innerHTML;
        
        // Provide visual feedback
        if (targetElement.classList.contains('btn')) {
            targetElement.innerHTML = '<i class="fas fa-check"></i> Opening Email...';
            setTimeout(() => {
                targetElement.innerHTML = originalHTML;
            }, 2000);
        } else {
            showEmailTooltip(targetElement, 'Opening email client...');
        }
        
        // Fallback: Copy email to clipboard after delay
        setTimeout(() => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    if (targetElement.classList.contains('btn')) {
                        targetElement.innerHTML = '<i class="fas fa-copy"></i> Email Copied!';
                        setTimeout(() => {
                            targetElement.innerHTML = originalHTML;
                        }, 2000);
                    } else {
                        showEmailTooltip(targetElement, 'Email copied to clipboard!');
                    }
                }).catch(() => {
                    // Do nothing on failure to avoid annoying alerts
                });
            }
        }, 1500);
    }
    
    function showEmailTooltip(element, message) {
        // Remove old tooltip if exists
        const oldTooltip = document.querySelector('.email-tooltip');
        if (oldTooltip) oldTooltip.remove();

        const tooltip = document.createElement('div');
        tooltip.className = 'email-tooltip';
        tooltip.textContent = message;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + window.scrollY + 8) + 'px';
        
        // Trigger reflow
        void tooltip.offsetWidth;
        tooltip.classList.add('show');
        
        setTimeout(() => {
            tooltip.classList.remove('show');
            setTimeout(() => tooltip.remove(), 300);
        }, 2500);
    }
    
    // Add event listeners to all email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', handleEmailClick);
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');
    function syncThemeButton() {
        const isDark = rootElement.hasAttribute('data-theme');
        themeToggle.setAttribute('aria-pressed', String(isDark));
        themeIcon.classList.toggle('fa-sun', isDark);
        themeIcon.classList.toggle('fa-moon', !isDark);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        rootElement.setAttribute('data-theme', 'dark');
    }
    syncThemeButton();

    // Function to update particles color based on theme
    function updateParticlesConfig(isDark) {
        if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
            const linesColor = isDark ? '#38bdf8' : '#94a3b8';
            const particlesColor = isDark ? ['#38bdf8', '#2dd4bf', '#64748b'] : ['#0ea5e9', '#14b8a6', '#94a3b8'];
            
            pJSDom[0].pJS.particles.line_linked.color = linesColor;
            pJSDom[0].pJS.particles.color.value = particlesColor;
            pJSDom[0].pJS.fn.particlesRefresh();
        }
    }

    themeToggle.addEventListener('click', () => {
        const shouldUseDark = !rootElement.hasAttribute('data-theme');
        if (shouldUseDark) {
            rootElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            rootElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
        syncThemeButton();
        updateParticlesConfig(shouldUseDark);
    });

    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
        const isDark = rootElement.hasAttribute('data-theme');
        const linesColor = isDark ? '#38bdf8' : '#94a3b8';
        const particlesColor = isDark ? ['#38bdf8', '#2dd4bf', '#64748b'] : ['#0ea5e9', '#14b8a6', '#94a3b8'];

        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": particlesColor },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": linesColor,
                    "opacity": 0.3,
                    "width": 1
                },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }
    
    // Initialize the page
    updateActiveNav();
});
