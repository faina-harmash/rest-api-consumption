function xhr(method, url, onload, body = null) {
  let xhr = new XMLHttpRequest();

  xhr.open(method, url);

  xhr.responseType = "json";

  xhr.setRequestHeader("Accept", "application/json");

  xhr.onload = onload;

  xhr.onerror = e => {
    console.log(e);
    console.log("Error here!");
  };

  xhr.send(body);
}

function usersLoad() {
  console.log("Users Load");
  if (this.status === 200 || this.status == 304) {
    this.response.forEach(element => {
      let p = document.createElement("p");
      p.setAttribute("class","position");
      let ul = document.createElement("ul");
      let ol = document.createElement("ol");
      let blockquote = document.createElement("blockquote");
      let h = document.createElement("h3");
      blockquote.setAttribute("class","text_format");
      p.setAttribute("data-id", element.id);
      p.innerText = `Name: ${element.name} / Email: ${element.email} / Company: ${element.company.name}`;
      p.append(ul);
      p.append(ol);
      p.append(blockquote);
      p.append(h);

      document.body.append(p);
    });
    xhr("GET", "https://jsonplaceholder.typicode.com/albums", albumsLoad);
  }
}

function albumsLoad() {
  console.log("Albums Load");
  if (this.status === 200 || this.status == 304) {
    this.response.forEach(album => {
      let user = document.querySelector(`[data-id="${album.userId}"]`);
      let ul = user.querySelector("ul");
      let li = document.createElement("li");
      li.innerText = "Album title: "+ album.title;

      ul.append(li);
    });
    xhr("GET", "https://jsonplaceholder.typicode.com/posts", postsLoad);
  }
}

function postsLoad() {
  if (this.status === 200 || this.status == 304) {
    this.response.forEach(post => {
      let user = document.querySelector(`[data-id="${post.userId}"]`);
      let ol = user.querySelector("ol");
      let li = document.createElement("li");
      li.innerText = "Post title: "+ post.title;

      ol.append(li);
    });
    xhr("GET", "https://jsonplaceholder.typicode.com/comments", commentsLoad);
  }
}

function commentsLoad() {
  if (this.status === 200 || this.status == 304) {
    this.response.forEach(comments => {
      let user = document.querySelector(`[data-id="${comments.postId}"]`);
      let blockquote = user.querySelector("blockquote");
      blockquote.innerText = "Comment: "+ comments.body;
      

    });
  }
}

xhr("GET", "https://jsonplaceholder.typicode.com/users", usersLoad);
