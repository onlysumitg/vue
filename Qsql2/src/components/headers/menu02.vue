<template>
  <div class="md-toolbar-section-end">
    <md-button class="md-icon-button" :to="{ name: 'settings'}">
      <v-icon color="white">mdi-settings</v-icon>
    </md-button>
    <md-menu md-size="auto" md-direction="bottom-end">
      <md-button class="md-icon-button" md-menu-trigger>
        <v-icon dark>mdi-dots-vertical</v-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item>
          <v-btn flat :to="{ name: 'settings'}">
            <v-icon>mdi-settings</v-icon>&nbsp Settings
          </v-btn>
        </md-menu-item>

        <md-menu-item>
          <v-btn flat :to="{ name: 'loginentry'}">
            <v-icon color="red">mdi-power</v-icon>
            <span class="red--text"> &nbsp Signoff</span>
          </v-btn>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>


<style lang="scss" scoped>
.md-menu-content {
  max-height: 85vh;
}

.v-btn:hover {
  text-decoration: none;
}

a.v-btn--active {
  pointer-events: none;
  cursor: default;
  color: gray;
  background: none;
}
</style>
