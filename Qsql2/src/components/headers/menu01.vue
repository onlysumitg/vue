<template>


  <div class="md-toolbar-section-end">

    <div> <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar></div>
    <div >


      <md-field  >

        <md-select md-dense @md-selected="changeServer"  v-model="selectedServer" name="selectedServer" id="selectedServer" placeholder="Servers">

          <md-option  class="md-headline" v-for="(server, index) in serverlist" :key="server.serverName + ''+index" :value="server.serverId">{{server.serverName}}</md-option>
<!--          <md-option   value="9999">ErrorTest</md-option>-->
        </md-select>
      </md-field>
    </div>
    <md-button class="md-icon-button" :to="{ name: 'basesql'}">
      <v-icon color="white">mdi-database</v-icon>
    </md-button>
    <md-button class="md-icon-button" :to="{ name: 'sqlscreensqlind'}">
      <v-icon color="white">mdi-laptop</v-icon>
    </md-button>
    <md-button class="md-icon-button" :to="{ name: 'servers'}">
      <v-icon color="white">mdi-server</v-icon>
    </md-button>
    <md-button class="md-icon-button" :to="{ name: 'settings'}">
      <v-icon color="white">mdi-settings</v-icon>
    </md-button>
    <md-menu md-size="auto" md-direction="bottom-end">
      <md-button class="md-icon-button" md-menu-trigger>
        <v-icon dark>mdi-dots-vertical</v-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item>
          <div>
            {{getCurrentUserName()}}
            <hr />
          </div>
        </md-menu-item>

        <md-menu-item>
          <v-btn flat :to="{ name: 'basesql'}">
            <v-icon>mdi-database</v-icon>&nbsp SQL
          </v-btn>
        </md-menu-item>
        <md-menu-item>
          <v-btn flat :to="{ name: 'sqlscreensqlind'}">
            <v-icon>mdi-laptop</v-icon>&nbsp SQL Screen
          </v-btn>
        </md-menu-item>

        <md-menu-item>
          <v-btn flat :to="{ name: 'dbdocbaseind'}">
            <v-icon>mdi-database-search</v-icon>&nbsp DB Doc
          </v-btn>
        </md-menu-item>
        <md-menu-item>
          <v-btn flat :to="{ name: 'spdocbaseind'}">
            <v-icon>mdi-alpha-p-box-outline</v-icon>&nbsp SP Doc
          </v-btn>
        </md-menu-item>
        <md-menu-item>
          <v-btn flat :to="{ name: 'dirtree'}">
            <v-icon>mdi-file-multiple</v-icon>&nbsp IFS
          </v-btn>
        </md-menu-item>
        <md-menu-item>
          <v-btn flat :to="{ name: 'createtablei'}">
            <v-icon>mdi-table-edit</v-icon>&nbsp Create Table
          </v-btn>
        </md-menu-item>
        <md-menu-item>
          <v-btn flat :to="{ name: 'servers'}">
            <v-icon>mdi-server</v-icon>&nbsp Servers
          </v-btn>
        </md-menu-item>
        <md-menu-item>
          <v-btn flat :to="{ name: 'settings'}">
            <v-icon>mdi-settings</v-icon>&nbsp Settings
          </v-btn>
        </md-menu-item>

        <md-menu-item>
          <v-btn flat :to="{ name: 'loginentry'}">
            <v-icon color="red">mdi-power</v-icon>
            <span class="red--text">&nbsp Signoff</span>
          </v-btn>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>
<script>
export default {
    data: function() {
        return {

            serverlist: [],
            selectedServer:0,
            selectedServerLocal: {
                serverId: 0,
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

    methods: {
        initialize() {
            this.loadServerList();
            this.selectedServer = this.getConnectedServerID()
        },
        //--------------------------------------------
        selectServer(server) {
            //this.$emit("selectedserver", _.clone(serverProto));
            this.$emit("selectedserver", server);
        },


        //----------------------------------

        changeServer() {
            if(this.selectedServer.toString() == this.getConnectedServerID().toString())
            {

               return
            }


            let  backupselectedServer = this.getConnectedServerID()
            let vm = this;
            this.runWebService(
                "s/connect",
                {
                    serverId:vm.selectedServer
                },
                function() {

                },
                function(respons) {
                    // console.log(respons);

                    if (respons.data.status == "s" || respons.data.status == "S") {
                        // go to next screen
                        if(vm.isEmpty(respons.data.data.id))
                        {
                            return
                        }

                        vm.$session.set("currentserver", respons.data.data.id);
                        vm.$session.set(
                            "currentservername",
                            respons.data.data.serverName
                        );

                        topTitle.title = respons.data.data.serverName;
                        eventBus.$emit("serverischanged", true);
                        vm.$notify({
                            type: "success",
                            title: "Done",
                            message: "Current server changed"
                        });

                    } else {
                        vm.selectedServer = backupselectedServer
                        vm.$notify({
                            type: "danger",
                            title: respons.data.message
                        });

                    }
                },
                function(error) {

                    let errorMessage = "" + error;
                    vm.selectedServer = backupselectedServer
                    vm.$notify({
                        type: "danger",
                        title: errorMessage
                    });
                }
            );
        },
        //--------------------------------------------
        loadServerList() {
            // alert("this.loaded");
            let vm = this;


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

                        vm.selectedServer = vm.getConnectedServerID()
                    }
                },
                function(error) {}
            );
        }
    }
}

</script>
<style lang="scss" scoped>
.md-menu-content {
  max-height: 85vh;
}

.v-btn:hover {
  text-decoration: none;
}

a.v-btn--active {
  pointer-events: none;
  cursor: default;
  color: gray;
  background: none;
}
</style>
