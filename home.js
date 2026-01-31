// --- 1. INITIALIZATION & COUPON LOGIC ---

document.addEventListener('DOMContentLoaded', function() {
    // 1. Update UI based on what's already in the cart
    updateCartCount();
    renderAllButtons();

    // 2. Handle Coupon Popup
    const isReturningUser = localStorage.getItem('couponShown');

    if (!isReturningUser) {
        setTimeout(function() {
            const overlay = document.getElementById('coupon-overlay');
            if (overlay) {
                overlay.style.display = 'flex';
                // Confetti trigger when popup appears
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    zIndex: 100001 // CHANGED: Must be higher than 99999 (the overlay)
                });
            }
        }, 1500); // Slight delay for better feel
    }
});

function applyDiscount() {
    const emailInput = document.getElementById('subscriber-email');
    const couponContent = document.querySelector('.coupon-content');

    if (emailInput && emailInput.value.trim() !== "" && emailInput.value.includes('@')) {
        localStorage.setItem('couponShown', 'true');
        localStorage.setItem('firstOrderDiscount', 'active');

        // Update popup content to show the code
        couponContent.innerHTML = `
            <h3 style="color:#f48225;">CONGRATULATIONS!</h3>
            <h1 style="margin: 15px 0;">CODE: <span style="background:#000; color:#fff; padding:5px 15px; border-radius:8px;">SPICE20</span></h1>
            <p style="color: #555; margin-bottom: 20px;">20% OFF has been applied to your future order!</p>
            <button class="unlock-btn" onclick="closePopup()" style="width:100%;">START ORDERING</button>
        `;

        // Extra celebratory confetti
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            zIndex: 100001 // CHANGED: Must be higher than 99999
        });
    } else {
        alert("Please enter a valid email address to unlock your discount!");
    }
}

function closePopup() {
    localStorage.setItem('couponShown', 'true');
    const overlay = document.getElementById('coupon-overlay');
    if (overlay) overlay.style.display = 'none';
}

// --- 2. QUANTITY TOGGLE & CART LOGIC ---

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('spiceCart')) || [];
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem('spiceCart', JSON.stringify(cart));
    updateCartCount();
    renderAllButtons();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('spiceCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        cartCountElement.innerText = totalItems;
    }
}

function changeQty(name, delta) {
    let cart = JSON.parse(localStorage.getItem('spiceCart')) || [];
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += delta;

        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('spiceCart', JSON.stringify(cart));
    updateCartCount();
    renderAllButtons();
}

function renderAllButtons() {
    const cart = JSON.parse(localStorage.getItem('spiceCart')) || [];
    
    const items = [
        { id: 'ctrl-Dabeli', name: 'Classic Dabeli', price: 50, img: 'classic dabelli.png' },
        { id: 'ctrl-Cheese', name: 'Cheese Dabeli', price: 70, img: 'cheese dabelli.png' },
        { id: 'ctrl-Mango', name: 'Mango Juice', price: 60, img: 'mango juice.png' },
        { id: 'ctrl-Pineapple', name: 'Pineapple Juice', price: 60, img: 'pineapple juice (2).png' }
    ];

    items.forEach(item => {
        const container = document.getElementById(item.id);
        if (!container) {
            console.log("Could not find container:", item.id);
            return;
        }

        const cartItem = cart.find(c => c.name === item.name);

        if (cartItem) {
            container.innerHTML = `
                <div class="quantity-pill">
                    <button class="qty-btn" onclick="changeQty('${item.name}', -1)">−</button>
                    <span class="qty-number">${cartItem.quantity}</span>
                    <button class="qty-btn" onclick="changeQty('${item.name}', 1)">+</button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <button class="add-to-cart" onclick="addToCart('${item.name}', ${item.price}, '${item.img}')">Add to Cart</button>
            `;
        }
    });
}

// Add this line to the TOP of home.js temporarily:
localStorage.clear();

