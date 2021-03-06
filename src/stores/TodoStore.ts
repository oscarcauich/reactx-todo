import {action, computed, observable, ObservableMap} from 'mobx';
import {Todo, ITodo} from '../models/Todo';
import {v4 as uuidv4} from 'uuid';

export class TodoStore {
    @observable _todos: ObservableMap<Todo>;
    @observable _filter: 'ALL' | 'ACTIVE' | 'COMPLETED';

    constructor() {
        this._todos = observable.map<Todo>();
        this._filter = 'ALL';
    }

    @computed
    get activeCount(): number {
        let count = 0;
        this._todos.forEach(todo => {
            if (!todo.completed) count++;
        });
        return count;
    }

    @computed
    get completedCount(): number {
        let count = 0;
        this._todos.forEach(todo => {
            if (todo.completed) count++;
        });
        return count;
    }

    @computed
    get todos(): Todo[] {
        switch (this._filter) {
            case 'ACTIVE':
                return this._todos.values().filter(todo => !todo.completed);
            
            case 'COMPLETED':
                return this._todos.values().filter(todo => todo.completed);
            
            default:
                return this._todos.values();
        }
    }

    @action
    add(message: string): Todo {
        const id = uuidv4();
        const todo = new Todo(id, message);
        this._todos.set(todo.id, todo);
        return todo;
    }

    @action
    clearCompleted(): void {
        this._todos.forEach(todo => {
            if (todo.completed) {
                this.remove(todo.id);
            }
        });
    }

    @action
    filterBy(filter: 'ALL' | 'ACTIVE' | 'COMPLETED') {
        this._filter = filter;
    }

    get(id: string): ITodo {
        return this._todos.get(id);
    }

    @action
    populate(todos: ITodo[]): void {
        todos.forEach(todoProps => {
            const todo = new Todo(todoProps.id, todoProps.message);
            this._todos.set(todo.id, todo);
        });
    }

    @action
    remove(id: string): void {
        this._todos.delete(id);
    }

    @action
    toggleAll(): void {
        this._todos.forEach(todo => {
            todo.toggle();
        });
    }
}
