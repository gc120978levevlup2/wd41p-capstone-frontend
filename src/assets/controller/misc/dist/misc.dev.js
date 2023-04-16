"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRating = getRating;
exports.handleImageFileUpload = handleImageFileUpload;
exports.handleImage = handleImage;
exports.handleImage2 = handleImage2;
exports.makeid = makeid;
exports.backend_site = void 0;

/*s
function showModal(modal_form){
    var formModal = new bootstrap.Modal(
    document.getElementById(modal_form),
        {
        keyboard: false,
        }
    );
    formModal.show();
}

function showModal_with_data(modal_form, on_show_is_done){
    var formModal = new bootstrap.Modal(
    document.getElementById(modal_form),
        {
        keyboard: false,
        }
    );
    formModal.show();
    on_show_is_done()
}
*/
var backend_site = "https://www.garrymcacho.com"; //const backend_site = "https://localhost"

exports.backend_site = backend_site;

function getRating(rating) {
  var ret = "";

  for (var i = 0; i < rating; i++) {
    ret += " ⭐";
  }

  return ret;
}

function handleImageFileUpload(e) {
  var resizeHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var on_successfull_resize = arguments.length > 2 ? arguments[2] : undefined;
  var file = e.target.files[0];

  if (window.File && window.FileReader && window.FileList && window.Blob) {
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file); // Set the image once loaded into file reader

      reader.onload = function (e1) {
        var img2 = document.createElement("img");
        img2.src = e1.target.result;

        img2.onload = function (event) {
          if (resizeHeight === 0) resizeHeight = img2.height;
          var h = resizeHeight;
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          var a = 1.0 * img2.width / img2.height;
          var w = a * h;
          canvas.height = h;
          canvas.width = w;
          ctx.drawImage(img2, 0, 0, img2.width, img2.height, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(function (blob) {
            var avatarFile = new File([blob], "fileName.jpg", {
              type: "image/jpeg"
            });
            on_successfull_resize(avatarFile);
          }, "image/jpeg");
        };
      };
    }
  }
}

function handleImage(src) {
  var resizeHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var on_successfull_resize = arguments.length > 2 ? arguments[2] : undefined;
  var img2 = document.createElement("img");
  img2.src = src;

  img2.onload = function (event) {
    if (resizeHeight === 0) resizeHeight = img2.height;
    var h = resizeHeight;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var a = 1.0 * img2.width / img2.height;
    var w = a * h;
    canvas.height = h;
    canvas.width = w;
    ctx.drawImage(img2, 0, 0, img2.width, img2.height, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(function (blob) {
      var avatarFile = new File([blob], "fileName.jpg", {
        type: "image/jpeg"
      });
      on_successfull_resize(avatarFile);
    }, "image/jpeg");
  };
}

function handleImage2(src) {
  var resizeHeight,
      img2,
      _args = arguments;
  return regeneratorRuntime.async(function handleImage2$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          resizeHeight = _args.length > 1 && _args[1] !== undefined ? _args[1] : 0;
          img2 = document.createElement("img");
          img2.src = src;

          img2.onload = function () {
            if (resizeHeight === 0) resizeHeight = img2.height;
            var h = resizeHeight;
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var a = 1.0 * img2.width / img2.height;
            var w = a * h;
            canvas.height = h;
            canvas.width = w;
            ctx.drawImage(img2, 0, 0, img2.width, img2.height, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(function (blob) {
              var avatarFile = new File([blob], "fileName.jpg", {
                type: "image/jpeg"
              });
              console.log("avatarFile : ".concat(avatarFile));
              return avatarFile;
            }, "image/jpeg");
          };

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}