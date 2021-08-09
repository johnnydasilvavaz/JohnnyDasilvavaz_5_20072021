//fetch data from api
const teddies = fetchUrl("http://localhost:3000/api/teddies").then((result) => storeAPI(result));
const container = document.querySelector('.container');
//regex
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/;
const addressRegex = /^[a-zA-Zéèàùê0-9 ',.-]{3,}$/;
const nameRegex = /^[a-zA-Zéèàùê '.-]{2,}$/;
let totalPrice;
let totalArray = [];
let cartPrice;
let teddiesAPI = [];
function storeAPI(result) {
    teddiesAPI = result;
    createPage(teddiesAPI);
}

//form
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");
const emptyMsg = document.querySelector('#emptyMsg');
const buyForm = document.querySelector('#buy');
const buyButton = document.querySelector('#buy_btn');
buyButton.addEventListener('click', () => checkForm());

const recap = document.querySelector('#recap');
const recapList = document.querySelector('#recapList')
const recapTotal = document.querySelector('#recapTotal');
const recapEmptyLink = document.querySelector('.order__link');
recapEmptyLink.addEventListener('click', () => {
    emptyCart(recapList);
    showCart(false);
});
//button back to home
const shopButton = document.querySelector('#mainBtn');
shopButton.addEventListener('click', () => window.location = '../index.html');
//hidding elements
recap.style.display = 'none';
emptyMsg.style.display = 'none';
buyForm.style.display = 'none';

function checkCart() {
    if (getLocalStorage('oriteddies')) {
        getCartList();
        if (Object.keys(cartList).length != 0) {
            showCart(true)
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
        totalArray = [];
        let lines = document.createElement('div');
        lines.setAttribute('class', 'order');
        recapList.appendChild(lines);
        //loop to search an id in cartList
        for (let idCart of Object.keys(cartList)){
            //loop to search arrays in cartList keys
            for (let idArray in cartList[idCart]) {
                //loop to search teddie in API
                for (let apiItem in apiList) {
                    //check if id in cart = id in API & create lines if true
                    if (idCart == apiList[apiItem]._id) {
                        let line = document.createElement('div');
                        line.setAttribute('class', 'order__line');
                        lines.appendChild(line);
                        let lineImg = document.createElement('img');
                        lineImg.setAttribute('class', 'order__img');
                        lineImg.setAttribute('src', apiList[apiItem].imageUrl);
                        line.appendChild(lineImg);
                        let lineDiv = document.createElement('div');
                        lineDiv.setAttribute('class', 'order__line__body');
                        line.appendChild(lineDiv);
                        let lineDesc = document.createElement('p');
                        lineDesc.innerText = apiList[apiItem].name + " (" + cartList[apiList[apiItem]._id][idArray].color + ")";
                        lineDiv.appendChild(lineDesc);
                        let lineNbr = document.createElement('input');
                        lineNbr.setAttribute('id', 'select-qty');
                        lineNbr.setAttribute('class', 'input');
                        lineNbr.setAttribute('type', 'number');
                        lineNbr.setAttribute('value', cartList[apiList[apiItem]._id][idArray].qty);
                        lineNbr.setAttribute('size', 3);
                        lineNbr.setAttribute('min', 1);
                        lineNbr.setAttribute('max', 99);
                        lineDiv.appendChild(lineNbr);
                        let linePrice = document.createElement('p');
                        totalPrice = apiList[apiItem].price * cartList[apiList[apiItem]._id][idArray].qty;
                        linePrice.innerText = " " + totalPrice + " €";
                        totalArray.push(linePrice);
                        lineDiv.appendChild(linePrice);
                        lineNbr.addEventListener('change', (event) => {
                            cartList[apiList[apiItem]._id][idArray].qty = event.target.value;
                            addToLocalStorage(cartList);
                            totalPrice = apiList[apiItem].price * event.target.value;
                            linePrice.innerText = " " + totalPrice + " €";
                            calcTotal();
                        });
                        let lineBtn = document.createElement('button');
                        lineBtn.setAttribute('type', 'button');
                        lineBtn.setAttribute('class', 'btn');
                        lineBtn.innerText = 'X';
                        lineBtn.addEventListener('click', () => removeCartElement(apiList[apiItem]._id, lines, idArray));
                        line.appendChild(lineBtn);
                    }
                }
            }
        }
        calcTotal();
    } else {
        showCart(false);
    }
}

function calcTotal() {
    let addition = 0;
    for (val in totalArray) {
        totalArray[val].innerText.replace(" €", "");
        addition += parseInt(totalArray[val].innerText);
    }
    recapTotal.innerText = addition + " €";
    return addition;
}

function removeCartElement(element, lines, color) {
    removeFromCart(element, color);
    lines.innerHTML = '';
    lines.remove();
    getCartList();
    if (Object.keys(cartList).length == 0) {
        showCart(false);
    } else {
        createPage(teddiesAPI);
    }
}

function showCart(value) {
    if (value) {
        emptyMsg.style.display = 'none';
        buyForm.style.display = 'flex';
        recap.style.display = 'flex';
    } else {
        emptyMsg.style.display = 'flex';
        buyForm.style.display = 'none';
        recap.style.display = 'none';
    }
}

function checkInput(type, input) {
    let reg;
    switch(type){
        case "email":
            reg = emailRegex;
            break;
        case "address":
            reg = addressRegex;
            break;
        case "name":
            reg = nameRegex;
            break;
    }
    if (reg.test(input.value)) {
        input.className = 'input';
        return true;
    } else {
        input.className = 'input input--invalid';
        return false;
    }
}

function checkForm() {
    if (checkInput("name", firstName) && checkInput("name", lastName) && checkInput("address", address) && checkInput("name", city) && checkInput("email", email)) {
        sendOrder();
    } else {
        checkInput("name", firstName);
        checkInput("name", lastName);
        checkInput("address", address);
        checkInput("name", city);
        checkInput("email", email);
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
    postUrl('http://localhost:3000/api/teddies/order', order).then((result) => orderPage(result));
    }
}

function orderPage(result) {
    let orderId;
    for (idKey in result) {
        if (idKey == "orderId") {
            orderId = result[idKey];
        }
    }
    window.location = "./confirmation.html?id=" + orderId + "&price=" + recapTotal.innerText;
}