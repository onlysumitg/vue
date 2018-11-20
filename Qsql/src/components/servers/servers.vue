<template>
<div class="row no-gutter">
         <div class="col-3 border-right">
             <serverlist  @selectedserver="selectedServer = $event"></serverlist>
         </div>
        <div class="col-5">
            <serveredit :selectedServer="selectedServer"></serveredit>
         </div>
        <div class="col-4">
            <serverlibl :selectedServer="selectedServer"></serverlibl>
         </div>
 </div>
</template>
<script>
import serverlist from "./serverlist";
import serveredit from "./serveredit";
import serverlibl from "./serverlibl";
export default {
  components: {
    serverlist,
    serveredit,
    serverlibl
  },

  watch: {
    selectedServer: {
      handler: function(after, before) {
        if (before.id == 0 && after.id > 0) {
          //alert("assign")
        } else {
          // alert("okkcc")

          after.modified = true;
        }
      },
      deep: true
    }
  },

  data: function() {
    return {
      selectedServer: {
        id: 0,
        serverName: "",
        serverIP: "",
        userName: "",
        password: "",
        ssl: false,
        libl: new Array(20),
        modified: false
      }
    };
  }
};
</script>
<style>
.fill {
  min-height: 100%;
  height: 100%;
}

.allowscroll {
  overflow-y: scroll;
}
</style>
