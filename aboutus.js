/* --- 1. TOGGLE CONTENT LOGIC --- */
function toggleContent(id, btn) {
    var content = document.getElementById(id);
    
    // Toggle the 'is-open' class (handles max-height and opacity in CSS)
    content.classList.toggle("is-open");

    // Change the button text based on the state
    if (content.classList.contains("is-open")) {
        btn.innerHTML = "Read Less";
    } else {
        btn.innerHTML = "Read More";
    }
}

