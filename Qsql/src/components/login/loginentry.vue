<template>
    <div>
<form>
      <div class="form-group">
        <label for="username">Server Name</label>
        <input type="text" class="form-control" id="username"  placeholder="Enter server name" v-model="user">
      </div>
            <div class="form-group">
      <label for="userpassword">Password</label>
      <input type="password" class="form-control" id="userpassword" placeholder="Password" v-model="password">
    </div>
    <a>Forgot password </a>
    <button type="button" @click="checkLogin" class="btn btn-dark float-right">Login</button>
</form>

    </div>
</template>
<script>
export default {
  data: function() {
    return {
      user: "",
      password: ""
    };
  },
  methods: {
    checkLogin() {
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
          if (responce.data.token.length >= 0)
            vm.$router.push({ path: "/servers" });
        },
        function(error) {}
      );
    }
  }
};
</script>

