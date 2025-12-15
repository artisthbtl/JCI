document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('contactForm');
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const termsInput = document.getElementById('terms');

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorSpan = formGroup.querySelector('.error-msg');
        
        input.classList.add('input-error');
        errorSpan.textContent = message;
        return false;
    }

    function clearError(input) {
        const formGroup = input.parentElement;
        const errorSpan = formGroup.querySelector('.error-msg');
        
        input.classList.remove('input-error');
        errorSpan.textContent = '';
        return true;
    }

    function validateName() {
        const value = nameInput.value.trim();
        if (value === "") {
            return showError(nameInput, "Name cannot be empty.");
        }
        if (value.length < 3) {
            return showError(nameInput, "Name must be at least 3 characters.");
        }
        return clearError(nameInput);
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        
        const atSymbolIndex = value.indexOf('@');
        const dotIndex = value.lastIndexOf('.');

        if (value === "") {
            return showError(emailInput, "Email cannot be empty.");
        }
        if (atSymbolIndex < 1 || dotIndex <= atSymbolIndex + 1 || dotIndex === value.length - 1) {
            return showError(emailInput, "Please enter a valid email address.");
        }
        return clearError(emailInput);
    }

    function validatePhone() {
        const value = phoneInput.value.trim();
        
        if (value === "") {
            return showError(phoneInput, "Phone number cannot be empty.");
        }

        if (value.length < 10) {
            return showError(phoneInput, "Phone number is too short.");
        }

        for (let i = 0; i < value.length; i++) {
            const char = value[i];
            if ((char < '0' || char > '9') && char !== ' ' && char !== '+') {
                return showError(phoneInput, "Phone number must contain only digits.");
            }
        }
        return clearError(phoneInput);
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        
        if (value === "") {
            return showError(messageInput, "Message cannot be empty.");
        }
        
        const wordCount = value.split(' ').filter(word => word !== '').length;
        
        if (wordCount < 3) {
            return showError(messageInput, "Message is too short (min 3 words).");
        }
        return clearError(messageInput);
    }

    function validateTerms() {
        if (!termsInput.checked) {
            return showError(termsInput, "You must agree to the terms.");
        }
        return clearError(termsInput);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop default HTML submission

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();
        const isTermsValid = validateTerms();

        if (isNameValid && isEmailValid && isPhoneValid && isMessageValid && isTermsValid) {
            alert("Thank you! Your message has been sent to JCI.");
            form.reset();
        }
    });

    nameInput.addEventListener('input', () => clearError(nameInput));
    emailInput.addEventListener('input', () => clearError(emailInput));
    phoneInput.addEventListener('input', () => clearError(phoneInput));
    messageInput.addEventListener('input', () => clearError(messageInput));
    termsInput.addEventListener('change', () => clearError(termsInput));
});