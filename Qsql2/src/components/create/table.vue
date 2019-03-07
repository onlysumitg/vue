<template>
  <div style="padding:10px">
    <div class="row">
      <div class="col-sm">
        <form novalidate class="md-layout">
          <md-field>
            <label>Table Name</label>
            <md-input required></md-input>
          </md-field>

          <md-field>
            <label>Source File</label>
            <md-input required></md-input>
          </md-field>
          <md-field>
            <label>Source File Library</label>
            <md-input required></md-input>
          </md-field>
          <md-button class="md-accent">Clear</md-button>

          <md-button class="md-primary">Save</md-button>
        </form>
      </div>
      <div class="col-sm">
        <form novalidate class="md-layout">
          <md-field>
            <label>Table Name</label>
            <md-input required v-model="loadTableName"></md-input>
          </md-field>

          <md-field>
            <label>Library</label>
            <md-input required v-model="loadTableLib"></md-input>
          </md-field>

          <md-button class="md-primary">Load</md-button>
        </form>
      </div>
      <div class="col-sm"></div>

      <div class="col-sm"></div>
    </div>

    <div class="row">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Seq</th>
            <th scope="col">Long Name</th>
            <th scope="col">Short Name</th>
            <th scope="col">Data type</th>
            <th scope="col">Length</th>
            <th scope="col">Decimal Position</th>
            <th scope="col">Nullable</th>
            <th scope="col">Default Value</th>
            <th scope="col">Heading</th>
            <th scope="col">Text</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(afield,indx) in fieldList" :key="'c'+indx">
            <td>Delete</td>
            <td>
              <input style="min-width: 70px;" class="form-control" type="text" v-model="afield.seq">
            </td>

            <td>
              <input
                style="min-width: 200px;"
                class="form-control"
                type="text"
                v-model="afield.longName"
              >
            </td>
            <td>
              <input
                style="min-width: 140px;"
                class="form-control"
                type="text"
                v-model="afield.shortName"
              >
            </td>
            <td>
              <div>
                <!-- <md-autocomplete v-model="afield.dataType" :md-options="alloweddatatype" md-dense></md-autocomplete> -->
                <cool-select v-model="afield.dataType" :items="alloweddatatype" placeholder="CHAR"/>
              </div>
            </td>
            <td>
              <input
                style="min-width: 70px;"
                class="form-control"
                type="number"
                v-model="afield.length"
              >
            </td>
            <td>
              <input
                style="min-width: 40px;"
                class="form-control"
                type="number"
                v-model="afield.scale"
              >
            </td>
            <td>
              <div class="form-check">
                <input
                  type="checkbox"
                  v-model="afield.isNullable"
                  class="form-check-input"
                  id="exampleCheck1"
                >
              </div>
            </td>
            <td>
              <input
                style="min-width: 120px;"
                class="form-control"
                type="text"
                v-model="afield.defaultValue"
              >
            </td>
            <td>
              <input
                style="min-width: 200px;"
                class="form-control"
                type="text"
                v-model="afield.heading"
              >
            </td>
            <td>
              <input
                style="min-width: 200px;"
                class="form-control"
                type="text"
                v-model="afield.text"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { CoolSelect } from "vue-cool-select";
export default {
  name: "Create_Table",
  components: { CoolSelect },

  methods: {
    initialize() {
      this.fieldList.push(_.clone(this.field));
      this.fieldList.push(_.clone(this.field));
      this.fieldList.push(_.clone(this.field));
      this.fieldList.push(_.clone(this.field));
      this.fieldList.push(_.clone(this.field));
    },
//-------------------------------------
     runSQL: function(newCall = true) {
      if (this.loading) {
        return;
      }
      this.showMessage = false;
      var vm = this;
      if (newCall) {
        vm.alertMessage = "";
        vm.rows = [];
        vm.sqldata.processId = "";
        vm.sqldata.downloadLocation = "";
      }
      this.runWebService(
        "r/sql3",
        {
          serverId: vm.sqldata.serverId,
          sql: vm.sqldata.sql,
          requestIdToProcess: vm.sqldata.processId,
          requestIdToClose: ""
        },
        function() {
          vm.loading = true;
          if (newCall) {
            vm.alertMessage = "";
            vm.rows = [];
            vm.sqldata = [];
          }
        },
        function(responce) {
          vm.loading = false;
          vm.requestIdToClose = "";
          vm.requestIdToProcess = "";
          //  alert("kkk;");
          //  console.log("KK: ");
          //  console.log("KK: " + Object.keys(responce.data.sqldata)[0]);

          vm.sqldata =
            responce.data.sqldata[Object.keys(responce.data.sqldata)[0]];

          eventBus.$emit("updateHistorySQL", true);
          console.log("vm.sqldata.data " + vm.sqldata);

          switch (vm.sqldata.status) {
            case "s": {
              vm.columns = vm.sqldata.columns;
              console.log("vm.sqldata.data.length " + vm.sqldata.data.length);
              if (vm.rows.length > 0) {
                vm.rows = vm.rows.concat(vm.sqldata.data);
              } else {
                vm.rows = vm.sqldata.data;
              }

              /// check if it has more fata
              if (vm.sqldata.data.length <= 0) {
                vm.hasMoreData = false;
              } else {
                vm.hasMoreData = vm.sqldata.hasMoreData;
              }

              vm.requestIdToProcess = responce.data.requestId;
              vm.alertMessage = vm.sqldata.error;

              break;
            } // end sucess
            case "e": {
              vm.alertMessage = vm.sqldata.error;
              vm.hasMoreData = false;
              break;
            }

            case "u": {
              vm.alertMessage = vm.sqldata.error;
              vm.hasMoreData = false;
              break;
            }
            default: {
              vm.alertMessage = "Somthing is not right";
              vm.hasMoreData = false;
            }
          }
        },
        function(error) {
          vm.loading = false;
          vm.requestIdToClose = "";
          vm.requestIdToProcess = "";
          vm.hasMoreData = false;
        }
      );
    }

//--------------------------------------    
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      loadTableName: "",
      loadTableLib: "",
      fieldList: [],
      field: {
        seq: 100,
        longName: "x",
        shortName: "",
        dataType: "CHAR",
        length: 0,
        scale: "",
        isNullable: false,
        defaultValue: "",
        text: "",
        heading: ""
      },

      alloweddatatype: [
        "CHAR",
        "VARCHAR",
        "CLOB",
        "DATE",
        "TIME",
        "TIMESTAMP",
        "XML",
        "DECIMAL",
        "NUMERIC",
        "SMALLINT",
        "INTEGER",
        "BLOB"
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.IZ-select {
  min-width: 150px;
}
</style>
