export const environment = {
  production: true,
  apiUrl: getBaseUrl
};
function getBaseUrl() {
  return document.location.href.substring(0, document.location.href.indexOf('#'));
}
