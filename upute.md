### 1. Konstruirajte index.html
#### a. Treba sadržavati form element sa tekst inputom i submit gumbom
```html
<form id="searchForm">
    <label for="search">Pretraga</label>
    <input name="searchTerm" id="search" />
    <button type="submit">Search</button>
</form>
```
- b. Dodati div element u kojem ćemo prikazivati rezultate
```html
<div id="results"></div>
```
- c. Povezati script.js (sa defer u head)
```html
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Search Example</title>
    <script src="script.js" defer></script>
</head>
```
### 2. Napravite script.js te dohvatite elemente i vrijednost
#### a. Prvo pronađite elemente forme, input i gumb te ih stavite svaki u svoju varijablu `const imeVarijable = ...` pomoću `document.querySelector` (podsjetite se CSS selektora)
```js
const formElement = document.querySelector('form#searchForm');
const searchInput = document.querySelector('input#search');
// const submitButton = document.querySelector('button'); // ne treba za sada
const resultsDiv = document.querySelector('div#results');
```
#### b. Na formu dodajte `onSubmit` event handler funkciju
- blokirajte općenito ponašanje forme `event.preventDefault()`
```js
formElement.onsubmit = (event) => {
    event.preventDefault()
   // ostatak koda kasnije
}
```
 #### c. unutar onsubmit handlera pospremiti vrijednost iz inputa
```js
formElement.onsubmit = (event) => {
    event.preventDefault()
    const inputValue = searchInput.value
    console.log("unesena vrijednost:", inputValue)
}
```
- ako vam sve radi kako treba, na klik submit gumba ispisati će vrijednost iz inputa u konzolu

### 3. napravite potrebno za fetch rezultata pretrage
#### a. na početak `script.js` dodajte ovu funkciju za dohvaćanje JSON podataka, 
- funkcija vrača obečanje (Promise)
```js
const fetchJSON = (url) => {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
};
```
#### b. testirajte da radi sa primjer url-om iz zadatka (ovdje radimo sa listom fotografija)
- kopirajte si primjer jednog elementa iz JSON-a u komentar
```js
fetchJSON("https://jsonplaceholder.typicode.com/photos").then(result=>{ console.log(result) }) // ovo maknete nakon testa
// {
//     "albumId": 1,
//     "id": 1,
//     "title": "accusamus beatae ad facilis cum similique qui sunt",
//     "url": "https://via.placeholder.com/600/92c952",
//     "thumbnailUrl": "https://via.placeholder.com/150/92c952"
//   }
```
- treba ispisati listu sa svim fotografijama
- ako vam ne radi sa ni jednom od dostupnih opcija, odmah se javite
#### c. isprobajte filtriranje (lažna pretraga)
- filtrirate po nekom od ključa iz rezultata u prethodnom koraku
- u ovom slučaju `title`
```js
// {
//     "albumId": 1,
//     "id": 1,
//     "title": "accusamus beatae ad facilis cum similique qui sunt",
//     "url": "https://via.placeholder.com/600/92c952",
//     "thumbnailUrl": "https://via.placeholder.com/150/92c952"
//   }
fetchJSON("https://jsonplaceholder.typicode.com/photos").then(result=>{ 
  const filteredResult = result.filter( (photo) => photo.title.toLowerCase().contains("beatae") ) // ostati ce samo slike ciji title ima rijec koju trazimo
  console.log(filteredResult) 
})
```
#### d. trebali bi dobiti masu rezultata
- limitirajmo to koristeci slice
- prespojite string iz testa u varijablu
```js
const searchTerm = "beatae".toLowerCase() // ovo cemo zamijeniti input vrijednosti u iducem koraku
fetchJSON("https://jsonplaceholder.typicode.com/photos").then(result=>{ 
  const filteredResult = result.filter( (photo) => photo.title.toLowerCase().contains(searchTerm) ) // na oba stringa radimo toLowerCase jer zelimo ignorirati velika i mala slova
  const slicedResult = filteredResult.slice(0,30)  // ako ima vise od 30 rezultata, zadrzati cemo prvih 30
  console.log(slicedResult)
})
```
- isprobajte razlicite vrijednosti za pocetni `searchTerm` string
### 4. Prebacite rezultantni kod iz koraka 3. u `form.onsubmit` handler iz 2. koraka, povežite `inputValue` umjesto testnog stringa
```js
formVariable.onsubmit = (event) => {
  event.preventDefault()
  const inputValue = selectInput.value
  console.log("unesena vrijednost:", inputValue)
  
  const searchTerm = inputValue.toLowerCase() 
  
  fetchJSON("https://jsonplaceholder.typicode.com/photos").then(result=>{ 
    const filteredResult = result.filter( (photo) => photo.title.toLowerCase().contains(searchTerm) )
    
    const slicedResult = filteredResult.slice(0,30)  
    
    console.log("rezultat pretrage:",slicedResult)
  })
}
```
### 5. Izrada funkcije za display rezultata
#### a. negdje pri početku `script.js` (ali nakon dohvacanja  napravite funkciju koja će uzeti naslov (kao `title`) i sliku (kao `imageUrl`), 
- u zadatku mozda budete imali drugi dataset koji nema sliku, promijenite parametre po potrebi, 
- za početak neka napravi wrapper div i doda ga u resultsDiv
```js
function createItem( title, imageUrl ){
  const wrapperDiv = document.createElement("div")
  resultsDiv.append(wrapperDiv)
}
```
#### b. dodajte element za naslov
- stavite tekst u njega
- dodajte ga u `wrapperDiv`
```js
function createItem( title, imageUrl ){
  const wrapperDiv = document.createElement("div")
  resultsDiv.append(wrapperDiv)

  const titleElement = document.createElement("h2")
  titleElement.innerHTML = title
  wrapperDiv.append(titleElement)
}
```
#### c. dodajte element za sliku
- u zadatku mozda ne bude isto, onda ostale prametre po potrebi
- stavite url na sliku kao src atribut, dodajte druge atribute (npr width, height ne diramo jer ostavljamo "auto")
- dodajte ga u `wrapperDiv`
```js
function createItem( title, imageUrl ){
  const wrapperDiv = document.createElement("div")
  resultsDiv.append(wrapperDiv)

  const titleElement = document.createElement("h2")
  titleElement.innerHTML = title
  wrapperDiv.append(titleElement)

  const imageElement = document.createElement("img")
  imageElement.src = imageUrl
  imageElement.width = "100" // pošto ne želimo goleme slike, postavimo širinu na 100px
  wrapperDiv.append(imageElement)
}
```
#### #. cijelo vrijeme isprobavate funkciju sa laznim inputima, npr
```js
const resultsDiv = document.querySelector("div#result")
function createItem( title, imageUrl ){
  const wrapperDiv = document.createElement("div")
  resultsDiv.append(wrapperDiv)

  const titleElement = document.createElement("h2")
  titleElement.innerHTML = title
  wrapperDiv.append(titleElement)

  const imageElement = document.createElement("img")
  imageElement.src = imageUrl
  imageElement.width = "100"
  wrapperDiv.append(imageElement)
}
createItem("Neki naslov", "https://via.placeholder.com/600/6ad437")
createItem("Neki naslov 2", "https://via.placeholder.com/600/40d9b8")
```
### 6. Stvarni prikaz rezultata pretrage
- maknite testove `createItem`, `fetchJSON` ako su vam ostali
- prije nego nacrtamo nove rezultate pretrage, obrišemo stare iz `resultsDiv`
- povežite `createItem` za svaki element rezultata
```js
formVariable.onsubmit = (event) => {
  event.preventDefault()
  const inputValue = searchInput.value
  console.log("unesena vrijednost:", inputValue)
  
  const searchTerm = inputValue.toLowerCase() 
  
  fetchJSON("https://jsonplaceholder.typicode.com/photos").then(result=>{ 
    const filteredResult = result.filter( (photo) => photo.title.toLowerCase().contains(searchTerm) )
    
    const slicedResult = filteredResult.slice(0,30)  
    
    console.log("rezultat pretrage:",slicedResult)
    
    resultsDiv.innerHTML = "" // postavljanje sadrzaja elementa u prazni string brise sve elemente iz njega
    
    slicedResult.forEach((image) => { // unutar Array.forEach callback funkcije, prvi parametar je zasebni element niza, tj. naša slika
      const { title, url } = image; // izvlacimo kljuceve "title" i "url" iz pojedinacne slike
      createItem( title, url ); // pozivamo createItem sa title i url kao atributima
    })
  })
}
```
- prazni unos bi trebao ispisati sve elemente (tocnije, prvih 30), probajte copy paste nekog komada naslova ili neki od ovih:
    - ad facilis
    - deserunt
    - est
    - cupa odio
    - natus nisi





