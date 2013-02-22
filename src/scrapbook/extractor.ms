class Scrapbook.Extractor {
  private {
    var HTML = <<END;
      li.scrapbook-extractor
        .input-append
          input.scrapbook-extractor-name(name="name", type="text", placeholder="field name")
          .btn-group
            button.btn.dropdown-toggle Method
            ul.dropdown-menu
              li dom
              li regex
        input.scrapbook-extractor-dom(name="name", type="text", placeholder="selector/regex")
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
      Scrapbook.highlighter.highlight("extractor", $subTarget);
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
    this.$root.remove();
  }
}
