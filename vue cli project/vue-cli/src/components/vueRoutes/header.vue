<template>
  <div>
    <ol>
      <!--
                user <router-link> in place of <a>
                    <a>send request to server

                   <router-link> >> take care of all required listeners to manage routes     
                        >> by default router-link are converted to <a>
                            >> can use "tag attribute" to change this
      -->

      <!-- <li><router-link to="/" >Home</router-link></li>
      <li><router-link to="/user" >User</router-link></li>-->

      <!-- with tag -->

      <!--  

    to apply the active class
    >> by default Vue check with route start with the give "to" attrbute
    >>   so when we select '/user' 
                >> this is also start with '/' >> which is valid for "home" to
                >> so both Home and User will get the active-calss

                >> change this behaviour using "exact attribute"
      -->
      <router-link to="/" tag="li" active-class="active" exact>Home</router-link>

      <router-link to="/user2" tag="li" active-class="active">User2</router-link>
      <router-link to="/user/10" tag="li" active-class="active">User 10</router-link>
      <router-link to="/user/20" tag="li" active-class="active">User 20</router-link>
    </ol>
  </div>
</template>
<style scoped>
.active {
  background-color: blueviolet;
}

li {
  display: list-item;
}
</style>
