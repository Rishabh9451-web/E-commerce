// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutButton = document.getElementById('checkout-button');

// Constants
const SHIPPING_COST = 40; // ₹415 (converted from $5)
const TAX_RATE = 0.10; // 18% GST

// Initialize cart page
function initializeCart() {
    if (cart.length === 0) {
        showEmptyCart();
    } else {
        displayCartItems();
        updateCartTotals();
    }
}

// Show empty cart message
function showEmptyCart() {
    cartItemsContainer.classList.add('hidden');
    emptyCartMessage.classList.remove('hidden');
    checkoutButton.disabled = true;
    checkoutButton.classList.add('opacity-50', 'cursor-not-allowed');
}

// Display cart items
function displayCartItems() {
    cartItemsContainer.classList.remove('hidden');
    emptyCartMessage.classList.add('hidden');
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('opacity-50', 'cursor-not-allowed');

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="flex items-center gap-4 py-4 border-b">
            <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
            <div class="flex-1">
                <h3 class="font-semibold">${item.name}</h3>
                <p class="text-gray-600 text-sm">${item.description}</p>
                <div class="flex items-center mt-2">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" 
                        class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="mx-4">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" 
                        class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="text-right">
                <p class="font-bold text-lg">₹${(item.price * item.quantity).toLocaleString('en-IN')}</p>
                <button onclick="removeItem(${item.id})" 
                    class="text-red-500 hover:text-red-700 text-sm">
                    Remove
                </button>
            </div>
        </div>
    `).join('');
}

// Update cart totals
function updateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + SHIPPING_COST;

    subtotalElement.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    taxElement.textContent = `₹${tax.toLocaleString('en-IN')}`;
    totalElement.textContent = `₹${total.toLocaleString('en-IN')}`;
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeItem(productId);
        return;
    }

    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartTotals();
    }
}

// Remove item from cart
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));

    if (cart.length === 0) {
        showEmptyCart();
    } else {
        displayCartItems();
        updateCartTotals();
    }
}

// Handle checkout button click
checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        window.location.href = '/checkout.html';
    }
});

// Initialize the cart page
document.addEventListener('DOMContentLoaded', initializeCart);