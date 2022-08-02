const addToCartButtonElement = document.querySelector('#product-details button');
const cartBadgeElement = document.querySelector('.nav-items .badge');

async function addToCart(event) {
    const productId = event.target.dataset.productid;
    const csrfToken = event.target.dataset.csrf;

    let response;

    try {
        response = await fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({ // Js object to json
                productId: productId,
                _csrf: csrfToken
            }),  
            headers: {'Content-Type': 'application/json'}
        }); 
    } catch (error) {
        alert('Something went wrong!');
        return;
    }
    

    if (!response.ok) {
        alert('Something went wrong!');
        return;
    }

    const responseData = await response.json();

    const newTotalQuantity = responseData.newTotalItems;

    cartBadgeElement.textContent = newTotalQuantity;
}


addToCartButtonElement.addEventListener('click', addToCart);