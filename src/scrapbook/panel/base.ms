class Scrapbook.Panel.Base {
  function initialize($parent, main) {
    this.$parent = $parent;
    this.main = main;

		this.initHTML();
		this.registerEvents();
  }

	function show() {
		this.$root.show();
	}

	function hide() {
		this.$root.hide();
	}
}
