class Scrapbook.Panel.Rules extends Scrapbook.Panel.Base {
  private {
    var HTML = <<END;
      .panel.rules
        h1 Rules/Extractions
        .scrapbook-header
          button.btn#scrapbook-start-inspector Inspect
          button.btn.pull-right#scrapbook-back Back
          button.btn.btn-success.pull-right#scrapbook-save Save
          p
          #scrapbook-previews
          p
          input.input-large#scrapbook-selector
          p
          button.btn#scrapbook-add-extractor Add Extractor
          ul#scrapbook-extractors
          p
          button.btn#scrapbook-extract Extract
    END

    var FACTUAL_URL = "http://api.v3.factual.com";
  }

	var NAME = "RULES";

  function initialize($parent, main) {
		this.extractors = [];

    this.inspector = new Scrapbook.Inspector();

		this.$super($parent, main);
  }

  function initHTML() {
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$btnStartInspector = this.$root.find("#scrapbook-start-inspector");
    this.$btnAddExtractor = this.$root.find("#scrapbook-add-extractor");
    this.$btnExtract = this.$root.find("#scrapbook-extract");
    this.$btnSave = this.$root.find("#scrapbook-save");
    this.$btnBack = this.$root.find("#scrapbook-back");
    this.$btnSubmit = this.$root.find("#scrapbook-submit");

    this.$txtSelector = this.$root.find("#scrapbook-selector");

    this.$selectorPreviews = this.$root.find("#scrapbook-previews");
    this.$ulExtractors = this.$root.find("#scrapbook-extractors");
    this.$ulResults = this.$root.find("#scrapbook-extracted-results");


    this.previewPane = new Scrapbook.Preview(self.$selectorPreviews)
  }

  function registerEvents() {
    this.$btnStartInspector.click(#{ self.startInspector() });
    this.$btnAddExtractor.click(#{ self.addExtractor() });
    this.$btnExtract.click(#{ self.extract() });
    this.$btnSave.click(#{ self.save() });
    this.$btnBack.click(#{ self.back() });
    this.$btnSubmit.click(#{ self.submit() });
    this.$txtSelector.keyup(#{ self.process() });
  }

  function show() {
    this.$root.show();
  }

  function hide() {
    this.$root.hide();
  }

  function startInspector() {
    Scrapbook.highlighter.unHighlight("ALL");
    Scrapbook.inspector.inspect(#($target){
      self.$txtSelector.val($target.getPath("SMART"));
      self.process();
    })
  }

  function process() {
    Scrapbook.highlighter.unHighlight("ALL");
    //this.$selectorPreviews.html("");

    var $containers = this.getJqContainers();

    this.previewPane.clear();
    this.previewPane.addPreviews($containers);

  }

  function addExtractor() {
    this.extractors.push(new Scrapbook.Extractor(this.$ulExtractors));
  }

  function extract() {
    var $containers = this.getJqContainers();

    var html = ""

    foreach (var container in $containers) {
      var result = this.extractors.map(#{ => $1.extract($(container)) });
      console.log(result);

      html += "<li>";
      result.forEach(#{
        html += $1[0] + ": " + $1[1] + "<br/>";
      });
      html += "</li>";
    }

    this.$ulResults.html(html);
  }

  function getJqContainers() {
    return $(this.$txtSelector.val());
  }

  function save() {
    if (!this.hash.name) {
      this.hash.name = prompt("Enter Rules' Name:", "Name");
    }
    this.rulestore.saveRule(this.hash.name, this.toHash());
  }

  function toHash() {
    return {
      name: this.hash.name,
      table_id: this.hash.table_id,
      timestamp: new Date(),
      site: this.hash.site,
      selector: this.$txtSelector.val(),
      extractors: this.extractors.map(#{ => $1.toHash() })
    };
  }

  function fromHash(hash) {
    this.reset();
    this.$txtSelector.val(hash["selector"] || "");
    (hash["extractors"] || []).forEach(#{
      self.extractors.push(new Scrapbook.Extractor(self.$ulExtractors, $1));
    });
    this.hash = hash;
    this.process();
  }

  function reset() {
    //this.$ulPreviews.html("");
    Scrapbook.highlighter.unHighlight("ALL");
    this.extractors.forEach(#{ $1.remove() })
  }

  function back() {
    this.main.switchToPanel("RULESET");
  }

  function submit() {
    var $containers = this.getJqContainers();
    var url = FACTUAL_URL + "/t/" + this.hash.table_id + "/submit"
    var queries = [];

    foreach (var container in $containers) {
      var values = {};
      this.extractors.map(#{ => $1.extract($(container)) }).forEach(#{
        values[$1[0]] = $1[1];
      });
      queries.push({
        values: values,
        user: "Scrapbook"
      });
    }

    var text = [
      "POST: " + url,
      "Queries:",
      queries.map(#{ => "  " + $2 + ": " + JSON.stringify($1) }).join("\n")
    ].join("\n");

    alert(text);
  }
}
