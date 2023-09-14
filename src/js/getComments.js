import { element } from "./childElem";
import { CRUDFunction, toggle} from "./crud"

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
  .then((data) => {
    const { comments, currentUser } = data;
    for (let comment in comments) {
      const container = document.getElementById("comment-wrapper");
      const post = comments[comment];

      // sets current user's avatar in new comment form
      const newCommentAvatar = document.querySelector(".avatar--new-comment");
      newCommentAvatar.src = currentUser[0].image.png;

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
          username: element.username(post, currentUser),
          createdAt: element.createdAt(post),
          content: element.content(post),
          updateForm: element.updateForm(post),
          vote: element.vote(post),
          CRUD: element.CRUD(post, currentUser),
        };
        for (let ele in newComment) {
          if (newComment[ele] !== newComment.updateForm) {
            container.append(newComment[ele]);
          }
        }
        if (currentUser[0].username === post.user.username) {
          container.append(newComment.updateForm);
          container.classList.add("comment--you");
        }

        // adds other classes if post is reply
        if (type === "reply") {
          newComment.CRUD.classList.add("CRUD-container--reply");
        }

        // Adds CRUD functionality
        if (currentUser[0].username === post.user.username) {
          CRUDFunction.delete(container);
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
        avatar.src = currentUser[0].image.png;
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
          if (post.replies[reply].user.username !== currentUser[0].username) {
            replyCont.appendChild(createReplyForm("reply"));
          }
        }

        // Generates hr hight for reply container
        replyCont.style.gridTemplateRows = `repeat(${replyCont.childElementCount}, auto)`;

        // Generates reply forms
        if (post.user.username !== currentUser[0].username) {
          container.appendChild(createReplyForm());
        }
      } else {
        container.appendChild(postCont("comment"));
        if (post.user.username !== currentUser[0].username) {
          container.appendChild(createReplyForm());
        }
      }
    }
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error("There was a problem with the fetch operation:", error);
  });
