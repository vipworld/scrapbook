Scrapbook.Panel.Base.extend("Scrapbook.Panel.Api", function(KLASS, OO){
  
    var HTML = ".panel.api\n  h1 API Query\n  input.key(place-holder=\"key\")\n  br\n  input.secret(place-holder=\"secret\")\n  br\n  input.path(place-holder=\"path\")\n  br\n  button.query Query\n  br\n  pre.res";
  

	OO.addMember("NAME", "API");

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

