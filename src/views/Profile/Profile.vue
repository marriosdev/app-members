<script setup>
import Sidebar from "@/components/Sidebar.vue";
import api from "@/services/api";
import { createToast } from "mosha-vue-toastify";
import { onMounted, reactive } from "vue";

const getProfile = () => {
  api.get("/profile").then((response) => {
    user.name = response.data.user.name;
    user.lastName = response.data.user.lastname;
    user.birthDate = response.data.user.birthday;
    user.registrationNumber = response.data.user.registration_number;
    user.nis = response.data.user.nis;
    user.cpf = response.data.user.cpf;
    user.rg = response.data.user.rg;
    user.email = response.data.user.email;
    user.phone = response.data.user.phone;
    user.address = response.data.user.address;
  });
};

const updateProfile = () => {
  somenteNumeros();
  api
    .put("/profile", {
      name: user.name,
      lastname: user.lastName,
      birthday: user.birthDate,
      registration_number: user.registrationNumber,
      nis: user.nis,
      cpf: user.cpf,
      rg: user.rg,
      email: user.email,
      phone: user.phone,
      address: user.address,
    })
    .then(() => {
      getProfile();
      createToast("Perfil atualizado com sucesso!", {
        type: "success",
      });
    })
    .catch((error) => {
      createToast("Erro ao atualizar perfil!", {
        type: "danger",
      });
    });
};

const user = reactive({
  name: "",
  lastName: "",
  birthDate: "",
  registrationNumber: "",
  nis: "",
  cpf: "",
  rg: "",
  email: "",
  phone: "",
  address: "",
});

const formatarData = () => {
  let data = user.birthDate;
  if (data.length === 4 || data.length === 7) {
    data += "/";
    user.birthDate = data;
  }
  if (data.length > 9) {
    user.birthDate = data.substring(0, 9);
  }
};

const somenteNumeros = () => {
  user.registrationNumber = user.registrationNumber.replace(/\D/g, "");
  user.nis = user.nis.replace(/\D+/g, "");
  user.cpf = user.cpf.replace(/\D+/g, "");
  user.rg = user.rg.replace(/\D+/g, "");
  user.phone = user.phone.replace(/\D+/g, "");
};

onMounted(() => {
  getProfile();
});
</script>

<template>
  <Sidebar />
  <v-form validate-on="submit lazy" @submit.prevent="updateProfile" class="mt-10">
    <v-text-field
      color="blue-accent-2"
      density="compact"
      variant="outlined"
      disabled
      :append-inner-icon="mdi-file"
      label="CPF"
      v-model="user.cpf"
    ></v-text-field>
    <v-text-field
      color="blue-accent-2"
      density="compact"
      variant="outlined"
      :append-inner-icon="mdi-account"
      label="Nome"
      v-model="user.name"
    ></v-text-field>
    <v-text-field
      color="blue-accent-2"
      density="compact"
      variant="outlined"
      :append-inner-icon="mdi-account"
      label="Sobrenome"
      v-model="user.lastName"
    ></v-text-field>
    <v-text-field
      color="blue-accent-2"
      density="compact"
      variant="outlined"
      :append-inner-icon="mdi-calendar"
      label="Data de Nascimento (ano/mes/dia)"
      v-model="user.birthDate"
      @keypress="formatarData"
    ></v-text-field>
    <v-text-field
      color="blue-accent-2"
      density="compact"
      variant="outlined"
      :append-inner-icon="mdi-file"
      label="Matrícula"
      v-model="user.registrationNumber"
      @onchange="somenteNumeros"
      @keypress="somenteNumeros"
    ></v-text-field>
    <v-text-field
      color="blue-accent-2"
      density="compact"
      variant="outlined"
      :append-inner-icon="mdi-file"
      label="NIS"
      v-model="user.nis"
      @onchange="somenteNumeros"
      @keypress="somenteNumeros"
    ></v-text-field>
    <v-text-field
      color="blue-accent-2"
      density="compact"
      variant="outlined"
      :append-inner-icon="mdi-file"
      label="RG"
      v-model="user.rg"
      @onchange="somenteNumeros"
      @keypress="somenteNumeros"
    ></v-text-field>
    <v-text-field
      color="blue-accent-2"
      density="compact"
      variant="outlined"
      :append-inner-icon="mdi-email"
      type="email"
      label="E-mail"
      v-model="user.email"
    ></v-text-field>
    <v-text-field
      color="blue-accent-2"
      density="compact"
      variant="outlined"
      :append-inner-icon="mdi-phone"
      label="Telefone"
      v-model="user.phone"
      @onchange="somenteNumeros"
      @keypress="somenteNumeros"
    ></v-text-field>
    <v-text-field
      color="blue-accent-2"
      density="compact"
      variant="outlined"
      :append-inner-icon="mdi-map"
      label="Endereço"
      v-model="user.address"
    ></v-text-field>
    <v-btn type="submit" color="blue-darken-1" width="100%">Salvar</v-btn>
  </v-form>
</template>
