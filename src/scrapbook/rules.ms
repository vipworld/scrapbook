class Rules {
  include $m.EventEmitter;

  function initialize() {
    this.getRules(#(rules) {
      self.rules = rules;
      self.emit('ready', rules);
    });
  }

  function getRules(cb) {
    chrome.extension.sendRequest({ 
      method: "getRules"
    }, cb);
  }

  function getRule(key, cb) {
    chrome.extension.sendRequest({ 
      method: "getRule",
      key: key
    }, cb);
  }

  function setRule(key, value) {
    chrome.extension.sendRequest({ 
      method: "setRule",
      key: key,
      value: value
    });
  }

  function deleteRule(key) {
    chrome.extension.sendRequest({ 
      method: "deleteRule",
      key: key
    });
  }


}

class Rule {
}
