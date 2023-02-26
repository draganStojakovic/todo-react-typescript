import ApiService from "./ApiService";

class ToDoService extends ApiService {
  async getTodos() {
    return await this.client.get("/todo");
  }

  async postTodo(todo: any) {
    return await this.client.post("/todo", todo);
  }

  async updateTodo(id: string, todo: any) {
    return await this.client.put(`/todo?id=${id}`, todo);
  }

  async updateStatus(id: string) {
    return await this.client.put(`/todo-status?id=${id}`);
  }

  async archiveTodo(id: string) {
    return await this.client.put(`/todo-archive?id=${id}`);
  }

  async deleteAll() {
    return await this.client.delete("/todo");
  }
}

export const todoService = new ToDoService();
