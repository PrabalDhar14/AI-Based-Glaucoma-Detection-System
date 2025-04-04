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

// Update footer year dynamically
const yearSpan = document.querySelector('#current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Basic form validation and submission (login & registration)
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#register-form');

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.querySelector('#login-username').value.trim();
            const password = document.querySelector('#login-password').value.trim();

            if (username === '' || password === '') {
                alert('Please fill out all fields.');
                return;
            }

            // Dummy login success
            alert(`Welcome back, ${username}!`);
            window.location.href = '/dashboard';
        });
    }

    // Registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.querySelector('#register-username').value.trim();
            const email = document.querySelector('#register-email').value.trim();
            const password = document.querySelector('#register-password').value.trim();
            const confirmPassword = document.querySelector('#confirm-password').value.trim();

            if (username === '' || email === '' || password === '' || confirmPassword === '') {
                alert('Please fill out all fields.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            // Dummy registration success
            alert(`Welcome, ${username}! Your account has been created.`);
            window.location.href = '/login';
        });
    }
});

// Add hover effect to feature items
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
});

// Handle button clicks
document.querySelectorAll('.btn-primary, .nav-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        console.log(`${this.innerText} button clicked.`);
    });
});
