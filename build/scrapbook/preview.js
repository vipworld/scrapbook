$m.Class.extend("Scrapbook.Preview", function(KLASS, OO){
  OO.addMember("initialize", function($parent, $target){var self=this;
    this.$parent = $parent;
    this.$target = $target;

    this.initHTML();
  });

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile("li.preview")());
    this.$parent.append(this.$root);
    this.$root.text(this.$target.html());
  });
});

