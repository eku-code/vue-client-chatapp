<template>
  <v-card
    class="mx-auto"
    max-width="434"
    tile
  >
    <v-img
      height="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >
      <v-row
        align="end"
        class="fill-height"
      >
        <v-col
          align-self="start"
          class="pa-0"
          cols="12"
        >
          <v-avatar
            class="profile"
            color="grey"
            size="164"
            tile
          >
            <v-img src="../assets/photo5436040399337663970.jpg"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item
            color="rgba(0, 0, 0, .4)"
            dark
          >
            <v-list-item-content>
              <v-list-item-title class="title">Evgeny Kuzhabaev</v-list-item-title>
              <v-list-item-subtitle>Software Engineer</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
    <div>
      Привет! Меня зовут Евгений.
      Я - разработчик программного обеспечения и
      мне очень приятно, что Вы используете мой продукт!
      Здесь Вы найдете многое для себя и своих друзей!
    </div>
    До встречи!
  </v-card>

</template>
<script>
export default {
  name: "about"
};
</script>