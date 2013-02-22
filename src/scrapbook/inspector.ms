class Scrapbook.Inspector {
  function initialize() {
    this.initHTML();
    this.registerEvents();
  }

  function initHTML() {
    this.$root = $(jade.compile(".scrapbook-inspector")()).appendTo("body");
    console.log(this.$root);
  }

  function registerEvents() {
    $(window).mousemove(#(e) {
      self.inspecting(e.pageX - window.scrollX, e.pageY - window.scrollY);
    });

    this.$root.click(#{ self.inspected() });
  }

  function enable() {
    this._enable = true;
  }

  function disable() {
    this._enable = false;
  }

  function show() {
    this.$root.show();
  }

  function hide() {
    this.$root.hide();
  }

  function inspecting(x, y) {
    this.hide();

    if (this._enable) {
      this.$target = $(document.elementFromPoint(x, y));
      var offset = this.$target.offset();

      this.$root.css("top", offset.top);
      this.$root.css("left", offset.left);
      this.$root.width(this.$target.width());
      this.$root.height(this.$target.height());

      this.show();
    }
  }

  function inspect(callback) {
    this.callback = callback;
    this.enable();
  }

  function inspected() {
    if (this.callback) {
      this.callback(this.$target);
      this.callback = null;
    }

    this.disable();
  }
}

Scrapbook.inspector = new Scrapbook.Inspector();
