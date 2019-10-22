<template>
  <div class style="min-height:900px; padding:20px">
    <div v-if="showError" class="alert alert-danger" role="alert">{{errorMessage}}</div>

    <div class="row">
      <form @submit="checkForm" class="md-layout">
        <div class="col-sm">
          <md-field>
            <label>Member</label>
            <md-input
              required
              v-model="memberName"
              oninvalid="this.setCustomValidity('Member Name is required')"
              oninput="setCustomValidity('')"
            ></md-input>
          </md-field>
          <md-field>
            <label>Member Type</label>
            <md-input
              required
              v-model="memberType"
              oninvalid="this.setCustomValidity('Member Type is required')"
              oninput="setCustomValidity('')"
            ></md-input>
          </md-field>
          <md-field>
            <label>Member Text</label>
            <md-input v-model="memberText"></md-input>
          </md-field>
        </div>
        <div class="col-sm">
          <md-field>
            <label>Source File</label>
            <md-input v-model="sourceFile"></md-input>
          </md-field>

          <md-field>
            <label>Source File Lib</label>
            <md-input v-model="sourceLib"></md-input>
          </md-field>
          <md-field>
            <label>IFS Directory</label>
            <md-input v-model="ifsPath"></md-input>
          </md-field>
        </div>
        <div class="col-sm">
          <div>
            <md-checkbox v-model="overrideSource" class="md-primary">Override original source</md-checkbox>
          </div>
          <br />
          <div>
            <md-button type="submit" class="md-primary">Create</md-button>
          </div>
        </div>
      </form>
    </div>

    <div class="row">
      <div class="col-sm">
        <div id="sqleditor" style="width:100%;min-height:1200px;height:90%"></div>
      </div>
    </div>

    <br />
    <br />

    <br />
    <hr />
  </div>
</template>
<script>
import * as monaco2 from "monaco-editor";

export default {
  props: {
    sourcelist: {
      type: Array,
      required: false
    }
  },
  watch: {
    sourcelist(valx) {
      //alert(valx);
      var x = "";
      for (x in valx) {
        this.monacoEditor.getModel().setValue(x);
      }
      //   this.value = valx;
      //   var currentValue = this.monacoEditor.getModel().getValue();
      //   this.value = currentValue + " \n \n" + valx + " \n \n";
      //   this.monacoEditor.getModel().setValue(this.value);
    }
  },
  //------------------------------------------------------------------------------------------
  data: function() {
    return {
      overrideSource: false,
      memberName: "",
      memberType: "",
      memberText: "",
      sourceFile: "",
      sourceLib: "",
      ifsPath: "",
      showError: false,
      errorMessage: "",

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
    checkForm(e) {
      e.preventDefault();
      alert("submitting");

      if (
        _.isEmpty(this.ifsPath) &&
        (_.isEmpty(this.sourceFile) && _.isEmpty(this.sourceLib))
      ) {
        // source file or IFS path is required
        alert("error");
        return false;
      }

      if (
        (!_.isEmpty(this.sourceFile) && _.isEmpty(this.sourceLib)) ||
        (_.isEmpty(this.sourceFile) && !_.isEmpty(this.sourceLib))
      ) {
        alert("error2");
        return false;
      }

      this.sourceCode = [];
      let model = this.monacoEditor.getModel();

      for (let i = 1; i <= model.getLineCount(); i++) {
        this.sourceCode[i - 1] = model.getLineContent(i);
        //alert("i" + i);
      }
      //console.log(this.sourceCode);

      this.writeSource();
    },

    //--------------------------------------------------------------------------
    //-------------------------------------

    writeSource: function() {
      this.showError = false;
      this.errorMessage = "";
      var vm = this;

      this.runWebService(
        "c/writesource",
        {
          serverId: vm.$session.get("currentserver"),
          requestIdToProcess: "",
          memberName: vm.memberName,
          memberType: vm.memberType,
          memberText: vm.memberText,
          sourceFile: vm.sourceFile,
          sourceLib: vm.sourceLib,
          ifsPath: vm.ifsPath,
          overrideSource: vm.overrideSource,
          sourceLines: vm.sourceCode
        },
        function() {
          //  vm.loading = true;

          vm.alertMessage = "";
        },
        function(responce) {
          //vm.loading = false;

          if (responce.data.status == "s" || responce.data.status == "S") {
            // vm.sourcelist = responce.data.tableStmt;
            // vm.showSaveQueryDialog = true;
          }
          if (responce.data.status == "e") {
            vm.showError = true;
            vm.errorMessage = "" + responce.data.message;
          }
        },
        function(error) {
          //vm.loading = false;
          vm.showError = true;
          vm.errorMessage = "" + error;
        }
      );
    },

    //--------------------------------------------------------------------------
    initialize() {
      var vm = this;
      // setTimeout(function() {
      //   monaco2.languages.registerCompletionItemProvider(
      //     "sql",
      //     vm.getSqlCompletionProvider(monaco2)
      //   );
      // }, 9000);

      this.monacoEditor = monaco2.editor.create(
        document.getElementById("sqleditor"),
        {
          value: "",
          language: "sql",
          automaticLayout: true,
          renderWhitespace: "all",

          wordWrap: "on",
          minimap: {
            enabled: false
          }
        }
      );

      this.monacoEditor.getModel().updateOptions({ insertSpaces: false });

      var vm = this;

      _.forEach(this.sourcelist, function(line) {
        var currentValue = vm.monacoEditor.getModel().getValue();
        var value = currentValue + "\n" + line;
        vm.monacoEditor.getModel().setValue(value);
      });

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

    //------------------------------------
    clearName() {}

    //---------------------------------------------------

    //---------------------------------------------------

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
