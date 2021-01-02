function scanner(input) {
    const rl = require('readline').createInterface({
        input: process.stdin,
        ouput: process.stdout
    })
    return new Promise((resolve, reject) => {
        rl.on('line', (result) => {
            resolve(result);
            rl.close();
        });
    });
}

// const main = async() =>{};
async function main() {
    const result = await scanner();
    console.log(`${result}를 입력했습니다.`);
}

main();