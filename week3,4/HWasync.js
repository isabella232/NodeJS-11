function add1(input) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(input + 1)
                console.log(input);
            }, 1000);
        } catch (err) {
            console.error(err.message);
        }
    })
};

async function main() {
    i = 0;
    let res = 0;
    while (i < 5) {
        const result = await add1(res);
        if (i === 4) console.log(`${result}초 지났습니다`);
        i++;
        res = result;
    }
}

main();