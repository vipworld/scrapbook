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

  function deleteRule(key) {
  }

  function saveRule(key, obj) {
    var store;
    if ('object' == (typeof key)) store = key;
    else store[key] = obj;
    chrome.storage.local.set(store, #{
      self.emit('rulesaved', $1);
    })
  }

  function getRules(cb) {
    chrome.storage.local.get(null, cb);
  }

  function clearRules() {
    chrome.storage.local.clear();
  }
  
}
