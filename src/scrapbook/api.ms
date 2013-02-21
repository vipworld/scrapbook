class Scrapbook.Api {
  private {
    var HTML = <<END;
      .scrapbook-api
        input.key
        br
        input.secret
        br
        input.path
        br
        button.query Query
        br
        pre.res
    END
  }

  function initialize($parent) {
    this.$parent = $parent;

    this.initHTML();
    this.registerEvents();
  }

  function initHTML() {
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$key = this.$root.find(".key");
    this.$secret = this.$root.find(".secret");
    this.$path = this.$root.find(".path");
    this.$query = this.$root.find(".query");
    this.$res = this.$root.find(".res");
  }

  function registerEvents() {
    this.$query.click(#() { self.query() });
  }

  function query() {
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
  }
}
