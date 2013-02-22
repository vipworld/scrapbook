jQuery.fn.getPath = function (smart) {
  if (this.length != 1) throw 'Requires one element.';

  var path, node = this;
  while (node.length) {
    var realNode = node[0];
    var name = realNode.localName;
    if (smart) {
      var className = $.trim(realNode.className);
      if (className) {
        name = "." + className.split(" ")[0];
      }
    }
    if (!name) break;

    var parent = node.parent();

    var siblings = parent.children(name);
    if (siblings.length > 1 && !smart) {
      name += ':eq(' + siblings.index(realNode) + ')';
    }

    path = name + (path ? '>' + path : '');
    node = parent;
  }

  return path;
};

class Scrapbook.Utils {
  function oauthHeader(ck, cks, method, url, params) {
    params = $.extend(true, {
      "oauth_version": "1.0",
      "oauth_consumer_key": ck
    }, params || {});

    var accessor = { consumerKey: ck, consumerSecret: cks };
    var message = { action: url, method: method.toUpperCase(), parameters: params};

    OAuth.completeRequest(message, accessor);

    return OAuth.getAuthorizationHeader(null, message.parameters);
  }
}

Scrapbook.utils = new Scrapbook.Utils();
