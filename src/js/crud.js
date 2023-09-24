import { childElement } from "./childElem";

export const toggles = {
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
  delete: function () {
    const deleteModal = document.getElementsByClassName("modal")[0];
    if (
      deleteModal.style.display === "none" ||
      deleteModal.style.display === ""
    ) {
      deleteModal.style.display = "flex";
    }
  },
};

export const stats = {
  users: null,
  generateID: function () {
    let IDarray = [];
    for (let id in this.users.comments) {
      IDarray.push(this.users.comments[id].id);
      if (this.users.comments[id].replies.length > 0) {
        for (let reply in this.users.comments[id].replies)
          IDarray.push(this.users.comments[id].replies[reply].id);
      }
    }
    const ID = Math.max(...IDarray) + 1;
    return ID;
  },
  replyCount: function (no, type) {
    let replyCont;
    if (type === "reply") {
      replyCont = container.form.reply[no].previousElementSibling;
    } else if (type === "replytoreply") {
      replyCont = container.form.replyToReply[no].parentElement;
    }
    return replyCont.childElementCount;
  },
};

export const CRUDFunction = {
  DELETE: function (source) {
    const comments = stats.users.comments;
    let content;

    const deleteBtn = source.childNodes[5].childNodes[0];
    deleteBtn.addEventListener("click", () => {
      toggles.delete()
      content = source.childNodes[3].innerText;
      // Sets post content
      if (source.childNodes[3].childNodes[1]) {
        content = source.childNodes[3].childNodes[1].innerText;
      } else {
        content = source.childNodes[3].childNodes[0].innerText;
      }
    });

   

    const deleteComment = document.getElementsByClassName(
      "modal__btn-box--delete"
    )[0];
    deleteComment.addEventListener("click", () => {
      const comment = document.getElementsByClassName("comment");

      let id;
      for (let x in comments) {
        if (content === comments[x].content) {
          id = comments[x].id;
      console.log(id)
          break;
        } else {
          for (let y in comments[x].replies) {
            if (content === comments[x].replies[y].content) {
              id = comments[x].replies[y].id;
              break;
            }
          }
        }
      }

      // Deletes post in data
      if (id !== undefined) {
        // Deletes post in DOM
        for (let x in comment) {
          if (source === comment[x]) {
            comment[x].remove();
            break;
          }
        }

        for (let i = 0; i < stats.users.comments.length; i++) {
          if (stats.users.comments[i].id === id) {
            stats.users.comments.splice(i, 1); // Remove the object at index i
            break; // Stop searching after removal
          }
        }

        httpRequest.delete(id);
      }
    });
  },
  POST: function (type, source) {
    const { currentUser } = stats.users;

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
      avatar: childElement.avatar(source),
      username: childElement.username(source, currentUser[0]),
      createdAt: childElement.createdAt(source),
      content: childElement.content(source),
      updateForm: childElement.updateForm(source),
      vote: childElement.vote(source),
      CRUD: childElement.CRUD(source, currentUser[0]),
    };
    for (let ele in newComment) {
      postContainer.append(newComment[ele]);
    }
    if (currentUser[0].username === source.user.username) {
      postContainer.append(newComment.updateForm);
    }

    // adds reply class to crud container
    if (type === "reply") {
      newComment.CRUD.classList.add("CRUD-container--reply");
    }

    // Adds CRUD functionality
    CRUDFunction.DELETE(postContainer);

    return postContainer;
  },
};

export const httpRequest = {
  update: function (id, update) {
    fetch(`http://localhost:3000/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // You may need to adjust the content type based on your application's needs
      },
      body: JSON.stringify(update), // If you have data to send in the request, it needs to be converted to a JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // If you expect JSON data in the response
      })
      .then((data) => {
        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  vote: function (scoreContianer, mode) {
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
  post: function (src) {
    const postData = src;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };
    // Possible put id here to insert new replies and replytoreplies to database
    fetch("http://localhost:3000/newPost", params).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
  },
  delete: function (id) {
    const options = {
      method: "DELETE", // Use the DELETE HTTP method
      headers: {
        "Content-Type": "application/json", // Set the content type if needed
        // You may also need to include authentication headers or other headers here
      },
    };

    // Send the DELETE request
    fetch(`http://localhost:3000/delete/${id}`, options)
      .then((response) => {
        if (response.ok) {
          // Resource successfully deleted
          console.log("Resource deleted successfully");
        } else {
          // Handle error cases here
          console.error("Error deleting resource");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  },
};
