<template>
  <div class="h-100">
    <md-card>
      <md-card-header>
        <div class="md-title">Server details</div>
      </md-card-header>

      <md-card-content>
        <form novalidate class="md-layout">
          <md-field>
            <label>Server Name</label>
            <md-input v-model="selectedServer.serverName" id="servername"></md-input>
          </md-field>

          <md-field md-inline>
            <label>Server IP</label>
            <md-input v-model="selectedServer.serverIP" id="serverip"></md-input>
          </md-field>
          <md-switch md-inline v-model="selectedServer.ssl" class="md-primary">SSL</md-switch>

          <md-field>
            <label>User</label>
            <md-input v-model="selectedServer.userName" id="serveruser"></md-input>
          </md-field>

          <md-field>
            <label>Password</label>
            <md-input v-model="selectedServer.password" type="password" required></md-input>
          </md-field>
        </form>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-accent" @click="deleteServers">Delete</md-button>
        <md-button :disabled="processing" @click="saveServers" class="md-primary">
          <md-progress-spinner
            v-show="processing"
            :md-diameter="12"
            :md-stroke="2"
            md-mode="indeterminate"
          ></md-progress-spinner>Connect
        </md-button>
      </md-card-actions>
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
  data: function() {
    return {
      processing: false
    };
  },

  methods: {
    saveServers() {
      var vm = this;
      this.runWebService(
        "s/test",
        vm.selectedServer,
        function() {
          vm.processing = true;
        },
        function(respons) {
          console.log(respons);
          vm.processing = false;
          if (respons.data.status == "s") {
            // go to next screen
            vm.$session.set("currentserver", vm.selectedServer.id);
            vm.$session.set("currentservername", vm.selectedServer.serverName);
            eventBus.$emit("updatetitle", vm.selectedServer.serverName);

            // setTimeout(function() {
            //   vm.getAutoCompleteData();
            // }, 5000);
            vm.$router.push({
              path: "/sql"
            });
          }
        },
        function(error) {
          vm.processing = false;
        }
      );
    },
    getAutoCompleteData() {
      var vm = this;
      this.runWebService(
        "r/autoc",
        { serverId: vm.selectedServer.id },
        function() {},
        function(respons) {
          console.log(respons);
          if (respons.data.status == "s") {
            // reload the list
          }
        },
        function(error) {}
      );
    },
    deleteServers() {
      var vm = this;
      this.runWebService(
        "s/delete",
        vm.selectedServer,
        function() {},
        function(respons) {
          console.log(respons);
          if (respons.data.status == "s") {
            // reload the list
          }
        },
        function(error) {}
      );
    }
  }
};
</script>




<style>
.checkbox-custom {
  display: none;
}

.checkbox-custom-label {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  margin: 5px;
  cursor: pointer;
}

.checkbox-custom + .checkbox-custom-label:before {
  content: "";
  background: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: inline-block;
  vertical-align: middle;

  width: 24px;
  height: 24px;
  padding: 2px;
  margin-right: 10px;
}

.checkbox-custom:checked + .checkbox-custom-label:after {
  content: "";
  padding: 2px;
  position: absolute;
  width: 12px;
  height: 25px;
  border: solid #53bafc;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  top: -6px;
  left: 10px;
}

.content-container {
  padding: 8px 10px;
  display: flex;
}
</style>
