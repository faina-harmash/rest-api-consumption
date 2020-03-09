function sendRequest(method = "", url, body = null) {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json().then(error => {
      const e = new Error("Что-то пошло не так");
      e.data = error;
      throw e;
    });
  });

}

const usersLoad = function(users) {
  console.log(users);
  users.forEach(element => {
    let div = document.createElement("div");
    div.setAttribute("class", "position");
    let ul = document.createElement("ul");
    let ol = document.createElement("ol");
    let blockquote = document.createElement("blockquote");

    div.setAttribute("data-id", element.id);
    div.innerText = `Name: ${element.name} / Email: ${element.email} / Company: ${element.company.name}`;

    div.append(ul);
    div.append(ol);
    div.append(blockquote);

    document.body.append(div);
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

    li.style.cursor = "pointer";
    li.addEventListener("click", event => {
      olComment.classList.toggle("visible");
    });
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

sendRequest("GET", "https://jsonplaceholder.typicode.com/users")
  .then(function(users) {
    usersLoad(users);
    return sendRequest("GET", "https://jsonplaceholder.typicode.com/albums");
  })
  .then(albums => {
    albumsLoad(albums);
    return sendRequest("GET", "https://jsonplaceholder.typicode.com/posts");
  })
  .then(posts => {
    postsLoad(posts);
    return sendRequest("GET", "https://jsonplaceholder.typicode.com/comments");
  })
  .then(comments => {
    commentsLoad(comments);
  })
  .catch(err => console.log(err));
