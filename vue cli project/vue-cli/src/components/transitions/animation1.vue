<template>
  <div id="app"> 
 {{msg}}
 <hr>
 <button @click  ="show=!show">Show Alert</button>

<hr>
<br>
<!--
    transition >> only one element should be visible in side the transition

    >> can have multiple children
    >>      but only one should be visible at a time based on 1 condition


    name="fade"  ==> VUE added 4 css classed with the name to style the fade
        >> name can be dynamic using :name="vueProName"

            ==> add to dom
                >>  fade-enter  ( 1frame only)
                >>  fade-enter-active
            => Remove from dom
                >>  fead-leave  ( 1frame only)
                >>  fade-leave-active

         >> if no name is given  >> "v" will be used as the name to add css classes
                >> v-enter
                >> v-enter-active etc

>>>> can tell Vue to use different classed for animation using different attributes
            >> remove the name
            >> and define what class to use when
            >> appear attribute dont work in this case (test???)
    <transition 
        enter-class="XYX"
        enter-active-class="animated bounce"
        leave-class="XYZ"
        leave-active-class="animated shake"
    >
>> CHECK animate.CSS website >> and its GIT   



    >> can mix transition with css animations
            >>   <transition name="fade" type=[animation | transition]>
                >> type defines which should get the priortiy in case of conflict         

    >> animat on load
            <transition name="fade" appear>
                    >> the appear attribute tell vue to animat the initial addition to dom for this element

                 
    -->
<transition name="fade">
    <div v-if="show" style="backgroundColor:red"> 
            <hr>
            This is somethine here
            <hr>
    </div>
</transition>       

   </div>
</template>


<script>
export default {
  name: "animation1",

  data() {
    return {
      msg: "ccc",
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
