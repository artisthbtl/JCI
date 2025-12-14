async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const content = await response.text();
            document.getElementById(elementId).innerHTML = content;
        } else {
            console.error(`Error loading ${filePath}: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error loading component: ${error}`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar-placeholder", "navbar.html");
});