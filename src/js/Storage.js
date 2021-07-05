export function Storage(key) {
  this.key = key || 'tasks'
}

Storage.prototype.setItem = function (data) {
  localStorage.setItem(this.key, JSON.stringify(data))
  return this;
}

Storage.prototype.getItem = function () {
  return JSON.parse(localStorage.getItem(this.key));
}

