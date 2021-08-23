let lst = [2, 3, 4, 5, 87, 43, 22, 5];
let summ = 0;
function countBasketPrice(arr) {
    for (let elem of arr) {
        summ += elem;
    }
    return summ
}
document.write('Сумма продуктовой корзины = ' + countBasketPrice(lst));
