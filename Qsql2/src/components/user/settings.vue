<template>
  <div class="h-100">
    <table class="i-table table table-striped table-bordered table-sm table-hover">
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th>Save</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(setting, index) in settings" :key="index">
          <td>
            {{setting.key}}
            <p>
              <small>{{setting.text}}</small>
            </p>
          </td>
          <td>
            <div v-if="setting.validValues === undefined || setting.validValues.length < 1">
              <input type="text" class="form-control" v-model="setting.value" />
            </div>
            <div v-else>
              <select class="form-control" v-model="setting.value">
                <option
                  v-for="(xVal,indx) in setting.validValues"
                  :key="indx"
                  :value="xVal"
                >{{xVal}}</option>
              </select>
            </div>
          </td>

          <td>
            <button class="btn btn-sm btn-link btn-outline-secondary" @click="saveSetting(setting)">
              <i class="fa fa-save"></i>
            </button>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-danger" @click="saveSetting(setting, true)">
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
  data: function() {
    return {
      processing: false,
      settings: {}
    };
  },
  mounted() {
    this.loadsettings();
  },

  methods: {
    initialize() {
      this.loadsettings();
    },
    saveSetting(setting, xDelete = false) {
      var vm = this;

      if (xDelete) {
        setting.value = "";
      }
      this.runWebService(
        "u/settingssave",
        {
          key: setting.key,
          newValue: setting.value
        },

        function() {
          vm.processing = true;
        },
        function(respons) {
          console.log(respons);
          vm.processing = false;
          if (respons.data.status == "s") {
            setting.value = respons.data.newvalue;
            //vm.settings = respons.data.settings;
          }
        },
        function(error) {
          vm.processing = false;
        }
      );
    },

    //----------------------------------
    loadsettings() {
      var vm = this;
      this.runWebService(
        "u/settings",
        {},

        function() {
          vm.processing = true;
        },
        function(respons) {
          console.log(respons);
          vm.processing = false;
          if (respons.data.status == "s") {
            vm.settings = respons.data.settings;
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
