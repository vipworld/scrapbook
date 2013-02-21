class Scrapbook.Inspector {
  include $m.EventEmitter;

  function initialize() {
    this.initHTML();
    this.registerEvents();
  }

  function initHTML() {
    this.$root = $(jade.compile(".scrapbook-inspector")()).appendTo("body");
  }

  function registerEvents() {
    $(window).mousemove(#(e) {
      self.inspect(e.pageX - window.scrollX, e.pageY - window.scrollY);
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

  function inspect(x, y) {
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

  function inspected() {
    this.emit("inspected", this.$target);
  }
}
