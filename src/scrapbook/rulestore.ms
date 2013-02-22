class RuleStore {
  include $m.EventEmitter;

  function initialize() {
    this.getRules(#{
      self.emit('load', $1);
    });
    this.registerEvents();
  }

  function registerEvents() {
    chrome.storage.onChanged.addListener(#{
      self.getRules(#{
        self.emit('change', $1);
      });
    });
  }

  function saveRule(key, obj, cb) {
    this.getRules(#(ruleset){
      ruleset[key] = obj
      chrome.storage.local.set({ruleset: ruleset}, cb);
    });
  }

  function getRules(cb) {
    chrome.storage.local.get("ruleset", #{
      cb($1["ruleset"] || {});
    });
  }

  function getRule(key, cb) {
    this.getRules(#{
      cb($1[key]);
    });
  }

  function clearRules() {
    chrome.storage.local.set({ruleset: {}});
  }

  function deleteRule(key) {
  }
}
