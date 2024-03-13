<script setup>
import { ref, defineComponent } from "vue";

const drawer = ref(false);
const username = ref(localStorage.getItem("name"));

const logout = () => {
  localStorage.clear();
  router.push("/login");
};
</script>
<template>
  <v-layout style="height: 50px">
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"
          ><i class="bi bi-list" style="font-size: 1.6rem"></i
        ></v-app-bar-nav-icon>
      </template>
      <img src="@/assets/img/profile.png" width="60" alt="" class="profile-img" />
    </v-app-bar>
  </v-layout>

  <v-layout>
    <v-navigation-drawer v-model="drawer" temporary width="400">
      <div class="d-flex justify-space-between align-center">
        <!-- <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/lego/1.jpg"
          :title="username"
        ></v-list-item> -->
        <div>
          <img src="@/assets/img/logo.png" width="80" alt="" />
        </div>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
          <i class="bi bi-x-lg" style="font-size: 1.6rem"></i>
        </v-app-bar-nav-icon>
      </div>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          color="blue-darken-3"
          :to="'/home'"
          prepend-icon="mdi-home"
          title="Inicio"
        ></v-list-item>
        <v-list-item
          color="blue-darken-3"
          :to="'/minhas-faturas'"
          prepend-icon="mdi-file-document-outline"
          title="Faturas"
        ></v-list-item>

        <v-divider class="mb-4 mt-4"></v-divider>
        
        <v-list-item
          color="blue-darken-3"
          @click="logout()"
          :to="'/login'"
          prepend-icon="mdi-logout"
          title="Sair"
          value=""
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<style scoped>
.profile-img {
  border-color: 10px solid rgb(250, 0, 0) !important;
  padding: 4px;
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>