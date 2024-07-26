import axios from "axios"; 
import router from '../router';

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost/resumebuilderapi/";
} else {
  baseurl = "/resumebuilderapi/";
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true,
  },
  transformRequest: (data, headers) => {
    let token = null;
    if (localStorage.getItem("user") !== null) {
      token = JSON.parse(localStorage.getItem("user")).token;
    }
    let authHeader = "";
    if (token !== null && token !== "") {
      authHeader = "Bearer " + token;
      headers["Authorization"] = authHeader;
    }
    return JSON.stringify(data);
  },
  // transformResponse: function (data) {
  //   data = JSON.parse(data);
  //   if (!data.success && data.code == "expired-session") {
  //     localStorage.removeItem("user");
  //   }
  //   return data;
  // },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
