let cards = document.querySelector(".cards");

function createCards(list) {
    for (let teddie in list) {
        let card = document.createElement('div');
        card.setAttribute('class', 'maincard');
        cards.appendChild(card);
        let link = document.createElement('a');
        link.setAttribute('class', 'maincard__link');
        link.setAttribute('href', './pages/product.html?product=' + list[teddie]._id);
        card.appendChild(link);
        let imgdiv = document.createElement('div');
        imgdiv.setAttribute('class', 'maincard__imgdiv');
        card.appendChild(imgdiv);
        let img = document.createElement('img');
        img.setAttribute('src', list[teddie].imageUrl);
        img.setAttribute('class', 'maincard__img');
        imgdiv.appendChild(img);
        let body = document.createElement('div');
        body.setAttribute('class', 'maincard__body');
        card.appendChild(body);
        let title = document.createElement('h2');
        title.textContent = list[teddie].name;
        body.appendChild(title);
        let desc = document.createElement('p');
        desc.setAttribute('class', 'maincard__desc');
        desc.textContent = list[teddie].description;
        body.appendChild(desc);
        let price = document.createElement('p');
        price.setAttribute('class', 'maincard__price');
        price.textContent = list[teddie].price + " €";
        body.appendChild(price);
    }
}

fetchUrl("http://localhost:3000/api/teddies").then((result) => createCards(result));