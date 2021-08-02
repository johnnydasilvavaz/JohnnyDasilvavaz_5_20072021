let cartList = {};
const cartIcon = document.querySelector('.header__cart');
let pin = document.createElement('div');
pin.setAttribute('class', 'header__pin');
pin.style.display = 'none';
cartIcon.appendChild(pin);
getCartList();

function addToCart(id, color, nbr) {
    if (getLocalStorage('oriteddies')) {
        getCartList();
    }

    if (cartList[id]) {
        for (let i in cartList[id]) {
            if (testElement(cartList[id][i], color)) {
                cartList[id][i].qty += nbr;
                addToLocalStorage(cartList);
                return;
            }
        }
        cartList[id].push({color: color, qty: nbr});
        addToLocalStorage(cartList);
    } else {
        cartList[id] = [{color: color, qty: nbr}];
        //cartList.[id] = [{color: color, qty: nbr}];
        addToLocalStorage(cartList);
    }
    
    pin.style.display = 'block';
    console.log(cartList);
}

function testElement(source, element) {
    if (source.color == element) {
        return true;
    }
    return false;
}

function removeFromCart(id, color) {
    getCartList();
    if (Object.keys(cartList).length != 0) {
        console.log(cartList[id]);
        cartList[id].splice(color, 1);
        if (cartList[id].length == 0) {
            delete cartList[id];
        }
        console.log(cartList);
        addToLocalStorage(cartList);
        getCartList();
    }
    if (Object.keys(cartList).length == 0) {
        pin.style.display = 'none';
    }
}

function emptyCart(element) {
    getCartList();
    pin.style.display = 'none';
    if (Object.keys(cartList).length != 0) {
        cartList = {};
        clearLocalStorage();
        element.innerHTML = "";
    }
}

function getCartList() {
    if (getLocalStorage('oriteddies')) {
        cartList = JSON.parse(getLocalStorage('oriteddies'));
        if (Object.keys(cartList).length != 0) {
            pin.style.display = 'block';
        } else {
            pin.style.display = 'none';
        }
    } else {
        pin.style.display = 'none';
    }
}