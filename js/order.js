let cartList = [];
const teddies = getTeddies().then((result) => createPage(result));
const container = document.querySelector('.container');

function checkCart() {
    if (getLocalStorage('oriteddies')) {
        cartList = JSON.parse(getLocalStorage('oriteddies'));
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
        for (let ted in cartList){
            console.log(ted);
            for (let teddie in list) {
                if (list[teddie].name == cartList[ted].name) {
                    let line = document.createElement('div');
                    line.setAttribute('class', 'line');
                    container.appendChild(line);
                    let lineImg = document.createElement('img');
                    lineImg.setAttribute('class', 'line__img');
                    lineImg.setAttribute('src', list[teddie].imageUrl);
                    line.appendChild(lineImg);
                    let lineDesc = document.createElement('p');
                    lineDesc.innerText = cartList[ted].name + " " + cartList[ted].color + " ";
                    line.appendChild(lineDesc);

                }
            }
        }
        let emptyAll = document.createElement('a');
        emptyAll.innerText = "Vider le panier";
        emptyAll.setAttribute('href', './order.html');
        emptyAll.setAttribute('onclick', "emptyCart()")
        container.appendChild(emptyAll);
    } else {
        let emptyMsg = document.createElement('p');
        emptyMsg.innerText = "Votre panier est vide";
        container.appendChild(emptyMsg);
        let shopButton = document.createElement('button');
        shopButton.setAttribute('type', 'button');
        shopButton.setAttribute('class', 'btn');
        shopButton.innerText = 'retourner à la boutique';
        container.appendChild(shopButton);
    }
}