$m.Class.extend("Rules", function(KLASS, OO){
  OO.include($m.EventEmitter);

  OO.addMember("initialize", function(root){var self=this;
    getRules(function(rules) {
      
    });
  });

  OO.addMember("getRules", function(cb){var self=this;
    chrome.extension.sendRequest({ 
      method: "getRules"
    }, cb);
  });

  OO.addMember("getRule", function(key, cb){var self=this;
    chrome.extension.sendRequest({ 
      method: "getRule",
      key: key
    }, cb);
  });

  OO.addMember("setRule", function(key, value){var self=this;
    chrome.extension.sendRequest({ 
      method: "setRule",
      key: key,
      value: value
    });
  });

});

