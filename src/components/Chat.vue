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

        <v-list three-line maxHeight="400px" id="scroll-target">
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
          <v-divider></v-divider>
        </template>
        <template>
          <v-container>
            <v-row>
              <v-col cols="15" md="10">
                <v-textarea
                  label="Новое сообщение"
                  no-resize
                  rows="1"
                  :value="value"
                  v-model="text"
                ></v-textarea>
              </v-col>
              <v-col justify="center" align="center">
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
    stompClient: null,
    valChatId: null,
    limit: 20,
    loading: true,
    isChrome: navigator.userAgent.indexOf("Chrome") !== -1,
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
      if (!this.text.replace(/\s/g, "").length) {
        return true;
      }
      return false;
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
        this.text = "";
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
</style>
