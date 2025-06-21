document.addEventListener('DOMContentLoaded', function() {
    // Sample user data - in a real app, this would come from an API
    const userData = {
        email: "user@example.com",
        name: "John Doe",
        is_active: true,
        age: 30,
        gender: "Male",
        weight_kg: 75.5,
        height_cm: 175,
        activity_level: "Moderately Active",
        goal: "Maintain Weight",
        target_calories: 2200
    };

    // DOM Elements
    const profileName = document.querySelector('.profile-name');
    const profileEmail = document.querySelector('.profile-email');
    const statValues = document.querySelectorAll('.stat-value');
    const toggleSwitch = document.querySelector('.toggle-switch input');

    // Initialize the profile with user data
    function initializeProfile() {
        profileName.textContent = userData.name;
        profileEmail.textContent = userData.email;
        
        // Update stats
        statValues[0].textContent = userData.target_calories;
        statValues[1].textContent = userData.weight_kg;
        statValues[2].textContent = userData.height_cm;
        
        // Set toggle switch
        toggleSwitch.checked = userData.is_active;
        
        // Initialize all editable fields
        document.querySelectorAll('.editable').forEach(field => {
            const fieldId = field.querySelector('label').textContent.trim().toLowerCase().replace(/\s+/g, '-');
            const staticValue = field.querySelector('.static-value');
            const input = field.querySelector('.edit-input');
            
            // Set initial values based on userData
            switch(fieldId) {
                case 'full-name':
                    staticValue.textContent = userData.name;
                    input.value = userData.name;
                    break;
                case 'age':
                    staticValue.textContent = userData.age;
                    input.value = userData.age;
                    break;
                case 'gender':
                    staticValue.textContent = userData.gender;
                    input.value = userData.gender;
                    break;
                case 'weight-(kg)':
                    staticValue.textContent = userData.weight_kg;
                    input.value = userData.weight_kg;
                    break;
                case 'height-(cm)':
                    staticValue.textContent = userData.height_cm;
                    input.value = userData.height_cm;
                    break;
                case 'activity-level':
                    staticValue.textContent = userData.activity_level;
                    input.value = userData.activity_level;
                    break;
                case 'fitness-goal':
                    staticValue.textContent = userData.goal;
                    input.value = userData.goal;
                    break;
            }
        });
    }

    // Edit/Save functionality for all editable fields
    document.querySelectorAll('.editable').forEach(field => {
        const editBtn = field.querySelector('.edit-btn');
        const saveBtn = field.querySelector('.save-btn');
        const staticValue = field.querySelector('.static-value');
        const input = field.querySelector('.edit-input');
        
        editBtn.addEventListener('click', () => {
            staticValue.style.display = 'none';
            input.style.display = 'block';
            editBtn.style.display = 'none';
            saveBtn.style.display = 'flex';
            
            // Focus the input
            if (input.tagName === 'SELECT') {
                input.focus();
            } else {
                input.focus();
                input.select();
            }
        });
        
        saveBtn.addEventListener('click', () => {
            // Validate input
            if (input.value.trim() === '' && input.required) {
                alert('This field cannot be empty');
                return;
            }
            
            // Update the display
            staticValue.textContent = input.tagName === 'SELECT' 
                ? input.options[input.selectedIndex].text 
                : input.value;
            
            // Update the user data object
            const fieldId = field.querySelector('label').textContent.trim().toLowerCase().replace(/\s+/g, '-');
            switch(fieldId) {
                case 'full-name':
                    userData.name = input.value;
                    profileName.textContent = input.value;
                    break;
                case 'age':
                    userData.age = parseInt(input.value);
                    break;
                case 'gender':
                    userData.gender = input.value;
                    break;
                case 'weight-(kg)':
                    userData.weight_kg = parseFloat(input.value);
                    statValues[1].textContent = input.value;
                    break;
                case 'height-(cm)':
                    userData.height_cm = parseInt(input.value);
                    statValues[2].textContent = input.value;
                    break;
                case 'activity-level':
                    userData.activity_level = input.value;
                    break;
                case 'fitness-goal':
                    userData.goal = input.value;
                    break;
            }
            
            // Switch back to view mode
            staticValue.style.display = 'block';
            input.style.display = 'none';
            editBtn.style.display = 'flex';
            saveBtn.style.display = 'none';
            
            // In a real app, you would send this to your backend API
            console.log('Updated user data:', userData);
            
            // Show success feedback
            showSuccessMessage('Changes saved successfully!');
        });
    });

    // Toggle switch functionality
    toggleSwitch.addEventListener('change', function() {
        userData.is_active = this.checked;
        console.log('Account active status:', userData.is_active);
    });

    // Show success message
    function showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.innerHTML = `
            <div class="toast-icon"><i class="fas fa-check-circle"></i></div>
            <div class="toast-message">${message}</div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }, 100);
    }

    // Initialize the profile
    initializeProfile();
});