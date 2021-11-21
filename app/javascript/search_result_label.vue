<template>  
  <div class="search-result" v-bind:id="divId">
    <div class='search-result__title' v-html="matchWord"></div>
  </div>
</template>

<script>
export default {
  props: {
    resultlabel: { 
      type: Object,
      required: true,
      default: "null"
    },
    keyword: {
      type: String,
      required: true, 
    }
  },
  computed: {
    divId(){
      const divId = `search-result${this.resultAbstruct.id}`
      return divId
    },
    matchWord(){
      const matchSentence = this.resultlabel.label
      const wordsPattern = 
        this.keyword
        .trim()
        .replaceAll(/[.*+?^=!:${}()|[\]/\\]/g, '\\$&')
      const pattern = new RegExp(wordsPattern, 'i')
      const matchWord = matchSentence.replace(/　/g, ' ').replace(
        pattern,
        '<strong class=\'matched_word\'>$&</strong>'
      )
      return matchWord
    }
  }
}
</script>
