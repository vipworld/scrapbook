class RuleStore {
  include $m.EventEmitter;

  function initialize() {
    this.getRules(#{
      console.log($1);
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

  function saveRule(key, obj) {
    this.getRules(#(rules){
      var store = rules || {};
      store[key] = obj;

      chrome.storage.local.set(store, #{
        self.emit('saved', $1);
      });
    });
  }

  function getRules(cb) {
    chrome.storage.local.get(null, cb);
  }

  function getRule(key) {
  }

  function clearRules() {
    chrome.storage.local.clear();
  }

  function deleteRule(key) {
  }
  
}
