<script setup>
import { ref, reactive, computed, onMounted } from "vue";

import Sidebar from "@/components/Sidebar.vue";
import api from "@/services/api";

// LOADERS
const loading = ref(false);

const minhasFaturas = ref([]);
const buscarMinhasFaturas = async () => {
  loading.value = true;
  const response = await api.get("/myincomes");
  minhasFaturas.value = response.data.data;
  loading.value = false;
};

onMounted(() => {
  buscarMinhasFaturas();
});

/**
 * status faturas
 */
const coresStatusPagamento = [
  {
    name: "pendente",
    color: "orange",
  },
  {
    name: "cancelado",
    color: "grey",
  },
  {
    name: "vencido",
    color: "red",
  },
  {
    name: "pago",
    color: "green",
  },
];
</script>

<template>
  <Sidebar />
  <div v-if="loading">
    <v-skeleton-loader type="card" class="mb-3"></v-skeleton-loader>
    <v-skeleton-loader type="card" class="mb-3"></v-skeleton-loader>
    <v-skeleton-loader type="card" class="mb-3"></v-skeleton-loader>
    <v-skeleton-loader type="card" class="mb-3"></v-skeleton-loader>
  </div>
  <div class="mb-5" v-for="fatura in minhasFaturas" :key="fatura.id">
    <v-card
      margin="16"
      elevation="16"
      class="mx-auto"
      max-width="560"
      min-width="400"
      :color="'lighten-5'"
    >
      <v-card-item>
        <div>
          <div class="text-h6 mb-1">
            <div class="text-caption">
              {{ fatura.uuid }}
            </div>
            <div class="d-flex justify-space-between">
              <div>R${{ fatura.value }}</div>
              <div class="text-caption">
                Status:
                <v-chip
                  variant="flat"
                  :color="
                    coresStatusPagamento[fatura.payment_status.id - 1].color
                  "
                >
                  {{ fatura.payment_status.name }}
                </v-chip>
              </div>
            </div>
          </div>
          <div class="text-overline mb-1"></div>
          <div class="text-caption">EMISSÃO: {{ fatura.emission_date }}</div>
          <div class="text-caption">VENCIMENTO: {{ fatura.due_date }}</div>
        </div>
      </v-card-item>

      <v-card-actions>
        <v-btn
          variant="flat"
          color="green"
          v-if="fatura.payment_status.name == 'Vencido' || fatura.payment_status.name == 'Pendente'"
          >PAGAR</v-btn
        >
      </v-card-actions>
      
    </v-card>
  </div>
</template>