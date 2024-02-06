<script setup>
import { ref, reactive, computed, onMounted } from "vue";

/**
 * LOGIN
 */
const visible = ref(false);

const user = reactive({
  cpf: "",
  password: "",
});

const loginRequest = async () => {};

</script>

<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="@/assets/img/logo.png"
    ></v-img>
    <div class="text-subtitle-1 text-medium-emphasis">CPF</div>

    <v-text-field
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
      @click:append-inner="visible = !visible"
    ></v-text-field>
    <v-btn block class="mb-8" color="blue" size="large" variant="tonal">
      Entrar
    </v-btn>
  </div>
</template>