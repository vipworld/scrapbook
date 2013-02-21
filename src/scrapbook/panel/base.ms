class Scrapbook.Panel.Base {
  function initialize($parent) {
    this.$parent = $parent;

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
