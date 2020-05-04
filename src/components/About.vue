<template>
  <v-card class="mx-auto" max-width="434" tile>
    <v-img
      height="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >
      <v-row align="end" class="fill-height">
        <v-col align-self="start" class="pa-0" cols="12"> </v-col>
        <v-col class="py-0">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="title"
                >Evgeny Kuzhabaev</v-list-item-title
              >
              <v-list-item-subtitle>Software Engineer</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
    <div style="padding: 20px">
      Привет! Меня зовут Евгений. Я - разработчик программного обеспечения и мне
      очень приятно, что Вы используете мой продукт!
    </div>
    <v-divider></v-divider>
    <div style="padding: 20px">
      Вы используете только вышедшую в свет версию CovidChat#, в дальнейшем
      планируются следующие релизы с новыми функциями.
    </div>
    <v-divider></v-divider>
    <div style="padding: 20px">
      Здесь Вы найдете многое для себя и своих друзей! До встречи!
    </div>
  </v-card>
</template>
<script>
export default {
  name: "about",
};
</script>
