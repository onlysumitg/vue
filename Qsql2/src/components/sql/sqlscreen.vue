<template>
  <div>
    <div class="no-gutter h-100 w-100 d-flex">
      <div class="col-4 main-screen">
        <md-drawer class="md-elevation-2" md-persistent="full" :md-active.sync="xtrue">
          <md-tabs md-elevation="1" :md-active-tab="tabIndex" @md-changed="tabUpdated">
            <md-tab md-label="SQL List" id="t0">
              <sqlscreenquerylist></sqlscreenquerylist>
            </md-tab>
            <md-tab v-if="isAdmin" md-label="Edit/Add SQL" id="t1">
              <sqlscreenedit :queryId="sqlEditId"></sqlscreenedit>
            </md-tab>
          </md-tabs>
        </md-drawer>
      </div>

      <div class="col-8 pt-3 overflowscroll">
        <sqlscreendata :queryId="sqlRunId"></sqlscreendata>
      </div>
    </div>
  </div>
</template>
<script>
import sqlscreenquerylist from "./sqlscreenquerylist";
import sqlscreendata from "./sqlscreendata";
import sqlscreenedit from "./sqlscreenedit";

import header01 from "@/components/headers/header01.vue";

export default {
  components: {
    sqlscreenquerylist,
    sqlscreenedit,
    sqlscreendata,
    header01
  },
  updated() {},
  mounted() {},
  beforeRouteLeave(to, from, next) {
    eventBus.$emit("beforeRouteLeave_save_sql", true);
    const answer = window.confirm("Do you really want to leave?");
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  data() {
    return {
      xtrue: true,
      sqlToRun: "",
      tabIndex: "t0",
      selectedSQL: "",
      reloadHistory: false,
      reloadSaved: false,
      tabIndexResult: "x",
      sqlEditId: 0,
      sqlRunId: 0
    };
  },
  //---------------------------
  methods: {
    setupListeners() {
      eventBus.$on("screensql_edit", data => {
        this.sqlEditId = data;
        this.tabIndex = "t1";
      });

      eventBus.$on("screensql_run", data => {
        this.sqlRunId = data;
      });
    },
    //-----------------------------------------------
    turnOffListeners() {
      eventBus.$off("screensql_edit");
      eventBus.$off("screensql_run");
    },
    //-----------------------------------------------
    tabUpdated: function(id) {
      this.tabIndex = id;
    }
  }
};
</script>

<style>
html {
  overflow: hidden !important;
}

table {
  outline: none;
}

table:focus {
  outline: none;
}
</style>

<style lang="scss" scoped>
.navbar-brand {
  color: #000;
}
.stickyHead {
  position: sticky;
  background-color: #cfe3fa;
  top: 0;
  z-index: 7;
}
.main-screen {
  width: 100vh;
  height: 95vw;
}

.md-tabs {
  margin-bottom: 24px;
}

.md-drawer {
  width: 100%;
}

div.fixed {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #cfe3fa;

  z-index: 9999;
}
</style>
