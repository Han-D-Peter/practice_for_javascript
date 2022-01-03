const CLIENT_ID = "Iv1.c33cf8d36b2b5f2d";
const CLIENT_SECRET = "949c520fe0c5528ef0fbe87fb0d62ac9d736efbb";

export function fetchUser(userName) {
  return fetch(
    `https://api.github.com/users/${userName}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return "You need to check your github account";
    }
  });
}

export function fetchRepos(userName) {
  return fetch(
    `https://api.github.com/users/${userName}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  ).then((response) => {
    return response.json();
  });
}

export function fetchRepoLanguage(userName, repoName) {
  return fetch(
    `https://api.github.com/repos/${userName}/${repoName}/languages?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  ).then((response) => {
    return response.json();
  });
}
