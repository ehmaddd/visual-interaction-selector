let isSelectionMode = false;
let selectedElements = [];
let interactionCounts = {};

document.addEventListener("DOMContentLoaded", () => {
    const interactiveElements = document.querySelectorAll('.interactive-button, .interactive-link, .interactive-video, .interactive-dropdown');
    const dashboard = document.getElementById('dashboard');

    interactiveElements.forEach(element => {
        element.addEventListener('click', () => {
            if (isSelectionMode) {
                markElementForTracking(element);
            }
            simulateEvent(element);
            updateDashboard(dashboard);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 's' || event.key === 'S') {
            toggleSelectionMode();
        }
    });
});

function toggleSelectionMode() {
    isSelectionMode = !isSelectionMode;

    if (!isSelectionMode) {
        // Clear the selection
        selectedElements.forEach(element => {
            element.style.borderColor = "transparent";
        });
        selectedElements = [];
    }
}

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

function updateDashboard(dashboard) {
    dashboard.innerHTML = '<h2>Selected Elements Dashboard</h2>';
    for (const [elementText, count] of Object.entries(interactionCounts)) {
        const listItem = document.createElement('div');
        listItem.textContent = `${elementText}: ${count} interaction(s)`;
        dashboard.appendChild(listItem);
    }
}
