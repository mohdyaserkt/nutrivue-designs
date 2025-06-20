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

    // Enhanced populateFoodAnalysis function
    function populateFoodAnalysis() {
        const foodData = {
            "items": [
                {
                    "name": "Pineapple",
                    "calories_per_gram": 0.5,
                    "nutrients": {
                        "protein_g": 0.5,
                        "carbohydrates_g": 10.0,
                        "fats_g": 0.1
                    }
                },
                {
                    "name": "Kiwi",
                    "calories_per_gram": 0.6,
                    "nutrients": {
                        "protein_g": 1.0,
                        "carbohydrates_g": 15.0,
                        "fats_g": 0.5
                    }
                },
                {
                    "name": "Watermelon",
                    "calories_per_gram": 0.5,
                    "nutrients": {
                        "protein_g": 0.4,
                        "carbohydrates_g": 8.0,
                        "fats_g": 0.2
                    }
                }
            ],
            "healthy_alternatives": "This fruit plate is already a healthy option. For even more variety, consider adding other fruits like berries (strawberries, raspberries, blackberries), or a small portion of nuts for added healthy fats and protein."
        };

        const container = document.querySelector('.detected-items');
        container.innerHTML = '';

        foodData.items.forEach(item => {
            const foodItem = document.createElement('div');
            foodItem.className = 'food-item';
            foodItem.innerHTML = `
            <div class="food-name">
                <span>${item.name}</span>
                <span>${item.calories_per_gram} kcal/g</span>
            </div>
            <div class="food-nutrients">
                <div class="nutrient-item">
                    <div class="nutrient-value">${item.nutrients.protein_g}g</div>
                    <div class="nutrient-label">Protein</div>
                </div>
                <div class="nutrient-item">
                    <div class="nutrient-value">${item.nutrients.carbohydrates_g}g</div>
                    <div class="nutrient-label">Carbs</div>
                </div>
                <div class="nutrient-item">
                    <div class="nutrient-value">${item.nutrients.fats_g}g</div>
                    <div class="nutrient-label">Fats</div>
                </div>
            </div>
            <div class="weight-input">
                <label>Weight (g):</label>
                <input type="number" value="100" min="1" class="weight-gram">
            </div>
        `;
            container.appendChild(foodItem);
        });

        document.querySelector('.healthy-alternatives p').textContent = foodData.healthy_alternatives;
    }

    // Enhanced populateLogSummary function
    function populateLogSummary() {
        // Calculate totals from food items in first modal
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFats = 0;

        document.querySelectorAll('.food-item').forEach(item => {
            const weight = parseFloat(item.querySelector('.weight-gram').value) || 0;
            const name = item.querySelector('.food-name span:first-child').textContent;
            const caloriesPerGram = parseFloat(item.querySelector('.food-name span:last-child').textContent);
            const protein = parseFloat(item.querySelector('.nutrient-item:nth-child(1) .nutrient-value').textContent);
            const carbs = parseFloat(item.querySelector('.nutrient-item:nth-child(2) .nutrient-value').textContent);
            const fats = parseFloat(item.querySelector('.nutrient-item:nth-child(3) .nutrient-value').textContent);

            const calories = (caloriesPerGram * weight).toFixed(1);
            const proteinTotal = ((protein / 100) * weight).toFixed(1);
            const carbsTotal = ((carbs / 100) * weight).toFixed(1);
            const fatsTotal = ((fats / 100) * weight).toFixed(1);

            totalCalories += parseFloat(calories);
            totalProtein += parseFloat(proteinTotal);
            totalCarbs += parseFloat(carbsTotal);
            totalFats += parseFloat(fatsTotal);
        });

        const container = document.querySelector('.summary-items');
        container.innerHTML = '';

        document.querySelectorAll('.food-item').forEach(item => {
            const name = item.querySelector('.food-name span:first-child').textContent;
            const weight = parseFloat(item.querySelector('.weight-gram').value) || 0;
            const caloriesPerGram = parseFloat(item.querySelector('.food-name span:last-child').textContent);
            const calories = (caloriesPerGram * weight).toFixed(1);

            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            summaryItem.innerHTML = `
            <span class="summary-item-name">${name} (${weight}g)</span>
            <span class="summary-item-value">${calories} kcal</span>
        `;
            container.appendChild(summaryItem);
        });

        document.querySelector('.total-summary .total-value:nth-child(1)').textContent = `${totalCalories.toFixed(1)} kcal`;
        document.querySelector('.total-summary .total-value:nth-child(2)').textContent = `${totalProtein.toFixed(1)} g`;
        document.querySelector('.total-summary .total-value:nth-child(3)').textContent = `${totalCarbs.toFixed(1)} g`;
        document.querySelector('.total-summary .total-value:nth-child(4)').textContent = `${totalFats.toFixed(1)} g`;
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