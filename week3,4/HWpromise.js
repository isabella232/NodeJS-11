const add1 = function (input) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(input + 1);
                console.log(input);
            }, 1000);
        } catch (err) {
            console.error(err.message);
        }
    })
};

add1(0)
    .then(result => add1(result))
    .then(result => add1(result))
    .then(result => add1(result))
    .then(result => add1(result))
    .then(result => {
        console.log(`${result}초 지났습니다.`);
    });