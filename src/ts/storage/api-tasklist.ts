import { Task } from "../Task";
import { TasksList } from './../types';

export class TaskList extends TasksList {
  private readonly baseUrl: string = 'http://localhost:3000';

  constructor() {
    super();
  }


  async getTasks(): Promise<Task[]> {
    const endpoint = `${this.baseUrl}/tasks`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return response.json();
  }


  async createTask(text: string): Promise<undefined>  {
    const endpoint = `${this.baseUrl}/tasks`;
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return;
  }


  async editTask(id: string, taskData: { text: string, status: boolean, order: number }): Promise<undefined> {
    const endpoint = `${this.baseUrl}/tasks/${id}`;
    const response = await fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(taskData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    // try

    return;
  }


  async deleteTask(id: string): Promise<undefined> {
    const endpoint = `${this.baseUrl}/tasks/${id}`;
    const response = await fetch(endpoint, {
      method: 'DELETE',
    });

    return;
  }
}
