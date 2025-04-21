document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

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
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const terms = document.getElementById('terms');

        // Clear all previous errors
        [firstName, lastName, email, password, confirmPassword].forEach(field => clearError(field));

        // Validate First Name
        if (!firstName.value.trim()) {
            showError(firstName, 'First name is required');
            isValid = false;
        }

        // Validate Last Name
        if (!lastName.value.trim()) {
            showError(lastName, 'Last name is required');
            isValid = false;
        }

        // Validate Email
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Password
        if (!password.value.trim()) {
            showError(password, 'Password is required');
            isValid = false;
        } else if (password.value.length < 8) {
            showError(password, 'Password must be at least 8 characters');
            isValid = false;
        }

        // Validate Confirm Password
        if (!confirmPassword.value.trim()) {
            showError(confirmPassword, 'Please confirm your password');
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }

        // Validate Terms
        if (!terms.checked) {
            showError(terms, 'You must agree to the terms and conditions');
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
            <span class="block sm:inline"> Your account has been created successfully.</span>
        `;
        signupForm.insertAdjacentElement('afterend', successDiv);

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // Here you would typically send the signup data to a server
            // For now, we'll just show a success message
            showSuccessMessage();
        }
    });
});