const fetchJSON = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
// fetchJSON('https://jsonplaceholder.typicode.com/photos').then(results => { console.log(results); });
fetchJSON('https://jsonplaceholder.org/posts').then(result => {
  const filteredResult = result.filter((post) => post.title.toLowerCase().includes('dolor'));
  console.log(result, filteredResult);
});
const formElement = document.querySelector('form#searchForm');
const searchInput = document.querySelector('input#search');
// const submitButton = document.querySelector('button'); // ne treba za sada
const resultsDiv = document.querySelector('div#results');

// {
//     "albumId": 1,
//     "id": 1,
//     "title": "accusamus beatae ad facilis cum similique qui sunt",
//     "url": "https://via.placeholder.com/600/92c952",
//     "thumbnailUrl": "https://via.placeholder.com/150/92c952"
//   }
function createItem (title, imageUrl) {
  const wrapperDiv = document.createElement('div');
  resultsDiv.append(wrapperDiv);

  const titleElement = document.createElement('h2');
  titleElement.innerHTML = title;
  wrapperDiv.append(titleElement);

  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.width = '100';
  wrapperDiv.append(imageElement);
}
// createItem('Neki naslov', 'https://via.placeholder.com/600/6ad437');
// createItem('Neki naslov 2', 'https://via.placeholder.com/600/40d9b8');

formElement.onsubmit = (event) => {
  event.preventDefault(); // obavezno zaustavljamo defualt ponašanje forme
  const inputValue = searchInput.value;
  console.log('unesena vrijednost:', inputValue);

  const searchTerm = inputValue.toLowerCase();

  fetchJSON('https://jsonplaceholder.typicode.com/photos').then((result) => {
    const filteredResult = result.filter((photo) =>
      photo.title.toLowerCase().includes(searchTerm)
    );

    const slicedResult = filteredResult.slice(0, 30);

    console.log('rezultat pretrage:', slicedResult);

    resultsDiv.innerHTML = ''; // postavljanje sadrzaja elementa u prazni string brise sve elemente iz njega

    slicedResult.forEach((image) => {
      // unutar Array.forEach callback funkcije, prvi parametar je zasebni element niza, tj. naša slika
      const { title, url } = image; // izvlacimo kljuceve "title" i "url" iz pojedinacne slike
      createItem(title, url); // pozivamo createItem sa title i url kao atributima
    });
  });
};
