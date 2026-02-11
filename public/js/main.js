// ===== PASSWORD TOGGLE =====
const togglePassword = document.getElementById('togglePassword');
if (togglePassword) {
    togglePassword.addEventListener('click', function() {
        const password = document.getElementById('password');
        const icon = this.querySelector('i');
        if (password.type === 'password') {
            password.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            password.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
}

// ===== PASSWORD STRENGTH METER =====
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

if (passwordInput && strengthBar) {
    passwordInput.addEventListener('input', function() {
        const val = this.value;
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');

        let strength = 0;
        if (val.length >= 6) strength++;
        if (val.match(/[A-Z]/)) strength++;
        if (val.match(/[0-9]/)) strength++;
        if (val.match(/[^A-Za-z0-9]/)) strength++;

        strengthBar.className = 'password-strength mt-2';

        if (val.length === 0) {
            strengthText.textContent = '';
            strengthBar.style.width = '0';
        } else if (strength <= 1) {
            strengthBar.classList.add('strength-weak');
            strengthText.textContent = '🔴 Weak password';
            strengthText.style.color = '#e74c3c';
        } else if (strength <= 2) {
            strengthBar.classList.add('strength-medium');
            strengthText.textContent = '🟡 Medium password';
            strengthText.style.color = '#f39c12';
        } else {
            strengthBar.classList.add('strength-strong');
            strengthText.textContent = '🟢 Strong password!';
            strengthText.style.color = '#00d4aa';
        }
    });
}

// ===== CONFIRM PASSWORD CHECK =====
const confirmPassword = document.getElementById('confirmPassword');
if (confirmPassword) {
    confirmPassword.addEventListener('input', function() {
        const password = document.getElementById('password').value;
        const confirmError = document.getElementById('confirmError');
        if (this.value !== password) {
            confirmError.textContent = '❌ Passwords do not match';
        } else {
            confirmError.textContent = '✅ Passwords match!';
            confirmError.style.color = '#00d4aa';
        }
    });
}

// ===== REGISTER FORM VALIDATION =====
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPwd = document.getElementById('confirmPassword').value;
        let valid = true;

        if (name.length < 2) {
            document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
            document.getElementById('name').classList.add('is-invalid');
            valid = false;
        }

        if (!email.includes('@') || !email.includes('.')) {
            document.getElementById('emailError').textContent = 'Please enter a valid email';
            document.getElementById('email').classList.add('is-invalid');
            valid = false;
        }

        if (password.length < 6) {
            valid = false;
        }

        if (password !== confirmPwd) {
            document.getElementById('confirmError').textContent = '❌ Passwords do not match';
            valid = false;
        }

        if (!valid) e.preventDefault();
    });
}