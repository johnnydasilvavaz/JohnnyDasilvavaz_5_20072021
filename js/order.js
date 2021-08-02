const teddies = getTeddies().then((result) => storeAPI(result));
const container = document.querySelector('.container');
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/;
const addressRegex = /^[a-zA-Zéèàùê0-9 ',.-]{3,}$/;
const nameRegex = /^[a-zA-Zéèàùê '.-]{2,}$/;
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");
let totalPrice;
let teddiesAPI = [];
function storeAPI(result) {
    teddiesAPI = result;
    createPage(teddiesAPI);
}
const emptyMsg = document.querySelector('#emptyMsg');
const shopButton = document.querySelector('#mainBtn');
shopButton.addEventListener('click', () => window.location = '../index.html');
const buyForm = document.querySelector('#buy');
const buyButton = document.querySelector('#buy_btn');
buyButton.addEventListener('click', () => checkForm());
emptyMsg.style.display = 'none';
buyForm.style.display = 'none';

function checkCart() {
    if (getLocalStorage('oriteddies')) {
        getCartList();
        console.log('ok');
        if (Object.keys(cartList).length != 0) {
            buyForm.style.display = 'flex';
            console.log(cartList);
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function createPage(apiList) {
    if (checkCart()) {
        console.log('checkcart passed');
        let lines = document.createElement('div');
        lines.setAttribute('class', 'order');
        container.appendChild(lines);
        //boucle recherche d'id dans cartList
        for (let idCart of Object.keys(cartList)){
            console.log("idcart" + idCart);
            //boucle recherche d'array dans l'id
            for (let idArray in cartList[idCart]) {
                console.log(cartList[idCart]);
                //boucle de recherche de teddie dans l'api
                for (let apiItem in apiList) {
                    console.log("apiItem" + apiItem);
                    //vérifie si l'id dans le panier = l'id dans l'API et créer les lignes si c'est vrai
                    if (idCart == apiList[apiItem]._id) {
                        let line = document.createElement('div');
                        line.setAttribute('class', 'order__line');
                        lines.appendChild(line);
                        let lineImg = document.createElement('img');
                        lineImg.setAttribute('class', 'order__img');
                        lineImg.setAttribute('src', apiList[apiItem].imageUrl);
                        line.appendChild(lineImg);
                        let lineDesc = document.createElement('p');
                        lineDesc.innerText = apiList[apiItem].name + " (" + cartList[apiList[apiItem]._id][idArray].color + ")";
                        line.appendChild(lineDesc);
                        let lineNbr = document.createElement('input');
                        lineNbr.setAttribute('id', 'select-qty');
                        lineNbr.setAttribute('class', 'input');
                        lineNbr.setAttribute('type', 'number');
                        lineNbr.setAttribute('value', cartList[apiList[apiItem]._id][idArray].qty);
                        lineNbr.setAttribute('size', 3);
                        lineNbr.setAttribute('min', 1);
                        lineNbr.setAttribute('max', 99);
                        line.appendChild(lineNbr);
                        let linePrice = document.createElement('p');
                        totalPrice = apiList[apiItem].price * cartList[apiList[apiItem]._id][idArray].qty;
                        linePrice.innerText = " = " + totalPrice + " €";
                        line.appendChild(linePrice);
                        lineNbr.addEventListener('change', (event) => {
                            totalPrice = apiList[apiItem].price * event.target.value;
                            linePrice.innerText = " = " + totalPrice + " €";
                        });
                        let lineBtn = document.createElement('button');
                        lineBtn.setAttribute('type', 'button');
                        lineBtn.setAttribute('class', 'btn');
                        lineBtn.innerText = 'X';
                        console.log(cartList[apiList[apiItem]._id][idArray]);
                        lineBtn.addEventListener('click', () => removeCartElement(apiList[apiItem]._id, lines, idArray));
                        line.appendChild(lineBtn);
                    }
                }
            }
        }
        let emptyAll = document.createElement('a');
        emptyAll.innerText = "Vider le panier";
        emptyAll.setAttribute('class', 'order__link');
        emptyAll.setAttribute('href', '#');
        emptyAll.addEventListener('click', () => emptyCartElements(lines, emptyAll, true));
        container.appendChild(emptyAll);
    } else {
        cartEmptyMsg();
    }
}

function emptyCartElements(element, msg, all) {
    if (all) {
        emptyCart(element);
        cartEmptyMsg();
    }
    msg.remove();
}

function removeCartElement(element, lines, color) {
    removeFromCart(element, color);
    lines.innerHTML = '';
    lines.remove();
    document.querySelector('.order__link').remove();
    getCartList();
    console.log(Object.keys(cartList).length);
    if (Object.keys(cartList).length == 0) {
        cartEmptyMsg();
    } else {
        createPage(teddiesAPI);
    }
}

function cartEmptyMsg() {
    emptyMsg.style.display = 'flex';
    buyForm.style.display = 'none';
}

function checkEmail(mail) {
    if (emailRegex.test(mail.value)) {
        mail.className = 'input';
        return true;
    } else {
        mail.className = 'input input--invalid';
        return false;
    }
}

function checkAddress(address) {
    if (addressRegex.test(address.value)) {
        address.className = 'input';
        return true;
    } else {
        address.className = 'input input--invalid';
        return false;
    }
}

function checkName(name) {
    if (nameRegex.test(name.value)) {
        name.className = 'input';
        return true;
    } else {
        name.className = 'input input--invalid';
        return false;
    }
}

function checkForm() {
    if (checkName(firstName) && checkName(lastName) && checkAddress(address) && checkName(city) && checkEmail(email)) {
        sendOrder();
    } else {
        return false;
    }
}

function sendOrder() {
    let idList = [];
    let order = {};
    for (idCart of Object.keys(cartList)) {
        idList.push(idCart);
    }
    if (checkForm) {
        order = {"contact": {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            address: address.value,
            city: city.value
        },
    "products": idList}
    console.log(JSON.stringify(order));
    const postResult = fetchPost('http://localhost:3000/api/teddies/order', order).then((result) => orderPage(result));
    }
}

function orderPage(result) {
    let orderId;
    console.log(result);
    for (idKey in result) {
        console.log(idKey);
        if (idKey == "orderId") {
            orderId = result[idKey];
        }
    }
    console.log(orderId);
    window.location = "./order.html?id=" + orderId;
}