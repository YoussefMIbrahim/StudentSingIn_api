<template>
  <div id="app">

    <NewStudentForm v-on:student-added="newStudentAdded"></NewStudentForm>
    <StudentTable
      v-bind:students="students"
      v-on:student-present="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted"
    ></StudentTable>
    <StudentMessage v-bind:message="message" v-bind:name="name"></StudentMessage>

  </div>
</template>

<script>

  import NewStudentForm from "./components/NewStudentForm";
  import StudentMessage from "./components/StudentMessage";
  import StudentTable from "./components/StudentTable";

export default {
  name: 'App',
  components: {
    NewStudentForm,
    StudentTable,
    StudentMessage
  },
  data() {
    return{
      students:[],
      message: '',
      name: ''
    }
  },
  mounted(){
    this.updateStudents()
  },
  methods: {
    newStudentAdded(student){
      this.$student_api.addStudent(student).then(student => {
        this.updateStudents()
      }).catch(err => {
        let message = err.response.data.join(', ')
        alert('Error adding student, '+ message)
      })
    },
    studentArrivedOrLeft(student){
      this.$student_api.updateStudent(student).then( () => {
        this.name = student.name
        this.message = student.present ? 'Welcome,' : 'Goodbye, '
        this.updateStudents()
      })
    },
    studentDeleted(student){
      this.$student_api.deleteStudent(student).then(() =>{
        this.updateStudents()
      })
    },
    updateStudents(){
      this.$student_api.getAllStudents().then(students => {
        this.students = students
      })
    }
  }
}
</script>

<style>

</style>
