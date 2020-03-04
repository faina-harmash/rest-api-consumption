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

function usersLoad(response = []) {
  response.forEach(element => {
    let p = document.createElement("p");
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    
    p.setAttribute("data-id", element.id);
    p.innerText = `${element.title} / ${element.body}`;
    li.innerText = `${element.title}`;
    p.append(ul);
    document.body.append(p);
  });
}
xhr("GET", "https://jsonplaceholder.typicode.com/posts").then(res=> postsLoad(res))
.then(()=> {
    xhr("GET","https://jsonplaceholder.typicode.com/comments")
})