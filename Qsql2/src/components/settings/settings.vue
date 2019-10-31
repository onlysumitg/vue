<template>
  <v-list>
    <v-list-tile avatar ripple router :to="{ name: 'serversettings'}">
      <v-list-tile-avatar>
        <v-icon left>mdi-server</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>Server Settings</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
    <!--  ==== --->
    <v-list-tile avatar ripple router :to="{ name: 'usersettings'}">
      <v-list-tile-avatar>
        <v-icon left>mdi-account-settings</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>User Settings</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>

    <!--  ==== --->
    <v-list-tile avatar ripple router :to="{ name: 'userAuths'}">
      <v-list-tile-avatar>
        <v-icon left>mdi-alpha-a</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>User Auths</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>

    <!--  ==== --->
    <v-list-tile avatar ripple router :to="{ name: 'userGroups'}">
      <v-list-tile-avatar>
        <v-icon left>mdi-account-group</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>User Groups</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>

    <!--  ==== --->
    <v-list-tile v-if="isAdmin" avatar ripple router :to="{ name: 'userlist'}">
      <v-list-tile-avatar>
        <v-icon left>mdi-account-multiple</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>Users List</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider v-if="isAdmin"></v-divider>

    <!--  ==== --->
    <v-list-tile v-if="isAdmin" avatar ripple router :to="{ name: 'usercreate'}">
      <v-list-tile-avatar>
        <v-icon left>mdi-account-plus</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>Add new user</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider v-if="isAdmin"></v-divider>

    <!--  ==== --->
    <v-list-tile avatar ripple router :to="{ name: 'libList'}">
      <v-list-tile-avatar>
        <v-icon left>mdi-alpha-l</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>Lib List</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
  </v-list>
</template>

<script>
export default {
  name: "system_settings",

  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  display: list-item;
}
.active {
  background-color: blue;
}
</style>
