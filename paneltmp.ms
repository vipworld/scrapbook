
class Panel {
  function initialize($root) {
    // manage main view for side panel
    // navigate panes
    // dispatch commands to extension
    var html = "<button id=\"scrapbook-inspector-enabler\">enable inspector</button> | <button id=\"scrapbook-add-extractor\">add extractor</button> | <button id=\"scrapbook-extract\">extract</button><br/>css selector: <input id=\"scrapbook-selector\"/><ul id=\"scrapbook-extractors\"></ul><ul id=\"scrapbook-results\"></ul>";

    var template = <<END;
      a.close.icon-white x
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
        button.btn#scrapbook-inspector-enabler enable inspector
        button.btn#scrapbook-add-extractor add extractor
        button.btn#scrapbook-extract extract
        input#scrapbook-selector
        ul#scrapbook-extractors
        ul#scrapbook-results

    END
    $root.html(html);
    $root.append(jade.compile(template));

    this.$root = $root;

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

  function showPane(name) {
  }
}
