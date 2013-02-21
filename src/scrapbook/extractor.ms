class Scrapbook.Extractor {
  private {
    var HTML = <<END;
      li.scrapbook-extractor
        dt name:
        dd
          input.scrapbook-extractor-name
        dt regexp:
        dd
          input.scrapbook-extractor-regexp
        dt dom:
        dd
          input.scrapbook-extractor-dom
    END
  }

  function initialize($parent, hash) {
    this.$parent = $parent;
    this.initHTML();
    this.populateByHash(hash);
  }

  function initHTML() {
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);;

    this.$txtName = this.$root.find(".scrapbook-extractor-name");
    this.$txtRegexp = this.$root.find(".scrapbook-extractor-regexp");
    this.$txtDom = this.$root.find(".scrapbook-extractor-dom");

    this.$cover = $(jade.compile(".scrapbook-highlight-extractor")()).appendTo("body");
  }

  function populateByHash(hash) {
    hash = hash || {};

    if (hash.name) this.$txtName.val(hash.name);
    if (hash.regexp) this.$txtRegexp.val(hash.regexp);
    if (hash.dom) this.$txtDom.val(hash.dom);
  }

  function extract($target) {
    var extractor = this.toHash();
    var extracted = "";

    if (extractor.regexp) {
      extracted = $target.html().match(extractor.regexp)[1];
    } else if (extractor.dom) {
      var $subTarget = $target.find(extractor.dom);
      this.highlight($subTarget);
      extracted = $subTarget.text();
    }

    return [ extractor.name, extracted ];
  }

  function toHash() {
    return {
      name: this.$txtName.val() || "NO NAME",
      regexp: this.$txtRegexp.val(),
      dom: this.$txtDom.val()
    }
  }

  function remove() {
    this.$cover.remove();
    this.$root.remove();
  }

  function highlight($subTarget) {
    var offset = $subTarget.offset();

    this.$cover.css("top", offset.top);
    this.$cover.css("left", offset.left);
    this.$cover.width($subTarget.width());
    this.$cover.height($subTarget.height());
  }
}
