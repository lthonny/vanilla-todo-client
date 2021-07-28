class Task {
  constructor(id, text, status, order) {
    this.id = id;
    this.text = text;
    this.status = status;
    this.order = order;
  }
}

exports.module = Task;