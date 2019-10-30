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
        <span class="md-title">Settings</span>
      </md-app-toolbar>
      <settings></settings>
    </md-app-drawer>

    <md-app-content>
      <div class="overflowscroll" style="height:calc(100vh - 70px)">
        <div class="flex">
          <router-view></router-view>
        </div>
      </div>
    </md-app-content>
  </md-app>
</template>
<script>
import menu01 from "@/components/headers/menu01.vue";
import settings from "./settings";
export default {
  components: {
    settings,
    menu01
  },
  updated() {
    // this.tabIndex = 2;
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    this.beforeChangeRoute(to, from, next);
  },
  data() {
    return {
      xtrue: true
    };
  },
  //---------------------------
  methods: {}
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

.md-drawer {
  width: 400px;
  max-width: 500px;
  overflow-x: hidden;
  overflow-y: hidden;
}
.navbar-brand {
  color: #000;
}

.main-screen {
  width: 100vh;
  height: 95vw;
}

.md-tabs {
  margin-bottom: 24px;
}

div.fixed {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #cfe3fa;

  z-index: 9999;
}
</style>
