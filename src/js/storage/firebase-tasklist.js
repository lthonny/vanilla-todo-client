import firebase from 'firebase/app';
import 'firebase/firestore';

import { Task } from '../Task';

export function TaskList() {
    const firebaseConfig = {
        apiKey: "AIzaSyC72RD4e1VUXl4GGej74vEAVWiJdjAooFI",
        authDomain: "tasks-33805.firebaseapp.com",
        projectId: "tasks-33805",
        storageBucket: "tasks-33805.appspot.com",
        messagingSenderId: "862718649801",
        appId: "1:862718649801:web:71ca436be025c0b2d0b418"
    };
    this.app = firebase.initializeApp(firebaseConfig);
    this.filter = 'All';
}


TaskList.prototype.getTasks = function () {
    const db = firebase.firestore();

    return new Promise(function (resolve, reject) {
        try {

            db.collection("tasks")
                .onSnapshot((snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    const tasks = (data).map(function ({ id, text, status, date, order }) {
                        return new Task(id, text, status, date, order);
                    })
                    resolve(data);
                })
        } catch (e) {
            reject(e);
        }
    }
    )
}


TaskList.prototype.createTask = function (text) {
    const db = firebase.firestore();

    return this.getTasks()
        .then(function (tasks) {
            const date = new Date();
            let order;
            if (tasks.length) {
                order = tasks.reduce(function (acc, curr) {
                    return acc > curr.order ? acc : curr.order;
                }, 1) + 1;
            } else {
                order = 1;
            }

            db.collection("tasks").add({
                //     id: id,
                text: text,
                status: false,
                data: date.toLocaleString(),
                order: order
            })
        })
        .catch(function (e) {
            console.log(e);
        })
}


TaskList.prototype.editTask = function (id, taskData) {
    const db = firebase.firestore();
    const { text, status, order } = taskData;

    return this.getTasks()
        .then(function (tasks) {

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
            if (order !== undefined && order !== null) {
                db.collection('tasks').doc(id).update({
                    order: order
                });
            }
        })
        .catch(function (e) {
            console.log(e);
        })
}


TaskList.prototype.deleteTask = function (id) {
    const db = firebase.firestore();

    return this.getTasks()
        .then(function (tasks) {
            db.collection('tasks').doc(id).delete();
        })
        .catch(function (e) {
            console.log(e);
        })
}


TaskList.prototype.setFilter = function (filter) {
    if (filter === 'All') {
        this.filter = 'All';
    }
    if (filter === 'Completed') {
        this.filter = 'Completed';
    }
    if (filter === 'InCompleted') {
        this.filter = 'InCompleted';
    }
}
