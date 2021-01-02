// const {stdin} = require('process');
// const readline = require('readline');

// readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

// readline.on('line', input => {
//     console.log('내가 입력한 것은' + input);
// })

let inp;
readline.on('line', input => {
    inp = input;
    console.log('내가 입력한 것은 ' + input);
    logic();
});

function logic() {
    console.log(inp);
    const list = inp.split("");
    console.log(list);
}