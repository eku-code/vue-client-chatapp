<template>
  <v-app id="inspire">

    <v-navigation-drawer
      v-model="drawer"
      right
      absolute
      permanent
      mini-variant
      app
    >
      <v-list dense>
        <v-list-item
          to="/"
          link
        >
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item to="/chatlist">
          <v-list-item-action>
            <v-icon>mdi-message-text</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item to="/userlist">
          <v-list-item-action>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-action>
            <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#00a34b"
      dark
    >

      <v-toolbar-title>CovidChat#</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: true
  })
};
</script>

    