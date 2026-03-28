const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#primaryNav');
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
});

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

document.getElementById('timestamp').value = new Date().toLocaleString();

const modalBtns = [
    { btnId: '#btn-np', modalId: '#modal-np' },
    { btnId: '#btn-bronze', modalId: '#modal-bronze' },
    { btnId: '#btn-silver', modalId: '#modal-silver' },
    { btnId: '#btn-gold', modalId: '#modal-gold' }
];

modalBtns.forEach(pair => {
    const btn = document.querySelector(pair.btnId);
    const modal = document.querySelector(pair.modalId);
    const closeBtn = modal.querySelector('.close-modal');

    btn.addEventListener('click', () => {
        modal.showModal();
    });

    closeBtn.addEventListener('click', () => {
        modal.close();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
});