const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product');
const content =  document.querySelector('.pagecontent');
const modal = document.querySelector('#modal');
const btnContinue = document.querySelector('#btn-continue');
btnContinue.addEventListener('click', () => switchModal(modal));
const btnCart = document.querySelector('#btn-cart');
btnCart.addEventListener('click', () => gotoUrl('./cart.html'));
modal.style.display = 'none';
const teddie = fetchUrl("http://localhost:3000/api/teddies/" + product).then((result) => createPage(result));
let totalPrice;

function switchModal(modal) {
    if (modal.style.display == 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}

function gotoUrl(url) {
    window.location.href = url;
}

function createPage(element) {
    //img part
    let img = document.querySelector('#img_teddie');
    img.setAttribute('src', element.imageUrl);
    //content part
    let title = document.querySelector('#name_teddie');
    title.textContent = element.name;
    let desc = document.querySelector('#desc_teddie');
    desc.textContent = element.description;
    let price = document.querySelector('#price_teddie');
    price.textContent = element.price + " €";
    //color selector
    let selectColor = document.querySelector('#select-color');
    //for loop to populate the color selector
    for (let color in element.colors) {
        let e = document.createElement('option');
        e.setAttribute('value', element.colors[color]);
        e.innerText = element.colors[color];
        selectColor.appendChild(e);
    }
    //quantity selector
    let selectQty = document.querySelector('#select-qty');
    let total = document.querySelector('#buy_price');
    totalPrice = element.price;
    total.innerText = " = " + totalPrice + " €";
    // add eventlistener to update the total price when changing quantity
    selectQty.addEventListener('change', (event) => {
        totalPrice = element.price * event.target.value;
        total.innerText = " = " + totalPrice + " €";
    });
    //add to cart button
    let addCart = document.querySelector('#add_btn');
    addCart.addEventListener('click', () => {addToCart(element._id, selectColor.value, parseInt(selectQty.value, 10)), switchModal(modal)});
}