class Scrapbook.Panel.Ruleset extends Scrapbook.Panel.Base {
  private {
    var HTML = <<END;
      .panel.ruleset
        h1 Existing Rulesets
        ul.ruleset
        button.btn.newRules New Rules
        form.ruleset-define-form(style="display: none;")
          input(type="text", name="name", placeholder="name")
          input(type="text", name="table", placeholder="factual table id (optional)")
          a(href="javascript:void(0)").btn.addRule Add Rule
        a.clearRules Clear Rules
    END
  }

  var NAME = "RULESET";

  function initHTML() {
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$newRule  = this.$root.find('.newRules:first');
    this.$ruleList = this.$root.find('.ruleset-list:first');
    this.$ruleForm = this.$root.find('.ruleset-define-form:first');
    this.$addRule  = this.$root.find('.addRule:first');
    this.$clearRules = this.$root.find('.clearRules');

    this.populate();
  }

  function registerEvents() {
    this.$newRule.click(function() {
    });

    this.rulestore.on('change', #{
      self.populate($1);
    });

    this.$newRule.click(function() {
      self.$newRule.hide();
      self.$ruleForm.show();
    });

    this.$addRule.click(function(e) {
      e.preventDefault();
      var form     = $(e.target).parents('form');
      self.saveRule(form);
      //self.clearForm();

      self.populate();
      self.$newRule.show();
      self.$ruleForm.fadeOut();
    });

    this.$clearRules.click(#{
      self.rulestore.getRules(#{
        console.log($1);
      });
    });
  }

  function getRules() {
    chrome.storage.local.get(null, function(keys) {
      console.log(keys);
    });
  }

  function saveRule(form) {
    var name     = form.find('input[name="name"]').val();
    var table_id = form.find('input[name="table"]').val();
    this.rulestore.saveRule(name, { table_id: table_id });
  }

  function populate(rules) {
    var html = "";
    for (var key in rules) {
      html += "<li>" + key + "</li>"
    }
  }
}
