$m.Class.extend("Scrapbook.Preview", function(KLASS, OO){
  
    var HTML = "div.clearfix\n  span.result-count.pull-left\n  a.pull-right.btn(href=\"javascript:void(0)\").nextResult Next\n  a.pull-right.btn(href=\"javascript:void(0)\").prevResult Prev\nul#scrapbook-previews-list";
  

  OO.addMember("initialize", function($root){var self=this;
    this.$root = $root;
    this.initHTML();
    this.registerEvents();
    this.previews = [];
  });

  OO.addMember("initHTML", function(){var self=this;
    this.$root.html(jade.compile(HTML)());
    this.$list = this.$root.find('ul');
    this.$prev = this.$root.find('.prev');
    this.$next = this.$root.find('.next');
    this.$resultCount = this.$root.find('.result-count');
  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$prev
  });

  OO.addMember("clear", function(){var self=this;
    this.$list.html('');
    this.$resultCount.html('');
    this.currentIndex = 0;
    this.count = 0;
  });

  OO.addMember("showIndex", function(idx){var self=this;
    if (idx < 0) idx = 0;
    this.currentIndex = idx;
    console.log(this.previews);
    this.previews[idx].show();
    this.previews[idx].siblings().hide();
  });

  OO.addMember("displayCount", function(){var self=this;
    this.$resultCount.html('Results: ' + this.count.toString());
  });

  OO.addMember("addPreviews", function($containers){var self=this;
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
  });
});

