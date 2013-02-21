class Rules {
  include $m.EventEmitter;

  function initialize(root) {
    getRules(#(rules) {
      
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

}
