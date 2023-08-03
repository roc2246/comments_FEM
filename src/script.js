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

    // Creates avatar
    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.classList.add("comment__avatar");
    avatar.src = post.user.image.png;
    avatar.alt = post.user.username;
    container.appendChild(avatar);

    // Creates username
    const username = document.createElement("span");
    username.classList.add("comment__username");
    username.innerText = post.user.username;
    container.appendChild(username);

    // Creates indicator for current user
    if (post.user.username === currentUser.username) {
      const indicator = document.createElement("span");
      indicator.classList.add("comment__you");
      indicator.innerText = "you";
      container.appendChild(indicator);
    }

    // Creates when post was created at
    const createdAt = document.createElement("span");
    createdAt.classList.add("comment__createdAt");
    createdAt.innerText = post.createdAt;
    container.appendChild(createdAt);

    // Created container for content
    const content = document.createElement("p");
    content.classList.add("comment__content");

    // Creates message for content
    const message = document.createElement("span");
    message.innerText = post.content;
    message.classList.add("comment__message");

    // Creates who reply is replying to
    if (type === "reply") {
      const replyingTo = document.createElement("span");
      replyingTo.innerText = `@${post.replyingTo} `;
      replyingTo.classList.add("comment__replyingTo");
      content.appendChild(replyingTo);
    }
    content.appendChild(message);
    container.appendChild(content);

    // Creates form to update comment or reply
    if (post.user.username === currentUser.username) {
      const updateForm = document.createElement("form");
      updateForm.classList.add("new-comment");
      updateForm.classList.add("new-comment--update");

      const updateInput = document.createElement("textarea");
      updateInput.classList.add("new-comment__input");
      updateForm.appendChild(updateInput);

      const updateSend = document.createElement("button");
      updateSend.classList.add("new-comment__send");
      updateSend.innerText = "UPDATE";
      updateForm.appendChild(updateSend);

      container.appendChild(updateForm);
    }

    // Creates form to vote on comment or reply
    const vote = document.createElement("form");
    vote.classList.add("vote");

    const upvote = document.createElement("button");
    upvote.classList.add("vote__btn");
    upvote.classList.add("vote__btn--upvote");

    const plus = document.createElement("img");
    plus.classList.add("vote__img");
    plus.classList.add("vote__img--plus");
    plus.src = "./images/icon-plus.svg";

    const score = document.createElement("span");
    score.classList.add("vote__score");
    score.innerText = post.score;

    const downvote = document.createElement("button");
    downvote.classList.add("vote__btn");
    downvote.classList.add("vote__btn--downvote");

    const minus = document.createElement("img");
    minus.classList.add("vote__img");
    minus.classList.add("vote__img--minus");
    minus.src = "./images/icon-minus.svg";

    container.appendChild(vote);
    vote.appendChild(upvote);
    upvote.appendChild(plus);
    vote.appendChild(score);
    vote.appendChild(downvote);
    downvote.appendChild(minus);

    // Creates CRUD buttons
    const CRUD = document.createElement("div");
    CRUD.classList.add("CRUD-container");
    if (post.user.username === currentUser.username) {
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("CRUD");
      deleteBtn.classList.add("CRUD--delete");

      const deleteBtnIcon = document.createElement("img")
      deleteBtnIcon.classList.add("CRUD__icon")
      deleteBtnIcon.classList.add("CRUD__icon--delete")
      deleteBtn.src = "./images/icon-delete.svg"
      deleteBtn.appendChild(deleteBtnIcon)

      const deleteBtnTxt = document.createElement("span");
      deleteBtnTxt.classList.add("CRUD__text");
      deleteBtnTxt.classList.add("CRUD__text--delete");
      deleteBtnTxt.innerText = "Delete";

      const editBtn = document.createElement("button");
      editBtn.classList.add("CRUD");
      editBtn.classList.add("CRUD--edit");

      const editBtnIcon = document.createElement("img")
      editBtnIcon.classList.add("CRUD__icon")
      editBtnIcon.classList.add("CRUD__icon--edit")
      editBtn.src = "./images/icon-edit.svg"
      editBtn.appendChild(editBtnIcon)

      const editBtnTxt = document.createElement("span");
      editBtnTxt.classList.add("CRUD__text");
      editBtnTxt.classList.add("CRUD__text--edit");
      editBtnTxt.innerText = "Edit";

      deleteBtn.appendChild(deleteBtnTxt);
      editBtn.appendChild(editBtnTxt);
      CRUD.appendChild(deleteBtn);
      CRUD.appendChild(editBtn);
    } else {
      const replyBtn = document.createElement("button");
      replyBtn.classList.add("CRUD");
      replyBtn.classList.add("CRUD--reply");

      const replyBtnIcon = document.createElement("img")
      replyBtnIcon.classList.add("CRUD__icon")
      replyBtnIcon.classList.add("CRUD__icon--reply")
      replyBtn.src = "./images/icon-reply.svg"
      replyBtn.appendChild(replyBtnIcon)

      const replyBtnTxt = document.createElement("span");
      replyBtnTxt.classList.add("CRUD__text");
      replyBtnTxt.classList.add("CRUD__text--reply");
      replyBtnTxt.innerText = "Reply";
      replyBtn.appendChild(replyBtnTxt)

      CRUD.appendChild(replyBtn);
    }
    container.appendChild(CRUD);

    return container;
  }

  function createReplyForm() {
    const replyForm = document.createElement("form");
    replyForm.classList.add("new-comment");
    replyForm.classList.add("new-comment--reply");

    const replyInput = document.createElement("textarea");
    replyInput.classList.add("new-comment__input");
    replyForm.appendChild(replyInput);

    const replySend = document.createElement("button");
    replySend.classList.add("new-comment__send");
    replySend.innerText = "REPLY";
    replyForm.appendChild(replySend);

    return replyForm;
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

    container.appendChild(createReplyForm());
  } else {
    container.appendChild(postCont("comment"));
    container.appendChild(createReplyForm());
  }
}
