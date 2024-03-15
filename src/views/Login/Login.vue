<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import api from "@/services/api";
import { createToast } from "mosha-vue-toastify";
import router from "@/router";
import store from "@/store/store";
/**
 * LOGIN
 */
const visible = ref(false);

const user = reactive({
  cpf: "",
  password: "",
});

const loginRequest = async () => {
  store.loading = true
  api.post("/login", user).then((response) => {
    localStorage.setItem("token", response.data.jwt.access_token);
    localStorage.setItem("name", String(response.data.user.name).split(" ")[0]);
    store.token = response.data.jwt.access_token;
    router.push("/home");
  }).catch((error) => {
    createToast(error.response.data.message, {
      type: "danger",
    });
  });
};
</script>

<template>
  <div>
    <div class="">
      <div class="d-flex justify-center">
      </div>
      <div class="d-flex justify-center">
        <img src="@/assets/img/logo.png" width="80" alt="" />
      </div>
    </div>

    <div class="text-subtitle-1 text-medium-emphasis">CPF</div>
    <v-text-field
      v-model="user.cpf"
      density="compact"
      placeholder="Digite seu cpf"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
    ></v-text-field>

    <div
      class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
    >
      Senha
      <router-link to="password-recovery">
        <p >
          Esqueceu sua senha?
        </p>
      </router-link>
    </div>

    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Digite sua senha"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      v-model="user.password"
      @click:append-inner="visible = !visible"
    ></v-text-field>
    <v-btn
      block
      class="mb-8"
      color="blue-accent-4"
      size="large"
      @click="loginRequest()"
      :disabled="user.cpf == '' || user.password == '' ? true : false"
    >
      Entrar
    </v-btn>
  </div>
</template>

<style>

p {
  color: rgb(4, 171, 186);
}

p:hover {
  text-decoration: none !important;
  cursor: pointer !important;
  box-shadow: none !important;
}
</style>