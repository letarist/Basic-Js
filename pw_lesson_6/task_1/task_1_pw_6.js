let s = document.querySelector('.container');
let im = document.querySelectorAll('.cl1 img');
for (i of im) {
    i.onclick = f;
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
