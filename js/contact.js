document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formFields = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

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

        // Clear all previous errors
        Object.values(formFields).forEach(field => clearError(field));

        // Validate First Name
        if (!formFields.firstName.value.trim()) {
            showError(formFields.firstName, 'First name is required');
            isValid = false;
        }

        // Validate Last Name
        if (!formFields.lastName.value.trim()) {
            showError(formFields.lastName, 'Last name is required');
            isValid = false;
        }

        // Validate Email
        if (!formFields.email.value.trim()) {
            showError(formFields.email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(formFields.email.value)) {
            showError(formFields.email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Subject
        if (!formFields.subject.value.trim()) {
            showError(formFields.subject, 'Subject is required');
            isValid = false;
        }

        // Validate Message
        if (!formFields.message.value.trim()) {
            showError(formFields.message, 'Message is required');
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
            <span class="block sm:inline"> Your message has been sent successfully.</span>
        `;
        contactForm.insertAdjacentElement('afterend', successDiv);

        // Clear form
        contactForm.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            showSuccessMessage();
        }
    });
});