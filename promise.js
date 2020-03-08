function xhr(method = "", url, body = null) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = reject;
    xhr.send(body);
  });
}

const usersLoad = function(users) {
  users.forEach(element => {
    let p = document.createElement("p");
    p.setAttribute("class", "position");
    let ul = document.createElement("ul");
    let ol = document.createElement("ol");
    let blockquote = document.createElement("blockquote");

    p.setAttribute("data-id", element.id);
    p.innerText = `Name: ${element.name} / Email: ${element.email} / Company: ${element.company.name}`;

    p.append(ul);
    p.append(ol);
    p.append(blockquote);

    document.body.append(p);
  });
};

const albumsLoad = function(albums) {
  albums.forEach(album => {
    let user = document.querySelector(`[data-id="${album.userId}"]`);
    let ul = user.querySelector("ul");
    let li = document.createElement("li");
    li.innerText = "Album title: " + album.title;

    ul.append(li);
  });
};

const postsLoad = function(posts) {
  posts.forEach(post => {
    let user = document.querySelector(`[data-id="${post.userId}"]`);
    let ol = user.querySelector("ol");
    let li = document.createElement("li");

    li.innerText = "Post title: " + post.title;
    li.setAttribute("post-data-id", post.id);
    ol.append(li);
    let olComment = document.createElement("ol");
    olComment.setAttribute("class", "text_format");
    li.append(olComment);
  });
};

const commentsLoad = function(comments) {
  comments.forEach(comment => {
    let post = document.querySelector(`[post-data-id="${comment.postId}"]`);

    let ol = post.querySelector("ol");
    let li = document.createElement("li");
    li.innerText = "Comment: " + comment.body;
    ol.append(li);
  });
};

xhr("GET", "https://jsonplaceholder.typicode.com/users")
  .then(function(users) {
    usersLoad(users);
    return xhr("GET", "https://jsonplaceholder.typicode.com/albums");
  })
  .then(albums => {
    albumsLoad(albums);
    return xhr("GET", "https://jsonplaceholder.typicode.com/posts");
  })
  .then(posts => {
    postsLoad(posts);
    return xhr("GET", "https://jsonplaceholder.typicode.com/comments");
  })
  .then(comments => {
    commentsLoad(comments);
  });
