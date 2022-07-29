const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');
const mobileMenuElement = document.getElementById('mobile-menu');


function toggleMobileMenu() {
    // `toggle` method toggles a certain CSS class - so it adds it if it does't exists yet and removes it if it exists
    mobileMenuElement.classList.toggle('open');
}

mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);