<template>
  <div class style="height:600px">
    <div class="btnc">
      <md-button @click="emitSQLToRun(true)" class="md-primary md-raised">Run Selected</md-button>
      <md-button @click="emitSQLToRun(false)" class="md-primary md-raised">Run All</md-button>
    </div>

    <codeeditor
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
    ></codeeditor>

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
        <br>
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
export default {
  props: {
    currentSQL: {
      type: String,
      required: false
    }
  },
  watch: {
    currentSQL(valx) {
      this.value = valx;
    }
  },
  //------------------------------------------------------------------------------------------
  data: function() {
    return {
      value: "",
      queryHeading: "",
      queryDesc: "",
      showSaveQueryDialog: false,
      modalErrorMessage: "",
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
    okke: function() {
      console.log(this.$refs.editor);
      alert(this.$refs.editor.editor.getSelectedText());
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
        sql: this.$refs.editor.editor.getSelectedText()
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

    emitSQLToRun(seletedOnly) {
      //alert("ok");
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
    editorInit: function() {
      require("vue2-ace-editor/node_modules/brace/ext/language_tools"); //language extension prerequsite...
      require("vue2-ace-editor/node_modules/brace/mode/sql");

      require("vue2-ace-editor/node_modules/brace/theme/crimson_editor");
      require("vue2-ace-editor/node_modules/brace/snippets/javascript"); //snippet

      var vm2 = this;
      this.$refs.editor.editor.commands.addCommand({
        name: "runSelected",
        bindKey: {
          win: "Alt-R",
          mac: "Command-R"
        },
        exec: function(editor) {
          vm2.emitSQLToRun(true);
        }
      });

      this.$refs.editor.editor.commands.addCommand({
        name: "runAll",
        bindKey: {
          win: "Alt-A",
          mac: "Command-A"
        },
        exec: function(editor) {
          vm2.emitSQLToRun(false);
        }
      });

      this.$refs.editor.editor.commands.addCommand({
        name: "save",
        bindKey: {
          win: "Alt-S",
          mac: "Command-S"
        },
        exec: function(editor) {
          vm2.modalErrorMessage = "";
          vm2.showSaveQueryDialog = true;
        }
      });
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
