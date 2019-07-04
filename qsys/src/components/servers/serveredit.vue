<template>
  <div>
    <form>
      <v-text-field
        v-model="selectedServerLocal.serverName"
        id="servername"
        v-validate="'required'"
        label="Server Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="selectedServerLocal.serverIP"
        id="serverIP"
        v-validate="'required'"
        label="Server IP"
        required
      ></v-text-field>

      <v-text-field
        v-model="selectedServerLocal.userName"
        id="serverusername"
        v-validate="'required'"
        label="Server User Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="selectedServerLocal.password"
        id="serverPass"
        v-validate="'required'"
        label="Server Password"
        required
      ></v-text-field>

      <v-checkbox v-model="selectedServerLocal.ssl" value="Y" label="SSL" type="checkbox"></v-checkbox>

      <v-btn :disabled="processing" color="info" flat @click="clearServers">clear</v-btn>
      <v-btn :disabled="processing" color="warning" flat @click="deleteServers">Delete</v-btn>
      <v-btn
        color="success"
        :loading="processing"
        :disabled="processing"
        @click="saveServers"
      >Connect</v-btn>
    </form>

    <div v-if="showError" class="alert alert-danger" role="alert">{{errorMessage}}</div>
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
      processing: false,
      showError: false,
      errorMessage: "",
      selectedServerLocal: {
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

  //=====================================

  watch: {
    selectedServer(newV) {
      this.selectedServerLocal = _.clone(newV);
    }
  },
  //=====================================
  methods: {
    saveServers() {
      this.showError = false;
      this.errorMessage = "";
      var vm = this;
      this.runWebService(
        "s/test",
        vm.selectedServerLocal,
        function() {
          vm.processing = true;
        },
        function(respons) {
          console.log(respons);
          vm.processing = false;
          if (respons.data.status == "s") {
            // go to next screen
            vm.selectedServerLocal.id = respons.data.id;
            vm.$session.set("currentserver", respons.data.id);
            vm.$session.set(
              "currentservername",
              vm.selectedServerLocal.serverName
            );

            topTitle.title = vm.selectedServerLocal.serverName;
            // setTimeout(function() {
            //   vm.getAutoCompleteData();
            // }, 5000);
            vm.$router.push({
              path: "/sql"
            });
          } else {
            vm.showError = true;
            vm.errorMessage = respons.data.message;
          }
        },
        function(error) {
          vm.processing = false;
          vm.showError = true;
          vm.errorMessage = "" + error;
        }
      );
    },
    getAutoCompleteData() {
      var vm = this;
      this.runWebService(
        "r/autoc",
        { serverId: vm.selectedServerLocal.id },
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

    //------------------------------------------------------------
    clearServers() {
      // this.selectedServer = _.clone(this.selectedServer);
      this.selectedServerLocal.id = 0;
      this.selectedServerLocal.serverName = "";
      this.selectedServerLocal.serverIP = "";
      this.selectedServerLocal.userName = "";
      this.selectedServerLocal.password = "";
      this.selectedServerLocal.ssl = false;
      this.selectedServerLocal.libl = new Array(20);
      this.selectedServerLocal.modified = false;
    },

    //--------------------------------------------------------------
    deleteServers() {
      var vm = this;
      this.runWebService(
        "s/delete",
        vm.selectedServerLocal,
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
