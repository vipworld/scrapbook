function save_options() {
  var table_key = document.getElementById("key_value").value;
  localStorage["last_key"] = table_key;
  var secret_value = document.getElementById("secret_value").value;
  localStorage["last_secret"] = secret_value;
  alert("Submitted " + localStorage["last_key"])
};

function restore_options() {
  var previous_key = localStorage["last_key"];
  var last_secret = localStorage["last_secret"];
  if (previous_key) {
    document.getElementById("key_value").value = previous_key;
  };
  if (last_secret) {
  document.getElementById("secret_value").value = last_secret;
  };
};

document.querySelector('#save').addEventListener('click', save_options);
document.addEventListener('DOMContentLoaded', restore_options);