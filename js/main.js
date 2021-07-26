let content = document.querySelector(".content");

function createCards(list) {
    for (let teddie in list) {
        let card = document.createElement('div');
        card.setAttribute('class', 'maincard');
        content.appendChild(card);
        let link = document.createElement('a');
        link.setAttribute('class', 'maincard__link');
        link.setAttribute('href', './pages/' + list[teddie].name + '.html');
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

getTeddies().then((result) => createCards(result));