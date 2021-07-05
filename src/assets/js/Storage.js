function Storage (storage) {
  this.storage = storage
}

Storage.prototype.setItem = function (tasks) {
  this.storage.setItem('tasks', JSON.stringify(tasks))
}

Storage.prototype.getItem = function () {

}

Storage.prototype.removeItem = function () {

}
