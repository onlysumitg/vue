<template>
  <div class="w-100">
    {{userName}}
    <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>

    <div class="row">
      <div class="col-2">
        <h5>User Role</h5>
      </div>
      <div class="col-5">
        <select class="form-control" v-model="currentRole">
          <option
            v-for="role in roles"
            v-bind:value="role.code"
            v-bind:key="role.code"
          >{{role.code}}</option>
        </select>
      </div>
      <div class="col-2">
        <button
          v-if="isAdmin"
          class="btn btn-sm btn-link btn-outline-secondary"
          @click="saveRole()"
        >
          <i class="fa fa-save"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userNameASProp: {
      type: String,
      required: false,
      default: ""
    }
  },

  computed: {
    userName: function() {
      if (this.userNameASProp.trim().length > 0) {
        return this.userNameASProp;
      } else {
        return this.userNameAsRoute;
      }
    }
  },
  data: function() {
    return {
      processing: false,
      userNameAsRoute: this.$route.params.username,
      roles: {},
      currentRole: ""
    };
  },
  mounted() {
    this.loadroles();
  },

  methods: {
    initialize() {
      this.loadroles();
    },

    //----------------------------------
    saveRole() {
      var vm = this;

      this.runWebService(
        "u/setrole",
        {
          role: vm.currentRole,
          user: vm.userName
        },

        function() {
          vm.processing = true;
        },
        function(respons) {
         // console.log(respons);
          vm.processing = false;

          if (respons.data.status == "s" || respons.data.status == "S") {
            vm.$notify({
              type: "success",
              title: "Done",
              message: "User role updated successfully"
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
    },

    //----------------------------------
    loadroles() {
      var vm = this;
      this.runWebService(
        "u/roles",
        {
          user: vm.userName
        },

        function() {
          vm.processing = true;
        },
        function(respons) {
         // console.log(respons);
          vm.processing = false;

          if (respons.data.status == "s" || respons.data.status == "S") {
            vm.roles = respons.data.data.rolelist;

            var selectRole = _.find(vm.roles, function(role) {
              return role.currentValue == "Y";
            });
            vm.currentRole = selectRole.code;
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
