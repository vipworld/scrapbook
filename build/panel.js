//var root = '<div class="scrapbook"></div>';
$m.Class.extend("Panel", function(KLASS, OO){
  OO.addMember("initialize", function($root){var self=this;
    // manage main view for side panel
    // navigate panes
    // dispatch commands to extension
    var html = "<button id=\"scrapbook-inspector-enabler\">enable inspector</button> | <button id=\"scrapbook-add-extractor\">add extractor</button> | <button id=\"scrapbook-extract\">extract</button><br/>css selector: <input id=\"scrapbook-selector\"/><ul id=\"scrapbook-extractors\"></ul><ul id=\"scrapbook-results\"></ul>";

    var template "a.close.icon-white &times;\n.panel.rulesets\n  h1 Existing Rulesets\n  ul.ruleset-list\n    li replace me with rule name\n  button.btn.newRule New Rule\n  form.ruleset-define-form(style=\"display: none;\")\n    input(type=\"text\", name=\"name\", placeholder=\"name\")\n    input(type=\"text\", name=\"table\", placeholder=\"factual table id (optional)\")\n    button.btn.addRule Add Rule\n  a.next Next\n\n.panel.rule.panel-out\n  h1 Rules/Extractions";
    console.log(template);
    $root.html(html);
    //$root.append(jade.compile(template));

    this.$root = $root;

    this.panes = {};
    return this;
  });

  OO.addMember("addPane", function(name, html){var self=this;
    this.panes[name] = true;
  });

  OO.addMember("showPane", function(name){var self=this;
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

