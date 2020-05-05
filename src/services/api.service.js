import axios from "axios";

// // Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "https://288adf6f.ngrok.io",
});
//отменяем запрос если он висит больше 1 секунды
instance.defaults.timeout = 6000;

const apiService = {
  setHeader(token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  removeHeader() {
    instance.defaults.headers.common = {};
  },

  get(resource, config) {
    if (instance.defaults.headers.common["Authorization"] === undefined) {
      let token = localStorage.getItem("user-token");
      this.setHeader(token);
    }
    return instance.get(resource, config);
  },

  post(resource, data, config) {
    return instance.post(resource, data, config);
  },

  put(resource, data) {
    return instance.put(resource, data);
  },

  delete(resource) {
    return instance.delete(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data);
  },
};

export default apiService;
