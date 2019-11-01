<template>
  <div>
    <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>

    <md-toolbar class="md-transparent" md-elevation="0">
      <div style="width: 80%;">
        <md-field>
          <label>Search</label>
          <md-input v-model="search"></md-input>
        </md-field>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button md-dense" @click="loadServerList()">
          <md-icon>refresh</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <div>
      <!-- ========== -->
      <v-list two-line>
        <template v-for="(server, index) in filteredServerList">
          <v-list-tile
            @click="selectServer(server)"
            :key="server.serverName + ''+index"
            avatar
            ripple
          >
            <v-list-tile-avatar>
              <v-icon v-if="server.ssl" left>mdi-server-security</v-icon>
              <v-icon v-else left>mdi-server</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{server.serverName}}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{server.userName}}@{{server.serverIP}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index   < filteredServerList.length" :key="index"></v-divider>
        </template>
      </v-list>
      <div v-if="filteredServerList.length <=0">
        <center class="title font-weight-light">No record found</center>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data: function() {
    return {
      search: "",
      serverlist: [],
      serverProto: {
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
  },

  computed: {
    filteredServerList() {
      var tempSearch = this.search.toUpperCase();
      if (tempSearch.trim().length == 0) return this.serverlist;

      return this.serverlist.filter(server => {
        return (
          server.serverName.toUpperCase().match(tempSearch) ||
          server.serverIP.toUpperCase().match(tempSearch) ||
          server.userName.toUpperCase().match(tempSearch)
        );
      });
    }
  },
  mounted() {
    // alert("loaded");
    this.loadServerList();
  },

  methods: {
    initialize() {
      this.loadServerList();
    },
    //--------------------------------------------
    selectServer(server) {
      //this.$emit("selectedserver", _.clone(serverProto));
      this.$emit("selectedserver", server);
    },

    //--------------------------------------------
    loadServerList() {
      // alert("this.loaded");
      var vm = this;
      this.runWebService(
        "s/getlist",
        {},
        function() {},
        function(respons) {
         // console.log(respons);
          if (respons.data.status == "s" || respons.data.status == "S") {
            vm.serverlist = [];
            respons.data.data.servers.forEach(server => {
              vm.serverlist.push(server);
            });
          }
        },
        function(error) {}
      );
    }
  }
};
</script>
<style scoped>
.card:hover {
  border: 1px solid #90b9ff;
}
</style>
