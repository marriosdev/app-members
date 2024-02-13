<script setup>
import { ref, defineComponent } from "vue";

const drawer = ref(false);
const username = ref(localStorage.getItem("name"));

const logout = () => {
  localStorage.clear();
  router.push("/login");
}

</script>
<template>
  <v-layout style="height: 50px">
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"><i class="bi bi-list" style="font-size: 1.6rem"></i></v-app-bar-nav-icon>
      </template>
      <img src="@/assets/img/logo.png" width="80" alt="">
      <v-app-bar-title>SGA</v-app-bar-title>
    </v-app-bar>
  </v-layout>

  <v-layout>
    <v-navigation-drawer v-model="drawer" temporary>
      <div class="d-flex justify-space-between">
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/lego/1.jpg"
          :title="username"
        ></v-list-item>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
          <i class="bi bi-x-lg" style="font-size: 1.6rem"></i>
        </v-app-bar-nav-icon>
      </div>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          :to="'/home'"
          prepend-icon="mdi-view-dashboard"
          title="Inicio"
          value="home"
        ></v-list-item>
        <v-list-item
        :to="'/minhas-faturas'"
          prepend-icon="mdi-forum"
          title="Faturas"
          value="about"
        ></v-list-item>
        <v-list-item
        @click="logout()"
        :to="'/login'"
          prepend-icon="mdi-forum"
          title="Sair"
          value=""
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>