document.addEventListener('DOMContentLoaded', function () {
    // Calendar Generation
    // Enhanced generateCalendar function
    function generateCalendar() {
        const daysContainer = document.querySelector('.days');
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Set month name
        document.querySelector('.current-month').textContent =
            new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

        // Get first day of month and total days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Clear previous days
        daysContainer.innerHTML = '';

        // Add empty days for first week
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day empty';
            daysContainer.appendChild(emptyDay);
        }

        // Add days of month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';

            // Random calorie data for demo
            const calories = Math.floor(Math.random() * 500) + 100;
            const percentage = Math.min(100, Math.floor((calories / 2000) * 100));

            dayElement.innerHTML = `
            <span>${i}</span>
            <span class="day-calories">${calories} kcal</span>
            <div class="day-progress" style="width: ${percentage}%"></div>
        `;

            // Mark current day
            if (i === currentDate.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
                dayElement.classList.add('active');
            }

            // Add click event to view day details
            dayElement.addEventListener('click', function () {
                // Here you would normally load day details
                alert(`Viewing details for ${i} ${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`);
            });

            daysContainer.appendChild(dayElement);
        }
    }


    generateCalendar();

    // Modal Handling
    const modals = document.querySelectorAll('.modal');
    const openModal1 = document.getElementById('upload-image');
    const openModal2 = document.getElementById('open-camera');
    const addToLogBtn = document.getElementById('add-to-log');
    const fileInput = document.getElementById('file-input');

    function toggleModal(modalId) {
        modals.forEach(modal => {
            if (modal.id === modalId) {
                modal.classList.toggle('active');
            } else {
                modal.classList.remove('active');
            }
        });
    }

    // Close modals when clicking X or outside
    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this || e.target.classList.contains('close-modal')) {
                this.classList.remove('active');

                // Stop camera if camera modal is closing
                if (this.id === 'camera-modal') {
                    stopCamera();
                }
            }
        });
    });

    // Open modals
    if (openModal1) {
        openModal1.addEventListener('click', function () {
            fileInput.click();
        });
    }

    if (openModal2) {
        openModal2.addEventListener('click', function () {
            toggleModal('camera-modal');
            startCamera();
        });
    }

    // File input handling
    fileInput.addEventListener('change', function (e) {
        if (e.target.files.length > 0) {
            // Here you would normally process the image
            // For demo, we'll just open the food analysis modal
            toggleModal('food-analysis-modal');
            populateFoodAnalysis();
        }
    });

    // Add to log button
    if (addToLogBtn) {
        addToLogBtn.addEventListener('click', function () {
            toggleModal('food-analysis-modal');
            toggleModal('log-summary-modal');
            populateLogSummary();
        });
    }

    function populateFoodAnalysis() {
        const foodData = {
            "items": [
                {
                    "name": "Pineapple",
                    "calories_per_gram": 0.5,
                    "image": "images/pineapple.jpg",
                    "nutrients": {
                        "protein_g": 0.5,
                        "carbohydrates_g": 10.0,
                        "fats_g": 0.1
                    }
                },
                {
                    "name": "Grilled Chicken",
                    "calories_per_gram": 1.65,
                    "image": "images/chicken.jpg",
                    "nutrients": {
                        "protein_g": 25.0,
                        "carbohydrates_g": 0.0,
                        "fats_g": 3.0
                    }
                },
                {
                    "name": "Mixed Greens",
                    "calories_per_gram": 0.15,
                    "image": "images/salad.jpg",
                    "nutrients": {
                        "protein_g": 1.0,
                        "carbohydrates_g": 3.0,
                        "fats_g": 0.2
                    }
                }
            ],
            "total_calories": 420,
            "tips": "This fruit plate is already a healthy option. For better macros balance, consider adding a protein source like Greek yogurt or nuts."
        };
        
        const container = document.querySelector('#food-analysis-modal .detected-items');
        container.innerHTML = '';
        
        // Update summary
        document.querySelector('#food-analysis-modal .value').textContent = `${foodData.total_calories} kcal`;
        document.querySelector('#food-analysis-modal .nutrition-tips p').textContent = foodData.tips;
        
        // Add food items
        foodData.items.forEach(item => {
            const foodItem = document.createElement('div');
            foodItem.className = 'food-item';
            foodItem.innerHTML = `
                
                <div class="food-details">
    <!-- Food Header -->
    <div class="food-header">
        <h3 class="food-name">${item.name}</h3>
        <div class="food-meta">
            <span class="calorie-badge">
                <i class="fas fa-fire"></i>
                ${item.calories_per_gram} kcal/g
            </span>
        </div>
    </div>
    
    <!-- Nutrient Pills -->
    <div class="nutrient-pills">
        <div class="pill protein">
            <div class="pill-icon">
                <i class="fas fa-dumbbell"></i>
            </div>
            <div class="pill-content">
                <span class="pill-value">${item.nutrients.protein_g}g</span>
                <span class="pill-label">Protein</span>
            </div>
        </div>
        
        <div class="pill carbs">
            <div class="pill-icon">
                <i class="fas fa-wheat-awn"></i>
            </div>
            <div class="pill-content">
                <span class="pill-value">${item.nutrients.carbohydrates_g}g</span>
                <span class="pill-label">Carbs</span>
            </div>
        </div>
        
        <div class="pill fats">
            <div class="pill-icon">
                <i class="fas fa-oil-can"></i>
            </div>
            <div class="pill-content">
                <span class="pill-value">${item.nutrients.fats_g}g</span>
                <span class="pill-label">Fats</span>
            </div>
        </div>
    </div>
    
    <!-- Weight Input -->
    <div class="weight-control">
        <label class="weight-label">Adjust Portion</label>
        <div class="input-group">
            
            <input type="number" value="100" min="1" class="weight-input">
            <span class="unit">g</span>
            
        </div>
    </div>
</div>
            `;
            container.appendChild(foodItem);
        });
    }
   
    
    // Camera functionality
    let stream = null;

    function startCamera() {
        const video = document.getElementById('camera-view');

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (mediaStream) {
                    stream = mediaStream;
                    video.srcObject = mediaStream;
                })
                .catch(function (error) {
                    console.error("Camera error: ", error);
                });
        }
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            document.getElementById('camera-view').srcObject = null;
            stream = null;
        }
    }

    // Capture photo from camera
    document.getElementById('capture-btn').addEventListener('click', function () {
        const video = document.getElementById('camera-view');
        const canvas = document.getElementById('camera-canvas');
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Here you would normally process the captured image
        // For demo, we'll just open the food analysis modal
        toggleModal('camera-modal');
        toggleModal('food-analysis-modal');
        populateFoodAnalysis();
        stopCamera();
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.slide-up').forEach(el => {
        observer.observe(el);
    });
});