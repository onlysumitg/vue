<template>


  <md-card>
    <md-card-header>
      <div class="md-title">Login</div>
    </md-card-header>

    <md-card-content>
   
    <form novalidate class="md-layout" @submit.prevent="validateUser">

          <md-field>
      <label>User name</label>
      <md-input v-model="user" required></md-input>
    </md-field>

    <md-field>
      <label>Password</label>
      <md-input v-model="password" type="password" required></md-input>
    </md-field>
   </form>
    </md-card-content>

    <md-card-actions>
      <md-button>Forogt password</md-button>
      <md-button @click="checkLogin" class="md-primary">Login</md-button>
    </md-card-actions>

    <md-snackbar md-position="left" :md-duration="3000" :md-active.sync="showError">
      <span>{{errorMessage}}</span>
    </md-snackbar>


  </md-card>

</template>
<script>
export default {
  data: function() {
    return {
      user: "",
      password: "",
      showError: false,
      errorMessage: ""
    };
  },
  methods: {
    validateUser() {
      if (this.user.trim.length() <= 0 || this.password.trim.length() <= 0) {
        vm.showError = true;
        vm.errorMessage = "User name and password required.";
      }
    },
    checkLogin() {
      this.showError = false;
      this.errorMessage = "";
      var vm = this;
      this.runWebService(
        "/a/gettoken",
        {
          user: vm.user,
          password: vm.password
        },
        function() {},
        function(responce) {
          // console.log("responce")
          // console.log(responce)
          //window.$cookies.set("QSQL_TOKEN", responce.data.token);

          vm.$session.set("QSQL_TOKEN", responce.data.token);
          if (responce.data.token.length >= 0) {
            vm.$router.push({
              path: "/servers"
            });
          } else {
            vm.showError = true;
            vm.errorMessage = responce.data.message;
          }
        },
        function(error) {
          console.log(error);
          vm.showError = true;
          vm.errorMessage = "" + error;
        }
      );
    }
  }
};
</script>
