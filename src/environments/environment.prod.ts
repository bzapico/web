import { LocalStorageKeys } from 'src/app/definitions/const/local-storage-keys';

export const environment = {
  production: true,
  apiUrl: getBaseUrl()
};

function getBaseUrl() {
  const url = localStorage.getItem(LocalStorageKeys.url);
  if (url && url !== '') {
    return url;
  }
  const index = document.location.href.lastIndexOf(':');
  if (index !== -1
      && index > 5) { // Avoid first ':'
    const chunks = document.location.href.split(':');
    return chunks[0] + ':' + chunks[1] + ':443'; // Remove everything after ":port_number"
  } else {
    const hashIndex = document.location.href.indexOf('#');
    if (hashIndex !== -1) {
      const chunks = document.location.href.split('#');
      return chunks[0].slice(0, chunks[0].length - 1); // Returns the required url chunk
    }
  }
}
