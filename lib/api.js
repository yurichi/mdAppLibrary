import axios from "axios";
export const urlPrefix = (url, urlStr) => `${url}${urlStr}`;

export async function getAppsCategoryInfo(url, params) {
  return axios.post(
    urlPrefix(url, "AppManagement/GetAppsCategoryInfo"),
    params
  );
}

export async function getAppsLibraryInfo(url, params) {
  return axios.post(urlPrefix(url, "AppManagement/GetAppsLibraryInfo"), params);
}

export async function searchAppLibrary(url, params) {
  return axios.post(urlPrefix(url, "AppManagement/SearchAppLibrary"), params);
}

export async function getLibraryToken(url, params) {
  return axios.post(urlPrefix(url, "AppManagement/GetLibraryToken"), params);
}

export async function installApp(url, params) {
  return axios.post(urlPrefix(url, "Library/InstallApp"), params, {
    validateStatus: function (status) {
      return status >= 200 && status < 500;
    },
  });
}

export async function getAppLibraryDetail(url, params) {
  return axios.post(
    urlPrefix(url, "AppManagement/GetAppLibraryDetail"),
    params
  );
}
