// import process from "dotenv/config";
import { Task } from "../Task";
import { TasksList } from './../types';

export class InMemoryTasksList extends TasksList {

  constructor(
    private baseUrl: string = 'http://localhost:3000'
  ) {
    super();
  }


  getTasks(): Promise<Task[]> {
    const endpoint = `${this.baseUrl}/tasks`;
    const response = fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return response.then((response) => response.json());
  }


  createTask(text: string) {
    const endpoint = `${this.baseUrl}/tasks`;
    const response = fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return response.then((response) => response.json());
  }


  editTask(id: number | string, taskData: { text: string, status: boolean }) {
    const endpoint = `${this.baseUrl}/tasks/${id}`;
    const response = fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(taskData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return response.then((response) => response.json());
  }


  deleteTask(id: number | string) {
    const endpoint = `${this.baseUrl}/tasks/${id}`;
    const response = fetch(endpoint, {
      method: 'DELETE',
    });

    return response.then((response) => response.json());
  }
}