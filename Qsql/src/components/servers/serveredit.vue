<template>
    
  <div class="h-100">
    <form>
      <div class="form-group">
        <label for="servername">Server Name</label>
        <input type="text" class="form-control" id="servername" v-model="selectedServer.serverName"  placeholder="Enter server name">
      </div>

      <div class="form-row  ">
          <div class="col-8">
              <div class="form-group"> 
                  <label for="serverip">Server IP*</label>
                  <input type="text" class="form-control" id="serverip" v-model="selectedServer.serverIP" placeholder="Enter server IP">
              </div>
          </div>
          <div class="col-4 align-self-center">
        <div class="d-flex ml-1 ">
          <div class="content-container">
            <input type="checkbox" id="checkbox-bank" name="checkbox-bank" v-model="selectedServer.ssl" class="large align-middle checkbox-custom">
            <label class="checkbox-custom-label" for="checkbox-bank">SSL</label>
             
          </div>
        </div>
      </div>
    </div>
                    <div class="form-group">
      <label for="username">User Name</label>
      <input type="text" class="form-control" id="username" v-model="selectedServer.userName" placeholder="Enter server name">
  
    </div>

      <div class="form-group">
      <label for="userpassword">Password</label>
      <input type="password" class="form-control" v-model="selectedServer.password"  id="userpassword" placeholder="Password">
    </div>
<font-awesome-icon :disabled="processing" icon="trash-alt" @click="deleteServers" />

 
<button type="button" :disabled="processing" @click="saveServers" class="btn btn-dark float-right">Connect<span v-show="processing" class="p-1"><font-awesome-icon icon="spinner" spin /></span></button>
              </form>
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
          }
        },
        function(error) {
          vm.processing = false;
        }
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
