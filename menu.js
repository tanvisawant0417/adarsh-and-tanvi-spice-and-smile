// --- 1. CORE CART LOGIC ---
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('spiceCart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countDisplay = document.getElementById('cart-count');
    if (countDisplay) countDisplay.innerText = totalItems;
}

function setupMenuButtons() {
    const cards = document.querySelectorAll('.menu-card');
    let currentCart = JSON.parse(localStorage.getItem('spiceCart')) || [];

    cards.forEach(card => {
        const addBtn = card.querySelector('.add-btn');
        const qtyController = card.querySelector('.qty-controller');
        const qtyDisplay = card.querySelector('.qty-number');
        const name = card.querySelector('h3').innerText;
        
        if (!addBtn || !qtyController) return;

        const plusBtn = qtyController.querySelector('.plus');
        const minusBtn = qtyController.querySelector('.minus');
        const price = parseInt(card.querySelector('.price').innerText.replace('₹', ''));
        const image = card.querySelector('img').getAttribute('src');

        // Restore UI state from localStorage so cards don't reset on refresh
        const existingItem = currentCart.find(item => item.name === name);
        if (existingItem) {
            card.classList.add('item-added');
            addBtn.style.display = 'none';
            qtyController.style.display = 'flex';
            qtyDisplay.innerText = existingItem.quantity;
        }

        const updateStorage = (newQty) => {
            let cart = JSON.parse(localStorage.getItem('spiceCart')) || [];
            const itemIndex = cart.findIndex(item => item.name === name);

            if (newQty > 0) {
                if (itemIndex > -1) {
                    cart[itemIndex].quantity = newQty;
                } else {
                    cart.push({ name, price, image, quantity: newQty });
                }
            } else {
                if (itemIndex > -1) cart.splice(itemIndex, 1);
                card.classList.remove('item-added');
                qtyController.style.display = 'none';
                addBtn.style.display = 'block';
            }
            localStorage.setItem('spiceCart', JSON.stringify(cart));
            updateCartCount();
        };

        addBtn.onclick = (e) => {
            e.stopPropagation();
            card.classList.add('item-added');
            addBtn.style.display = 'none';
            qtyController.style.display = 'flex';
            qtyDisplay.innerText = "1";
            updateStorage(1);
        };

        plusBtn.onclick = (e) => {
            e.stopPropagation();
            let qty = parseInt(qtyDisplay.innerText) + 1;
            qtyDisplay.innerText = qty;
            updateStorage(qty);
        };

        minusBtn.onclick = (e) => {
            e.stopPropagation();
            let qty = parseInt(qtyDisplay.innerText) - 1;
            qtyDisplay.innerText = qty;
            updateStorage(qty);
        };
    });
}

// --- 2. LOCATION LOGIC ---
function checkOther(val) {
    if (val === "Other") {
        document.getElementById('citySelect').style.display = 'none';
        const manual = document.getElementById('manualCity');
        manual.style.display = 'inline-block';
        manual.focus();
    }
}

function handleEnter(event) {
    if (event.key === "Enter") {
        const val = document.getElementById('manualCity').value;
        if (val) {
            const disp = document.getElementById('displayCity');
            disp.innerText = "📍 " + val;
            disp.style.display = 'inline';
            document.getElementById('manualCity').style.display = 'none';
        }
    }
}

function resetLocation() {
    const disp = document.getElementById('displayCity');
    const select = document.getElementById('citySelect');
    if(disp) disp.style.display = 'none';
    if(select) {
        select.style.display = 'inline';
        select.value = "";
    }
}

// --- 3. INITIALIZATION & SCROLL REVEAL ---
window.addEventListener('load', () => {
    setupMenuButtons();
    updateCartCount();
    
    // Watch both cards AND the footer for the "show" class
    const revealElements = document.querySelectorAll('.menu-card, .main-footer');

    // threshold 0.15 is ideal for mobile to trigger the animation reliably
    const observerOptions = {
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); 
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        scrollObserver.observe(el);
    });
});