<template>
  <div style="padding:10px">
    <div v-if="showError" class="alert alert-danger" role="alert">{{errorMessage}}</div>
    <div class="row">
      <div class="col-sm">
        <form novalidate class="md-layout">
          <md-field>
            <label>Table Name</label>
            <md-input required v-model="tableName"></md-input>
          </md-field>

          <md-field>
            <label>Library</label>
            <md-input required v-model="tableLib"></md-input>
          </md-field>

          <md-field>
            <label>Field/Column</label>
            <md-input required v-model="columneName"></md-input>
          </md-field>
          <md-field>
            <label>Text</label>
            <md-input required v-model="searchText"></md-input>
          </md-field>

          <md-button @click="emitSQLToRun2('ff')" class="md-primary">Search</md-button>
        </form>
      </div>
      <div class="col-sm">
        <form novalidate class="md-layout">
          <md-field>
            <label>Category</label>
            <md-input required v-model="category"></md-input>
          </md-field>

          <md-field>
            <label>Tags</label>
            <md-input required v-model="tags"></md-input>
          </md-field>

          <md-field>
            <label>Comment</label>
            <md-input required v-model="comments"></md-input>
          </md-field>
        </form>
      </div>
      <div class="col-sm"></div>
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
    //-------------------------------------
    searchDBDOC() {
      var vm = this;
      this.runWebService(
        "dd/setup",
        {
          id: vm.$session.get("currentserver")
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
