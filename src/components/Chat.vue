<template>
  <v-container
    fluid
    style="margin-bottom: 75px"
  >
    <v-card
      class="mx-auto"
      height="100%"
    >

      <v-toolbar
        color="indigo"
        dark
      >

        <v-toolbar-title>{{this.chatobj.chat.user.firstName}} {{this.chatobj.chat.user.lastName}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list three-line>
        <template v-for="(item) in chatobj.messages">

          <v-list-item
            :key="item.id"
            @click="openClick(item.user.id)"
          >
            <v-list-item-avatar>
              <v-img v-bind:src="'data:image/jpeg;base64,'
            +item.user.picture">></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{item.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

    </v-card>
  </v-container>
</template>

<script>
import chatService from "../services/chat.service";

export default {
  name: "chat",
  data: () => ({
    chatobj: {
      chat: {
        id: ""
      },
      user: {
        id: "",
        firstName: "",
        lastName: "",
        picture: ""
      },
      messages: []
    }
  }),
  created() {
    chatService
      .getChat(this.$route.params.chatId)
      .then(res => (this.chatobj = res.data));
  },
  methods: {
    openClick(userId) {
      this.$router.push({ name: "user", params: { userId: userId } });
    }
  }
};
</script>