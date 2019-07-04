<template>
  <div class="overflowscroll" style="min-width:900px">
    <v-card>
      <v-sheet class="pa-3 primary lighten-2">
        <v-text-field
          v-model="ifsPath"
          label="File Path"
          light
          flat
          solo-inverted
          hide-details
          loading-text="hold on"
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
        <br>
        <div class="row">
          <div class="col-4">
            <form class="form-inline" v-on:submit.prevent="onSubmit">
              <label class="sr-only" for="inlineFormInputName2">Name</label>
              <input
                type="text"
                class="form-control"
                id="inlineFormInputName2"
                placeholder=" option/target (s)"
                v-model="gmakeOptions"
              >
              <button type="submit" @click="runCmdOptions" class="btn btn-primary ml-4">RUN</button>
            </form>
          </div>

          <div class="col-4">
            <form class="form-inline" v-on:submit.prevent="onSubmit">
              <label class="sr-only" for="inlineFormInputName2">Name</label>
              <input
                type="text"
                class="form-control"
                id="inlineFormInputName2"
                placeholder="Sup options"
              >
              <button type="button" @click="runCmdOptions" class="btn btn-primary ml-4">Send</button>
            </form>
          </div>
        </div>
      </v-sheet>
      <div v-if="showError" class="alert alert-danger" role="alert">{{errorMessage}}</div>

      <md-progress-bar class="md-accent" v-if="loading" md-mode="indeterminate"></md-progress-bar>
      <br>
    </v-card>

    <hr>

    <div class="row">
      <div class="col-8">
        <div
          style="white-space: pre; padding:10px;font-family: monospace"
          v-html="shellOutput"
          v-chat-scroll
        ></div>
      </div>
      <div class="col-4">
        <v-card>
          <md-list>
            <md-list-item
              @click="gmakeOptions=cmd;runCmdOptions()"
              v-for="(cmd,index) in historyCmds"
              :key="index"
            >
              <a>{{cmd}}</a>
            </md-list-item>
          </md-list>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    filePath: {
      type: String,
      required: false
    }
  },
  watch: {
    filePath(valx) {
      this.ifsPath = valx;
      this.runCmd();
    }
  },
  //------------------------------------------------------------------------------------------
  data: function() {
    return {
      gmakeOptions: "",
      historyCmds: [
        "git status",
        "git add .",
        "git pull",
        "git push",
        "gmake",
        "gmake clean"
      ],

      ifsPath: "/",
      showError: false,
      errorMessage: "",

      value: "",
      loading: false,
      requestIdToProcess: "",
      continueCmd: "",
      shellOutput: ""
    };
  },
  //------------------------------------------------------------------------------------------
  methods: {
    //--------------------------------------------------------------------------
    onSubmit: function(e) {
      e.preventDefault();
    },

    //-------------------------------------
    runCmdOptions: function() {
      this.requestIdToProcess = "";
      this.continueCmd = "";
      this.shellOutput = "";
      this.runCmd(this.gmakeOptions);
    },
    //-------------------------------------

    runCmd: function(options) {
      if (_.isEmpty(this.ifsPath)) {
        this.showError = true;
        this.errorMessage = "Invalid Path";
        return;
      }
      this.showError = false;
      this.errorMessage = "";
      var vm = this;
      vm.loading = true;
      if (options.trim().length > 0) {
        _.remove(vm.historyCmds, function(n) {
          //  alert(n + " : " + options + " :: " + (n.trim() === options.trim()));
          return n.trim() === options.trim();
        });

        //console.log(vm.historyCmds);

        vm.historyCmds.unshift(options.trim());
      }
      this.runWebService(
        "ssh/run",
        {
          serverId: vm.$session.get("currentserver"),
          requestIdToProcess: vm.requestIdToProcess,
          continueCmd: vm.continueCmd,
          path: vm.ifsPath,
          command: options
        },
        function() {
          //  vm.loading = true;

          vm.alertMessage = "";
        },
        function(responce) {
          if (responce.data.status == "s") {
            // vm.sourcelist = responce.data.tableStmt;
            // vm.showSaveQueryDialog = true;
            vm.requestIdToProcess = responce.data.requestIdToProcess;
            vm.continueCmd = responce.data.continueCmd;

            vm.shellOutput = vm.shellOutput + responce.data.commandoutput;

            const regex = /(On branch )([^<]*?)$/gm;
            const subst = "$1<span style='color:red'>$2</span>";
            vm.shellOutput = vm.shellOutput.replace(regex, subst);

            const regex2 = /(Your branch is up-to-date with )([^<]*?)$/gm;
            const subst2 = "$1<span style='color:blue'>$2</span>";
            vm.shellOutput = vm.shellOutput.replace(regex2, subst2);

            if (vm.requestIdToProcess.trim().length > 0) {
              setTimeout(function() {
                vm.runCmd("");
              }, 50);
            } else {
              vm.loading = false;
            }
          }
          if (responce.data.status == "e") {
            vm.showError = true;
            vm.errorMessage = "" + responce.data.message;
            vm.loading = false;
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
    initialize() {},

    //--------------------------------------------------------
    runCntrlC: function(options) {
      this.showError = false;
      this.errorMessage = "";
      var vm = this;

      this.runWebService(
        "ssh/cntrlc",
        {
          serverId: vm.$session.get("currentserver")
        },
        function() {
          //  vm.loading = true;

          vm.alertMessage = "";
        },
        function(responce) {
          if (responce.data.status == "s") {
          }
          if (responce.data.status == "e") {
            vm.showError = true;
            vm.errorMessage = "" + responce.data.message;
            vm.loading = false;
          }
        },
        function(error) {
          vm.loading = false;
          vm.showError = true;
          vm.errorMessage = "" + error;
        }
      );
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
