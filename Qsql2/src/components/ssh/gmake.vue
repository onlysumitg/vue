<template>
  <div class style="min-width:900px">
    <v-card>
      <v-sheet class="pa-3 lighten-2" dark>
        <v-text-field
          v-model="ifsPath"
          label="File Path"
          dark
          flat
          solo-inverted
          hide-details
          loading-text="hold on"
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
        <br>
        <div class>
          <form class="form-inline" v-on:submit.prevent="onSubmit">
            <button @click="runGmakeCmd()" type="button" class="btn btn-primary m-2">gmake</button>
            <button @click="runGmakeCmd('-B')" type="button" class="btn btn-info m-2">gmake -B</button>

            <button type="button" @click="runGmakeCmdOptions" class="btn btn-primary ml-4">gmake</button>
            <label class="sr-only" for="inlineFormInputName2">Name</label>
            <input
              type="text"
              class="form-control mt-2 mb-2 mr-sm-2"
              id="inlineFormInputName2"
              placeholder=" option/target (s)"
              v-model="gmakeOptions"
            >
          </form>
        </div>
      </v-sheet>
      <div v-if="showError" class="alert alert-danger" role="alert">{{errorMessage}}</div>
      <md-progress-bar class="md-accent" v-if="loading" md-mode="indeterminate"></md-progress-bar>
      <br>
    </v-card>
    <v-card>
      <div :id="editorid" style></div>
    </v-card>
  </div>
</template>
<script>
import * as monaco2 from "monaco-editor";

export default {
  props: {
    filePath: {
      type: String,
      required: true
    }
  },
  watch: {
    filePath: function(valx) {
      if (valx.trim().length > 0) {
        //alert("get it " + valx);
        this.ifsPath = valx;
        this.runGmakeCmd();
      }
    }
  },
  //------------------------------------------------------------------------------------------
  data: function() {
    return {
      editorid: "sqleditorgmake_" + this._uid,
      overrideSource: false,
      showIFSEditor: true,
      gmakeOptions: "",
      tempIFSPath: this.filePath,
      ifsPath: "",
      showError: false,
      errorMessage: "",

      monacoEditor: "",
      value: "",
      loading: false,

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
    //--------------------------------------------------------------------------
    onSubmit: function(e) {
      e.preventDefault();
    },

    //-------------------------------------
    runGmakeCmdOptions: function() {
      this.runGmakeCmd(this.gmakeOptions);
    },
    //-------------------------------------

    runGmakeCmd: function(options) {
      if (_.isEmpty(this.ifsPath)) {
        this.showError = true;
        this.errorMessage = "Invalid Path";
        return;
      }
      this.showError = false;
      this.errorMessage = "";
      var vm = this;
      vm.loading = true;

      this.runWebService(
        "ssh/gmake",
        {
          serverId: vm.$session.get("currentserver"),
          requestIdToProcess: "",
          path: vm.ifsPath,
          options: options
        },
        function() {
          //  vm.loading = true;

          vm.alertMessage = "";
        },
        function(responce) {
          vm.monacoEditor.getModel().setValue("");
          if (responce.data.status == "s") {
            // vm.sourcelist = responce.data.tableStmt;
            // vm.showSaveQueryDialog = true;

            vm.monacoEditor.getModel().setValue(responce.data.commandoutput);

            const contentHeight =
              vm.monacoEditor.getModel().getLineCount() * 19 + 190;

            vm.monacoEditor.layout({ height: contentHeight });
            // _.forEach(responce.data.commandoutput, function(commands, key) {
            //   _.forEach(commands, function(line, key2) {
            //     var currentValue = vm.monacoEditor.getModel().getValue();
            //     var value = "";

            //     value = currentValue + "\n" + line;

            //     vm.monacoEditor.getModel().setValue(value);
            //   });
            // });
          }
          if (responce.data.status == "e") {
            vm.showError = true;
            vm.errorMessage = "" + responce.data.message;
          }
          vm.loading = false;
        },
        function(error) {
          vm.loading = false;
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
        document.getElementById("" + vm.editorid),
        {
          value: "",
          language: "shell",
          automaticLayout: true,
          renderWhitespace: "all",
          readOnly: true,
          theme: "vs-dark",
          wordWrap: "on",
          minimap: {
            enabled: false
          }
        }
      );

      this.monacoEditor.getModel().updateOptions({ insertSpaces: false });

      //console.log(x1);
    },

    //--------------------------------------------------------

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
