<template>
  <div v-bind:style="{width: dataTableWidth + 'px' }">
    <button v-bind:style="{width: dataTableWidth + 'px' }" @click="emitVisible">{{iText}}</button>
  </div>
</template>
<script>
import inViewport from "vue-in-viewport-mixin";
import { Script } from "vm";
export default {
  props: {
    textToDisplay: {
      type: String,
      required: false
    },

    dataTableWidth: {
      type: Number,
      required: true
    }
  },
  mixins: [inViewport],

  computed: {
    //---------------------------------
    iText: function() {
      if (this.textToDisplay.trim().length <= 0) {
        return "Load More";
      }
      return this.textToDisplay;
    }
  },
  watch: {
    "inViewport.now": function(visible) {
      //console.log("This component is " + (visible ? "in-viewport" : "hidden"));
      if (visible) {
        this.$emit("isvisiblenow", true);
      }
      //console.log(inViewport);
    }
  },
  methods: {
    emitVisible() {
      this.$emit("isvisiblenow", true);
    }
  },

  data() {
    return {};
  }
};
</script>