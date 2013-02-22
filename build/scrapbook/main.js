$m.Class.extend("Scrapbook.Main", function(KLASS, OO){
  
    var HTML = ".scrapbook\n  .actions\n    a.close.icon-white &times;\n    a.back(href=\"javascript:void(0)\") Back\n  .panels";
  

  OO.addMember("initialize", function(){var self=this;
    this.index  = 0;
    this.panels = [];
    this.rulestore = new RuleStore();

    this.initHTML();
    this.registerEvents();
    this.initPanels();
  });

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile(HTML)()).appendTo("body");

    this.$close  = this.$root.find(".close");
    this.$back   = this.$root.find(".back:first").hide();
    //this.$prev   = this.$root.find(".prev");
    //this.$next   = this.$root.find(".next");
    this.$panels = this.$root.find(".panels");
  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$close.click(function($1,$2,$3){});
    //this.$prev.click(#{ self.prevPanel() })
    //this.$next.click(#{ self.nextPanel() })
  });

  OO.addMember("initPanels", function(){var self=this;
    this.panels.push(new Scrapbook.Panel.Ruleset(this.$panels, this));
    this.panels.push(new Scrapbook.Panel.Rules(this.$panels, this));
    this.panels.push(new Scrapbook.Panel.Api(this.$panels, this));

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

  OO.addMember("getPanel", function(name){var self=this;
    for (var _i_1=0,panel=null,_list_1=this.panels,_len_1=_list_1.length;(panel=_list_1[_i_1])||_i_1<_len_1;_i_1++) {
      if (panel.NAME == name) return panel;
    }
  });

  OO.addMember("showRulesPanel", function(key, value){var self=this;
    console.log(key, value)
    this.getPanel("RULES").fromHash(value);
    this.switchToPanel("RULES");
  });
});

