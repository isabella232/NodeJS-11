// 무분별한 await는 병목이 발생할 수 있음.
// Promise.all
async function main() {
    console.time('main');
    // const str = await myTimer(3000); // 3
    // const str1 = await myTimer(4000); // 4
    // const str2 = await myTimer(3000); // 3
    const arr = await Promise.all([myTimer(3000), myTimer(4000), myTimer(3000)]);
    console.log(arr);
    console.timeEnd('main');

}

function myTimer(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${time}초 걸림`);
        }, time);
    });
}

main();