<template>
  <div class="h-100">
     <md-card>
 
      <md-card-content>

    
        <md-field>
      <label>Search</label>
       <md-input v-model="search"></md-input>
    </md-field>

    <div @click="selectServer(server)" class="card" v-for="server in filteredServerList" :key="server.id">
       <md-card md-with-hover>
           <md-ripple>
                     <md-card-header>
          <div class="md-body-1">{{server.serverName}}</div>
          <div class="md-subhead">{{server.userName}}@{{server.serverIP}}</div>
        </md-card-header>
              <md-card-content>
                <md-badge  v-if="server.ssl" class="md-square" style="margin-right: 10px" md-content="SSL" />
              </md-card-content> 
           </md-ripple>
       </md-card>
 

    </div>
      </md-card-content>
     </md-card>
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
        libl: []
      }
    };
  },

  computed: {
    filteredServerList() {
      var tempSearch = this.search.toUpperCase();
      if (tempSearch.trim().lenthg == 0) return this.serverlist;

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
    this.loadServerList();
  },

  methods: {
    selectServer(server) {
      this.$emit("selectedserver", server);
    },
    loadServerList() {
      var vm = this;
      this.runWebService(
        "s/getlist",
        {},
        function() {},
        function(respons) {
          console.log(respons);
          if (respons.data.status == "s") {
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
  background-color: rgb(230, 230, 230);
  color: rgb(255, 255, 255);
}
</style>
