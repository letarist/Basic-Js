let nums = 1;
let arr = []
while (nums <= 100) {
    let check = true;
    for (let i = 2; i < nums; i++) {
        if (nums % i === 0) {
            check = false;
            break;
        }
    }
    if (check)
        arr.push(nums);
    nums++;
}
document.write(arr);