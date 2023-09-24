import { childElement } from "./childElem";
import { CRUDFunction, stats, toggles, httpRequest } from "./crud";

// GET NEW COMMENT IN DOM FIXED

async function fetchData() {
  try {
    // Define an object with key-value pairs where keys represent labels and values are URLs
    const urlMap = {
      comments: "http://localhost:3000/comments",
      currentUser: "http://localhost:3000/currentUser",
    };

    // Create an array of Promises for fetch requests using Object.entries()
    const promises = Object.entries(urlMap).map(async ([key, url]) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request for ${url} failed`);
      }
      return { [key]: await response.json() }; // Store the result with a key
    });

    // Use Promise.all() to wait for all Promises to resolve
    const results = await Promise.all(promises);

    // Combine the results into a single object
    const combinedResults = results.reduce((acc, result) => {
      return { ...acc, ...result };
    }, {});

    return combinedResults;
  } catch (error) {
    console.error("Error:", error);
  }
}

// GENERATES COMMENTS
fetchData()
  .then(({ comments, currentUser }) => {
    // Sets stats.user property
    stats.users = { comments, currentUser };

    for (let comment in comments) {
      const container = document.getElementById("comment-wrapper");

      // sets current user's avatar in new comment form
      const newCommentAvatar = document.querySelector(".avatar--new-comment");
      newCommentAvatar.src = currentUser[0].image.png;

      // function for generating comments and replies
      function postCont(type, counter) {
        const postContainer = document.createElement("div");
        postContainer.classList.add("comment");

        // sets the type of post (i.e; reply, comment, etc.)
        let post;
        if (type === "reply") {
          postContainer.classList.add("comment--reply");
          post = comments[comment].replies[counter];
        } else if (type === "comment") {
          post = comments[comment];
          counter = null;
        }

        // creates child elements for post
        const newComment = {
          avatar: childElement.avatar(post),
          username: childElement.username(post, currentUser[0]),
          createdAt: childElement.createdAt(post),
          content: childElement.content(post),
          updateForm: childElement.updateForm(post),
          vote: childElement.vote(post),
          CRUD: childElement.CRUD(post, currentUser[0]),
        };
        for (let ele in newComment) {
          if (newComment[ele] !== newComment.updateForm) {
            postContainer.append(newComment[ele]);
          }
        }
        if (currentUser[0].username === post.user.username) {
          postContainer.append(newComment.updateForm);
          postContainer.classList.add("comment--you");

          newComment.updateForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const input = newComment.updateForm.childNodes[0].value
             
            for (let x in comments) {
              if (comments[x].content === newComment.content) {
                newComment.content = input;
              } else {
                for (let y in comments[x].replies)
                if (comments[x].replies[y].content === newComment.content.childNodes[1].innerText){
                  console.log("match")
                }
                 
              }
            }
          });
        }

        // adds other classes if post is reply
        if (type === "reply") {
          newComment.CRUD.classList.add("CRUD-container--reply");
        }

        // Adds CRUD functionality
        if (currentUser[0].username === post.user.username) {
          const editFormToggle = postContainer.childNodes[5].childNodes[1];
          editFormToggle.addEventListener("click", () =>
            toggles.edit(postContainer)
          );

          const deleteModalToggle = postContainer.childNodes[5].childNodes[0];
          const deleteModal = document.getElementsByClassName("modal")[0];
          deleteModalToggle.addEventListener("click", () =>
            toggles.delete(deleteModal)
          );

          CRUDFunction.DELETE(postContainer);
        }

        return postContainer;
      }

      // function for creating reply form
      function createReplyForm(type) {
        const replyForm = document.createElement("form");
        replyForm.classList.add("new-comment");
        replyForm.classList.add("new-comment--reply");

        // sets extra class if form is for a reply to reply
        if (type === "replytoreply") {
          replyForm.classList.add("new-comment--replytoreply");
        } else if ((type = "reply")) {
          type = null;
        }

        const avatar = document.createElement("img");
        avatar.classList.add("avatar");
        avatar.classList.add("avatar--new-reply");
        avatar.src = currentUser[0].image.png;
        avatar.alt = comments[comment].user.username;
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

        // Reply Form
        replyForm.addEventListener("submit", (e) => {
          e.preventDefault();

          // Sets content and ReplyTo
          let replyTo = replyForm.previousSibling;
          const isWrapper = replyTo.classList.contains("reply-wrapper");
          const content = replyForm.childNodes[1].value;
          !isWrapper
            ? (replyTo = replyTo.childNodes[1].innerText)
            : (replyTo = replyTo.previousSibling.childNodes[1].innerText);

          const newReply = {
            id: stats.generateID(),
            content: content,
            createdAt: "TEST",
            replyingTo: replyTo,
            replies: {},
            score: 0,
            user: {
              image: {
                png: currentUser[0].image.png,
                webp: currentUser[0].image.webp,
              },
              username: currentUser[0].username,
            },
          };

          if (comments[comment].replies.length === 0) {
            // Creates container for replies
            const commentCont = replyForm.previousSibling;
            const replyCont = document.createElement("div");
            replyCont.classList.add("reply-wrapper");
            const hr = document.createElement("hr");
            hr.classList.add("reply-wrapper__ruler");
            replyCont.appendChild(hr);
            commentCont.insertAdjacentElement("afterend", replyCont);

            // Adds reply in data
            comments[comment].replies[newReply.id] = newReply;

            // Adds reply in DOM
            replyCont.appendChild(CRUDFunction.POST("reply", newReply));

            // Adds delete functionality to reply
            CRUDFunction.DELETE(CRUDFunction.POST("reply", newReply));
          } else {
            comments[comment].replies[newReply.id] = newReply;

            const replyWrapper = replyForm.previousElementSibling;
            replyWrapper.appendChild(CRUDFunction.POST("reply", newReply));
          }

          httpRequest.post(newReply);
        });
        // END REPLY FORM

        return replyForm;
      }

      // Generates comments
      if (comments[comment].replies.length > 0) {
        container.appendChild(postCont("comment"));

        // Creates container for replies
        const replyCont = document.createElement("div");
        replyCont.classList.add("reply-wrapper");
        const hr = document.createElement("hr");
        hr.classList.add("reply-wrapper__ruler");
        replyCont.appendChild(hr);
        container.appendChild(replyCont);

        // Generates replies
        for (let reply in comments[comment].replies) {
          replyCont.appendChild(postCont("reply", reply));
          if (
            comments[comment].replies[reply].user.username !==
            currentUser[0].username
          ) {
            const replyForm = createReplyForm("replytoreply");
            replyCont.appendChild(replyForm);
            const replyBtn =
              replyForm.previousElementSibling.childNodes[5].childNodes[0];
            replyBtn.addEventListener("click", () => toggles.reply(replyForm));
          }
        }

        // Generates hr height for reply container
        replyCont.style.gridTemplateRows = `repeat(${replyCont.childElementCount}, auto)`;

        // Generates reply forms
        if (comments[comment].user.username !== currentUser[0].username) {
          const replyForm = createReplyForm("reply");
          container.appendChild(replyForm);
          const replyBtn =
            document.getElementsByClassName("CRUD--reply")[comment];
          replyBtn.addEventListener("click", () => toggles.reply(replyForm));
        }
      } else if (comments[comment].replies.length === 0) {
        container.appendChild(postCont("comment"));
        if (comments[comment].user.username !== currentUser[0].username) {
          const replyForm = createReplyForm("reply");
          container.appendChild(replyForm);
          const replyBtn =
            document.getElementsByClassName("CRUD--reply")[comment];
          replyBtn.addEventListener("click", () => toggles.reply(replyForm));
        }
      }
    }
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error("There was a problem with the fetch operation:", error);
  });

const forms = {
  newComment: document.querySelector(
    ".new-comment:not(.new-comment--reply):not(.new-comment--update)"
  ),
  newReply: document.getElementsByClassName("new-comment--reply"),
};

forms.newComment.addEventListener("submit", (e) => {
  e.preventDefault();

  const newComment = {
    id: stats.generateID(),
    content: document.getElementById("new-comment-input").value,
    createdAt: "TEST",
    score: 0,
    user: {
      image: {
        png: stats.users.currentUser[0].image.png,
        webp: stats.users.currentUser[0].image.webp,
      },
      username: stats.users.currentUser[0].username,
    },
    replies: [],
  };

  // Adds comment in data
  httpRequest.post(newComment);
  stats.users.comments.push(newComment);

  // Adds comment in DOM
  const wrapper = document.getElementById("comment-wrapper");
  wrapper.appendChild(CRUDFunction.POST("comment", newComment));
});
