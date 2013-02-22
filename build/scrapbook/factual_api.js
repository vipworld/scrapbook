$m.Class.extend("Scrapbook.FactualApi", function(KLASS, OO){
  
    var BASE_URL = "http://api.v3.factual.com";
  

  OO.addMember("submit", function(viewId, values, callback){var self=this;
    var url = BASE_URL + "/t/" + viewId + "/submit";

    this.getAuthorization("POST", url, function (authorization) {
      $.ajax({
        url: url,
        type: "POST",
        data: {
          values: JSON.stringify(values),
          user: "Scrapbook"
        },
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('Authorization', authorization);
        },
        success: function(res) {
          callback(res);
        }
      });
    });

    this.getAuthorization("GET", BASE_URL + "/t/places", function (authorization) {
      $.ajax({
        url: BASE_URL + "/t/places",
        type: "GET",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', authorization);
        },
        success: function(res) {
          callback(res);
        }
      });
    });
  });

  OO.addMember("getAuthorization", function(method, url, cb){var self=this;
    chrome.storage.local.get("options", function (data) {
      var key = data["options"]["key"] || "";
      var secret = data["options"]["secret"] || "";

      cb(Scrapbook.utils.oauthHeader(key, secret, method, url));
    });
  });
});

Scrapbook.factualApi = new Scrapbook.FactualApi();

