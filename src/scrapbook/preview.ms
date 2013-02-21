class Scrapbook.Preview {
  function initialize($parent, $target) {
    this.$parent = $parent;
    this.$target = $target;

    this.initHTML();
  }

  function initHTML() {
    this.$root = $(jade.compile("li.preview")());
    this.$parent.append(this.$root);
    this.$root.html(this.$target.html());
  }
}
