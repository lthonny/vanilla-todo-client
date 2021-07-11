export function Storage(key) {
  this.key = key || 'tasks';
}

Storage.prototype.setItem = function (data) {
  localStorage.setItem(this.key, JSON.stringify(data))
  return this;
}

// Storage.prototype.getItem = function () {
//   return JSON.parse(localStorage.getItem(this.key));
// }


Storage.prototype.getItem = function () {
  fetch('http://localhost:3333/', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      console.log('tasks', data);
    })
    .catch(error => {
      console.log('error', error)
    })
}


