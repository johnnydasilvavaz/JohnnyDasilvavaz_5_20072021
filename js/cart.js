let cartList = [];
const cartIcon = document.querySelector('.header__cart');
let pin = document.createElement('div');
pin.setAttribute('class', 'header__pin');
pin.style.display = 'none';
cartIcon.appendChild(pin);
getCartList();

function addToCart(teddie, color, nbr) {
    if (getLocalStorage('oriteddies')) {
        getCartList();
    }
    cartList.push({name: teddie, color: color, qty: nbr});
    addToLocalStorage(cartList);
    pin.style.display = 'block';
    console.log(cartList);
}

function removeFromCart(id) {
    getCartList();
    if (cartList.length > 0) {
        cartList.splice(id, 1);
        addToLocalStorage(cartList);
        getCartList();
    }
    if (cartList.length == 0) {
        pin.style.display = 'none';
    }
}

function emptyCart(element) {
    getCartList();
    pin.style.display = 'none';
    if (cartList.length > 0) {
        cartList.length = 0;
        addToLocalStorage(cartList);
        element.innerHTML = "";
    }
}

function getCartList() {
    cartList = JSON.parse(getLocalStorage('oriteddies'));
    if (cartList.length > 0) {
        pin.style.display = 'block';
    } else {
        pin.style.display = 'none';
    }
}