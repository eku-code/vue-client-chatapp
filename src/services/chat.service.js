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
  getChat(id, limit) {
    const params = {
      limit: limit,
    };
    return new Promise((resolve, reject) => {
      apiService
        .get("chat/" + id, { params })
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
  sendMessage(messageObj) {
    return new Promise((resolve, reject) => {
      apiService
        .post("chat", messageObj)
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
