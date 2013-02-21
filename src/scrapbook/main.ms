class Scrapbook.Main {
  private {
    var HTML = <<END;
      .scrapbook
        .scrapbook-header
          button#scrapbook-start-inspector Inspect
          |  | 
          button#scrapbook-add-extractor Add Extractor
          |  | 
          button#scrapbook-extract Extract
        input#scrapbook-selector
        ul#scrapbook-extractors
        ul#scrapbook-extracted-results
    END
  }

  function initialize() {
    this.inspector = new Scrapbook.Inspector();
    this.highlighters = [];
    this.extractors = [];

    this.initHTML();
    this.registerEvents();
  }

  function initHTML() {
    this.$root = $('<div id="scrapbook" class="scrapbook"></div>').appendTo("body");
    this.panel = new Panel(this.$root);

    this.$btnStartInspector = this.$root.find("#scrapbook-start-inspector");
    this.$btnAddExtractor = this.$root.find("#scrapbook-add-extractor");
    this.$btnExtract = this.$root.find("#scrapbook-extract");

    this.$txtSelector = this.$root.find("#scrapbook-selector");

    this.$ulExtractors = this.$root.find("#scrapbook-extractors");
    this.$ulResults = this.$root.find("#scrapbook-extracted-results");
  }

  function registerEvents() {
    this.$btnStartInspector.click(#{ self.startInspector() });
    this.$btnAddExtractor.click(#{ self.addExtractor() });
    this.$btnExtract.click(#{ self.extract() });
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
    this.inspector.enable();
    this.hide();
  }

  function inspect($target) {
    this.inspector.disable();
    this.$txtSelector.val($target.getPath());
    this.highlightAll();
    this.show();
  }

  function highlightAll() {
    this.removeHighlighters();

    $containers = this.getJqContainers();
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
    var results = this.getJqContainers().map(#(index, c){
      return self.extractors.map(#(e) { => e.extract($(c)) });
    });

    console.log(results);
  }

  function getJqContainers() {
    return $(this.$txtSelector.val());
  }
}
