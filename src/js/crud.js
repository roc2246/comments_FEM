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
  delete: function (container) {
    if (
      container.style.display === "none" ||
      container.style.display === ""
    ) {
      container.style.display = "flex";
    }
  },
};

 export const CRUDFunction = {
    delete: function (source) {
      let chosen;
      let content;
      const deleteBtn = source.childNodes[5].childNodes[0];
      const deleteModal = document.getElementsByClassName("modal")[0];
      const deleteComment = document.getElementsByClassName(
        "modal__btn-box--delete"
      )[0];

      deleteBtn.addEventListener("click", () => {
        toggles.delete(deleteModal);

        chosen = source.childNodes[3];
        // Sets post content
        if (chosen.childNodes[1]) {
          content = chosen.childNodes[1].innerText;
        } else {
          content = chosen.childNodes[0].innerText;
        }
      });

      deleteComment.addEventListener("click", () => {
        const comment = document.getElementsByClassName("comment");

        let id;
        for (let x in source) {
          if (content === source[x].content) {
            id = source[x].id;
            break;
          } else {
            for (let y in source[x].replies) {
              if (content === source[x].replies[y].content) {
                id = source[x].replies[y].id;
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

          for (let i = 0; i < comments.length; i++) {
            if (comments[i].id === id) {
              comments.splice(i, 1); // Remove the object at index i
              break; // Stop searching after removal
            }
          }

          httpRequest.delete(id);
        }
      });
    },
  };