import { Task } from "../Task";
import { TasksList } from './../../index';
import firebase from 'firebase/app';
import 'firebase/firestore';

export class InMemoryTasksList extends TasksList {

    constructor() {
        super();
        const firebaseConfig = {
            apiKey: "AIzaSyCi-UOx-5q3TGuwm463fqEWHAPOCk7cqpQ",
            authDomain: "todo-9dbb4.firebaseapp.com",
            databaseURL: "https://todo-9dbb4-default-rtdb.firebaseio.com",
            projectId: "todo-9dbb4",
            storageBucket: "todo-9dbb4.appspot.com",
            messagingSenderId: "853688421023",
            appId: "1:853688421023:web:f1d13176b618de532cb0aa",
            measurementId: "G-Y6BX7QZP6V"
        };
        this.app = firebase.initializeApp(firebaseConfig);
    }

    getTasks(): Promise<Task[]> {
        const db = firebase.firestore();

        return new Promise((resolve, reject) => {
            try {

                db.collection("tasks")
                    .onSnapshot(snapshot => {
                        const data = snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }));

                        const tasks = (data).map(({ id, text, status, order }) => {
                            return new Task(id, text, status, order);
                        })
                        resolve(data);
                    })
            } catch (err: any) {
                reject(err);
            }
        }
        )
    }

    createTask(text: string) {
        const db = firebase.firestore();

        return this.getTasks()
            .then(tasks => {
                let order: number;
                if (tasks.length) {
                    order = tasks.reduce((acc, curr) => {
                        return acc > curr.order ? acc : curr.order;
                    }, 1) + 1;
                } else {
                    order = 1;
                }

                db.collection("tasks").add({
                    text: text,
                    status: false,
                    order: order
                })
            })
            .catch((err: any) => console.log(err));
    }

    editTask(id: number | string, taskData: { text: string, status: boolean }) {
        const db = firebase.firestore();
        const { text, status } = taskData;

        return this.getTasks()
            .then(tasks => {

                if (text !== undefined && text !== null) {
                    db.collection('tasks').doc(id).update({
                        text: text
                    });
                }
                if (status !== undefined && status !== null) {
                    db.collection('tasks').doc(id).update({
                        status: !status
                    });
                }

                db.collection('tasks').doc(id).update({
                    taskData
                });
            })
            .catch((err: any) => console.log(err));
    }

    deleteTask(id: number | string) {
        const db = firebase.firestore();

        return this.getTasks()
            .then(tasks => {
                db.collection('tasks').doc(id).delete();
            })
            .catch((err: any) => console.log(err));
    }
}

