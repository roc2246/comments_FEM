// DELETE ONCE DATA IS ON SERVER
import data from "./data.json";

// GENERATES CHILD ELEMENTS FOR POSTS
const element = {
  content: function (source) {
    const content = document.createElement("p");
    content.classList.add("comment__content");
    const message = document.createElement("span");
    message.innerText = source.content;
    message.classList.add("comment__message");

    if (source.replyingTo !== undefined) {
      const replyingTo = document.createElement("span");
      replyingTo.innerText = `@${source.replyingTo} `;
      replyingTo.classList.add("comment__replyingTo");
      content.appendChild(replyingTo);
    }
    content.appendChild(message);

    return content;
  },
  createdAt: function (source) {
    const createdAt = document.createElement("span");
    createdAt.classList.add("comment__createdAt");
    createdAt.innerText = source.createdAt;
    return createdAt;
  },
  vote: function (source) {
    const vote = document.createElement("form");
    vote.classList.add("vote");

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
    score.innerText = source.score;
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

    return vote;
  },
  avatar: function (source) {
    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.classList.add("avatar--comment");
    avatar.src = source.user.image.png;
    avatar.alt = source.user.username;
    return avatar;
  },
  username: function (source) {
    const { currentUser } = data;

    const username = document.createElement("span");
    username.classList.add("username");

    if (source.user.username === currentUser.username) {
      username.classList.add("username--you");
      const name = document.createElement("span");
      name.classList.add("username__name");
      name.innerText = source.user.username;
      username.appendChild(name);

      const indicator = document.createElement("span");
      indicator.classList.add("username__you");
      indicator.innerText = "you";
      username.appendChild(indicator);
    } else {
      username.innerText = source.user.username;
    }
    return username;
  },
  updateForm: function (source) {
    const updateForm = document.createElement("form");
    updateForm.classList.add("new-comment");
    updateForm.classList.add("new-comment--update");

    const updateInput = document.createElement("textarea");
    updateInput.classList.add("new-comment__input");
    if (source.replyingTo !== undefined) {
      updateInput.value = `@${source.replyingTo} ${source.content}`;
    } else {
      updateInput.value = `${source.content}`;
    }
    updateForm.appendChild(updateInput);

    const updateSend = document.createElement("button");
    updateSend.classList.add("btn");
    updateSend.classList.add("new-comment__send");
    updateSend.classList.add("new-comment__send--update");
    updateSend.innerText = "UPDATE";
    updateForm.appendChild(updateSend);

    return updateForm;
  },
  CRUD: function (source) {
    const { currentUser } = data;

    const CRUD = document.createElement("div");
    CRUD.classList.add("CRUD-container");

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
    if (source.user.username === currentUser.username) {
      CRUD.appendChild(createCRUDbtn("delete"));
      CRUD.appendChild(createCRUDbtn("edit"));
    } else {
      CRUD.appendChild(createCRUDbtn("reply"));
    }
    return CRUD;
  },
};

// COMMENT GENERATION
for (let comment in data.comments) {
  const container = document.getElementById("comment-wrapper");
  const { currentUser, comments } = data;
  const post = comments[comment];

  // sets current user's avatar in new comment form
  const newCommentAvatar = document.querySelector(".avatar--new-comment");
  newCommentAvatar.src = currentUser.image.png;

  // function for generating comments and replies
  function postCont(type, counter) {
    const container = document.createElement("div");
    container.classList.add("comment");

    // sets the type of post (i.e; reply, comment, etc.)
    let post;
    if (type === "reply") {
      container.classList.add("comment--reply");
      post = comments[comment].replies[counter];
    } else if (type === "comment") {
      post = comments[comment];
      counter = null;
    }

    // creates child elements for post
    const newComment = {
      avatar: element.avatar(post),
      username: element.username(post),
      createdAt: element.createdAt(post),
      content: element.content(post),
      updateForm: element.updateForm(post),
      vote: element.vote(post),
      CRUD: element.CRUD(post),
    };
    for (let ele in newComment) {
      if (newComment[ele] !== newComment.updateForm) {
        container.append(newComment[ele]);
      }
    }
    if (currentUser.username === post.user.username) {
      container.append(newComment.updateForm);
      container.classList.add("comment--you");
    }

    // adds other classes if post is reply
    if (type === "reply") {
      newComment.CRUD.classList.add("CRUD-container--reply");
    }

    return container;
  }

  // function for creating reply form
  function createReplyForm(type) {
    const replyForm = document.createElement("form");
    replyForm.classList.add("new-comment");
    replyForm.classList.add("new-comment--reply");

    // sets extra class if form is for a reply to reply
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

  // Generates comments
  if (post.replies.length > 0) {
    container.appendChild(postCont("comment"));

    // Creates container for replies
    const replyCont = document.createElement("div");
    replyCont.classList.add("reply-wrapper");
    const hr = document.createElement("hr");
    hr.classList.add("reply-wrapper__ruler");
    replyCont.appendChild(hr);
    container.appendChild(replyCont);

    // Generates replies
    for (let reply in post.replies) {
      replyCont.appendChild(postCont("reply", reply));
      if (post.replies[reply].user.username !== currentUser.username) {
        replyCont.appendChild(createReplyForm("reply"));
      }
    }

    // Generates hr hight for reply container
    replyCont.style.gridTemplateRows = `repeat(${replyCont.childElementCount}, auto)`;

    // Generates reply forms
    if (post.user.username !== currentUser.username) {
      container.appendChild(createReplyForm());
    }
  } else {
    container.appendChild(postCont("comment"));
    if (post.user.username !== currentUser.username) {
      container.appendChild(createReplyForm());
    }
  }
}

// CONTAINERS

// CONTAINERS - DOM SELECTORS
const selectors = {
  reply: ".comment--reply:not(.comment--you)",
  comment: ".comment:not(.comment--you):not(.comment--reply)",
  form: {
    comment: ".new-comment:not(.new-comment--reply):not(.new-comment--update)",
    reply: ".new-comment--reply:not(.new-comment--replytoreply)",
    replyToReply: ".new-comment--replytoreply",
    update: ".new-comment--update",
  },
  btn: {
    reply: ".CRUD-container:not(.CRUD-container--reply) > .CRUD--reply",
    replyToReply: ".CRUD-container--reply > .CRUD--reply",
    deleteComment: "modal__btn-box--delete",
  },
  input: {
    comment:
      ".new-comment:not(.new-comment--reply):not(.new-comment--update) > .new-comment__input",
    reply:
      ".new-comment--reply:not(.new-comment--replytoreply)> .new-comment__input",
    replyToReply: ".new-comment--replytoreply> .new-comment__input",
    replyTo: ".comment:not(.comment--reply) > .username",
    replyReplyTo: ".comment--reply:not(.comment--replytoreply) > .username",
    update: ".new-comment--update > .new-comment__input",
  },
};

// CONTAINERS - ELEMENTS
const container = {
  replies: document.querySelectorAll(selectors.reply),
  comments: document.querySelectorAll(selectors.comment),
  userComments: document.getElementsByClassName("comment--you"),
  modal: document.getElementsByClassName("modal__btn-box--cancel")[0],
  btn: {
    deleteComment: document.getElementsByClassName("modal__btn-box--delete")[0],
  },
  form: {
    comment: document.querySelector(selectors.form.comment),
    reply: document.querySelectorAll(selectors.form.reply),
    replyToReply: document.querySelectorAll(selectors.form.replyToReply),
    update: document.querySelectorAll(selectors.form.update),
  },
  input: {
    replyTo: document.querySelectorAll(selectors.input.replyTo),
    replyReplyTo: document.querySelectorAll(selectors.input.replyReplyTo),
    replyContent: document.querySelectorAll(selectors.input.reply),
    replyToReplyContent: document.querySelectorAll(
      selectors.input.replyToReply
    ),
    update: document.querySelectorAll(selectors.input.update),
  },
};

// CONTAINERS - CRUD BUTTONS
const CRUD = {
  edit: document.getElementsByClassName("CRUD--edit"),
  delete: document.getElementsByClassName("CRUD--delete"),
  reply: document.getElementsByClassName("CRUD--reply"),
};

// METHODS

// METHODS - HTTP REQUESTS
const httpRequest = {
  delete: function (content) {
    const { comments } = data;
    for (let x in comments) {
      if (content === comments[x].content) {
        delete comments[x];
      } else {
        for (let y in comments[x].replies) {
          if (content === comments[x].replies[y].content) {
            delete comments[x].replies[y];
          }
        }
      }
    }
  },
  update: function (oldContent, newContent) {
    for (let x in comments) {
      if (comments[x].content === oldContent.innerText) {
        comments[x].content = newContent;
      } else {
        for (let y in comments[x].replies) {
          if (comments[x].replies[y].content === oldContent.innerText) {
            comments[x].replies[y].content = newContent;
          }
        }
      }
    }
  },
  vote: function (scoreContianer, mode) {
    const { comments } = data;
    const postContainer = scoreContianer.parentElement.parentElement;
    let content;
    let change;
    let score = scoreContianer.innerText;
    mode === "upvote" ? (change = score++) : (change = score--);
    if (postContainer.childNodes[3].childNodes[1]) {
      content = postContainer.childNodes[3].childNodes[1];
    } else {
      content = postContainer.childNodes[3];
    }
    for (let x in comments) {
      if (comments[x].content === content) {
        comments[x].score = change;
      } else {
        for (let y in comments[x].replies[y]) {
          const reply = comments[x].replies[y];
          if ((reply.content = content)) {
            reply.score = change;
          }
        }
      }
    }
  },
};

// METHODS - BUTTON TOGGLES
const toggles = {
  comments: data.comments,
  edit: function (container) {
    if (!container.classList.contains("comment--edit")) {
      container.classList.add("comment--edit");
    } else {
      container.classList.remove("comment--edit");
    }
  },
  reply: function (container) {
    if (container.style.display === "") {
      container.style.display = "grid";
    } else {
      container.style.display = "";
    }
  },
  delete: function (container) {
    if (container.style.display === "none" || container.style.display === "") {
      container.style.display = "flex";
    }
  },
};

// TOGGLES

// TOGGLES - EDIT MODE
for (let x = 0; x < container.userComments.length; x++) {
  const comment = container.userComments[x];
  const editBtn = CRUD.edit[x];

  editBtn.addEventListener("click", () => {
    toggles.edit(comment);
  });
}

// TOGGLES - COMMENT REPLY
for (let x = 0; x < container.comments.length; x++) {
  const replyForm = document.querySelectorAll(selectors.form.reply)[x];
  const replyBtn = document.querySelectorAll(selectors.btn.reply)[x];

  replyBtn.addEventListener("click", () => {
    toggles.reply(replyForm);
  });
}

// TOGGLES - REPLY TO REPLY
for (let x = 0; x < container.replies.length; x++) {
  const replyForm = document.querySelectorAll(selectors.form.replyToReply)[x];
  const replyBtn = document.querySelectorAll(selectors.btn.replyToReply)[x];

  replyBtn.addEventListener("click", () => {
    toggles.reply(replyForm);
  });
}

// TOGGLES - OPEN DELETE MODAL
for (let x = 0; x < CRUD.delete.length; x++) {
  const deleteBtn = CRUD.delete[x];
  const deleteModal = document.getElementsByClassName("modal")[0];

  deleteBtn.addEventListener("click", () => {
    toggles.delete(deleteModal);
  });
}

// TOGGLES - CLOSE DELETE MODAL
container.modal.addEventListener("click", () => {
  const deleteModal = document.getElementsByClassName("modal")[0];
  if (deleteModal.style.display === "flex") {
    deleteModal.style.display = "none";
  }
});

// CRUD

// CRUD - FUNCTIONS

// CRUD - FUNCTIONS - GET REPLY COUNT
function replyCount(no, type) {
  let replyCont;
  if (type === "reply") {
    replyCont = container.form.reply[no].previousElementSibling;
  } else if (type === "replytoreply") {
    replyCont = container.form.replyToReply[no].parentElement;
  }
  return replyCont.childElementCount;
}

// CRUD - FUNCTIONS - GENERATE ID
function generateID() {
  const { comments } = data;

  let IDarray = [];
  for (let id in comments) {
    IDarray.push(comments[id].id);
    if (comments[id].replies.length > 0) {
      for (let reply in comments[id].replies)
        IDarray.push(comments[id].replies[reply].id);
    }
  }
  const ID = Math.max(...IDarray) + 1;
  return ID;
}

// CRUD - FUNCTIONS - ADD FUNCTIONALITY
function addFunctionality(postContainer) {
  // Adds edit form toggle to new post
  const editBtn = postContainer.childNodes[5].childNodes[1];
  editBtn.addEventListener("click", () => {
    toggles.edit(postContainer);
  });

  // Adds delete modal toggle to new post
  const deleteBtn = postContainer.childNodes[5].childNodes[0];
  const deleteModal = document.getElementsByClassName("modal")[0];
  deleteBtn.addEventListener("click", () => {
    toggles.delete(deleteModal);
  });

  // Adds edit functionality to new post
  const editForm = postContainer.childNodes[6];
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newContent = editForm.childNodes[0].value;

    // Sets post content
    let oldContent;
    if (editForm.parentElement.childNodes[3].childNodes[1]) {
      oldContent = editForm.parentElement.childNodes[3].childNodes[1];
    } else {
      oldContent = editForm.parentElement.childNodes[3].childNodes[0];
    }

    // Updates post in DOM
    oldContent.innerText = newContent;

    // Updates post in data
    httpRequest.update(oldContent, newContent);
  });

  // Adds delete functionality to new post
  const deleteComment = container.btn.deleteComment;
  deleteComment.addEventListener("click", () => {
    const comment = document.getElementsByClassName("comment");

    // Deletes post in DOM
    for (let x in comment) {
      if (postContainer === comment[x]) {
        comment[x].remove();
      }
    }

    // Sets post content
    const chosen = deleteBtn.parentElement.parentElement;
    let content;
    if (chosen.childNodes[3].childNodes[1]) {
      content = chosen.childNodes[3].childNodes[1].innerText;
    } else {
      content = chosen.childNodes[3].childNodes[0].innerText;
    }

    // Deletes post in data
    httpRequest.delete(content);
  });

  // VOTE
  // VOTE - UPVOTE
  const upvote = postContainer.childNodes[4].childNodes[0];
  console.log(upvote);
  upvote.addEventListener("click", (e) => {
    e.preventDefault();

    // Changes score in DOM
    const scoreContianer = upvote.parentElement.childNodes[1];
    let score = scoreContianer.innerText;
    score++;
    scoreContianer.innerText = score;

    // Changes score in data
    httpRequest.vote(scoreContianer, "upvote");
  });

  // VOTE -DOWNVOTE
  const downvote = postContainer.childNodes[4].childNodes[2];
  downvote.addEventListener("click", (e) => {
    e.preventDefault();

    // Changes score in DOM
    const scoreContianer = downvote.parentElement.childNodes[1];
    let score = scoreContianer.innerText;
    score--;
    scoreContianer.innerText = score;

    // Changes score in data
    httpRequest.vote(scoreContianer, "downvote");
  });
}

// CRUD - FUNCTIONS - NEW POST
function newPost(type, source) {
  const { currentUser } = data;

  const postContainer = document.createElement("div");
  postContainer.classList.add("comment");

  // adds extra classes if post isn't a comment
  if (type === "reply") {
    postContainer.classList.add("comment--reply");
  } else if (type === "replytoreply") {
    postContainer.classList.add("comment--reply");
    postContainer.classList.add("comment--replytoreply");
  }
  postContainer.classList.add("comment--you");

  // generates child elements for new post
  const newComment = {
    avatar: element.avatar(source),
    username: element.username(source),
    createdAt: element.createdAt(source),
    content: element.content(source),
    updateForm: element.updateForm(source),
    vote: element.vote(source),
    CRUD: element.CRUD(source),
  };
  for (let ele in newComment) {
    if (newComment[ele] !== newComment.updateForm) {
      postContainer.append(newComment[ele]);
    }
  }
  if (currentUser.username === source.user.username) {
    postContainer.append(newComment.updateForm);
  }

  // adds reply class to crud container
  if (type === "reply") {
    newComment.CRUD.classList.add("CRUD-container--reply");
  }

  // adds CRUD funtionality to new post
  addFunctionality(postContainer);

  return postContainer;
}

// CRUD - DOM MANIPULATION
// CRUD - DOM MANIPULATION - NEW COMMENT
container.form.comment.addEventListener("submit", (e) => {
  e.preventDefault();

  const { comments, currentUser } = data;
  const content = document.querySelector(selectors.input.comment).value;

  const newComment = {
    content: content,
    createdAt: "TEST",
    id: generateID(),
    replies: {},
    score: 0,
    user: {
      image: {
        png: currentUser.image.png,
        webp: currentUser.image.webp,
      },
      username: currentUser.username,
    },
  };

  // Adds comment in data
  comments[newComment.id] = newComment;

  // Adds comment in DOM
  const wrapper = document.getElementById("comment-wrapper");
  wrapper.appendChild(newPost("comment", newComment));
});

// CRUD - DOM MANIPULATION - NEW REPLY
for (let x = 0; x < container.form.reply.length; x++) {
  container.form.reply[x].addEventListener("submit", (e) => {
    e.preventDefault();

    const { comments, currentUser } = data;
    const replyTo = container.input.replyTo[x].innerText;
    const content = container.input.replyContent[x].value;

    const newReply = {
      id: generateID(),
      content: content,
      createdAt: "TEST",
      replyingTo: replyTo,
      replies: {},
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
    };

    if (comments[x].replies.length === 0) {
      // Creates container for replies
      const replyCont = document.createElement("div");
      replyCont.classList.add("reply-wrapper");
      const hr = document.createElement("hr");
      hr.classList.add("reply-wrapper__ruler");
      replyCont.appendChild(hr);
      container.comments[x].insertAdjacentElement("afterend", replyCont);

      // Adds reply in data
      comments[x].replies[newReply.id] = newReply;

      // Adds reply in DOM
      replyCont.appendChild(newPost("reply", newReply));

      // Generates hr height for reply container
      replyCont.style.gridTemplateRows = `repeat(${replyCount(
        x,
        "reply"
      )}, auto)`;
    } else {
      comments[x].replies[newReply.id] = newReply;

      const replyWrapper = container.form.reply[x].previousElementSibling;
      replyWrapper.appendChild(newPost("reply", newReply));

      // Generates hr height for reply container
      replyWrapper.style.gridTemplateRows = `repeat(${replyCount(
        x,
        "reply"
      )}, auto)`;
    }
  });
}

//  CRUD - DOM MANIPULATION - NEW REPLY TO REPLY
for (let x = 0; x < container.form.replyToReply.length; x++) {
  container.form.replyToReply[x].addEventListener("submit", (e) => {
    e.preventDefault();

    const { comments, currentUser } = data;
    const replyTo = container.input.replyReplyTo[x].innerText;
    const content = container.input.replyToReplyContent[x].value;

    const newReply = {
      id: generateID(),
      content: content,
      createdAt: "TEST",
      replyingTo: replyTo,
      replies: {},
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
    };

    // Adds replytoreply in DOM
    const replyWrapper = container.form.replyToReply[x].parentNode;
    replyWrapper.appendChild(newPost("replytoreply", newReply));

    // Generates hr height for reply container
    replyWrapper.style.gridTemplateRows = `repeat(${replyCount(
      x,
      "replytoreply"
    )}, auto)`;

    // Adds replytoreply in data
    const parentComment =
      replyWrapper.previousSibling.childNodes[3].childNodes[0].innerText;
    for (let x in comments) {
      if (comments[x].content === parentComment) {
        const replies = comments[x].replies;
        replies[replies.length] = newReply;
      }
    }
  });
}

// CRUD - DOM MANIPULATION - UPDATE
for (let x = 0; x < container.form.update.length; x++) {
  container.form.update[x].addEventListener("submit", (e) => {
    e.preventDefault();

    // Sets post content
    let oldContent;
    if (
      container.input.update[x].parentElement.parentElement.childNodes[3]
        .childNodes[1]
    ) {
      oldContent =
        container.input.update[x].parentElement.parentElement.childNodes[3]
          .childNodes[1];
    } else {
      oldContent =
        container.input.update[x].parentElement.parentElement.childNodes[3]
          .childNodes[0];
    }

    // Stores new text for content
    const newContent = container.input.update[x].value;

    // Updates post in data
    httpRequest.update(oldContent, newContent);

    // Updates post in DOM
    oldContent.innerText = newContent;
  });
}

// CRUD - DOM MANIPULATION - DELETE
for (let x = 0; x < CRUD.delete.length; x++) {
  const deleteBtn = CRUD.delete[x];
  const deleteComment = container.btn.deleteComment;

  deleteBtn.addEventListener("click", () => {
    const chosen = deleteBtn.parentElement.parentElement;

    // Sets post content
    let content;
    if (chosen.childNodes[3].childNodes[1]) {
      content = chosen.childNodes[3].childNodes[1].innerText;
    } else {
      content = chosen.childNodes[3].childNodes[0].innerText;
    }

    // Adds delete functionality
    deleteComment.addEventListener("click", () => {
      const comment = document.getElementsByClassName("comment");

      // Deletes post in DOM
      for (let x in comment) {
        if (chosen === comment[x]) {
          comment[x].remove();
        }
      }

      // Deletes post in data
      httpRequest.delete(content);
    });
  });
}

// VOTE
// VOTE - FUNCTION
function vote(mode) {
  const vote = document.getElementsByClassName(`vote__btn--${mode}`);
  for (let x = 0; x < vote.length; x++) {
    vote[x].addEventListener("click", (e) => {
      e.preventDefault();

      // Changes score in DOM
      const scoreContianer = vote[x].parentElement.childNodes[1];
      let score = scoreContianer.innerText;
      mode === "upvote" ? score++ : score--;
      scoreContianer.innerText = score;

      // Changes score in data
      mode === "upvote"
        ? httpRequest.vote(scoreContianer, "upvote")
        : httpRequest.vote(scoreContianer, "downvote");
    });
  }
}

// VOTE - UPVOTE
vote("upvote");

// VOTE -DOWNVOTE
vote("downvote");
