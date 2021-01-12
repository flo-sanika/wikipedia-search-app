const formulaire = document.getElementById("submit-form");
console.log(typeof(formulaire));

formulaire.addEventListener('submit', search);

async function search(event) {
      // prevent page from reloading when form is submitted
      event.preventDefault();
      // get the value of the input field
      let searchQuery = event.currentTarget.elements[0].value.trim();
      let results = "";
      try {
            results = await searchWikipedia(searchQuery);
            
      } catch (error) {
            console.log(error);
            alert("problem in catch line 18");
      }
      console.log(results);
}

async function searchWikipedia(searchQuery) {
      const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
      let result = await fetch(endpoint)
            .then(response=> response.json())
            .catch(error => console.log(error));
      // console.log(result);
            
      return result;
}

      
function affichageResultat(resultat) {

}
      
      
      