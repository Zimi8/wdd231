import { financingPlans } from '../data/info.mjs';

document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('primaryNav');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

let cart = JSON.parse(localStorage.getItem('argentumCart')) || [];
const cartCount = document.getElementById('cart-count');
if (cartCount) {
    cartCount.textContent = cart.length;
}

const plansContainer = document.getElementById('plans-container');

function renderPlans() {
    plansContainer.innerHTML = '';
    
    financingPlans.forEach(plan => {
        const card = document.createElement('div');
        card.classList.add('plan-card');
        
        card.innerHTML = `
            <h3 class="plan-title">${plan.title}</h3>
            <p class="plan-installments">${plan.installments}</p>
            <p class="plan-req">${plan.requirement}</p>
            <div class="plan-discount">${plan.discount}</div>
        `;
        
        plansContainer.appendChild(card);
    });
}

renderPlans();

const solarForm = document.getElementById('solar-form');
const calcResult = document.getElementById('calc-result');

solarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const latInput = parseFloat(document.getElementById('latitude').value);
    const typeInput = document.getElementById('house-type').value;
    
    const absoluteLat = Math.abs(latInput);
    let optimalAngleYearRound = absoluteLat;
    let optimalAngleWinter = absoluteLat + 15;
    
    let recommendation = '';
    if (typeInput === 'roof') {
        recommendation = 'We recommend installing fixed panels on your roof facing True North to maximize daily absorption.';
    } else if (typeInput === 'balcony') {
        recommendation = 'For a balcony, we recommend our Solar Awning products mounted securely. Angle may be restricted by the building facade.';
    } else if (typeInput === 'van') {
        recommendation = 'For a van, flat mounting is common for aerodynamics, but portable foldable panels can be manually tilted to the optimal angle when parked.';
    }

    calcResult.classList.remove('hidden');
    calcResult.innerHTML = `
        <p><strong>Year-Round Optimal Angle:</strong> ~${optimalAngleYearRound.toFixed(1)}°</p>
        <p><strong>Winter Optimized Angle:</strong> ~${optimalAngleWinter.toFixed(1)}° (Better for high-usage months)</p>
        <br>
        <p><strong>Recommendation:</strong> ${recommendation}</p>
    `;
});