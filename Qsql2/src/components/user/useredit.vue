<template>
  <div class="h-100">
    <md-tabs md-elevation="1">
      <md-tab md-label="Password" id="t0">
        <h5>Edit user</h5>
        <hr />
        <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>

        <div class="row">
          <div class="col-6">
            <form @submit="checkForm" class="md-layout">
              <md-field>
                <label>User Name</label>
                <md-input
                  required
                  disabled
                  v-model="userName"
                  oninvalid="this.setCustomValidity('User Name is required')"
                  oninput="setCustomValidity('')"
                ></md-input>
              </md-field>

              <md-field>
                <label>Password</label>
                <md-input
                  v-model="password"
                  oninvalid="this.setCustomValidity('Password is required')"
                  oninput="setCustomValidity('')"
                ></md-input>
              </md-field>
              <md-button type="submit" class="md-primary">Save</md-button>
            </form>
          </div>
        </div>
      </md-tab>
      <md-tab md-label="Settings" id="t3">
        <h5>User Settings</h5>
        <hr />
        <usersettings :userNameASProp="userName"></usersettings>
      </md-tab>
      <md-tab md-label="Groups" id="t1">
        <h5>User groups</h5>
        <hr />
        <usergroups :userNameASProp="userName"></usergroups>
      </md-tab>
      <md-tab md-label="Authorities" id="t2">
        <br />
        <userroles :userNameASProp="userName"></userroles>
        <br />
        <hr />
        <h5>User Auth</h5>

        <br />
        <userauths>rauths :userNameASProp="userName"></userauths>
      </md-tab>
    </md-tabs>
  </div>
</template> 
<script>
import usergroups from "./groups.vue";
import userauths from "./auths.vue";
import usersettings from "./settings.vue";
import userroles from "./roles.vue";

export default {
  components: {
    usergroups,
    userauths,
    usersettings,
    userroles
  },

  data: function() {
    return {
      processing: false,
      userName: this.$route.params.username,
      password: "",
      email: "",
      settings: {}
    };
  },
  mounted() {},

  methods: {
    initialize() {},
    //-----------------------------
    checkForm(e) {
      e.preventDefault();

      if (this.userName.trim().length <= 0) {
        return false;
      }

      this.updateUser();
    },
    //-----------------------------
    updateUser() {
      // alert(this.userName);

      var vm = this;
      this.runWebService(
        "u/edituser",
        {
          user: vm.userName,
          password: vm.password,
          email: vm.email
        },

        function() {
          vm.processing = true;
        },
        function(respons) {
          vm.processing = false;
          if (respons.data.status == "s" || respons.data.status == "S") {
            vm.$notify({
              type: "success",
              title: "Done"
            });
          } else {
            vm.$notify({
              type: "danger",
              title: respons.data.message
            });
          }
        },
        function(error) {
          vm.processing = false;
        }
      );
    }
  }
};
</script>




<style>
.i-table {
  white-space: nowrap;
  overflow: visible;
}
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
