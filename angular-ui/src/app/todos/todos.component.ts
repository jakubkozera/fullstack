import { Component, OnInit } from "@angular/core";
import axios from "axios";
@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"],
})
export class TodosComponent implements OnInit {
  constructor() {}

  async fetchTodo() {
    const { data: todos } = await axios.get("https://localhost:44388/toDo");
    return todos;
  }
  async createTodo(todo) {
    await axios.post("https://localhost:44388/toDo", { description: todo });
  }
  todos = [];
  newTodo = "";
  async handleClick() {
    await this.createTodo(this.newTodo);
    const todos = await this.fetchTodo();
    this.todos = todos;
    this.newTodo = "";
  }
  async ngOnInit() {
    const todos = await this.fetchTodo();
    console.log(todos);
    this.todos = todos;
  }
}
