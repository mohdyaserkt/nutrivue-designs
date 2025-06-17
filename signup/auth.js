document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Show magic link form
    const showMagicLink = document.getElementById('show-magic-link');
    if (showMagicLink) {
        showMagicLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.magic-link-form').style.display = 'block';
            this.parentElement.style.display = 'none';
        });
    }

    // Password strength indicator
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            const strengthBars = this.parentElement.parentElement.querySelectorAll('.strength-bar');
            const strengthText = this.parentElement.parentElement.querySelector('.strength-text');
            
            if (!strengthBars.length) return;
            
            const strength = calculatePasswordStrength(this.value);
            
            // Reset all bars
            strengthBars.forEach(bar => {
                bar.style.background = '#eee';
                bar.style.opacity = '0.5';
            });
            
            // Set active bars
            for (let i = 0; i < strength.score; i++) {
                strengthBars[i].style.background = strength.color;
                strengthBars[i].style.opacity = '1';
            }
            
            strengthText.textContent = strength.text;
            strengthText.style.color = strength.color;
        });
    });

    function calculatePasswordStrength(password) {
        let score = 0;
        
        // Length
        if (password.length > 0) score++;
        if (password.length >= 8) score++;
        
        // Complexity
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        // Cap at 4 for our 4-bar display
        score = Math.min(score, 4);
        
        // Return results
        const results = [
            { score: 1, color: '#FF6B6B', text: 'Very Weak' },
            { score: 2, color: '#FFA500', text: 'Weak' },
            { score: 3, color: '#FFD700', text: 'Good' },
            { score: 4, color: '#6BCB77', text: 'Strong' }
        ];
        
        return results[score - 1] || { score: 0, color: '#eee', text: 'Password strength' };
    }

    // Form submission handling
    document.querySelectorAll('.auth-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally handle form submission
            // For demo purposes, we'll just show a success message
            const submitBtn = this.querySelector('.auth-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Success!';
                submitBtn.style.background = 'var(--success)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'var(--primary)';
                    
                    // Redirect after successful login/signup
                    // window.location.href = 'dashboard.html';
                }, 1500);
            }, 1500);
        });
    });
});