<template>
  <div class="page-container2">
    <v-tabs dark slider-color="red">
      <v-tab v-for="(value,key,index) in sqldata" :key="'c'+index" ripple>{{ getHeading(value) }}</v-tab>
      <v-tab-item v-for="(value,key,index) in sqldata" :key="'n'+index">
        <v-card flat>
          <v-card-text>
            <results2multiRecord :initialData="value"></results2multiRecord>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <v-card v-if="(alertMessage.length > 0)">
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{alertHeading}}</h3>
          <div>{{alertMessage}}</div>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat @click="alertMessage=''" color="orange">Close</v-btn>
      </v-card-actions>
    </v-card>
    <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>

    <results2singleRecord></results2singleRecord>
    <results2singleRecordInsert></results2singleRecordInsert>
    <results2singleRecordDelete></results2singleRecordDelete>
  </div>
</template>
<script>
import results2multiRecord from "./results2multiRecord";
import results2singleRecord from "./results2singleRecord";
import results2singleRecordInsert from "./results2singleRecordInsert";
import results2singleRecordDelete from "./results2singleRecordDelete";
export default {
  components: {
    results2multiRecord,
    results2singleRecord,
    results2singleRecordInsert,
    results2singleRecordDelete
  },

  created() {},
  computed: {},
  watch: {},

  methods: {
    setupListeners() {
      eventBus.$on("runsql3ShowSingleRecord", data => {
        this.showSingleRecord = data;
      });

      eventBus.$on("runsql3", data => {
        //alert("okrrrrk");
        eventBus.$emit("hidesinglerecord3", true);

        this.sqlToRun = data.sqlsqlToRun;

        this.editorValue2 = "";

        this.showMessage = false;
        if (this.sqlToRun.trim().length > 0) {
          this.runSQL(
            this.sqlToRun,
            data.serverId,
            data.requestIdToProcess,
            data.requestIdToClose,
            true
          );
        }

        var i = sessionStorage.length;
        // alert(i);
        while (i--) {
          // alert("rrr");
          var key = sessionStorage.key(i);
          if (key.startsWith("tableexport-")) {
            sessionStorage.removeItem(key);
          }
        }
      });
    },
    //-----------------------------------------------
    turnOffListeners() {
      eventBus.$off("runsql3");
    },

    //-----------------------------
    getHeading(sqlResultData) {
      if (
        _.isEmpty(sqlResultData.serverName) ||
        sqlResultData.serverId == this.$session.get("currentserver")
      ) {
        return sqlResultData.heading;
      } else {
        return sqlResultData.serverName.trim() + " >> " + sqlResultData.heading;
      }
    },
    //---------------------------------------------

    runSQL: function(
      sqltorun,
      serverId,
      requestIdToProcess,
      requestIdToClose,
      newCall = true
    ) {
      this.loading = true;
      this.showMessage = false;
      var vm = this;
      this.runWebService(
        "r/sql3",
        {
          // vm.$session.get("currentserver")
          serverId: serverId,
          sql: sqltorun,
          requestIdToProcess: requestIdToProcess,
          requestIdToClose: requestIdToClose
        },
        function() {
          if (newCall) {
            vm.alertMessage = "";
            vm.sqldata = [];
          }
        },
        function(responce) {
          vm.loading = false;
          vm.sqldata = responce.data.sqldata;
          eventBus.$emit("updateHistorySQL", true);

          switch (responce.data.status) {
            case "s": {
              vm.alertMessage = responce.data.message;
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
      sqldata: [],

      animate: true,

      alertMessage: "",
      alertHeading: "",
      showMessage: false,
      mainMessage: "",
      loading: false,
      showSingleRecord: false
    };
  }
};
</script>

<style lang="scss" scoped>
html {
  overflow-x: auto;
}

.md-tabs-content {
  overflow: visible;
}

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

.page-container23 {
  height: calc(100vh - 65px);
  overflow: scroll;
}
</style>
