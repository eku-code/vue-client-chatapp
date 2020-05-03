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

        <v-toolbar-title>Все чаты</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list three-line>
        <template v-for="(item) in items">

          <v-list-item
            :key="item.id"
            @click="openClick(item.id)"
          >
            <v-list-item-avatar>
              <v-img v-bind:src="'data:image/jpeg;base64,'
            +item.user.picture">></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{item.user.firstName}} {{item.user.lastName}}</v-list-item-title>
              <v-list-item-subtitle v-html="item.lastMessage"></v-list-item-subtitle>
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
  name: "chatlist",
  data: () => ({
    items: []
  }),
  created() {
    chatService.getChatList().then(res => (this.items = res.data));
  },
  methods: {
    openClick(chatId) {
      this.$router.push({ name: "chat", params: { chatId: chatId } });
    }
  }
};
</script>