<template>  
    <resultRabel v-for='resultlabel in resultlabels' :key='resultlabel.label' :resultlabel='resultlabel' :keyword='keyword'></resultRabel>
    <resultAbstruct v-for='resultAbstruct in resultAbstructs' :key='resultAbstruct.label' :resultAbstruct='resultAbstruct' :keyword='keyword'></resultAbstruct>
</template>

<script>
import ResultLabel from './search_result_label.vue'
import ResultAbstruct from './search_result_abstruct.vue'
export default {
  components: {
    resultRabel: ResultLabel,
    resultAbstruct: ResultAbstruct
  },
  props: {
    resultlabels: { 
      type: Object,
      required: true,
      default: null
    },
    resultAbstructs: { 
      type: Object,
      required: true,
      default: null
    },
    keyword: {type: String}
  }
}
</script>
