const POSTS = `https://jsonplaceholder.typicode.com/posts/`;
const USERS = `https://jsonplaceholder.typicode.com/users/`;
const post = document.getElementById('root');
const comment = document.getElementById('forComm');

window.addEventListener('hashchange', function() {
    let way = location.hash
    let ID = way.match(/\d+/g).toString();
    if (way.includes('post')) {
        getPost(`${POSTS}${ID}`, post, postDetail);
        getPost(`${POSTS}${ID}/comments`, comment, comm);
    }
    else if (way.includes('author')) {
        comment.innerHTML = '';
        getPost(`${USERS}${ID}`, post, author)
    }
    else if (way == '') {
        getPost(POSTS, post, postCreate);
    }
});

function postCreate(post) {
    return `<div class="create">
                <a href="#/postId=${post.id}"><h4>${post.title}</h4></a>
                <p>${post.body}</p>
            </div>`;
}

function postDetail(post) {
    return `<div class="detail">
                <h4>${post.body}</h4>
                <a href="#/authorId=${post.userId}">Info about Author</a>
                <h3>Comments</h3>
            </div>`;
}

function comm(comments) {
    return `<p class="comm">${comments.body}</p>`
}

function author(author) {
    return `<div class="author">
                <h4>${author.name}</h4>
                <p>${author.phone}</p>
                <p>${author.email}</p>
                <p>${author.website}</p>
                <p>${author.address.suite} ${author.address.street}, ${author.address.city}</p>
            </div>`;
}

getPost(POSTS, post, postCreate);

function getPost(url, selectDiv, func) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            if (Array.isArray(json)) {
                selectDiv.innerHTML = json.map(function(item) {
                    return func(item);
                }).join('')
            }
            else {
                selectDiv.innerHTML = func(json);
            }
        })
}