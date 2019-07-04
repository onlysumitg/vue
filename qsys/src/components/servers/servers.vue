 
  <template>
  <v-container fluid grid-list-md>
    <v-layout row>
      <v-flex key="v1" xs4>
        <serverlist @selectedserver="selectedServer = $event"></serverlist>
      </v-flex>
      <v-flex key="v2" xs4>
        <serveredit :selectedServer="selectedServer"></serveredit>
      </v-flex>
      <v-flex key="v3" xs4>
        <serverlibl :selectedServer="selectedServer"></serverlibl>
      </v-flex>
    </v-layout>
  </v-container>
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
