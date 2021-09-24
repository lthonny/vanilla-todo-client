// const assert = require('chai').assert;
// import assert from 'assert';
// import { assect } from 'chai';
// import { Task } from './../src/js/Task';

// import { FactoryTaskList } from './../src/js/FactoryTaskList';

const tasks = [
    {id: "wsyzsa", text: "1", status: true, order: 1},
    {id: "xcvsyz", text: "2", status: false, order: 2},
    {id: "wszgyz", text: "3", status: true, order: 3}
];

describe('Memory Task List', function () {

    let taskList = null;

    beforeEach(function() {
        // runs before each test in this block
        //create instance filled with data
        // taskList = new FactoryTaskList('memory');
        // console.log(taskList)
//         tasklist.tasks = [tasks].map((obj) => new Task(obj));
//         console.log('gg', Task)
      });

      afterEach(function() {
        // runs after each test in this block
        tasklist = null;
      });

    
    // Able to add item
//     it('Item is added to the list', function () {
//
//     })

    // // able to edit Item
    // it('should', function () {

    // })


    // // able to delete Item
    // it('should', function () {

    // })

})
