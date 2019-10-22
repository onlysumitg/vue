<template>
  <div style="padding:10px; width: 100vw;height: 100vh" class="overflowscroll">
    <div v-if="showError" class="alert alert-danger" role="alert">{{errorMessage}}</div>
    <div class="row">
      <div class="col-sm">
        <form novalidate class="md-layout">
          <md-field>
            <label>Table Name</label>
            <md-input v-model="tableName"></md-input>
          </md-field>

          <md-field>
            <label>Library</label>
            <md-input v-model="tableLib"></md-input>
          </md-field>

          <md-field>
            <label>Field/Column</label>
            <md-input v-model="columneName"></md-input>
          </md-field>
          <md-field>
            <label>Text</label>
            <md-input v-model="searchText"></md-input>
          </md-field>
        </form>
      </div>
      <div class="col-sm">
        <form novalidate class="md-layout">
          <md-field>
            <label>Category</label>
            <md-input v-model="category"></md-input>
          </md-field>

          <md-field>
            <label>Tags</label>
            <md-input v-model="tags"></md-input>
          </md-field>

          <md-field>
            <label>Comment</label>
            <md-input v-model="comments"></md-input>
          </md-field>
        </form>
      </div>
      <div class="col-sm">
        <br />
        <button @click="clear()" type="button" class="btn btn-secondary btn-lg btn-block">Clear</button>
        <hr />
        <button
          @click="emitSQLToRun2('ff')"
          type="button"
          class="btn btn-primary btn-lg btn-block"
        >Search</button>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dbdoc",
  components: {},
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("Do you really want to leave?");
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  methods: {
    initialize() {
      this.searchDBDOC();
    },
    loadScreen() {},

    //-------------------------------------
    //---------------------------------------------------
    emitSQLToRun2(sqltoRun) {
      //alert("ok");
      if (this.showError) {
        return false;
      }

      var sqldata3 = {};
      sqldata3.serverId = this.$session.get("currentserver");
      sqldata3.requestIdToProcess = "";
      sqldata3.requestIdToClose = "";

      sqldata3.sqlsqlToRun =
        "@dbdoc " +
        this.tableLib.toString() +
        " / " +
        this.tableName.toString() +
        " / " +
        this.columneName.toString() +
        " / " +
        this.searchText.toString() +
        " / " +
        this.category.toString() +
        " / " +
        this.tags.toString() +
        " / " +
        this.comments.toString();

      eventBus.$emit("runsql3", sqldata3);
    },
    //----------------------------
    clear() {
      this.tableName = "";
      this.tableLib = "";
      this.columneName = "";
      this.searchText = "";

      this.category = "";
      this.tags = "";
      this.comments = "";
    },
    //-------------------------------------
    searchDBDOC() {
      var vm = this;
      this.runWebService(
        "dd/setup",
        {
          serverId: vm.$session.get("currentserver")
        },

        function() {
          vm.processing = true;
        },
        function(respons) {
          console.log(respons);
          vm.processing = false;
          if (respons.data.status == "e") {
            vm.showError = true;
            vm.errorMessage = respons.data.message;
            // vm.settings = respons.data.settings;
          }
        },
        function(error) {
          vm.showError = true;
          vm.errorMessage = "" + error;
        }
      );
    }
    //--------------------------------------
  },
  data() {
    return {
      tableName: "",
      tableLib: "",
      columneName: "",
      searchText: "",
      showError: false,
      errorMessage: "",
      category: "",
      tags: "",
      comments: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.IZ-select {
  min-width: 150px;
}
</style>
