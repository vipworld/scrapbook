$(function () {
  var $key = $('input.key');
  var $secret = $('input.secret');
  var $save = $('button.save');

  function saveKeySecret() {
    var key = $key.val();
    var secret = $secret.val();

    chrome.storage.local.set({
      options: {
        key: key,
        secret: secret
      }
    }, function () {
      alert("saved!");
    });
  };

  function loadKeySecret() {
    chrome.storage.local.get("options", function (data) {
      $key.val(data["options"]["key"] || "");
      $secret.val(data["options"]["secret"] || "");
    });
  };

  loadKeySecret();

  $save.click(saveKeySecret);
});
