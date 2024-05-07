
<template>
  <div class="weather" :class="weatherClass">
    <div class="container">

      <div class="card weather-form">
        <input type="text" class="weather-form_input" v-model="searchQuery" @keyup.enter="weatherSearch()" placeholder="Enter city">
        <button class="weather-form_btn" @click="weatherSearch()">Search</button>
      </div>

      <div class="card weather-load" v-if="loading">Loading...</div>

      <div class="weather-info" v-show="!error && location && temperatura !== 0 && description">

        <div class="card" v-if="error">Error</div>

        <div class="weather-info_text">
          <p class="card">{{ location }}</p>
          <p class="card">{{ temperatura }}°C</p>
          <p class="card">{{ description }}</p>
        </div>
      </div>
    </div>

    <div class="weather-bg">
      <div>
        <img class="weather-bg_img bg" src="./assets/background.jpg" alt="App Background">
        <img class="weather-bg_img overcast" src="./assets/overcast.jpg" alt="App Background">
        <img class="weather-bg_img partly-cloudy" src="./assets/partly-cloudy.jpg" alt="App Background">
        <img class="weather-bg_img sunny" src="./assets/sunny.jpg" alt="App Background">
        <img class="weather-bg_img clear" src="./assets/clear.png" alt="App Background">
        <img class="weather-bg_img rain" src="./assets/rain.jpg" alt="App Background">
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
export default {
  data() {
    return {
      location: '',
      temperatura: '',
      description: '',
      loading: false, 
      error: false,
      searchQuery: '',
    };
  },

  computed: {
    weatherClass() {
      if (this.description.includes('Sunny')) {
        return 'sunny';
      } else if (this.description.includes('Overcast')) {
        return 'overcast';
      } else if (this.description.includes('Partly cloudy')) {
        return 'partly-cloudy';
      } else if (this.description.includes('Clear')) {
        return 'clear';
      } else if (this.description.includes('Light rain')) {
        return 'rain';
      }else {
        return '';
      }
    }
  },

  methods : {
    weatherSearch() {
      this.loading = true;
      this.error = false;
      fetch(`http://api.weatherapi.com/v1/current.json?key=f7f6d5a76d804ca38c5222717240605&q=${this.searchQuery}`)
      .then(response => response.json())
      .then(data => {
        this.loading = false;
        this.location = data.location.name;
        this.temperatura = data.current.temp_c;
        this.description = data.current.condition.text;
        this.resetSearchQuery();
      })

      .catch (error => {
        this. loading = false;
        this.error = true;
        console.log(error);
      });
    },
    resetSearchQuery() {
      this.searchQuery = '';
    }
  }
};
</script>
