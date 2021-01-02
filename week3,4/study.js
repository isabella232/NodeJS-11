// new promise (executor);
// executor(resolve, reject);
const fetchNum = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNum
    .then(num => {
        num * 2
    })
    .then(num => num * 3)
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num / 2), 1000);
        });
    })
    .then(consloe.log);