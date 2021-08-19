function degree(val, pow) {
    if (pow === 0) return 1;
    return val * degree(val, pow - 1);
}
val = +prompt('Ввод дла задачи 8: введите число: ');
pow = +prompt('Введите степень');
document.write('Task 8: ' + val + ' в степени ' + pow + ' = ' + degree(val, pow));
