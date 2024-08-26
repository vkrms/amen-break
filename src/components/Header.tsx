import { store } from "../lib/store"
import { Link } from "react-router-dom"
import { routes } from "../lib/routes"
import { observer } from "mobx-react"

function logout() {
    store.logout();
}

export const Header: React.FC = observer(() => {
    return (
        <header className="flex justify-center mb-6 text-gray-400">
            <div className="bob mr-auto">Logged in as: {store.email}</div>

            <div className='menu text-gray-400'>
                {routes.filter(route => !route.hidden).map((route) => (
                    <Link key={route.path} to={route.path} className="mx-2">{route.name}</Link>
                ))}

                <a href="#" onClick={logout} className="mx-2">Logout</a>
            </div>
        </header>        
    )
})