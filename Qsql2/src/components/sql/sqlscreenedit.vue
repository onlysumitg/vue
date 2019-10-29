<template>
  <div class style="height:calc(100vh - 100px); overflow-y:scroll;overflow-x: hidden;">
    <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>

    <md-toolbar v-if="queryId>0" class="md-transparent" md-elevation="0">
      <div style="width: 80%;">
        <h5>{{queryId}}. {{queryHeading}}</h5>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button md-dense" @click="loadQuery(queryId)">
          <md-icon>refresh</md-icon>
        </md-button>
      </div>
    </md-toolbar>

    <md-field>
      <label>Name</label>
      <md-input v-model="queryHeading"></md-input>
    </md-field>
    <md-field>
      <label>Description</label>
      <md-input v-model="queryDesc"></md-input>
    </md-field>

    <table
      v-if="groups.length>0"
      class="i-table table table-striped table-bordered table-sm table-hover"
    >
      <thead>
        <tr>
          <th>Group</th>
          <th>Assigned</th>
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
              <input type="text" class="form-control" v-model="group.currentValue" />
            </div>
            <div v-else>
              <select class="form-control" v-model="group.currentValue">
                <option v-for="(xVal,indx) in group.validValues" :key="indx" :value="xVal">{{xVal}}</option>
              </select>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div id="sqlscreeneditor" style="width:100%;height:80%;border:1px solid #ccc"></div>
    <br />
    <div class="row">
      <div class="col-3">
        <button
          v-if="queryId>0"
          @click="deleteSQL()"
          type="button"
          class="btn btn-outline-danger"
        >Delete</button>
      </div>

      <div class="col-3">
        <button @click="saveQueryToDB(true)" type="button" class="btn btn-success">Add new</button>
      </div>
      <div class="col-3">
        <button
          v-if="queryId>0"
          @click="saveQueryToDB(false)"
          type="button"
          class="btn btn-primary"
        >Update</button>
      </div>
    </div>
    <md-progress-bar class="md-accent" v-if="xloading" md-mode="indeterminate"></md-progress-bar>

    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import * as monaco2 from "monaco-editor";

export default {
  props: {
    queryId: {
      type: Number,
      required: false,
      default: -1
    }
  },
  watch: {
    currentSQL(valx) {
      this.value = valx;
      var currentValue = this.monacoEditor.getModel().getValue();
      this.value = valx;
      this.monacoEditor.getModel().setValue(this.value);
    },

    queryId(valx) {
      if (valx > 0) {
        this.currentSQL = "";
        this.loadQuery(valx);
      }
    }
  },

  mounted() {
    this.loadQuery(-1);
  },
  //------------------------------------------------------------------------------------------
  data: function() {
    return {
      selectedSQL: "",
      monacoEditor: "",
      value: "",
      queryHeading: "",
      queryDesc: "",
      showSaveQueryDialog: false,
      modalErrorMessage: "",
      autoComData: [],
      groups: {},
      currentSQL: "",
      options: {
        minLines: 500,
        wrap: true,
        autoScrollEditorIntoView: false,
        showPrintMargin: false,
        fontSize: 14,
        showGutter: true,
        enableBasicAutocompletion: true
      }
    };
  },
  //------------------------------------------------------------------------------------------
  methods: {
    setupListeners() {},
    //-----------------------------------------------
    turnOffListeners() {
      eventBus.$off("beforeRouteLeave_save_sql");
    },
    //--------------------------------
    initialize() {
      var vm = this;
      // setTimeout(function() {
      //   monaco2.languages.registerCompletionItemProvider(
      //     "sql",
      //     vm.getSqlCompletionProvider(monaco2)
      //   );
      // }, 9000);

      var currentSQL = "";
      this.monacoEditor = monaco2.editor.create(
        document.getElementById("sqlscreeneditor"),
        {
          value: currentSQL,
          language: "sql",
          automaticLayout: true,
          wordWrap: "on",
          theme: "vs",
          minimap: {
            enabled: false
          }
        }
      );

      this.monaocEditorInit();

      //console.log(x1);
    },

    //--------------------------------------------------------
    getSqlCompletionProvider(monaco2) {
      var vm2 = this;

      return {
        provideCompletionItems: function(model, position) {
          //console.log(model);
          //console.log(model.getValue());

          return new Promise(function(resolve, reject) {
            // console.log(vm2.autoComData.length);
            if (vm2.autoComData.length > 0) {
              return resolve({
                suggestions: vm2.autoComData,

                isIncomplete: false
              });
            }

            vm2.runWebService(
              "r/autoc",
              { serverId: vm2.$session.get("currentserver") },
              function() {},
              function(respons) {
                //console.log(respons);
                if (respons.data.status == "s" || respons.data.status == "S") {
                  // console.log(respons.data);
                  vm2.autoComData = respons.data.data.data;
                  resolve({
                    suggestions: respons.data.data.data,

                    isIncomplete: false
                  });
                }
              },
              function(error) {
                reject({ suggestions: [], isIncomplete: false });
              }
            );
          });

          let value = model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          });

          // console.log(position)
          var sqlxom = {
            incomplete: true,
            suggestions: [
              {
                label: '"SELECT"',
                kind: monaco.languages.CompletionItemKind.Keyword,
                detail: "SQL Select",
                documentation: "SQL Select statement.",
                insertText: "SELECT * FROM"
              },

              {
                label: '"CALL"',
                kind: monaco.languages.CompletionItemKind.Keyword,
                detail: "SQL Call SP",
                documentation: "SQL CALL statement.",
                insertText: "CALL "
              },
              {
                label: '"UPDATE"',
                kind: monaco.languages.CompletionItemKind.Keyword,
                detail: "SQL Update",
                documentation: "SQL UPDATE statement.",
                insertText: "UPDATE "
              },

              {
                label: '"DELETE"',
                kind: monaco.languages.CompletionItemKind.Keyword,
                detail: "SQL DELETE ",
                documentation: "SQL DELETE statement.",
                insertText: "DELETE FROM "
              },

              {
                label: '"@MULTI"',
                kind: monaco.languages.CompletionItemKind.Keyword,
                detail: "MULTIPLE SQL",
                documentation: "Run multiple SQL Queries",
                insertText: "@MULTI "
              },
              {
                label: '"@S"',
                kind: monaco.languages.CompletionItemKind.Keyword,
                detail: "SQL Select with Edit",
                documentation: "SQL Select statement with Edit option.",
                insertText: "@S "
              }
            ]
          };

          return sqlxom;
        }
      };
    },

    saveQueryToDB(newQuery) {
      //alert(this.monacoEditor.getModel().getValue());
      this.value = this.monacoEditor.getModel().getValue();
      this.showSaveQueryDialog = false;

      this.modalErrorMessage = "";
      //evt.preventDefault();
      if (
        this.queryHeading.trim().length == 0 ||
        this.queryDesc.trim().length == 0
      ) {
        this.modalErrorMessage = "Both Fields are required";
      } else {
        this.handleSubmit(newQuery);
      }
    },
    //---------------------------------------
    handleSubmit(newQuery) {
      var queryId = this.queryId;

      if (newQuery) {
        queryId = -1;
      }

      var data = {
        queryId: queryId,

        name: this.queryHeading,
        desc: this.queryDesc,
        sql: this.value,
        status: "A",
        groups: this.groups
      };

      this.runWebService(
        "ss/save",
        data,
        function() {},
        function(response) {
          if (respons.data.status == "s" || respons.data.status == "S") {
            vm.$notify({
              type: "success",
              title: "Done"
            });
          } else {
            vm.$notify({
              type: "danger",
              title: respons.data.message
            });
          }
        },
        function(error) {}
      );
    },
    //---------------------------------------
    loadQuery(valcc) {
      var data = {
        queryId: valcc
      };

      var vm = this;

      this.runWebService(
        "ss/loadone",
        data,
        function() {},
        function(response) {
          if (response.data.status == "S") {
            vm.queryHeading = response.data.data.screensql.name;
            vm.queryDesc = response.data.data.screensql.desc;
            vm.groups = response.data.data.screensql.groups;
            vm.currentSQL = response.data.data.screensql.query;
            //vm.groups = respons.data.groups;
          } else {
            vm.$notify({
              type: "danger",
              title: respons.data.message
            });
          }
        },
        function(error) {}
      );
    },

    //---------------------------------------
    deleteSQL() {
      var data = {
        queryId: this.queryId
      };

      var vm = this;

      this.runWebService(
        "ss/delete",
        data,
        function() {},
        function(response) {
          if (respons.data.status == "s" || respons.data.status == "S") {
            vm.$notify({
              type: "success",
              title: "Done"
            });
          } else {
            vm.$notify({
              type: "danger",
              title: respons.data.message
            });
          }
        },
        function(error) {}
      );
    },
    //------------------------------------
    clearName() {},
    //---------------------------------------------------
    emitSQLToRun(seletedOnly) {
      //alert("ok");
      eventBus.$emit("beforeRouteLeave_save_sql", true);

      var sqldata3 = {};
      sqldata3.serverId = this.$session.get("currentserver");
      sqldata3.requestIdToProcess = "";
      sqldata3.requestIdToClose = "";

      if (seletedOnly) {
        eventBus.$emit("runsql", this.$refs.editor.editor.getSelectedText());

        sqldata3.sqlsqlToRun = this.$refs.editor.editor.getSelectedText();
      } else {
        eventBus.$emit("runsql", this.value);
        sqldata3.sqlsqlToRun = this.value;
      }
      eventBus.$emit("runsql3", sqldata3);
    },
    //---------------------------------------------------
    emitSQLToRun2(sqltoRun) {
      //alert("ok");
      eventBus.$emit("beforeRouteLeave_save_sql", true);

      var sqldata3 = {};

      sqldata3.serverId = this.$session.get("currentserver");
      sqldata3.requestIdToProcess = "";
      sqldata3.requestIdToClose = "";

      eventBus.$emit("runsql", sqltoRun);

      sqldata3.sqlsqlToRun = sqltoRun;

      eventBus.$emit("runsql3", sqldata3);
    },
    //-----------------------------------------run selected----------
    monaocEditorInit: function() {
      var vm2 = this;
      this.monacoEditor.addAction({
        id: "RunSeletedSQL",
        label: "Run Selected",
        keybindings: [
          monaco2.KeyCode.F1,
          monaco2.KeyMod.Alt | monaco2.KeyCode.KEY_R
        ],
        precondition: null,
        keybindingContext: null,

        run: function(meditor) {
          var value = meditor
            .getModel()
            .getValueInRange(meditor.getSelection());
          // alert("ok " + value);
          //  console.log(vm2.monacoEditor.tokenize(value, "sql"));

          // alert(value);

          if (value.trim().length <= 0) {
            value = meditor
              .getModel()
              .getLineContent(meditor.getPosition().lineNumber);
          }
          vm2.emitSQLToRun2(value);
          return null;
        }
      });

      //-----------------  RUN ALLL
    },
    //---------------------------------------------------
    editorInit: function() {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/sql");

      require("brace/theme/crimson_editor");
      require("brace/snippets/javascript"); //snippet
    }
  }
};
</script>

<style>
.btnc {
  position: sticky;
  top: 0;
  margin: 5px;
}
</style>
