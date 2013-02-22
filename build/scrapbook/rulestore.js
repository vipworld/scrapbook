$m.Class.extend("RuleStore", function(KLASS, OO){
  OO.include($m.EventEmitter);

  OO.addMember("initialize", function(){var self=this;
    this.getRules();
  });

  OO.addMember("saveRule", function(key){var self=this;
  });

  OO.addMember("getRules", function(){var self=this;
    chrome.storage.local.get(null, function(keys) {
      console.log(keys);
    });
  });

  OO.addMember("deleteRule", function(key){var self=this;
  });

  OO.addMember("clearRules", function(){var self=this;
    chrome.storage.local.clear();
  });
  
});

