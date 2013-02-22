class Scrapbook.Preview {
  private {
    var HTML = <<END;
      div.clearfix
        span.result-count.pull-left
        a.pull-right.btn(href="javascript:void(0)").nextResult Next
        a.pull-right.btn(href="javascript:void(0)").prevResult Prev
      ul#scrapbook-previews-list
    END
  }

  function initialize($root) {
    this.$root = $root;
    this.initHTML();
    this.registerEvents();
    this.previews = [];
  }

  function initHTML() {
    this.$root.html(jade.compile(HTML)());
    this.$list = this.$root.find('ul');
    this.$prev = this.$root.find('.prev');
    this.$next = this.$root.find('.next');
    this.$resultCount = this.$root.find('.result-count');
  }

  function registerEvents() {
    this.$prev
  }

  function clear() {
    this.$list.html('');
    this.$resultCount.html('');
    this.currentIndex = 0;
    this.count = 0;
  }

  function showIndex(idx) {
    if (idx < 0) idx = 0;
    this.currentIndex = idx;
    console.log(this.previews);
    this.previews[idx].show();
    this.previews[idx].siblings().hide();
  }

  function displayCount() {
    this.$resultCount.html('Results: ' + this.count.toString());
  }

  function addPreviews($containers) {
    this.count = $containers.length;

    for (var i=0,len=$containers.length; i<len; i++) {
      var $container = $containers.eq(i);
      var result = $container.html();
      Scrapbook.highlighter.highlight("container", $container)

      var $previewLI = $('<li class="preview" style="display: none;"></li>');
      $previewLI.text(result);
      this.previews.push($previewLI);
      this.$list.append($previewLI)
    }
    if (this.count > 0) {
      this.displayCount();
      this.showIndex(0);
    } else {
      this.clear();
    }
  }
}
