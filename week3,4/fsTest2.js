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
    fs.unlinkSync('test.txt');
});