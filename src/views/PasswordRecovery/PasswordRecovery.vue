<script setup>
import { reactive, ref } from "vue";
import api from "@/services/api";
import { createToast } from "mosha-vue-toastify";
import store from "@/store/store";
import router from "@/router";

const user = reactive({
  cpf: "",
});

const sendToken = ref(false);

const recovery = async () => {
  store.loading = true;
  api
    .post("/password-recovery", user)
    .then((response) => {
        localStorage.setItem("cpfRecovery", user.cpf);
      router.push("save-new-password");
      createToast("Token enviado com sucesso!", {
        type: "success",
      });
    })
    .catch((error) => {
      createToast("Ocorreu um erro ao enviar o token!", {
        type: "danger",
      });
    });
};
</script>

<template>
  <div v-if="!sendToken">
    <div class="">
      <div class="d-flex justify-center"></div>
      <div class="d-flex justify-center">
        <img src="@/assets/img/logo.png" width="80" alt="" />
      </div>
    </div>

    <div class="text-center">
      <div class="text-h5 text-primary">Recuperação de senha</div>
      <div class="text-subtitle-1 text-medium-emphasis">
        Digite seu cpf para que possamos enviar um token para o seu e-mail
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

    <v-btn
      block
      class="mb-8"
      color="blue-accent-4"
      size="large"
      @click="recovery()"
      :disabled="String(user.cpf).length < 11 ? true : false"
    >
      Recuperar
    </v-btn>
    <router-link to="login">
      <v-btn
        block
        class="mb-8"
        color="blue-accent-4"
        size="large"
      >
        Voltar para o início
      </v-btn>
    </router-link>
  </div>
</template>