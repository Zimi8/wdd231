const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#primaryNav');
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
});

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

const urlParams = new URLSearchParams(window.location.search);

document.getElementById('res-first').textContent = urlParams.get('first');
document.getElementById('res-last').textContent = urlParams.get('last');
document.getElementById('res-email').textContent = urlParams.get('email');
document.getElementById('res-phone').textContent = urlParams.get('phone');
document.getElementById('res-business').textContent = urlParams.get('business');
document.getElementById('res-timestamp').textContent = urlParams.get('timestamp');