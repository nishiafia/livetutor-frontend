import Axios from "axios";
// const base_url = "https://apps.livetutor.com.bd/api/";

const base_url =
  process.env.NODE_ENV === "production"
    ? process.env.VUE_APP_BACKEND_BASEURL
    : "http://localhost:8000/api/";
let config = {
  baseURL: base_url,
};

function setToken(token) {
  config.headers = {
    Authorization: `Bearer ${token}`,
  };
}

// if (access_token) {
//   config.headers = {
//     Authorization: `Bearer ${access_token}`,
//   };
// }

const api = Axios.create(config);
// api.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// api.defaults.xsrfCookieName = "csrftoken";
export default api;
