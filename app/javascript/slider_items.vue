<template>
  <div>
    <p class="year">
      <span id="current-value">
        {{ doSearchYear }}
      </span>
      Year
    </p>
    <input
      id="year"
      v-model="inputValue"
      type="range"
      min="-400"
      max="2000"
      step="100"
    />
  </div>
</template>

<script>
import { Marker } from './marker.js'
export default {
  data() {
    return {
      inputValue: 1000
    }
  },
  computed: {
    doSearchYear() {
      const year = Number(this.inputValue)
      Marker.showMarker(year)
      return year
    }
  },
  methods: {
    clickResultYear(year) {
      const elementSpan = document.getElementById('current-value')
      elementSpan.innerHTML = `${year}`
      const elementInput = document.getElementById('year')
      elementInput.value = year
    }
  }
}
</script>
