import firebase from 'firebase/app';
import 'firebase/firestore';

import { Task } from '../Task';

// eslint-disable-next-line require-jsdoc
export function FirebaseTaskList() {
    const firebaseConfig = {
        apiKey: 'AIzaSyC72RD4e1VUXl4GGej74vEAVWiJdjAooFI',
        authDomain: 'tasks-33805.firebaseapp.com',
        projectId: 'tasks-33805',
        storageBucket: 'tasks-33805.appspot.com',
        messagingSenderId: '862718649801',
        appId: '1:862718649801:web:71ca436be025c0b2d0b418',
    };
    this.app = firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();

    this.filter = 'All';
}

FirebaseTaskList.prototype.getTasks = function () {
    const { db } = this;

    return new Promise(function (resolve, reject) {
        try {
            db.collection('tasks').onSnapshot(function (snapshot) {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const tasks = data.map(function ({ id, text, status, order }) {
                    return new Task(id, text, status, order);
                });

                resolve(tasks);
            });
        } catch (e) {
            reject(e);
        }
    });
};

FirebaseTaskList.prototype.createTask = function (text) {
    const { db } = this;

    return this.getTasks()
        .then(function (tasks) {
            let order = 1;
            if (tasks.length) {
                order =
                    tasks.reduce(function (acc, curr) {
                        return acc > curr.order ? acc : curr.order;
                    }, 1) + 1;
            }

            db.collection('tasks')
                .add({
                    text,
                    status: false,
                    order,
                })
                .catch(function (e) {
                    console.log(e);
                });
        })
        .catch(function (e) {
            console.log(e);
        });
};

FirebaseTaskList.prototype.editTask = function (id, data) {
    const { db } = this;

    return this.getTasks()
        .then(function () {
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    db.collection('tasks')
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
};

FirebaseTaskList.prototype.deleteTask = function (id) {
    const { db } = this;

    return db
        .collection('tasks')
        .doc(id)
        .delete()
        .catch(function (e) {
            console.log(e);
        });
};

FirebaseTaskList.prototype.setFilter = function (filter) {
    if (filter === 'All' || filter === 'Completed' || filter === 'InCompleted') {
        this.filter = filter;
    }
};
