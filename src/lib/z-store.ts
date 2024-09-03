import { create } from 'zustand';
import Cookies from 'js-cookie';
import { fetchAllRows } from './firebase';

type TableRow = {
    id: string;
    thought: string;
};

// this is mostly zustand demo stuff
interface State {
    bears: number;
    email: string | null;
    token: string | null;
    rows: TableRow[];
    increasePopulation: () => void;
    removeAllBears: () => void;
    updateBears: (newBears: number) => void;
    isAuthenticated: () => boolean;
    logout: () => void;
    fetchData: () => void;
    doAuth: (email: string, token: string) => void;
}

export const useStore = create<State>((set, get) => ({
    bears: 0,
    email: Cookies.get('email') ?? null,
    token: Cookies.get('token') ?? null,
    rows: [],

    increasePopulation: () => set((state: State) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears: number) => set({ bears: newBears }),

    setEmail: (email: string) => set({ email }),

    setToken: (token: string) => set({ token }),

    isAuthenticated: (): boolean => {
        const state = get() as State;
        return state.email !== null;
    },

    logout: () => {
        set({ email: null, token: null });
        Cookies.remove('email');
        Cookies.remove('token');
    },

    doAuth: (email: string, token: string) => {
        set({ email, token });
        Cookies.set('email', email);
        Cookies.set('token', token);
    },

    async fetchData() {
        console.log('...fetching')
        try {
            const querySnapshot = await fetchAllRows(get().email!);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                thought: doc.data().thought,
            }));

            console.log({data})

            set({ rows: data });
            return
        } catch (e) {
            console.error(e);
        }
    }
}));

export const useRowCount = () => {
    const rows = useStore(s => s.rows)
    return rows.length + 4
}

// Export the store's actions for use outside of components
export const { isAuthenticated, logout, doAuth, fetchData } = useStore.getState();