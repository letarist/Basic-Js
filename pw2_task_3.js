let c = +prompt('Ввод для задачи 2. Введите 1 число: ');
let b = +prompt('Ввод для задачи 2. Введите 2 число: ');

if (c >= 0 & b >= 0) {
    document.write('Task 3: Разность 1 и 2 числа = ' + (c - b))
} else if (c < 0 & b < 0) {
    document.write('Task 3: Произведение 1 и 2 числа = ' + (c * b));
} else {
    document.write('Task 3: Сумма 1 и 2 числа = ' + (c + b));
}
