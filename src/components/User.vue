<template>
  <v-container fluid>
    <v-card class="mx-auto" max-width="344">
      <v-img v-bind:src="'data:image/jpeg;base64,' + this.user.picture">
      </v-img>

      <v-card-title>
        {{ this.user.firstName }} {{ this.user.lastName }}
      </v-card-title>

      <v-card-subtitle>
        {{ this.user.login }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn text @click="openChatClick">Чат</v-btn>

        <v-btn color="purple" text>
          Статус
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div>
          <v-divider></v-divider>

          <v-card-text>
            {{ this.user.userText }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
import userService from "../services/user.service";

export default {
  name: "user",
  data: () => ({
    user: {
      firstName: "",
      lastName: "",
      login: "",
      userText: "",
      picture: "",
      chatId: "",
    },
  }),
  created() {
    userService
      .getUser(this.$route.params.userId)
      .then((res) => (this.user = res.data));
  },
  methods: {
    openChatClick() {
      this.$router.push({ name: "chat", params: { chatId: this.user.chatId } });
    },
  },
};
</script>
