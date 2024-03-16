<script setup>
import { ref, defineComponent } from "vue";

const drawer = ref(false);
const username = ref(localStorage.getItem("name"));
const sheetMenuProfile = ref(false);
const firstWord = ref(
  localStorage.getItem("name") ? username.value.split("")[0] : ""
);

const logout = () => {
  localStorage.clear();
  router.push("/login");
};
</script>
<template>
  <v-layout style="height: 50px">
    <v-app-bar :elevation="1" class="rounded-pill">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"
          ><i class="bi bi-list" style="font-size: 1.6rem"></i
        ></v-app-bar-nav-icon>
      </template>
      <v-avatar
        :color="'blue-accent-2'"
        class="mr-2"
        @click="sheetMenuProfile = true"
      >
        <span class="text-h5" style="cursor: pointer">{{ firstWord }}</span>
      </v-avatar>
    </v-app-bar>
  </v-layout>

  <v-layout>
    <v-navigation-drawer v-model="drawer" temporary width="400">
      <div class="d-flex justify-space-between align-center">
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
      </v-list>
    </v-navigation-drawer>

    <v-row justify="center">
      <v-bottom-sheet v-model="sheetMenuProfile" inset>
        <v-card height="600" class="rounded-t-xl">
          <v-card-title>
            <h4>{{ username }}</h4>
          </v-card-title>
          <v-card-text>
            <div>
              <div class="d-flex justify-center align-center">
                <v-list density="compact" nav width="100%">
                  
                  <v-list-item
                    color="blue-darken-3"
                    :to="'/minhas-informacoes'"
                    prepend-icon="mdi-account-circle-outline"
                    title="Minhas Informações"
                  ></v-list-item>

                  <v-list-item
                    color="blue-darken-3"
                    :to="'/seguranca'"
                    prepend-icon="mdi-lock"
                    title="Segurança"
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

              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="sheetMenuProfile = false"
            >
              Fechar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-bottom-sheet>
    </v-row>
  </v-layout>
</template>

<style scoped>
</style>