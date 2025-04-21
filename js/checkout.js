// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Constants
const SHIPPING_COST = 40.00;
const TAX_RATE = 0.10;

// DOM Elements
const orderItemsContainer = document.getElementById('order-items');
const subtotalElement = document.getElementById('checkout-subtotal');
const taxElement = document.getElementById('checkout-tax');
const totalElement = document.getElementById('checkout-total');
const checkoutForm = document.getElementById('checkoutForm');
const placeOrderButton = document.getElementById('place-order');
const cardDetails = document.getElementById('card-details');
const paymentMethods = document.getElementsByName('payment');

// Initialize checkout page
function initializeCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        setTimeout(() => {
            window.location.href = '/cart.html';
        }, 2000);
        return;
    }
    displayOrderItems();
    updateOrderTotals();
    setupEventListeners();
    animatePageLoad();
}

// Animate page load
function animatePageLoad() {
    const elements = document.querySelectorAll('.bg-white');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Display order items with animation
function displayOrderItems() {
    orderItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="flex items-center gap-4 animate-fade-in" style="animation-delay: ${index * 100}ms">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg shadow-sm">
            <div class="flex-1">
                <h3 class="font-semibold text-gray-800">${item.name}</h3>
                <p class="text-sm text-gray-600">Quantity: ${item.quantity}</p>
            </div>
            <div class="text-right">
                <p class="font-bold text-gray-800">₹${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

// Update order totals with animation
function updateOrderTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + SHIPPING_COST;

    // Animate number changes
    animateNumberChange(subtotalElement, subtotal.toFixed(2));
    animateNumberChange(taxElement, tax.toFixed(2));
    animateNumberChange(totalElement, total.toFixed(2));
}

// Animate number changes
function animateNumberChange(element, newValue) {
    const currentValue = parseFloat(element.textContent.replace('$', ''));
    const duration = 500;
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const value = currentValue + (newValue - currentValue) * progress;
        element.textContent = `₹${value.toFixed(2)}`;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

// Setup event listeners
function setupEventListeners() {
    // Payment method change
    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            if (e.target.value === 'card') {
                cardDetails.classList.remove('hidden');
                setTimeout(() => {
                    cardDetails.style.opacity = '1';
                }, 10);
            } else {
                cardDetails.style.opacity = '0';
                setTimeout(() => {
                    cardDetails.classList.add('hidden');
                }, 300);
            }
        });
    });

    // Form submission
    checkoutForm.addEventListener('submit', handlePlaceOrder);
}

// Validate form with visual feedback
function validateForm() {
    const form = document.getElementById('checkoutForm');
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
            input.classList.add('shake');
            setTimeout(() => {
                input.classList.remove('shake');
            }, 500);
        } else {
            input.classList.remove('border-red-500');
        }
    });

    // Validate card details if card payment is selected
    if (document.getElementById('card').checked) {
        const cardInputs = cardDetails.querySelectorAll('input');
        cardInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('border-red-500');
                input.classList.add('shake');
                setTimeout(() => {
                    input.classList.remove('shake');
                }, 500);
            } else {
                input.classList.remove('border-red-500');
            }
        });
    }

    return isValid;
}

// Handle place order with loading state
function handlePlaceOrder(e) {
    e.preventDefault();

    if (!validateForm()) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Disable form and show loading state
    checkoutForm.querySelectorAll('input, button').forEach(el => el.disabled = true);
    placeOrderButton.innerHTML = `
        <div class="flex items-center justify-center">
            <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span class="ml-2">Processing...</span>
        </div>
    `;

    // Simulate order processing
    setTimeout(() => {
        // Create order object
        const order = {
            items: cart,
            shipping: {
                fullName: document.querySelector('input[placeholder="Full Name"]').value,
                address: document.querySelector('input[placeholder="Address"]').value,
                city: document.querySelector('input[placeholder="City"]').value,
                state: document.querySelector('input[placeholder="State"]').value,
                zipCode: document.querySelector('input[placeholder="ZIP Code"]').value
            },
            payment: document.querySelector('input[name="payment"]:checked').value,
            date: new Date().toISOString(),
            totals: {
                subtotal: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
                shipping: SHIPPING_COST,
                tax: cart.reduce((total, item) => total + (item.price * item.quantity), 0) * TAX_RATE,
                total: cart.reduce((total, item) => total + (item.price * item.quantity), 0) * (1 + TAX_RATE) + SHIPPING_COST
            }
        };

        // Save order to localStorage
        localStorage.setItem('currentOrder', JSON.stringify(order));

        // Clear cart
        localStorage.removeItem('cart');

        // Show success message
        showNotification('Order placed successfully!', 'success');

        // Redirect to confirmation page after 2 seconds
        setTimeout(() => {
            window.location.href = '/order-confirmation.html';
        }, 2000);
    }, 2000);
}

// Show notification with animation
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-full ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white flex items-center`;

    // Add icon based on type
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    notification.innerHTML = `
        <i class="fas ${icon} mr-2"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.remove('translate-y-full');
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-y-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
        opacity: 0;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Initialize the checkout page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCheckout);