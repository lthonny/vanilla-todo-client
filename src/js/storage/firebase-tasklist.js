import firebase from 'firebase/app';
import 'firebase/firestore';

import {Task} from '../Task';

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
                    .onSnapshot(function (snapshot) { // remove arrow functions
                        const data = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));

                        const tasks = (data).map(function ({id, text, status, date, order}) {
                            return new Task(id, text, status, date, order);
                        });

                        resolve(tasks);
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
                text: text,
                status: false,
                date: date.toLocaleString(),
                order: order
            })
                .then()
                .catch(function (e) {
                    console.log(e);
                })
        })
        .catch(function (e) {
            console.log(e);
        })
}


TaskList.prototype.editTask = function (id, {text, status, order}) {
    const db = firebase.firestore();

    return this.getTasks()
        .then(function (tasks) {
            const data = {
                text: text,
                status: status,
                order: order
            };

            console.log('data', data);

            if (
                data.text !== undefined && data.text !== null ||
                data.status !== undefined && data.status !== null ||
                data.order !== undefined && data.order !== null
            ) {
                console.log(data);
                db.collection('tasks').doc(id).update({
                //     date : data,
                    text: data.text,
                    status: !data.status
                })
            }


            // if (text !== undefined && text !== null) {
            //     db.collection('tasks').doc(id).update({
            //         text: text
            //     })
            // }
            // if (status !== undefined && status !== null) {
            //     db.collection('tasks').doc(id).update({
            //         status: !status
            //     })
            // }
            // if (order !== undefined && order !== null) {
            //     db.collection('tasks').doc(id).update({
            //         order: order
            //     })
            //     .then(function () {
            //     console.log();
            // }).catch(function (e) {
            //     console.log(e);
            // })
            // }
        })
        .catch(function (e) {
            console.log(e);
        })
}


TaskList.prototype.deleteTask = function (id) {
    const db = firebase.firestore();

    return db.collection('tasks').doc(id).delete()
        .then()
        .catch(function (e) {
            console.log(e)
        });
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
