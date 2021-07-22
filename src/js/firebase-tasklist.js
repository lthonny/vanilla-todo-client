import firebase from 'firebase/app';
import 'firebase/firestore';

import { Task } from './Task';


export function TaskList() {
    var firebaseConfig = {
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
            // const id = Math.random().toString(36).substr(2, 9);
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
    const { text, status } = taskData;

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

            db.collection('tasks').doc(id).update({
                taskData
            });
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