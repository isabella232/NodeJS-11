const fs = require("fs");

/**
 * i/o 메서드
 * 비동기 non-blocking (안기다림)
 */
fs.readFile("./test.txt", {
    encoding: "utf-8"
}, (err, read) => {
    if (err) console.error(err.message);
    console.log(err, read);
});

/**
 * 동기 blocking (기다림)
 */
const syncRead;
try {
    syncRead = fs.readFileSync("./test.txt", {
        encoding: "utf-8"
    });
    console.log(syncRead); //출력됨
} catch (err) {
    console.error(err.message);
}

console.log(syncRead); //undefined
console.log(1);