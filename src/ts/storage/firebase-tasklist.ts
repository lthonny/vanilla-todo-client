import { Task } from '../Task';
import { TasksList } from './../types';

import firebase from 'firebase/app';
import 'firebase/firestore';

export class FirebaseTaskList extends TasksList {
    private db: firebase.firestore.Firestore;

    constructor() {
        super();

        firebase.initializeApp({
            apiKey: 'AIzaSyC72RD4e1VUXl4GGej74vEAVWiJdjAooFI',
            authDomain: 'tasks-33805.firebaseapp.com',
            projectId: 'tasks-33805',
            storageBucket: 'tasks-33805.appspot.com',
            messagingSenderId: '862718649801',
            appId: '1:862718649801:web:71ca436be025c0b2d0b418',
        });

        this.db = firebase.firestore();
    }

    getTasks(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            try {
                this.db.collection('tasks').onSnapshot((snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as {
                        id: string;
                        text: string;
                        status: boolean;
                        order: number;
                    }[];

                    const tasks = data.map(({ id, text, status, order }) => {
                        return new Task(id, text, status, order);
                    });

                    resolve(tasks);
                });
            } catch (err: any) {
                reject(err);
            }
        });
    }

    async createTask(text: string): Promise<undefined> {
        const tasks = await this.getTasks();

        let order: number = 1;
        if (tasks.length) {
            order =
                tasks.reduce((acc, curr) => {
                    return acc > curr.order ? acc : curr.order;
                }, 1) + 1;
        }

        try {
            await this.db
                .collection('tasks')
                .add({ text, status: false, order });
        } catch (e) {
            console.log(e);
        }
        return;
    }

    async editTask(
        id: string,
        taskData: { text?: string; status?: boolean; order?: number },
    ): Promise<undefined> {
        // try{
        //     console.log({...taskData})
        //     await this.db.collection('tasks').doc(id).update({...taskData});
        // } catch (e){
        //     console.log(e);
        // }
        // return;
        await this.getTasks()
            .then(() => {
                Object.entries(taskData).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        this.db
                            .collection('tasks')
                            .doc(id)
                            .update({
                                [key]: value,
                            })
                            .catch((e) => console.log(e));
                    }
                });
            })
            .catch(function (e) {
                console.log(e);
            });
        return;
    }

    async deleteTask(id: string): Promise<undefined> {
        await this.db
            .collection('tasks')
            .doc(id)
            .delete()
            .catch((e) => console.log(e));
        return;
    }
}
