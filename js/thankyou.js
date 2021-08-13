clearLocalStorage();
showPin('none');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const price = urlParams.get('price');
const msg = document.querySelector('#msgOrder');
const homeBtn = document.querySelector('#homeBtn');
homeBtn.addEventListener('click', () => window.location.href = "../index.html");

msg.innerText = "Merci pour votre achat d'un montant de " + price + ", votre numéro de commande est le : " + id;