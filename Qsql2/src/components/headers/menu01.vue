<template>
  <div class="md-toolbar-section-end">
    <md-button class="md-icon-button" :to="{ name: 'servers'}">
      <v-icon color="white">mdi-server</v-icon>
    </md-button>
    <md-button class="md-icon-button" :to="{ name: 'settings'}">
      <v-icon color="white">mdi-settings</v-icon>
    </md-button>
    <md-menu md-size="auto" md-direction="bottom-end">
      <md-button class="md-icon-button" md-menu-trigger>
        <v-icon dark>mdi-dots-vertical</v-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item>
          <div>
            {{getCurrentUserName()}}
            <hr />
          </div>
        </md-menu-item>

        <md-menu-item>
          <v-btn flat :to="{ name: 'basesql'}">
            <v-icon>mdi-database</v-icon>&nbsp SQL
          </v-btn>
        </md-menu-item>
        <md-menu-item>
          <v-btn flat :to="{ name: 'sqlscreensqlind'}">
            <v-icon>mdi-laptop</v-icon>&nbsp SQL Screen
          </v-btn>
        </md-menu-item>

        <md-menu-item>
          <v-btn flat :to="{ name: 'dbdocbaseind'}">
            <v-icon>mdi-database-search</v-icon>&nbsp DB Doc
          </v-btn>
        </md-menu-item>
        <md-menu-item>
          <v-btn flat :to="{ name: 'spdocbaseind'}">
            <v-icon>mdi-alpha-p-box-outline</v-icon>&nbsp SP Doc
          </v-btn>
        </md-menu-item>
        <md-menu-item>
          <v-btn flat :to="{ name: 'dirtree'}">
            <v-icon>mdi-file-multiple</v-icon>&nbsp IFS
          </v-btn>
        </md-menu-item>
        <md-menu-item>
          <v-btn flat :to="{ name: 'createtablei'}">
            <v-icon>mdi-table-edit</v-icon>&nbsp Create Table
          </v-btn>
        </md-menu-item>
        <md-menu-item>
          <v-btn flat :to="{ name: 'servers'}">
            <v-icon>mdi-server</v-icon>&nbsp Servers
          </v-btn>
        </md-menu-item>
        <md-menu-item>
          <v-btn flat :to="{ name: 'settings'}">
            <v-icon>mdi-settings</v-icon>&nbsp Settings
          </v-btn>
        </md-menu-item>

        <md-menu-item>
          <v-btn flat :to="{ name: 'loginentry'}">
            <v-icon color="red">mdi-power</v-icon>
            <span class="red--text">&nbsp Signoff</span>
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
