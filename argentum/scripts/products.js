import { products } from '../data/products.mjs';

document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('primaryNav');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

const currencyUrl = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';
const rateDisplay = document.getElementById('ars-rate');

async function fetchExchangeRate() {
    try {
        const response = await fetch(currencyUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const arsRate = data.usd.ars.toFixed(2);
        rateDisplay.textContent = arsRate;
    } catch (error) {
        rateDisplay.textContent = '1000.00 (Estimated)';
    }
}

fetchExchangeRate();

let cart = JSON.parse(localStorage.getItem('argentumCart')) || [];
const cartCount = document.getElementById('cart-count');

function updateCartCount() {
    cartCount.textContent = cart.length;
}
updateCartCount();

const gridContainer = document.getElementById('product-grid');
const modal = document.getElementById('product-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const closeModalBtn = document.getElementById('close-modal');

function renderProducts(items) {
    gridContainer.innerHTML = '';
    
    items.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price}</p>
            <div class="card-actions">
                <button class="action-btn buy-btn" data-id="${product.id}">Buy</button>
                <button class="action-btn cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;

        const imgElement = card.querySelector('.product-img');
        const buyBtn = card.querySelector('.buy-btn');
        const cartBtn = card.querySelector('.cart-btn');

        const openModal = () => {
            modalImg.src = product.image;
            modalImg.alt = product.name;
            modalTitle.textContent = product.name;
            modalDesc.textContent = product.description;
            modalPrice.textContent = product.price;
            modal.showModal();
        };

        imgElement.addEventListener('click', openModal);
        buyBtn.addEventListener('click', openModal);

        cartBtn.addEventListener('click', () => {
            cart.push(product);
            localStorage.setItem('argentumCart', JSON.stringify(cart));
            updateCartCount();
        });

        gridContainer.appendChild(card);
    });
}

renderProducts(products);

closeModalBtn.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    }
});

const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        if (filterValue === 'all') {
            renderProducts(products);
        } else {
            const filteredProducts = products.filter(product => 
                product.categories.includes(filterValue)
            );
            renderProducts(filteredProducts);
        }
    });
});