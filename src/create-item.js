export function createItem (resultsDiv, title, imageUrl) {
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
