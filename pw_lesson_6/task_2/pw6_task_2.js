let basket = document.querySelector('.basket');

let product = {
    'art1': {
        'name': 'Вода',
        'cost': 354,
    },
    'art2': {
        'name': 'Еда',
        'cost': 765,
    },
    'art3': {
        'name': 'Дом',
        'cost': 7635,
    },
    'art4': {
        'name': 'Сон',
        'cost': 1000,
    }
};

let container = document.getElementById('cont');
let purchasedProductTitle = document.querySelector('.allProduct');
for (let key in product) {
    let products = document.createElement('div');
    products.classList = 'product';
    let title = document.createElement('div');
    title.classList = 'title';
    let cost = document.createElement('div');
    cost.classList = 'cost';
    let but = document.createElement('button');
    but.classList = 'allButton';
    but.textContent = 'Купить';

    title.innerHTML = product[key].name;
    cost.innerHTML = product[key].cost;
    products.append(title);
    products.append(cost);
    products.append(but);
    console.log(products);
    purchasedProductTitle.append(products);

}

container.appendChild(purchasedProductTitle);


let allProduct = document.querySelectorAll('.product .allButton');
for (p of allProduct) {
    p.onclick = f;
}
let total_pricess = document.querySelectorAll('.product .cost');
let r = 0;
for (i = 0; i < total_pricess.length; i++) {
    r += Number(total_pricess[i].innerHTML)
}
let summ = document.querySelector('.summ');
function f() {

    let item_prod = this.parentElement.cloneNode(true);

    basket.appendChild(item_prod);
    let rem_but = document.querySelector('.basket .allButton');
    rem_but.remove();

    let total_prices = document.querySelectorAll('.cost');
    let total_price = 0;

    for (j = 0; j < total_prices.length; j++) {
        total_price += Number(total_prices[j].innerHTML);
    }
    summ.innerHTML = 'ОБЩАЯ СТОИМОСТЬ ' + (total_price - r);

}
