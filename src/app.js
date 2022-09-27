function noResults() {
  let div = document.getElementsByClassName("results-container")[0];
  div.innerHTML = `
        <div class="media">
        <img src="media/cat-sad-cute-kitten.gif" class="no-results" alt="no results kitty" />
        <p>This query returned no results </br> :(</p>
      </div>
    `;
}

function printResults(results) {
  // TODO
  console.log(results);
}

function renderLogic(results) {
  if (results.message == "Not Found") {
    noResults();
  } else {
    printResults(results);
  }
}

function getResults() {
  let githubUser = document.getElementById("search-input").value;

  // trucu al senyor github i li dic q em retorni resultats
  fetch(`https://api.github.com/users/${githubUser}`)
    .then((response) => response.json())
    .then((data) => renderLogic(data));
}

let searchButton = document.getElementById("search-button");
searchButton.onclick = getResults;
