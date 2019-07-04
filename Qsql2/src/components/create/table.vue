<template>
  <div style="padding:20px" class="overflowscroll">
    <div class="row">
      <div class="col-sm">
        <h5>Load existing table</h5>
        <form novalidate class="md-layout">
          <md-field>
            <label>Table Name</label>
            <md-input required v-model="loadTableName"></md-input>
          </md-field>

          <md-field>
            <label>Library</label>
            <md-input required v-model="loadTableLib"></md-input>
          </md-field>

          <md-button @click="loadTable" class="md-primary">Load</md-button>
        </form>
      </div>
      <div class="col-sm">
        <h5>how to create new table?</h5>

        <md-field>
          <label>New Table Name[Short]</label>
          <md-input required v-model="newTableName"></md-input>
        </md-field>
        <md-field>
          <label>New Table Name[Long]</label>
          <md-input required v-model="newTableNameLong"></md-input>
        </md-field>

        <md-field>
          <label>New Table lib</label>
          <md-input required v-model="newTableLib"></md-input>
        </md-field>

        <md-field>
          <label>New Table Heading</label>
          <md-input required v-model="loadTableHeading"></md-input>
        </md-field>

        <md-field>
          <label>New Table Record format</label>
          <md-input required v-model="newTableRecordFormat"></md-input>
        </md-field>

        <md-button @click="runCreateTable" class="md-primary">Create Table</md-button>
      </div>

      <div class="col-sm"></div>
    </div>

    <div class="row" v-if="loading">
      <div class="col-sm">
        <md-progress-bar class="md-accent" md-mode="indeterminate"></md-progress-bar>
      </div>
    </div>

    <div class="row" v-if="!loading && fieldListSorted.length>0">
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
            <th scope="col">with Default</th>
            <th scope="col">Default Value</th>
            <th scope="col">Heading</th>
            <th scope="col">Text</th>
            <th scope="col">Key Seq</th>

            <th scope="col">Identity Column</th>
            <th scope="col">Identity Generation</th>
            <th scope="col">Identity Start with</th>
            <th scope="col">Identity Increment by</th>
            <th scope="col">Identity Minimum</th>
            <th scope="col">Identity Maximum</th>
            <th scope="col">Identity Cache</th>
            <th scope="col">Identity Cycle</th>
            <th scope="col">Identity Order</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(afield,indx) in fieldList" :key="indx">
            <td>
              <button class="btn btn-sm btn-outline-danger" @click="deleteRow(indx)">
                <i class="fa fa-trash-alt"></i>
              </button>
            </td>
            <td>
              <input
                style="min-width: 70px;"
                class="form-control"
                type="text"
                v-model.lazy="afield.seq"
              >
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
              <div class="form-check">
                <input
                  type="checkbox"
                  v-model="afield.hasDefault"
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
            <td>
              <input
                style="min-width: 200px;"
                class="form-control"
                type="text"
                v-model="afield.keySeq"
              >
            </td>

            <!--             IDENTIRY COLUMNS -------------------->
            <td>
              <div class="form-check">
                <input
                  type="checkbox"
                  v-model="afield.isIdentity"
                  class="form-check-input"
                  id="exampleCheck1"
                >
              </div>
            </td>

            <td>
              <input
                style="min-width: 200px;"
                class="form-control"
                type="text"
                v-model="afield.isIdentityGENERATION"
              >
            </td>

            <td>
              <input
                style="min-width: 40px;"
                class="form-control"
                type="number"
                v-model="afield.isIdentityStart"
              >
            </td>

            <td>
              <input
                style="min-width: 40px;"
                class="form-control"
                type="number"
                v-model="afield.isIdentityIncrement"
              >
            </td>

            <td>
              <input
                style="min-width: 40px;"
                class="form-control"
                type="number"
                v-model="afield.isIdentityMin"
              >
            </td>

            <td>
              <input
                style="min-width: 40px;"
                class="form-control"
                type="number"
                v-model="afield.isIdentityMax"
              >
            </td>

            <td>
              <input
                style="min-width: 40px;"
                class="form-control"
                type="number"
                v-model="afield.isIdentityCache"
              >
            </td>

            <td>
              <div class="form-check">
                <input
                  type="checkbox"
                  v-model="afield.isIdentityCycle"
                  class="form-check-input"
                  id="exampleCheck1"
                >
              </div>
            </td>

            <td>
              <div class="form-check">
                <input
                  type="checkbox"
                  v-model="afield.isIdentityOrder"
                  class="form-check-input"
                  id="exampleCheck1"
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr>
    <div class="row" v-if="!loading && fieldListSorted.length==0">
      <hr>
      <div class="col-sm"></div>
      <div class="col-sm">NO DATA</div>
      <div class="col-sm"></div>
    </div>
    <md-button class="md-fab md-fab-bottom-right md-fixed md-mini" @click="addNewRow(true)">
      <md-icon>add</md-icon>
    </md-button>

    <md-dialog
      :md-click-outside-to-close="!showSaveQueryDialog"
      :md-active.sync="showSaveQueryDialog"
    >
      <md-dialog-title>
        <md-button @click="showSaveQueryDialog=!showSaveQueryDialog" class="md-primary">CLOSE</md-button>
      </md-dialog-title>
      <md-dialog-content>
        <isrouce :sourcelist="sourcelist"></isrouce>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import { CoolSelect } from "vue-cool-select";
import isrouce from "../isource/createsource";

export default {
  name: "Create_Table",
  components: { CoolSelect, isrouce },
  computed: {
    fieldListSorted: function() {
      var tempList = _.sortBy(this.fieldList, [
        function(field) {
          return field.seq;
        }
      ]);
      if (tempList.length <= 0) {
        var i = 0;
        for (i = 0; i < 15; i++) {
          var item = _.clone(this.field);
          item.seq = item.seq * (i + 1);
          tempList.push(item);
        }
        //
      }
      this.fieldList = tempList;
      return this.fieldList;
    }
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("Do you really want to leave?");
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  methods: {
    initialize() {},

    deleteRow(indx) {
      this.fieldList[indx].deleted = true;
      var evens = _.remove(this.fieldList, function(n) {
        return n.deleted == true;
      });

      this.$forceUpdate();
    },
    //------------------------
    addNewRow() {
      var item = _.clone(this.field);
      item.seq = (this.fieldListSorted.length + 1) * 100;
      this.fieldList.push(item);
    },
    //-----------------------------------------
    loadScreen() {
      //alert("loading");
      this.loadColumnsIds();
      this.fieldList = [];
      var vm = this;
      _.forEach(this.rows, function(row) {
        // console.log(row);
        var currentField = _.clone(vm.field);
        (currentField.seq = row[vm.ORDINAL_POSITION_ID] * 100),
          (currentField.longName = row[vm.COLUMN_NAME_ID]),
          (currentField.shortName = row[vm.SYSTEM_COLUMN_NAME_ID]),
          (currentField.dataType = row[vm.DATA_TYPE_ID]),
          (currentField.length = row[vm.LENGTH_ID]),
          (currentField.scale = row[vm.NUMERIC_SCALE_ID]),
          (currentField.isNullable = row[vm.IS_NULLABLE_ID] == "Y"),
          (currentField.defaultValue = row[vm.COLUMN_DEFAULT_ID]),
          (currentField.hasDefault = row[vm.HAS_DEFAULT_ID] == "Y"),
          (currentField.text = row[vm.COLUMN_TEXT_ID]),
          (currentField.keySeq = row[vm.KEYPOSITION_ID]),
          (currentField.heading = row[vm.COLUMN_HEADING_ID]),
          //-------------- ID s
          (currentField.isIdentity = row[vm.IS_IDENTITY_ID] == "YES"),
          (currentField.isIdentityGENERATION = row[vm.IDENTITY_GENERATION_ID]),
          (currentField.isIdentityStart = row[vm.IDENTITY_START_ID]),
          (currentField.isIdentityMin = row[vm.IDENTITY_MINIMUM_ID]),
          (currentField.isIdentityMax = row[vm.IDENTITY_MAXIMUM_ID]),
          (currentField.isIdentityIncrement = row[vm.IDENTITY_INCREMENT_ID]),
          (currentField.isIdentityCache = row[vm.IDENTITY_CYCLE_ID]),
          (currentField.isIdentityCycle = row[vm.IDENTITY_CACHE_ID] == "YES"),
          (currentField.isIdentityOrder = row[vm.IDENTITY_ORDER_ID]) == "YES";

        vm.fieldList.push(currentField);
      });
    },
    loadColumnsIds() {
      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "ORDINAL_POSITION";
      });

      this.ORDINAL_POSITION_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "COLUMN_NAME";
      });
      this.COLUMN_NAME_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "SYSTEM_COLUMN_NAME";
      });
      this.SYSTEM_COLUMN_NAME_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "DATA_TYPE";
      });
      this.DATA_TYPE_ID = coll.label.trim() + "_" + _.toString(coll.id).trim();

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "LENGTH";
      });
      this.LENGTH_ID = coll.label.trim() + "_" + _.toString(coll.id).trim();

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "NUMERIC_SCALE";
      });
      this.NUMERIC_SCALE_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "COLUMN_HEADING";
      });
      this.COLUMN_HEADING_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();
      //alert(this.COLUMN_HEADING_ID);

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "COLUMN_TEXT";
      });
      this.COLUMN_TEXT_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "LONG_COMMENT";
      });
      this.LONG_COMMENT_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "IS_NULLABLE";
      });
      this.IS_NULLABLE_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "KEYPOSITION";
      });
      this.KEYPOSITION_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "COLUMN_DEFAULT";
      });
      this.COLUMN_DEFAULT_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "HAS_DEFAULT";
      });
      this.HAS_DEFAULT_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();

      //  -------------- IDENTITY COLUMNS ---------------

      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "IS_IDENTITY";
      });
      this.IS_IDENTITY_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();
      //  -----
      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "IDENTITY_GENERATION";
      });
      this.IDENTITY_GENERATION_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();
      //  -----
      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "IDENTITY_START";
      });
      this.IDENTITY_START_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();
      //  -----
      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "IDENTITY_INCREMENT";
      });
      this.IDENTITY_INCREMENT_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();
      //  -----
      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "IDENTITY_MINIMUM";
      });
      this.IDENTITY_MINIMUM_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();
      //  -----
      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "IDENTITY_MAXIMUM";
      });
      this.IDENTITY_MAXIMUM_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();
      //  -----
      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "IDENTITY_CYCLE";
      });
      this.IDENTITY_CYCLE =
        coll.label.trim() + "_" + _.toString(coll.id).trim();
      //  -----
      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "IDENTITY_CACHE";
      });
      this.IDENTITY_CACHE_ID =
        coll.label.trim() + "_" + _.toString(coll.id).trim();
      //  -----
      var coll = _.find(this.columns, function(col) {
        return col.label.trim() == "IDENTITY_ORDER";
      });
      this.IDENTITY_ORDER =
        coll.label.trim() + "_" + _.toString(coll.id).trim();
    },
    //-------------------------------------

    runCreateTable: function() {
      var vm = this;

      this.runWebService(
        "c/table",
        {
          serverId: vm.$session.get("currentserver"),
          requestIdToProcess: vm.sqldata.processId,
          tableName: vm.newTableName,
          tableNameLong: vm.newTableNameLong,
          tableLib: vm.newTableLib,
          tableHeading: vm.loadTableHeading,
          tableRecordFormat: vm.newTableRecordFormat,
          columns: vm.fieldList
        },
        function() {
          vm.loading = true;

          vm.alertMessage = "";
        },
        function(responce) {
          vm.loading = false;

          if ((responce.data.status = "s")) {
            vm.sourcelist = responce.data.tableStmt;
            vm.showSaveQueryDialog = true;
          }
        },
        function(error) {
          vm.loading = false;
        }
      );
    },
    //-------------------------------------
    loadTable: function() {
      if (this.loading) {
        return;
      }
      this.showMessage = false;
      var vm = this;

      vm.rows = [];
      vm.sqldata.processId = "";
      vm.sqldata.downloadLocation = "";
      vm.loadTableHeading = " ";
      this.loadTableSql =
        "@createtable " +
        this.loadTableLib.trim() +
        "." +
        this.loadTableName.trim();
      // alert(vm.$session.get("currentserver"));

      this.runWebService(
        "r/sql3",
        {
          serverId: vm.$session.get("currentserver"),
          sql: vm.loadTableSql,
          requestIdToProcess: vm.sqldata.processId,
          requestIdToClose: ""
        },
        function() {
          vm.loading = true;

          vm.alertMessage = "";
          vm.rows = [];
          vm.sqldata = [];
          vm.columns = [];
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

              vm.rows = vm.sqldata.data;

              vm.loadTableHeading = vm.sqldata.heading;
              /// check if it has more fata

              vm.hasMoreData = false;

              vm.requestIdToProcess = responce.data.requestId;
              vm.alertMessage = vm.sqldata.error;
              vm.loadScreen();
              break;
            } // end sucess

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
      loadTableSql: "",
      fieldList: [],
      loading: false,
      loadTableHeading: "",
      fieldListbackup: {},
      hasMoreData: true,
      showSaveQueryDialog: false,
      // row ids
      ORDINAL_POSITION_ID: "",
      COLUMN_NAME_ID: "",
      SYSTEM_COLUMN_NAME_ID: "",
      DATA_TYPE_ID: "",
      LENGTH_ID: "",
      NUMERIC_SCALE_ID: "",
      COLUMN_HEADING_ID: "",
      COLUMN_TEXT_ID: "",
      KEYPOSITION_ID: "",
      LONG_COMMENT_ID: "",
      IS_NULLABLE_ID: "",
      COLUMN_DEFAULT_ID: "",
      HAS_DEFAULT_ID: "",

      IS_IDENTITY_ID: "",
      IDENTITY_GENERATION_ID: "",

      IDENTITY_START_ID: "",
      IDENTITY_INCREMENT_ID: "",
      IDENTITY_MINIMUM_ID: "",
      IDENTITY_MAXIMUM_ID: "",
      IDENTITY_CYCLE_ID: "",
      IDENTITY_CACHE_ID: "",
      IDENTITY_ORDER_ID: "",

      newTableName: "",
      newTableNameLong: "",
      newTableLib: "",
      newTableRecordFormat: "",

      sourcelist: [],
      // data
      rows: [],
      columns: {},
      sqldata: {},
      field: {
        seq: 100,
        longName: "",
        shortName: "",
        dataType: "CHAR",
        length: 0,
        scale: "",
        isNullable: false,
        hasDefault: false,
        defaultValue: "",
        text: "",
        heading: "",
        keySeq: 0,
        isIdentity: false,
        isIdentityGENERATION: "",
        isIdentityStart: 0,
        isIdentityMin: 0,
        isIdentityMax: 0,
        isIdentityIncrement: 1,
        isIdentityCache: 0,
        isIdentityCycle: false,
        isIdentityOrder: false
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
html {
  overflow: auto;
}
.IZ-select {
  min-width: 150px;
}
.md-dialog {
  width: 100%;
}
</style>
