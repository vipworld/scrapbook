$m.Class.extend("Scrapbook.FactualApi", function(KLASS, OO){
  
    var BASE_URL = "http://api.v3.factual.com";
  

  OO.addMember("submit", function(viewId, values, callback){var self=this;
    var url = BASE_URL + "/t/" + viewId + "/submit";
    var data = {
      values: JSON.stringify(values),
      user: "Scrapbook"
    };

    this.getAuthorization("POST", url, data, function (authorization) {
      $.ajax({
        url: url,
        type: "POST",
        data: data,
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('Authorization', authorization);
        },
        success: function(res) {
          callback(res);
        }
      });
    });
  });

  OO.addMember("getAuthorization", function(method, url, params, cb){var self=this;
    chrome.storage.local.get("options", function (data) {
      var key = data["options"]["key"] || "";
      var secret = data["options"]["secret"] || "";

      cb(Scrapbook.utils.oauthHeader(key, secret, method, url, params));
    });
  });
});

Scrapbook.factualApi = new Scrapbook.FactualApi();

