<template>
  <div>
    <h1>Vue Todos:</h1>
    <div>
      <Todo v-for="(todo, index) in todos" :description="todo.description" :key="index" />
    </div>
    <h1>New:</h1>
    <input type="text" ref="todoRef" />
    <button @click="handleClick">Add</button>
  </div>
</template>
<script>
import axios from "axios";
import Todo from "./Todo.vue";
export default {
  components: {
    Todo,
  },
  data() {
    return {
      todos: [{ description: "vue test" }],
    };
  },
  methods: {
    async fetchTodo() {
      const { data: todos } = await axios.get("https://localhost:44388/toDo");
      return todos;
    },
    async createTodo(todo) {
      await axios.post("https://localhost:44388/toDo", { description: todo });
    },
    async handleClick() {
      const newTodo = this.$refs.todoRef.value;
      await this.createTodo(newTodo);
      const todos = await this.fetchTodo();
      this.$data.todos = todos;
      this.$refs.todoRef.value = "";
    },
  },
  async created() {
    const todos = await this.fetchTodo();
    this.$data.todos = todos;
  },
};
</script>
