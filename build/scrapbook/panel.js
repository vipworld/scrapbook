//var root = '<div class="scrapbook"></div>';
$m.Class.extend("Panel", function(KLASS, OO){
  OO.addMember("initialize", function($root){var self=this;
    console.log('called');
    var template = "a.close.icon-white &times;\n.panel.rulesets\n  h1 Existing Rulesets\n  ul.ruleset-list\n    li replace me with rule name\n  button.btn.newRule New Rule\n  form.ruleset-define-form(style=\"display: none;\")\n    input(type=\"text\", name=\"name\", placeholder=\"name\")\n    input(type=\"text\", name=\"table\", placeholder=\"factual table id (optional)\")\n    button.btn.addRule Add Rule\n  a.next Next\n\n.panel.rule.panel-out\n  h1 Rules/Extractions\n  .scrapbook-header\n    button#scrapbook-start-inspector Inspect\n    |  | \n    button#scrapbook-add-extractor Add Extractor\n    |  | \n    button#scrapbook-extract Extract\n  input#scrapbook-selector\n  ul#scrapbook-extractors\n  ul#scrapbook-extracted-results";

    $root.append(jade.compile(template));
    this.$root = $root;
    this.initHTML();
    this.registerEvents();


    this.panes = {};
    return this;
  });

  OO.addMember("initHTML", function(){var self=this;
    
    this.$newRule    = this.$root.find('.newRule:first');
    this.$addRule    = this.$root.find('.addRule:first');
    this.$ruleForm   = this.$root.find('.ruleset-define-form:first');
    this.$ruleList   = this.$root.find('.ruleset-list:first');
    this.$rulesPanel = this.$root.find('.rulesets:first');
    this.$rulePanel  = this.$root.find('.rule:first');
    this.$toRule     = this.$root.find('.next');
  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$toRule.click(function() {
      self.rulePanel();
    });

  });

  OO.addMember("rulePanel", function(rule){var self=this;
    this.$rulePanel.removeClass('panel-out')
      .addClass('panel-in');
  });

  OO.addMember("rulesPanel", function(){var self=this;
    this.$rulePanel.removeClass('panel-in')
      .addClass('panel-out');
  });

  OO.addMember("addPane", function(name, html){var self=this;
    this.panes[name] = true;
  });

});

//var panel = new Panel(root);

$m.Class.extend("Rules", function(KLASS, OO){

  OO.addMember("initialize", function(root){var self=this;
  });

  OO.addMember("saveRule", function(vals){var self=this;
    // save vals from form to local storage
  });

  OO.addMember("updateRules", function(){var self=this;
    // rewrite rules list
  });

  OO.addMember("registerEvents", function(){var self=this;
    // click a rule to bring up rule page
    // click save to save rule
    // click add rule to show form
  });
});

$m.Class.extend("RulesManager", function(KLASS, OO){
  // handles ui for rule panel
  // displays preview
  // navigate through matches 
  // edit and save rules
  OO.addMember("initialize", function(root){var self=this;
   
  });
});

