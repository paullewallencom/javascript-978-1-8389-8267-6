const request = require("request");
const async = require("async");

function getUsers(cb) {
    request("https://jsonplaceholder.typicode.com/users", (err, response) => {
        if (err) {
            cb(err);
        }
        else {
            cb(null, response.body);
        }
    });
}

function getUserPosts(userId, cb) {
    request(`https://jsonplaceholder.typicode.com/posts`, (err, response) => {
        if (err) {
            cb(err);
        }
        else {
            cb(null, response.body.map(p => p.userId == userId));
        }
    })
}

var state = {};
function getUsersWithPosts(cb) {
    async.series([
        cb => {
            getUsers((err, users) => {
                if (err) {
                    cb(err);
                }
                else {
                    state.users = users;
                    cb();
                }
            })
        },
        cb => {
            async.eachOfSeries(state.users, user => {
                getUserPosts(user.userId, (err, posts) => {
                    if (err) {
                        return cb(err);
                    }
                    else {
                        user.posts = posts;
                        cb();
                    }
                });
            }, cb);
        }
    ], err => {
        if (err) {
            console.error("Something went wrong");
            console.error(err);
        }
        else {
            console.log("Users: ", state.users);
        }
    });
}