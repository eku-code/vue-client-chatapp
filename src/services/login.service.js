import apiService from "./api.service";
import { router } from "../router";

const loginService = {
  doLogin(login, password) {
    const requestBody = {
      login: login,
      password: password,
    };

    return new Promise((resolve, reject) => {
      apiService
        .post("login", requestBody)
        .then((res) => {
          apiService.setHeader(res.data);
          localStorage.setItem("user-token", res.data);
          router.push({
            path: "/",
          });
        })
        .catch((err) => {
          alert("Логин или пароль неверный!");
          console.error(err);
          reject(err);
        });
    });
  },
};

export default loginService;
