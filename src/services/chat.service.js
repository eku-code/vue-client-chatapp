import apiService from "./api.service";
import { router } from "../router";

const chatService = {
  getChatList() {
    return new Promise((resolve, reject) => {
      apiService
        .get("chat")
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
  getChat(id) {
    return new Promise((resolve, reject) => {
      apiService
        .get("chat/" + id)
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

export default chatService;
