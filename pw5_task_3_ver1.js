let product = ['Eggs', 'Bread', 'Oil', 'Potato', 'Milk', 'Salat'];
let catalog = document.querySelector(".catalog");
for (elem in product) {
    let divine = document.createElement('DIV');
    divine.textContent = product[elem];
    catalog.appendChild(divine);
}
//Версия без привязки к старой программе
