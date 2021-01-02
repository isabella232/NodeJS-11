function add1(input, callback) {
    setTimeout(() => callback(input + 1), 1000);
}

add1(0, (result) => {
    add1(result, (result) => {
        add1(result, (result) => {
            add1(result, (result) => {
                add1(result, (result) => {
                    add1(result, (result) => {
                        add1(result, (result) => {
                            console.log(result);
                        });
                    });
                });
            });
        });
    });
});