let button = document.querySelector("#clear_localstorage");
button.addEventListener("click", event => {
  localStorage.clear();
  const element = event.target;
  element.classList.toggle("loaded");
  if (element.classList.contains("loaded")) {
    element.innerText = "Delete posts and comments";
    // fetchData();
  } else {
    let profiles = document.querySelectorAll(".profile");
    profiles.forEach((profile) => {
      const postBlock = profile.querySelector(".post-block");
      postBlock.innerHTML = '';
    });
    element.innerText = "You have successfully deleted posts and comments";
  }
});

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

const renderUsers = users => {
  console.log(users);

  users.forEach(element => {
    const profile = document.createElement("div");
    profile.setAttribute("class", "profile");
    profile.setAttribute("data-id", element.id);

    const userInfo = document.createElement("div");
    userInfo.setAttribute("class", "user-info");
    userInfo.innerText = `Name: ${element.name} / Email: ${element.email} / Company: ${element.company.name}`;
    profile.append(userInfo);

    const postBlock = document.createElement("div");
    postBlock.setAttribute("class", "post-block");

    profile.append(postBlock);
    document.body.append(profile);
  });
};

const renderAlbums = albums => {
  albums.forEach(album => {
    const profile = document.querySelector(`[data-id="${album.userId}"]`);
    let albumsList = profile.querySelector(".albums-list");
    if (!albumsList) {
      const albumsBlock = document.createElement("div");
      albumsBlock.setAttribute("class", "albums-block");
      albumsList = document.createElement("ul");
      albumsList.setAttribute("class", "albums-list");
      albumsBlock.append(albumsList);
      profile.append(albumsBlock);
    }
    let albumItem = document.createElement("li");
    albumItem.innerText = "Album title: " + album.title;
    albumsList.append(albumItem);
  });
};

const renderPosts = posts => {
  console.log(posts);
  
  posts.forEach(post => {
    let profile = document.querySelector(`[data-id="${post.userId}"]`);
    let postBlock = profile.querySelector(".post-block");
    let postList = profile.querySelector(".post-list");

    if (!postList) {
      postList = document.createElement("ul");
      postList.setAttribute("class", "post-list");
      postBlock.append(postList);
      profile.append(postBlock);
    }

    let postItem = document.createElement("li");

    postItem.innerText = "Post title: " + post.title;
    postItem.setAttribute("post-data-id", post.id);
    postList.append(postItem);

    postList.style.cursor = "pointer";
  });
};

const renderComments = comments => {
  console.log(comments);
  comments.forEach(comment => {
    let post = document.querySelector(`[post-data-id="${comment.postId}"]`);
    post.addEventListener("click", tooglePosts);
    let commentList = post.querySelector(".comment-list");

    if (!commentList) {
      commentList = document.createElement("ul");
      commentList.setAttribute("class", "comment-list");
    }
    let commentItem = document.createElement("li");
    commentItem.innerText = "Comment: " + comment.body;
    commentList.append(commentItem);
    post.append(commentList);
  });
};

const tooglePosts = (event) => {
    let element = event.target;
    let targetList = element.querySelector(".comment-list");
    if (targetList) {
        targetList.classList.toggle("visible");
    }
}

const fetchData = () => {
    sendRequest("GET", "https://jsonplaceholder.typicode.com/users")
    .then(function(users) {
      renderUsers(users);
      return sendRequest("GET", "https://jsonplaceholder.typicode.com/albums");
    })
    .then(albums => {
      renderAlbums(albums);
      let posts = JSON.parse(localStorage.getItem("posts"));
      if (posts) {
        return new Promise((resolve, reject) => {
          resolve(posts);
        });
      } else {
        return sendRequest("GET", "https://jsonplaceholder.typicode.com/posts");
      }
    })
    .then(posts => {
      localStorage.setItem("posts", JSON.stringify(posts));
      renderPosts(posts);
      let comments = JSON.parse(localStorage.getItem("comments"));
      if (comments) {
        return new Promise((resolve, reject) => {
          resolve(comments);
        });
      } else {
        return sendRequest(
          "GET",
          "https://jsonplaceholder.typicode.com/comments"
        );
      }
    })
    .then(comments => {
      localStorage.setItem("comments", JSON.stringify(comments));
      renderComments(comments);
    })
    .catch(err => console.log(err));
  
}

fetchData();
