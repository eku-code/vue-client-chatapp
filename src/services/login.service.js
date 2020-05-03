import apiService from "./api.service";

const loginService = {
  doLogin() {
    return new Promise((resolve, reject) => {
      apiService
        .post("login")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
};

export default loginService;
