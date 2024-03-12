<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { createToast } from "mosha-vue-toastify";

import Sidebar from "@/components/Sidebar.vue";
import api from "@/services/api";

// LOADERS
const loading = ref(false);

// Modal
const dialog = ref(false);

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  createToast("Link copiado para a área de transferência", {
    type: "success",
  });
};

const minhasFaturas = ref([]);

const buscarMinhasFaturas = async () => {
  loading.value = true;
  const response = await api.get("/myincomes");
  minhasFaturas.value = response.data.data;
  loading.value = false;
};

// Objeto com as informações da fatura atual a qual o cliente está efetuando o pagamento ou somente vendos os detalhes
const incomePayment = reactive({
  paymentQrCode: "",
  incomeDetails: [],
});

const loadModalIncome = ref(false);

/**
 * Função para gerar o QRCODE e efetuar o pagamento
 * @param {*} fatura
 */
const payIncome = async (fatura) => {
  loadModalIncome.value = true;
  const response = await api.post("/payMonthlyPayment", { income_uuid: fatura.uuid });
  incomePayment.paymentQrCode =
    "data:image/png;base64," + response.data.qr_code;
  incomePayment.copyPasteLink = response.data.copy_paste_link;
  loadModalIncome.value = false;
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
      class="mx-auto rounded-lg"
      max-width="560"
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
          color="blue-accent-4"
          @click="payIncome(fatura), (dialog = true)"
          v-if="
            fatura.payment_status.name == 'Vencido' ||
            fatura.payment_status.name == 'Pendente'
          "
          >PAGAR</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>

  <!-- Modal pagamentos -->
  <v-row justify="center">
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title>
          <h4>Pagar fatura</h4>
        </v-card-title>
        <v-card-text>
          <!-- CONTENT -->
          <v-skeleton-loader
            v-if="loadModalIncome"
            type="card"
            class="mb-3"
          ></v-skeleton-loader>
          <div v-if="!loadModalIncome">
            <div class="d-flex justify-center">
              <img width="200px" :src="incomePayment.paymentQrCode" alt="" />
            </div>
            <div class="d-flex justify-center align-center">
              <v-text-field
                disabled="true"
                v-model="incomePayment.copyPasteLink"
                :rules="nameRules"
                :counter="10"
                label="Copia e cola"
                required
                hide-details
              ></v-text-field>
              <v-btn
                color="blue-darken-1"
                @click="copyToClipboard(incomePayment.copyPasteLink)"
                >Copiar</v-btn
              >
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Já paguei
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>