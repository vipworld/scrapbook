$m.Class.extend("Scrapbook.Preview", function(KLASS, OO){
  
    var HTML = "div.clearfix\n  span.result-count.pull-left\n  a.pull-right.btn(href=\"javascript:void(0)\").nextResult Next\n  a.pull-right.btn(href=\"javascript:void(0)\").prevResult Prev\nul#scrapbook-previews-list";

    var PREVIEW_HTML = "li.preview(style=\"display:none\")";
  

  OO.addMember("initialize", function($root){var self=this;
    this.$root = $root;
    this.initHTML();
    this.registerEvents();
    this.previews = [];
  });

  OO.addMember("initHTML", function(){var self=this;
    this.$root.html(jade.compile(HTML)());
    this.$list = this.$root.find('ul');
    this.$prev = this.$root.find('.prevResult');
    this.$next = this.$root.find('.nextResult');
    this.$resultCount = this.$root.find('.result-count');

    this.previewTmpl = jade.compile(PREVIEW_HTML);
  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$prev.click(function($1,$2,$3){
      console.log('clicked');
      self.showIndex(--self.currentIndex);
    });
    this.$next.click(function($1,$2,$3){
      console.log('clicked');
      self.showIndex(++self.currentIndex);
    });
  });

  OO.addMember("clear", function(){var self=this;
    this.$list.html('');
    this.$resultCount.html('');
    this.previews = [];
    this.currentIndex = 0;
    this.count = 0;
  });

  OO.addMember("showIndex", function(idx){var self=this;
    if (idx < 0) idx = 0;
    if (idx > (this.count - 1)) idx = this.count - 1
    this.currentIndex = idx;
    
    this.previews[idx].show();
    this.previews[idx].siblings().hide();
  });

  OO.addMember("displayCount", function(){var self=this;
    this.$resultCount.html('Results: ' + this.count.toString());
  });

  OO.addMember("populateByTargets", function($targets){var self=this;
    this.clear();

    this.count = $targets.length;

    for (var i=0,len=$targets.length; i<len; i++) {
      var $container = $targets.eq(i);
      var $previewLi = $(this.previewTmpl());

      Scrapbook.highlighter.highlight("container", $container)

      var result = $container.html();
      $previewLi.text(result);

      this.previews.push($previewLi);
      this.$list.append($previewLi)
    }

    if (this.count > 0) {
      this.displayCount();
      this.showIndex(0);
    } else {
      this.clear();
    }
  });
});

