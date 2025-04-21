// Sample featured products data
const featuredProducts = [{
        id: 1,
        name: "Wireless Headphones",
        price: 2299,
        image: "https://images.alphacoders.com/109/1090856.jpg",
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 4599,
        image: "https://wallpaperaccess.com/full/2067583.jpg",
        description: "Feature-rich smartwatch with health tracking"
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 4149,
        image: "https://img.freepik.com/premium-photo/laptop-bag-png-hd-8k-wallpaper-stock-photographic-image_677426-7675.jpg",
        description: "Durable and spacious laptop backpack"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 4979,
        image: "https://tse1.mm.bing.net/th?id=OIP.cCyvKEig1-cTpAhw1gNbjQHaEK&pid=Api&P=0&h=180",
        description: "Portable bluetooth speaker with amazing sound"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Add to cart
function addToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification('Product added to cart!');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 translate-y-0';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('translate-y-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenu = document.getElementById('close-menu');
    const searchOverlay = document.getElementById('search-overlay');
    const searchButton = document.getElementById('search-button');
    const closeSearch = document.getElementById('close-search');

    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    // Search overlay toggle
    searchButton.addEventListener('click', () => {
        searchOverlay.classList.remove('hidden');
    });

    closeSearch.addEventListener('click', () => {
        searchOverlay.classList.add('hidden');
    });

    // Close overlays when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
        if (e.target === searchOverlay) {
            searchOverlay.classList.add('hidden');
        }
    });

    // Display featured products
    const featuredProductsContainer = document.getElementById('featured-products');
    if (featuredProductsContainer) {
        featuredProductsContainer.innerHTML = featuredProducts.map(product => `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                    <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xl font-bold">₹${product.price.toLocaleString('en-IN')}</span>
                        <button onclick="addToCart(${product.id})" 
                            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Initialize cart count
    updateCartCount();
});