<template>
  <div style="padding:10px;width: 100vw;height: 100vh" class="overflowscroll">
    <div v-if="showError" class="alert alert-danger" role="alert">{{errorMessage}}</div>
    <div class="row">
      <div class="col-sm">
        <form novalidate class="md-layout">
          <md-field>
            <label>SP Name</label>
            <md-input v-model="spName"></md-input>
          </md-field>

          <md-field>
            <label>Library</label>
            <md-input v-model="spLib"></md-input>
          </md-field>

          <md-field>
            <label>Specific Name</label>
            <md-input v-model="specificName"></md-input>
          </md-field>
        </form>
      </div>
      <div class="col-sm">
        <form novalidate class="md-layout">
          <md-field>
            <label>Parameter</label>
            <md-input v-model="spParm"></md-input>
          </md-field>
          <md-field>
            <label>External Name</label>
            <md-input v-model="externalName"></md-input>
          </md-field>

          <md-field>
            <label>Language</label>
            <md-input v-model="externalLang"></md-input>
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
  name: "spdoc",
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
        "@spdoc " +
        this.spName.toString() +
        " / " +
        this.specificName.toString() +
        " / " +
        this.spLib.toString() +
        " / " +
        this.spParm.toString() +
        " / " +
        this.externalName.toString() +
        " / " +
        this.externalLang.toString() +
        " / " +
        this.category.toString() +
        " / " +
        this.tags.toString() +
        " / " +
        this.comments.toString();

      eventBus.$emit("runsql3", sqldata3);
    },
    //---------------------------------------------
    clear() {
      this.spName = "";
      this.specificName = "";
      this.spLib = "";
      this.spParm = "";
      this.externalName = "";
      this.externalLang = "";
      this.category = "";
      this.tags = "";
      this.comments = "";
    },
    //-------------------------------------
    searchDBDOC() {
      var vm = this;
      this.runWebService(
        "dd/setup_sp",
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
      searchText: "",
      showError: false,
      errorMessage: "",
      spName: "",
      specificName: "",
      spLib: "",
      spParm: "",
      externalName: "",
      externalLang: "",
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
