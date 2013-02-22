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

  function initialize($parent) {
		this.highlighters = [];
		this.extractors = [];

    this.inspector = new Scrapbook.Inspector();

		this.$super($parent);
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
    this.$txtSelector.keyup(#{ self.highlightAll() });
    this.inspector.on("inspected", #{ self.inspect($1) });
  }

  function show() {
    this.$root.show();
  }

  function hide() {
    this.$root.hide();
  }

  function startInspector() {
    this.removeHighlighters();
    this.inspector.enable();
  }

  function inspect($target) {
    this.inspector.disable();
    this.$txtSelector.val($target.getPath());
    this.highlightAll();
  }

  function highlightAll() {
    this.removeHighlighters();
    this.$ulPreviews.html("");

    var $containers = this.getJqContainers();
    $containers.each(#{ new Scrapbook.Preview(self.$ulPreviews, $($2)) });

    for (var i=0,len=$containers.length; i<len; i++) {
      var $cover = $(jade.compile(".scrapbook-highlight-container")()).appendTo("body");
      this.highlight($containers.eq(i), $cover);
      this.highlighters.push($cover);
    }
  }

  function highlight($target, $cover) {
    var offset = $target.offset();

    $cover.css("top", offset.top);
    $cover.css("left", offset.left);
    $cover.width($target.width());
    $cover.height($target.height());
  }

  function removeHighlighters() {
    for (var i=0,len=this.highlighters.length; i<len; i++) {
      this.highlighters[i].remove();
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
    var name = prompt("Enter Rules' Name:", "Name");
    chrome.storage.local.get("ruleset", function(ruleset) {
      ruleset = ruleset || {};
      ruleset[name] = self.toHash();
      chrome.storage.local.set({ "ruleset": ruleset }, #{
        alert("Saved!");
      });
    });
  }

  function toHash() {
    return {
      selector: this.$txtSelector.val(),
      extractors: this.extractors.map(#{ => $1.toHash() })
    };
  }

  function fromHash(hash) {
    this.$txtSelector.val(hash["selector"]);
    this.extractors.forEach(#{ $1.remove() });
    hash["extractors"].forEach(#{
      self.extractors.push(new Scrapbook.Extractions(self.$ulExtractors, $1));
    })
  }
}
