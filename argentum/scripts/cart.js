document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('primaryNav');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

let cart = JSON.parse(localStorage.getItem('argentumCart')) || [];
const cartCount = document.getElementById('cart-count');
const cartContainer = document.getElementById('cart-items-container');
const summaryItems = document.getElementById('summary-items');
const summaryTotal = document.getElementById('summary-total');

function updateCartCount() {
    cartCount.textContent = cart.length;
    summaryItems.textContent = cart.length;
}

function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    summaryTotal.textContent = total.toFixed(2);
}

function renderCart() {
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty. Visit the Products page to add items.</p>';
        calculateTotal();
        updateCartCount();
        return;
    }

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)} USD</p>
            </div>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        cartContainer.appendChild(itemDiv);
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const indexToRemove = e.target.getAttribute('data-index');
            cart.splice(indexToRemove, 1);
            localStorage.setItem('argentumCart', JSON.stringify(cart));
            renderCart();
        });
    });

    updateCartCount();
    calculateTotal();
}

renderCart();

const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeModal = document.getElementById('close-modal');

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        checkoutModal.showModal();
        cart = [];
        localStorage.setItem('argentumCart', JSON.stringify(cart));
        renderCart();
    } else {
        alert("Your cart is empty. Please add items before proceeding.");
    }
});

closeModal.addEventListener('click', () => {
    checkoutModal.close();
});