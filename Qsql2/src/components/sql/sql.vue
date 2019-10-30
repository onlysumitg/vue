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
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" :to="{ name: 'servers'}">
            <v-icon>mdi-server</v-icon>
          </md-button>
          <md-button class="md-icon-button" :to="{ name: 'settings'}">
            <v-icon>mdi-settings</v-icon>
          </md-button>

          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn dark icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-menu>

          <md-button class="md-icon-button" :to="{ name: 'loginentry'}">
            <v-icon color="orange">mdi-power</v-icon>
          </md-button>
        </div>
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
        <div class="overflowscroll" style="height:calc(100vh - 70px)">
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
    header01
  },
  updated() {
    // this.tabIndex = 2;
  },
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
      menuVisible: true,
      sqlToRun: "",
      tabIndex: "t0",
      selectedSQL: "",
      reloadHistory: false,
      reloadSaved: false,
      tabIndexResult: "x",
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ]
    };
  },
  //---------------------------
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    setupListeners() {
      eventBus.$on("updateHistorySQL", data => {
        this.reloadHistory = data;
      });

      eventBus.$on("updateSavedSQL", data => {
        this.reloadSaved = data;
      });
    },
    //-----------------------------------------------
    turnOffListeners() {
      eventBus.$off("updateHistorySQL");
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
