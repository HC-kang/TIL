var PAINTER = PAINTER || {};

PAINTER.createNameSpace = function (nsValue) {
  var parts = nsValue.split("."),
    parent = PAINTER,
    i;

  if (parts[0] === "PAINTER") {
    parts = parts.slice(1);
  }

  for (i = 0; i < parts.length; i += 1) {
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = {};
    }

    parent = parent[parts[i]];
  }

  return parent;
};
