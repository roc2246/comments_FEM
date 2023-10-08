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

function createPost(type) {
  const container = document.createElement("div");
  container.classList.add("comment");

  const content = {
    avatar: childElement.avatar(type),
    username: childElement.username(type, stats.users.currentUser[0]),
    createdAt: childElement.createdAt(type),
    content: childElement.content(type),
    updateForm: childElement.updateForm(type),
    vote: childElement.vote(type),
    CRUD: childElement.CRUD(type, stats.users.currentUser[0]),
  };

  if (content.content.childElementCount === 2) {
    container.classList.add("comment--reply");
  }

  for (let x in content) {
    container.appendChild(content[x]);
  }

  return container;
}

function createReplyWrapper() {
  const replyWrapper = document.createElement("div");
  const replyHR = document.createElement("hr");

  replyWrapper.classList.add("reply-wrapper");
  replyHR.classList.add("reply-wrapper__ruler");
  replyWrapper.appendChild(replyHR);

  return replyWrapper;
}

// GENERATES COMMENTS
fetchData()
  .then(({ comments, currentUser }) => {
    // Sets stats.user property
    stats.users = { comments, currentUser };

    const commentContainer = document.getElementById("comment-wrapper");
    for (let comment in comments) {
      commentContainer.appendChild(createPost(comments[comment]));

      const replies = comments[comment].replies;
      if (replies.length !== 0) {
        const replyContainer = createReplyWrapper();
        for (let reply in replies) {
          replyContainer.appendChild(createPost(replies[reply]));
        }
        replyContainer.style.gridTemplateRows = `repeat(${(replyContainer.childElementCount - 1)}, auto)`;
        commentContainer.appendChild(replyContainer);
      }
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

const forms = {
  newComment: document.querySelector(
    ".new-comment:not(.new-comment--reply):not(.new-comment--update)"
  ),
  newReply: document.getElementsByClassName("new-comment--reply"),
};