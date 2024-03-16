<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import api from "@/services/api";

import Sidebar from '@/components/Sidebar.vue';
const username = ref(localStorage.getItem("name"));
const horario = ref(new Date().toLocaleTimeString());
const mensagem = ref("")
const minhasFaturas = ref([]);

const buscarMinhasFaturas = async () => {
  const response = await api.get("/myincomes");
  minhasFaturas.value = response.data.data;

  faturasNaoPagas.value = minhasFaturas.value.filter(
    (fatura) => fatura.payment_status.name !== "Pago"
  ).length;
};

onMounted(() => {
    buscarMinhasFaturas();

    if(horario.value > "12:00:00" && horario.value < "18:00:00"){
        mensagem.value = "Boa tarde";
    } else if(horario.value > "18:00:00" && horario.value < "23:59:59"){
        mensagem.value = "Boa noite";
    } else {
        mensagem.value = "Bom dia";
    }
});

</script>

<template>
    <Sidebar/>
    <v-card class="mb-10">
        <v-card-title>
            <h4 class="font-weight-medium blue-darken-3">
                {{mensagem}}, {{ username }}!😃
            </h4>
        </v-card-title>
        <v-card-text>
            <p class="mb-3">
                Mantenha suas faturas em dia! 🤗
            </p>
            <router-link to="minhas-faturas">
                <v-btn color="blue-accent-4">
                    Ver minhas faturas
                </v-btn>
            </router-link>
        </v-card-text>
    </v-card>

    <v-card>
        <v-card-title>
            <h4 class="font-weight-medium blue-darken-3">
                Bugs 🐞
            </h4>
        </v-card-title>
        <v-card-text>
            <p class="mb-3">
                Se encontrar algum bug, por favor, reporte para que possamos corrigir o mais rápido possível!
            </p>
            <v-btn color="green-accent-4">
                Whatsapp
            </v-btn>
        </v-card-text>
    </v-card>
</template>