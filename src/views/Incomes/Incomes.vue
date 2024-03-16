<script setup>
import { ref, reactive, computed, onMounted, onUpdated } from "vue";
import { createToast } from "mosha-vue-toastify";
import Loader from "@/components/Loader.vue";
import Sidebar from "@/components/Sidebar.vue";
import api from "@/services/api";

// LOADERS
const loading = ref(false);
// Modal
const dialog = ref(false);
const username = ref(localStorage.getItem("name"));

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

  faturasNaoPagas.value = minhasFaturas.value.filter(
    (fatura) => fatura.payment_status.name !== "Pago"
  );

  faturasPagas.value = minhasFaturas.value.filter(
    (fatura) => fatura.payment_status.name === "Pago"
  );
};

const faturasPagas = ref(0);
const faturasNaoPagas = ref(0);
const quantidadeFaturasNaoPagas = computed(() => faturasNaoPagas.value.length);
const quantidadeFaturasTotal = computed(() => minhasFaturas.value.length);

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
  api
    .post("/payMonthlyPayment", { income_uuid: fatura.uuid })
    .then((response) => {
      incomePayment.paymentQrCode =
        "data:image/png;base64," + response.data.qr_code;
      incomePayment.copyPasteLink = response.data.copy_paste_link;
      loadModalIncome.value = false;
    })
    .catch((error) => {
      createToast("Ocorreu um erro ao gerar o QRCode", {
        type: "danger",
      });
      loadModalIncome.value = false;
      dialog.value = false;
    });
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
  <h2 class="font-weight-medium blue-darken-3">
    <v-btn @click="buscarMinhasFaturas()" class="ma-2" color="blue-accent-2">
      Atualizar Faturas
      <v-icon icon="mdi-refresh" end></v-icon>
    </v-btn>
  </h2>

  <v-divider class="mb-6"></v-divider>

  <div v-if="loading">
    <v-skeleton-loader type="card" class="mb-3"></v-skeleton-loader>
    <v-skeleton-loader type="card" class="mb-3"></v-skeleton-loader>
    <v-skeleton-loader type="card" class="mb-3"></v-skeleton-loader>
  </div>

  <v-card
    class="mb-10 text-white"
    color="amber-darken-1"
    v-if="quantidadeFaturasTotal == 0 && !loading"
  >
    <v-card-title>
      <h4 class="font-weight-medium blue-darken-3">
        <v-icon icon="mdi-alert-box" end></v-icon>
        Oops!
      </h4>
    </v-card-title>
    <v-card-text>
      <p class="mb-3">Você ainda não tem faturas para pagar!</p>
    </v-card-text>
  </v-card>

  <div v-if="!loading">
    <v-card
      class="mb-10 text-white"
      color="green-lighten-2"
      v-if="quantidadeFaturasNaoPagas == 0 && quantidadeFaturasTotal != 0"
    >
      <v-card-title>
        <h4 class="font-weight-medium blue-darken-3">
          <v-icon icon="mdi-checkbox-marked-circle" end></v-icon>
          Maravilha!😃
        </h4>
      </v-card-title>
      <v-card-text>
        <p class="mb-3">Suas faturas estão em dia! 🤗</p>
      </v-card-text>
    </v-card>

    <div class="mb-5" v-for="fatura in faturasNaoPagas" :key="fatura.id">
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
            width="100%"
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

    <div class="mb-5" v-for="fatura in faturasPagas" :key="fatura.id">
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
      </v-card>
    </div>
  </div>
  <!-- Modal pagamentos -->
  <v-row justify="center">
    <v-bottom-sheet v-model="dialog">
      <v-card height="600" class="rounded-t-xl">
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
    </v-bottom-sheet>
  </v-row>
</template>