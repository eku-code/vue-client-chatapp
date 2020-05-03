import apiService from "./api.service";
import { router } from "../router";

const userService = {
  getMyProfile() {
    return new Promise((resolve, reject) => {
      apiService
        .get("user/me")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          router.push({
            path: "/login",
          });
          console.error(err);
          reject(err);
        });
    });
  },
};

export default userService;
