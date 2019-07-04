<template>
  <div style="height:100vh;  border: 1px solid blue">
    <div :id="editorid" style="min-height:200px;"></div>
    <md-drawer style="min-width:900px" md-right md-fixed :md-active.sync="showGmakeCommand">
      <gmake :filePath="getIFSPath()"></gmake>
    </md-drawer>
    <br>
    <br>

    <br>
    <hr>
  </div>
</template>
<script>
import gmake from "../ssh/gmake.vue";

export default {
  components: {
    gmake
  },
  props: {
    filePath: {
      type: String,
      required: false,
      default: "nanana"
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      // alert("this.filePath + " + this._uid);
      if (this.filePath.trim().length > 0) {
        this.tempFilePath = this.filePath;
        this.ifsPath = this.filePath;
        //this.loadIFSFile();
      }
    });
  },
  watch: {
    tempFilePath: function(valx) {
      // alert("got the file path");
      this.ifsPath = valx;
      this.loadIFSFile();
    }
  },
  //------------------------------------------------------------------------------------------
  data: function() {
    return {
      lastLineNumber: 1,
      overrideSource: false,
      showIFSEditor: true,
      loading: false,
      command: "",
      tempFilePath: this.filePath,
      ifsPath: "",
      showGmakeCommand: false,
      actualFilePath: "",
      showError: false,
      errorMessage: "",
      minDocHeight: 1000,

      monacoEditor: "",
      monacoModel: "",
      value: "",
      originalModel2: {},
      onDidChangeContent: {},
      contentChanged: false,
      currentLoadedPath: "",

      editorid: "meditoreditifsfile_" + this._uid,

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

    getIFSPath() {
      if (!this.showGmakeCommand) {
        return "";
      }
      //  alert("getting path" + this.ifsPath);
      return this.ifsPath;
    },
    //-------------------------------------

    loadIFSFile: function() {
      if (_.isEmpty(this.ifsPath)) {
        this.showError = true;
        this.errorMessage = "Invalid Path";
        return;
      }
      this.contentChanged = false;
      try {
        this.onDidChangeContent.dispose();
      } catch (e) {}

      this.showError = false;
      this.errorMessage = "";
      this.command = "";
      var vm = this;
      this.currentLoadedPath = vm.ifsPath.trim();
      this.runWebService(
        "ifs/loadfile",
        {
          serverId: vm.$session.get("currentserver"),
          requestIdToProcess: "",
          path: vm.ifsPath.trim()
        },
        function() {
          vm.loading = true;

          vm.alertMessage = "";
        },
        function(responce) {
          vm.loading = false;

          if (responce.data.status == "s") {
            vm.command = responce.data.command;
            // vm.sourcelist = responce.data.tableStmt;
            // vm.showSaveQueryDialog = true;
            // _.forEach(responce.data.sourcelist, function(line, key) {
            //   var currentValue = vm.monacoEditor.getModel().getValue();
            //   var value = "";
            //   if (key > 0) {
            //     value = currentValue + "\n" + line;
            //   } else {
            //     value = line;
            //   }
            //   vm.monacoEditor.getModel().setValue(value);
            // });

            vm.monacoEditor.getModel().setValue(responce.data.sourcelist);

            monacoX.editor.setModelLanguage(
              monacoX.editor.getModel(vm.originalModel2.uri),
              responce.data.filetype.trim()
            );

            const contentHeight =
              vm.monacoEditor.getModel(vm.originalModel2.uri).getLineCount() *
                19 +
              190;

            alert(contentHeight);
            if (contentHeight > vm.minDocHeight) {
              vm.minDocHeight = contentHeight + 200;
            }
            // vm.monacoEditor.layout({ height: contentHeight });
            vm.onContentLoad();
          }
          if (responce.data.status == "e") {
            vm.showError = true;
            vm.errorMessage = "" + responce.data.message;
          }
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
      //   monaco3.languages.registerCompletionItemProvider(
      //     "sql",
      //     vm.getSqlCompletionProvider(monaco3)
      //   );
      // }, 9000);

      // alert(this.ifsPath);

      this.loadRPGEditor(monacoX);

      this.originalModel2 = monacoX.editor.createModel("", "sql");
      var vm = this;
      console.log(this.originalModel2);
      console.log(this.originalModel2.uri.toString());
      this.monacoEditor = monacoX.editor.create(
        document.getElementById(vm.editorid),
        {
          value: "",
          language: "sql",
          automaticLayout: true,
          renderWhitespace: "all",
          model: vm.originalModel2,
          theme: "vs",

          wordWrap: "on",
          minimap: {
            enabled: false
          }
        }
      );

      //  this.monacoEditor.setModel(this.originalModel2);
      this.monacoEditor
        .getModel(this.originalModel2.uri)
        .updateOptions({ insertSpaces: false });

      this.contentChanged = false;
      try {
        this.onDidChangeContent.dispose();
      } catch (e) {}

      this.monacoEditor.onDidChangeCursorPosition(function(e) {
        console.log("--------------------------");
        console.log(e.position);
        // if (e.source == "keyboard") {
        //   var lineMove = 1;
        //   if (e.position.lineNumber < vm.lastLineNumber) {
        //     lineMove = -1;
        //   }

        //   window.scrollBy(0, (e.position.lineNumber + 10) * lineMove);
        //   vm.lastLineNumber = e.position.lineNumber;
        // }
        // vm.monacoEditor.revealPositionInCenterIfOutsideViewport(
        //   e.position,
        //   monacoX.editor.ScrollType.Smooth
        // );
        //if (e.position.lineNumber + 10)

        console.log("--------------------------");
      });

      this.monacoEditor.onDidLayoutChange(function(e) {
        console.log(
          "-----------onDidLayoutChange---------------" + vm.editorid
        );
        console.log(e);
        console.log("------------onDidLayoutChange end--------------");
      });
      //console.log(x1);
    },

    //--------------------------------------------------------

    //------------------------------------
    onContentLoad() {
      var vm = this;
      this.onDidChangeContent = this.monacoEditor
        .getModel(this.originalModel2.uri)
        .onDidChangeContent(event => {
          vm.contentChanged = true;
        });
    },
    //--------------------------------------
    scrollWin() {
      window.scrollBy(0, 20);
    },
    //---------------------------------------------------
    writeSource: function() {
      this.showError = false;
      this.errorMessage = "";
      var vm = this;

      var sourceCode = [];
      let model = this.monacoEditor.getModel();

      for (let i = 1; i <= model.getLineCount(); i++) {
        sourceCode[i - 1] = model.getLineContent(i);
        //alert("i" + i);
      }
      //c

      this.runWebService(
        "c/writesource",
        {
          serverId: vm.$session.get("currentserver"),
          requestIdToProcess: "",
          memberName: "",
          memberType: "",
          memberText: "",
          sourceFile: "",
          sourceLib: "",
          ifsPath: vm.ifsPath,
          overrideSource: vm.overrideSource,
          sourceLines: sourceCode
        },
        function() {
          vm.loading = true;

          vm.alertMessage = "";
        },
        function(responce) {
          if (responce.data.status == "s") {
            vm.contentChanged = false;
            // vm.sourcelist = responce.data.tableStmt;
            // vm.showSaveQueryDialog = true;
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
    }
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

<style scoped>
.editorcontainer {
  background-color: rgb(28, 32, 34);
  height: calc(100% - 35px);
}
</style>
