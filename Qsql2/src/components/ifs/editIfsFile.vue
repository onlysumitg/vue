<template>
  <div style="height:calc(100vh - 48px); background-color:black">
    <md-progress-bar v-if="loading" md-mode="indeterminate"></md-progress-bar>

    <div :id="editorid" style="height:calc(100vh - 55px) ; width:100%"></div>

    <md-drawer
      style="min-width:900px"
      md-right
      md-fixed
      v-if="showGmakeCommand"
      :md-active.sync="showGmakeCommand"
    >
      <gmake :filePath="getIFSPath()"></gmake>
    </md-drawer>

    <v-navigation-drawer width="600" v-if="menu" v-model="menu" right absolute dark temporary>
      <v-list subheader class="pa-2">
        <v-subheader>{{currentLoadedPath}}</v-subheader>
        <v-divider></v-divider>

        <v-list-tile v-if="sourceFile.trim().length==0">
          <v-flex flex>
            <v-text-field flex v-model="ifsPath" clearable placeholder="IFS Path"></v-text-field>
          </v-flex>
        </v-list-tile>

        <v-list-tile v-if="sourceFile.trim().length>=0">
          <v-flex flex>
            <v-text-field flex v-model="sourceFile" clearable placeholder="Source File"></v-text-field>
          </v-flex>
        </v-list-tile>

        <v-list-tile v-if="sourceFile.trim().length>=0">
          <v-flex flex>
            <v-text-field flex v-model="sourceLib" clearable placeholder="Library"></v-text-field>
          </v-flex>
        </v-list-tile>

        <v-list-tile v-if="sourceFile.trim().length>=0">
          <v-flex flex>
            <v-text-field flex v-model="sourceMember" clearable placeholder="Member name"></v-text-field>
          </v-flex>
        </v-list-tile>

        <v-list-tile v-if="sourceFile.trim().length>=0">
          <v-flex flex>
            <v-text-field flex v-model="sourceMemberType" clearable placeholder="Member type"></v-text-field>
          </v-flex>
        </v-list-tile>

        <v-list-tile v-if="sourceFile.trim().length>=0">
          <v-flex flex>
            <v-text-field flex v-model="sourceMemberText" clearable placeholder="Text"></v-text-field>
          </v-flex>
        </v-list-tile>
        <!---------------  asdas ------------------>
        <v-list-tile @click="loadIFSFile(); menu =!menu">
          <v-list-tile-content>
            <v-list-tile-title>LOAD</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon>chat_bubble</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <!---------------  asdas ------------------>
        <v-list-tile @click="showGmakeCommand =true; menu =!menu">
          <v-list-tile-content>
            <v-list-tile-title>gmake</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon>mdi-telegram</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <!---------------  asdas ------------------>

        <v-list-tile @click="writeSource()" @click.prevent="menu = !menu">
          <v-list-tile-content>
            <v-list-tile-title>Save [Check for override]</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-checkbox v-model="overrideSource"></v-checkbox>
          </v-list-tile-action>
        </v-list-tile>
        <!---------------  asdas ------------------>
      </v-list>
    </v-navigation-drawer>

    <!---------------  snack bar ------------------>

    <v-snackbar light v-model="showError" bottom :timeout="4000">
      {{ errorMessage }}
      <v-btn color="pink" flat @click="showError = false">Close</v-btn>
    </v-snackbar>
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
    },
    menu: function(valNew) {
      if (!valNew) {
        this.monacoEditor.focus();
      }
    },

    showGmakeCommand: function(valNew) {
      if (!valNew) {
        this.monacoEditor.focus();
      }
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
      menu: false,

      monacoEditor: "",
      monacoModel: "",
      value: "",
      originalModel2: {},
      onDidChangeContent: {},
      contentChanged: false,
      currentLoadedPath: "",

      editorid: "meditoreditifsfile_" + this._uid,

      sourceFile: "",
      sourceMember: "",
      sourceMemberType: "",
      sourceMemberText: "",
      sourceLib: "",
      options: {
        minLines: 500,

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

            vm.sourceFile = responce.data.sourceFile;
            vm.sourceMember = responce.data.sourceMember;
            vm.sourceMemberType = responce.data.sourceMemberType;
            vm.sourceMemberText = responce.data.sourceMemberText;
            vm.sourceLib = responce.data.sourceLib;

            vm.monacoEditor.getModel().setValue(responce.data.sourcelist);

            monacoX.editor.setModelLanguage(
              monacoX.editor.getModel(vm.originalModel2.uri),
              responce.data.filetype.trim()
            );

            var insertSpace = true;
            if (responce.data.filetype === "makefile") {
              insertSpace = false;
            }

            vm.monacoEditor
              .getModel(vm.originalModel2.uri)
              .updateOptions({ insertSpaces: insertSpace });

            vm.onContentLoad();
            vm.showError = true;
            vm.errorMessage = "Loaded";
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
          theme: "myRPGTheme",

          minimap: {
            enabled: false
          }
        }
      );

      //  this.monacoEditor.setModel(this.originalModel2);
      // this.monacoEditor
      //   .getModel(this.originalModel2.uri)
      //   .updateOptions({ insertSpaces: false });

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

      this.monacoEditor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
        function() {
          vm.writeSource();
        }
      );

      this.monacoEditor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_R,
        function() {
          vm.loadIFSFile();
        }
      );
      //-----------------  RUN Current line
      this.monacoEditor.addAction({
        id: "reload",
        label: "Load/Reload file",
        keybindings: [monacoX.KeyMod.Alt | monacoX.KeyCode.KEY_R],
        precondition: null,
        keybindingContext: null,

        run: function(meditor) {
          vm.loadIFSFile();
          return null;
        }
      });

      //-----------------  RUN Current line
      this.monacoEditor.addAction({
        id: "gmake",
        label: "gmake",
        keybindings: [monacoX.KeyMod.Alt | monacoX.KeyCode.KEY_G],
        precondition: null,
        keybindingContext: null,

        run: function(meditor) {
          vm.showGmakeCommand = true;
          return null;
        }
      });

      //-----------------  RUN Current line
      this.monacoEditor.addAction({
        id: "menu",
        label: "Show Menu",
        keybindings: [monacoX.KeyMod.Alt | monacoX.KeyCode.KEY_M],
        precondition: null,
        keybindingContext: null,

        run: function(meditor) {
          vm.menu = true;
          return null;
        }
      });
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
          memberName: vm.sourceMember,
          memberType: vm.sourceMemberType,
          memberText: vm.sourceMemberText,
          sourceFile: vm.sourceFile,
          sourceLib: vm.sourceLib,
          ifsPath: vm.ifsPath,
          overrideSource: vm.overrideSource,
          sourceLines: sourceCode,
          writeIFS: vm.sourceMember.trim().length <= 0
        },
        function() {
          vm.loading = true;

          vm.alertMessage = "";
        },
        function(responce) {
          if (responce.data.status == "s" || responce.data.status == "S") {
            vm.contentChanged = false;
            // vm.sourcelist = responce.data.tableStmt;
            // vm.showSaveQueryDialog = true;
            vm.showError = true;
            vm.errorMessage = "File saved";

            if (responce.data.ifsPath === undefined) {
            } else {
              if (responce.data.data.ifsPath.length > 0) {
                vm.ifsPath = responce.data.data.ifsPath;
              }
            }
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
html,
body {
  overflow: hidden;
}
</style>
