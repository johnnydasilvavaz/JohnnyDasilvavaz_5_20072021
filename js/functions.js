async function fetchUrl(url) {
    try {
        return await fetch(url).then((response) => response.json());
    } catch (error) {
        console.log(error);
    }
}

async function getTeddies() {
    try {
        return await fetchUrl("http://localhost:3000/api/teddies");
    } catch (error) {
        console.log(error);
    }
}

function addToLocalStorage(data) {
    try {
        window.localStorage.setItem('oriteddies', JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

function getLocalStorage(data) {
    try {
        return localStorage.getItem(data);
    } catch (error) {
        console.log(error);
    }
}

function removeFromLocalStorage(data) {
    try {
        
    } catch (error) {
        console.log(error);
    }
}