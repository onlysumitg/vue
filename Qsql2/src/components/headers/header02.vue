<template>
  <md-app-toolbar class="md-primary" md-elevation="0">
    <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
      <md-icon>menu</md-icon>
    </md-button>
    <md-button class="md-icon-button" @click="toggleMenu" v-if="menuVisible">
      <md-icon>keyboard_arrow_left</md-icon>
    </md-button>
    <span class="md-title">{{getConnectedServerName}}</span>
    <div class="md-toolbar-section-end">
      <md-button class="md-icon-button">
        <md-icon>refresh</md-icon>
      </md-button>
      <md-button class="md-icon-button" :to="{ name: 'settings'}">
        <md-icon>settings</md-icon>
      </md-button>
    </div>
  </md-app-toolbar>
</template>


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
</style>
