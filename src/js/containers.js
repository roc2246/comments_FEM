    // CONTAINERS

    // CONTAINERS - DOM SELECTORS
    const selectors = {
        reply: ".comment--reply:not(.comment--you)",
        comment: ".comment:not(.comment--you):not(.comment--reply)",
        form: {
          comment:
            ".new-comment:not(.new-comment--reply):not(.new-comment--update)",
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
          deleteComment: document.getElementsByClassName(
            "modal__btn-box--delete"
          )[0],
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
  