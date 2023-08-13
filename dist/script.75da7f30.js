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

// Generates elements for posts
var element = {
  content: function content(source) {
    // Creates message for content
    var content = document.createElement("p");
    content.classList.add("comment__content");
    var message = document.createElement("span");
    message.innerText = source.content;
    message.classList.add("comment__message");

    // Creates who reply is replying to
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
    // Creates indicator/name for current user
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
  document.getElementsByClassName("avatar--new-comment")[0].src = currentUser.image.png;
  function postCont(type, counter) {
    var post;
    var container = document.createElement("div");
    container.classList.add("comment");
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
  if (post.replies.length > 0) {
    container.appendChild(postCont("comment"));
    var replyCont = document.createElement("div");
    replyCont.classList.add("reply-wrapper");
    container.appendChild(replyCont);
    var hr = document.createElement("hr");
    hr.classList.add("reply-wrapper__ruler");
    replyCont.appendChild(hr);
    for (var reply in post.replies) {
      replyCont.appendChild(postCont("reply", reply));
      if (post.replies[reply].user.username !== currentUser.username) {
        replyCont.appendChild(createReplyForm("reply"));
      }
    }
    if (post.user.username !== currentUser.username) {
      container.appendChild(createReplyForm());
    }
    var replyWrapper = document.getElementsByClassName("reply-wrapper")[0];
    replyWrapper.style.gridTemplateRows = "repeat(".concat(replyWrapper.childElementCount, ", auto)");
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
var container = {
  replies: document.querySelectorAll(".comment--reply:not(.comment--you)"),
  comments: document.querySelectorAll(".comment:not(.comment--you):not(.comment--reply)"),
  userComments: document.getElementsByClassName("comment--you"),
  modal: document.getElementsByClassName("modal__btn-box--cancel")[0],
  form: {
    comment: document.querySelector(".new-comment:not(.new-comment--reply):not(.new-comment--update)"),
    reply: document.querySelectorAll(".new-comment--reply:not(.new-comment--replytoreply)")
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
  var editBtn = document.getElementsByClassName("CRUD--edit")[x];
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
  var replyForm = document.querySelectorAll(".new-comment--reply:not(.new-comment--replytoreply)")[_x];
  var replyBtn = document.querySelectorAll(".CRUD-container:not(.CRUD-container--reply) > .CRUD--reply")[_x];
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
  var replyForm = document.getElementsByClassName("new-comment--replytoreply")[_x2];
  var replyBtn = document.querySelectorAll(".CRUD-container--reply > .CRUD--reply")[_x2];
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

// NEW COMMENT
container.form.comment.addEventListener("submit", function (e) {
  e.preventDefault();
  var comments = _data.default.comments,
    currentUser = _data.default.currentUser;
  var wrapper = document.getElementById("comment-wrapper");
  var newComment = {
    content: document.querySelector(".new-comment:not(.new-comment--reply):not(.new-comment--update) > .new-comment__input").value,
    createdAt: "TEST",
    id: null,
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
  var lastComment;
  if (comments[comments.length - 1].replies.length > 0) {
    lastComment = comments[comments.length - 1].replies[comments[comments.length - 1].replies.length - 1];
  } else {
    lastComment = comments[comments.length - 1];
  }
  newComment.id = lastComment.id + 1;
  comments[newComment.id] = newComment;
  wrapper.appendChild(newPost("comment", newComment));
});

// NEW REPLY
var _loop6 = function _loop6(_x4) {
  var reply = container.form.reply[_x4];
  reply.addEventListener("submit", function (e) {
    e.preventDefault();
    var comments = _data.default.comments,
      currentUser = _data.default.currentUser;
    var replyingTo = document.querySelectorAll(".comment:not(.comment--reply) > .username")[_x4].innerText;
    var commentWrapper = document.getElementById("comment-wrapper");
    var replyWrapper = reply.previousElementSibling;
    var newReply = {
      id: null,
      content: "".concat(document.querySelectorAll(".new-comment--reply:not(.new-comment--replytoreply)> .new-comment__input")[_x4].value),
      createdAt: "TEST",
      replyingTo: replyingTo,
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
    var lastComment;
    if (comments[comments.length - 1].replies.length > 0) {
      lastComment = comments[comments.length - 1].replies[comments[comments.length - 1].replies.length - 1];
    } else {
      lastComment = comments[comments.length - 1];
    }
    newReply.id = lastComment.id + 1;
    comments[_x4].replies[newReply.id] = newReply;
    if (comments[_x4].replies.length === 0) {
      // const replyCont = document.createElement("div");
      // replyCont.classList.add("reply-wrapper");
      // container.appendChild(replyCont);

      // const hr = document.createElement("hr");
      // hr.classList.add("reply-wrapper__ruler");
      // replyCont.appendChild(hr);

      replyWrapper.appendChild(newPost("reply", newReply));
    } else {
      replyWrapper.appendChild(newPost("reply", newReply));
    }
  });
};
for (var _x4 = 0; _x4 < container.form.reply.length; _x4++) {
  _loop6(_x4);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58314" + '/');
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