<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="#00a34b"
                dark
                flat
              >
                <v-toolbar-title>
                  Добро пожаловать в приложение CovidChat#
                </v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    type="text"
                    v-model="login"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="#00a34b"
                  @click="doLogin"
                >Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import loginService from "../services/login.service";

export default {
  data: () => ({
    login: "",
    password: ""
  }),
  methods: {
    doLogin() {
      loginService.doLogin(this.login, this.password);
    }
  }
};
</script>
