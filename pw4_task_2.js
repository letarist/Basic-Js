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
        let summ = 0;
        for (let i = 0; i < this.price.length; i++) {
            summ = summ + this.price[i];
        }
        return `Общая сумма корзины = ${summ}`
    }
}

p1 = new BasketCase('milk', 1, 'bread', 0.5, 'salt', 0.33);

console.log(p1.fullSumm());
