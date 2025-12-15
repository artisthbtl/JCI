document.addEventListener("DOMContentLoaded", () => {
    
    // Helper to add click listener safely
    function addClickListener(id, message) {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("click", () => {
                alert(message);
            });
        }
    }

    // Official App Buttons
    addClickListener("btn-playstore", "Redirecting to Google Play Store...");
    addClickListener("btn-appstore", "Redirecting to Apple App Store...");

    // Partner Buttons
    addClickListener("btn-tokopedia", "Opening Tokopedia Official Store...");
    addClickListener("btn-tiktok", "Opening TikTok Shop...");
    addClickListener("btn-amazon", "Opening Amazon Store...");

});