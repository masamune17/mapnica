<template>
  <div :id="divId" class="search-result">
    <div class="search-result__title">{{ resultAbstruct.label }}</div>
    <div class="search-result__body" v-html="matchWord"></div>
  </div>
</template>

<script>
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
      const divId = `search-result${this.resultAbstruct.id}`
      return divId
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
  }
}
</script>
