//var root = '<div class="scrapbook"></div>';
class Panel {
  function initialize($root) {
    console.log('called');
    var template = <<END;
      a.close.icon-white &times;
      .panel.rulesets
        h1 Existing Rulesets
        ul.ruleset-list
          li replace me with rule name
        button.btn.newRule New Rule
        form.ruleset-define-form(style="display: none;")
          input(type="text", name="name", placeholder="name")
          input(type="text", name="table", placeholder="factual table id (optional)")
          button.btn.addRule Add Rule
        a.next Next

      .panel.rule.panel-out
        h1 Rules/Extractions
        .scrapbook-header
          button#scrapbook-start-inspector Inspect
          |  | 
          button#scrapbook-add-extractor Add Extractor
          |  | 
          button#scrapbook-extract Extract
        input#scrapbook-selector
        ul#scrapbook-extractors
        ul#scrapbook-extracted-results
    END

    $root.append(jade.compile(template));
    this.$root = $root;
    this.initHTML();
    this.registerEvents();


    this.panes = {};
    return this;
  }

  function initHTML() {
    
    this.$newRule    = this.$root.find('.newRule:first');
    this.$addRule    = this.$root.find('.addRule:first');
    this.$ruleForm   = this.$root.find('.ruleset-define-form:first');
    this.$ruleList   = this.$root.find('.ruleset-list:first');
    this.$rulesPanel = this.$root.find('.rulesets:first');
    this.$rulePanel  = this.$root.find('.rule:first');
    this.$toRule     = this.$root.find('.next');
  }

  function registerEvents() {
    this.$toRule.click(function() {
      self.rulePanel();
    });

  }

  function rulePanel(rule) {
    this.$rulePanel.removeClass('panel-out')
      .addClass('panel-in');
  }

  function rulesPanel() {
    this.$rulePanel.removeClass('panel-in')
      .addClass('panel-out');
  }

  function addPane(name, html) {
    this.panes[name] = true;
  }

}

//var panel = new Panel(root);

class Rules {

  function initialize(root) {
  }

  function saveRule(vals) {
    // save vals from form to local storage
  }

  function updateRules() {
    // rewrite rules list
  }

  function registerEvents() {
    // click a rule to bring up rule page
    // click save to save rule
    // click add rule to show form
  }
}

class RulesManager {
  // handles ui for rule panel
  // displays preview
  // navigate through matches 
  // edit and save rules
  function initialize(root) {
   
  }
}