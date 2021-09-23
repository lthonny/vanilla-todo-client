export function App(taskslist, view) {
    console.log('App init');

    const allTasks = document.querySelector('#btn-all');
    const compTasks = document.querySelector('#btn-completed');
    const inCompTasks = document.querySelector('#btn-incompleted');

    const getTasks = taskslist.getTasks.bind(taskslist);
    const createTask = taskslist.createTask.bind(taskslist);
    const editTask = taskslist.editTask.bind(taskslist);
    const deleteTask = taskslist.deleteTask.bind(taskslist);
    const setFilter = taskslist.setFilter.bind(taskslist);

    const filterTasks = function (filter) {
        setFilter(filter);
        this.view.render();
    }.bind(this);

    function activeColorFilter(button) {
        const buttons = document.querySelectorAll('.active-filter');
        buttons.forEach(function (button) {
            button.classList.remove('active-filter');
        });
        button.classList.add('active-filter');
    }

    allTasks.addEventListener('click', function () {
        activeColorFilter(allTasks);
        filterTasks('All');
    });
    compTasks.addEventListener('click', function () {
        activeColorFilter(compTasks);
        filterTasks('Completed');
    });
    inCompTasks.addEventListener('click', function () {
        activeColorFilter(inCompTasks);
        filterTasks('InCompleted');
    });

    const getState = function () {
        const { filter } = taskslist;
        return getTasks().then(function (tasks) {
            return {
                filter,
                tasks,
            };
        });
    };

    this.view = view;
    const handlers = {
        getState,
        createTask,
        editTask,
        deleteTask,
    };

    this.view.handlers = handlers;
}

App.prototype.render = function () {
    this.view.render();
};
