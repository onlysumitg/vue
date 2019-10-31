<template>
  <div class="page-container">
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
        <md-tabs md-elevation="1" :md-active-tab="tabIndex" @md-changed="tabUpdated">
          <md-tab md-label="SQL" id="t0">
            <sqlquery :currentSQL="selectedSQL"></sqlquery>
          </md-tab>
          <md-tab md-label="Saved SQL" id="t1">
            <querylist
              :reload="reloadSaved"
              @selectedquery="selectedSQL = $event; tabIndex = 't0' "
              qtype="S"
            ></querylist>
          </md-tab>
          <md-tab md-label="History" id="t2">
            <querylist
              :reload="reloadHistory"
              @selectedquery="selectedSQL = $event; tabIndex = 't0'"
              qtype="H"
            ></querylist>
          </md-tab>
        </md-tabs>
      </md-app-drawer>

      <md-app-content>
        <div class="overflowscroll height_70">
          <div class="flex">
            <router-view></router-view>
          </div>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
import sqlquery from "./sqlquery";
import querylist from "./querylist";
import header01 from "@/components/headers/header01.vue";
import menu01 from "@/components/headers/menu01.vue";

// import results from "./results";
// import results2 from "./results2";
// import libList from "./../servers/joblibl";
//import settings from "./../settings/settings";
export default {
  components: {
    sqlquery,
    querylist,
    // results,
    // results2,
    // libList
    //settings,
    header01,
    menu01
  },
  updated() {
    // this.tabIndex = 2;
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    this.beforeChangeRoute(to, from, next, "beforeRouteLeave_save_sql", true);
  },
  data() {
    return {
      xtrue: true,
      sqlToRun: "",
      tabIndex: "t0",
      selectedSQL: "",
      reloadHistory: false,
      reloadSaved: false,
      tabIndexResult: "x"
    };
  },
  //---------------------------
  methods: {
    setupListeners() {
      eventBus.$on("updateHistorySQL", data => {
        this.reloadHistory = data;
      });

      eventBus.$on("updateSavedSQL", data => {
        this.reloadSaved = data;
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
      eventBus.$off("updateHistorySQL");
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
.v-btn:hover {
  text-decoration: none;
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

.navbar-brand {
  color: #000;
}

.md-drawer {
  width: 230px;
  max-width: 500px;
  overflow-x: hidden;
  overflow-y: hidden;
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
