<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-toolbar dark>
          <v-text-field v-model="search" label="Search" clearable></v-text-field>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(server, index) in filteredServerList">
            <v-list-tile :key="index+'k'" @click="selectServer(server)">
              <v-list-tile-content>
                <v-list-tile-title>{{server.serverName}}</v-list-tile-title>
                <v-list-tile-sub-title>{{server.userName}}@{{server.serverIP}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="index+'d'"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
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
          console.log(respons);
          if (respons.data.status == "s") {
            vm.serverlist = [];
            respons.data.servers.forEach(server => {
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
  background-color: rgb(200, 200, 200);
  color: rgb(255, 255, 255);
}
</style>
