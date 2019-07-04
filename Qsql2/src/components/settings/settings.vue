<template>
  <div>
    <ul class="list-group">
      <router-link
        class="list-group-item"
        :to="{ name: 'serversettings'}"
        tag="li"
        active-class="active"
        exact
      >Server Settings</router-link>
      <router-link
        class="list-group-item"
        :to="{ name: 'usersettings'}"
        tag="li"
        active-class="active"
        exact
      >User Settings</router-link>
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
