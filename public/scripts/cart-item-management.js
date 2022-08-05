const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management')
const cartTotalPriceElement = document.getElementById('cart-total-price');
// cart-badge for both mobile and desktop header
const cartBadges= document.querySelectorAll('.nav-items .badge');
const buyProductsBtnElement = document.getElementById('place-order-btn');
const btnFormElement = document.getElementById('btn-form');

async function updateCartItem(event) {
    event.preventDefault();

    const form = event.target;

    const productId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
    const isAuth = form.dataset.isauth;
    const quantity = form.firstElementChild.value;

    let response;

    try {
        response = await fetch('/cart/items', {
            method: 'PATCH',
            body: JSON.stringify({
                productId: productId,
                quantity: quantity,
                _csrf: csrfToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        alert('Something went wromg!');
        return;
    }

    if (!response.ok) {
        alert('Something went wromg!');
        return;
    }

    const responseData = await response.json();

    if (responseData.updatedCartData.updatedItemPrice === 0) {
        form.parentElement.parentElement.remove();
    }else {
        const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price');
        cartItemTotalPriceElement.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);
    }

    cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

    if (isAuth && !responseData.updatedCartData.newTotalPrice > 0) {
        buyProductsBtnElement.style.display = 'none';
        addItemBtnElement = document.createElement('a');
        addItemBtnElement.textContent = 'Add items';
        addItemBtnElement.classList.add('btn');
        addItemBtnElement.classList.add('btn-alt');
        addItemBtnElement.setAttribute('href', '/');
        btnFormElement.appendChild(addItemBtnElement);
    }

    for (const cartBadge of cartBadges) {
        cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
    }
}

for (const formElement of cartItemUpdateFormElements) {
    formElement.addEventListener('submit', updateCartItem);
}