function Task(text, completed, id, date) {
  this.id = id;
  this.text = text;
  this.completed = completed;

  this.date = date;
}


function* Random(seed) {
  let value = seed;

  while (true) {
    value = value * 16213 % 232013201312
    yield value;
  }
};


let generator = Random(1);

console.log(generator.next().value)
console.log(generator.next().value)
console.log(generator.next().value)