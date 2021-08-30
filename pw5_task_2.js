const main = document.querySelector('.basketCaseAll')
class BasketCase {
    name = [];
    price = [];
    constructor(...items) {
        for (let i = 0; i < items.length; i++) {
            if (i % 2 == 0) {
                this.name.push(items[i]);
            } else {
                this.price.push(items[i]);
            }
        }

    }

    fullSumm() {
        if (this.name.length == 0) {
            let answer = main.insertAdjacentHTML('beforeend',
                `<div class="basketCaseAll">
            <span> Корзина пуста
                </div>`);
            return answer;
        }
        let summ = 0;
        for (let i = 0; i < this.price.length; i++) {
            summ = summ + this.price[i];

        }
        let answer = main.insertAdjacentHTML('beforeend',
            `<div class="basketCaseAll">
            <span>В корзине ${this.name.length} товаров на сумму ${summ} $
                </div>`);
        return answer;

    }


}





p1 = new BasketCase('milk', 0.9, 'bacon', 2.45);//test #1
// p1 = new BasketCase(); //test #2
p1.fullSumm();
