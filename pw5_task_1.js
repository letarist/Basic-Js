let container = document.querySelector(".container");
container.style.width = "720px";
container.style.height = "720px";
container.style.margin = "0 auto";
container.style.display = "flex";
container.style.flexWrap = "wrap";

function my_initiation() {
    let cell = document.createElement("div");
    cell.className = "cell";
    cont.append(cell);
    cell.style.width = "80px";
    cell.style.height = "80px";

}

for (let n = 0; (n != 80); n++) {
    my_initiation();
};

var masCell = document.querySelectorAll(".cell");
for (let i = 0; (i < masCell.length); i++) {
    var c;
    if (i % 2 == 0) {
        c = "white";
    } else {
        c = "black";
    }
    masCell[i].style.background = c;
}
let alphs = 'abcdefgh'
for (let j = 0; j < 9; j++) {
    masCell[j].style.background = 'white';
    masCell[j + 1].textContent = alphs[j];
    masCell[j].style.textAlign = 'center';
}
let numbers = '12345678'
let count = 0;
for (let k = 0; k < masCell.length; k++) {
    if (k % 9 == 0) {
        masCell[k].style.background = 'white';
        masCell[k + 9].textContent = numbers[count]; //Костыль для смещения текста по вертикали
        masCell[k].style.verticalAlign = 'bottom';
        count += 1;
    }
}
