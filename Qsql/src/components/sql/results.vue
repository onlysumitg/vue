<template>
  <div class="page-container">

    <b-alert v-if="(alertMessage.length > 0)" show dismissible :variant="alertVariant">
      <h4 class="alert-heading">Error</h4>
      <div class="small"> {{alertMessage}}</div>
    </b-alert>

    <md-empty-state v-if="(alertMessage.length <= 0) && (columns.length<=0)" class="md-accent" md-icon="priority_high"
      md-label="Nothing to show" md-description="Please run a query to get the results">
    </md-empty-state>

    <!-- <b-table hover :items="rows" :small="true" :foot-clone="true" :bordered="true" :outlined="true" :tbodyTrClass="nowrapclass"
      :theadTrClass="nowrapclass2" :tfootTrClass="nowrapclass2">


    </b-table> -->

    <div>
      <md-table>
        <md-table-row>
          <md-table-head v-if="columns.length>0">#</md-table-head>
          <md-table-head v-for="(col,indx) in columns" :key="'c'+indx">
            {{col.label.trim()}} 
            <span v-if="col.label.trim()!=col.name.trim()" class="md-caption">[{{col.name.trim()}}]</span>
          </md-table-head>

        <!-- </md-table-row>
                <md-table-row>
          <md-table-head v-if="columns.length>0"></md-table-head>
          <md-table-head v-for="(col,indx) in columns" :key="'c'+indx">
            {{col.name.trim()}} 
          </md-table-head> -->

        </md-table-row>

        <md-table-row md-selectable="single" class="md-primary" @dblclick="setCurrentRecord(indx),modalShow2 = true,modalShow3 = false"
          v-for="(row,indx) in rows" :key="'c'+indx">
          <md-table-cell>{{indx}}</md-table-cell>
          <md-table-cell v-for="(valx,keyx,indxx) in row" :key="'r'+indxx">{{valx}}</md-table-cell>

        </md-table-row>



      </md-table>
     <div class="md-caption"> {{endOfData}}</div>
    </div>




    <md-progress-bar class="md-accent" v-if="loading" md-mode="indeterminate"></md-progress-bar>




    <!-- single record -->

    <md-drawer :md-right="xtrue" :md-fixed="xtrue" :md-active.sync="modalShow2">
      <div class="md-layout">
  
        <div class="md-layout-item" style="min-width=400px">

          <md-toolbar class="md-transparent" md-elevation="0">

            <div class="md-toolbar-section-start">
              <md-button class="md-icon-button md-dense" @click="setCurrentRecord(currentRecord-1)">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
            <span class="md-title">#{{currentRecord}}</span>
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="setCurrentRecord(currentRecord+1)">
                <md-icon>keyboard_arrow_right</md-icon>
              </md-button>
            </div>
          </md-toolbar>

          <md-table>

            <md-table-row v-for="(col,n) in columns" :key="'cc'+n"  @dblclick="setCurrentColumn(col)" >
              <md-table-cell>{{col.label}}
                 <div class="md-caption" v-if="col.label != col.name">[{{col.name.trim()}}] </div>
                 <div class="md-caption">[{{col.type.trim()}}] [{{col.precision}}]</div>  
              </md-table-cell>
              <!-- need to make a function ??? --> 
              <md-table-cell> {{rows[currentRecord][col.label].substring(0,50)}}</md-table-cell>
            </md-table-row>
          </md-table>

        </div>

              <div class="md-layout-item" v-if="modalShow3">
                          <md-toolbar class="md-transparent" md-elevation="0">

       
            <span class="md-title">{{currentCol.label}}</span>
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="modalShow3=false">
                <md-icon >close</md-icon>
              </md-button>
            </div>
          </md-toolbar>
          
          <codeeditor id="editor2" ref="editor2" v-model="editorValue2"   @init="editorInit" lang="xml"
            :options="editorOptions" theme="crimson_editor" width="600px" height="100%">
          </codeeditor>

        </div>
      </div>





    </md-drawer>

    <!-- end single record -->



  </div>

</template>
<script>
export default {
  components: {},

  created() {
    //alert("okk1");
    var vm = this;
    window.addEventListener("scroll", () => {
      //  alert("okk");
      console.log("> " + vm.bottomVisible());
      vm.bottom = vm.bottomVisible();
    });
  },
  computed: {
    //---------------------------------
    endOfData: function() {
      if (!this.hasMoreData) {
        return "End of Data.";
      }
      return "";
    },

    //---------------------------------
    editorValue2: {
      get: function() {
        if (this.currentCol.type.toUpperCase() == "XML") {
          return vkbeautify.xml(
            this.rows[this.currentRecord][this.currentCol.label]
          );
        }
        return this.rows[this.currentRecord][this.currentCol.label];
      },
      set: function(newValue) {}
    }
    //---------------------------------
  },
  watch: {
    bottom: function(bottom) {
      if (bottom && this.hasMoreData && this.sqlToRun.length > 0) {
        this.runSQL(this.sqlToRun, false);
      }
    }
  },

  methods: {
    setupListeners() {
      eventBus.$on("runsql", data => {
        //alert("okrrrrk");
        this.sqlToRun = data;
        this.requestIdToClose = this.requestIdToProcess;
        this.modalShow2 = false;
        this.modalShow3 = false;
        this.requestIdToProcess = "";
        this.hasMoreData = true;
        this.columns = [];
        this.rows = [];
        this.currentRecord = 0;
        if (this.sqlToRun.trim().length > 0) {
          this.runSQL(this.sqlToRun);
        }
      });
    },
    //-----------------------------------------------
    turnOffListeners() {
      eventBus.$off("runsql");
    },
    //----------------------------------------------
    editorInit: function() {
      require("vue2-ace-editor/node_modules/brace/ext/language_tools"); //language extension prerequsite...
      require("vue2-ace-editor/node_modules/brace/mode/xml");
      require("vue2-ace-editor/node_modules/brace/mode/json");

      require("vue2-ace-editor/node_modules/brace/theme/crimson_editor");
      require("vue2-ace-editor/node_modules/brace/snippets/javascript"); //snippet
    },
    //---------------------------------------------
    setCurrentRecord(val) {
      //alert(val);
      this.currentRecord = val;
      if (this.currentRecord <= 0) {
        this.currentRecord = 0;
      }
      if (this.currentRecord >= this.rows.length) {
        this.currentRecord = this.rows.length - 1;
      }
    },
    //---------------------------------------------
    setCurrentColumn(column) {
      this.modalShow3 = true;
      this.currentCol = column;
    },
    //---------------------------------------------
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight - 400;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
      // return this.bottom;
    },

    runSQL: function(sqltorun, newCall = true) {
      var vm = this;
      this.runWebService(
        "r/sql2",
        {
          serverId: vm.$session.get("currentserver"),
          sql: sqltorun,
          requestIdToProcess: vm.requestIdToProcess,
          requestIdToClose: vm.requestIdToClose
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
          vm.sqldata = responce.data.sqldata;
          if (responce.data.status == "s") {
            vm.columns = responce.data.sqldata.columns;
            console.log("vm.rows.length " + vm.rows.length);
            if (vm.rows.length > 0) {
              vm.rows = vm.rows.concat(responce.data.sqldata.data);
            } else {
              vm.rows = responce.data.sqldata.data;
            }
            if (responce.data.sqldata.data.length <= 0) {
              vm.hasMoreData = false;
            }

            vm.requestIdToProcess = responce.data.requestId;
          } else {
            vm.alertMessage = responce.data.sqldata.error;
            vm.hasMoreData = false;
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
  },

  data() {
    return {
      sqlToRun: "",
      rightMClass: ["modal", "right", "fade"],
      currentRecord: 0,
      xtrue: true,
      xfalse: false,
      modalShow2: false,
      modalShow3: false,
      sqldata: [],
      columns: [],
      rows: [],
      currentCol: {},
      nowrapclass: ["text-nowrap", "small"],
      nowrapclass2: ["text-nowrap", "table-primary", "whitespace", "small"],
      loading: false,
      animate: true,
      alertVariant: "danger",
      alertMessage: "",
      requestIdToProcess: "",
      requestIdToClose: "",
      bottom: false,
      hasMoreData: true,
      editorValue: "",
      editorOptions: {
        minLines: 2000,

        wrap: true,
        autoScrollEditorIntoView: true,
        showPrintMargin: false,

        fontSize: 14,
        showGutter: false,
        behavioursEnabled: true,
        wrapBehavioursEnabled: true,
        useSoftTabs: true,
        foldStyle: "markbeginend"
      }
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

.md-table {
  white-space: nowrap;
  overflow: visible;
}

.md-table .md-table-content {
  overflow: visible;
}
</style>
