export default class Task {

  constructor(
    public id: string | number,
    public text: string,
    public status: boolean,
    public order: number
  ) { }
}


// export default class Task {

//   id: string;
//   text: string;
//   status: boolean;
//   order: number;

//   constructor(id: string, text: string, status: boolean, order: number) {
//     this.id = id;
//     this.text = text;
//     this.status = status;
//     this.order = order;
//   }

// }

