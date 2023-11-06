let isSelectionMode = false; //check selection mode
let selectedElements = []; //collection of selected elements
let interactionCounts = {}; //count element-wise interactions

// Make sure document is loaded properly
document.addEventListener("DOMContentLoaded", () => {
    // Select all interactive elements
    const interactiveElements = document.querySelectorAll('.interactive-button, .interactive-link, .interactive-video, .interactive-dropdown');
    // Select dashboard element
    const dashboard = document.getElementById('dashboard');

    // apply click event listener to all the interactive elements
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => {
            // Perform selection/de-selection
            if (isSelectionMode) {
                markElementForTracking(element);
            }
            // trigger event for console logging
            simulateEvent(element);
            // show updated dashboard contents
            updateDashboard(dashboard);
        });
    });

    // Check whether s or S is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 's' || event.key === 'S') {
            toggleSelectionMode();
        }
    });
});

// Activate/De-activate selection mode
function toggleSelectionMode() {
    isSelectionMode = !isSelectionMode;

    if (!isSelectionMode) {
        // Clear the selection
        selectedElements.forEach(element => {
            element.style.borderColor = "transparent";
        });
        // empty selection array
        selectedElements = [];
    }
}

// Select/De-select elements based on mode
function markElementForTracking(element) {
    if (selectedElements.includes(element)) {
        // Deselect the element
        const index = selectedElements.indexOf(element);
        selectedElements.splice(index, 1);
        element.style.borderColor = "transparent";
    } else {
        // Select the element
        selectedElements.push(element);
        element.style.borderColor = "red";
    }
}

// Check eventType and eventText and log on console
function simulateEvent(element) {
    let elementType = '';
    let elementText = '';

    if (element.classList.contains('interactive-button')) {
        elementType = 'button';
        elementText = element.textContent;
    } else if (element.classList.contains('interactive-link')) {
        elementType = 'link';
        elementText = element.textContent;
    } else if (element.classList.contains('interactive-video')) {
        elementType = 'video';
        elementText = 'Video';
    } else if (element.classList.contains('interactive-dropdown')) {
        elementType = 'dropdown';
        elementText = element.value;
    }

    if (elementText) {
        interactionCounts[elementText] = (interactionCounts[elementText] || 0) + 1;
        console.log(`Simulated event sent to GTM: Type - ${elementType}, Text - ${elementText}`);
    }
}

// Update contents of dashboard on every update
function updateDashboard(dashboard) {
    dashboard.innerHTML = '<h2>Selected Elements Dashboard</h2>';
    for (const [elementText, count] of Object.entries(interactionCounts)) {
        const listItem = document.createElement('div');
        listItem.textContent = `${elementText}: ${count} interaction(s)`;
        dashboard.appendChild(listItem);
    }
}
