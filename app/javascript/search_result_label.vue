<template>
  <div :id="divId" class="search-result">
    <div class="search-result__title" v-html="matchWord"></div>
  </div>
</template>

<script>
export default {
  props: {
    resultLabel: {
      type: Object,
      required: true,
      default: null
    },
    keyword: {
      type: String,
      required: true
    }
  },
  computed: {
    divId() {
      const divId = `search-result${this.resultLabel.id}`
      return divId
    },
    matchWord() {
      const matchSentence = this.resultLabel.label
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
