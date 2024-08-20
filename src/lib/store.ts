import { makeAutoObservable } from "mobx";

class Store {
    whatever: string = 'hello';

    constructor() {
        makeAutoObservable(this);
    }

    async fetchData() {
        
    }
}

export const store = new Store();