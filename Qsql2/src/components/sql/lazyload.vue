<template>
  <button class="w-100" style="width:100%" @click="emitVisible">{{iText}}</button>
</template>
<script>
import inViewport from "vue-in-viewport-mixin";
import { Script } from "vm";
export default {
  props: {
    textToDisplay: {
      type: String,
      required: false
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