class Scrapbook.Main {
  private {
    var HTML = <<END;
      .scrapbook
        .actions
          a.close.icon-white &times;
          a.back(href="javascript:void(0)") Back
        .panels
    END
  }

  function initialize() {
    this.index  = 0;
    this.panels = [];
    this.rulestore = new RuleStore();

    this.initHTML();
    this.registerEvents();
    this.initPanels();
  }

  function initHTML() {
    this.$root = $(jade.compile(HTML)()).appendTo("body");

    this.$close  = this.$root.find(".close");
    this.$back   = this.$root.find(".back:first").hide();
    this.$panels = this.$root.find(".panels");
  }

  function registerEvents() {
    this.$close.click(#{});
  }

  function initPanels() {
    this.panels.push(new Scrapbook.Panel.Ruleset(this.$panels, this));
    this.panels.push(new Scrapbook.Panel.Rules(this.$panels, this));

    this.switchToPanel("RULESET");
  }

  function switchToPanel(name) {
    foreach (var panel in this.panels) {
      if (panel.NAME == name) {
        panel.show();
      } else {
        panel.hide();
      }
    }
  }

  function getPanel(name) {
    foreach (var panel in this.panels) {
      if (panel.NAME == name) return panel;
    }
  }

  function showRulesPanel(key, value) {
    this.getPanel("RULES").fromHash(value);
    this.switchToPanel("RULES");
  }
}
