class Scrapbook.Panel.Ruleset extends Scrapbook.Panel.Base {
  private {
    var HTML = <<END;
      .panel.ruleset
        h1 Existing Rulesets
        ul.ruleset
        button.btn.newRules New Rules
    END
  }

	var NAME = "RULESET";

  function initHTML() {
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$newRule  = this.$root.find('.newRules:first');
    this.$ruleList = this.$root.find('.ruleset:first');

    this.populate();
  }

  function registerEvents() {
    this.$newRule.click(function() {
    });
    chrome.storage.onChanged.addListener(#{
      self.populate();
    });
  }

  function populate() {
    chrome.storage.local.get("ruleset", function(obj) {
      self.ruleset = obj.ruleset || {};

      var html = "";
      for (var key in self.ruleset) {
        html += "<li>" + key + "</li>"
      }
      self.$ruleList.html(html);
    });

  }
}
