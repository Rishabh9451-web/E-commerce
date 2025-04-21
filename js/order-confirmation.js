document.addEventListener('DOMContentLoaded', function() {
    // Get order details from localStorage
    const order = JSON.parse(localStorage.getItem('currentOrder')) || {};
    const orderItems = document.getElementById('orderItems');
    const shippingInfo = document.getElementById('shippingInfo');
    const subtotal = document.getElementById('subtotal');
    const shipping = document.getElementById('shipping');
    const tax = document.getElementById('tax');
    const total = document.getElementById('total');
    const orderDate = document.getElementById('orderDate');

    // Format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Display order items
    if (order.items && order.items.length > 0) {
        orderItems.innerHTML = order.items.map(item => `
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="font-semibold">${item.name}</h3>
                    <p class="text-gray-600">Quantity: ${item.quantity}</p>
                </div>
                <span class="font-semibold">₹${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
    }

    // Display shipping information
    if (order.shipping) {
        shippingInfo.innerHTML = `
            <p><strong>Name:</strong> ${order.shipping.fullName}</p>
            <p><strong>Address:</strong> ${order.shipping.address}</p>
            <p><strong>City:</strong> ${order.shipping.city}</p>
            <p><strong>State:</strong> ${order.shipping.state}</p>
            <p><strong>ZIP Code:</strong> ${order.shipping.zipCode}</p>
        `;
    }

    // Display order totals
    if (order.totals) {
        subtotal.textContent = `₹${order.totals.subtotal.toFixed(2)}`;
        shipping.textContent = `₹${order.totals.shipping.toFixed(2)}`;
        tax.textContent = `₹${order.totals.tax.toFixed(2)}`;
        total.textContent = `₹${order.totals.total.toFixed(2)}`;
    }

    // Display order date
    if (order.date) {
        orderDate.textContent = formatDate(order.date);
    }

    // Save order to orders history
    if (order.items && order.items.length > 0) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.removeItem('currentOrder'); // Clear current order
    }
});