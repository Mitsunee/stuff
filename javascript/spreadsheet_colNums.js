let chars = [], temp = [];
for (let i = 65; i <= 90; i++) chars.push(String.fromCharCode(i));
for (let a of chars) for (let b of chars) temp.push(a+b);
chars = chars.concat(temp);

function colNumByChar(char) {
    let num = chars.findIndex((c)=>(c===char));
    return (num < 0 ? false : num);
}

function colCharByNum(num) {
    if (!(num > 0 && num < chars.length )) return false;
    return chars[num];
}
