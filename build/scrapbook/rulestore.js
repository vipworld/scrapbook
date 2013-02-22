$m.Class.extend("RuleStore", function(KLASS, OO){
  OO.include($m.EventEmitter);

  OO.addMember("initialize", function(){var self=this;
    this.getRules(function($1,$2,$3){
      self.emit('load', $1);
    });
    this.registerEvents();
  });

  OO.addMember("registerEvents", function(){var self=this;
    chrome.storage.onChanged.addListener(function($1,$2,$3){
      self.getRules(function($1,$2,$3){
        self.emit('change', $1);
      });
    });
  });

  OO.addMember("saveRule", function(key, obj, cb){var self=this;
    this.getRules(function(ruleset){
      ruleset[key] = obj
      chrome.storage.local.set({ruleset: ruleset}, cb);
    });
  });

  OO.addMember("getRules", function(cb){var self=this;
    chrome.storage.local.get("ruleset", function($1,$2,$3){
      cb($1["ruleset"] || {});
    });
  });

  OO.addMember("getRule", function(key, cb){var self=this;
    this.getRules(function($1,$2,$3){
      cb($1[key]);
    });
  });

  OO.addMember("clearRules", function(){var self=this;
    chrome.storage.local.set({ruleset: {}});
  });

  OO.addMember("deleteRule", function(key){var self=this;
  });
});

