export default class Task {

  constructor(
    public id: string | number,
    public text: string,
    public status: boolean,
    public order: number
  ) { }
}


// const arr: number[] = [1, 2, 3, 4];
const arr: Array<number> = [1, 2, 3, 4];

console.log(arr);

interface Iuser {
  id: number,
  name: string,
  age: number
}

const users: Array<Iuser> = [
  { id: 1, name: 'F', age: 23 },
  { id: 1, name: 'F', age: 23 },
  { id: 1, name: 'F', age: 23 },
]

const users: Iuser[] = [
  { id: 1, name: 'F', age: 23 },
  { id: 1, name: 'F', age: 23 },
  { id: 1, name: 'F', age: 23 },
]

console.log(users);