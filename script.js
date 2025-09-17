document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll & Mobile Nav ---
    const header = document.getElementById('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Typing Effect ---
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ["Web Devloper", "Problem Solver", "Etrepreneur"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const currentChar = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);

            typingText.textContent = currentChar;
            typingText.classList.add('stop-blinking');

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 150);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 100);
            } else {
                isDeleting = !isDeleting;
                typingText.classList.remove('stop-blinking');
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, 1200);
            }
        }
        type();
    }

    // --- AOS Initialization ---
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = '<i class="fa-solid fa-sun"></i>';
    const moonIcon = '<i class="fa-solid fa-moon"></i>';
    
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
           themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
        }
    };

    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                applyTheme('light');
            } else {
                applyTheme('dark');
            }
        });
    }
    
    // --- Contact Form Validation ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                formStatus.textContent = 'Please fill in all fields.';
                formStatus.style.color = 'red';
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.style.color = 'red';
                return;
            }

            formStatus.textContent = 'Thank you for your message!';
            formStatus.style.color = 'green';
            form.reset();
            
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }

});
