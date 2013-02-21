function upload_options() {
  var table_key = document.getElementById("key_value");
  localStorage["last_key"] = table_key;
  var secret_value = document.getElementById("secret_value");
  localStorage["last_secret"] = secret_value;
  alert("Submitted.")
};

function restore_options() {
  var previous_key = localStorage["last_key"];
  if (!previous_key) {
    document.getElementById("key_value").innerHTML = previous_key;
  }
  var last_secret = localStorage["last_secret"];
  if (!last_secret) {
    document.getElementById("secret_value").innerHTML = last_secret;
  }
};

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('.btn').addEventListener('click', save_options);