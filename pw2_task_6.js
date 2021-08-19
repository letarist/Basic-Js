function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case 'summary':
            return arg1 + arg2; //break не использую, потому что return возвращает значение и сразу выходит из функции
        case 'substract':
            return arg1 - arg2;
        case 'multiply':
            return arg1 * arg2;
        case 'devision':
            return arg1 / arg2;
    }
}
arg1 = +prompt('Ввод для задачи 6: Введите первый аргумент: ');
arg2 = +prompt('Введите второй аргумент: ');
operation = prompt('Введите название операции на английском: [summary,substract,multiply,devision] ');
document.write('Task 6: результат функции ' + operation + ' = ' + mathOperation(arg1, arg2, operation));
