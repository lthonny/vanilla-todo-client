export class Task {

  constructor(
    public id: string | number,
    public text: string,
    public status: boolean,
    public order: number
  ) { }
}
