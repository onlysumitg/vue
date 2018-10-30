<template>
<div>
<h1> In built Directives </h1> 
    <p v-text="'this is text'"></p>
    <p v-html="'<strong> this is html in strong</strong>'"></p>
<hr>
    <h1>custom directive [GLOBAL]</h1>
    <p v-mydirective> hello this is a custom directive to add background color</p>

<!-- value given to directive using ="red" is value of binding parameter of life cycle hook 

    not just the string >> we can pass an object too
    >> check local directive
-->
        <p v-mydirective2 = "'red'"> hello this is a custom directive with parameter to add background color</p>

<!-- with agrument  v-on:click =""  >> :click is the argument -->

        <p v-mydirective3:textcolor = "'red'"> hello this is a custom directive with parameter to add background color</p>

<!-- with modifiers  v-model.lazy >> .lazy is the modifier

>>.delayed >> let say want to change after 3 sec
 -->

        <p v-mydirective4:textcolor.delayed = "'red'"> Wait 3 seconds to change the color</p>


<hr>
<h1>custom directive [LOCAL]</h1>
 <p v-local-directive> Font size is changed to 20px</p>

 <p v-local-directive2 ="{color:'red' , size:'30px'}"> Font size and color as parameter</p>

    </div>
</template>
<script> 
 
export default {
  
  directives:{
      'local-directive':{
          bind(el,binding,vnode){
              el.style.fontSize = "20px";
          }
      },

      'local-directive2':{
          bind(el,binding,vnode){
              el.style.fontSize = binding.value.size;
               el.style.color = binding.value.color;
          }
      }      
  }

}
</script>
 

