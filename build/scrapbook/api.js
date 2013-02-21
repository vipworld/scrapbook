$m.Class.extend("Scrapbook.Api", function(KLASS, OO){
  
    var HTML = ".scrapbook-api\n  input.key\n  br\n  input.secret\n  br\n  input.path\n  br\n  button.query Query\n  br\n  pre.res";
  

  OO.addMember("initialize", function($parent){var self=this;
    this.$parent = $parent;

    this.initHTML();
    this.registerEvents();
  });

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$key = this.$root.find(".key");
    this.$secret = this.$root.find(".secret");
    this.$path = this.$root.find(".path");
    this.$query = this.$root.find(".query");
    this.$res = this.$root.find(".res");
  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$query.click(function() { self.query() });
  });

  OO.addMember("query", function(){var self=this;
    var url = "http://api.v3.factual.com" + this.$path.val();
    var authorization = oauthHeader(this.$key.val(), this.$secret.val(), url);

    $.ajax({
      url: url,
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', authorization)
      },
      success: function(res) {
        self.$res.html(JSON.stringify(res, null, 2));
      }
    });
  });
});

