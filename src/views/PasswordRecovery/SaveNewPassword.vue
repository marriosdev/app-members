<script setup>
import { reactive, ref } from "vue";
import api from "@/services/api";
import { createToast } from "mosha-vue-toastify";
import store from "@/store/store";
import router from "@/router";

const user = reactive({
cpf: localStorage.getItem("cpfRecovery"),
  password: "",
  confirmPassword: "",
  token: "",
});

const visible = ref(false);

const updatePassword = async () => {
  store.loading = true;
  api
    .post("/update-password", user)
    .then((response) => {
      router.push("/login");
      createToast("Senha alterada com sucesso!", {
        type: "success",
      });
    })
    .catch((error) => {
      createToast(error.response.data.message, {
        type: "danger",
      });
    });
};
</script>

<template>
  <div>
    <div class="">
      <div class="d-flex justify-center"></div>
      <div class="d-flex justify-center">
        <img src="@/assets/img/logo.png" width="80" alt="" />
      </div>
    </div>

    <div class="text-center">
      <div class="text-h5 text-primary">Recuperação de senha</div>
      <div class="text-subtitle-1 text-medium-emphasis">
        Digite o token enviado para o seu e-mail
      </div>
      <v-otp-input v-model="user.token" length="6" variant="solo"></v-otp-input>
    </div>

    <div v-if="String(user.token).length == 6">
        <div class="text-subtitle-1 text-medium-emphasis">Confirme sua senha</div>
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
    
        <div class="text-subtitle-1 text-medium-emphasis">Confirme sua senha</div>
        <v-text-field
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Digite sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="user.confirmPassword"
        ></v-text-field>
        <v-btn
          block
          class="mb-8"
          color="blue-accent-4"
          size="large"
          @click="updatePassword()"
          :disabled="user.password != user.confirmPassword || user.password == '' || String(user.password).length < 4 ? true : false"
        >
          Salvar nova senha
        </v-btn>
    </div>

  </div>
</template>