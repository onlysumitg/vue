<template>
  <md-card>
    <md-card-header>
      <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>
      <h5>Create a New user</h5>
    </md-card-header>
    <md-card-content>
      <div class="row">
        <div class="col-6">
          <form @submit="checkForm" class="md-layout">
            <md-field>
              <label>User Name</label>
              <md-input
                required
                v-model="userName"
                oninvalid="this.setCustomValidity('User Name is required')"
                oninput="setCustomValidity('')"
              ></md-input>
            </md-field>
            <md-field>
              <label>Email</label>
              <md-input
                type="email"
                required
                v-model="email"
                oninvalid="this.setCustomValidity('Valid Email is required')"
                oninput="setCustomValidity('')"
              ></md-input>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input
                required
                v-model="password"
                oninvalid="this.setCustomValidity('Password is required')"
                oninput="setCustomValidity('')"
              ></md-input>
            </md-field>
            <md-button type="submit" class="md-primary">Create</md-button>
          </form>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  data: function() {
    return {
      processing: false,
      userName: "",
      password: "",
      email: "",
      settings: {}
    };
  },
  mounted() {},

  methods: {
    initialize() {},
    checkForm(e) {
      e.preventDefault();

      if (
        this.userName.trim().length <= 0 ||
        this.password.trim().length <= 0 ||
        this.email.trim().length <= 0
      ) {
        return false;
      }

      this.createUser();
    },
    //-----------------------------
    createUser() {
      //alert(this.userName);

      var vm = this;
      this.runWebService(
        "u/crtusr",
        {
          user: vm.userName,
          password: vm.password,
          email: vm.email
        },

        function() {
          vm.processing = true;
        },
        function(respons) {
          console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
          console.log(respons.data.data);
          vm.processing = false;

          if (respons.data.status == "s" || respons.data.status == "S") {
            //  vm.userList = respons.data.data.users;
            vm.userName = "";
            vm.password = "";
            vm.email = "";
            vm.$notify({
              type: "success",
              title: "Done",
              message: "User Created successfully"
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
