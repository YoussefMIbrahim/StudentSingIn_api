<template>
    <div>
        <div class="card student-list m-2 p-2">
            <h4 class="card-title">Students</h4>

            <div class="edit-table-toggle form-check">
                <input type="checkbox" id="edit-table" class="form-check-input" v-model="editTable">
                <label for="edit-table" class="form-check-label">Edit table?</label>
            </div>

            <div id="student-table">
                <table class="table">
                    <!--                    creating a table with these columns-->
                    <tr>
                        <th>Name</th>
                        <th>StarID</th>
                        <th>Present?</th>
                        <th v-show="editTable">Delete</th>
                    </tr>

                    <StudentRow
                            v-for="student in students" v-bind:key="student.name"
                            v-bind:student="student"
                            v-bind:edit="editTable"
                            v-on:student-present="studentArrivedOrLeft"
                            v-on:delete-student="studentDeleted"

                    ></StudentRow>
                    <!--                    looping over the list of students and printing them -->

                    <!--
                    Each row will have a checkbox, bound to the app data
                    When the checkbox is checked/unchecked, the student will be signed in/out
                    Add styles so present and absent student rows have different styles
                     -->
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import StudentRow from "./StudentRow";
    export default {
        name: "StudentTable",
        components : { StudentRow },
        data(){
            return{
                editTable:false
            }
        },
        props:{
            students: Array
        },
        methods: {
            studentArrivedOrLeft(student){
                // emit message to parent.
                this.$emit('student-present', student)
            },
            studentDeleted(student){
                this.$emit('delete-student',student)
            }
        }
    }
</script>

<style scoped>


</style>