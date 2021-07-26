function addToCart(teddie, color, nbr) {
    let cartList = [];
    if (getLocalStorage('oriteddies')) {
        cartList = JSON.parse(getLocalStorage('oriteddies'));
    }
    cartList.push({name: teddie, color: color, qty: nbr});
    addToLocalStorage(cartList);
    console.log(cartList);
}

function removeFromCart(id) {
    cartList = JSON.parse(getLocalStorage('oriteddies'));
    if (cartList.length > 0) {
        for (let ted in cartList) {
            if (ted == id) {
                cartList.splice(ted, 1);
                addToLocalStorage(cartList);
            }
        }
    }
}

function emptyCart() {
    cartList = JSON.parse(getLocalStorage('oriteddies'));
    if (cartList.length > 0) {
        cartList.length = 0;
        addToLocalStorage(cartList);
    }
}