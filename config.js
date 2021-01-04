export const url = "https://sandbox.mingdao.com/api/"; 
// export const url = "http://wwwapi.dev.mingdao.net/";
const { md = {} } = window;
const { global = {} } = md;
const { Config = {} } = global;
const { AjaxApiUrl = "" } = Config;
export const privateUrl = AjaxApiUrl;
// export const privateUrl = "http://118.24.27.163:29288/"; 
