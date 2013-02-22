class RuleStore {
  include $m.EventEmitter;

  function initialize() {
    this.getRules();
  }

  function saveRule(key) {
  }

  function getRules() {
    chrome.storage.local.get(null, function(keys) {
      console.log(keys);
    });
  }

  function deleteRule(key) {
  }

  function clearRules() {
    chrome.storage.local.clear();
  }
  
}
