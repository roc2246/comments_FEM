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
        if (currentUser[0].username === source.user.username) {
          postContainer.append(newComment.updateForm);
        }
  
        // adds reply class to crud container
        if (type === "reply") {
          newComment.CRUD.classList.add("CRUD-container--reply");
        }
  
        // Adds CRUD functionality
        CRUDFunction.delete(postContainer);
  
        return postContainer;
      }
  
      // CRUD - DOM MANIPULATION
      // CRUD - DOM MANIPULATION - NEW COMMENT
      container.form.comment.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const { comments, currentUser } = data;
        const content = document.querySelector(selectors.input.comment).value;
  
        const newComment = {
          id: generateID(),
          content: content,
          createdAt: "TEST",
          score: 0,
          user: {
            image: {
              png: currentUser[0].image.png,
              webp: currentUser[0].image.webp,
            },
            username: currentUser[0].username,
          },
          replies: [],
        };
  
        // Adds comment in data
        httpRequest.post(newComment);
        comments.push(newComment);
  
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
                png: currentUser[0].image.png,
                webp: currentUser[0].image.webp,
              },
              username: currentUser[0].username,
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
          // comments[x].replies[comments[x].replies.length + 1].push(newReply);
          httpRequest.post(newReply)
        });
      }
  
      //  CRUD - DOM MANIPULATION - NEW REPLY TO REPLY
      for (let x = 0; x < container.form.replyToReply.length; x++) {
        container.form.replyToReply[x].addEventListener("submit", (e) => {
          e.preventDefault();
  
          const { comments, currentUser } = data;
          const replyTo = container.input.replyReplyTo[x].innerText;
          const parentUser = container.input.replyReplyTo[x].parentElement.parentElement.previousElementSibling.childNodes[1].innerText
          const content = container.input.replyToReplyContent[x].value;
          console.log(parentUser)
  
          const newReply = {
            id: generateID(),
            content: content,
            createdAt: "TEST",
            replyingTo: replyTo,
            parentUser: parentUser,
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
  
          httpRequest.post(newReply)
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
  
          // Sets id of updated comment
          let id
          for(let x in comments){
            if (oldContent.innerText ===comments[x].content){
              id = comments[x].id
            } else {
              for(let y in comments[x].replies){
                if (oldContent.innerText ===comments[x].replies[y].content){
                  id = comments[x].replies[y].id
                }
              }
            }
          }
  
          // Stores new text for content
          const newContent = container.input.update[x].value;
  
          // Updates post in data
          httpRequest.update(id, {content: newContent});
  
          // Updates post in DOM
          oldContent.innerText = newContent;
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
  
      // VOTE - DOWNVOTE
      vote("downvote");