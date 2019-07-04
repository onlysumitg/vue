<template>
  <div class="page-container">
    <!-- single record -->
    <v-layout wrap style="height: 200px;">
      <v-navigation-drawer
        v-model="showSingleRecord"
        absolute
        temporary
        right
        width="800"
        style="z-index:99"
      >
        <div v-if="(alertMessage.length > 0)" style="max-width:600px;padding:15px">
          Query :
          <strong>
            <p>{{this.sqlToRun}}</p>
          </strong>

          <hr>

          <div v-html="alertMessage"></div>

          <hr>

          <v-btn flat small color="primary" @click="alertMessage=''">close</v-btn>
          <hr>
        </div>
        <!--------- next section ---------------->
        <v-list class="pa-1">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Delete Record</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon @click="buildDeleteSQL()">delete</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>

        <table class="i-table table table-sm table-hover" style="min-width:400px;" :id="processId">
          <tbody>
            <tr v-for="(col,n) in actualCoumns" :key="'cc'+n" @dblclick="setCurrentColumn(col)">
              <td>
                <Strong>{{col.label}}</Strong>
                <!-- <span v-if="col.modified">**</span> -->
                <!-- <div class="md-caption" v-if="col.label != col.name">[{{col.name.trim()}}]</div> -->
                <div
                  class="md-caption"
                  v-if="col.label != col.shortFieldName"
                >[{{col.shortFieldName.trim()}}]</div>

                <div class="md-caption">
                  [{{col.type.trim()}}] [ {{col.precision}}
                  <span v-if="col.scale>0">, {{col.scale}}</span>
                  ]
                  <br>
                  <span v-if="multiTable">[{{col.libName.trim()}}/{{col.tableName.trim()}}]</span>
                  <!-- <span v-else class="md-caption">-</span> -->
                </div>
              </td>
              <!-- need to make a function ??? -->
              <!-- <td>{{row[col.label+'_'+col.id].substring(0,50)}}</td> -->
              <td>
                <div class="input-group">
                  <input
                    v-if="col.precision < 80"
                    type="text"
                    class="form-control"
                    aria-describedby="basic-addon2"
                    v-model="row[col.rowKey]"
                    :style="[{minWidth:'500px'}]"
                    :maxlength="getMaxLength(col)"
                    disabled
                  >
                  <textarea
                    v-else
                    class="form-control"
                    rows="5"
                    v-model="row[col.rowKey]"
                    cols="50"
                    :maxlength="getMaxLength(col)"
                    disabled
                  ></textarea>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </v-navigation-drawer>
    </v-layout>

    <!-- end single record -->
  </div>
</template>
<script>
export default {
  components: {},

  updated() {},

  computed: {
    actualCoumns: function() {
      var vm = this;
      //console.log(this.columns);
      return _.filter(this.columns, function(col) {
        return col.visible == true;
      });
    }
    //---------------------------------
    //---------------------------------
  },
  watch: {
    showSingleRecord: function(newval) {
      console.log(
        "showSingleRecord :: " + newval + " :: " + this.showSingleRecord
      );
    }
  },
  //------------------------------------------------------------
  methods: {
    //-----------------------------------------
    getMaxLength(col) {
      var length = col.precision;
      if (col.scale > 0) {
        length += 1;
      }
      //  alert(length);
      return length;
    },
    //--------------------------------------

    updateFormData(key, event) {
      //alert(key + " : " + this.row[key]);
      var index = Object.keys(this.row).indexOf(key);
      //alert(index);
      this.row[key] = event.target.value;
    },
    //--------------------------------------------
    initialize() {
      this.alertMessage = "";
    },
    //-------------------------------------------
    buildDeleteSQL() {
      var vm = this;
      var insertSQL =
        "delete from " +
        this.tableLib.trim() +
        "/" +
        this.table.trim() +
        " a where rrn(a) = " +
        this.rrn;

      // insertSQL += columneValues.trim() + ")";
      this.sqlToRun = insertSQL;
      this.runSQL(false);
      console.log(insertSQL);
    },
    //---------------------------------------------
    getInputWidth(chars) {
      //alert(charCount * 20);
      var charCount = chars.length;
      if (charCount <= 3) {
        charCount = 5;
      }
      return charCount * 7 + 24;
    },
    //---------------------------------------------
    getColumns(chars) {
      //alert(charCount * 20);
      var charCount = chars.trim().length / 5;
      return 500;
      return charCount * 5;
    },
    //--------------------------------------------------------
    setupListeners() {
      eventBus.$on("runsql3SingleRecordDelete", data => {
        this.alertMessage = "";
        this.columns = data.columns;
        this.row = data.row;
        this.table = data.table;
        this.tableLib = data.tableLib;
        this.serverid = data.serverid;
        this.showSingleRecord = true;
        this.rrn = data.rrn;

        this.processId = data.processId + "_delete";

        if (_.isEmpty(this.row)) {
          this.createBlankRow();
        }
      });

      eventBus.$on("hidesinglerecord3", data => {
        this.showSingleRecord = false;
      });
    },
    //-----------------------------------------------
    turnOffListeners() {
      eventBus.$off("runsql3SingleRecordDelete");
      eventBus.$off("hidesinglerecord3");
    },
    //------------------------------------------------------
    createBlankRow() {
      var vm = this;
      _.forEach(this.actualCoumns, function(col) {
        vm.row[col.label + "_" + col.id] = "";
      });
    },
    //--------------------------------------------------------

    //---------------------------------------------
    isColumnVisible(index) {
      try {
        if (this.columns[index].visible == true) {
          return true;
        }
      } catch (e) {
        return true;
      }
      return false;
    },

    //---------------------------------------------
    setCurrentColumn(column) {
      this.showEditor = true;
      this.currentCol = column;
    },
    //---------------------------------------------

    runSQL: function(newCall = true) {
      if (this.loading) {
        return;
      }
      //this.showMessage = false;
      var vm = this;

      this.runWebService(
        "r/sql3",
        {
          serverId: vm.serverid,
          sql: vm.sqlToRun,
          requestIdToProcess: "",
          requestIdToClose: ""
        },
        function() {
          vm.loading = true;
        },
        function(responce) {
          vm.loading = false;
          switch (responce.data.status) {
            case "s": {
              // vm.alertMessage = responce.data.message;
              var sqldata =
                responce.data.sqldata[Object.keys(responce.data.sqldata)[0]];
              vm.alertMessage = sqldata.error;
              break;
            }
            case "e": {
              vm.alertMessage = responce.data.message;
              vm.hasMoreData = false;
              break;
            }

            case "u": {
              vm.alertMessage = responce.data.message;
              vm.hasMoreData = false;
              break;
            }
          }
        },
        function(error) {
          vm.loading = false;
        }
      );
    }
  },

  data() {
    return {
      currentRecord: 0,
      xtrue: true,
      xfalse: false,
      showSingleRecord: false,

      processId: "",
      table: "",
      tableLib: "",
      multiTable: false,

      columns: [],
      row: {},
      currentCol: {},

      showMessage: false,
      mainMessage: "",
      loading: false,
      serverid: 0,
      sqlToRun: "",
      alertMessage: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.tdClass {
  white-space: nowrap !important;
  word-wrap: break-word;
}

.tableClasss {
  table-layout: fixed;
  white-space: normal;
}

.whitespace {
  white-space: normal;
}

.vs-sidebar {
  max-width: 600px;
}

.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

// Demo purposes only
.md-drawer {
  width: auto;
  //max-width: calc(100vw - 125px);
  background: white;
}
</style>
<style>
.md-overlay {
  background: none;
}

.md-table-head-container {
  height: auto;
  padding: 0%;
}

.i-table {
  white-space: nowrap;
  overflow: visible;
}

.md-table .md-table-content {
  overflow: visible;
}
</style>
