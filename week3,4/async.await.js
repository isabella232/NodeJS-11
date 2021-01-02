async function main() {
    try {
        const str = await myTimer(3000);
        console.log(str);
        console.log('메인 함수 실행');
    } catch (error) {
        console.error(error.message);
    }
}

function myTimer(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (time > 2000) {
                reject(new Error('2초가 넘어서 에러를 발생'));
            } else {
                resolve(`${time}초 걸림`);
            }
        }, time);
    });
}

main();