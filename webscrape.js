// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("pinterest-login");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

async function openWindow(where){
  var pinterestUsername = (document.getElementById('pinterestUsername')).value;
  var pinterestPassword = (document.getElementById('pinterestPassword')).value;
  console.log(pinterestUsername);

  fetch("http://localhost:3000/open", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: pinterestUsername,
        password: pinterestPassword
      })
  })
  .then(response => response.text)
  .then(data => console.log(data))
  .catch(error => console.error('Error: ', error));
}
