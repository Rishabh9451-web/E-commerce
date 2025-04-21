// Sample products data (in a real app, this would come from an API)
const products = [{
        id: 1,
        name: "Wireless Headphones",
        price: 2499.99,
        category: "Electronics",
        rating: 5,
        image: "https://images.alphacoders.com/109/1090856.jpg",
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999.99,
        category: "Electronics",
        rating: 4,
        image: "https://www.gonoise.com/cdn/shop/files/Artboard_17_pro6max.webp?v=1739277875",
        description: "Feature-rich smartwatch with health tracking"
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        price: 599.99,
        category: "Fashion",
        rating: 4,
        image: "https://images.meesho.com/images/products/493093534/fonkl_1200.jpg",
        description: "Comfortable 100% cotton t-shirt"
    },
    {
        id: 4,
        name: "Running Shoes",
        price: 799.99,
        category: "Fashion",
        rating: 5,
        image: "https://assets.ajio.com/medias/sys_master/root/20240313/VxY0/65f1ba5605ac7d77bbb0c143/-473Wx593H-451019115-blackwhite-MODEL.jpg",
        description: "Lightweight running shoes with great support"
    },
    {
        id: 5,
        name: "Realme 11 Pro",
        price: 19999.99,
        category: "Electronics",
        rating: 5,
        image: "https://etimg.etb2bimg.com/photo/100847657.cms",
        description: "Latest smartphone with high performance and camera quality"
    },
    {
        id: 6,
        name: "Home decor",
        price: 1500,
        category: "Fashion",
        rating: 5,
        image: "https://shrigramorganics.com/wp-content/uploads/2023/05/81lhgprdGL._SL1500_.jpg",
        description: "Stylish home decor items to enhance your living space"
    },
    {
        id: 7,
        name: "Macbook Pro",
        price: 98000,
        category: "Electronics",
        rating: 5,
        image: "https://www.apple.com/v/macbook-pro-14-and-16/a/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_large.jpg",
        description: "The latest Macbook Pro with M1 chip for high performance"
    },
    {
        id: 8,
        name: "Laptop Bag",
        price: 1600,
        category: "Fashion",
        rating: 5,
        image: "https://www.thepostbox.in/cdn/shop/files/07_0f6b7bac-beac-44f4-b7b5-49ef0f503b57.jpg?v=1692182209",
        description: "Soft and durable laptop bag for easy carrying"
    },
    {
        id: 9,
        name: "Mouse",
        price: 9500,
        category: "electronics",
        rating: 4,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MXK63?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1730508287136",
        description: "Stylish and ergonomic mouse for comfortable use"
    },
    
    
    // Add more products as needed
];

// State
let currentFilters = {
    categories: [],
    priceRange: { min: 0, max: 100000 },
    rating: null,
    sortBy: 'popularity'
};

let currentPage = 1;
const productsPerPage = 9;

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const productCount = document.getElementById('product-count');
const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const priceRange = document.getElementById('price-range');
const sortSelect = document.querySelector('select');
const cartCount = document.getElementById('cart-count');

// Initialize page
function initializePage() {
    displayProducts();
    setupEventListeners();
    updateCartCount();
}

// Display products
function displayProducts() {
    const filteredProducts = filterProducts();
    const paginatedProducts = paginateProducts(filteredProducts);

    productsGrid.innerHTML = paginatedProducts.map(product => `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                <div class="flex items-center mb-4">
                    ${generateRatingStars(product.rating)}
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold">₹${product.price.toFixed(2)}</span>
                    <button onclick="addToCart(${product.id})" 
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    productCount.textContent = filteredProducts.length;
}

// Generate rating stars
function generateRatingStars(rating) {
    return Array(5).fill(0).map((_, index) => `
        <i class="${index < rating ? 'fas' : 'far'} fa-star text-yellow-400"></i>
    `).join('');
}

// Filter products
function filterProducts() {
    return products.filter(product => {
        // Category filter
        if (currentFilters.categories.length > 0 &&
            !currentFilters.categories.includes(product.category)) {
            return false;
        }

        // Price filter
        if (product.price < currentFilters.priceRange.min ||
            product.price > currentFilters.priceRange.max) {
            return false;
        }

        // Rating filter
        if (currentFilters.rating && product.rating < currentFilters.rating) {
            return false;
        }

        return true;
    }).sort((a, b) => {
        // Sort products
        switch (currentFilters.sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });
}

// Paginate products
function paginateProducts(products) {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    return products.slice(start, end);
}

// Setup event listeners
function setupEventListeners() {
    // Category filters
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const category = e.target.nextElementSibling.textContent;
            if (e.target.checked) {
                currentFilters.categories.push(category);
            } else {
                currentFilters.categories = currentFilters.categories.filter(c => c !== category);
            }
            currentPage = 1;
            displayProducts();
        });
    });

    // Price range
    priceRange.addEventListener('input', (e) => {
        currentFilters.priceRange.max = parseInt(e.target.value);
        displayProducts();
    });

    // Sort select
    sortSelect.addEventListener('change', (e) => {
        currentFilters.sortBy = e.target.value.toLowerCase();
        displayProducts();
    });

    // Search input
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', debounce((e) => {
        const searchTerm = e.target.value.toLowerCase();
        products.forEach(product => {
            product.hidden = !product.name.toLowerCase().includes(searchTerm) &&
                !product.description.toLowerCase().includes(searchTerm);
        });
        displayProducts();
    }, 300));
}

// Add to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);

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

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
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

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);