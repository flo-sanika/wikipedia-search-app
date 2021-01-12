const formulaire = document.getElementById("submit-form");
console.log(typeof(formulaire));

formulaire.addEventListener('submit', search);

function search(event) {
      // prevent page from reloading when form is submitted
      event.preventDefault();
      // get the value of the input field
      let inputValue = event.currentTarget.elements[0].value.trim();
      // console.log(inputValue);

}
      
      
      
      
      