import { createItem } from './create-item';
import { fetchJSON } from './fetch-json';

export const main = () => {
  const formElement = document.querySelector('form#searchForm');
  const searchInput = document.querySelector('input#search');
  const resultsDiv = document.querySelector('div#results');

  formElement.onsubmit = (event) => {
    event.preventDefault(); // obavezno zaustavljamo defualt ponašanje forme
    const inputValue = searchInput.value;
    console.log('unesena vrijednost:', inputValue);

    const searchTerm = inputValue.toLowerCase();

    fetchJSON('https://jsonplaceholder.typicode.com/photos').then((result) => {
      const filteredResult = result.filter((photo) => photo.title.toLowerCase().includes(searchTerm)
      );

      const slicedResult = filteredResult.slice(0, 30);

      console.log('rezultat pretrage:', slicedResult);

      resultsDiv.innerHTML = ''; // postavljanje sadrzaja elementa u prazni string brise sve elemente iz njega

      slicedResult.forEach((image) => {
        // unutar Array.forEach callback funkcije, prvi parametar je zasebni element niza, tj. naša slika
        const { title, url } = image; // izvlacimo kljuceve "title" i "url" iz pojedinacne slike
        createItem(resultsDiv, title, url); // pozivamo createItem sa title i url kao atributima
      });
    });
  };
};
