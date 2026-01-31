// 1. Function to handle payment selection UI
function selectPayment(type) {
    const online = document.getElementById('payOnline');
    const cash = document.getElementById('payCash');

    if (type === 'Online') {
        online.classList.add('active');
        cash.classList.remove('active');
    } else {
        cash.classList.add('active');
        online.classList.remove('active');
    }
}

// 2. Handle Form Submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page refresh

    // Scroll to top so the modal is perfectly visible on all screens
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Show the Success Modal
    const successModal = document.getElementById('orderSuccessModal');
    if (successModal) {
        successModal.style.display = 'flex';
    }

    // Clear the cart and the total so the user starts fresh next time
    localStorage.removeItem('spiceCart');
    localStorage.removeItem('cartTotal');
});

// 3. Button inside the Modal (Track Order)
function goToTracking() {
    // Generate a random Order ID (for future use or tracking pages)
    const orderID = "SS" + Math.floor(1000 + Math.random() * 9000);
    
    // For now, redirect to Home
    window.location.href = "index.html"; 
}

// 4. Initialize dynamic data on page load
window.onload = function() {
    // Look for the saved total we passed from cart.js
    const savedTotal = localStorage.getItem('cartTotal');
    const displayTotal = document.getElementById('final-amount');

    if (savedTotal && displayTotal) {
        displayTotal.innerText = "₹" + savedTotal;
    } else if (displayTotal) {
        // Fallback if the user went directly to checkout without the cart
        displayTotal.innerText = "₹0";
    }
};