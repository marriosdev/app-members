<script setup>
import { ref, reactive, computed, onMounted } from "vue";

import Sidebar from '@/components/Sidebar.vue';

onMounted(() => {
});

</script>

<template>
    <v-card>
        <v-card-title>
            <h4 class="font-weight-medium blue-darken-3">
                Ops! Serviço Offline 🐞
            </h4>
        </v-card-title>
        <v-card-text>
            <p class="mb-3">
                Ops! Parece que estamos enfrentando problemas de conexão com o servidor no momento. Por favor, tente novamente mais tarde. Se o problema persistir, entre em contato conosco para que possamos ajudar a resolver a situação. Pedimos desculpas pelo inconveniente e agradecemos pela sua compreensão.
            </p>
            <router-link to="login">
                <v-btn color="blue-accent-4">
                    Tentar novamente
                </v-btn>
            </router-link>
        </v-card-text>
    </v-card>
</template>