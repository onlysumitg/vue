<template>
<div>
    <div class="right">
        <h3> FORM </h3>
<form>

<!-- ==================================== -->    
     <h5>Input fields</h5>
    <input type="text" id="xemail" placeholder="email" v-model.trim="userData.email"><br/><br/>
    <input type="password" id="xpassword" placeholder="passowrd" v-model="userData.password"><br/><br/>
    <input type="text" id="xage" placeholder="age" v-model.lazy.number="userData.age"><br/><br/>

<!-- ==================================== -->                                                 <!-- v-model.lazy ==> update the vue property on blur -->
    <hr>
    <h5>Text area</h5>
    <textarea id="xmessage" v-model="message"></textarea>

<!-- ==================================== -->
      <hr>
      <h5>Check boxes</h5>
      <lable for="chkbox1">
          <input type="checkbox" id="chekbox1" value="checkBox1" v-model="checkBoxes"> Check Box 1 
      </lable>
<lable for="chkbox2">
          <input type="checkbox" id="chekbox2" value="checkBox2"  v-model="checkBoxes"> Check Box 2
      </lable>


<!-- ==================================== -->
          <hr>
      <h5>Radio buttons</h5>

      <lable for="radio1">
          <input type="radio" id="radio1" value="Radio11" v-model="radioButtonData"> Radio 11
      </lable>
<lable for="radio2">
          <input type="radio" id="radio2" value="Radio12"  v-model="radioButtonData"> Radio 12 
      </lable>


<!-- ==================================== -->

          <hr>
      <h5>Select Box</h5>
        <select id="selectbox" v-model="selectedValue">
            <option v-for="(selection,i) in selectionList" :value="selection" :key="i">{{selection}}</option>
        </select>

<!-- ==================================== -->

          <hr>
      <h5>Custom Input</h5>
      <myCustomInput v-model="mySwitch"></myCustomInput>

<!-- ==================================== -->

          <hr>
      <h5>Custom Input</h5>
      <button @click.prevent="submitted">Submit</button>

</form>
</div>
     
    <div class="left">
        <h3> DATA </h3>
        <p>email [Trimmed] : {{userData.email}}</p>
        <p>password : {{userData.password}}</p>
        <p>age [its lazy]: {{userData.age}}</p>
        <hr>
        <p style="white-space:pre">message : {{message}}</p>
          <hr>
          <p> {{checkBoxes}}</p>
          <hr>
          <p>{{radioButtonData}}</p>


          <hr>
          <p>{{selectedValue}}</p>
          <hr>

          <p>{{mySwitch}}</p>
    </div>
    </div>
</template>
<script> 
 
 import myCustomInput from "./myCustomInput.vue"

export default {
    components:{
        myCustomInput
    },
   data(){
       return{
           userData:{
               email:"",
               password:"",
               age:""
           },
           email:"",
           message:" the defult message",
           checkBoxes:['checkBox2'],
           radioButtonData:"Radio11",
           selectionList:["value1","value2","value3"],
           selectedValue:"value2",
           mySwitch: true
       }
   },
   methods:{
       submitted(){
           // do whatever we need to do on submit form
           alert("okk")
       }
   }

}
</script>
 
 <style scoped>
 .right
 {
     display: inline-block;
     width: 40%;
     border: 1px solid saddlebrown ;
     padding: 10px;
 }

  .left
 {
     display: inline-block;
     width: 40%;
     border: 1px solid rebeccapurple;
     padding: 10px;
 }
 </style>
 

