<template>
  <div class="no-gutter h-100 w-100  d-flex">
 
    <div class="col-4 main-screen">
       
           <md-drawer class="md-elevation-2"  md-persistent="full" :md-active.sync="xtrue">
  <md-tabs  md-elevation="1"  :md-active-tab="'t'+tabIndex">
    <md-tab md-label="SQL" id="t0"  >
 

      <sqlquery @runsql="sqlToRun = $event" :currentSQL="selectedSQL"></sqlquery>
    </md-tab>
    <md-tab md-label="Saved SQL"  id="t1">
      <querylist @selectedquery = "selectedSQL = $event; tabIndex = 0 " qtype="S"></querylist>
    </md-tab>
        <md-tab md-label="History"  id="t2">
       <querylist @selectedquery = "selectedSQL = $event; tabIndex = 0" qtype="H"></querylist>
    </md-tab>
  </md-tabs>
           </md-drawer>
 
      
    
    </div>
    <div class="col-8 pt-3">
      <results :sqlToRun="sqlToRun"></results>
    </div>
  </div>
</template>
<script>
import sqlquery from "./sqlquery";
import querylist from "./querylist";
import results from "./results";
export default {
  components: {
    sqlquery,
    querylist,
    results
  },
  updated() {
    // this.tabIndex = 2;
  },
  data() {
    return {
      xtrue: true,
      sqlToRun: "",
      tabIndex: 2,
      selectedSQL: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.main-screen {
  width: 100vh;
  height: 100vw;
}

.md-tabs {
  margin-bottom: 24px;
}
.md-drawer {
  width: 100%;
}
</style>
