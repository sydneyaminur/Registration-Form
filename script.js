// DOM elements
const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const phoneNumberInput = document.getElementById('phoneNumber');
const genderInputs = document.querySelectorAll('input[name="gender"]');

// Error message elements
const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const phoneNumberError = document.getElementById('phoneNumberError');
const genderError = document.getElementById('genderError');

// Validation functions
function validateFullName() {
    const fullName = fullNameInput.value.trim();
    
    if (fullName === '') {
        showError(fullNameInput, fullNameError, 'Full name is required');
        return false;
    } else if (fullName.length < 3) {
        showError(fullNameInput, fullNameError, 'Full name must be at least 3 characters');
        return false;
    } else {
        showSuccess(fullNameInput, fullNameError, '');
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        showError(emailInput, emailError, 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    } else {
        showSuccess(emailInput, emailError, '');
        return true;
    }
}

function validatePassword() {
    const password = passwordInput.value;
    
    // Check if password meets all requirements
    const hasMinLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password === '') {
        showError(passwordInput, passwordError, 'Password is required');
        return false;
    } else if (!hasMinLength) {
        showError(passwordInput, passwordError, 'Password must be at least 6 characters');
        return false;
    } else if (!hasUppercase) {
        showError(passwordInput, passwordError, 'Password must contain at least one uppercase letter');
        return false;
    } else if (!hasNumber) {
        showError(passwordInput, passwordError, 'Password must contain at least one number');
        return false;
    } else if (!hasSpecialChar) {
        showError(passwordInput, passwordError, 'Password must contain at least one special character');
        return false;
    } else {
        showSuccess(passwordInput, passwordError, '');
        return true;
    }
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword === '') {
        showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
        return false;
    } else if (password !== confirmPassword) {
        showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
        return false;
    } else {
        showSuccess(confirmPasswordInput, confirmPasswordError, '');
        return true;
    }
}

function validatePhoneNumber() {
    const phoneNumber = phoneNumberInput.value.trim();
    const phoneRegex = /^\d{10}$/;
    
    if (phoneNumber === '') {
        showError(phoneNumberInput, phoneNumberError, 'Phone number is required');
        return false;
    } else if (!phoneRegex.test(phoneNumber)) {
        showError(phoneNumberInput, phoneNumberError, 'Phone number must be exactly 10 digits');
        return false;
    } else {
        showSuccess(phoneNumberInput, phoneNumberError, '');
        return true;
    }
}

function validateGender() {
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    
    if (!selectedGender) {
        showError(null, genderError, 'Please select a gender');
        return false;
    } else {
        showSuccess(null, genderError, '');
        return true;
    }
}

// Helper functions for showing errors and success states
function showError(inputElement, errorElement, message) {
    if (inputElement) {
        inputElement.classList.add('invalid');
    }
    errorElement.textContent = message;
    errorElement.className = 'error-message';
}

function showSuccess(inputElement, errorElement, message) {
    if (inputElement) {
        inputElement.classList.remove('invalid');
    }
    errorElement.textContent = message;
    errorElement.className = 'success-message';
}

// Function to show success modal notification
function showSuccessModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'success-modal-overlay';
    
    // Get form data for display
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneNumberInput.value.trim();
    const gender = document.querySelector('input[name="gender"]:checked').value;
    
    modalOverlay.innerHTML = `
        <div class="success-modal">
            <span class="modal-icon">🎉</span>
            <h2 class="modal-title">Registration Successful!</h2>
            <p class="modal-message">Welcome aboard! Your account has been created successfully.</p>
            
            <div class="modal-details">
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Gender:</strong> ${gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
            </div>
            
            <button class="go-back-button" onclick="this.closest('.success-modal-overlay').remove(); document.querySelector('.form-container').classList.remove('form-blur');">
                Go Back
            </button>
        </div>
    `;
    
    // Add blur effect to form
    document.querySelector('.form-container').classList.add('form-blur');
    
    // Add to page
    document.body.appendChild(modalOverlay);
    
    // Show with animation
    setTimeout(() => {
        modalOverlay.classList.add('show');
    }, 100);
    
    // No auto-remove - modal stays until "Go Back" button is clicked
}

// Function to show error modal notification
function showErrorModal(errors) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'error-modal-overlay';
    
    // Create error list HTML
    const errorListHTML = errors.map(error => `<li>${error}</li>`).join('');
    
    modalOverlay.innerHTML = `
        <div class="error-modal">
            <span class="modal-icon">❌</span>
            <h2 class="modal-title">Incomplete Registration!</h2>
            <p class="modal-message">Please complete all required fields before submitting.</p>
            
            <div class="error-list">
                <h4 style="margin-top: 0; margin-bottom: 15px;">Missing Information:</h4>
                <ul>
                    ${errorListHTML}
                </ul>
            </div>
            
            <button class="close-button" onclick="this.closest('.error-modal-overlay').remove(); document.querySelector('.form-container').classList.remove('form-blur');">
                Fill the form
            </button>
        </div>
    `;
    
    // Add blur effect to form
    document.querySelector('.form-container').classList.add('form-blur');
    
    // Add to page
    document.body.appendChild(modalOverlay);
    
    // Show with animation
    setTimeout(() => {
        modalOverlay.classList.add('show');
    }, 100);
}

// Real-time validation event listeners
fullNameInput.addEventListener('blur', validateFullName);
fullNameInput.addEventListener('input', function() {
    if (this.value.trim().length > 0) {
        validateFullName();
    }
});

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', function() {
    if (this.value.trim().length > 0) {
        validateEmail();
    }
});

passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        validatePassword();
        // Also revalidate confirm password if it has been filled
        if (confirmPasswordInput.value.length > 0) {
            validateConfirmPassword();
        }
    }
});

confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
confirmPasswordInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        validateConfirmPassword();
    }
});

phoneNumberInput.addEventListener('blur', validatePhoneNumber);
phoneNumberInput.addEventListener('input', function() {
    if (this.value.trim().length > 0) {
        validatePhoneNumber();
    }
});

// Add event listeners to gender radio buttons
genderInputs.forEach(input => {
    input.addEventListener('change', validateGender);
});

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Run all validations
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isPhoneNumberValid = validatePhoneNumber();
    const isGenderValid = validateGender();
    
    // Check if all validations pass
    const isFormValid = isFullNameValid && isEmailValid && isPasswordValid && 
                       isConfirmPasswordValid && isPhoneNumberValid && isGenderValid;
    
    if (isFormValid) {
        // Show custom success modal instead of alert
        showSuccessModal();
        
        // Optional: Reset the form after successful submission
        // form.reset();
        // Clear all error/success messages
        // document.querySelectorAll('.error-message, .success-message').forEach(el => {
        //     el.textContent = '';
        // });
        // document.querySelectorAll('.invalid').forEach(el => {
        //     el.classList.remove('invalid');
        // });
    } else {
        // Collect all error messages for the modal
        const errors = [];
        
        if (!isFullNameValid) {
            if (fullNameInput.value.trim() === '') {
                errors.push('Full Name is required');
            } else {
                errors.push('Full Name must be at least 3 characters');
            }
        }
        
        if (!isEmailValid) {
            if (emailInput.value.trim() === '') {
                errors.push('Email is required');
            } else {
                errors.push('Please enter a valid email address');
            }
        }
        
        if (!isPasswordValid) {
            const password = passwordInput.value;
            if (password === '') {
                errors.push('Password is required');
            } else {
                const issues = [];
                if (password.length < 6) issues.push('at least 6 characters');
                if (!/[A-Z]/.test(password)) issues.push('one uppercase letter');
                if (!/\d/.test(password)) issues.push('one number');
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) issues.push('one special character');
                errors.push(`Password must contain ${issues.join(', ')}`);
            }
        }
        
        if (!isConfirmPasswordValid) {
            if (confirmPasswordInput.value === '') {
                errors.push('Please confirm your password');
            } else {
                errors.push('Passwords do not match');
            }
        }
        
        if (!isPhoneNumberValid) {
            if (phoneNumberInput.value.trim() === '') {
                errors.push('Phone Number is required');
            } else {
                errors.push('Phone Number must be exactly 10 digits');
            }
        }
        
        if (!isGenderValid) {
            errors.push('Please select a gender');
        }
        
        // Show error modal with all issues
        showErrorModal(errors);
        
        // Focus on the first invalid field
        const firstInvalidField = document.querySelector('.invalid');
        if (firstInvalidField) {
            firstInvalidField.focus();
        }
    }
});

// Prevent form submission on Enter key in input fields (optional enhancement)
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && input.type !== 'submit') {
            e.preventDefault();
            // Move to next input or submit if it's the last input
            const inputs = Array.from(document.querySelectorAll('input:not([type="submit"])'));
            const currentIndex = inputs.indexOf(input);
            if (currentIndex < inputs.length - 1) {
                inputs[currentIndex + 1].focus();
            } else {
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }
        }
    });
});