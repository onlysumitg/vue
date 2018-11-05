<template>
  <div id="app"> 
 {{msg}}
 <hr>
 <button @click  ="show=!show">Animate using JS HOOKS </button>

<hr>
<br>
 

<!--

js hooks ( can mix with CSS transition)
  1. before-enter   >> css = enter class
  2. enter  
  3.after-enter
  4. after-enter-calcelled

  >> same for "leave"
  

  :css="false"   >>> dont look or use css classes for this transition
-->
 
<transition  mode="out-in" 

        @before-enter="functionName1"
        :css="false"
         >


    <div v-if="show" style="backgroundColor:red" key="1"> 
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
  name: "animation3",

  data() {
    return {
      msg: "Animate using JS HOOKS(no CSS) [Animation3]",
      show: true
    };
  },

  methods: {
    functionName1() {}
  }
};
</script>


<style>
</style>
