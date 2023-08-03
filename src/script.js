// Delete once data is on server
import data from "./data.json";
// ///////////////////////////////////

// async function fetchData() {
//     try {
//       const response = await fetch('data.json');

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       // Use the fetched data here
//       console.log(data);
//     } catch (error) {
//       // Handle errors
//       console.error('Fetch error:', error);
//     }
//   }

//   // Call the function to retrieve the data
//   fetchData();

for (let comment in data.comments) {
  const container = document.querySelector("main");

  const post = data.comments[comment];

  function postCont(type) {
    const container = document.createElement("div");
    container.classList.add("comment");

    if (type === "reply") {
      container.classList.add("comment--reply");
    }

    const avatar = document.createElement("img");
    avatar.classList.add("comment__avatar");
    avatar.src = post.user.image.png;
    container.appendChild(avatar);

    const username = document.createElement("span");
    username.classList.add("comment__username");
    username.innerText = post.user.username;
    container.appendChild(username);

    const createdAt = document.createElement("span");
    createdAt.classList.add("comment__createdAt");
    createdAt.innerText = post.createdAt;
    container.appendChild(createdAt);

    const content = document.createElement("p");
    content.classList.add("comment__content");
    content.innerText = post.content;
    container.classList.add("comment__content");
    container.appendChild(content);


    return container;
  }


  if (post.replies.length > 0) {
    console.log(post);
    container.appendChild(postCont("comment"));
    for (let reply in post.replies) {
      container.innerHTML += `<br><br>${post.replies[reply].content} <br><br>`;
    }
  } else {
    container.appendChild(postCont("comment"));
  }
}
