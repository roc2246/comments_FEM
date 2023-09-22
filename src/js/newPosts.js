  
//       //  CRUD - DOM MANIPULATION - NEW REPLY TO REPLY
//       for (let x = 0; x < container.form.replyToReply.length; x++) {
//         container.form.replyToReply[x].addEventListener("submit", (e) => {
//           e.preventDefault();
  
//           const { comments, currentUser } = data;
//           const replyTo = container.input.replyReplyTo[x].innerText;
//           const parentUser = container.input.replyReplyTo[x].parentElement.parentElement.previousElementSibling.childNodes[1].innerText
//           const content = container.input.replyToReplyContent[x].value;
//           console.log(parentUser)
  
//           const newReply = {
//             id: generateID(),
//             content: content,
//             createdAt: "TEST",
//             replyingTo: replyTo,
//             parentUser: parentUser,
//             replies: {},
//             score: 0,
//             user: {
//               image: {
//                 png: currentUser[0].image.png,
//                 webp: currentUser[0].image.webp,
//               },
//               username: currentUser[0].username,
//             },
//           };
  
//           // Adds replytoreply in DOM
//           const replyWrapper = container.form.replyToReply[x].parentNode;
//           replyWrapper.appendChild(newPost("replytoreply", newReply));
  
//           // Generates hr height for reply container
//           replyWrapper.style.gridTemplateRows = `repeat(${replyCount(
//             x,
//             "replytoreply"
//           )}, auto)`;
  
//           // Adds replytoreply in data
//           const parentComment =
//             replyWrapper.previousSibling.childNodes[3].childNodes[0].innerText;
//           for (let x in comments) {
//             if (comments[x].content === parentComment) {
//               const replies = comments[x].replies;
//               replies[replies.length] = newReply;
//             }
//           }
  
//           httpRequest.post(newReply)
//         });
//       }
  
//       // CRUD - DOM MANIPULATION - UPDATE
//       for (let x = 0; x < container.form.update.length; x++) {
//         container.form.update[x].addEventListener("submit", (e) => {
//           e.preventDefault();
  
//           // Sets post content
//           let oldContent;
//           if (
//             container.input.update[x].parentElement.parentElement.childNodes[3]
//               .childNodes[1]
//           ) {
//             oldContent =
//               container.input.update[x].parentElement.parentElement.childNodes[3]
//                 .childNodes[1];
//           } else {
//             oldContent =
//               container.input.update[x].parentElement.parentElement.childNodes[3]
//                 .childNodes[0];
//           }
  
//           // Sets id of updated comment
//           let id
//           for(let x in comments){
//             if (oldContent.innerText ===comments[x].content){
//               id = comments[x].id
//             } else {
//               for(let y in comments[x].replies){
//                 if (oldContent.innerText ===comments[x].replies[y].content){
//                   id = comments[x].replies[y].id
//                 }
//               }
//             }
//           }
  
//           // Stores new text for content
//           const newContent = container.input.update[x].value;
  
//           // Updates post in data
//           httpRequest.update(id, {content: newContent});
  
//           // Updates post in DOM
//           oldContent.innerText = newContent;
//         });
//       }
  
//       // VOTE
//       // VOTE - FUNCTION
//       function vote(mode) {
//         const vote = document.getElementsByClassName(`vote__btn--${mode}`);
//         for (let x = 0; x < vote.length; x++) {
//           vote[x].addEventListener("click", (e) => {
//             e.preventDefault();
  
//             // Changes score in DOM
//             const scoreContianer = vote[x].parentElement.childNodes[1];
//             let score = scoreContianer.innerText;
//             mode === "upvote" ? score++ : score--;
//             scoreContianer.innerText = score;
  
//             // Changes score in data
//             mode === "upvote"
//               ? httpRequest.vote(scoreContianer, "upvote")
//               : httpRequest.vote(scoreContianer, "downvote");
//           });
//         }
//       }
  
//       // VOTE - UPVOTE
//       vote("upvote");
  
//       // VOTE - DOWNVOTE
//       vote("downvote");