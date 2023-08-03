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

  function postCont(type, counter) {
    let post;
    const container = document.createElement("div");
    container.classList.add("comment");

    if (type === "reply") {
      container.classList.add("comment--reply");
      post = data.comments[comment].replies[counter];
    } else if (type === "comment") {
      post = data.comments[comment];
      counter = null
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
    container.appendChild(content);

    const message = document.createElement("span")
    message.innerText = post.content;
    message.classList.add("comment__message");


    if(type === "reply") {
      const replyingTo = document.createElement("span")
      replyingTo.innerText = `@${post.replyingTo} `
      replyingTo.classList.add("comment__replyingTo")
      content.appendChild(replyingTo)
      content.appendChild(message);
    } else if (type ==="comment") {
      content.appendChild(message);
    }

    return container;
  }

  if (post.replies.length > 0) {
    console.log(post.replies);
    container.appendChild(postCont("comment"));
    for (let reply in post.replies) {
      container.appendChild(postCont("reply", reply));
    }
  } else {
    container.appendChild(postCont("comment"));
  }
}
