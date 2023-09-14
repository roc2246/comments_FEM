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
})({"js/newPosts.js":[function(require,module,exports) {
// CRUD

// CRUD - FUNCTIONS

// CRUD - FUNCTIONS - GET REPLY COUNT
function replyCount(no, type) {
  var replyCont;
  if (type === "reply") {
    replyCont = container.form.reply[no].previousElementSibling;
  } else if (type === "replytoreply") {
    replyCont = container.form.replyToReply[no].parentElement;
  }
  return replyCont.childElementCount;
}

// CRUD - FUNCTIONS - GENERATE ID
function generateID() {
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

// CRUD - FUNCTIONS - NEW POST
function newPost(type, source) {
  var _data = data,
    currentUser = _data.currentUser;
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
    avatar: element.avatar(source),
    username: element.username(source),
    createdAt: element.createdAt(source),
    content: element.content(source),
    updateForm: element.updateForm(source),
    vote: element.vote(source),
    CRUD: element.CRUD(source)
  };
  for (var ele in newComment) {
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
container.form.comment.addEventListener("submit", function (e) {
  e.preventDefault();
  var _data2 = data,
    comments = _data2.comments,
    currentUser = _data2.currentUser;
  var content = document.querySelector(selectors.input.comment).value;
  var newComment = {
    id: generateID(),
    content: content,
    createdAt: "TEST",
    score: 0,
    user: {
      image: {
        png: currentUser[0].image.png,
        webp: currentUser[0].image.webp
      },
      username: currentUser[0].username
    },
    replies: []
  };

  // Adds comment in data
  httpRequest.post(newComment);
  comments.push(newComment);

  // Adds comment in DOM
  var wrapper = document.getElementById("comment-wrapper");
  wrapper.appendChild(newPost("comment", newComment));
});

// CRUD - DOM MANIPULATION - NEW REPLY
var _loop = function _loop(x) {
  container.form.reply[x].addEventListener("submit", function (e) {
    e.preventDefault();
    var _data3 = data,
      comments = _data3.comments,
      currentUser = _data3.currentUser;
    var replyTo = container.input.replyTo[x].innerText;
    var content = container.input.replyContent[x].value;
    var newReply = {
      id: generateID(),
      content: content,
      createdAt: "TEST",
      replyingTo: replyTo,
      replies: {},
      score: 0,
      user: {
        image: {
          png: currentUser[0].image.png,
          webp: currentUser[0].image.webp
        },
        username: currentUser[0].username
      }
    };
    if (comments[x].replies.length === 0) {
      // Creates container for replies
      var replyCont = document.createElement("div");
      replyCont.classList.add("reply-wrapper");
      var hr = document.createElement("hr");
      hr.classList.add("reply-wrapper__ruler");
      replyCont.appendChild(hr);
      container.comments[x].insertAdjacentElement("afterend", replyCont);

      // Adds reply in data
      comments[x].replies[newReply.id] = newReply;

      // Adds reply in DOM
      replyCont.appendChild(newPost("reply", newReply));

      // Generates hr height for reply container
      replyCont.style.gridTemplateRows = "repeat(".concat(replyCount(x, "reply"), ", auto)");
    } else {
      comments[x].replies[newReply.id] = newReply;
      var replyWrapper = container.form.reply[x].previousElementSibling;
      replyWrapper.appendChild(newPost("reply", newReply));

      // Generates hr height for reply container
      replyWrapper.style.gridTemplateRows = "repeat(".concat(replyCount(x, "reply"), ", auto)");
    }
    // comments[x].replies[comments[x].replies.length + 1].push(newReply);
    httpRequest.post(newReply);
  });
};
for (var x = 0; x < container.form.reply.length; x++) {
  _loop(x);
}

//  CRUD - DOM MANIPULATION - NEW REPLY TO REPLY
var _loop2 = function _loop2(_x) {
  container.form.replyToReply[_x].addEventListener("submit", function (e) {
    e.preventDefault();
    var _data4 = data,
      comments = _data4.comments,
      currentUser = _data4.currentUser;
    var replyTo = container.input.replyReplyTo[_x].innerText;
    var parentUser = container.input.replyReplyTo[_x].parentElement.parentElement.previousElementSibling.childNodes[1].innerText;
    var content = container.input.replyToReplyContent[_x].value;
    console.log(parentUser);
    var newReply = {
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
          webp: currentUser[0].image.webp
        },
        username: currentUser[0].username
      }
    };

    // Adds replytoreply in DOM
    var replyWrapper = container.form.replyToReply[_x].parentNode;
    replyWrapper.appendChild(newPost("replytoreply", newReply));

    // Generates hr height for reply container
    replyWrapper.style.gridTemplateRows = "repeat(".concat(replyCount(_x, "replytoreply"), ", auto)");

    // Adds replytoreply in data
    var parentComment = replyWrapper.previousSibling.childNodes[3].childNodes[0].innerText;
    for (var _x4 in comments) {
      if (comments[_x4].content === parentComment) {
        var replies = comments[_x4].replies;
        replies[replies.length] = newReply;
      }
    }
    httpRequest.post(newReply);
  });
};
for (var _x = 0; _x < container.form.replyToReply.length; _x++) {
  _loop2(_x);
}

// CRUD - DOM MANIPULATION - UPDATE
var _loop3 = function _loop3(_x2) {
  container.form.update[_x2].addEventListener("submit", function (e) {
    e.preventDefault();

    // Sets post content
    var oldContent;
    if (container.input.update[_x2].parentElement.parentElement.childNodes[3].childNodes[1]) {
      oldContent = container.input.update[_x2].parentElement.parentElement.childNodes[3].childNodes[1];
    } else {
      oldContent = container.input.update[_x2].parentElement.parentElement.childNodes[3].childNodes[0];
    }

    // Sets id of updated comment
    var id;
    for (var _x5 in comments) {
      if (oldContent.innerText === comments[_x5].content) {
        id = comments[_x5].id;
      } else {
        for (var y in comments[_x5].replies) {
          if (oldContent.innerText === comments[_x5].replies[y].content) {
            id = comments[_x5].replies[y].id;
          }
        }
      }
    }

    // Stores new text for content
    var newContent = container.input.update[_x2].value;

    // Updates post in data
    httpRequest.update(id, {
      content: newContent
    });

    // Updates post in DOM
    oldContent.innerText = newContent;
  });
};
for (var _x2 = 0; _x2 < container.form.update.length; _x2++) {
  _loop3(_x2);
}

// VOTE
// VOTE - FUNCTION
function vote(mode) {
  var vote = document.getElementsByClassName("vote__btn--".concat(mode));
  var _loop4 = function _loop4(_x3) {
    vote[_x3].addEventListener("click", function (e) {
      e.preventDefault();

      // Changes score in DOM
      var scoreContianer = vote[_x3].parentElement.childNodes[1];
      var score = scoreContianer.innerText;
      mode === "upvote" ? score++ : score--;
      scoreContianer.innerText = score;

      // Changes score in data
      mode === "upvote" ? httpRequest.vote(scoreContianer, "upvote") : httpRequest.vote(scoreContianer, "downvote");
    });
  };
  for (var _x3 = 0; _x3 < vote.length; _x3++) {
    _loop4(_x3);
  }
}

// VOTE - UPVOTE
vote("upvote");

// VOTE - DOWNVOTE
vote("downvote");
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55527" + '/');
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/newPosts.js"], null)
//# sourceMappingURL=/newPosts.cb69e558.js.map