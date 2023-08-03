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
  const container = document.getElementById("comment-wrapper");
  const { currentUser, comments } = data;
  const post = comments[comment];

  function postCont(type, counter) {
    let post;
    const container = document.createElement("div");
    container.classList.add("comment");

    if (type === "reply") {
      container.classList.add("comment--reply");
      post = comments[comment].replies[counter];
    } else if (type === "comment") {
      post = comments[comment];
      counter = null;
    }

    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.classList.add("comment__avatar");
    avatar.src = post.user.image.png;
    container.appendChild(avatar);

    const username = document.createElement("span");
    username.classList.add("comment__username");
    username.innerText = post.user.username;
    container.appendChild(username);

    if (post.user.username === currentUser.username) {
      const indicator = document.createElement("span");
      indicator.classList.add("comment__you");
      indicator.innerText = "you";
      container.appendChild(indicator);
    }

    const createdAt = document.createElement("span");
    createdAt.classList.add("comment__createdAt");
    createdAt.innerText = post.createdAt;
    container.appendChild(createdAt);

    const content = document.createElement("p");
    content.classList.add("comment__content");

    const message = document.createElement("span");
    message.innerText = post.content;
    message.classList.add("comment__message");
    if (type === "reply") {
      const replyingTo = document.createElement("span");
      replyingTo.innerText = `@${post.replyingTo} `;
      replyingTo.classList.add("comment__replyingTo");
      content.appendChild(replyingTo);
    }
    content.appendChild(message);
    container.appendChild(content);

    const vote = document.createElement("div");
    vote.classList.add("vote");
    container.appendChild(vote);

    const upvote = document.createElement("button");
    upvote.classList.add("vote__btn");
    upvote.classList.add("vote__btn--upvote");
    vote.appendChild(upvote);

    const plus = document.createElement("img");
    plus.classList.add("vote__img");
    plus.classList.add("vote__img--plus");
    plus.src = "./images/icon-plus.svg";
    upvote.appendChild(plus);

    const score = document.createElement("span");
    score.classList.add("vote__score");
    score.innerText = post.score;
    vote.appendChild(score);

    const downvote = document.createElement("button");
    downvote.classList.add("vote__btn");
    downvote.classList.add("vote__btn--downvote");
    vote.appendChild(downvote);

    const minus = document.createElement("img");
    minus.classList.add("vote__img");
    minus.classList.add("vote__img--minus");
    minus.src = "./images/icon-minus.svg";
    downvote.appendChild(minus);

    const CRUD = document.createElement("div");
    CRUD.classList.add("CRUD-container");
    if (post.user.username === currentUser.username) {
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.classList.add("CRUD");
      deleteBtn.classList.add("CRUD--delete");
      CRUD.appendChild(deleteBtn);

      const editBtn = document.createElement("button");
      editBtn.innerText = "edit";
      editBtn.classList.add("CRUD");
      editBtn.classList.add("CRUD--edit");
      CRUD.appendChild(editBtn);
    } else {
      const replyBtn = document.createElement("button");
      replyBtn.innerText = "reply";
      replyBtn.classList.add("CRUD");
      replyBtn.classList.add("CRUD--reply");
      CRUD.appendChild(replyBtn);
    }
    container.appendChild(CRUD);

    return container;
  }

  function createReplyForm () {
    const replyForm = document.createElement("form");
    replyForm.classList.add("new-comment");
    replyForm.classList.add("new-comment--reply");

    const replyInput = document.createElement("textarea");
    replyInput.classList.add("new-comment__input");
    replyForm.appendChild(replyInput);

    const replySend = document.createElement("button")
    replySend.classList.add("new-comment__send")
    replySend.innerText = "REPLY"
    replyForm.appendChild(replySend)

    return replyForm
  }

  if (post.replies.length > 0) {
    container.appendChild(postCont("comment"));

    const replyCont = document.createElement("div");
    replyCont.classList.add("reply-wrapper");
    container.appendChild(replyCont);

    const hr = document.createElement("hr");
    hr.classList.add("reply-wrapper__ruler");
    replyCont.appendChild(hr);

    for (let reply in post.replies) {
      replyCont.appendChild(postCont("reply", reply));
    }

    container.appendChild(createReplyForm())

  } else {
    container.appendChild(postCont("comment"));
    container.appendChild(createReplyForm())
  }
}
