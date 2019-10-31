<template>
  <md-app>
    <md-app-toolbar class="md-primary" md-elevation="0">
      <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="toggleMenu" v-if="menuVisible">
        <md-icon>keyboard_arrow_left</md-icon>
      </md-button>
      <span class="md-title">QSQL</span>

      <menu02></menu02>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
      <md-app-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Servers</span>
      </md-app-toolbar>

      <div class="overflowscrollyonly height_70">
        <serverlist @selectedserver="selectedServer = $event"></serverlist>
      </div>
    </md-app-drawer>

    <md-app-content>
      <div class="overflowscrollyonly height_70">
        <div class="row">
          <div class="col-sm">
            <br />
            <serveredit :selectedServer="selectedServer"></serveredit>
          </div>
          <div class="col-sm">
            <serverlibl :selectedServer="selectedServer"></serverlibl>
          </div>
        </div>
      </div>
    </md-app-content>
  </md-app>
</template>
<script>
import serverlist from "./serverlist";
import serveredit from "./serveredit";
import serverlibl from "./serverlibl";
import menu02 from "@/components/headers/menu02.vue";

export default {
  components: {
    serverlist,
    serveredit,
    serverlibl,
    menu02
  },

  watch: {
    selectedServer: {
      handler: function(after, before) {
        if (before.id == 0 && after.id > 0) {
          //alert("assign")
        } else {
          // alert("okkcc")

          after.modified = true;
        }
      },
      deep: true
    }
  },

  data: function() {
    return {
      selectedServer: {
        id: 0,
        serverName: "",
        serverIP: "",
        userName: "",
        password: "",
        ssl: false,
        libl: new Array(20),
        modified: false
      }
    };
  }
};
</script>
<style>
.fill {
  min-height: 100%;
  height: 100%;
}

.allowscroll {
  overflow-y: scroll;
}
</style>
<style scoped>
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