<template>
  <div class="h-100">
    <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>

    <table class="i-table table table-striped table-bordered table-sm table-hover">
      <thead>
        <tr>
          <th class="stickyHead">User Name</th>
          <th class="stickyHead">Status</th>
          <th class="stickyHead">Edit</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(user, index) in userList" :key="index">
          <td>{{user.userName}}</td>
          <td>{{user.status}}</td>

          <td>
            <button
              class="btn btn-sm btn-link btn-outline-secondary"
              @click="editUser(user.userName)"
            >
              <i class="fa fa-edit"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      processing: false,
      userList: {}
    };
  },
  mounted() {
    //  this.loadsettings();
  },

  methods: {
    initialize() {
      this.loadlist();
    },

    //----------------------------------
    loadlist() {
      var vm = this;
      this.runWebService(
        "u/list",
        {},

        function() {
          vm.processing = true;
        },
        function(respons) {
          vm.processing = false;
          if (respons.data.status == "s" || respons.data.status == "S") {
            vm.userList = respons.data.data.users;
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
    },
    //----------------------------------
    editUser(userName) {
      this.$router.push({ name: "useredit", params: { username: userName } });
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
