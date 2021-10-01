import { MemoryTaskList } from './storage/memory-tasklist';
import { LocalTaskList } from './storage/local-tasklist';
import { ApiTasklist } from './storage/api-tasklist';
import { FirebaseTaskList } from './storage/firebase-tasklist';

export function FactoryTaskList() {
    this.tasklist;
}

FactoryTaskList.prototype.create = function (type) {
    if (this.tasklist) {
        return this.tasklist;
    }

    if (type === 'api-tasklist') {
        this.tasklist = new ApiTasklist();
    } else if (type === 'local-tasklist') {
        this.tasklist = new LocalTaskList();
    } else if (type === 'firebase-tasklist') {
        this.tasklist = new FirebaseTaskList();
    } else {
        this.tasklist = new MemoryTaskList();
    }

    return this.tasklist;
};
