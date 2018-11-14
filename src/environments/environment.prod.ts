export const environment = {
  production: true,
  apiUrl: getBaseUrl
};
function getBaseUrl() {
  const chunks = document.location.href.split(':');
  return chunks[0] + ':' + chunks[1];
}
