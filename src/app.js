function cleanSearch(type) {
  let container = document.getElementsByClassName(`${type}-container`)[0];
  container.innerHTML = ``;
}

function noResults(type) {
  if (type == "results") {
    cleanSearch("repos");
  }
  let div = document.getElementsByClassName(`${type}-container`)[0];
  div.innerHTML = `
        <div class="media">
        <img src="media/cat-sad-cute-kitten.gif" class="no-results" alt="no results kitty" />
        <p>This query returned no ${type} </br> :(</p>
      </div>
    `;
}

function printRepo(repo) {
  let repoDiv = document.createElement("div");
  repoDiv.className = "repo-container";

  //title
  let nameDiv = document.createElement("div");
  nameDiv.className = "repo-name";
  let p = document.createElement("p");
  p.textContent = repo.name;
  nameDiv.appendChild(p);
  repoDiv.appendChild(nameDiv);

  //icons
  let iconDiv = document.createElement("div");
  iconDiv.className = "icon-container";

  //forks
  let forkIcon = document.createElement("i");
  forkIcon.className = "fa-solid fa-code-fork";
  forkIcon.textContent = " " + repo.forks;
  iconDiv.appendChild(forkIcon);

  //stars
  let starIcon = document.createElement("i");
  starIcon.className = "fa-solid fa-star";
  starIcon.textContent = " " + repo.stargazers_count;
  iconDiv.appendChild(starIcon);

  repoDiv.appendChild(iconDiv);
  repoDiv.appendChild(document.createElement("hr"));
  return repoDiv;
}

function printAllRepos(repos) {
  if (repos.length > 0) {
    cleanSearch("repos");
    let reposDiv = document.getElementsByClassName("repos-container")[0];
    repos.forEach((repo) => {
      let repoDiv = printRepo(repo);
      reposDiv.appendChild(repoDiv);
    });
  } else {
    noResults("repos");
  }
}

function printUserInfo(user) {
  cleanSearch("results");
  let userDiv = document.getElementsByClassName("results-container")[0];

  // avatar de l'usuari + nom de l'usuari + descripció de l'usuari bio
  let userBio = user.bio == null ? "This user does not have a bio." : user.bio;
  userDiv.innerHTML = `<div class="user-avatar">
        <img src="${user.avatar_url}" alt="User avatar" />
        </div>
        <div class="user-info">
        <h3>${user.name}</h3>
        <p>@${user.followers} followers</p>
        <p>${userBio}</p>
        </div>
        <hr />`;
}

function printResults(results, repos) {
  printUserInfo(results);
  printAllRepos(repos);
}

function renderLogic(results) {
  if (results.message == "Not Found") {
    noResults("results");
  } else {
    fetch(results.repos_url)
      .then((response) => response.json())
      .then((repos) => printResults(results, repos));
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
