$m.Class.extend("Scrapbook.Inspector", function(KLASS, OO){
  OO.addMember("initialize", function(){var self=this;
    this.initHTML();
    this.registerEvents();
  });

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile(".scrapbook-inspector")()).appendTo("body");
    console.log(this.$root);
  });

  OO.addMember("registerEvents", function(){var self=this;
    $(window).mousemove(function(e) {
      self.inspecting(e.pageX - window.scrollX, e.pageY - window.scrollY);
    });

    this.$root.click(function($1,$2,$3){ self.inspected() });
  });

  OO.addMember("enable", function(){var self=this;
    this._enable = true;
  });

  OO.addMember("disable", function(){var self=this;
    this._enable = false;
  });

  OO.addMember("show", function(){var self=this;
    this.$root.show();
  });

  OO.addMember("hide", function(){var self=this;
    this.$root.hide();
  });

  OO.addMember("inspecting", function(x, y){var self=this;
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
  });

  OO.addMember("inspect", function(callback){var self=this;
    this.callback = callback;
    this.enable();
  });

  OO.addMember("inspected", function(){var self=this;
    if (this.callback) {
      this.callback(this.$target);
      this.callback = null;
    }

    this.disable();
  });
});

Scrapbook.inspector = new Scrapbook.Inspector();

