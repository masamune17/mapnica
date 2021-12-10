<template>
  <div :id="divId" class="search-result">
    <div class="search-result__title">{{ resultAbstruct.label }}</div>
    <div class="search-result__body" v-html="matchWord"></div>
  </div>
</template>

<script>
import { Marker, clickColor } from './marker.js'
import { map } from './main.js'
import { searchYear } from './search_year.js'
import * as SliderItems from './slider_items.vue'
export default {
  props: {
    resultAbstruct: {
      type: Object,
      required: true,
      default: null
    },
    keyword: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      wordValue: 100
    }
  },
  computed: {
    divId() {
      return `search-result${this.resultAbstruct.id}`
    },
    matchWord() {
      const abstractSearch = this.resultAbstruct.abstract
        .toLowerCase()
        .indexOf(this.keyword)
      const start =
        abstractSearch >= this.wordValue / 2
          ? abstractSearch - this.wordValue / 2
          : 0
      const matchSentence = this.resultAbstruct.abstract.substr(
        start,
        this.wordValue
      )
      const wordsPattern = this.keyword
        .trim()
        .replaceAll(/[.*+?^=!:${}()|[\]/\\]/g, '\\$&')
      const pattern = new RegExp(wordsPattern, 'i')
      /* eslint-disable */
      const matchWord = matchSentence
        .replace(/　/g, ' ')
        .replace(pattern, "<strong class='matched_word'>$&</strong>")
      /* eslint-disable */
      return matchWord
    }
  },
    mounted() {
    this.clickResult()
  },
  methods:{
    clickResult(){
      const result = this.resultAbstruct
      document.getElementById(`search-result${result.id}`).addEventListener('click', async function () {  
        const resultYear = Math.floor(Number(result.accrual_date.slice(0, -6)) / 100) * 100
        SliderItems.default.methods.clickResultYear(resultYear)
        Marker.showMarker(resultYear)
        Marker.showMarkerInfo(result)
        const searcheEraAPI = await searchYear(resultYear)
        let makerNum
        for (let i = 0; i < searcheEraAPI.length; i++) {
          if (searcheEraAPI[i].id === result.id) {
            makerNum = i
          }
        }
        Marker.changeColor(makerNum, clickColor)
        map.panTo(new google.maps.LatLng(result.latitude, result.longitude)) // eslint-disable-line
        map.setZoom(6)
      }, false)
    }
  }
}
</script>
