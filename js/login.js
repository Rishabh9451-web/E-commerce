document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    function showError(element, message) {
        const errorDiv = element.parentElement.querySelector('.error-message');
        if (!errorDiv) {
            const div = document.createElement('div');
            div.className = 'error-message text-red-500 text-sm mt-1';
            div.textContent = message;
            element.parentElement.appendChild(div);
        } else {
            errorDiv.textContent = message;
        }
        element.classList.add('border-red-500');
    }

    function clearError(element) {
        const errorDiv = element.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        element.classList.remove('border-red-500');
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    function validateForm() {
        let isValid = true;
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        clearError(email);
        clearError(password);

        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        if (!password.value.trim()) {
            showError(password, 'Password is required');
            isValid = false;
        } else if (password.value.length < 6) {
            showError(password, 'Password must be at least 6 characters');
            isValid = false;
        }

        return isValid;
    }

    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
        successDiv.setAttribute('role', 'alert');
        successDiv.innerHTML = `
            <strong class="font-bold">Success!</strong>
            <span class="block sm:inline"> You have been logged in successfully.</span>
        `;
        loginForm.insertAdjacentElement('afterend', successDiv);

        // Redirect to home page after 2 seconds
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // Here you would typically send the login data to a server
            // For now, we'll just show a success message
            showSuccessMessage();
        }
    });
});