export function ApiTasklist() {
    this.baseUrl = `http://localhost:${process.env.SERVER_HOST}`;
    this.filter = 'All'
}

ApiTasklist.prototype.getTasks = function () {
    const endpoint = `${this.baseUrl}/tasks`;
    const response = fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    return response.then(function (response) {
        return response.json();
    })
}


ApiTasklist.prototype.createTask = function (text) {
    const endpoint = `${this.baseUrl}/tasks`;
    const response = fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    return response;
}


ApiTasklist.prototype.editTask = function (id, taskData) {
    const endpoint = `${this.baseUrl}/tasks/${id}`;
    const response = fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(taskData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    return response;
}


ApiTasklist.prototype.deleteTask = function (id) {
    const endpoint = `${this.baseUrl}/tasks/${id}`;
    const response = fetch(endpoint, {
        method: 'DELETE',
    });

    return response;
}


ApiTasklist.prototype.setFilter = function (filter) {
    if(
        filter === 'All' ||
        filter === 'Completed' ||
        filter === 'InCompleted'
    ) {
        this.filter = filter;
    }
}


