
// Глобальные переменные:                            
var FIELD_SIZE_X = 20;//строки КОНСТАНТА
var FIELD_SIZE_Y = 20;//столбцы КОНСТАНТА
var SNAKE_SPEED = 200; // Интервал между перемещениями змейки КОНСТАНТА
var snake = []; // Сама змейка
var direction = 'y+'; // Направление движения змейки по умолчанию
//y+ - это движение вверх
//y- - это движение вниз
//x+ - Это движение вправо
//x- - это движение влево
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var score = 0; // Счет количества корма, которое съела змейка
var currentScore;//Переменная для постоянного отображения текущего счета за получение еды--------------------------------------------

//var totalForScore = ;////Счетчик баланса игры score - obstacleForScore


//ВНИМАНИЕ!! ЗАПУСК ИГРЫ ОСУЩЕСТВЛЯЕТСЯ ТОЙ ФУНКЦИЕЙ, КОТОРАЯ ЗАПУСКАЕТСЯ В КОНЦЕ ПЕРЕД ЗАКРЫТИЕМ ТЭГА script
//window.onload = init;// функция init запускает игру

function init() {
    prepareGameField(); // Генерация поля //СТРОИМ ИГРОВОЕ ПОЛЕ// ПЕРЕХОДИМ НА ЭТУ ФУНКЦИЮ

    var wrap = document.getElementsByClassName('wrap')[0];
    // Подгоняем размер контейнера под игровое поле

    /*
    if (16 * (FIELD_SIZE_X + 1) < 380) {
          wrap.style.width = '380px';
     }
     else {
          wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
     }
     */
    wrap.style.width = '400px';
    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);//По клику на кнопку snake-start запускаем функцию startGame()
    document.getElementById('snake-renew').addEventListener('click', refreshGame); //По клику на кнопку snake-renew обновляем игровое поле функцией refreshGame(), начиная новую игру.

    // Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);//При нажатии на клавиатуру запускается функция changeDirection()
}

/**
 * Функция генерации игрового поля
 */
function prepareGameField() { // Генерация поля //СТРОИМ ИГРОВОЕ ПОЛЕ//
    //---------------------------------------------------------------------------------------
    currentScore = document.querySelector('h3');//Переменная для постоянного отображения текущего счета--------------------------------------------
    currentScore.classList.add('score-string');
    //---------------------------------------------------------------------------------------
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

/**
 * Старт игры
 */
function startGame() { //Запуск игры нажатием на кнопку snake-start
    gameIsRunning = true;
    respawn();//создали змейку с запуском функции respawn()

    snake_timer = setInterval(move, SNAKE_SPEED);//каждые 200мс запускаем функцию move()
    setTimeout(createFood, 5000);//Каждые 5 с запускается функция createFood()
    setTimeout(createObstacles, 7000);//Каждые 7 с запускается функция createObstacles()
}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);//Координаты центральной ячейки по оси X
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);//Координаты центральной ячейки по оси Y

    // Хвост змейки
    var snake_tail = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit'); //Присоединяем все существующие классы
    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0]; // y-1 значит что голова змейки находится выше по отношению к хвосту, т.к. значение оси ординат для головы меньше на 1
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit'); //Присоединяем все существующие классы

    snake.push(snake_tail);//помещаем начальные координаты хвоста змейки в массив snake
    snake.push(snake_head);//помещаем начальные координаты головы змейки в массив snake
}

/**
 * Движение змейки
 */
function move() {
    //console.log('move',direction);
    // Сборка классов
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' '); //Из массива snake взяли последний элемент - голову змейки (td) и затем все ее классы, чтобы сделать split и поместили в массив через знак, указанный в split, т.е.в массиве все классы для ячейки указаны через пробел

    // Сдвиг головы
    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');//Необходимо получить координаты головы змейки // преобразовали строку в массив// обращаемся ко второму в массиве классу и преобразуем строку в массив через дефис, т.е. класс и координаты будут указаны через дефис
    var coord_y = parseInt(snake_coords[1]);//Это координаты y текущего положения головы змейки
    var coord_x = parseInt(snake_coords[2]);//Это координаты x текущего положения головы змейки

    // Определяем новую точку
    if (direction == 'x-') { //Изменение координаты направления по оси х влево
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
    }
    else if (direction == 'x+') {//Изменение координаты направления по оси х вправо
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
    }
    else if (direction == 'y+') {//Изменение координаты направления по оси у вниз
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
    }
    else if (direction == 'y-') {//Изменение координаты направления по оси у вверх
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
    }

    // Проверки
    // 1) new_unit не часть змейки
    // 2) Змейка не ушла за границу поля
    //console.log(new_unit);
    if (!isSnakeUnit(new_unit) && new_unit !== undefined && !haveObstacle(new_unit)) {//Проверяем функцией isSnakeUnit() не врезалась ли змейка сама в себя, когда стала большой длины
        // Проверяем: змейка не ушла за границу поля
        // Добавление новой части змейки
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');//После проверки новой ячейки опять назначаем все классы и помещаем в конец wмассива snake, т.е. новая ячейка станет головой змейки
        snake.push(new_unit);

        // Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) {//Хвост остается если змейка съела корм. Функция haveFood()
            // Находим хвост
            var removed = snake.splice(0, 1)[0];//Если !haveFood(), т.е. не корм, то надо удалять хвост змейки. Хвост змейки находится на нулевом индексе
            //splice(0, 1) - вырезает от 0 символа один и сохраняет его в новом массиве. Убираем хвост (элемент 0), который находится в конце массива snake и ниже головы. Ставим индекс [0] , который нам не нужен в массиве - это хвост
            var classes = removed.getAttribute('class').split(' ');//Получаем три класса, которые соотносятся с удаляемой ячейкой и затем перестраиваем классы
            //Более эффективным способом удаления класса является removed.classList.remove('snake-unit')

            // удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);//Удаляем один из трех классов snake-unit
            //-----------------------------------
        }
    }
    else {
        finishTheGame(); //Если змека врезалась сама в себя или вышла за границу, то конец игры
    }
}

/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit(unit) {//Является ли ячейка частью змейки. По умолчанию считается, что нет
    var check = false;

    if (snake.includes(unit)) {//метод includes() проверяет, содержится ли в массиве snake элемент
        check = true;//содержится
    }
    return check;
}
/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {//По умолчанию считается что следующая ячейка не корм
    var check = false;

    var unit_classes = unit.getAttribute('class').split(' ');//Берем все классы новой ячейки и приводим их в массив испоьзуя split

    // Если еда
    if (unit_classes.includes('food-unit')) {//Если новая ячейка содержит корм, то значит змейка съела корм
        check = true;
        createFood();//Запускаем функцию создать Еду createFood()
        score++;//увеличиваем счетчик очков
        //---------------------------------------------------------------------------------------------------------------------
        currentScore.innerHTML = 'Ваш текущий счет: ' + score;
        //-----------------------------------------------------------------------------------------------------------------------

    }
    return check; //Возвращает значение true по умолчанию, т.е. по умолчанию считаем, что новая ячейка это корм
}

//
function haveObstacle(unit) {//По умолчанию считается что следующая ячейка не препятствие
    var check = false;

    var unit_classes = unit.getAttribute('class').split(' ');//Берем все классы новой ячейки и приводим их в массив испоьзуя split

    // Если препятствие
    if (unit_classes.includes('obstacle-unit')) {//Если новая ячейка содержит препятствие, то значит змейка прошла через препятствие
        check = true;
        createObstacles();//Запускаем функцию создать препятствие createObstacles()
    }
    return check; //Возвращает значение true по умолчанию, т.е. по умолчанию считаем, что новая ячейка это препятствие
}

//---------------------------------------------------------------------

/**
 * Создание еды
 */
function createFood() { //Создание ячейки с кормом
    var foodCreated = false;//По умолчанию ячейка с кормом не создана

    while (!foodCreated) { //пока не создали еду 
        // рандом
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);//Корм производится в ячейке с рандомномными координатами X 
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);//Корм производится в ячейке с рандомномными координатами Y 

        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];//Получаем координаты ячейки с едой
        var food_cell_classes = food_cell.getAttribute('class').split(' '); //Получаем классы для новой ячейки с едой и приводим в массив

        //ВАРИАНТ 1 НЕЭФФЕКТИВНЫЙ

        // проверка на змейку

        if (!food_cell_classes.includes('snake-unit')) {//если новая ячейка не содержит класс snake-unit, то ...
            var classes = '';//очищаем классы....
            for (var i = 0; i < food_cell_classes.length; i++) {//обходим циклом все существующие в ячейке классы
                classes += food_cell_classes[i] + ' ';//суммируем их ...
            }

            food_cell.setAttribute('class', classes + 'food-unit');//придаем новой ячейке класс food-unit
            foodCreated = true;//функция сщздания корма возвращает true
        }

        /*
        //ВАРИАНТ 2 ЭФФЕКТИВНЫЙ
        if (!food_cell_classes.includes('snake-unit')) {//если новая ячейка не содержит класс snake-unit, то ...
            food_cell.classList.add('food_unit');
            foodCreated = true;//функция сщздания корма возвращает true
        }
        */
    }

}
//--------------------------------------------------------------------------------------------------------------------------------
//СОЗДАНИЕ ПРЕПЯТСТВИЙ
function createObstacles() { //Создание ячейки с препятствием
    var obstacleCreated = false;//По умолчанию ячейка с препятствием не создана

    while (!obstacleCreated) { //пока не создали препятствие 
        // рандом
        var obstacle_x = Math.floor(Math.random() * FIELD_SIZE_X);//Препятствие появляется в ячейке с рандомномными координатами X 
        var obstacle_y = Math.floor(Math.random() * FIELD_SIZE_Y);//Препятствие появляется в ячейке с рандомномными координатами Y 

        var obstacle_cell = document.getElementsByClassName('cell-' + obstacle_y + '-' + obstacle_x)[0];//Получаем координаты ячейки с препятствием
        var obstacle_cell_classes = obstacle_cell.getAttribute('class').split(' '); //Получаем классы для новой ячейки с препятствием и приводим в массив

        //ВАРИАНТ 1 НЕЭФФЕКТИВНЫЙ

        // проверка на змейку

        if (!obstacle_cell_classes.includes('snake-unit') || !obstacle_cell_classes.includes('food-unit')) {//если новая ячейка, которая рандомно получилась для препятствия, не содержит класс snake-unit (т.е. не является частью змейки), то ...
            var obstacleClasses = '';//очищаем классы...., чтобы присвоить классы, относящиеся к ячейке с препятствием
            for (var i = 0; i < obstacle_cell_classes.length; i++) {//обходим циклом все существующие в ячейке, которая рандомно получилась для препятствия, классы
                obstacleClasses += obstacle_cell_classes[i] + ' ';//суммируем их ...
            }

            obstacle_cell.setAttribute('class', obstacleClasses + 'obstacle-unit');//придаем новой ячейке класс obstacle-unit
            obstacleCreated = true;//функция сщздания препятствий возвращает true
        }

        /*
        //ВАРИАНТ 2 ЭФФЕКТИВНЫЙ
        if (!obstacle_cell_classes.includes('snake-unit')) {//если новая ячейка не содержит класс snake-unit, то ...
            food_cell.classList.add('obstacle_unit');
            obstacleCreated = true;//функция создания препятствия возвращает true
        }
        */
    }

}


//--------------------------------------------------------------------------------------------------------------------------------
/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {//е - это источник событий event
    console.log(e);
    switch (e.keyCode) {
        case 37: // Клавиша влево 
            if (direction != 'x+') {//Если в настоящий момент не движется вправо, то она пойдет влево, т.к. змейка не может разворачиваться на 180гр, а должна перейти на одну ячейку в бок, чтобы развернуться
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {//Если в настоящий момент не движется вверх, то она пойдет вниз, т.к. змейка не может разворачиваться на 180гр, а должна перейти на одну ячейку в бок, чтобы развернуться
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {//Если в настоящий момент не движется влево, то она пойдет вправо, т.к. змейка не может разворачиваться на 180гр, а должна перейти на одну ячейку в бок, чтобы развернуться
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {//Если в настоящий момент не движется вниз, то она пойдет вверх, т.к. змейка не может разворачиваться на 180гр, а должна перейти на одну ячейку в бок, чтобы развернуться
                direction = 'y-'
            }
            break;
    }
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;// функция init запускает игру
