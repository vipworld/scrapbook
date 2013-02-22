class Scrapbook.Panel.Rules extends Scrapbook.Panel.Base {
  private {
    var HTML = <<END;
      .panel.rules
        h1 Rules/Extractions
        .scrapbook-header
          button.btn#scrapbook-start-inspector Inspect
          button.btn.btn-success.pull-right#scrapbook-save Save
          p
          ul#scrapbook-previews
          p
          button.btn#scrapbook-add-extractor Add Extractor
          input.input-xxlarge#scrapbook-selector
          p
          ul#scrapbook-extractors
          p
          button.btn#scrapbook-extract Extract
          p
          ul#scrapbook-extracted-results
    END
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

    this.$txtSelector = this.$root.find("#scrapbook-selector");

    this.$ulPreviews = this.$root.find("#scrapbook-previews");
    this.$ulExtractors = this.$root.find("#scrapbook-extractors");
    this.$ulResults = this.$root.find("#scrapbook-extracted-results");
  }

  function registerEvents() {
    this.$btnStartInspector.click(#{ self.startInspector() });
    this.$btnAddExtractor.click(#{ self.addExtractor() });
    this.$btnExtract.click(#{ self.extract() });
    this.$btnSave.click(#{ self.save() });
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
    this.$ulPreviews.html("");

    var $containers = this.getJqContainers();

    for (var i=0,len=$containers.length; i<len; i++) {
      var $container = $containers.eq(i);
      Scrapbook.highlighter.highlight("container", $container)
      new Scrapbook.Preview(self.$ulPreviews, $container)
    }
  }

  function addExtractor() {
    this.extractors.push(new Scrapbook.Extractor(this.$ulExtractors));
  }

  function extract() {
    var $containers = this.getJqContainers();

    var html = ""

    foreach (var container in $containers) {
      var result = self.extractors.map(#{ => $1.extract($(container)) });
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
      self.extractors.push(new Scrapbook.Extractions(self.$ulExtractors, $1));
    });
    this.hash = hash;
  }

  function reset() {
    this.$ulPreviews.html("");
    Scrapbook.highlighter.unHighlight("ALL");
    this.extractors.forEach(#{ $1.remove() })
  }
}
