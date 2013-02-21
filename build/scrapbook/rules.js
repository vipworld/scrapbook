$m.Class.extend("Rules", function(KLASS, OO){
  OO.include($m.EventEmitter);

  OO.addMember("initialize", function(){var self=this;
    this.getRules(function(rules) {
      self.rules = rules;
      self.emit('ready', rules);
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

  OO.addMember("deleteRule", function(key){var self=this;
    chrome.extension.sendRequest({ 
      method: "deleteRule",
      key: key
    });
  });


});

$m.Class.extend("Rule", function(KLASS, OO){
});

