<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import api from "@/services/api";
/**
 * LOGIN
 */
const visible = ref(false);

const user = reactive({
  cpf: "",
  password: "",
});

const loginRequest = async () => {
  api.post("/login", user).then((response) => {
    localStorage.setItem("token", response.data.jwt.access_token);
    localStorage.setItem("name", response.data.user.name);
    window.location.href = "/home";
  });
};
</script>

<template>
  <div>
    <div class="">
      <div class="d-flex justify-center">
        <h2>SGA</h2>
      </div>
      <div class="d-flex justify-center">
        <img src="@/assets/img/logo.png" width="100" alt="" />
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
      <a
        class="text-caption text-decoration-none text-blue"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        Esqueceu sua senha?</a
      >
    </div>

    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      v-model="user.password"
      @click:append-inner="visible = !visible"
    ></v-text-field>
    <v-btn
      block
      class="mb-8"
      color="blue"
      size="large"
      @click="loginRequest()"
      variant="tonal"
      :disabled="user.cpf == '' || user.password == '' ? true : false"
    >
      Entrar
    </v-btn>
  </div>
</template>