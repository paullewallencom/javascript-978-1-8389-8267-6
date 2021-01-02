const axios = require("axios");

function fetchUsers() {
    return axios.default.get("https://jsonplaceholder.typicode.com/users").then(response => response.data);
}

function fetchPosts(userId) {
    return axios.default.get("https://jsonplaceholder.typicode.com/posts")
                        .then(response => response.data)
                        .then(posts => posts.filter(p => p.userId == userId));
}

function fetchUsersWithPosts() {
    let allUsers;
    return fetchUsers().then(users => {
        allUsers = users;
        return Promise.all(users.map(user => fetchPosts(user.id)));
    }).then(posts => {
        allUsers.forEach( (user, index) => {
            user.posts = posts[index];
        } );
        return allUsers;
    }).catch(err => {
        console.log("Oops something went wrong!", err);
    });
}

fetchUsersWithPosts().then(users => console.log("Users with posts: ", users));