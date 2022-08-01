const deleteProductBtnElements = document.querySelectorAll('.product-item button');

async function deleteProduct(event) {
    const buttonElement = event.target;
    const productId = buttonElement.dataset.productid;
    const csrfToken = buttonElement.dataset.csrf;

    // Send a DELETE req with fetch() function to the server:
    const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
        method: 'DELETE'
    });

    if (!response.ok) {
        alert('Something went wrong!');
        return;
    }

    // Now update the DOM as the response is ok:
    buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteProductBtnElement of deleteProductBtnElements) {
    deleteProductBtnElement.addEventListener('click', deleteProduct);
}