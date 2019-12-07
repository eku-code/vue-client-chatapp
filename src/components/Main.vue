<template>
  
    <div>
      <v-container>
        <v-layout
          text-center
          wrap
        >
          <v-card class="d-inline-block mx-auto" height="600" width="300">
            Chat
            <v-text-field class="inpmsg">
              
            </v-text-field>
          </v-card>
        </v-layout>
      </v-container>
    </div>

</template>

<script>

export default {
  name: 'Main',

  data: () => ({

  }),
};
</script>

<style scoped>

.inpmsg {
  bottom: 100px;
  border: 3px solid primary;
}

</style>

