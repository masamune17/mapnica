<template>
  <div>
    <div id="search-items" class="search-items">
      <input
        id="search-box"
        v-model="keyword"
        class="search-box"
        type="search"
        :placeholder="placeholder"
      />
    </div>
    <div v-if="searchKeyword" id="search-results" class="search-results">
      <searchResults
        v-if="loaded"
        :result-labels="resultLabels"
        :result-abstructs="resultAbstructs"
        :keyword="keyword"
      ></searchResults>
    </div>
  </div>
</template>

<script>
import SearchResults from './search_results.vue'
export default {
  components: {
    searchResults: SearchResults
  },
  data() {
    return {
      resultLabels: {
        type: Object,
        required: true,
        default: null
      },
      resultAbstructs: {
        type: Object,
        required: true,
        default: null
      },
      keyword: '',
      loaded: false,
      minimumCharacterLimit: 2,
      placeholder: 'キーワードから出来事を検索'
    }
  },
  computed: {
    searchKeyword() {
      this.rsetFlag()
      if (this.minimumCharacterLimit <= this.keyword.length) {
        this.outputResult()
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    rsetFlag() {
      this.loaded = false
    },
    async outputResult() {
      const searcheWordApi = await this.searcheWordApi(this.keyword)
      this.resultLabels = []
      this.resultAbstructs = []
      for (let i = 0; i < searcheWordApi.length; i++) {
        const labelSearch = searcheWordApi[i].label
          .toLowerCase()
          .indexOf(this.keyword)
        if (labelSearch !== -1) {
          this.resultLabels.push(searcheWordApi[i])
        }
      }
      for (let i = 0; i < searcheWordApi.length; i++) {
        const labelSearch = searcheWordApi[i].label
          .toLowerCase()
          .indexOf(this.keyword)
        if (labelSearch === -1) {
          const abstractSearch = searcheWordApi[i].abstract
            .toLowerCase()
            .indexOf(this.keyword)
          if (abstractSearch !== -1) {
            this.resultAbstructs.push(searcheWordApi[i])
          }
        }
      }
      this.loaded = true
    },
    searcheWordApi(keyword) {
      const url = '/api/maps/searche_word'
      const data = { keyword: keyword }
      const queryParams = new URLSearchParams(data)
      return fetch(`${url}?` + queryParams) // eslint-disable-line
        .then((response) => response.json())
    }
  }
}
</script>
