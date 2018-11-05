<template>
  <div id="app"> 
 {{msg}}
 <hr>
 <button @click  ="show=!show">Animate between elements</button>

<hr>
<br>
 

<!--

  all elements inside the transition should have unque key
    >> to switch between elements
    >> only work with v-if  ( no v-show )

    mode attribute:
        out-in
        in-out
-->
 
<transition name="fade" mode="out-in">
    <div v-if="show" style="backgroundColor:black" key="1"> 
            <hr>
            This is somethine here
            <hr>
    </div>

        <div v-else style="backgroundColor:blue" key="b"> 
            <hr>
            This is somethine new here
            <hr>
    </div>
</transition>       

   </div>
</template>


<script>
export default {
  name: "animation2",

  data() {
    return {
      msg: "Switch between elememts",
      show: true
    };
  }
};
</script>


<style>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}
</style>
