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
})({"js/childElem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.childElement = void 0;
var childElement = {
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
  username: function username(source, currentUser) {
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
    if (source.replyingTo !== undefined) {
      updateInput.value = "@".concat(source.replyingTo, " ").concat(source.content);
    } else {
      updateInput.value = "".concat(source.content);
    }
    updateForm.appendChild(updateInput);
    var updateSend = document.createElement("button");
    updateSend.classList.add("btn");
    updateSend.classList.add("new-comment__send");
    updateSend.classList.add("new-comment__send--update");
    updateSend.innerText = "UPDATE";
    updateForm.appendChild(updateSend);
    return updateForm;
  },
  CRUD: function CRUD(source, currentUser) {
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
exports.childElement = childElement;
},{}],"js/crud.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggles = exports.stats = exports.httpRequest = exports.CRUDFunction = void 0;
var _childElem = require("./childElem");
var toggles = {
  edit: function edit(container) {
    if (!container.classList.contains("comment--edit")) {
      container.classList.add("comment--edit");
    } else {
      container.classList.remove("comment--edit");
    }
  },
  reply: function reply(container) {
    if (container.style.display === "") {
      container.style.display = "grid";
    } else {
      container.style.display = "";
    }
  },
  delete: function _delete() {
    var deleteModal = document.getElementsByClassName("modal")[0];
    if (deleteModal.style.display === "none" || deleteModal.style.display === "") {
      deleteModal.style.display = "flex";
    }
  }
};
exports.toggles = toggles;
var stats = {
  users: null,
  generateID: function generateID() {
    var IDarray = [];
    for (var id in this.users.comments) {
      IDarray.push(this.users.comments[id].id);
      if (this.users.comments[id].replies.length > 0) {
        for (var reply in this.users.comments[id].replies) IDarray.push(this.users.comments[id].replies[reply].id);
      }
    }
    var ID = Math.max.apply(Math, IDarray) + 1;
    return ID;
  },
  replyCount: function replyCount(no, type) {
    var replyCont;
    if (type === "reply") {
      replyCont = container.form.reply[no].previousElementSibling;
    } else if (type === "replytoreply") {
      replyCont = container.form.replyToReply[no].parentElement;
    }
    return replyCont.childElementCount;
  }
};
exports.stats = stats;
var CRUDFunction = {
  DELETE: function DELETE(source) {
    var comments = stats.users.comments;
    var content;
    var deleteBtn = source.childNodes[5].childNodes[0];
    deleteBtn.addEventListener("click", function () {
      toggles.delete();
      content = source.childNodes[3].innerText;
      // Sets post content
      // if (source.childNodes[3].childNodes[1]) {
      //   content = source.childNodes[3].childNodes[1].innerText;
      // } else {
      //   content = source.childNodes[3].childNodes[0].innerText;
      // }
    });

    var deleteComment = document.getElementsByClassName("modal__btn-box--delete")[0];
    deleteComment.addEventListener("click", function () {
      var comment = document.getElementsByClassName("comment");
      var id;
      for (var x in comments) {
        if (content === comments[x].content) {
          id = comments[x].id;
          console.log(id);
          break;
        } else {
          for (var y in comments[x].replies) {
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
        for (var _x in comment) {
          if (source === comment[_x]) {
            comment[_x].remove();
            break;
          }
        }
        for (var i = 0; i < stats.users.comments.length; i++) {
          if (stats.users.comments[i].id === id) {
            stats.users.comments.splice(i, 1); // Remove the object at index i
            break; // Stop searching after removal
          }
        }

        httpRequest.delete(id);
      }
    });
  },
  POST: function POST(type, source) {
    var currentUser = stats.users.currentUser;
    var postContainer = document.createElement("div");
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
    var newComment = {
      avatar: _childElem.childElement.avatar(source),
      username: _childElem.childElement.username(source, currentUser[0]),
      createdAt: _childElem.childElement.createdAt(source),
      content: _childElem.childElement.content(source),
      updateForm: _childElem.childElement.updateForm(source),
      vote: _childElem.childElement.vote(source),
      CRUD: _childElem.childElement.CRUD(source, currentUser[0])
    };
    for (var ele in newComment) {
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
  }
};
exports.CRUDFunction = CRUDFunction;
var httpRequest = {
  update: function update(id, _update) {
    fetch("http://localhost:3000/update/".concat(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json" // You may need to adjust the content type based on your application's needs
      },

      body: JSON.stringify(_update) // If you have data to send in the request, it needs to be converted to a JSON string
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // If you expect JSON data in the response
    }).then(function (data) {
      // Handle the response data here
    }).catch(function (error) {
      console.error("Error:", error);
    });
  },
  vote: function vote(scoreContianer, mode) {
    var postContainer = scoreContianer.parentElement.parentElement;
    var content;
    var change;
    var score = scoreContianer.innerText;
    mode === "upvote" ? change = score++ : change = score--;
    if (postContainer.childNodes[3].childNodes[1]) {
      content = postContainer.childNodes[3].childNodes[1];
    } else {
      content = postContainer.childNodes[3];
    }
    for (var x in comments) {
      if (comments[x].content === content) {
        comments[x].score = change;
      } else {
        for (var y in comments[x].replies[y]) {
          var reply = comments[x].replies[y];
          if (reply.content = content) {
            reply.score = change;
          }
        }
      }
    }
  },
  post: function post(src) {
    var postData = src;
    var params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    };
    // Possible put id here to insert new replies and replytoreplies to database
    fetch("http://localhost:3000/newPost", params).then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
  },
  delete: function _delete(id) {
    var options = {
      method: "DELETE",
      // Use the DELETE HTTP method
      headers: {
        "Content-Type": "application/json" // Set the content type if needed
        // You may also need to include authentication headers or other headers here
      }
    };

    // Send the DELETE request
    fetch("http://localhost:3000/delete/".concat(id), options).then(function (response) {
      if (response.ok) {
        // Resource successfully deleted
        console.log("Resource deleted successfully");
      } else {
        // Handle error cases here
        console.error("Error deleting resource");
      }
    }).catch(function (error) {
      console.error("Fetch error:", error);
    });
  }
};
exports.httpRequest = httpRequest;
},{"./childElem":"js/childElem.js"}],"js/forms.js":[function(require,module,exports) {
"use strict";

var _crud = require("./crud");
var forms = {
  newComment: document.querySelector(".new-comment:not(.new-comment--reply):not(.new-comment--update)")
};
forms.newComment.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(_crud.stats.users);
  var newComment = {
    id: _crud.stats.generateID(),
    content: document.getElementById("new-comment-input").value,
    createdAt: "TEST",
    score: 0,
    user: {
      image: {
        png: _crud.stats.users.currentUser[0].image.png,
        webp: _crud.stats.users.currentUser[0].image.webp
      },
      username: _crud.stats.users.currentUser[0].username
    },
    replies: []
  };

  // Adds comment in data
  _crud.httpRequest.post(newComment);
  _crud.stats.users.comments.push(newComment);

  // Adds comment in DOM
  var wrapper = document.getElementById("comment-wrapper");
  wrapper.appendChild(_crud.CRUDFunction.POST("comment", newComment));
});
},{"./crud":"js/crud.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62833" + '/');
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/forms.js"], null)
//# sourceMappingURL=/forms.510d617c.js.map