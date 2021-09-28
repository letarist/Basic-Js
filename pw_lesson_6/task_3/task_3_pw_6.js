let s = document.querySelector('.container');
let im = document.querySelectorAll('.cl1 img');
for (i of im) {
    i.onclick = f;
}

imgNum = 0;
let prev = document.getElementById('previous');
prev.onclick = function () {
    previous_item(imgNum--);
}
function current(i) {
    showImg(imgNum = i)
}
function showImg(i) {
    let items = document.querySelectorAll('.item');
    if (i >= items.length) {
        imgNum = 1;
    }
    if (i < 2) {
        imgNum = items.length - 1
    }
    for (let item of items) {
        item.style.display = 'none'
    }
    items[imgNum - 1].style.display = 'block'
}
showImg(imgNum)
let next = document.getElementById('next');
next.onclick = function () {
    next_item(imgNum++);
}

function previous_item() {
    showImg(imgNum--);
}

function next_item() {
    showImg(imgNum++);

}
function f() {
    let imgDiv = document.getElementById('big_picture');
    imgDiv.innerHTML = '';
    src = 'big/' + this.id + '.jpg';
    let img = document.createElement('IMG');
    img.src = src;
    img.onerror = function () {
        alert('Картинки не существует');
        img.remove();
    }
    imgDiv.appendChild(img);


}
