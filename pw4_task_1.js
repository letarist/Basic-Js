let res = {};

function digitTransform(digit) {
    if (0 < digit && digit < 999) {
        let answers = ['сотен', 'десятков', 'едениц'];
        let dl = answers.length;
        while (digit) {
            result = digit % 10;
            while (dl) {
                res[answers[dl - 1]] = result;
                dl -= 1;
                break;
            }
            digit = parseInt(digit / 10);
        }
        return res;
    } else {
        return 'Число передается в диапазоне от 0 до 999 ';
    }


}


console.log(digitTransform(2));