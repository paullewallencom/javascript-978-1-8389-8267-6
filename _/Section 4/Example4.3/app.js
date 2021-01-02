const fs = require("fs");
const promisify = require("util").promisify;

// fs.readFile("./hello_world.txt", "utf8", (err, contents) => {
//     if (err) {
//         console.error("Something went wrong: ", err);
//     }
//     else {
//         console.log("Contents: ", contents);
//     }
// });

promisify(fs.readFile).bind(fs)("./hello_world.txt", "utf8").then(contents => {
    console.log("Contents: ", contents);
}).catch(err => {
    console.error("Something went wrong: ", err);
})