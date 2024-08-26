import { makeAutoObservable, runInAction } from "mobx";
import { fetchAllRows } from "./firebase";
import Cookies from 'js-cookie';

type TableRow = {
    id: string;
    thought: string;
};

class Store {
    email: string | null = null;
    token: string | null = null;
    rows: TableRow[] = [];

    constructor() {
        makeAutoObservable(this);

        // check cookies fro email and token
        const email = Cookies.get('email');
        const token = Cookies.get('token');

        if (email && token) {
            this.setEmail(email);
            this.setToken(token);
        }
    }

    async fetchData() {
        console.log('...fetching')
        try {
            const querySnapshot = await fetchAllRows(this.email!);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                thought: doc.data().thought,
            }));

            console.log({data})

            runInAction(() => {
                this.rows = data;
            });
        } catch (e) {
            console.error(e);
        }
    }

    get rowCount() {
        return this.rows.length;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setToken(token: string) {
        this.token = token;
    }

    get isAuthed() {
        return this.email !== null;
    }

    logout() {
        this.email = null;
        Cookies.remove('email');
        Cookies.remove('token');
    }

    // I need an action for all the stuff related to auth
    // like save token and email in cookies
    doAuth(email: string, token: string) {
        this.setEmail(email);
        Cookies.set('email', email);
        Cookies.set('token', token);
    }
}     

export const store = new Store();