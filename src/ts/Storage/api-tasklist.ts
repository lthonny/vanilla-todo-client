export function TaskList(baseUrl: String) {
  this.baseUrl = baseUrl;
  this.filter = 'All'
}

TaskList.prototype.getTasks = function (): any {
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


TaskList.prototype.createTask = function (text: String) {
  const endpoint = `${this.baseUrl}/tasks`;
  const response = fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ text }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response.then(function (response) {
    return response.json();
  })
}


TaskList.prototype.editTask = function (id, taskData) {
  const endpoint = `${this.baseUrl}/tasks/${id}`;
  const response = fetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(taskData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response.then(function (response) {
    return response.json();
  })
}


TaskList.prototype.deleteTask = function (id) {
  const endpoint = `${this.baseUrl}/tasks/${id}`;
  const response = fetch(endpoint, {
    method: 'DELETE',
  });

  return response.then(function (response) {
    return response.json();
  })
}


TaskList.prototype.setFilter = function (filter: String) {
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


