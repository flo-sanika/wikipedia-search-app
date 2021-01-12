const formulaire = document.getElementById("submit-form");
// console.log(typeof(formulaire));

formulaire.addEventListener('submit', search);

async function search(event) {
      // prevent page from reloading when form is submitted
      event.preventDefault();
      // if the page has something in it, remove it :
      if (document.querySelectorAll('.queryResult')) {
            document.querySelectorAll('.queryResult').forEach(elem => elem.remove());
      }
      let spinner = document.querySelector(".spinner");
      spinner.classList.remove('hide');
      // get the value of the input field
      let searchQuery = event.currentTarget.elements[0].value;
      searchQuery = searchQuery.trim();
      // console.log(searchQuery);
      let results = "";
      try {
            results = await searchWikipedia(searchQuery);
            
      } catch (error) {
            console.log(error);
            alert("problem in catch line 18");
      }
      console.log(results);
      spinner.classList.add('hide');
      affichageResultat(results);
}

async function searchWikipedia(searchQuery) {
      console.log(searchQuery);
      let endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
      let result = await fetch(endpoint)
            .then(response=> response.json())
            .catch(error => console.log(error));
      // console.log(result);
            
      return result;
}

// le titre de la div sera query.search.title en bleu souligner
// le titre est un lien vers https://en.wikipedia.org/?curid=query.search.pageid
// en dessous viens l'adresse vers le lien en vert
// en dessous viens le snippet de la page
function affichageResultat(resultat) {
      
      let main = document.getElementById("container");
      
      
      for (const searchResult in resultat.query.search) {
            if (Object.hasOwnProperty.call(resultat.query.search, searchResult)) {
                  let div = document.createElement('div');
                  let title = document.createElement('h3');
                  let lien = document.createElement('a');
                  let texte = document.createElement('p');

                  const result = resultat.query.search[searchResult];
                  
                  
                  // definition des classes :
                  div.className="queryResult";
                  title.className='title';
                  lien.className="lien";
                  texte.className="resume";
                  
                  // les liens :
                  const link = `https://en.wikipedia.org/?curid=${result.pageid}`;
                  lien.innerHTML = link;
                  lien.href = link;
                  title.innerHTML = `<a href=${link}>${result.title}</a>`;
                  
                  // aperçu : 
                  texte.innerHTML = result.snippet;
                  
                  div.append(title);
                  div.append(lien);
                  div.append(texte);
                  main.append(div);
            }
      }
}
      
      
      