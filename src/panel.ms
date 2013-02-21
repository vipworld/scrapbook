//var root = '<div class="scrapbook"></div>';
class Panel {
  function initialize($root) {
    // manage main view for side panel
    // navigate panes
    // dispatch commands to extension
    var html = "<button id=\"scrapbook-inspector-enabler\">enable inspector</button> | <button id=\"scrapbook-add-extractor\">add extractor</button> | <button id=\"scrapbook-extract\">extract</button><br/>css selector: <input id=\"scrapbook-selector\"/><ul id=\"scrapbook-extractors\"></ul><ul id=\"scrapbook-results\"></ul>";

    var template <<END;
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
    END
    console.log(template);
    $root.html(html);
    //$root.append(jade.compile(template));

    this.$root = $root;

    this.panes = {};
    return this;
  }

  function addPane(name, html) {
    this.panes[name] = true;
  }

  function showPane(name) {
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
