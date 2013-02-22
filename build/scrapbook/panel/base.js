$m.Class.extend("Scrapbook.Panel.Base", function(KLASS, OO){
  OO.addMember("initialize", function($parent, main){var self=this;
    this.$parent = $parent;
    this.main = main;

		this.initHTML();
		this.registerEvents();
  });

	OO.addMember("show", function(){var self=this;
		this.$root.show();
	});

	OO.addMember("hide", function(){var self=this;
		this.$root.hide();
	});
});

