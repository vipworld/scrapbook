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
  function oauthHeader(ck, cks, method, encodedurl) {
    var accessor = { consumerSecret: cks, tokenSecret: ""};
    var message = { action: encodedurl, method: method.toUpperCase(), parameters: [["oauth_version","1.0"],["oauth_consumer_key",ck]]};

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameters = OAuth.getParameterMap(message).parameters;
    parameters = parameters.sort(#(a, b){
      if (a[0] < b[0]) return -1;
      if (a[0] == b[0]) return 0;
      if (a[0] > b[0]) return 1;
     });

    var parameterMap = OAuth.getParameterMap(message);
    var baseStr = OAuth.decodeForm(OAuth.SignatureMethod.getBaseString(message));
    var theSig = "";

    var authorization = [];
    parameters.forEach(#{
      authorization.push($1[0] + "=\"" + $1[1] + "\"");
    });

    return "OAuth " + authorization.join(", ");
  }
}

Scrapbook.utils = new Scrapbook.Utils();
