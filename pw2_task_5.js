function summ(a_1, a_2) {
    return a_1 + a_2;
}
function subs(a_1, a_2) {
    return a_1 - a_2;
}
function mult(a_1, a_2) {
    return a_1 * a_2;
}
function devision(a_1, a_2) {
    return a_1 / a_2;
}
num_1 = +prompt('Ввод для задачи 5: Введите 1 число: ');
num_2 = +prompt('Введите 2 число: ');
document.write('Вызов функции "сумма": ' + summ(num_1, num_2) + '  ');
document.write('Вызов функции "разность": ' + subs(num_1, num_2) + '  ');
document.write('Вызов функции "произведение": ' + mult(num_1, num_2) + '  ');
document.write('Вызов функции "деление": ' + devision(num_1, num_2));
