<template>
  <md-app>
    <md-app-toolbar class="md-primary" md-elevation="0">
      <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="toggleMenu" v-if="menuVisible">
        <md-icon>keyboard_arrow_left</md-icon>
      </md-button>
      <span class="md-title">{{getConnectedServerName()}}</span>

      <menu01></menu01>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
      <md-app-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Search</span>
      </md-app-toolbar>
      <div
        v-if="showError"
        style="height:70px"
        class="alert alert-danger"
        role="alert"
      >{{errorMessage}}</div>

      <div class="overflowscrollyonly height_70" style=" padding:10px">
        <div class="row">
          <div class="col-sm">
            <div style="padding:4px">
              <v-text-field color="blue" hide-details v-model="tableName" label="Table Name"></v-text-field>
            </div>
            <div style="padding:4px">
              <v-text-field color="blue" hide-details v-model="tableLib" label="Library"></v-text-field>
            </div>
            <div style="padding:4px">
              <v-text-field color="blue" hide-details v-model="columneName" label="Field/Column"></v-text-field>
            </div>
            <div style="padding:4px">
              <v-text-field color="blue" hide-details v-model="searchText" label="Text"></v-text-field>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <div style="padding:4px">
              <v-text-field color="blue" hide-details v-model="category" label="Category"></v-text-field>
            </div>

            <div style="padding:4px">
              <v-text-field color="blue" hide-details v-model="tags" label="Tags"></v-text-field>
            </div>

            <div style="padding:4px">
              <v-text-field color="blue" hide-details v-model="comments" label="Comment"></v-text-field>
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-sm">
            <v-btn color="blue-gray" @click="clear()">
              Clear
              <v-icon right dark>mdi-delete-outline</v-icon>
            </v-btn>
          </div>
          <div class="col-sm">
            <v-btn color="blue" @click="emitSQLToRun2('ff')">
              Search
              <v-icon right dark>mdi-magnify</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </md-app-drawer>

    <md-app-content>
      <div class="overflowscroll height_70">
        <div class="flex">
          <router-view></router-view>
        </div>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
import menu01 from "@/components/headers/menu01.vue";

export default {
  name: "dbdoc",
  components: {
    menu01
  },
  beforeRouteLeave(to, from, next) {
    this.beforeChangeRoute(to, from, next);
  },
  methods: {
    initialize() {
      this.searchDBDOC();
    },
    loadScreen() {},
    setupListeners() {
      eventBus.$on("hideleftsidemenu", data => {
        if (data) {
          this.menuVisible = false;
        } else {
          this.menuVisible = true;
        }
      });
    },
    //-----------------------------------------------
    turnOffListeners() {
      eventBus.$off("hideleftsidemenu");
    },
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
          // console.log(respons);
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
.md-app {
  min-height: 100vh;
}

.md-toolbar {
  min-height: 70px;
  max-height: 70px;
}

.md-app-content {
  padding: 0;
}

.md-drawer {
  width: 400px;
  max-width: 500px;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
