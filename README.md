# vanillaToDo

Project "to do list" - designed to create a list of tasks. The program helps to manage to-do lists, implement planned tasks and not forget anything. The user has the ability to create a list of tasks, in the process of their execution, can change delete, complete, sort, search by name.

### ENV file:

Rename .env.example to .env

In .env specify the database('api-tasklist', 'local-tasklist', 'firebase-tasklist')

Rebuild the project every time you change the configuration of the .env file

### Testing:

- unit test: 

```npm run unit-test```

- e2e tests
To run end-to-end testing, you must first configure all processes on the backend, then write:

```npm run e2e-test```

## 1) To download all project dependencies, write:

`npm ci`

## 2) Task list functionality

### Adding a task

To add a task of the day, you need to click on the input fields (Enter the task...), enter your text, confirm our input with the add button.

<!-- ![image](https://user-images.githubusercontent.com/58366884/121872632-2cd00a80-cd0e-11eb-99e4-de2d5fa8f2d6.png) -->

### Task changes

After clicking on the [ Add to ] button, the task gets into the Daily tasks: where we can continue to contact it, we have access to change the text in the task, if we need to delete the task, click on the trash can on the right, in order to mark the task as completed, we mark checkmark it on the left.

<!-- ![image](https://user-images.githubusercontent.com/58366884/121872835-6a349800-cd0e-11eb-8573-feacfe205b48.png) -->

### Filtering tasks

To display specific records, we use the filter buttons [ all ], [ completed ], [ in completed]. Thanks to them, our Daily tasks will change according to the condition on which button we clicked the output of all records, completed and not completed.

![image](https://user-images.githubusercontent.com/58366884/133989195-7cd1c283-deb8-4615-ae32-12c7b3948e09.png)

## 3) Run npm start

`npm run start`
