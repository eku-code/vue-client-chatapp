<template>

  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>

      Chat

    </v-app-bar>
      <v-img src = "./assets/Penguins.jpg" max-height="2000">
        <v-content>
          <Main/>
        </v-content>
      </v-img>
  </v-app>

</template>

<script>
import Main from './components/Main';

export default {
  name: 'App',

  components: {
    Main,
  },

  data: () => ({
    //
  }),
};
</script>