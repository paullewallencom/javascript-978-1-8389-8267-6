const axios = require("axios");

function fetchUsers() {
    return axios.default.get("https://jsonplaceholder.typicode.com/users").then(response => response.data);
}

function fetchPosts(userId) {
    return axios.default.get("https://jsonplaceholder.typicode.com/posts")
                        .then(response => response.data)
                        .then(posts => posts.filter(p => p.userId == userId));
}

async function fetchUsersWithPosts() {
    let users = await fetchUsers();
    for(let user of users) {
        user.posts = await fetchPosts(user.id);
    }
    return users;
}

(async() => {
    try {
        let usersWithPosts = await fetchUsersWithPosts();
        console.log("Users with posts: ", usersWithPosts);
    }
    catch (err) {
        console.error("Oops! something went wrong");
        console.error(err);
    }
})();
