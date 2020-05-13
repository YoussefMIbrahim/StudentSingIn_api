<template>
    <div>
        <transition name="fade">
            <!--            adding a success alert message that greets or says goodbye to the most recent person if seeMessage is true-->
            <div class="alert alert-success" v-if="seeMessage">{{message}} {{name}}</div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "StudentMessage",
        data(){
            return{
                seeMessage: false
            }
        },
        props:{
            message: String,
            name: String
        },
        watch:{
            message(){
                this.seeMessage = true
                setTimeout(( ) =>{
                    this.seeMessage = false
                }, 3000)
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>