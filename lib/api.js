import axios from "axios";
import { url, privateUrl } from "../config";
export const urlPrefix = (urlStr) => `${url}${urlStr}`;
export const urlPrefixPrivate = (urlStr) => `${privateUrl}${urlStr}`;

export async function getAppsCategoryInfo(params) {
  return axios.post(urlPrefix("AppManagement/GetAppsCategoryInfo"), params);
}

export async function getAppsLibraryInfo(params) {
  return axios.post(urlPrefix("AppManagement/GetAppsLibraryInfo"), params);
}

export async function searchAppLibrary(params) {
  return axios.post(urlPrefix("AppManagement/SearchAppLibrary"), params);
}

export async function getLibraryToken(params) {
  return axios.post(urlPrefix("AppManagement/GetLibraryToken"), params);
}

export async function installApp(params) {
  return axios.post(urlPrefixPrivate("Library/InstallApp"), params, {
    validateStatus: function (status) {
      return status >=200 && status < 500;
    },
  });
}

export async function getAppLibraryDetail(params) {
  return axios.post(urlPrefix("AppManagement/GetAppLibraryDetail"), params);
}
