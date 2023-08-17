// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"data.json":[function(require,module,exports) {
module.exports = {
  "currentUser": {
    "image": {
      "png": "./images/avatars/image-juliusomo.png",
      "webp": "./images/avatars/image-juliusomo.webp"
    },
    "username": "juliusomo"
  },
  "comments": [{
    "id": 1,
    "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    "createdAt": "1 month ago",
    "score": 12,
    "user": {
      "image": {
        "png": "./images/avatars/image-amyrobson.png",
        "webp": "./images/avatars/image-amyrobson.webp"
      },
      "username": "amyrobson"
    },
    "replies": []
  }, {
    "id": 2,
    "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    "createdAt": "2 weeks ago",
    "score": 5,
    "user": {
      "image": {
        "png": "./images/avatars/image-maxblagun.png",
        "webp": "./images/avatars/image-maxblagun.webp"
      },
      "username": "maxblagun"
    },
    "replies": [{
      "id": 3,
      "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      "createdAt": "1 week ago",
      "score": 4,
      "replyingTo": "maxblagun",
      "user": {
        "image": {
          "png": "./images/avatars/image-ramsesmiron.png",
          "webp": "./images/avatars/image-ramsesmiron.webp"
        },
        "username": "ramsesmiron"
      }
    }, {
      "id": 4,
      "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      "createdAt": "2 days ago",
      "score": 2,
      "replyingTo": "ramsesmiron",
      "user": {
        "image": {
          "png": "./images/avatars/image-juliusomo.png",
          "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
      }
    }]
  }]
};
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _data = _interopRequireDefault(require("./data.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Delete once data is on server

// Generates child elements for posts
var element = {
  content: function content(source) {
    var content = document.createElement("p");
    content.classList.add("comment__content");
    var message = document.createElement("span");
    message.innerText = source.content;
    message.classList.add("comment__message");
    if (source.replyingTo !== undefined) {
      var replyingTo = document.createElement("span");
      replyingTo.innerText = "@".concat(source.replyingTo, " ");
      replyingTo.classList.add("comment__replyingTo");
      content.appendChild(replyingTo);
    }
    content.appendChild(message);
    return content;
  },
  createdAt: function createdAt(source) {
    var createdAt = document.createElement("span");
    createdAt.classList.add("comment__createdAt");
    createdAt.innerText = source.createdAt;
    return createdAt;
  },
  vote: function vote(source) {
    var vote = document.createElement("form");
    vote.classList.add("vote");
    var upvote = document.createElement("button");
    upvote.classList.add("vote__btn");
    upvote.classList.add("vote__btn--upvote");
    vote.appendChild(upvote);
    var plus = document.createElement("img");
    plus.classList.add("vote__img");
    plus.classList.add("vote__img--plus");
    plus.src = "./images/icon-plus.svg";
    upvote.appendChild(plus);
    var score = document.createElement("span");
    score.classList.add("vote__score");
    score.innerText = source.score;
    vote.appendChild(score);
    var downvote = document.createElement("button");
    downvote.classList.add("vote__btn");
    downvote.classList.add("vote__btn--downvote");
    vote.appendChild(downvote);
    var minus = document.createElement("img");
    minus.classList.add("vote__img");
    minus.classList.add("vote__img--minus");
    minus.src = "./images/icon-minus.svg";
    downvote.appendChild(minus);
    return vote;
  },
  avatar: function avatar(source) {
    var avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.classList.add("avatar--comment");
    avatar.src = source.user.image.png;
    avatar.alt = source.user.username;
    return avatar;
  },
  username: function username(source) {
    var currentUser = _data.default.currentUser;
    var username = document.createElement("span");
    username.classList.add("username");
    if (source.user.username === currentUser.username) {
      username.classList.add("username--you");
      var name = document.createElement("span");
      name.classList.add("username__name");
      name.innerText = source.user.username;
      username.appendChild(name);
      var indicator = document.createElement("span");
      indicator.classList.add("username__you");
      indicator.innerText = "you";
      username.appendChild(indicator);
    } else {
      username.innerText = source.user.username;
    }
    return username;
  },
  updateForm: function updateForm(source) {
    var updateForm = document.createElement("form");
    updateForm.classList.add("new-comment");
    updateForm.classList.add("new-comment--update");
    var updateInput = document.createElement("textarea");
    updateInput.classList.add("new-comment__input");
    updateInput.value = "@".concat(source.replyingTo, " ").concat(source.content);
    updateForm.appendChild(updateInput);
    var updateSend = document.createElement("button");
    updateSend.classList.add("btn");
    updateSend.classList.add("new-comment__send");
    updateSend.classList.add("new-comment__send--update");
    updateSend.innerText = "UPDATE";
    updateForm.appendChild(updateSend);
    return updateForm;
  },
  CRUD: function CRUD(source) {
    var currentUser = _data.default.currentUser;
    var CRUD = document.createElement("div");
    CRUD.classList.add("CRUD-container");
    function createCRUDbtn(type) {
      var btn = document.createElement("button");
      btn.classList.add("CRUD");
      btn.classList.add("CRUD--".concat(type));
      CRUD.appendChild(btn);
      var btnIcon = document.createElement("img");
      btnIcon.classList.add("CRUD__icon");
      btnIcon.classList.add("CRUD__icon--".concat(type));
      btnIcon.src = "./images/icon-".concat(type, ".svg");
      btn.appendChild(btnIcon);
      var btnTxt = document.createElement("span");
      btnTxt.classList.add("CRUD__text");
      btnTxt.classList.add("CRUD__text--".concat(type));
      btnTxt.innerText = "".concat(type.charAt(0).toUpperCase()).concat(type.slice(1));
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
  }
};

// COMMENT GENERATION
var _loop = function _loop(comment) {
  var container = document.getElementById("comment-wrapper");
  var currentUser = _data.default.currentUser,
    comments = _data.default.comments;
  var post = comments[comment];

  // SETS CURRENT USER'S AVATAR IN NEW COMMENT FORM
  var newCommentAvatar = document.querySelector(".avatar--new-comment");
  newCommentAvatar.src = currentUser.image.png;

  // FUNCTION FOR GENERATING COMMENTS AND REPLIES
  function postCont(type, counter) {
    var container = document.createElement("div");
    container.classList.add("comment");
    var post;
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
    var newComment = {
      avatar: element.avatar(post),
      username: element.username(post),
      createdAt: element.createdAt(post),
      content: element.content(post),
      vote: element.vote(post),
      CRUD: element.CRUD(post)
    };
    for (var ele in newComment) {
      container.append(newComment[ele]);
    }
    if (type === "reply") {
      newComment.CRUD.classList.add("CRUD-container--reply");
    }
    return container;
  }

  // Function for creating reply form
  function createReplyForm(type) {
    var replyForm = document.createElement("form");
    replyForm.classList.add("new-comment");
    replyForm.classList.add("new-comment--reply");
    if (type === "reply") {
      replyForm.classList.add("new-comment--replytoreply");
    } else {
      type = null;
    }
    var avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.classList.add("avatar--new-reply");
    avatar.src = currentUser.image.png;
    avatar.alt = post.user.username;
    replyForm.appendChild(avatar);
    var replyInput = document.createElement("textarea");
    replyInput.classList.add("new-comment__input");
    replyInput.placeholder = "...Add a reply";
    replyForm.appendChild(replyInput);
    var replySend = document.createElement("button");
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
    var replyCont = document.createElement("div");
    replyCont.classList.add("reply-wrapper");
    var hr = document.createElement("hr");
    hr.classList.add("reply-wrapper__ruler");
    replyCont.appendChild(hr);
    container.appendChild(replyCont);

    // Generates replies
    for (var reply in post.replies) {
      replyCont.appendChild(postCont("reply", reply));
      if (post.replies[reply].user.username !== currentUser.username) {
        replyCont.appendChild(createReplyForm("reply"));
      }
    }

    // Generates hr hight for reply container
    replyCont.style.gridTemplateRows = "repeat(".concat(replyCont.childElementCount, ", auto)");

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
};
for (var comment in _data.default.comments) {
  _loop(comment);
}
var selectors = {
  reply: ".comment--reply:not(.comment--you)",
  comment: ".comment:not(.comment--you):not(.comment--reply)",
  form: {
    comment: ".new-comment:not(.new-comment--reply):not(.new-comment--update)",
    reply: ".new-comment--reply:not(.new-comment--replytoreply)",
    replyToReply: ".new-comment--replytoreply"
  },
  btn: {
    reply: ".CRUD-container:not(.CRUD-container--reply) > .CRUD--reply",
    replyToReply: ".CRUD-container--reply > .CRUD--reply"
  },
  input: {
    comment: ".new-comment:not(.new-comment--reply):not(.new-comment--update) > .new-comment__input",
    reply: ".new-comment--reply:not(.new-comment--replytoreply)> .new-comment__input",
    replyToReply: ".new-comment--replytoreply> .new-comment__input",
    replyTo: ".comment:not(.comment--reply) > .username",
    replyReplyTo: ".comment--reply:not(.comment--replytoreply) > .username"
  }
};
var container = {
  replies: document.querySelectorAll(selectors.reply),
  comments: document.querySelectorAll(selectors.comment),
  userComments: document.getElementsByClassName("comment--you"),
  modal: document.getElementsByClassName("modal__btn-box--cancel")[0],
  form: {
    comment: document.querySelector(selectors.form.comment),
    reply: document.querySelectorAll(selectors.form.reply),
    replyToReply: document.querySelectorAll(selectors.form.replyToReply)
  },
  input: {
    replyTo: document.querySelectorAll(selectors.input.replyTo),
    replyReplyTo: document.querySelectorAll(selectors.input.replyReplyTo),
    replyContent: document.querySelectorAll(selectors.input.reply),
    replyToReplyContent: document.querySelectorAll(selectors.input.replyToReply)
  }
};
var CRUD = {
  edit: document.getElementsByClassName("CRUD--edit"),
  delete: document.getElementsByClassName("CRUD--delete"),
  reply: document.getElementsByClassName("CRUD--reply")
};

// TOGGLES

// Toggles edit mode
var _loop2 = function _loop2() {
  var comment = container.userComments[x];
  var editBtn = CRUD.edit[x];
  editBtn.addEventListener("click", function () {
    if (!comment.classList.contains("comment--edit")) {
      comment.classList.add("comment--edit");
    } else {
      comment.classList.remove("comment--edit");
    }
  });
};
for (var x = 0; x < container.userComments.length; x++) {
  _loop2();
}

// Toggles reply form for Comments
var _loop3 = function _loop3() {
  var replyForm = document.querySelectorAll(selectors.form.reply)[_x];
  var replyBtn = document.querySelectorAll(selectors.btn.reply)[_x];
  replyBtn.addEventListener("click", function () {
    if (replyForm.style.display === "") {
      replyForm.style.display = "grid";
    } else {
      replyForm.style.display = "";
    }
  });
};
for (var _x = 0; _x < container.comments.length; _x++) {
  _loop3();
}

// Toggles reply form for Replies
var _loop4 = function _loop4() {
  var replyForm = document.querySelectorAll(selectors.form.replyToReply)[_x2];
  var replyBtn = document.querySelectorAll(selectors.btn.replyToReply)[_x2];
  replyBtn.addEventListener("click", function () {
    if (replyForm.style.display === "") {
      replyForm.style.display = "grid";
    } else {
      replyForm.style.display = "";
    }
  });
};
for (var _x2 = 0; _x2 < container.replies.length; _x2++) {
  _loop4();
}

// Toggles delete modal
var _loop5 = function _loop5() {
  var deleteBtn = CRUD.delete[_x3];
  var deleteModal = document.getElementsByClassName("modal")[0];
  deleteBtn.addEventListener("click", function () {
    if (deleteModal.style.display === "none" || deleteModal.style.display === "") {
      deleteModal.style.display = "flex";
    }
  });
};
for (var _x3 = 0; _x3 < CRUD.delete.length; _x3++) {
  _loop5();
}

// Closes delete modal
container.modal.addEventListener("click", function () {
  var deleteModal = document.getElementsByClassName("modal")[0];
  if (deleteModal.style.display === "flex") {
    deleteModal.style.display = "none";
  }
});

// CRUD
// ADDS NEW COMMENT TO DOM
function newPost(type, source) {
  var container = document.createElement("div");
  container.classList.add("comment");
  if (type === "reply") {
    container.classList.add("comment--reply");
  } else if (type === "replytoreply") {
    container.classList.add("comment--reply");
    container.classList.add("comment--replytoreply");
  }
  container.classList.add("comment--you");
  var newComment = {
    avatar: element.avatar(source),
    username: element.username(source),
    createdAt: element.createdAt(source),
    content: element.content(source),
    vote: element.vote(source),
    CRUD: element.CRUD(source)
  };
  for (var ele in newComment) {
    container.append(newComment[ele]);
  }
  if (type === "reply") {
    newComment.CRUD.classList.add("CRUD-container--reply");
  }
  return container;
}

// ADDS NEW ID TO POST
function generateID() {
  var comments = _data.default.comments;
  var IDarray = [];
  for (var id in comments) {
    IDarray.push(comments[id].id);
    if (comments[id].replies.length > 0) {
      for (var reply in comments[id].replies) IDarray.push(comments[id].replies[reply].id);
    }
  }
  var ID = Math.max.apply(Math, IDarray) + 1;
  return ID;
}

// Gets reply count
function replyCount(no, type) {
  var replyCont;
  if (type === "reply") {
    replyCont = container.form.reply[no].previousElementSibling;
  } else if (type === "replytoreply") {
    replyCont = container.form.replyToReply[no].parentElement;
  }
  return replyCont.childElementCount;
}

// NEW COMMENT
container.form.comment.addEventListener("submit", function (e) {
  e.preventDefault();
  var comments = _data.default.comments,
    currentUser = _data.default.currentUser;
  var content = document.querySelector(selectors.input.comment).value;
  var newComment = {
    content: content,
    createdAt: "TEST",
    id: generateID(),
    replies: {},
    score: 0,
    user: {
      image: {
        png: currentUser.image.png,
        webp: currentUser.image.webp
      },
      username: currentUser.username
    }
  };
  comments[newComment.id] = newComment;
  var wrapper = document.getElementById("comment-wrapper");
  wrapper.appendChild(newPost("comment", newComment));
});

// NEW REPLY
var _loop6 = function _loop6(_x4) {
  container.form.reply[_x4].addEventListener("submit", function (e) {
    e.preventDefault();
    var comments = _data.default.comments,
      currentUser = _data.default.currentUser;
    var replyTo = container.input.replyTo[_x4].innerText;
    var content = container.input.replyContent[_x4].value;
    var newReply = {
      id: generateID(),
      content: content,
      createdAt: "TEST",
      replyingTo: replyTo,
      replies: {},
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp
        },
        username: currentUser.username
      }
    };
    if (comments[_x4].replies.length === 0) {
      // Creates container for replies
      var replyCont = document.createElement("div");
      replyCont.classList.add("reply-wrapper");
      var hr = document.createElement("hr");
      hr.classList.add("reply-wrapper__ruler");
      replyCont.appendChild(hr);
      container.comments[_x4].insertAdjacentElement("afterend", replyCont);

      // Adds new reply
      comments[_x4].replies[newReply.id] = newReply;
      replyCont.appendChild(newPost("reply", newReply));

      // Generates hr height for reply container
      replyCont.style.gridTemplateRows = "repeat(".concat(replyCount(_x4, "reply"), ", auto)");
    } else {
      comments[_x4].replies[newReply.id] = newReply;
      var replyWrapper = container.form.reply[_x4].previousElementSibling;
      replyWrapper.appendChild(newPost("reply", newReply));

      // Generates hr height for reply container
      replyWrapper.style.gridTemplateRows = "repeat(".concat(replyCount(_x4, "reply"), ", auto)");
    }
  });
};
for (var _x4 = 0; _x4 < container.form.reply.length; _x4++) {
  _loop6(_x4);
}

// NEW REPLY TO REPLY
var _loop7 = function _loop7(_x5) {
  container.form.replyToReply[_x5].addEventListener("submit", function (e) {
    e.preventDefault();
    var comments = _data.default.comments,
      currentUser = _data.default.currentUser;
    var replyTo = container.input.replyReplyTo[_x5].innerText;
    var content = container.input.replyToReplyContent[_x5].value;
    var newReply = {
      id: generateID(),
      content: content,
      createdAt: "TEST",
      replyingTo: replyTo,
      replies: {},
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp
        },
        username: currentUser.username
      }
    };
    var replyWrapper = container.form.replyToReply[_x5].parentNode;
    replyWrapper.appendChild(newPost("replytoreply", newReply));

    // Generates hr height for reply container
    replyWrapper.style.gridTemplateRows = "repeat(".concat(replyCount(_x5, "replytoreply"), ", auto)");
    var parentComment = replyWrapper.previousSibling.childNodes[3].childNodes[0].innerText;
    for (var _x6 in comments) {
      if (comments[_x6].content === parentComment) {
        var replies = comments[_x6].replies;
        replies[replies.length] = newReply;
      }
    }
  });
};
for (var _x5 = 0; _x5 < container.form.replyToReply.length; _x5++) {
  _loop7(_x5);
}
},{"./data.json":"data.json"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62253" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map