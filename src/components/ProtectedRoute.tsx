import { observer } from "mobx-react";
import { store } from "../lib/store";
import { Navigate } from "react-router-dom";

interface Props {
    component: JSX.Element;
}

export const ProtectedRoute = observer(({ component }: Props) => {
    return store.isAuthed ? component : <Navigate to="/login" />
})