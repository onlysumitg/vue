<template>
  <div style="padding:10px">
    <ul class="list-group">
      <!--  ==== --->
      <router-link
        class="list-group-item"
        :to="{ name: 'serversettings'}"
        tag="li"
        active-class="active"
        exact
      >Server Settings</router-link>
      <!--  ==== --->
      <router-link
        class="list-group-item"
        :to="{ name: 'usersettings'}"
        tag="li"
        active-class="active"
        exact
      >User Settings</router-link>
      <!--  ==== --->
      <router-link
        class="list-group-item"
        :to="{ name: 'userAuths'}"
        tag="li"
        active-class="active"
        exact
      >User Auths</router-link>
      <!--  ==== --->
      <router-link
        class="list-group-item"
        :to="{ name: 'userGroups'}"
        tag="li"
        active-class="active"
        exact
      >User Groups</router-link>
      <!--  ==== --->
      <router-link
        v-if="isAdmin"
        class="list-group-item"
        :to="{ name: 'userlist'}"
        tag="li"
        active-class="active"
        exact
      >User List</router-link>
      <!--  ==== --->
      <router-link
        v-if="isAdmin"
        class="list-group-item"
        :to="{ name: 'usercreate'}"
        tag="li"
        active-class="active"
        exact
      >Add new user</router-link>
      <!--  ==== --->
      <router-link
        class="list-group-item"
        :to="{ name: 'libList'}"
        tag="li"
        active-class="active"
        exact
      >Lib List</router-link>
    </ul>
  </div>
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
