<template>
  <v-sheet height="100%" class="d-flex align-center bg-gradient">
    <v-card-text>
      <v-row justify="center" dense>
        <v-col cols="12" sm="8" md="8" lg="6">
          <v-card elevation="10" class="tr">
            <v-container>
              <v-autocomplete label="Busque una ciudad" placeholder="Cordoba" :loading="loading"
                prepend-icon="mdi-map-marker" v-model:search="searchCity" v-model="selectedCity" clearable
                base-color="darkText" :items="cities"
                :item-title="item => item ? `${item.name}, ${item.state}, ${item.country}` : null" hide-details
                @keyup.enter="getCities">
              </v-autocomplete>
            </v-container>
          </v-card>
        </v-col>


      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="8" lg="6">
          <v-card elevation="15" class=" tr">
            <v-card-text>
              <v-card-title>
                Todo el texto
              </v-card-title>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-sheet>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {

  setup() {
    const cities = ref([])
    const selectedCity = ref()
    const searchCity = ref()
    const loading = ref(false)

    const getCities = () => {
      loading.value = true
      return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchCity.value}&limit=10&appid=433ea8c66edc79af559c70480feca8d8`)
        .then(response => {
          console.log(response.data);
          if (response.data) {
            cities.value = response.data;
            searchCity.value = 'Cordoba'
          }
        })
        .catch(error => {
          console.error('error', error);
        })
        .finally(() => {
          loading.value = false
        });
    };

    return {
      cities, getCities, selectedCity, loading, searchCity
    };
  }
};
</script>

<style scoped>
.bg-gradient {
  background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
}

.tr {
  background-color: rgba(255, 255, 255, 0.384);
  /* Fondo con opacidad del 80% */
}

.glass {
  /* From https://css.glass */
  background: rgba(104, 104, 104, 0.23);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.5px);
  -webkit-backdrop-filter: blur(6.5px);
}
</style>