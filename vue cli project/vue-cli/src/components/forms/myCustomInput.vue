<template>
<div>
 <!-- this is custom form input switch -->
  <!--  <div id="on"
        @click="isOn = true"
        :class="{active : isOn}"> On</div>
    
    <div id="off"
        @click="isOn = false"
        :class="{active : !isOn}"> Off</div>
    </div> -->

        <div id="on"
        @click="switched( true)"
        :class="{active : value}">On</div> 
    
    <div id="off"
        @click="switched(false)"
        :class="{active : !value}">Off</div>
    </div>
</template>
<script> 
 
export default {
    props: ['value'],
    data(){
        return {
            isOn:true
        }
    },
    methods:{
        switched(val){
                this.$emit('input',val)
               // this.value= val
        }
    }

}
</script>
 <style scoped>
 #on,#off{
     width:40px;
    
     background-color: lightgray;
     padding: 2px;
     display: inline-block;
     margin: 10px -2px;
     box-sizing: content-box;
     cursor: pointer;
     text-align: center
 }
 
 #on:hover,#on.active{
     background-color: lightgreen
 }

  #off:hover,#off.active{
     background-color: lightcoral
 }
 </style>
 

