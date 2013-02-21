$m.Class.extend("Scrapbook.Main", function(KLASS, OO){
  
    var HTML = ".scrapbook\n  .actions\n    a.close.icon-white &times;\n    a.prev <-\n    |  \n    a.next ->\n  .panels";
  

  OO.addMember("initialize", function(){var self=this;
<<<<<<< HEAD
    this.inspector = new Scrapbook.Inspector();
    this.rules = new Rules();
    this.highlighters = [];
    this.extractors = [];
=======
    this.index  = 0;
    this.panels = [];
>>>>>>> improved panels

    this.initHTML();
    this.registerEvents();
    this.initPanels();
  });

  OO.addMember("initHTML", function(){var self=this;
<<<<<<< HEAD
    this.$root = $('<div id="scrapbook" class="scrapbook"></div>').appendTo("body");
    this.panel = new Panel(this.$root, this.rules);
=======
    this.$root = $(jade.compile(HTML)()).appendTo("body");
>>>>>>> improved panels

    this.$close  = this.$root.find(".close");
    this.$prev   = this.$root.find(".prev");
    this.$next   = this.$root.find(".next");
    this.$panels = this.$root.find(".panels");
  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$close.click(function($1,$2,$3){});
    this.$prev.click(function($1,$2,$3){ self.prevPanel() })
    this.$next.click(function($1,$2,$3){ self.nextPanel() })
  });

  OO.addMember("initPanels", function(){var self=this;
    this.panels.push(new Scrapbook.Panel.Ruleset(this.$panels));
    this.panels.push(new Scrapbook.Panel.Rules(this.$panels));
    this.panels.push(new Scrapbook.Panel.Api(this.$panels));

    this.switchToPanel("RULESET");
  });

  OO.addMember("prevPanel", function(){var self=this;
    this.panels[this.index].hide();

    this.index--;
    if (this.index < 0) this.index = this.panels.length - 1;

    this.panels[this.index].show();
  });

  OO.addMember("nextPanel", function(){var self=this;
    this.panels[this.index].hide();

    this.index++;
    if (this.index > (this.panels.length - 1)) this.index = 0;

    this.panels[this.index].show();
  });

  OO.addMember("switchToPanel", function(name){var self=this;
    for (var _i_0=0,panel=null,_list_0=this.panels,_len_0=_list_0.length;(panel=_list_0[_i_0])||_i_0<_len_0;_i_0++) {
      if (panel.NAME == name) {
        panel.show();
      } else {
        panel.hide();
      }
    }
  });
});

