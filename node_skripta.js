// naredba za pokrenuti skriptu, naravno iz root foldera projekta
// node node_skripta.js "hello from terminal"
const fetchJSON = (url) => {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
};
console.log(process.argv);
fetchJSON('https://api.sampleapis.com/wines/whites')
  .then(data => console.log(data.slice(0, 10)));
