import truncate from 'lodash/truncate';
import join from 'lodash/join';

export function createItem (resultsDiv, title, imageUrl) {
  const wrapperDiv = document.createElement('div');
  resultsDiv.append(wrapperDiv);

  const titleElement = document.createElement('h2');
  const combinedTitle = join(['Title:', title], ' ');
  const truncatedTitle = truncate(combinedTitle, {
    length: 40
  });
  titleElement.innerHTML = truncatedTitle;
  wrapperDiv.append(titleElement);

  wrapperDiv.title = title;

  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.width = '100';
  wrapperDiv.append(imageElement);
}
