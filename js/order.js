const teddies = getTeddies().then((result) => createPage(result));
const container = document.querySelector('.container');
let totalPrice;

function checkCart() {
    if (getLocalStorage('oriteddies')) {
        getCartList();
        if (cartList.length > 0) {
            console.log(cartList);
            return true;
        } else {
            return false;
        }
    }
}

function createPage(list) {
    if (checkCart()) {
        let lines = document.createElement('div');
        lines.setAttribute('class', 'order');
        container.appendChild(lines);
        for (let ted in cartList){
            for (let teddie in list) {
                if (list[teddie].name == cartList[ted].name) {
                    let line = document.createElement('div');
                    line.setAttribute('class', 'order__line');
                    lines.appendChild(line);
                    let lineImg = document.createElement('img');
                    lineImg.setAttribute('class', 'order__img');
                    lineImg.setAttribute('src', list[teddie].imageUrl);
                    line.appendChild(lineImg);
                    let lineDesc = document.createElement('p');
                    lineDesc.innerText = cartList[ted].name + " (" + cartList[ted].color + ")";
                    line.appendChild(lineDesc);
                    let lineNbr = document.createElement('input');
                    lineNbr.setAttribute('id', 'select-qty');
                    lineNbr.setAttribute('class', 'input');
                    lineNbr.setAttribute('type', 'number');
                    lineNbr.setAttribute('value', cartList[ted].qty);
                    lineNbr.setAttribute('size', 3);
                    lineNbr.setAttribute('min', 1);
                    lineNbr.setAttribute('max', 99);
                    line.appendChild(lineNbr);
                    let linePrice = document.createElement('p');
                    totalPrice = list[teddie].price * cartList[ted].qty;
                    linePrice.innerText = " = " + totalPrice + " €";
                    line.appendChild(linePrice);
                    lineNbr.addEventListener('change', (event) => {
                        totalPrice = list[teddie].price * event.target.value;
                        linePrice.innerText = " = " + totalPrice + " €";
                    });
                    let lineBtn = document.createElement('button');
                    lineBtn.setAttribute('type', 'button');
                    lineBtn.setAttribute('class', 'btn');
                    lineBtn.innerText = 'X';
                    lineBtn.addEventListener('click', () => removeCartElement(ted, line));
                    console.log(cartList[ted]);
                    line.appendChild(lineBtn);
                }
            }
        }
        let emptyAll = document.createElement('a');
        emptyAll.innerText = "Vider le panier";
        emptyAll.setAttribute('class', 'linkEmpty');
        emptyAll.setAttribute('href', '#');
        emptyAll.addEventListener('click', () => emptyCartElements(lines, emptyAll, true));
        //emptyAll.setAttribute('onclick', "emptyCart(lines)");
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

function removeCartElement(element, line) {
    removeFromCart(element);
    line.remove();
    getCartList();
    if (cartList.length == 0) {
        document.querySelector('.linkEmpty').remove();
        cartEmptyMsg();
    }
}

function cartEmptyMsg() {
    let emptyMsg = document.createElement('p');
    emptyMsg.innerText = "Votre panier est vide";
    container.appendChild(emptyMsg);
    let shopButton = document.createElement('button');
    shopButton.setAttribute('type', 'button');
    shopButton.setAttribute('class', 'btn');
    shopButton.innerText = 'retourner à la boutique';
    shopButton.addEventListener('click', () => window.location = '../index.html');
    container.appendChild(shopButton);
}