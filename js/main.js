let content = document.querySelector(".content");

function createCards() {
    for (let teddie in teddies) {
        let card = document.createElement('div');
        card.setAttribute('class', 'maincard');
        content.appendChild(card);
        let imgdiv = document.createElement('div');
        imgdiv.setAttribute('class', 'maincard__imgdiv');
        card.appendChild(imgdiv);
        let img = document.createElement('img');
        img.setAttribute('src', teddies[teddie].imageUrl);
        img.setAttribute('class', 'maincard__img');
        console.log(teddies[teddie].imageUrl);
        imgdiv.appendChild(img);
        let body = document.createElement('div');
        body.setAttribute('class', 'maincard__body');
        card.appendChild(body);
        let title = document.createElement('h2');
        title.textContent = teddies[teddie].name;
        body.appendChild(title);
        let desc = document.createElement('p');
        desc.setAttribute('class', 'maincard__desc');
        desc.textContent = teddies[teddie].description;
        body.appendChild(desc);
        let price = document.createElement('p');
        price.setAttribute('class', 'maincard__price');
        price.textContent = teddies[teddie].price + " €";
        body.appendChild(price);
    }
}

async function getTeddies() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies");
        let ted = await response.json();
        console.log(ted);
        teddies = ted;
        createCards();
        return ted;
    } catch (error) {
        alert(error);
    }
}

let teddies;
getTeddies();