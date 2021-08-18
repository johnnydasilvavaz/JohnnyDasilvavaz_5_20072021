let cartList = {};
const pin = document.querySelector('.header__pin');
showPin('none');
getCartList();

//get data from API
async function fetchUrl(url) {
    try {
        return await fetch(url).then((response) => response.json());
    } catch (error) {
        console.error(error);
    }
}

//send data to API
async function postUrl(url, body) {
    try {
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'}
        }).then((response) => response.json());
    } catch (error) {
        console.error(error);
    }
}

function addToLocalStorage(data) {
    try {
        localStorage.setItem('oriteddies', JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
}

function getLocalStorage(data) {
    try {
        return localStorage.getItem(data);
    } catch (error) {
        console.error(error);
    }
}

function clearLocalStorage() {
    localStorage.clear();
}

function addToCart(id, color, nbr) {
    if (getLocalStorage('oriteddies')) {
        getCartList();
    }
    //test if id is already in the localStorage
    if (cartList[id]) {
        for (let i in cartList[id]) {
            if (cartList[id][i].color == color) {
                cartList[id][i].qty += nbr;
                addToLocalStorage(cartList);
                return;
            }
        }
        cartList[id].push({color: color, qty: nbr});
        addToLocalStorage(cartList);
    } else {
        cartList[id] = [{color: color, qty: nbr}];
        addToLocalStorage(cartList);
    }
    showPin('block');
}

function removeFromCart(id, color) {
    getCartList();
    if (Object.keys(cartList).length != 0) {
        cartList[id].splice(color, 1);
        if (cartList[id].length == 0) {
            delete cartList[id];
        }
        addToLocalStorage(cartList);
        getCartList();
    }
    if (Object.keys(cartList).length == 0) {
        showPin('none');
    }
}

function emptyCart(element) {
    getCartList();
    showPin('none');
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
            showPin('block');
        } else {
            showPin('none');
        }
    } else {
        showPin('none');
    }
}

function showPin(value) {
    pin.style.display = value;
}