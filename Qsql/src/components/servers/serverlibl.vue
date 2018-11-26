<template>
 
  <div class="h-100">
    <md-card>
      <md-card-header>
        <div class="md-title">Library list</div>
      </md-card-header>

      <md-card-content>
        <form novalidate  >


            <div v-for="(lib,index) in selectedServer.libl" :key="lib+''+index"  >
             
            <input type="text" class="localField" v-model.lazy="selectedServer.libl[index]" :id="lib+''+index" />
         </div>

        </form>
      </md-card-content>
    </md-card>



  </div>
</template>
<script>
export default {
  props: {
    selectedServer: {
      type: Object,
      required: false
    }
  },
  //------------------------------------------
  data: function() {
    return {};
  }
  //---------------------------------
};
</script>
<style scoped>
.localField {
  margin: 0%;
  padding-top: 4px;
  min-height: 12px;
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
}
</style>

