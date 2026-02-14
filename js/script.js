// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Подсветка активной секции при скролле
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
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

// ========== АНИМАЦИЯ ПЕЧАТНОЙ МАШИНКИ ==========
const typingText = document.getElementById('typing-text');
const phrases = [
    'Студент TOU', 
    'Выпускник ПВЭК', 
    'Будущий разработчик', 
    'Из Павлодара',
    'Учу Python и JS'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Пауза после окончания печати
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Запускаем анимацию печатной машинки
setTimeout(typeEffect, 500);

// Валидация формы
const contactForm = document.getElementById('contactForm');
const feedback = document.getElementById('form-feedback');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name === '' || email === '' || message === '') {
        feedback.textContent = '❌ Заполните все поля!';
        feedback.style.color = '#e74c3c';
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        feedback.textContent = '❌ Введите корректный email!';
        feedback.style.color = '#e74c3c';
        return;
    }
    
    feedback.textContent = '✅ Сообщение отправлено! (Демо-режим)';
    feedback.style.color = '#00cec9';
    contactForm.reset();
});