class Scrapbook.Panel.Ruleset extends Scrapbook.Panel.Base {
  private {
    var HTML = <<END;
      .panel.ruleset
        h1 Existing Rulesets
        ul.ruleset-list.unstyled
        button.btn.newRule New Rule
        form.ruleset-define-form(style="display: none;")
          input(type="text", name="name", placeholder="name")
          input(type="text", name="table", placeholder="factual table id (optional)")
          button.btn.addRule Add Rule
    END
  }

	var NAME = "RULESET";

  function initHTML() {
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$newRule  = this.$root.find('.newRule:first');
    this.$addRule  = this.$root.find('.addRule:first');
    this.$ruleForm = this.$root.find('.ruleset-define-form:first');
    this.$ruleList = this.$root.find('.ruleset-list:first');
  }

  function registerEvents() {
    this.$newRule.click(function() {
      self.$newRule.hide();
      self.$ruleForm.show();
    });

    this.$addRule.click(function(e) {
      e.preventDefault();
      var form = $(e.target).parents('form');
      var vals = form.serializeArray();
      self.saveRule(vals);

      self.$newRule.show();
      self.$ruleForm.fadeOut();
    });
  }

  function saveRule(vals) {
    var html = '';
    html += '<li>'
      + '<a href="javascript:void(0)">'
      + vals[0].value
      + '</a>'
      + '</li>';
    this.$ruleList.append(html);
  }

  function clearForm() {
    // stub
  }
}
