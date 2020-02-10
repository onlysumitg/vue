<template>
  <md-app>
    <md-app-toolbar class="md-primary" md-elevation="0">
      <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="toggleMenu" v-if="menuVisible">
        <md-icon>keyboard_arrow_left</md-icon>
      </md-button>

      <menu00></menu00>
      <menu01></menu01>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
      <md-tabs md-elevation="1" :md-active-tab="tabIndex" @md-changed="tabUpdated">
        <md-tab md-label="SQL List" id="t0">
          <sqlscreenquerylist></sqlscreenquerylist>
        </md-tab>
        <md-tab  md-label="Edit/Add SQL" id="t1">
          <sqlscreenedit :queryId="sqlEditId"></sqlscreenedit>
        </md-tab>
      </md-tabs>
    </md-app-drawer>

    <md-app-content>
      <div class="overflowscroll height_70">
        <div class="flex">
          <sqlscreendata :queryId="sqlRunId"></sqlscreendata>
        </div>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
import sqlscreenquerylist from "./sqlscreenquerylist";
import sqlscreendata from "./sqlscreendata";
import sqlscreenedit from "./sqlscreenedit";

import menu01 from "@/components/headers/menu01.vue";
import menu00 from "@/components/headers/menu00.vue";
export default {
  components: {
    sqlscreenquerylist,
    sqlscreenedit,
    sqlscreendata,
    menu01,
      menu00
  },
  updated() {},
  mounted() {},
  beforeRouteLeave(to, from, next) {
    this.beforeChangeRoute(to, from, next);
  },

  name: "PersistentMini",
  data: () => ({
    xtrue: true,
    sqlToRun: "",
    tabIndex: "t0",
    selectedSQL: "",
    reloadHistory: false,
    reloadSaved: false,
    tabIndexResult: "x",
    sqlEditId: 0,
    sqlRunId: 0
  }),
  methods: {
    setupListeners() {
      eventBus.$on("screensql_edit", data => {
        this.sqlEditId = data;
        this.tabIndex = "t1";
      });

      eventBus.$on("screensql_run", data => {
        this.sqlRunId = data;
      });
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
      eventBus.$off("screensql_edit");
      eventBus.$off("screensql_run");
      eventBus.$off("hideleftsidemenu");
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
// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: 500px;
  overflow-x: hidden;
  overflow-y: hidden;
}

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
