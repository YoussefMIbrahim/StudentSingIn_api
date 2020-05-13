<template>
    <div>
        <div class="alert alert-danger" v-show="errors.length > 0">
            <!--            using v-for to loop over the errors array and printing each error as a list item-->
            <li v-for="error in errors">{{error}}</li>
        </div>
        <!--        div with some bootstrap magic-->
        <div class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group">
                <label for="name">Name</label>
                <!--                attaching the input to the new student name property and trimming to get rid of useless spaces-->
                <input id="name" class="form-control" v-model.trim = "newStudentName">
            </div>

            <div class="form-group">
                <label for="starID">Star ID</label>
                <!--                same thing as the above form group but with star id-->
                <input id="starID" class="form-control" v-model.trim = "newStarID">
            </div>
            <!--            adding an on click function and .prevent to stop the browser from trying to submit to a server and reload-->
            <button class="btn btn-primary" v-on:click.prevent="addStudent">Add</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewStudentForm",
        data(){
            return {
                newStudentName: '',
                newStarID: '',
                errors: [],
                students: [{name: 'A. Student', starID: 'aa1234aa', present: false}],
            }
        },
        methods: {
            addStudent(){
                this.errors = [];
                if (this.newStarID && this.newStudentName) {
                    let student = {name: this.newStudentName, starID: this.newStarID};
                    // this.students.push(student);
                    //
                    // this.students.sort(function (s1,s2) {
                    //     return s1.name > s2.name ? 1: -1
                    // });
                    this.$emit('student-added', student);

                    this.newStarID = '';
                    this.newStudentName = '';
                }
                else{

                    if (!this.newStarID){this.errors.push('Star ID required')}
                    if (!this.newStudentName){this.errors.push('Student Name required')}

                }
            }
        }

    }
</script>

<style scoped>

</style>