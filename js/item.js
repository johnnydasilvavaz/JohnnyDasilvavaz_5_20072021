const title = document.title;
const content =  document.querySelector('.pagecontent');
const teddies = getTeddies().then((result) => createPage(result));
let totalPrice;

function createPage(list) {
    for (let teddie in list) {
        //condition to select the teddie's name wich is the same as the title of the page
        if (list[teddie].name == title){
            //img part
            let hero = document.createElement('div');
            hero.setAttribute('class', 'hero');
            content.appendChild(hero);
            let imgcontainer = document.createElement('div');
            imgcontainer.setAttribute('class', 'imgcontainer');
            hero.appendChild(imgcontainer);
            let img = document.createElement('img');
            img.setAttribute('src', list[teddie].imageUrl);
            img.setAttribute('class', 'img');
            imgcontainer.appendChild(img);
            //content part
            let body = document.createElement('div');
            body.setAttribute('class', 'container');
            content.appendChild(body);
            let title = document.createElement('h2');
            title.setAttribute('class', 'title');
            title.textContent = list[teddie].name;
            body.appendChild(title);
            let desc = document.createElement('p');
            desc.textContent = list[teddie].description;
            desc.setAttribute('class', 'desc');
            body.appendChild(desc);
            let price = document.createElement('p');
            price.textContent = list[teddie].price + " €";
            price.setAttribute('class', 'price');
            body.appendChild(price);
            //form part
            let buy = document.createElement('div');
            buy.setAttribute('class', 'buy');
            content.appendChild(buy);
            let buyTitle = document.createElement('h3');
            buyTitle.innerText = "Acheter";
            buy.appendChild(buyTitle);
            let buyForm = document.createElement('form');
            buyForm.setAttribute('class', 'buy__form');
            buy.appendChild(buyForm);
            //color selector
            let spanColor = document.createElement('span');
            buyForm.appendChild(spanColor);
            let labelSelect = document.createElement('label');
            labelSelect.setAttribute('for', 'select-color');
            labelSelect.innerText = "Couleurs : ";
            spanColor.appendChild(labelSelect);
            let selectColor = document.createElement('select');
            selectColor.setAttribute('id', 'select-color');
            selectColor.setAttribute('class', 'input');
            spanColor.appendChild(selectColor);
            //for loop to populate the color selector
            for (let color in list[teddie].colors) {
                let e = document.createElement('option');
                e.setAttribute('value', list[teddie].colors[color]);
                e.innerText = list[teddie].colors[color];
                selectColor.appendChild(e);
            }
            //quantity selector
            let spanQty = document.createElement('span');
            buyForm.appendChild(spanQty);
            let labelQty = document.createElement('label');
            labelQty.setAttribute('for', 'select-qty');
            labelQty.innerText = "Quantité : ";
            spanQty.appendChild(labelQty);
            let selectQty = document.createElement('input');
            selectQty.setAttribute('id', 'select-qty');
            selectQty.setAttribute('class', 'input');
            selectQty.setAttribute('type', 'number');
            selectQty.setAttribute('value', 1);
            selectQty.setAttribute('size', 3);
            selectQty.setAttribute('min', 1);
            selectQty.setAttribute('max', 99);
            spanQty.appendChild(selectQty);
            let total = document.createElement('p');
            totalPrice = list[teddie].price;
            total.innerText = " = " + totalPrice + " €";
            spanQty.appendChild(total);
            // add eventlistener to update the total price when changing quantity
            selectQty.addEventListener('change', (event) => {
                totalPrice = list[teddie].price * event.target.value;
                total.innerText = " = " + totalPrice + " €";
            });
            //add to cart button
            let addCart = document.createElement('button');
            addCart.setAttribute('type', 'button');
            addCart.setAttribute('class', 'btn');
            addCart.addEventListener('click', () => {addToCart(list[teddie].name, selectColor.value, selectQty.value)});
            addCart.innerText = "Ajouter au panier ";
            addCart.innerHTML += '<i class="fas fa-cart-arrow-down"></i>';
            buyForm.appendChild(addCart);
        }
    }
}