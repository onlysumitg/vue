<template>
  <div>
    {{userName}}
    <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>

    <table class="i-table table table-striped table-bordered table-sm table-hover">
      <thead>
        <tr>
          <th class="stickyHead">Group</th>
          <th class="stickyHead">Assigned</th>
          <th v-if="isAdmin" class="stickyHead">Save</th>
          <th v-if="isAdmin" class="stickyHead">Delete</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(group, index) in groups" :key="index">
          <td>
            {{group.text}}
            <p>
              <small>{{group.code}}</small>
            </p>
          </td>
          <td>
            <div v-if="group.validValues === undefined || group.validValues.length < 1">
              <input
                :disabled="!isAdmin"
                type="text"
                class="form-control"
                v-model="group.currentValue"
              />
            </div>
            <div v-else>
              <select :disabled="!isAdmin" class="form-control" v-model="group.currentValue">
                <option v-for="(xVal,indx) in group.validValues" :key="indx" :value="xVal">{{xVal}}</option>
              </select>
            </div>
          </td>

          <td v-if="isAdmin">
            <button class="btn btn-sm btn-link btn-outline-secondary" @click="saveGroups(group)">
              <i class="fa fa-save"></i>
            </button>
          </td>
          <td v-if="isAdmin">
            <button class="btn btn-sm btn-outline-danger" @click="deleteGroups(group)">
              <i class="fa fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
      groups: {}
    };
  },
  mounted() {
    this.loadgroups();
  },

  methods: {
    initialize() {
      this.loadgroups();
    },

    //----------------------------------
    saveGroups(group) {
      var vm = this;

      this.runWebService(
        "u/setgroup",
        {
          group: group.code,
          newValue: group.currentValue,
          user: vm.userName
        },

        function() {
          vm.processing = true;
        },
        function(respons) {
          // console.log(respons);
          vm.processing = false;

          if (respons.data.status == "s" || respons.data.status == "S") {
            group.value = respons.data.newvalue;
            vm.$notify({
              type: "success",
              title: "Done",
              message: "User groups updated successfully"
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
    deleteGroups(group) {
      var vm = this;
      group.currentValue = "N";
      this.runWebService(
        "u/setgroup",
        {
          group: group.code,
          user: vm.userName
        },

        function() {
          vm.processing = true;
        },
        function(respons) {
          // console.log(respons);
          vm.processing = false;

          if (respons.data.status == "s" || respons.data.status == "S") {
            group.value = respons.data.newvalue;
            vm.$notify({
              type: "success",
              title: "Done",
              message: "User authority groups successfully"
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
    loadgroups() {
      var vm = this;
      this.runWebService(
        "u/groups",
        {
          user: vm.userName
        },

        function() {
          vm.processing = true;
        },
        function(respons) {
          // console.log(respons);
          vm.processing = false;
          if (respons.data.status == "S") {
            vm.groups = respons.data.data.groups;
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
