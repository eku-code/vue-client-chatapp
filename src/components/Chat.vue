<template>
  <v-container fluid style="margin-bottom: 75px;">
    <div id="my-container">
      <v-card class="mx-auto">
        <v-toolbar color="#00a34b" dark>
          <v-list-item-avatar>
            <v-img
              v-bind:src="'data:image/jpeg;base64,' + this.chatobj.pictureOther"
            ></v-img>
          </v-list-item-avatar>
          <v-toolbar-title style="white-space: normal;">
            {{ this.chatobj.fullNameOtherUser }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-progress-linear
            v-show="loading"
            :active="loading"
            :indeterminate="loading"
            absolute
            bottom
            color="white"
          >
          </v-progress-linear>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list three-line id="scroll-target" max-height="400px">
          <template v-for="item in chatobj.messages.slice()">
            <v-list-item :key="item.id">
              <v-list-item-avatar @click="openUserClick(item.user.id)">
                <v-img
                  v-if="item.userFrom === 'me'"
                  v-bind:src="'data:image/jpeg;base64,' + chatobj.pictureMe"
                ></v-img>
                <v-img
                  v-else
                  v-bind:src="'data:image/jpeg;base64,' + chatobj.pictureOther"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle>
                  {{ item.sentTime }}
                </v-list-item-subtitle>
                <v-list-item-title
                  style="white-space: normal;"
                  v-scroll:#scroll-target="onScroll"
                >
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <template>
          <template>
            <v-divider></v-divider>
          </template>
          <v-dialog v-model="dialog" width="500">
            <v-img :src="urlFromPicture" @click="imageClick"></v-img>
          </v-dialog>
          <v-container fluid>
            <v-img
              :src="urlFromPicture"
              max-height="250px"
              max-width="150px"
              @click="imageClick"
              v-show="pic_value"
              contain
              :style="
                `transform: rotate(${rotation}deg); transform-origin: center;`
              "
            ></v-img>
            <v-row no-gutters>
              <v-col justify="center" align="center" cols="10" md="1" xs="1">
                <v-file-input
                  type="file"
                  accept="image/*"
                  hide-input
                  v-model="pic_value"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </v-col>
              <v-col cols="15" md="8" justify="left" align="left">
                <v-textarea
                  label="Новое сообщение"
                  no-resize
                  rows="1"
                  :value="value"
                  v-model="text"
                >
                </v-textarea>
              </v-col>
              <v-col justify="center" align="center" cols="10" md="1" xs="1">
                <v-btn
                  icon
                  outlined
                  color="#00a34b"
                  @click="sendMessage"
                  :disabled="clickable"
                >
                  <v-icon>mdi-telegram</v-icon>
                </v-btn>
              </v-col>

              <v-col justify="left" align="left" cols="10" md="1" xs="1">
                <v-btn
                  icon
                  color="#00a34b"
                  @click="rotateRight"
                  v-show="pic_value"
                >
                  <v-icon>mdi-rotate-right</v-icon>
                </v-btn>
              </v-col>

              <v-col justify="left" align="left" cols="10" md="1" xs="1">
                <v-btn
                  icon
                  color="#00a34b"
                  @click="clearPayload"
                  :disabled="clickable"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import chatService from "../services/chat.service";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import constants from "../constants.js";

export default {
  name: "chat",
  data: () => ({
    chatobj: {
      chat: {
        id: "",
      },
      fullNameOtherUser: "",
      pictureMe: "",
      pictureOther: "",
      messages: [],
    },
    newMessageObj: {
      chat: {
        id: "",
      },
      text: "",
    },
    text: "",
    value: "",
    pic_value: "",
    picture: "",
    stompClient: null,
    valChatId: null,
    limit: 20,
    loading: true,
    isChrome: navigator.userAgent.indexOf("Chrome") !== -1,
    dialog: false,
    rotation: 0,
  }),
  created() {
    this.valChatId = this.$route.params.chatId;
    window.addEventListener("focus", this.connectAndUpdate, false);
    this.connectAndUpdate();
  },
  beforeDestroy() {
    this.stompClient.disconnect();
    window.removeEventListener("focus", this.connectAndUpdate);
  },
  computed: {
    clickable() {
      if (this.text.replace(/\s/g, "").length || this.pic_value) {
        return false;
      }
      return true;
    },
    urlFromPicture() {
      var binaryData = [];
      binaryData.push(this.pic_value);
      return window.URL.createObjectURL(new Blob(binaryData)).toString();
    },
  },
  methods: {
    openUserClick(userId) {
      this.$router.push({ name: "user", params: { userId: userId } });
    },
    sendMessage() {
      this.limit = 20;
      this.$vuetify.goTo(0);
      this.newMessageObj.chat = this.chatobj.chat;
      this.newMessageObj.text = this.text;
      chatService.sendMessage(this.newMessageObj).then((res) => {
        this.chatobj = res.data;
        this.clearPayload();
        this.stompClient.send("/app/hello", "Hello");
      });
    },
    getChat() {
      this.loading = true;
      chatService.getChat(this.valChatId, this.limit).then((res) => {
        this.chatobj = res.data;
        this.loading = false;
      });
    },
    connectAndUpdate() {
      let funGetChat = this.getChat;
      funGetChat();
      if (this.stompClient && this.stompClient.connected) {
        return;
      }
      var socket = new SockJS(
        constants.BACKEND_URL + "/ws/myapp/gs-guide-websocket/"
      );
      let stompClient = Stomp.over(socket);
      this.stompClient = stompClient;

      stompClient.connect({}, function(frame) {
        console.log("Connected: " + frame);
        stompClient.subscribe("/topic/hello", function(message) {
          console.log("Recieved message" + message);
          funGetChat();
        });
      });
    },
    onScroll(e) {
      if (
        (e.target.scrollTop === 0 && this.isChrome) ||
        (e.target.scrollHeight + e.target.scrollTop === 400 && !this.isChrome)
      ) {
        this.limit = this.limit + 20;
        this.getChat();
      }
    },
    imageClick() {
      this.dialog = !this.dialog;
    },
    clearPayload() {
      this.text = "";
      this.pic_value = "";
    },
    rotateRight() {
      this.rotation += 90;
    },
  },
};
</script>

<style scoped>
.v-list {
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column-reverse;
}
img {
  image-orientation: from-image;
}
</style>
