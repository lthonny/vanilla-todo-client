export class Task {
    constructor(
        public id: string,
        public text: string,
        public status: boolean,
        public order: number,
    ) {}
}
