document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    let activityStarted = false;
    let selectedColor = ''; // This should be the color selected from the previous page

    startButton.addEventListener('click', () => {
        activityStarted = true;
        // Use the function below to generate the color options
        generateColorOptions(['green', 'blue', 'yellow', 'purple', 'black', 'red']); // Add or remove colors as needed
        // Retrieve selected image and title from local storage or another source
        loadActivityData();
    });

    function generateColorOptions(colors) {
        const colorPalette = document.getElementById('color-palette');
        colorPalette.innerHTML = '';

        colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.classList.add('color-option');
            colorDiv.style.backgroundColor = color;
            colorDiv.addEventListener('click', () => {
                if (!activityStarted) return;
                // Implement feedback logic here
            });
            colorPalette.appendChild(colorDiv);
        });
    }

    function loadActivityData() {
        // Access local storage or another source to retrieve the image and title
        const activityTitle = document.getElementById('activity-title');
        const imageContainer = document.getElementById('image-container');
        // Example: Retrieving stored data (replace with actual keys)
        activityTitle.value = localStorage.getItem('selectedTitle');
        const selectedImage = localStorage.getItem('selectedImage');
        if (selectedImage) {
            imageContainer.style.backgroundImage = `url(${selectedImage})`;
            imageContainer.style.backgroundSize = 'contain';
            imageContainer.style.backgroundPosition = 'center';
            imageContainer.style.backgroundRepeat = 'no-repeat';
        }
    }
});
