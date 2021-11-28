<template>
  <div>
    <resultLabel
      v-for="resultLabel in resultLabels"
      :key="resultLabel.label"
      :result-label="resultLabel"
      :keyword="keyword"
    ></resultLabel>
    <resultAbstruct
      v-for="resultAbstruct in resultAbstructs"
      :key="resultAbstruct.label"
      :result-abstruct="resultAbstruct"
      :keyword="keyword"
    ></resultAbstruct>
  </div>
</template>

<script>
import ResultLabel from './search_result_label.vue'
import ResultAbstruct from './search_result_abstruct.vue'
export default {
  components: {
    resultLabel: ResultLabel,
    resultAbstruct: ResultAbstruct
  },
  props: {
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
    keyword: {
      type: String,
      required: true,
      default: null
    }
  }
}
</script>
