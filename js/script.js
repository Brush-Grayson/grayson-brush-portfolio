// 1. Variables using 'const' to select elements using querySelector()
const themeButton = document.querySelector('#theme-btn');
const statusText = document.querySelector('#status-text');

// 2. A function that handles the theme switching logic
function toggleTheme() {
    // Toggles the dark-mode class on the body element
    document.body.classList.toggle('dark-mode');

    // 3. An 'if/else' statement to check if dark mode is currently active
    if (document.body.classList.contains('dark-mode')) {
        // 4. Modifying the webpage text content
        statusText.textContent = "The current theme is Dark Mode.";
    } else {
        // Modifying the webpage text content back to default
        statusText.textContent = "The current theme is Light Mode.";

        // Modifying webpage styling back to default (Blue in Light Mode)
        themeButton.style.backgroundColor = '#007bff';
        themeButton.style.color = '#ffffff';
    }
    
}

// 5. A click event listener attached to the existing button ID
themeButton.addEventListener('click', toggleTheme);
