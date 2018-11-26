<template>
  <div class="" style="height:600px">

    <div class="btnc">
      <button @click="emitSQLToRun(true)" class="btn mr-2">Run Selected</button>
      <button @click="emitSQLToRun(false)" class="btn">Run All</button>
    </div>


    <codeeditor id="editor" ref="editor" v-model="value" :value="value" @init="editorInit" lang="sql" :options="options"
      theme="crimson_editor" width="100%" height="100%">
    </codeeditor>

    <!-- show save query dialof -->
    <b-modal id="modalPrevent" ref="modal" title="Save Query" v-model="modalShow" @ok="saveQueryToDB" @shown="clearName">
      <form @submit.stop.prevent="handleSubmit">
        {{modalErrorMessage}}
        <b-form-input type="text" placeholder="Title*" v-model="queryHeading"></b-form-input>
        <br>
        <b-form-input type="text" placeholder="Description*" v-model="queryDesc"></b-form-input>
      </form>
    </b-modal>

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
      modalShow: false,
      modalErrorMessage: "",
      options: {
        minLines: 200,
        wrap: true,
        autoScrollEditorIntoView: false,
        showPrintMargin: false,
        fontSize: 14,
        showGutter: true
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
      this.modalErrorMessage = "";
      evt.preventDefault();
      if (
        this.queryHeading.trim().length == 0 ||
        this.queryDesc.trim().length == 0
      ) {
        this.modalErrorMessage = "Both Fields are required";
      } else {
        this.handleSubmit();
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
      if (seletedOnly) {
        eventBus.$emit("runsql", this.$refs.editor.editor.getSelectedText());
      } else {
        eventBus.$emit("runsql", this.value);
      }
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
          vm2.modalShow = true;
        }
      });
    }
  }
};
</script>

<style>
.btnc {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: #555;
  color: white;
  font-size: 16px;
  padding: 12px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  z-index: 999;
}
</style>
