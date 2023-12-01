// Создание и добавление эелментов в Body
const createInput = document.createElement("input");
createInput.classList.add("search");
const createDiv = document.createElement("div");
createDiv.classList.add("dropdown");
const createDivContainer = document.createElement("div");
createDivContainer.classList.add("dropdown-container");
const createRepoCard = document.createElement("div");
createRepoCard.classList.add("repo-card");
createDiv.appendChild(createInput);
createDiv.appendChild(createDivContainer);
createDiv.appendChild(createRepoCard);
const body = document.querySelector("body");
body.appendChild(createDiv);

// Очистка Input
function removeClear() {
  createInput.innerHTML = "";
}

createInput.addEventListener("click", (e) => {
  let target = e.target;
});

const addCard = (item) => {
  let name = item.name;
  let owner = item.owner.login;
  let stars = item.stargazers_count;
  createRepoCard.innerHTML += `<div class="chosen">Name: ${name}<br>Owner: ${owner}<br>Stars: ${stars}<button class="btn-close"></button></div>`;
};

const getRepos = async (request) => {
  return await fetch(
    `https://api.github.com/search/repositories?q=${request}`,
    {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  ).then((response) => {
    if (response.ok) {
      response.json().then((repos) => {
        createDiv.innerHTML = "";
        const items = repos.items.slice(0, 5);
        if (items.length === 0) {
          createDiv.innerHTML = '<p class="no-results">No results...</p>';
        } else {
          items.forEach((item) => {
            const choice = document.createElement("p");
            choice.className = "choice";
            choice.textContent = `${item.name}`;
            choice.addEventListener("click", () => addCard(item));
            createDiv.append(choice);
          });
        }
      });
    }
  });
};
