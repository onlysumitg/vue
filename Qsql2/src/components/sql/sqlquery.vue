<template>
  <div class style="height:calc(100vh - 100px)">
    <!-- <codeeditor
      id="editor"
      ref="editor"
      v-model="value"
      :value="value"
      @init="editorInit"
      lang="sql"
      :options="options"
      theme="crimson_editor"
      width="100%"
      height="100%"
    ></codeeditor>-->




    <v-tooltip right fixed>
      <template v-slot:activator="{ on }">

        <v-btn @click="emitSQLToRun3(false)" class="ma-2"      v-on="on"        icon>
          <v-icon>mdi-alpha-l-box-outline</v-icon>
        </v-btn>

      </template>
      <span>Run Current line</span>
    </v-tooltip>

    <v-tooltip right fixed>
      <template v-slot:activator="{ on }">
       <v-btn @click="emitSQLToRun3(true)" class="ma-2"    v-on="on"        icon>
          <v-icon>mdi-alpha-s-box-outline</v-icon>
        </v-btn>

      </template>
      <span>Run Selected</span>
    </v-tooltip>

    <v-tooltip right fixed>
      <template v-slot:activator="{ on }">

        <v-btn @click="emitSQLToRun4()" class="ma-2"    v-on="on"    icon>
          <v-icon color="blue">mdi-play-circle-outline</v-icon>
        </v-btn>
      </template>
      <span>Run> Can use F1 or ALT+R</span>
    </v-tooltip>


    <div id="sqleditor" style="width:100%;height:95%;border:1px solid #ccc"></div>


    <!-- show save query dialof -->
    <b-modal
      id="modalPrevent"
      ref="modal"
      title="Save Query"
      v-model="showSaveQueryDialog"
      @ok="saveQueryToDB"
      @shown="clearName"
    >
      <form @submit.stop.prevent="handleSubmit">
        {{modalErrorMessage}}
        <b-form-input type="text" placeholder="Title*" v-model="queryHeading"></b-form-input>
        <br />
        <b-form-input type="text" placeholder="Description*" v-model="queryDesc"></b-form-input>
      </form>
    </b-modal>

    <!--____________________________  save query  ___________________________ -->
    <!-- <md-dialog-prompt
      :md-active.sync="showSaveQueryDialog"
      v-model="queryHeading"
      md-title="Enter a Title"
      md-input-maxlength="100"
      md-input-placeholder="Title*"
      md-confirm-text="Done"
    />-->
  </div>
</template>
<script>
import * as monaco2 from "monaco-editor";
import ButtonRouter from "../headers/headerSpeedDial01";

export default {
    components: {ButtonRouter},
    props: {
    currentSQL: {
      type: String,
      required: false
    }
  },
  watch: {
    currentSQL(valx) {
      this.value = valx;
      var currentValue = this.monacoEditor.getModel().getValue();
      this.value = currentValue + " \n \n" + valx + " \n \n";
      this.monacoEditor.getModel().setValue(this.value);
    }
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
    setupListeners() {
      eventBus.$on("beforeRouteLeave_save_sql", data => {
        this.$session.set(
          "currentSavedSQL",
          this.monacoEditor.getModel().getValue()
        );
      });
    },
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

      var currentSQL = this.$session.get("currentSavedSQL");
      if (currentSQL === undefined) {
        currentSQL = "\n\n\n\n\n\n\n\n\n\n\n\n\n";
      }

      this.monacoEditor = monaco2.editor.create(
        document.getElementById("sqleditor"),
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

    okke: function() {
      //console.log(this.$refs.editor);
      // alert(this.$refs.editor.editor.getSelectedText());
    },
    saveQueryToDB(evt) {
      this.showSaveQueryDialog = false;

      this.modalErrorMessage = "";
      evt.preventDefault();
      if (
        this.queryHeading.trim().length == 0 ||
        this.queryDesc.trim().length == 0
      ) {
        this.modalErrorMessage = "Both Fields are required";
      } else {
        this.handleSubmit();
        eventBus.$emit("updateSavedSQL", true);
      }
    },

    //---------------------------------------
    handleSubmit() {
      var data = {
        id: 0,
        type: "S",
        heading: this.queryHeading,
        desc: this.queryDesc,
        sql: this.selectedSQL
      };

      this.runWebService(
        "r/savequery",
        data,
        function() {},
        function(response) {
          this.$emit("reloadQueryList", true);
          this.queryHeading = "";
          this.queryDesc = "";
        },
        function(error) {}
      );
    },
    //------------------------------------
    clearName() {},

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
      //---------------------------------------------------
      emitSQLToRun3(seletedOnly) {

          let sqlToRun =""
          if (seletedOnly) {

              sqlToRun = this.monacoEditor.getModel().getValueInRange(this.monacoEditor.getSelection())

          } else {

               sqlToRun =  this.monacoEditor.getModel().getLineContent(this.monacoEditor.getPosition().lineNumber)

          }
          this.emitSQLToRun2(sqlToRun)

      },
      //---------------------------------------------------
      emitSQLToRun4() {

          let sqlToRun =""


              sqlToRun = this.monacoEditor.getModel().getValueInRange(this.monacoEditor.getSelection())

          if(sqlToRun.trim().length==0) {

              sqlToRun =  this.monacoEditor.getModel().getLineContent(this.monacoEditor.getPosition().lineNumber)
          }

         this.emitSQLToRun2(sqlToRun)
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
      this.monacoEditor.addAction({
        id: "RunALLSQL",
        label: "Run All",
        keybindings: [
          monaco2.KeyMod.chord(monaco2.KeyMod.Alt | monaco2.KeyCode.KEY_A)
        ],
        precondition: null,
        keybindingContext: null,

        run: function(meditor) {
          // vm2.emitSQLToRun2();
          var value2 = meditor.getModel().getValue();
          //alert("ok " + value);
          //console.log(vm2.monacoEditor.tokenize(value, "sql"));
          vm2.emitSQLToRun2(value2);
          return null;
        }
      });

      //-----------------  RUN Current line
      this.monacoEditor.addAction({
        id: "RunCurrentLineSQL",
        label: "Run Current line",
        keybindings: [
          monaco2.KeyMod.chord(monaco2.KeyMod.Alt | monaco2.KeyCode.KEY_C)
        ],
        precondition: null,
        keybindingContext: null,

        run: function(meditor) {
          // vm2.emitSQLToRun2();
          var value = meditor
            .getModel()
            .getLineContent(meditor.getPosition().lineNumber);

          vm2.emitSQLToRun2(value);
          return null;
        }
      });
      //-----------------  SAVE
      this.monacoEditor.addAction({
        id: "saveSelectedSQL",
        label: "Save Selected",
        keybindings: [
          monaco2.KeyMod.chord(monaco2.KeyMod.Alt | monaco2.KeyCode.KEY_S)
        ],
        precondition: null,
        keybindingContext: null,

        run: function(meditor) {
          // vm2.emitSQLToRun2();
          vm2.selectedSQL = meditor
            .getModel()
            .getValueInRange(meditor.getSelection());
          //alert("ok " + value);
          //console.log(vm2.monacoEditor.tokenize(value, "sql"));
          vm2.modalErrorMessage = "";
          vm2.showSaveQueryDialog = true;
          return null;
        }
      });
    },
    //---------------------------------------------------

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
