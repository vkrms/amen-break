import { Navigate } from "react-router-dom";
import { useStore } from "../lib/z-store";

interface Props {
    component: JSX.Element;
}

export const ProtectedRoute = ({ component }: Props) => {
    const { isAuthenticated } = useStore(state => state)
    // console.log({isAuthenticated})

    return isAuthenticated() ? component : <Navigate to="/login" />
}
