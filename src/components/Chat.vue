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
          <v-toolbar-title
            >{{ this.chatobj.fullNameOtherUser }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list three-line maxHeight="400px">
          <template v-for="item in chatobj.messages.slice().reverse()">
            <v-list-item :key="item.id">
              <v-list-item-avatar @click="openClick(item.user.id)">
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
                <v-list-item-title style="white-space: normal;">
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
                  :disabled="clickable ? '' : disabled"
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
  }),
  created() {
    chatService
      .getChat(this.$route.params.chatId)
      .then((res) => (this.chatobj = res.data));
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
    openClick(userId) {
      this.$router.push({ name: "user", params: { userId: userId } });
    },
    sendMessage() {
      this.newMessageObj.chat = this.chatobj.chat;
      this.newMessageObj.text = this.text;
      chatService
        .sendMessage(this.newMessageObj)
        .then((res) => (this.chatobj = res.data));
      this.text = "";
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
