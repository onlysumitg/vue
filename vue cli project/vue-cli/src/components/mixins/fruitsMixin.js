// Mixins >
// >>> have the same life cycle hooks as any Vue()
//    >>> when used in a Vue Component 
//    >>> Mixin hooks are executed filteredFruits

//  >>> this allow component to override the elements of Mixins 
//        >> as Mixins are not allowed to modify components

export const fruitMixin = {
    data(){
        return{
            fruits:['Apple','Banana' , 'Mango' ,'Melon'],
            filterText:""
        }
    },
    computed:{
        filteredFruits(){
            return this.fruits.filter((element)=>{
                return element.match(this.filterText)
            })
        }
    },

    created(){
        alert("Mixin Created")
    }

}