
function toggleForms() {
    const signupBox = document.getElementById('signup-box');
    const loginBox = document.getElementById('login-box');

    // Toggle the hidden class
    signupBox.classList.toggle('hidden');
    loginBox.classList.toggle('hidden');

    // Re-trigger the slideDown animation for the newly shown box
    const activeBox = signupBox.classList.contains('hidden') ? loginBox : signupBox;
    activeBox.style.animation = 'none';
    activeBox.offsetHeight; /* Trigger a reflow to restart animation */
    activeBox.style.animation = null; 
}

// Add this to your signup page script
document.querySelector('.submit-btn').addEventListener('click', function() {
    const nameInput = document.querySelector('input[name="username"]').value;
    if(nameInput) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', nameInput);
    }
});
