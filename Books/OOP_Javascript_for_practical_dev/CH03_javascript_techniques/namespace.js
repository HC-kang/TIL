// register object for namespace
var MYPAINTER = {};

// create a sub namespace
MYPAINTER.app = {};
MYPAINTER.model = {};
MYPAINTER.view = {};
MYPAINTER.control = {};

// define constructor function for namespace
MYPAINTER.app.Constants = function () {};
MYPAINTER.app.Main = function () {};
MYPAINTER.model.Model = function () {};
MYPAINTER.view.View = function () {};
MYPAINTER.control.Controller = function () {};

// define properties on constructors
MYPAINTER.app.Constants.TITLE = "Painter";
MYPAINTER.app.Constants.WIDTH = 600;
MYPAINTER.app.Constants.HEIGHT = 400;

console.log(MYPAINTER.app.Constants.TITLE);

/**
 * Bad Case
 */
// MYPAINTER = {}
// console.log(MYPAINTER.app); // undefined

// console.log(MYPAINTER.app.Constants.TITLE); // TypeError: Cannot read property 'Constants' of undefined


// Good Case 1
if (typeof MYPAINTER === "undefined") {
  var MYPAINTER = {};
}
console.log(MYPAINTER.app);

// Good Case 2
var MYPAINTER = MYPAINTER || {};

console.log(MYPAINTER.app);

// Good Case 3
MYPAINTER.createNameSpace = function (nsValue) {
  var parts = nsValue.split('.');
  var parent = MYPAINTER;

  if (parts[0] === "MYPAINTER") {
    parts = parts.slice(1);
  }

  for (var i=0; i<parts.length;i++) {
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
}