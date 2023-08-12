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

// COMMENT GENERATION

for (let comment in data.comments) {
  const container = document.getElementById("comment-wrapper");
  const { currentUser, comments } = data;
  const post = comments[comment];

  document.getElementsByClassName("avatar--new-comment")[0].src =
    currentUser.image.png;

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

    if (currentUser.username === post.user.username) {
      container.classList.add("comment--you");
    }

    // Creates avatar
    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.classList.add("avatar--comment");
    avatar.src = post.user.image.png;
    avatar.alt = post.user.username;
    container.appendChild(avatar);

    // Creates username
    const username = document.createElement("span");
    username.classList.add("username");
    container.appendChild(username);

    // Creates indicator/name for current user
    if (post.user.username === currentUser.username) {
      username.classList.add("username--you");
      const name = document.createElement("span");
      name.classList.add("username__name");
      name.innerText = post.user.username;
      username.appendChild(name);

      const indicator = document.createElement("span");
      indicator.classList.add("username__you");
      indicator.innerText = "you";
      username.appendChild(indicator);
    } else {
      username.innerText = post.user.username;
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

    container.appendChild(content);

    // Creates who reply is replying to
    if (type === "reply") {
      const replyingTo = document.createElement("span");
      replyingTo.innerText = `@${post.replyingTo} `;
      replyingTo.classList.add("comment__replyingTo");
      content.appendChild(replyingTo);
    }
    content.appendChild(message);

    // Creates form to update comment or reply
    if (post.user.username === currentUser.username) {
      const updateForm = document.createElement("form");
      updateForm.classList.add("new-comment");
      updateForm.classList.add("new-comment--update");

      const updateInput = document.createElement("textarea");
      updateInput.classList.add("new-comment__input");
      updateInput.value = `@${post.replyingTo} ${post.content}`;
      updateForm.appendChild(updateInput);

      const updateSend = document.createElement("button");
      updateSend.classList.add("btn");
      updateSend.classList.add("new-comment__send");
      updateSend.classList.add("new-comment__send--update");
      updateSend.innerText = "UPDATE";
      updateForm.appendChild(updateSend);

      container.appendChild(updateForm);
    }

    // Creates form to vote on comment or reply
    const vote = document.createElement("form");
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

    // Creates CRUD buttons
    const CRUD = document.createElement("div");
    CRUD.classList.add("CRUD-container");
    if (type === "reply") {
      CRUD.classList.add("CRUD-container--reply");
    }
    container.appendChild(CRUD);

    function createCRUDbtn(type) {
      const btn = document.createElement("button");
      btn.classList.add("CRUD");
      btn.classList.add(`CRUD--${type}`);
      CRUD.appendChild(btn);

      const btnIcon = document.createElement("img");
      btnIcon.classList.add("CRUD__icon");
      btnIcon.classList.add(`CRUD__icon--${type}`);
      btnIcon.src = `./images/icon-${type}.svg`;
      btn.appendChild(btnIcon);

      const btnTxt = document.createElement("span");
      btnTxt.classList.add("CRUD__text");
      btnTxt.classList.add(`CRUD__text--${type}`);
      btnTxt.innerText = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
      btn.appendChild(btnTxt);

      return btn;
    }

    if (post.user.username === currentUser.username) {
      CRUD.appendChild(createCRUDbtn("delete"));
      CRUD.appendChild(createCRUDbtn("edit"));
    } else {
      CRUD.appendChild(createCRUDbtn("reply"));
    }

    return container;
  }

  function createReplyForm(type) {
    const replyForm = document.createElement("form");
    replyForm.classList.add("new-comment");
    replyForm.classList.add("new-comment--reply");

    if (type === "reply") {
      replyForm.classList.add("new-comment--replytoreply");
    } else {
      type = null;
    }

    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.classList.add("avatar--new-reply");
    avatar.src = currentUser.image.png;
    avatar.alt = post.user.username;
    replyForm.appendChild(avatar);

    const replyInput = document.createElement("textarea");
    replyInput.classList.add("new-comment__input");
    replyInput.placeholder = "...Add a reply";
    replyForm.appendChild(replyInput);

    const replySend = document.createElement("button");
    replySend.classList.add("btn");
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
      if (post.replies[reply].user.username !== currentUser.username) {
        replyCont.appendChild(createReplyForm("reply"));
      }
    }

    if (post.user.username !== currentUser.username) {
      container.appendChild(createReplyForm());
    }

    const replyWrapper = document.getElementsByClassName("reply-wrapper")[0];
    replyWrapper.style.gridTemplateRows = `repeat(${replyWrapper.childElementCount}, auto)`;
  } else {
    container.appendChild(postCont("comment"));
    if (post.user.username !== currentUser.username) {
      container.appendChild(createReplyForm());
    }
  }
}

const container = {
  replies: document.querySelectorAll(".comment--reply:not(.comment--you)"),
  comments: document.querySelectorAll(
    ".comment:not(.comment--you):not(.comment--reply)"
  ),
  userComments: document.getElementsByClassName("comment--you"),
  modal: document.getElementsByClassName("modal__btn-box--cancel")[0],
  form: {
    comment: document.querySelector(
      ".new-comment:not(.new-comment--reply):not(.new-comment--update)"
    ),
  },
};

const CRUD = {
  edit: document.getElementsByClassName("CRUD--edit"),
  delete: document.getElementsByClassName("CRUD--delete"),
  reply: document.getElementsByClassName("CRUD--reply"),
};

// TOGGLES

// Toggles edit mode
for (let x = 0; x < container.userComments.length; x++) {
  const comment = container.userComments[x];
  const editBtn = document.getElementsByClassName("CRUD--edit")[x];

  editBtn.addEventListener("click", () => {
    if (!comment.classList.contains("comment--edit")) {
      comment.classList.add("comment--edit");
    } else {
      comment.classList.remove("comment--edit");
    }
  });
}

// Toggles reply form for Comments
for (let x = 0; x < container.comments.length; x++) {
  const replyForm = document.querySelectorAll(
    ".new-comment--reply:not(.new-comment--replytoreply)"
  )[x];
  const replyBtn = document.querySelectorAll(
    ".CRUD-container:not(.CRUD-container--reply) > .CRUD--reply"
  )[x];

  replyBtn.addEventListener("click", () => {
    if (replyForm.style.display === "") {
      replyForm.style.display = "grid";
    } else {
      replyForm.style.display = "";
    }
  });
}

// Toggles reply form for Replies
for (let x = 0; x < container.replies.length; x++) {
  const replyForm = document.getElementsByClassName(
    "new-comment--replytoreply"
  )[x];
  const replyBtn = document.querySelectorAll(
    ".CRUD-container--reply > .CRUD--reply"
  )[x];

  replyBtn.addEventListener("click", () => {
    if (replyForm.style.display === "") {
      replyForm.style.display = "grid";
    } else {
      replyForm.style.display = "";
    }
  });
}

// Toggles delete modal
for (let x = 0; x < CRUD.delete.length; x++) {
  const deleteBtn = CRUD.delete[x];
  const deleteModal = document.getElementsByClassName("modal")[0];

  deleteBtn.addEventListener("click", () => {
    if (
      deleteModal.style.display === "none" ||
      deleteModal.style.display === ""
    ) {
      deleteModal.style.display = "flex";
    }
  });
}

// Closes delete modal
container.modal.addEventListener("click", () => {
  const deleteModal = document.getElementsByClassName("modal")[0];
  if (deleteModal.style.display === "flex") {
    deleteModal.style.display = "none";
  }
});

// CRUD

// NEW COMMENT
container.form.comment.addEventListener("submit", (e) => {
  e.preventDefault();

  const { comments, currentUser } = data;

  const newComment = {
    content: document.querySelector(
      ".new-comment:not(.new-comment--reply):not(.new-comment--update) > .new-comment__input"
    ).value,
    createdAt: "TEST",
    id: null,
    replies: {},
    score: 0,
    user: {
      image: {
        png: currentUser.image.png,
        webp: currentUser.image.webp,
      },
      username: currentUser.username,
    }
  };

  let lastComment;
  if (comments[comments.length - 1].replies.length > 0) {
    lastComment =
      comments[comments.length - 1].replies[
        comments[comments.length - 1].replies.length - 1
      ];
  } else {
    lastComment = comments[comments.length - 1];
  }
  newComment.id = lastComment.id + 1;

  comments[newComment.id] = newComment

  
});
