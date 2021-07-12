export function Storage(key) {
  this.key = key || 'tasks';
}

// Storage.prototype.setItem = function (data) {
//   localStorage.setItem(this.key, JSON.stringify(data))
//   return this;
// }

// Storage.prototype.getItem = function () {
//   return JSON.parse(localStorage.getItem(this.key));
// }



// Storage.prototype.getItem = function () {
// const response = fetch('http://localhost:3333/')
// .then(this.key = response.json());
// console.log('fetch')
// }

Storage.prototype.getItem = function () {
  const res = fetch('http://localhost:3333/', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      this.key = data
      // console.log('tasks', data);
    })
    .catch(error => {
      console.log('error', error)
    })
}


