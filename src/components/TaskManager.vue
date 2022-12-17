<template>
  <div class="containter"></div>
    <div class="section p-0">
      <div class="mb-6">
        <div :class="messageClass" v-if="message">
          <button class="delete" aria-label="delete" @click="message=false"></button>
          | {{messageText}}
        </div>
      </div>
    </div>
    <p class="title is-large is-info mt-6 mb-0">
      | Task Manager
    </p>
    <p class="has-text-right">
      <button class="button is-small is-primary" @click="modalClass='modal is-active'; clear()"></button>
      | <i class="fa fa-plus" aria-hidden="true"></i> <strong> New task</strong>
      <button class="button is-small is-danger ml-4" @click="modalClass='modal is-active'; clear()"></button>
      | <i class="fa fa-trash" aria-hidden="true"></i> <strong class="ml-2"> Delete selected tasks</strong>
    </p>
    <table class="table is-bordered is-hoverable mt-2 is-fullwidth" v-show="tasks.length > 0">
      <thead>
        <tr>
          <th><input type="checkbox" v-model="selectedAll"></th>
          <th>Name</th>
          <th>Description</th>
          <th>Time</th>
          <th>Ops.</th>
        </tr>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="index">
            <td><input type="checkbox" v-model="selected" :value="index"></td>
            <td>{{task.name}}</td>
            <td>{{task.description}}</td>
            <td>{{task.time}} hrs</td>
            <td>
              <a href="#" class="button is-danger is-small mr-2" @click="deleteTask(index)"><i class="fa fa-times" aria-hidden="true"></i></a>
              <a href="#" class="button is-info is-small" @click="editTask(task, index)"><i class="fa fa-edit" aria-hidden="true"></i></a>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="has-text-right" colspan="3">
              <strong>Total Time</strong>
            </td>
            <td class="has-text-left" colspan="2">
              | {{getTotalTime}} hrs
            </td>
          </tr>
        </tfoot>
      </thead>
    </table>  
    <div v-if="!tasks.length">
      <p class="message is-info p-4 mt-4">
        <strong>No hay tareas aún</strong>
      </p>
    </div>
    <div>
      <div :class="modalClass">
        <div class="modal-background"></div>
            <div class="modal-content">
                <div class="my-4">
                  <div :class="messageClass" v-if="messageInDialog">
                    <button class="delete"  aria-label="delete"  @click="messageInDialog=false"></button>
                    | {{messageText}}
                  </div>
                </div>
                <div class="card p-5">
                  <div class="card-header title has-text-right">
                    <span v-if="editTaskIndex == -1">Create a new task</span>
                    <span v-else>Edit task</span>
                  </div>
                    <div class="card-content">
                      <div class="content">
                        <div class="field">
                          <input type="text" v-model="aTask.name" placeholder="Task name">
                        </div>
                        <div class="field">
                          <textarea name="" id="" cols="30" rows="10" class="textarea" v-model="aTask.description" placeholder="Task Description"></textarea>
                        </div>
                        <div class="field">
                          <input type="number" class="input" v-model="aTask.time" placeholder="Time" style="width:120px">
                        </div>
                        <div class="field" v-if="editTaskIndex == -1">
                          <a href="#" class="button is-primary is-medium" @click="addTask">Save task</a>
                          <a href="" class="button is-secondary is-medium ml-3" @click="modalClass='modal'">Close</a>
                        </div>
                        <div class="field" v-else>
                          <a href="" class="button is-primary is-medium" @click="updateTask">Update task</a>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        <button class="modal-close is-large" @click="modalClass='modal'" aria-label="close"></button>
      </div>
    </div>
</template>
<script>

export default {

  name: "Tasks",
  data () {
    return {
      selected: [],
      editTaskIndex: -1,
      messageText: "The task was successfully saved.",
      messageClass: "notification is-success",
      message: false,
      messageInDialog: false,
      aTask: {
        name: "",
        time: 0,
        description: ""
      },
      totalTime: 0,
      modalClass: "modal",
      tasks: []
    };
  },
  computed: {
    getTotalTime (key = "time") {
      return this.tasks.reduce((a, b) => +a + +b.time, 0);
    },
    selectedAll: {
      set (val) {
        this.selected = [];
        if (val) {
          for (let i = 0; i < this.tasks.length; i++) {
            this.selected.push(i);
          }
        }
      },
      get () {
        return this.selected.length === this.tasks.length;
      }
    }
  },
  watch: {
  },
  created () {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  },
  mounted () {
    console.log("App Mounted");
  },
  methods: {
    deleteSelected () {
      const sel = this.selected.length;
      if (sel <= 0) {
        this.showMessage("notification is-warning", true, "You haven't selected any task to be deleted");
        return;
      }
      if (sel > 0) {
        for (let i = 0; i <= (sel); i++) {
          // Delete selected items
          this.tasks.splice(i, sel);
        }
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.showMessage("notification is-info", true, sel + " task(s) deleted successfully");
        this.selected = [];
      }
    },
    updateTask () {
      if (this.aTask.name.length > 0 && !isNaN(this.aTask.time)) {
        this.tasks[this.editTaskIndex] = { name: this.aTask.name, time: this.aTask.time, description: this.aTask.description };
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.showMessage("notification is-success", true, "The task '" + this.tasks[this.editTaskIndex].name + "' was edited");
        this.editTaskIndex = -1;
        this.modalClass = "modal";
        setTimeout(() => {
          this.message = false;
        }, 3000);
      } else {
        this.showMessage("notification is-danger", true, "Please review you information", true);
      }
    },
    editTask (task, index) {
      this.modalClass = "modal is-active";
      this.aTask = task;
      this.editTaskIndex = index;
    },
    showMessage (messageClass = "notification is-info", show = true, messageText, inDialog = false) {
      this.messageText = messageText;
      this.messageClass = messageClass;
      if (inDialog) {
        this.messageInDialog = true;
      } else {
        this.message = show;
      }
      setTimeout(() => {
        !inDialog ? this.message = false : this.messageInDialog = false;
      }, 3000);
    },
    deleteTask (index) {
      const taskName = this.tasks[index].name;
      this.tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.showMessage("notification is-info", true, `The task ${taskName} was deleted`);
    },
    clear () {
      this.aTask.name = "";
      this.aTask.time = 0;
      this.aTask.description = "";
      this.editTaskIndex = -1;
    },
    addTask () {
      if (this.aTask.name.length > 0 && !isNaN(this.aTask.time)) {
        if (this.aTask.time > 0) {
          const newTask = { name: this.aTask.name, time: this.aTask.time, description: this.aTask.description };
          this.tasks.push(newTask);
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
          this.modalClass = "modal";
          this.showMessage("notification is-success", true, "The task was successfully saved");
          this.clear();
        } else {
          this.showMessage("notification is-danger", true, "Data for time must be a positive number", true);
        }
      } else {
        this.showMessage("notification is-danger", true, "Please review you information", true);
        // this.modalClass = "modal";
        setTimeout(() => {
          this.message = false;
        }, 3000);
      }
    }
  }
};
</script>