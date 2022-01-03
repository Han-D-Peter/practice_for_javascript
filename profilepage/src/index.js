import { fetchRepoLanguage, fetchRepos, fetchUser } from "./fetch.js";
import { $ } from "./utils.js";

google.charts.load("current", { packages: ["corechart"] });

const USER_NAME = "Han-D-Peter";

function getDataTable(object) {
  return Object.entries(object);
}

function convertNullableText(text) {
  if (!text) {
    return "지정되지 않음";
  }
  return text;
}

function attachUserLink() {
  $(".overview").href = `https://github.com/${USER_NAME}`;
  $(".repositories").href = `https://github.com/${USER_NAME}?tab=repositories`;
  $(".projects").href = `https://github.com/${USER_NAME}?tab=projects`;
}

function renderUserInfo(userInfo) {
  $(".profile img").src = userInfo.avatar_url;
  $(".nickname").innerText = USER_NAME;
  $(".name").innerText = userInfo.name;
  $(".words").innerText = userInfo.bio;
  $(".followers").innerText = userInfo.followers;
  $(".following").innerText = userInfo.following;
  $(".location").innerText = convertNullableText(userInfo.location);
  $(".email").innerText = convertNullableText(userInfo.email);
}

function renderLanguageChart(dataTable) {
  if (!dataTable) {
    return;
  }

  const dataTableHeader = ["언어", "작성된 코드 라인"];

  const data = google.visualization.arrayToDataTable([
    dataTableHeader,
    ...dataTable
  ]);

  const options = {
    title: "",
    pieHole: 0.4
  };

  const chart = new google.visualization.PieChart(
    document.querySelector("#language-chart")
  );
  chart.draw(data, options);
}

function createRepoElement(repo) {
  const repository = document.createElement("div");
  repository.className = "repository";

  const repoTitle = document.createElement("span");
  repoTitle.className = "title";
  const repoTitleText = document.createTextNode(`${repo.name}`);
  repoTitle.appendChild(repoTitleText);

  const repoPublic = document.createElement("span");
  repoPublic.className = "public";
  const repoPublicText = document.createTextNode(`${repo.visibility}`);
  repoPublic.appendChild(repoPublicText);

  repository.appendChild(repoTitle);
  repository.appendChild(repoPublic);

  const wrapper = $(".wrapper");
  wrapper.appendChild(repository);
}

function renderRepoList(repos) {
  repos.map((repo) => createRepoElement(repo));
}

function renderPortfolio() {
  const totalLanguage = {};
  fetchRepos(USER_NAME).then((repos) => {
    renderRepoList(repos);
    repos.map((repo) => console.log(repo));
  });
  console.log(totalLanguage);
  fetchUser(USER_NAME).then((info) => renderUserInfo(info));
  attachUserLink();

  const languageDataTable = getDataTable(totalLanguage);
  renderLanguageChart(languageDataTable);
}

renderPortfolio();
