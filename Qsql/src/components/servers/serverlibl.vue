<template>
    <div class="h-100">
        <label>Library list</label>
            <form>
      <div v-for="(lib,index) in selectedServer.libl" :key="lib+index" class="form-group">
         
        <input type="text" v-model.lazy="selectedServer.libl[index]" class="form-control" :id="lib+index"  placeholder="">
      </div>
            </form>
    </div>
</template>
<script>
export default {
    props:{
        selectedServer:{
      type:Object,
      required: false
    }
  },
  data: function() {
    return {
      
    };
  },
  
};
</script>
